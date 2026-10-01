import React from 'react';
import { HelpCircle, FileCheck, CheckCircle2, Navigation, FileText, ArrowRight } from 'lucide-react';
import { UIStrings } from '../constants/uiStrings';

interface QuickActionsProps {
  strings: UIStrings;
  onSelectAction: (actionKey: 'helpMeApply' | 'eligible' | 'documents' | 'apply' | 'explainSimply') => void;
  highContrast: boolean;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  strings,
  onSelectAction,
  highContrast,
}) => {
  return (
    <div className="w-full my-6">
      <h2
        className={`text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5 ${
          highContrast ? 'text-yellow-400' : 'text-stone-500'
        }`}
      >
        <span>{strings.quickActionsTitle}</span>
      </h2>

      {/* Primary Hero CTA: Help Me Apply */}
      <button
        type="button"
        onClick={() => onSelectAction('helpMeApply')}
        className={`w-full mb-3 p-4 sm:p-5 rounded-2xl flex items-center justify-between transition-all duration-200 border-2 shadow-md text-left group focus:outline-none focus:ring-4 ${
          highContrast
            ? 'bg-yellow-400 text-black border-yellow-300 ring-white hover:bg-yellow-300'
            : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white border-transparent ring-orange-300 shadow-orange-100'
        }`}
      >
        <div className="flex items-center gap-3.5">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
              highContrast ? 'bg-black text-yellow-400' : 'bg-white/20 text-white'
            }`}
          >
            <Navigation className="w-6 h-6 transform group-hover:rotate-45 transition-transform" />
          </div>
          <div>
            <span className="block font-black text-lg sm:text-xl">
              {strings.quickActionHelpMeApply}
            </span>
            <span className="text-xs sm:text-sm opacity-90 font-medium">
              5-Step Guided Journey • No prior experience needed
            </span>
          </div>
        </div>
        <div className="shrink-0 pl-2">
          <ArrowRight className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </button>

      {/* Grid of 4 High-Intent Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {/* 1. Am I Eligible? */}
        <button
          type="button"
          onClick={() => onSelectAction('eligible')}
          className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all duration-150 hover:shadow-md focus:outline-none focus:ring-2 ${
            highContrast
              ? 'bg-stone-900 border-yellow-400 text-yellow-300 hover:bg-stone-800'
              : 'bg-white hover:bg-amber-50/50 border-amber-200 text-stone-800 shadow-sm'
          }`}
        >
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
            highContrast ? 'bg-black text-yellow-400 border border-yellow-400/40' : 'bg-teal-100 text-teal-800'
          }`}>
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className={`font-bold text-sm block ${highContrast ? 'text-yellow-300' : 'text-stone-900'}`}>
              {strings.quickActionAmIEligible}
            </span>
            <span className={`text-xs line-clamp-1 ${highContrast ? 'text-yellow-100/80 font-medium' : 'text-stone-500'}`}>
              Check age & household rules
            </span>
          </div>
        </button>

        {/* 2. What Do I Need? */}
        <button
          type="button"
          onClick={() => onSelectAction('documents')}
          className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all duration-150 hover:shadow-md focus:outline-none focus:ring-2 ${
            highContrast
              ? 'bg-stone-900 border-yellow-400 text-yellow-300 hover:bg-stone-800'
              : 'bg-white hover:bg-amber-50/50 border-amber-200 text-stone-800 shadow-sm'
          }`}
        >
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
            highContrast ? 'bg-black text-yellow-400 border border-yellow-400/40' : 'bg-blue-100 text-blue-800'
          }`}>
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <span className={`font-bold text-sm block ${highContrast ? 'text-yellow-300' : 'text-stone-900'}`}>
              {strings.quickActionWhatDoINeed}
            </span>
            <span className={`text-xs line-clamp-1 ${highContrast ? 'text-yellow-100/80 font-medium' : 'text-stone-500'}`}>
              Ration card, ID, Bank passbook
            </span>
          </div>
        </button>

        {/* 3. How Do I Apply? */}
        <button
          type="button"
          onClick={() => onSelectAction('apply')}
          className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all duration-150 hover:shadow-md focus:outline-none focus:ring-2 ${
            highContrast
              ? 'bg-stone-900 border-yellow-400 text-yellow-300 hover:bg-stone-800'
              : 'bg-white hover:bg-amber-50/50 border-amber-200 text-stone-800 shadow-sm'
          }`}
        >
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
            highContrast ? 'bg-black text-yellow-400 border border-yellow-400/40' : 'bg-orange-100 text-orange-800'
          }`}>
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <span className={`font-bold text-sm block ${highContrast ? 'text-yellow-300' : 'text-stone-900'}`}>
              {strings.quickActionHowDoIApply}
            </span>
            <span className={`text-xs line-clamp-1 ${highContrast ? 'text-yellow-100/80 font-medium' : 'text-stone-500'}`}>
              Gas agency & CSC process
            </span>
          </div>
        </button>

        {/* 4. Explain This Simply */}
        <button
          type="button"
          onClick={() => onSelectAction('explainSimply')}
          className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all duration-150 hover:shadow-md focus:outline-none focus:ring-2 ${
            highContrast
              ? 'bg-stone-900 border-yellow-400 text-yellow-300 hover:bg-stone-800'
              : 'bg-white hover:bg-amber-50/50 border-amber-200 text-stone-800 shadow-sm'
          }`}
        >
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
            highContrast ? 'bg-black text-yellow-400 border border-yellow-400/40' : 'bg-purple-100 text-purple-800'
          }`}>
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <span className={`font-bold text-sm block ${highContrast ? 'text-yellow-300' : 'text-stone-900'}`}>
              {strings.quickActionExplainSimply}
            </span>
            <span className={`text-xs line-clamp-1 ${highContrast ? 'text-yellow-100/80 font-medium' : 'text-stone-500'}`}>
              Simplify hard official notices
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};
