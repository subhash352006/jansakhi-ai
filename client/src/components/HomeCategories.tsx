import React from 'react';
import { UIStrings } from '../constants/uiStrings';
import { ServiceCategory } from '../../../shared/types';
import { 
  Landmark, 
  FileText, 
  GraduationCap, 
  Briefcase, 
  Coins, 
  HelpCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface HomeCategoriesProps {
  strings: UIStrings;
  highContrast: boolean;
  onSelectCategory: (categoryKey: ServiceCategory, prompt: string) => void;
  onSelectGuidedPrompt: (prompt: string) => void;
}

export const HomeCategories: React.FC<HomeCategoriesProps> = ({
  strings,
  highContrast,
  onSelectCategory,
  onSelectGuidedPrompt,
}) => {
  const categoriesList: Array<{
    key: ServiceCategory;
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    samplePrompt: string;
    bgGradient: string;
    iconBg: string;
    border: string;
  }> = [
    {
      key: 'schemes',
      icon: <Landmark className="w-7 h-7 text-amber-700" />,
      title: strings.categories.schemes.title,
      subtitle: strings.categories.schemes.subtitle,
      samplePrompt: strings.categories.schemes.samplePrompt,
      bgGradient: 'from-amber-500/10 to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20',
      iconBg: 'bg-amber-100 text-amber-800',
      border: 'border-amber-300/80',
    },
    {
      key: 'documents',
      icon: <FileText className="w-7 h-7 text-teal-700" />,
      title: strings.categories.documents.title,
      subtitle: strings.categories.documents.subtitle,
      samplePrompt: strings.categories.documents.samplePrompt,
      bgGradient: 'from-teal-500/10 to-emerald-500/10 hover:from-teal-500/20 hover:to-emerald-500/20',
      iconBg: 'bg-teal-100 text-teal-800',
      border: 'border-teal-300/80',
    },
    {
      key: 'education',
      icon: <GraduationCap className="w-7 h-7 text-purple-700" />,
      title: strings.categories.education.title,
      subtitle: strings.categories.education.subtitle,
      samplePrompt: strings.categories.education.samplePrompt,
      bgGradient: 'from-purple-500/10 to-indigo-500/10 hover:from-purple-500/20 hover:to-indigo-500/20',
      iconBg: 'bg-purple-100 text-purple-800',
      border: 'border-purple-300/80',
    },
    {
      key: 'jobs',
      icon: <Briefcase className="w-7 h-7 text-blue-700" />,
      title: strings.categories.jobs.title,
      subtitle: strings.categories.jobs.subtitle,
      samplePrompt: strings.categories.jobs.samplePrompt,
      bgGradient: 'from-blue-500/10 to-sky-500/10 hover:from-blue-500/20 hover:to-sky-500/20',
      iconBg: 'bg-blue-100 text-blue-800',
      border: 'border-blue-300/80',
    },
    {
      key: 'finance',
      icon: <Coins className="w-7 h-7 text-emerald-700" />,
      title: strings.categories.finance.title,
      subtitle: strings.categories.finance.subtitle,
      samplePrompt: strings.categories.finance.samplePrompt,
      bgGradient: 'from-emerald-500/10 to-green-500/10 hover:from-emerald-500/20 hover:to-green-500/20',
      iconBg: 'bg-emerald-100 text-emerald-800',
      border: 'border-emerald-300/80',
    },
    {
      key: 'askJanSakhi',
      icon: <HelpCircle className="w-7 h-7 text-rose-700" />,
      title: strings.categories.askJanSakhi.title,
      subtitle: strings.categories.askJanSakhi.subtitle,
      samplePrompt: strings.categories.askJanSakhi.samplePrompt,
      bgGradient: 'from-rose-500/10 to-pink-500/10 hover:from-rose-500/20 hover:to-pink-500/20',
      iconBg: 'bg-rose-100 text-rose-800',
      border: 'border-rose-300/80',
    },
  ];

  return (
    <section className="w-full my-4" aria-label={strings.homeCategoryTitle}>
      {/* Friendly Section Header */}
      <div className="mb-3 text-center sm:text-left">
        <h2
          className={`text-lg sm:text-xl font-black tracking-tight flex items-center justify-center sm:justify-start gap-2 ${
            highContrast ? 'text-yellow-400' : 'text-stone-900'
          }`}
        >
          <Sparkles className="w-5 h-5 text-amber-600" />
          <span>{strings.homeCategoryTitle}</span>
        </h2>
        <p className={`text-xs sm:text-sm font-medium mt-0.5 ${
          highContrast ? 'text-yellow-100/80' : 'text-stone-600'
        }`}>
          {strings.homeCategorySubtitle}
        </p>
      </div>

      {/* 6 Large Visual Option Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {categoriesList.map((cat) => (
          <button
            key={cat.key}
            type="button"
            onClick={() => onSelectCategory(cat.key, cat.samplePrompt)}
            className={`p-4 rounded-2xl border-2 text-left flex items-start justify-between gap-3.5 transition-all duration-200 shadow-sm hover:shadow-md hover:scale-[1.01] focus:outline-none focus:ring-4 group ${
              highContrast
                ? 'bg-stone-950 border-yellow-400 text-yellow-300 hover:bg-stone-900 focus:ring-yellow-400'
                : `bg-white bg-gradient-to-br ${cat.bgGradient} ${cat.border} ring-amber-200`
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                  highContrast ? 'bg-yellow-400 text-black' : cat.iconBg
                }`}
              >
                {cat.icon}
              </div>
              <div>
                <span className={`font-extrabold text-base sm:text-lg block leading-snug break-words-safe ${
                  highContrast ? 'text-yellow-300' : 'text-stone-900'
                }`}>
                  {cat.title}
                </span>
                <span className={`text-xs sm:text-sm font-medium block mt-1 line-clamp-2 leading-relaxed ${
                  highContrast ? 'text-slate-200' : 'text-stone-600'
                }`}>
                  {cat.subtitle}
                </span>
              </div>
            </div>
            <div className={`shrink-0 self-center pl-1 transition-colors ${
              highContrast ? 'text-yellow-400 group-hover:text-yellow-300' : 'text-stone-400 group-hover:text-amber-700'
            }`}>
              <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        ))}
      </div>

      {/* "What do you need help with?" Guided Quick Prompts */}
      <div className={`mt-4 pt-3 border-t ${highContrast ? 'border-yellow-400/40' : 'border-amber-200/60'}`}>
        <span className={`text-xs font-bold uppercase tracking-wider block mb-2 ${
          highContrast ? 'text-yellow-400' : 'text-stone-500'
        }`}>
          💡 {strings.guidedPromptsHeading}
        </span>
        <div className="flex flex-wrap gap-2">
          {strings.guidedPrompts.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectGuidedPrompt(item.prompt)}
              className={`text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-full border transition-all shadow-xs hover:scale-105 active:scale-95 ${
                highContrast
                  ? 'border-yellow-400 bg-stone-900 text-yellow-300 hover:bg-yellow-400 hover:text-black'
                  : 'bg-white hover:bg-amber-100 text-stone-800 border-amber-300 shadow-amber-50'
              }`}
            >
              {item.label} ➔
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
