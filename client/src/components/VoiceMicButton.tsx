import React from 'react';
import { Mic, MicOff, Loader2, Square, Sparkles, Volume2 } from 'lucide-react';
import { UIStrings } from '../constants/uiStrings';

export type VoiceState = 'idle' | 'listening' | 'understanding' | 'speaking' | 'error';

interface VoiceMicButtonProps {
  isSupported: boolean;
  voiceState: VoiceState;
  isListening: boolean;
  isProcessing: boolean;
  isSpeaking: boolean;
  onStartListening: () => void;
  onStopListening: () => void;
  onStopSpeaking: () => void;
  strings: UIStrings;
  highContrast: boolean;
  errorMessage: string | null;
  currentTranscript?: string;
  hasSpokenPreviously?: boolean;
  onSimulateDemoVoice?: (text: string) => void;
}

export const VoiceMicButton: React.FC<VoiceMicButtonProps> = ({
  isSupported,
  voiceState,
  isListening,
  isProcessing,
  isSpeaking,
  onStartListening,
  onStopListening,
  onStopSpeaking,
  strings,
  highContrast,
  errorMessage,
  currentTranscript,
  hasSpokenPreviously = false,
  onSimulateDemoVoice,
}) => {
  const handleClick = () => {
    if (isSpeaking) {
      onStopSpeaking();
    } else if (isListening) {
      onStopListening();
    } else if (!isProcessing) {
      onStartListening();
    }
  };

  // Localized error text
  const getErrorText = () => {
    if (!errorMessage) return null;
    if (errorMessage === 'not-allowed') return strings.errors.micDenied;
    if (errorMessage === 'not-supported') return strings.errors.notSupported;
    if (errorMessage === 'no-speech') return strings.errors.noSpeech;
    if (errorMessage === 'network') return strings.errors.network;
    return strings.errors.generic;
  };

  const errorText = getErrorText();

  // Localized status labels for the 5 distinct states
  const getStatusLabel = () => {
    if (isListening) return `🔴 ${strings.listening}`;
    if (isProcessing) return `⏳ ${strings.processing}`;
    if (isSpeaking) return `🔊 ${strings.appName} ${strings.speaking || 'is speaking...'}`;
    if (hasSpokenPreviously) return `🎤 ${strings.tapToSpeakAgain || strings.tapToSpeak}`;
    return strings.heroPrompt;
  };

  return (
    <div className="flex flex-col items-center justify-center text-center my-4">
      {/* Visual pulse ring when listening or speaking */}
      <div className="relative">
        {isListening && (
          <span className="absolute inset-0 rounded-full bg-red-500 opacity-60 animate-ping" />
        )}
        {isSpeaking && (
          <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-50 animate-ping" />
        )}

        <button
          type="button"
          onClick={handleClick}
          disabled={isProcessing}
          aria-label={
            isListening
              ? `${strings.listening} — ${strings.stopAudio}`
              : isSpeaking
              ? `${strings.speaking || 'Speaking'} — ${strings.stopAudio}`
              : isProcessing
              ? strings.processing
              : strings.tapToSpeak
          }
          className={`relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full flex flex-col items-center justify-center transition-all duration-300 shadow-xl focus:outline-none focus:ring-4 focus:ring-offset-2 ${
            highContrast
              ? isListening
                ? 'bg-red-600 text-white ring-yellow-400 ring-4'
                : isSpeaking
                ? 'bg-emerald-400 text-black ring-yellow-400 ring-4'
                : isProcessing
                ? 'bg-yellow-500 text-black ring-white ring-4'
                : 'bg-yellow-400 text-black hover:bg-yellow-300 ring-white'
              : isListening
              ? 'bg-red-600 text-white scale-105 shadow-red-300 ring-4 ring-red-200'
              : isSpeaking
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white scale-105 shadow-emerald-300 ring-4 ring-emerald-200'
              : isProcessing
              ? 'bg-amber-500 text-stone-900 ring-4 ring-amber-100'
              : 'bg-gradient-to-tr from-amber-600 via-orange-600 to-amber-500 hover:from-amber-700 hover:to-orange-700 text-white hover:scale-105 shadow-orange-300'
          }`}
        >
          {isProcessing ? (
            <Loader2 className="w-10 h-10 animate-spin" aria-hidden="true" />
          ) : isListening ? (
            <div className="flex flex-col items-center">
              <Square className="w-7 h-7 fill-current text-white mb-0.5" aria-hidden="true" />
              <span className="text-[11px] font-black uppercase tracking-wider">{strings.stopAudio}</span>
            </div>
          ) : isSpeaking ? (
            <div className="flex flex-col items-center">
              <Volume2 className="w-8 h-8 text-white animate-pulse mb-0.5" aria-hidden="true" />
              <span className="text-[11px] font-black uppercase tracking-wider">{strings.stopAudio}</span>
            </div>
          ) : !isSupported ? (
            <MicOff className="w-10 h-10 text-stone-400" aria-hidden="true" />
          ) : (
            <Mic className="w-11 h-11" aria-hidden="true" />
          )}

          {!isListening && !isSpeaking && (
            <span className="text-xs font-bold mt-1 tracking-wide">
              {isProcessing ? '...' : hasSpokenPreviously ? (strings.tapToSpeakAgain || strings.tapToSpeak) : strings.tapToSpeak}
            </span>
          )}
        </button>
      </div>

      {/* Voice Status or Helper Label */}
      <div className="mt-3 max-w-md px-2">
        {/* Animated equalizer bars when JanSakhi is speaking */}
        {isSpeaking && (
          <div className="flex items-center justify-center gap-1 mb-1.5" aria-hidden="true">
            <span className="w-1 h-3.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1 h-5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            <span className="w-1 h-6 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '100ms' }} />
            <span className="w-1 h-3.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '250ms' }} />
          </div>
        )}

        <p
          className={`font-bold text-sm sm:text-base transition-colors leading-relaxed ${
            isListening
              ? 'text-red-500 animate-pulse'
              : isSpeaking
              ? highContrast ? 'text-emerald-300' : 'text-emerald-700'
              : isProcessing
              ? highContrast ? 'text-yellow-300' : 'text-amber-800'
              : highContrast
              ? 'text-yellow-300'
              : 'text-stone-700'
          }`}
          aria-live="polite"
        >
          {getStatusLabel()}
        </p>

        {/* Live Interim Speech Preview when listening */}
        {isListening && currentTranscript && (
          <div className={`mt-2.5 p-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold inline-block shadow-sm animate-pulse border ${
            highContrast
              ? 'bg-stone-900 border-red-400 text-yellow-200'
              : 'bg-red-50 border-red-300 text-red-950'
          }`}>
            🗣 "{currentTranscript}"
          </div>
        )}

        {/* Dedicated "Stop Speaking" accessible button while speaking */}
        {isSpeaking && (
          <div className="mt-2 flex items-center justify-center">
            <button
              type="button"
              onClick={onStopSpeaking}
              className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-all ${
                highContrast
                  ? 'bg-yellow-400 text-black hover:bg-yellow-300 ring-2 ring-white'
                  : 'bg-red-100 hover:bg-red-200 text-red-800 border border-red-300'
              }`}
            >
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>{strings.stopAudio} (Stop Audio)</span>
            </button>
          </div>
        )}

        {/* Graceful Fallback Notice if browser speech is unavailable */}
        {!isSupported && (
          <div
            role="alert"
            className={`mt-2.5 text-xs sm:text-sm px-3.5 py-2 rounded-xl border inline-block font-medium ${
              highContrast
                ? 'bg-stone-900 border-yellow-400 text-yellow-300'
                : 'bg-amber-100 text-amber-950 border-amber-300'
            }`}
          >
            {strings.errors.notSupported || strings.voiceUnavailableNotice}
          </div>
        )}

        {/* Microphone Error Fallback Message (Fully localized) */}
        {errorText && (
          <div
            role="alert"
            aria-live="assertive"
            className={`mt-2.5 text-xs sm:text-sm px-3.5 py-2 rounded-xl border inline-block font-medium shadow-xs ${
              highContrast
                ? 'bg-stone-900 border-red-400 text-yellow-200'
                : 'bg-red-50 text-red-900 border-red-200'
            }`}
          >
            {errorText}
          </div>
        )}

        {/* Quick Demo Voice Helper Chip (For testing or when hardware mic is absent) */}
        {onSimulateDemoVoice && !isListening && !isProcessing && !isSpeaking && (
          <div className="mt-2.5 flex items-center justify-center">
            <button
              type="button"
              onClick={() => onSimulateDemoVoice(strings.guidedPrompts[0]?.prompt || strings.heroPrompt)}
              className={`text-xs px-3 py-1.5 rounded-full border font-semibold flex items-center gap-1.5 transition-colors shadow-2xs ${
                highContrast
                  ? 'border-yellow-400 bg-stone-900 text-yellow-300 hover:bg-yellow-400 hover:text-black'
                  : 'border-amber-300 bg-amber-50/70 hover:bg-amber-100 text-amber-900'
              }`}
              title="Test voice simulation"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>🎙️ Voice Demo ({strings.guidedPrompts[0]?.label || 'Test Voice'})</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
