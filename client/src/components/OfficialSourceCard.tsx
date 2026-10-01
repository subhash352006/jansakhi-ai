import React from 'react';
import { ExternalLink, Phone, Shield, AlertCircle } from 'lucide-react';
import { UIStrings } from '../constants/uiStrings';

interface OfficialSourceCardProps {
  strings: UIStrings;
  highContrast: boolean;
}

export const OfficialSourceCard: React.FC<OfficialSourceCardProps> = ({
  strings,
  highContrast,
}) => {
  return (
    <aside
      aria-label="Official Government Source and Disclaimer"
      className={`rounded-3xl p-5 sm:p-6 border-2 transition-all duration-200 my-6 ${
        highContrast
          ? 'bg-black border-yellow-400 text-yellow-300'
          : 'bg-stone-50 border-stone-300 text-stone-800'
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Official source identification */}
        <div className="flex items-start gap-3.5">
          <div
            className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
              highContrast ? 'bg-yellow-400 text-black' : 'bg-amber-100 text-amber-800'
            }`}
          >
            <Shield className="w-6 h-6" aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base sm:text-lg">
                {strings.officialSourceLabel}
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                Verified Portal
              </span>
            </div>
            <p className={`text-xs sm:text-sm font-medium mt-0.5 ${
              highContrast ? 'text-yellow-100/80' : 'text-stone-600'
            }`}>
              Ministry of Petroleum and Natural Gas, Government of India
            </p>
          </div>
        </div>

        {/* Action buttons: Portal link + Helpline */}
        <div className="flex flex-wrap items-center gap-2.5">
          <a
            href="https://www.pmuy.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-sm ${
              highContrast
                ? 'bg-yellow-400 text-black hover:bg-yellow-300'
                : 'bg-stone-900 hover:bg-stone-800 text-white'
            }`}
          >
            <span>pmuy.gov.in</span>
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </a>

          <a
            href="tel:18002666696"
            className={`px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm border flex items-center gap-1.5 transition-colors ${
              highContrast
                ? 'border-yellow-400 bg-stone-900 text-yellow-300 hover:bg-stone-800'
                : 'border-stone-300 bg-white hover:bg-stone-100 text-stone-800'
            }`}
          >
            <Phone className={`w-3.5 h-3.5 ${highContrast ? 'text-yellow-400' : 'text-amber-600'}`} aria-hidden="true" />
            <span>1800-266-6696</span>
          </a>
        </div>
      </div>

      {/* Mandatory Disclaimer */}
      <div className={`mt-4 pt-3 border-t flex items-start gap-2 text-xs leading-relaxed font-normal ${
        highContrast ? 'border-yellow-400/40 text-yellow-100/80' : 'border-stone-200/80 text-stone-600'
      }`}>
        <AlertCircle className={`w-4 h-4 shrink-0 mt-0.5 ${highContrast ? 'text-yellow-400' : 'text-amber-600'}`} aria-hidden="true" />
        <p>{strings.disclaimer}</p>
      </div>
    </aside>
  );
};
