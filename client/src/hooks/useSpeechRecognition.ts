import { useState, useEffect, useRef, useCallback } from 'react';

export type SpeechErrorCode = 'not-allowed' | 'not-supported' | 'no-speech' | 'network' | 'generic';
export type SpeechState = 'idle' | 'listening' | 'processing' | 'error';

interface SpeechRecognitionHook {
  isSupported: boolean;
  isListening: boolean;
  isProcessing: boolean;
  state: SpeechState;
  transcript: string;
  startListening: (locale: string) => Promise<void>;
  stopListening: () => void;
  resetTranscript: () => void;
  errorCode: SpeechErrorCode | null;
  activeLocale: string;
}

export function useSpeechRecognition(onResultCallback?: (text: string) => void): SpeechRecognitionHook {
  const [speechState, setSpeechState] = useState<SpeechState>('idle');
  const [transcript, setTranscript] = useState('');
  const [errorCode, setErrorCode] = useState<SpeechErrorCode | null>(null);
  const [activeLocale, setActiveLocale] = useState('te-IN');

  const recognitionRef = useRef<any>(null);
  const callbackRef = useRef(onResultCallback);
  const timeoutRef = useRef<any>(null);
  const silenceTimeoutRef = useRef<any>(null);
  const finalSpokenTextRef = useRef('');

  // Always keep callback reference current without triggering re-initialization
  useEffect(() => {
    callbackRef.current = onResultCallback;
  }, [onResultCallback]);

  const isSupported = typeof window !== 'undefined' && 
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

  // Clear all safety timers
  const clearTimers = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
      silenceTimeoutRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimers();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (_) {}
      }
    };
  }, [clearTimers]);

  // Clean stop
  const stopListening = useCallback(() => {
    clearTimers();
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (_) {}
    }
    // If we have captured transcript, process it; otherwise return to idle
    if (finalSpokenTextRef.current.trim()) {
      setSpeechState('processing');
      const text = finalSpokenTextRef.current.trim();
      if (callbackRef.current) {
        callbackRef.current(text);
      }
      setTimeout(() => setSpeechState('idle'), 400);
    } else {
      setSpeechState('idle');
    }
  }, [clearTimers]);

  // Start listening with full lifecycle and permission handling
  const startListening = useCallback(async (locale: string) => {
    clearTimers();
    setErrorCode(null);
    setTranscript('');
    finalSpokenTextRef.current = '';
    setActiveLocale(locale);

    if (!isSupported) {
      setSpeechState('error');
      setErrorCode('not-supported');
      return;
    }

    // Abort existing instance cleanly
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (_) {}
      recognitionRef.current = null;
    }

    const hasDeliveredRef = { current: false };

    const deliverResult = (textToDeliver: string) => {
      if (hasDeliveredRef.current) return;
      const clean = textToDeliver.trim();
      if (!clean) return;
      hasDeliveredRef.current = true;
      finalSpokenTextRef.current = '';
      clearTimers();
      setTranscript(clean);
      setSpeechState('processing');
      if (callbackRef.current) {
        callbackRef.current(clean);
      }
      setTimeout(() => setSpeechState('idle'), 300);
    };

    try {
      const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognitionClass();

      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;
      recognition.lang = locale;

      recognition.onstart = () => {
        setSpeechState('listening');
        setErrorCode(null);

        // Safety Timeout: Never allow the interface to remain stuck in "listening"
        timeoutRef.current = setTimeout(() => {
          if (!finalSpokenTextRef.current.trim()) {
            setSpeechState('error');
            setErrorCode('no-speech');
            try {
              recognition.abort();
            } catch (_) {}
          } else {
            deliverResult(finalSpokenTextRef.current);
            try {
              recognition.stop();
            } catch (_) {}
          }
        }, 10000);
      };

      recognition.onspeechstart = () => {
        if (silenceTimeoutRef.current) {
          clearTimeout(silenceTimeoutRef.current);
        }
      };

      recognition.onresult = (event: any) => {
        let interimText = '';
        let isFinal = false;

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const item = event.results[i];
          const text = item[0].transcript;
          if (item.isFinal) {
            interimText = text;
            finalSpokenTextRef.current = text;
            isFinal = true;
          } else {
            interimText += text;
          }
        }

        setTranscript(interimText || finalSpokenTextRef.current);

        if (isFinal && finalSpokenTextRef.current.trim()) {
          deliverResult(finalSpokenTextRef.current);
        }
      };

      recognition.onerror = (event: any) => {
        clearTimers();
        console.warn('[JanSakhi Voice] Recognition error event:', event.error);

        if (event.error === 'not-allowed' || event.error === 'permission-denied') {
          setErrorCode('not-allowed');
        } else if (event.error === 'no-speech') {
          if (finalSpokenTextRef.current.trim()) {
            deliverResult(finalSpokenTextRef.current);
            return;
          }
          setErrorCode('no-speech');
        } else if (event.error === 'network') {
          setErrorCode('network');
        } else if (event.error === 'aborted') {
          setSpeechState('idle');
          return;
        } else {
          setErrorCode('generic');
        }
        setSpeechState('error');
      };

      recognition.onend = () => {
        clearTimers();
        if (finalSpokenTextRef.current.trim()) {
          deliverResult(finalSpokenTextRef.current);
        } else {
          setSpeechState((prev) => (prev === 'listening' ? 'idle' : prev));
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err: any) {
      clearTimers();
      console.error('[JanSakhi Voice] Error initializing SpeechRecognition:', err);
      if (err?.name === 'NotAllowedError') {
        setErrorCode('not-allowed');
      } else {
        setErrorCode('generic');
      }
      setSpeechState('error');
    }
  }, [clearTimers, isSupported, stopListening]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    finalSpokenTextRef.current = '';
    setErrorCode(null);
    setSpeechState('idle');
  }, []);

  // Expose test helper on window for automated verification & demo simulation
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).__janSakhiVoice = {
        simulateSpeech: (text: string) => {
          setSpeechState('listening');
          setTranscript(text);
          finalSpokenTextRef.current = text;
          setTimeout(() => {
            setSpeechState('processing');
            if (callbackRef.current) {
              callbackRef.current(text);
            }
            setTimeout(() => setSpeechState('idle'), 300);
          }, 400);
        },
        simulateError: (code: SpeechErrorCode) => {
          setErrorCode(code);
          setSpeechState('error');
        },
        getState: () => ({
          state: speechState,
          transcript,
          errorCode,
          activeLocale,
          isSupported,
        }),
      };
    }
  }, [speechState, transcript, errorCode, activeLocale, isSupported]);

  return {
    isSupported,
    isListening: speechState === 'listening',
    isProcessing: speechState === 'processing',
    state: speechState,
    transcript,
    startListening,
    stopListening,
    resetTranscript,
    errorCode,
    activeLocale,
  };
}
