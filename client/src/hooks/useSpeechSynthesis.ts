import { useState, useEffect, useRef, useCallback } from 'react';

interface SpeechSynthesisHook {
  isSupported: boolean;
  isPlaying: boolean;
  activeId: string | null;
  speak: (id: string, text: string, locale: string, onEnd?: () => void) => void;
  stop: () => void;
}

export function useSpeechSynthesis(): SpeechSynthesisHook {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
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

    // Cancel any previous speech
    window.speechSynthesis.cancel();
    endCallbackRef.current = onEnd;

    // Clean text of markdown characters and emojis for cleaner audio
    const cleanText = text
      .replace(/[*#_`~>•👉⚡🍳🧵👩🏛📄🎓💼💰❓]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (!cleanText) {
      if (onEnd) onEnd();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = locale;
    utterance.rate = 0.92; // Deliberate, clear pace for first-time citizens
    utterance.pitch = 1.0;

    // Try finding exact locale match (e.g. te-IN), then language prefix match (te)
    const voices = availableVoices.length > 0 ? availableVoices : window.speechSynthesis.getVoices();
    const exactVoice = voices.find(v => 
      v.lang.toLowerCase() === locale.toLowerCase() || 
      v.lang.replace('_', '-').toLowerCase() === locale.toLowerCase()
    );
    const prefixVoice = voices.find(v => 
      v.lang.toLowerCase().startsWith(locale.slice(0, 2).toLowerCase())
    );
    
    if (exactVoice) {
      utterance.voice = exactVoice;
    } else if (prefixVoice) {
      utterance.voice = prefixVoice;
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      setActiveId(id);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setActiveId(null);
      if (endCallbackRef.current) {
        const cb = endCallbackRef.current;
        endCallbackRef.current = undefined;
        cb();
      }
    };

    utterance.onerror = (e) => {
      console.warn('[JanSakhi Voice] Speech synthesis error:', e);
      setIsPlaying(false);
      setActiveId(null);
      if (endCallbackRef.current) {
        const cb = endCallbackRef.current;
        endCallbackRef.current = undefined;
        cb();
      }
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [isSupported, isPlaying, activeId, availableVoices, stop]);

  return {
    isSupported,
    isPlaying,
    activeId,
    speak,
    stop,
  };
}
