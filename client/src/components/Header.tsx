import React from 'react';
import { SUPPORTED_LANGUAGES } from '../constants/languages';
import { SupportedLanguage } from '../../../shared/types';
import { UI_LOCALES } from '../constants/uiStrings';
import { Flame, Globe, SunMoon } from 'lucide-react';

interface HeaderProps {
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  highContrast: boolean;
  onToggleHighContrast: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLanguage,
  onLanguageChange,
  highContrast,
  onToggleHighContrast,
}) => {
  const strings = UI_LOCALES[currentLanguage] || UI_LOCALES.te;

  return (
    <header
      role="banner"
      className={`border-b sticky top-0 z-40 transition-colors shadow-sm ${
        highContrast
          ? 'bg-black border-amber-400 text-yellow-300'
          : 'bg-white/95 backdrop-blur-md border-amber-200 text-stone-900'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div
            className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-md ${
              highContrast ? 'bg-yellow-400 text-black' : 'bg-gradient-to-tr from-amber-600 to-orange-500 text-white'
            }`}
          >
            <Flame className="w-7 h-7" aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-tight text-xl sm:text-2xl">
                {strings.appName}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                highContrast ? 'bg-yellow-900 text-yellow-200 border border-yellow-400' : 'bg-orange-100 text-orange-800'
              }`}>
                AI Guide
              </span>
            </div>
            <p className={`text-xs sm:text-sm font-medium ${
              highContrast ? 'text-yellow-200/90' : 'text-stone-600'
            }`}>
              {strings.tagline}
            </p>
          </div>
        </div>

        {/* Accessibility & Language Selectors */}
        <div className="flex items-center flex-wrap gap-2">
          {/* High Contrast Toggle */}
          <button
            onClick={onToggleHighContrast}
            aria-label="Toggle high contrast view"
            className={`p-2 rounded-xl border flex items-center gap-1.5 text-xs font-medium transition-colors ${
              highContrast
                ? 'bg-yellow-400 text-black border-yellow-300'
                : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
            }`}
          >
            <SunMoon className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">Contrast</span>
          </button>

          {/* Prominent Language Selector */}
          <div className="relative flex items-center">
            <label htmlFor="language-select" className="sr-only">
              Select Language
            </label>
            <div className={`flex items-center gap-1 pl-2 pr-1 py-1.5 rounded-xl border font-bold text-sm ${
              highContrast
                ? 'bg-stone-900 border-yellow-400 text-yellow-300 ring-1 ring-yellow-400'
                : 'bg-amber-500/10 border-amber-300 text-amber-950'
            }`}>
              <Globe className={`w-4 h-4 ${highContrast ? 'text-yellow-400' : 'text-amber-700'}`} aria-hidden="true" />
              <select
                id="language-select"
                value={currentLanguage}
                onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
                className="bg-transparent font-bold text-sm sm:text-base focus:outline-none cursor-pointer pr-1 text-inherit"
                aria-label="Choose your language"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code} className="text-stone-900 bg-white">
                    {lang.nativeName} ({lang.name})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
