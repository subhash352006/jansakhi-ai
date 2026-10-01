import React, { useState } from 'react';
import { StructuredGuidance } from '../../../shared/types';
import { UIStrings } from '../constants/uiStrings';
import { 
  CheckCircle2, 
  HelpCircle, 
  FileCheck2, 
  MapPin, 
  ExternalLink, 
  PhoneCall, 
  ArrowRightCircle, 
  Volume2, 
  VolumeX, 
  Check, 
  ShieldCheck,
  Award
} from 'lucide-react';

interface StepGuideCardProps {
  guidance: StructuredGuidance;
  strings: UIStrings;
  highContrast: boolean;
  onReadAloud: (text: string) => void;
  isPlayingAudio: boolean;
  onStopAudio: () => void;
}

export const StepGuideCard: React.FC<StepGuideCardProps> = ({
  guidance,
  strings,
  highContrast,
  onReadAloud,
  isPlayingAudio,
  onStopAudio,
}) => {
  // Checkbox tracking for documents ready
  const [checkedDocs, setCheckedDocs] = useState<Record<number, boolean>>({});

  const toggleDoc = (index: number) => {
    setCheckedDocs((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleReadFullGuide = () => {
    if (isPlayingAudio) {
      onStopAudio();
    } else {
      const speech = `${guidance.serviceName}. ${strings.guideHeadings.whatItIs}: ${guidance.whatItIs}. ${strings.guideHeadings.nextStep}: ${guidance.nextStep}`;
      onReadAloud(speech);
    }
  };

  return (
    <div
      className={`rounded-3xl p-4 sm:p-6 border-2 shadow-lg my-4 transition-all duration-200 ${
        highContrast
          ? 'bg-black border-yellow-400 text-yellow-300'
          : 'bg-white border-amber-300/80 text-stone-900 shadow-orange-100/50'
      }`}
    >
      {/* Top Banner & Title */}
      <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b ${
        highContrast ? 'border-yellow-400/40' : 'border-amber-200/80'
      }`}>
        <div>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${
            highContrast
              ? 'bg-yellow-400 text-black border-yellow-300'
              : 'bg-amber-100 text-amber-900 border-amber-300'
          }`}>
            <Award className="w-3.5 h-3.5" />
            <span>{strings.guideHeadings.badge}</span>
          </span>
          <h3 className={`text-lg sm:text-xl font-black mt-2 leading-tight break-words-safe ${
            highContrast ? 'text-yellow-300' : 'text-stone-900'
          }`}>
            {guidance.serviceName}
          </h3>
        </div>

        {/* Audio Read-Aloud Button */}
        <button
          type="button"
          onClick={handleReadFullGuide}
          className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs ${
            isPlayingAudio
              ? 'bg-red-600 text-white animate-pulse'
              : highContrast
              ? 'bg-yellow-400 text-black hover:bg-yellow-300 ring-2 ring-yellow-200'
              : 'bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300'
          }`}
          aria-label={isPlayingAudio ? strings.stopAudio : strings.readAloud}
        >
          {isPlayingAudio ? (
            <>
              <VolumeX className="w-4 h-4 fill-current animate-pulse" />
              <span>{strings.stopAudio}</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4" />
              <span>{strings.readAloud}</span>
            </>
          )}
        </button>
      </div>

      <div className="space-y-4 pt-4 text-sm sm:text-base font-medium">
        {/* 1. What this service is */}
        <div className={`p-3.5 rounded-2xl border ${
          highContrast ? 'bg-stone-900 border-yellow-400/50' : 'bg-amber-500/10 border-amber-200'
        }`}>
          <div className={`flex items-center gap-2 mb-1 font-extrabold text-sm ${
            highContrast ? 'text-yellow-400' : 'text-amber-900'
          }`}>
            <HelpCircle className="w-4 h-4 shrink-0" />
            <span>{strings.guideHeadings.whatItIs}</span>
          </div>
          <p className={`leading-relaxed font-medium pl-6 ${
            highContrast ? 'text-slate-100' : 'text-stone-800'
          }`}>
            {guidance.whatItIs}
          </p>
        </div>

        {/* 2. Who is eligible */}
        <div className={`p-3.5 rounded-2xl border ${
          highContrast ? 'bg-stone-900 border-yellow-400/50' : 'bg-teal-50/80 border-teal-200'
        }`}>
          <div className={`flex items-center gap-2 mb-1.5 font-extrabold text-sm ${
            highContrast ? 'text-yellow-400' : 'text-teal-900'
          }`}>
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>{strings.guideHeadings.whoIsEligible}</span>
          </div>
          <ul className={`space-y-1 pl-6 list-disc text-xs sm:text-sm ${
            highContrast ? 'text-slate-100' : 'text-stone-800'
          }`}>
            {guidance.whoIsEligible.map((elig, idx) => (
              <li key={idx}>{elig}</li>
            ))}
          </ul>
        </div>

        {/* 3. Documents required (with interactive checkboxes) */}
        <div className={`p-3.5 rounded-2xl border ${
          highContrast ? 'bg-stone-900 border-yellow-400/50' : 'bg-blue-50/80 border-blue-200'
        }`}>
          <div className={`flex items-center gap-2 mb-2 font-extrabold text-sm ${
            highContrast ? 'text-yellow-400' : 'text-blue-900'
          }`}>
            <FileCheck2 className="w-4 h-4 shrink-0" />
            <span>{strings.guideHeadings.documentsRequired}</span>
          </div>
          <div className="space-y-2 pl-2">
            {guidance.documentsRequired.map((doc, idx) => {
              const isChecked = !!checkedDocs[idx];
              return (
                <label
                  key={idx}
                  onClick={() => toggleDoc(idx)}
                  className={`flex items-start gap-2.5 p-2 rounded-xl cursor-pointer transition-all border text-xs sm:text-sm select-none ${
                    isChecked
                      ? highContrast
                        ? 'bg-yellow-400/20 border-yellow-400 text-yellow-300 font-bold'
                        : 'bg-blue-100/90 border-blue-400 text-blue-950 font-bold'
                      : highContrast
                      ? 'bg-stone-950 border-stone-700 text-slate-200 hover:border-yellow-400'
                      : 'bg-white border-blue-100 hover:bg-blue-50 text-stone-800'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                      isChecked
                        ? highContrast
                          ? 'bg-yellow-400 border-yellow-400 text-black'
                          : 'bg-blue-600 border-blue-600 text-white'
                        : highContrast
                        ? 'border-yellow-400/60 bg-stone-900'
                        : 'border-stone-400 bg-white'
                    }`}
                  >
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <span>{doc}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* 4. Step-by-step instructions */}
        <div className={`p-3.5 rounded-2xl border ${
          highContrast ? 'bg-stone-900 border-yellow-400/50' : 'bg-purple-50/80 border-purple-200'
        }`}>
          <div className={`flex items-center gap-2 mb-2 font-extrabold text-sm ${
            highContrast ? 'text-yellow-400' : 'text-purple-900'
          }`}>
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{strings.guideHeadings.stepByStep}</span>
          </div>
          <div className="space-y-2 pl-2">
            {guidance.steps.map((step, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-2.5 p-2 rounded-xl border text-xs sm:text-sm ${
                  highContrast
                    ? 'bg-stone-950 border-stone-700 text-slate-100'
                    : 'bg-white border-purple-100 text-stone-800'
                }`}
              >
                <span className={`w-6 h-6 rounded-full font-black flex items-center justify-center shrink-0 text-xs ${
                  highContrast ? 'bg-yellow-400 text-black' : 'bg-purple-200 text-purple-900'
                }`}>
                  {idx + 1}
                </span>
                <span className="font-medium leading-relaxed">
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Where to apply */}
        <div className={`p-3.5 rounded-2xl border ${
          highContrast ? 'bg-stone-900 border-yellow-400/50' : 'bg-orange-50/80 border-orange-200'
        }`}>
          <div className={`flex items-center gap-2 mb-1 font-extrabold text-sm ${
            highContrast ? 'text-yellow-400' : 'text-orange-950'
          }`}>
            <MapPin className="w-4 h-4 shrink-0" />
            <span>{strings.guideHeadings.whereToApply}</span>
          </div>
          <p className={`text-xs sm:text-sm leading-relaxed pl-6 font-medium ${
            highContrast ? 'text-slate-100' : 'text-stone-800'
          }`}>
            {guidance.whereToApply}
          </p>
        </div>

        {/* 6. Official Source & Verified Helpline */}
        <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
          highContrast ? 'bg-stone-900 border-yellow-400' : 'bg-stone-100 border-stone-300'
        }`}>
          <div>
            <span className={`text-xs font-bold uppercase tracking-wider block ${
              highContrast ? 'text-yellow-400/80' : 'text-stone-500'
            }`}>
              {strings.guideHeadings.officialSource}
            </span>
            <span className={`font-extrabold text-sm block ${
              highContrast ? 'text-yellow-300' : 'text-stone-900'
            }`}>
              {guidance.officialSource.name}
            </span>
            {guidance.officialSource.helpline && (
              <a
                href={`tel:${guidance.officialSource.helpline.replace(/[^0-9]/g, '')}`}
                className={`inline-flex items-center gap-1.5 text-xs font-bold mt-1 ${
                  highContrast ? 'text-yellow-300 hover:text-yellow-100' : 'text-amber-800 hover:text-amber-950'
                }`}
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{guidance.officialSource.helpline}</span>
              </a>
            )}
          </div>

          <a
            href={guidance.officialSource.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm transition-transform active:scale-95 ${
              highContrast
                ? 'bg-yellow-400 text-black hover:bg-yellow-300'
                : 'bg-amber-700 hover:bg-amber-800 text-white'
            }`}
          >
            <span>{strings.guideHeadings.applyHere}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 7. Next Step */}
        <div className={`p-3.5 rounded-2xl shadow-md border ${
          highContrast
            ? 'bg-stone-900 border-yellow-400 text-yellow-300'
            : 'bg-gradient-to-r from-amber-600 to-orange-600 text-white border-transparent'
        }`}>
          <div className="flex items-center gap-2 mb-1 font-black text-sm">
            <ArrowRightCircle className="w-5 h-5 text-yellow-300" />
            <span>{strings.guideHeadings.nextStep}</span>
          </div>
          <p className={`text-xs sm:text-sm leading-relaxed pl-7 font-medium ${
            highContrast ? 'text-yellow-100' : 'text-amber-50'
          }`}>
            {guidance.nextStep}
          </p>
        </div>
      </div>
    </div>
  );
};
