import React from 'react';
import { UIStrings } from '../constants/uiStrings';
import { Sparkles, PlayCircle, Flame, FileText, Scissors, Users } from 'lucide-react';

interface DemoScenariosBarProps {
  strings: UIStrings;
  highContrast: boolean;
  onSelectScenario: (prompt: string) => void;
}

export const DemoScenariosBar: React.FC<DemoScenariosBarProps> = ({
  strings,
  highContrast,
  onSelectScenario,
}) => {
  const getIconForScenario = (id: string) => {
    switch (id) {
      case 'demo-ujjwala':
        return <Flame className="w-4 h-4 text-orange-600" />;
      case 'demo-ration':
        return <FileText className="w-4 h-4 text-teal-600" />;
      case 'demo-tailoring':
        return <Scissors className="w-4 h-4 text-purple-600" />;
      case 'demo-shg':
        return <Users className="w-4 h-4 text-blue-600" />;
      default:
        return <PlayCircle className="w-4 h-4 text-amber-600" />;
    }
  };

  return (
    <div
      className={`rounded-2xl p-3 sm:p-4 border my-4 transition-all ${
        highContrast
          ? 'bg-black border-yellow-400 text-yellow-300'
          : 'bg-gradient-to-r from-amber-500/5 via-orange-500/5 to-amber-500/5 border-amber-200 text-stone-900 shadow-xs'
      }`}
      aria-label={strings.demoScenariosTitle}
    >
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-1.5">
          <Sparkles className={`w-4 h-4 ${highContrast ? 'text-yellow-400' : 'text-amber-700'}`} />
          <span className={`text-xs font-black uppercase tracking-wider ${
            highContrast ? 'text-yellow-400' : 'text-amber-900'
          }`}>
            {strings.demoScenariosTitle}
          </span>
        </div>
        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
          highContrast ? 'bg-yellow-400 text-black border-yellow-300' : 'bg-amber-200 text-amber-950 border-amber-300'
        }`}>
          ⚡ {strings.demoBadge}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {strings.demoScenarios.map((demo) => (
          <button
            key={demo.id}
            type="button"
            onClick={() => onSelectScenario(demo.prompt)}
            className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all hover:shadow-md hover:scale-102 active:scale-98 focus:outline-none focus:ring-2 ${
              highContrast
                ? 'bg-stone-900 border-yellow-400 text-yellow-300 hover:bg-yellow-400 hover:text-black'
                : 'bg-white border-amber-200 text-stone-800 hover:border-amber-400 shadow-xs'
            }`}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <span className={`p-1 rounded-lg shrink-0 ${
                highContrast ? 'bg-black text-yellow-400 border border-yellow-400/40' : 'bg-stone-100'
              }`}>
                {getIconForScenario(demo.id)}
              </span>
              <span className={`font-extrabold text-xs line-clamp-1 ${
                highContrast ? 'text-yellow-300' : 'text-stone-900'
              }`}>
                {demo.title}
              </span>
            </div>
            <span className={`text-[11px] line-clamp-1 font-medium ${
              highContrast ? 'text-yellow-100/80' : 'text-stone-500'
            }`}>
              {demo.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
