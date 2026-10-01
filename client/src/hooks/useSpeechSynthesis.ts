import { useState, useEffect, useRef, useCallback } from 'react';

interface SpeechSynthesisHook {
  isSupported: boolean;
  isPlaying: boolean;
  activeId: string | null;
  speak: (id: string, text: string, locale: string, onEnd?: () => void) => void;
  stop: () => void;
}

/**
 * Intelligently splits long text into digestible sentence/clause chunks.
 * Prevents Chromium's 15-second speech synthesis cutoff bug and speaks complete answers.
 */
function splitIntoSpeechChunks(text: string, maxChunkLen = 160): string[] {
  // Normalize line breaks and clean whitespace
  const normalized = text.replace(/\r\n/g, '\n').replace(/\t/g, ' ');
  // Split on sentence boundaries: period, question mark, exclamation, Devanagari danda, newline, semicolon
  const rawSentences = normalized.split(/(?<=[.?!।\n;])\s+/);
  const chunks: string[] = [];
  let current = '';

  for (const sentence of rawSentences) {
    const trimmed = sentence.trim();
    if (!trimmed) continue;

    if (trimmed.length > maxChunkLen) {
      // Sub-split by comma or dash if a single sentence is very long
      const subParts = trimmed.split(/(?<=[,–—])\s+/);
      for (const part of subParts) {
        if ((current + ' ' + part).trim().length <= maxChunkLen) {
          current = (current + ' ' + part).trim();
        } else {
          if (current) chunks.push(current);
          current = part.trim();
        }
      }
    } else if ((current + ' ' + trimmed).trim().length <= maxChunkLen) {
      current = (current + ' ' + trimmed).trim();
    } else {
      if (current) chunks.push(current);
      current = trimmed;
    }
  }

  if (current) chunks.push(current);
  return chunks.length > 0 ? chunks : [text.trim()];
}

export function useSpeechSynthesis(): SpeechSynthesisHook {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const isCancelledRef = useRef<boolean>(false);
  const endCallbackRef = useRef<(() => void) | undefined>(undefined);

  const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  // Preload and monitor voices as browsers load them asynchronously
  useEffect(() => {
    if (!isSupported || !window.speechSynthesis) return;

    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices();
      if (v.length > 0) {
        setAvailableVoices(v);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isSupported]);

  const stop = useCallback(() => {
    isCancelledRef.current = true;
    if (isSupported && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setActiveId(null);
    if (endCallbackRef.current) {
      const cb = endCallbackRef.current;
      endCallbackRef.current = undefined;
      cb();
    }
  }, [isSupported]);

  const speak = useCallback((id: string, text: string, locale: string, onEnd?: () => void) => {
    if (!isSupported || !window.speechSynthesis) {
      if (onEnd) onEnd();
      return;
    }

    // If already playing this message, toggle stop
    if (isPlaying && activeId === id) {
      stop();
      return;
    }

    // Cancel any previous speech and reset cancel flag
    isCancelledRef.current = true;
    window.speechSynthesis.cancel();
    isCancelledRef.current = false;
    endCallbackRef.current = onEnd;

    // Clean text of markdown characters, headers, bullets, and emojis for clean, natural audio
    const cleanText = text
      .replace(/[*#_`~>•👉⚡🍳🧵👩🏛📄🎓💼💰❓]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) {
      if (onEnd) onEnd();
      return;
    }

    // Split into manageable chunks to guarantee complete playback
    const chunks = splitIntoSpeechChunks(cleanText);

    // Select the best voice for the locale
    const voices = availableVoices.length > 0 ? availableVoices : window.speechSynthesis.getVoices();
    const exactVoice = voices.find(v => 
      v.lang.toLowerCase() === locale.toLowerCase() || 
      v.lang.replace('_', '-').toLowerCase() === locale.toLowerCase()
    );
    const prefixVoice = voices.find(v => 
      v.lang.toLowerCase().startsWith(locale.slice(0, 2).toLowerCase())
    );
    const selectedVoice = exactVoice || prefixVoice || null;

    let chunkIndex = 0;

    const speakNextChunk = () => {
      if (isCancelledRef.current || chunkIndex >= chunks.length) {
        setIsPlaying(false);
        setActiveId(null);
        if (endCallbackRef.current) {
          const cb = endCallbackRef.current;
          endCallbackRef.current = undefined;
          cb();
        }
        return;
      }

      const chunkText = chunks[chunkIndex];
      chunkIndex++;

      const utterance = new SpeechSynthesisUtterance(chunkText);
      utterance.lang = locale;
      utterance.rate = 0.94; // Clear, deliberate pace for first-time citizens
      utterance.pitch = 1.0;
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      utterance.onstart = () => {
        if (!isCancelledRef.current) {
          setIsPlaying(true);
          setActiveId(id);
        }
      };

      utterance.onend = () => {
        if (!isCancelledRef.current) {
          speakNextChunk();
        }
      };

      utterance.onerror = (e) => {
        if (isCancelledRef.current) return;
        console.warn('[JanSakhi Voice] Speech chunk error:', e);
        speakNextChunk();
      };

      window.speechSynthesis.speak(utterance);
    };

    speakNextChunk();
  }, [isSupported, isPlaying, activeId, availableVoices, stop]);

  return {
    isSupported,
    isPlaying,
    activeId,
    speak,
    stop,
  };
}
