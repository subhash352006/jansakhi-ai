import React, { useState, useEffect } from 'react';
import { UIStrings } from '../constants/uiStrings';
import { Mic, CheckCircle2, RotateCcw, X, Edit3, Send } from 'lucide-react';

interface VoiceConfirmationCardProps {
  spokenText: string;
  strings: UIStrings;
  highContrast: boolean;
  onConfirm: (text: string) => void;
  onRetry: () => void;
  onCancel: () => void;
}

export const VoiceConfirmationCard: React.FC<VoiceConfirmationCardProps> = ({
  spokenText,
  strings,
  highContrast,
  onConfirm,
  onRetry,
  onCancel,
}) => {
  const [editText, setEditText] = useState(spokenText);

  useEffect(() => {
    setEditText(spokenText);
  }, [spokenText]);

  const handleSend = () => {
    if (editText.trim()) {
      onConfirm(editText.trim());
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={strings.voiceConfirm.didYouSay}
      className={`rounded-3xl p-5 border-2 shadow-2xl my-4 animate-scaleUp transition-all duration-200 ${
        highContrast
          ? 'bg-black border-yellow-400 text-yellow-300'
          : 'bg-white border-amber-400 text-stone-900 shadow-orange-200/60 ring-4 ring-amber-100'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-amber-200">
        <div className="flex items-center gap-2 text-amber-800 font-extrabold text-sm sm:text-base">
          <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
            <Mic className="w-4 h-4" />
          </div>
          <span>{strings.voiceConfirm.didYouSay}</span>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
          aria-label={strings.voiceConfirm.cancelButton}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Editable Spoken Text Input */}
      <div className="my-4">
        <div className="relative">
          <textarea
            rows={2}
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            placeholder={strings.voiceConfirm.editPlaceholder}
            className={`w-full p-3.5 rounded-2xl border-2 font-bold text-base sm:text-lg focus:outline-none focus:ring-2 transition-all ${
              highContrast
                ? 'bg-stone-900 border-yellow-400 text-yellow-300 focus:ring-white'
                : 'bg-amber-50/50 border-amber-300 text-stone-900 focus:ring-amber-500'
            }`}
          />
          <div className="absolute right-3 bottom-3 text-stone-400 pointer-events-none">
            <Edit3 className="w-4 h-4" />
          </div>
        </div>
        <p className="text-xs text-stone-500 font-medium mt-1">
          {strings.voiceConfirm.editPlaceholder}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-end gap-2.5 pt-2">
        <button
          type="button"
          onClick={onRetry}
          className={`w-full sm:w-auto px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 border transition-all ${
            highContrast
              ? 'border-yellow-400 text-yellow-300 hover:bg-yellow-400 hover:text-black'
              : 'border-stone-300 hover:bg-stone-100 text-stone-700'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          <span>{strings.voiceConfirm.retryButton}</span>
        </button>

        <button
          type="button"
          onClick={handleSend}
          disabled={!editText.trim()}
          className={`w-full sm:w-auto px-6 py-3 rounded-xl font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-md transition-all ${
            !editText.trim()
              ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
              : highContrast
              ? 'bg-yellow-400 text-black hover:bg-yellow-300'
              : 'bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white shadow-emerald-200 hover:scale-102'
          }`}
        >
          <Send className="w-4 h-4" />
          <span>{strings.voiceConfirm.confirmButton}</span>
        </button>
      </div>
    </div>
  );
};
