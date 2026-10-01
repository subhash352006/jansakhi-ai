import React, { useState } from 'react';
import { ChatMessage, SupportedLanguage } from '../../../shared/types';
import { UIStrings } from '../constants/uiStrings';
import { StepGuideCard } from './StepGuideCard';
import { 
  Send, 
  Volume2, 
  VolumeX, 
  Bot, 
  User, 
  ShieldAlert, 
  Loader2, 
  Sparkles, 
  HelpCircle,
  ArrowRight
} from 'lucide-react';

interface AssistantChatProps {
  messages: ChatMessage[];
  currentLanguage: SupportedLanguage;
  strings: UIStrings;
  highContrast: boolean;
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  onReadAloud: (id: string, text: string) => void;
  playingMessageId: string | null;
  onStopAudio: () => void;
}

export const AssistantChat: React.FC<AssistantChatProps> = ({
  messages,
  currentLanguage,
  strings,
  highContrast,
  onSendMessage,
  isLoading,
  onReadAloud,
  playingMessageId,
  onStopAudio,
}) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  return (
    <div className="w-full space-y-4">
      {/* Message history */}
      <div
        className="space-y-4"
        role="log"
        aria-live="polite"
        aria-label="Conversation with JanSakhi AI"
      >
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          const isPlaying = playingMessageId === msg.id;

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} transition-all`}
            >
              <div
                className={`max-w-[96%] sm:max-w-[90%] rounded-3xl p-4 sm:p-5 shadow-sm border transition-all ${
                  isUser
                    ? highContrast
                      ? 'bg-yellow-400 text-black border-yellow-300 font-bold'
                      : 'bg-amber-600 text-white border-amber-600 rounded-br-sm'
                    : msg.isWarning
                    ? 'bg-red-50 text-red-950 border-red-300 rounded-bl-sm'
                    : highContrast
                    ? 'bg-stone-900 text-yellow-300 border-yellow-400 rounded-bl-sm'
                    : 'bg-white text-stone-800 border-amber-200/80 rounded-bl-sm shadow-orange-50'
                }`}
              >
                {/* Speaker indicator */}
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold opacity-80">
                    {isUser ? (
                      <>
                        <User className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{currentLanguage === 'te' ? 'మీరు' : currentLanguage === 'hi' ? 'आप' : 'You'}</span>
                      </>
                    ) : msg.isWarning ? (
                      <>
                        <ShieldAlert className="w-3.5 h-3.5 text-red-600" aria-hidden="true" />
                        <span className="text-red-700 font-extrabold">Security Protection</span>
                      </>
                    ) : (
                      <>
                        <Bot className={`w-3.5 h-3.5 ${highContrast ? 'text-yellow-400' : 'text-amber-600'}`} aria-hidden="true" />
                        <span className={`font-bold ${highContrast ? 'text-yellow-300' : 'text-amber-800'}`}>JanSakhi AI</span>
                      </>
                    )}
                  </div>

                  {/* Read Aloud Button for Assistant Responses */}
                  {!isUser && (
                    <button
                      type="button"
                      onClick={() =>
                        isPlaying
                          ? onStopAudio()
                          : onReadAloud(msg.id, msg.readAloudText || msg.content)
                      }
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors ${
                        isPlaying
                          ? 'bg-red-600 text-white animate-pulse'
                          : highContrast
                          ? 'bg-yellow-400 text-black hover:bg-yellow-300'
                          : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
                      }`}
                      aria-label={isPlaying ? strings.stopAudio : strings.readAloud}
                    >
                      {isPlaying ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5 fill-current animate-pulse" />
                          <span>{strings.stopAudio}</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>{strings.readAloud}</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* Content body */}
                <div className={`text-sm sm:text-base leading-relaxed whitespace-pre-line font-medium ${
                  isUser
                    ? 'text-inherit'
                    : highContrast
                    ? 'text-slate-100'
                    : 'text-stone-800'
                }`}>
                  {msg.content}
                </div>

                {/* SMART FOLLOW-UP QUESTIONS: Interactive Choice Buttons */}
                {msg.followUpQuestion && (
                  <div className={`mt-4 pt-3 border-t space-y-2 ${
                    highContrast ? 'border-yellow-400/40' : 'border-amber-200'
                  }`}>
                    <span className={`text-xs font-bold uppercase tracking-wider block ${
                      highContrast ? 'text-yellow-400' : 'text-amber-900'
                    }`}>
                      👇 {msg.followUpQuestion.question}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {msg.followUpQuestion.choices.map((choice, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => onSendMessage(choice.prompt)}
                          className={`p-3 rounded-xl border text-left font-bold text-xs sm:text-sm flex items-center justify-between gap-2 transition-all hover:scale-101 active:scale-99 shadow-xs ${
                            highContrast
                              ? 'bg-stone-950 border-yellow-400 text-yellow-300 hover:bg-yellow-400 hover:text-black'
                              : 'bg-amber-50/80 hover:bg-amber-100/90 text-amber-950 border-amber-300'
                          }`}
                        >
                          <span>{choice.label}</span>
                          <ArrowRight className={`w-4 h-4 shrink-0 ${highContrast ? 'text-yellow-400' : 'text-amber-700'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STRUCTURED SERVICE GUIDANCE: 7-Part Interactive Card */}
                {msg.structuredGuidance && (
                  <div className="mt-3">
                    <StepGuideCard
                      guidance={msg.structuredGuidance}
                      strings={strings}
                      highContrast={highContrast}
                      onReadAloud={(txt) => onReadAloud(`step-${msg.id}`, txt)}
                      isPlayingAudio={playingMessageId === `step-${msg.id}`}
                      onStopAudio={onStopAudio}
                    />
                  </div>
                )}

                {/* Suggested Action Chips */}
                {msg.suggestedActions && msg.suggestedActions.length > 0 && !msg.followUpQuestion && (
                  <div className={`mt-3 pt-3 border-t flex flex-wrap gap-1.5 ${
                    highContrast ? 'border-yellow-400/30' : 'border-amber-100'
                  }`}>
                    {msg.suggestedActions.map((action, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => onSendMessage(action)}
                        className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                          highContrast
                            ? 'border-yellow-400 bg-stone-900 text-yellow-300 hover:bg-yellow-400 hover:text-black'
                            : 'border-amber-300 bg-amber-50/80 text-amber-900 hover:bg-amber-100'
                        }`}
                      >
                        {action} ➔
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Loading message bubble */}
        {isLoading && (
          <div className="flex justify-start">
            <div className={`rounded-3xl rounded-bl-sm p-4 border flex items-center gap-3 text-sm shadow-sm ${
              highContrast
                ? 'bg-stone-900 border-yellow-400 text-yellow-300'
                : 'bg-white border-amber-200 text-stone-600'
            }`}>
              <Loader2 className={`w-5 h-5 animate-spin ${highContrast ? 'text-yellow-400' : 'text-amber-600'}`} />
              <span className="font-semibold">{strings.processing}</span>
            </div>
          </div>
        )}
      </div>

      {/* Input bar */}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={strings.typePlaceholder}
            disabled={isLoading}
            className={`flex-1 p-3.5 sm:p-4 rounded-2xl border text-sm sm:text-base font-medium focus:outline-none focus:ring-2 transition-all ${
              highContrast
                ? 'bg-stone-950 border-yellow-400 text-yellow-100 focus:ring-yellow-400 placeholder:text-stone-400'
                : 'bg-white border-amber-300 text-stone-900 focus:ring-amber-500 shadow-sm placeholder:text-stone-400'
            }`}
          />
          <button
            type="submit"
            disabled={isLoading || !inputText.trim()}
            className={`p-3.5 sm:p-4 rounded-2xl font-bold flex items-center justify-center transition-all shadow-md ${
              isLoading || !inputText.trim()
                ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                : highContrast
                ? 'bg-yellow-400 text-black hover:bg-yellow-300'
                : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white'
            }`}
            aria-label={strings.sendButton}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};
