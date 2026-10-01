import React, { useState } from 'react';
import { UIStrings } from '../constants/uiStrings';
import { SupportedLanguage, ExplainSimplyResult } from '../../../shared/types';
import { 
  FileText, 
  Sparkles, 
  HelpCircle, 
  CheckSquare, 
  Files, 
  ArrowRightCircle, 
  Volume2, 
  VolumeX, 
  Loader2, 
  ShieldAlert, 
  X 
} from 'lucide-react';

interface ExplainSimplyProps {
  currentLanguage: SupportedLanguage;
  strings: UIStrings;
  highContrast: boolean;
  onReadAloud: (text: string) => void;
  isPlayingAudio: boolean;
  onStopAudio: () => void;
  onClose: () => void;
}

export const ExplainSimply: React.FC<ExplainSimplyProps> = ({
  currentLanguage,
  strings,
  highContrast,
  onReadAloud,
  isPlayingAudio,
  onStopAudio,
  onClose,
}) => {
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<ExplainSimplyResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLoadSample = () => {
    setInputText(strings.sampleNoticeText);
  };

  const handleSimplify = async () => {
    if (!inputText.trim()) {
      setError(strings.explainSimplyPlaceholder);
      return;
    }
    setError(null);
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/explain-simply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          complexText: inputText,
          language: currentLanguage,
        }),
      });

      const data = await response.json();
      if (!data.success) {
        setError(data.error || 'Failed to simplify. Please try again.');
      } else {
        setResult({
          meaning: data.meaning,
          actions: data.actions || [],
          documents: data.documents || [],
          nextStep: data.nextStep,
          disclaimer: data.disclaimer || strings.disclaimer,
        });
      }
    } catch (err: any) {
      console.error('Error in explain simply:', err);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`rounded-3xl p-5 sm:p-7 border-2 shadow-xl my-6 transition-all duration-200 ${
        highContrast
          ? 'bg-black border-yellow-400 text-yellow-300'
          : 'bg-white border-purple-200 text-stone-900 shadow-purple-100/50'
      }`}
      aria-label="Explain This Simply"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-purple-200/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black">
              {strings.explainSimplyHeader}
            </h2>
            <p className="text-xs text-stone-500 font-medium">
              {strings.explainSimplySubtitle}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          aria-label="Close Explain This Simply"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Example guidance before user enters text */}
      {!result && !inputText && (
        <div className="p-4 my-2 rounded-2xl bg-purple-50/80 border border-purple-200 text-purple-950 flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-purple-200 text-purple-800 flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
            💡
          </div>
          <div>
            <span className="font-bold text-xs uppercase tracking-wide text-purple-900 block">
              {currentLanguage === 'te' ? 'ఉదాహరణ సూచన' : currentLanguage === 'hi' ? 'उदाहरण निर्देश' : 'How it works'}
            </span>
            <p className="text-xs sm:text-sm font-medium mt-0.5 text-stone-700">
              {currentLanguage === 'te'
                ? 'మీకు అర్థం కాని ప్రభుత్వ ఆదేశం లేదా నిబంధనను ఇక్కడ పేస్ట్ చేయండి. మేము దానిని 4 సులభమైన భాగాలుగా వివరిస్తాము.'
                : currentLanguage === 'hi'
                ? 'कोई भी कठिन सरकारी आदेश जिसे आप समझ नहीं पा रहे हैं, यहाँ पेस्ट करें। हम इसे 4 आसान हिस्सों में समझाएंगे।'
                : 'Paste a government instruction you don\'t understand. We will transform it into 4 simple, actionable parts.'}
            </p>
          </div>
        </div>
      )}

      {/* Input area */}
      <div className="py-2 space-y-3">
        <div className="flex items-center justify-between">
          <label htmlFor="complex-notice-input" className="text-xs font-bold uppercase tracking-wider text-purple-900">
            {currentLanguage === 'te' ? 'ప్రభుత్వ నోటీసు లేదా నియమం' : currentLanguage === 'hi' ? 'सरकारी आदेश / सूचना' : 'Official Notice / Circular Text'}
          </label>
          <button
            type="button"
            onClick={handleLoadSample}
            className="text-xs font-bold text-purple-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 px-2.5 py-1 rounded-lg border border-purple-200 transition-colors"
          >
            📋 {strings.sampleNoticeButton}
          </button>
        </div>

        <textarea
          id="complex-notice-input"
          rows={3}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={strings.explainSimplyPlaceholder}
          className="w-full p-3.5 rounded-2xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm font-medium text-stone-900 bg-stone-50/50"
        />

        {error && (
          <div className="p-3 rounded-xl bg-red-50 text-red-700 border border-red-200 text-xs font-medium flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="button"
            id="explain-simply-submit"
            onClick={handleSimplify}
            disabled={isLoading || !inputText.trim()}
            className={`px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 shadow-md transition-all ${
              isLoading || !inputText.trim()
                ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-800 hover:to-indigo-700 text-white'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{strings.processing}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>{strings.explainButton}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Output 4-part breakdown */}
      {result && (
        <div className="mt-4 pt-4 border-t border-purple-200/60 space-y-3.5 animate-fadeIn">
          {/* Audio read-all header */}
          <div className="flex items-center justify-between bg-purple-50 p-2.5 rounded-xl border border-purple-200">
            <span className="text-xs font-bold text-purple-900">
              ✨ {currentLanguage === 'te' ? 'సరళీకరించిన వివరణ' : currentLanguage === 'hi' ? 'सरल भाषा में सारांश' : 'Simplified Breakdown'}
            </span>
            <button
              type="button"
              onClick={() => {
                const fullSummary = `${strings.sections.meaning}: ${result.meaning}. ${strings.sections.nextStep}: ${result.nextStep}`;
                onReadAloud(fullSummary);
              }}
              className="px-3 py-1 rounded-lg bg-white border border-purple-300 text-purple-800 text-xs font-bold flex items-center gap-1.5 hover:bg-purple-100"
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-red-600" />
                  <span>{strings.stopAudio}</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{strings.readAloud}</span>
                </>
              )}
            </button>
          </div>

          {/* 1. What does this mean? */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-300">
            <div className="flex items-center gap-2 mb-1 text-amber-900 font-bold text-sm">
              <HelpCircle className="w-4 h-4 text-amber-700" />
              <h4>{strings.sections.meaning}</h4>
            </div>
            <p className="text-sm text-stone-800 leading-relaxed font-medium pl-6">
              {result.meaning}
            </p>
          </div>

          {/* 2. What do I need to do? */}
          <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200">
            <div className="flex items-center gap-2 mb-1 text-teal-900 font-bold text-sm">
              <CheckSquare className="w-4 h-4 text-teal-700" />
              <h4>{strings.sections.actions}</h4>
            </div>
            <ul className="space-y-1.5 pl-6 list-disc text-sm text-stone-800 font-medium">
              {result.actions.map((act, idx) => (
                <li key={idx}>{act}</li>
              ))}
            </ul>
          </div>

          {/* 3. Documents needed */}
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200">
            <div className="flex items-center gap-2 mb-1 text-blue-900 font-bold text-sm">
              <Files className="w-4 h-4 text-blue-700" />
              <h4>{strings.sections.documents}</h4>
            </div>
            <ul className="space-y-1.5 pl-6 list-disc text-sm text-stone-800 font-medium">
              {result.documents.map((doc, idx) => (
                <li key={idx}>{doc}</li>
              ))}
            </ul>
          </div>

          {/* 4. Next Step */}
          <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200">
            <div className="flex items-center gap-2 mb-1 text-purple-900 font-bold text-sm">
              <ArrowRightCircle className="w-4 h-4 text-purple-700" />
              <h4>{strings.sections.nextStep}</h4>
            </div>
            <p className="text-sm text-stone-800 leading-relaxed font-medium pl-6">
              {result.nextStep}
            </p>
          </div>

          <div className="text-xs text-stone-500 pt-2 italic">
            * {result.disclaimer}
          </div>
        </div>
      )}
    </div>
  );
};
