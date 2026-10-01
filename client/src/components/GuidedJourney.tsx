import React, { useState } from 'react';
import { UIStrings } from '../constants/uiStrings';
import { SupportedLanguage } from '../../../shared/types';
import { 
  CheckCircle2, 
  HelpCircle, 
  FileText, 
  Flame, 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw, 
  ExternalLink, 
  PhoneCall, 
  Volume2, 
  VolumeX, 
  ShieldCheck, 
  AlertTriangle 
} from 'lucide-react';

interface GuidedJourneyProps {
  currentLanguage: SupportedLanguage;
  strings: UIStrings;
  highContrast: boolean;
  onReadAloud: (text: string) => void;
  isPlayingAudio: boolean;
  onStopAudio: () => void;
  onClose: () => void;
}

export const GuidedJourney: React.FC<GuidedJourneyProps> = ({
  currentLanguage,
  strings,
  highContrast,
  onReadAloud,
  isPlayingAudio,
  onStopAudio,
  onClose,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Step 2: Eligibility Check State
  const [isWoman18Plus, setIsWoman18Plus] = useState<boolean | null>(true);
  const [hasExistingLPG, setHasExistingLPG] = useState<boolean | null>(false);
  const [isLowIncome, setIsLowIncome] = useState<boolean | null>(true);
  const [eligibilityResult, setEligibilityResult] = useState<{
    eligible: boolean;
    message: string;
  } | null>(null);
  const [isChecking, setIsChecking] = useState<boolean>(false);

  // Step 3: Document Checklist State
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({
    ration: false,
    id: false,
    bank: false,
    photo: false,
  });

  const evaluateEligibility = async () => {
    setIsChecking(true);
    try {
      const res = await fetch('/api/journey/check-eligibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          isWoman18Plus,
          hasExistingLPG,
          isLowIncome,
          language: currentLanguage,
        }),
      });
      const data = await res.json();
      setEligibilityResult({
        eligible: data.eligible,
        message: data.message,
      });
    } catch (err) {
      console.error('Error evaluating eligibility:', err);
      setEligibilityResult({
        eligible: true,
        message: strings.disclaimer,
      });
    } finally {
      setIsChecking(false);
    }
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleStartAgain = () => {
    setCurrentStep(1);
    setIsWoman18Plus(true);
    setHasExistingLPG(false);
    setIsLowIncome(true);
    setEligibilityResult(null);
    setCheckedDocs({
      ration: false,
      id: false,
      bank: false,
      photo: false,
    });
  };

  const toggleDoc = (key: string) => {
    setCheckedDocs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div
      className={`rounded-3xl p-5 sm:p-7 border-2 shadow-xl my-6 transition-all duration-200 ${
        highContrast
          ? 'bg-black border-yellow-400 text-yellow-300'
          : 'bg-white border-orange-200 text-stone-900 shadow-orange-100/50'
      }`}
      aria-label="Guided Journey"
    >
      {/* Header & Stepper Progress */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-amber-200/60 gap-3">
        <div>
          <span className="text-xs font-bold tracking-wider uppercase text-amber-700">
            {strings.guidedJourneyTitle}
          </span>
          <h2 className="text-xl sm:text-2xl font-black mt-0.5">
            {currentStep === 1 && strings.steps.understand}
            {currentStep === 2 && strings.steps.check}
            {currentStep === 3 && strings.steps.prepare}
            {currentStep === 4 && strings.steps.apply}
            {currentStep === 5 && strings.steps.nextStep}
          </h2>
        </div>

        {/* Visual Step Indicator (1 to 5) with localized labels */}
        <div className="flex items-center gap-1.5 sm:gap-2 self-start sm:self-auto overflow-x-auto max-w-full pb-1">
          {[
            { num: 1, label: strings.steps.understand.replace(/^[0-9.]\s*/, '') },
            { num: 2, label: strings.steps.check.replace(/^[0-9.]\s*/, '') },
            { num: 3, label: strings.steps.prepare.replace(/^[0-9.]\s*/, '') },
            { num: 4, label: strings.steps.apply.replace(/^[0-9.]\s*/, '') },
            { num: 5, label: strings.steps.nextStep.replace(/^[0-9.]\s*/, '') },
          ].map((step) => (
            <div
              key={step.num}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full font-bold text-xs transition-all whitespace-nowrap ${
                currentStep === step.num
                  ? highContrast
                    ? 'bg-yellow-400 text-black ring-2 ring-white'
                    : 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md'
                  : currentStep > step.num
                  ? highContrast
                    ? 'bg-yellow-950 text-yellow-300 border border-yellow-500'
                    : 'bg-amber-100 text-amber-800'
                  : 'bg-stone-100 text-stone-400'
              }`}
            >
              <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px]">
                {currentStep > step.num ? '✓' : step.num}
              </span>
              <span className="hidden sm:inline text-[11px] font-semibold">{step.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Step Content Area */}
      <div className="py-6 min-h-[300px]">
        {/* ================= STEP 1: UNDERSTAND ================= */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-300">
              <Flame className="w-8 h-8 text-amber-600 shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg text-amber-950">
                  {currentLanguage === 'te'
                    ? 'ఉజ్జ్వల 2.0 పథకం అంటే ఏమిటి?'
                    : currentLanguage === 'hi'
                    ? 'उज्ज्वला 2.0 योजना क्या है?'
                    : 'What is PM Ujjwala 2.0?'}
                </h3>
                <p className="mt-1 text-sm sm:text-base leading-relaxed text-stone-700 font-medium">
                  {currentLanguage === 'te'
                    ? 'ఇది గ్రామీణ మరియు నిరుపేద కుటుంబాలలోని మహిళలకు కేంద్ర ప్రభుత్వం అందించే ఉచిత గ్యాస్ కనెక్షన్ పథకం. పొగ వలన వచ్చే అనారోగ్యం నుండి మహిళలను రక్షించడానికి ఈ పథకం ప్రారంభించబడింది.'
                    : currentLanguage === 'hi'
                    ? 'यह ग्रामीण एवं गरीब परिवारों की महिलाओं को धुआं-मुक्त जीवन देने के लिए भारत सरकार द्वारा शुरू की गई मुफ्त एलपीजी गैस कनेक्शन योजना है।'
                    : 'This is a Government of India initiative providing deposit-free LPG gas connections to adult women from low-income households, protecting families from smoke and firewood health hazards.'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50">
                <span className="text-2xl block mb-1">🎁</span>
                <h4 className="font-bold text-sm">
                  {currentLanguage === 'te' ? 'పూర్తిగా ఉచితం' : currentLanguage === 'hi' ? 'मुफ्त कनेक्शन' : '100% Deposit-Free'}
                </h4>
                <p className="text-xs text-stone-600 mt-1">
                  {currentLanguage === 'te' ? 'సిలిండర్ కోసం ఎటువంటి డిపాజిట్ చెల్లించనవసరం లేదు.' : currentLanguage === 'hi' ? 'सिलेंडर के लिए कोई सिक्योरिटी डिपॉजिट नहीं लगता।' : 'Zero security deposit required for cylinder & regulator.'}
                </p>
              </div>
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50">
                <span className="text-2xl block mb-1">🔥</span>
                <h4 className="font-bold text-sm">
                  {currentLanguage === 'te' ? 'ఉచిత పొయ్యి (స్టవ్)' : currentLanguage === 'hi' ? 'मुफ्त गैस चूल्हा' : 'Free Gas Stove'}
                </h4>
                <p className="text-xs text-stone-600 mt-1">
                  {currentLanguage === 'te' ? 'కనెక్షన్‌తో పాటు ఒక గ్యాస్ పొయ్యి ఉచితంగా లభిస్తుంది.' : currentLanguage === 'hi' ? 'कनेक्शन के साथ एक नया चूल्हा मुफ्त मिलता है।' : 'One certified gas stove is provided free.'}
                </p>
              </div>
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50">
                <span className="text-2xl block mb-1">⛽</span>
                <h4 className="font-bold text-sm">
                  {currentLanguage === 'te' ? 'మొదటి సిలిండర్ ఉచితం' : currentLanguage === 'hi' ? 'पहला सिलेंडर मुफ्त' : 'First Refill Free'}
                </h4>
                <p className="text-xs text-stone-600 mt-1">
                  {currentLanguage === 'te' ? 'మొదటిసారి నింపిన సిలిండర్ ఉచితంగా ఇవ్వబడుతుంది.' : currentLanguage === 'hi' ? 'पहला भरा हुआ सिलेंडर भी निशुल्क मिलता है।' : 'The first cylinder refill is provided without cost.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 2: CHECK ================= */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <p className="text-sm font-semibold text-stone-600">
              {currentLanguage === 'te'
                ? 'ఈ 3 ప్రాథమిక ప్రశ్నలకు సమాధానం ఇవ్వండి. మేము మీ అర్హత మార్గదర్శకత్వాన్ని విశ్లేషిస్తాము:'
                : currentLanguage === 'hi'
                ? 'इन 3 बुनियादी सवालों के जवाब दें। हम आपकी पात्रता का प्रारंभिक मार्गदर्शन करेंगे:'
                : 'Please answer these 3 basic questions to check preliminary guidance:'}
            </p>

            {/* Q1: Woman 18+ */}
            <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-bold text-sm block">
                  {currentLanguage === 'te'
                    ? '1. మీరు 18 ఏళ్లు లేదా అంతకంటే ఎక్కువ వయస్సు ఉన్న మహిళలా?'
                    : currentLanguage === 'hi'
                    ? '1. क्या आप 18 वर्ष या उससे अधिक आयु की महिला हैं?'
                    : '1. Are you an adult woman aged 18 years or older?'}
                </span>
                <span className="text-xs text-stone-500">
                  {currentLanguage === 'te'
                    ? 'ఈ పథకం కేవలం వయోజన మహిళల పేరిట మాత్రమే వర్తిస్తుంది.'
                    : currentLanguage === 'hi'
                    ? 'उज्ज्वला कनेक्शन केवल महिला के नाम पर मिलता है।'
                    : 'Connection is strictly issued in an adult woman\'s name.'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsWoman18Plus(true)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold border transition-colors ${
                    isWoman18Plus === true
                      ? 'bg-amber-600 text-white border-amber-600'
                      : 'bg-white text-stone-700 border-stone-300'
                  }`}
                >
                  {currentLanguage === 'te' ? 'అవును' : currentLanguage === 'hi' ? 'हाँ' : 'Yes'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsWoman18Plus(false)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold border transition-colors ${
                    isWoman18Plus === false
                      ? 'bg-red-600 text-white border-red-600'
                      : 'bg-white text-stone-700 border-stone-300'
                  }`}
                >
                  {currentLanguage === 'te' ? 'కాదు' : currentLanguage === 'hi' ? 'नहीं' : 'No'}
                </button>
              </div>
            </div>

            {/* Q2: Existing LPG */}
            <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-bold text-sm block">
                  {currentLanguage === 'te'
                    ? '2. మీ ఇంట్లో ఎవరి పేరిటైనా ఇంతకుముందు గ్యాస్ కనెక్షన్ ఉందా?'
                    : currentLanguage === 'hi'
                    ? '2. क्या आपके घर में पहले से किसी के पास गैस कनेक्शन है?'
                    : '2. Does anyone in your household already have an LPG connection?'}
                </span>
                <span className="text-xs text-stone-500">
                  {currentLanguage === 'te'
                    ? 'ఒకే కుటుంబంలో వేరే గ్యాస్ కనెక్షన్ ఉండకూడదు.'
                    : currentLanguage === 'hi'
                    ? 'एक ही घर में दूसरा कनेक्शन मान्य नहीं है।'
                    : 'Household must not have another domestic LPG connection.'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setHasExistingLPG(true)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold border transition-colors ${
                    hasExistingLPG === true
                      ? 'bg-red-600 text-white border-red-600'
                      : 'bg-white text-stone-700 border-stone-300'
                  }`}
                >
                  {currentLanguage === 'te' ? 'అవును' : currentLanguage === 'hi' ? 'हाँ' : 'Yes'}
                </button>
                <button
                  type="button"
                  onClick={() => setHasExistingLPG(false)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold border transition-colors ${
                    hasExistingLPG === false
                      ? 'bg-amber-600 text-white border-amber-600'
                      : 'bg-white text-stone-700 border-stone-300'
                  }`}
                >
                  {currentLanguage === 'te' ? 'లేదు' : currentLanguage === 'hi' ? 'नहीं' : 'No'}
                </button>
              </div>
            </div>

            {/* Q3: Eligible category */}
            <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-bold text-sm block">
                  {currentLanguage === 'te'
                    ? '3. మీరు అర్హతగల పేద కుటుంబ వర్గానికి (SC, ST, PMAY లేదా రేషన్ కార్డు) చెందినవారా?'
                    : currentLanguage === 'hi'
                    ? '3. क्या आपका परिवार पात्र श्रेणी (SC, ST, आवास योजना या गरीब परिवार) में आता है?'
                    : '3. Do you belong to an eligible category (SC, ST, PMAY Gramin, or poor household)?'}
                </span>
                <span className="text-xs text-stone-500">
                  {currentLanguage === 'te'
                    ? 'రేషన్ కార్డు లేదా 14-పాయింట్ డిక్లరేషన్ ద్వారా ధృవీకరించబడుతుంది.'
                    : currentLanguage === 'hi'
                    ? 'राशन कार्ड या 14-बिंदु घोषणा द्वारा प्रमाणित होता है।'
                    : 'Verified by Ration Card or 14-point declaration.'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsLowIncome(true)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold border transition-colors ${
                    isLowIncome === true
                      ? 'bg-amber-600 text-white border-amber-600'
                      : 'bg-white text-stone-700 border-stone-300'
                  }`}
                >
                  {currentLanguage === 'te' ? 'అవును' : currentLanguage === 'hi' ? 'हाँ' : 'Yes'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsLowIncome(false)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold border transition-colors ${
                    isLowIncome === false
                      ? 'bg-stone-600 text-white border-stone-600'
                      : 'bg-white text-stone-700 border-stone-300'
                  }`}
                >
                  {currentLanguage === 'te' ? 'కాదు' : currentLanguage === 'hi' ? 'नहीं' : 'No'}
                </button>
              </div>
            </div>

            {/* Check Button */}
            <button
              type="button"
              onClick={evaluateEligibility}
              disabled={isChecking}
              className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>
                {currentLanguage === 'te'
                  ? 'అర్హత మార్గదర్శకత్వం విశ్లేషించండి'
                  : currentLanguage === 'hi'
                  ? 'पात्रता की जांच करें'
                  : 'Check Preliminary Eligibility'}
              </span>
            </button>

            {/* Guidance Result Box */}
            {eligibilityResult && (
              <div
                className={`p-4 rounded-2xl border flex items-start gap-3 animate-fadeIn ${
                  eligibilityResult.eligible
                    ? 'bg-teal-50 border-teal-300 text-teal-950'
                    : 'bg-amber-50 border-amber-300 text-amber-950'
                }`}
              >
                {eligibilityResult.eligible ? (
                  <CheckCircle2 className="w-6 h-6 text-teal-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="text-sm font-semibold leading-relaxed">
                    {eligibilityResult.message}
                  </p>
                  <p className="text-xs opacity-75 mt-1">
                    * {strings.disclaimer}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= STEP 3: PREPARE ================= */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <p className="text-sm font-semibold text-stone-700">
              {currentLanguage === 'te'
                ? 'గ్యాస్ ఏజెన్సీకి వెళ్లే ముందు ఈ పత్రాల జిరాక్స్ ప్రతులు సిద్ధం చేసుకోండి:'
                : currentLanguage === 'hi'
                ? 'गैस एजेंसी जाने से पहले इन दस्तावेज़ों की फोटोकॉपी तैयार कर लें:'
                : 'Keep photocopies of these documents ready before visiting the LPG agency:'}
            </p>

            <div className="space-y-2.5">
              {[
                {
                  id: 'ration',
                  title: currentLanguage === 'te' ? 'రేషన్ కార్డు (కుటుంబ వివరాల పత్రం)' : currentLanguage === 'hi' ? 'राशन कार्ड (परिवार का विवरण)' : 'Ration Card / Family Composition Certificate',
                  desc: currentLanguage === 'te' ? 'రాష్ట్ర ప్రభుత్వం జారీ చేసిన రేషన్ కార్డు జిరాక్స్' : currentLanguage === 'hi' ? 'राज्य सरकार द्वारा जारी राशन कार्ड' : 'Ration card issued by State Government',
                },
                {
                  id: 'id',
                  title: currentLanguage === 'te' ? 'గుర్తింపు కార్డు (ఆధార్ లేదా ఓటర్ ఐడీ)' : currentLanguage === 'hi' ? 'पहचान पत्र (आधार या वोटर आईडी)' : 'Photo Identity Proof (Aadhaar or Voter Card)',
                  desc: currentLanguage === 'te' ? 'దరఖాస్తుదారు మహిళ యొక్క గుర్తింపు మరియు చిరునామా ప్రూఫ్' : currentLanguage === 'hi' ? 'महिला आवेदक का पहचान एवं पता प्रमाण' : 'Proof of Identity and Address of the woman applicant',
                },
                {
                  id: 'bank',
                  title: currentLanguage === 'te' ? 'బ్యాంక్ పాస్‌బుక్ జిరాక్స్' : currentLanguage === 'hi' ? 'बैंक पासबुक की फोटोकॉपी' : 'Bank Passbook Copy (with IFSC)',
                  desc: currentLanguage === 'te' ? 'సబ్సిడీ జమ కావడానికి మహిళ పేరుతో ఉన్న బ్యాంక్ ఖాతా' : currentLanguage === 'hi' ? 'सब्सिडी जमा होने के लिए महिला के नाम का खाता' : 'Bank account in applicant\'s name for direct subsidy credit',
                },
                {
                  id: 'photo',
                  title: currentLanguage === 'te' ? 'పాస్‌పోర్ట్ సైజు ఫోటో (1 కాపీ)' : currentLanguage === 'hi' ? 'पासपोर्ट साइज फोटो (1 प्रति)' : 'Passport-size Photograph (1 copy)',
                  desc: currentLanguage === 'te' ? 'దరఖాస్తు ఫారమ్‌పై అతికించడానికి' : currentLanguage === 'hi' ? 'फॉर्म पर लगाने के लिए हाल की फोटो' : 'Recent photograph of the woman applicant',
                },
              ].map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => toggleDoc(doc.id)}
                  className={`p-3.5 rounded-xl border flex items-start gap-3.5 cursor-pointer transition-all ${
                    checkedDocs[doc.id]
                      ? 'bg-teal-50 border-teal-300'
                      : 'bg-stone-50 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checkedDocs[doc.id]}
                    onChange={() => toggleDoc(doc.id)}
                    className="w-5 h-5 rounded text-amber-600 mt-0.5 cursor-pointer"
                    aria-label={doc.title}
                  />
                  <div>
                    <span className="font-bold text-sm block text-stone-900">
                      {doc.title}
                    </span>
                    <span className="text-xs text-stone-500">
                      {doc.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 font-medium">
              💡 {currentLanguage === 'te'
                ? 'గమనిక: జనసఖి మీ ఆధార్ లేదా బ్యాంక్ ఖాతా నంబర్లను ఎప్పుడూ ఆన్‌లైన్‌లో అడగదు లేదా భద్రపరచదు. జిరాక్స్ కాపీలను నేరుగా గ్యాస్ ఏజెన్సీలో మాత్రమే ఇవ్వండి.'
                : currentLanguage === 'hi'
                ? 'नोट: जनसखी कभी भी आपका आधार या बैंक नंबर ऑनलाइन नहीं मांगती। सिर्फ गैस एजेंसी में ही फोटोकॉपी जमा करें।'
                : 'Note: JanSakhi never asks for or stores your Aadhaar or bank account numbers online. Hand over photocopies only directly at the authorized LPG distributor.'}
            </div>
          </div>
        )}

        {/* ================= STEP 4: APPLY ================= */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <h3 className="font-bold text-base text-stone-800">
              {currentLanguage === 'te'
                ? 'దరఖాస్తు చేసుకునే అధికారిక విధానం:'
                : currentLanguage === 'hi'
                ? 'आवेदन करने की आधिकारिक प्रक्रिया:'
                : 'Official Application Process (4 Simple Steps):'}
            </h3>

            <div className="space-y-3">
              {[
                {
                  step: '1',
                  title: currentLanguage === 'te' ? 'గ్యాస్ ఏజెన్సీని ఎంచుకోండి' : currentLanguage === 'hi' ? 'गैस एजेंसी चुनें' : 'Locate Nearest LPG Distributor',
                  desc: currentLanguage === 'te' ? 'మీ సమీపంలోని భారత్‌గ్యాస్, ఇండేన్ లేదా హెచ్‌పి గ్యాస్ ఏజెన్సీ లేదా సిఎస్‌సి (కామన్ సర్వీస్ సెంటర్) కు వెళ్లండి.' : currentLanguage === 'hi' ? 'अपने पास की इंडेन, भारतगैस या एचपी गैस एजेंसी अथवा सीएससी केंद्र पर जाएं।' : 'Visit your nearest Indane, Bharatgas, or HP Gas distributor, or Common Service Centre (CSC).',
                },
                {
                  step: '2',
                  title: currentLanguage === 'te' ? 'ఉజ్జ్వల ఫారమ్ తీసుకోండి' : currentLanguage === 'hi' ? 'उज्ज्वला फॉर्म लें' : 'Obtain Application Form',
                  desc: currentLanguage === 'te' ? 'ఏజెన్సీలో "ఉజ్జ్వల 2.0 కనెక్షన్ ఫారమ్" ఉచితంగా పొందండి.' : currentLanguage === 'hi' ? 'एजेंसी से उज्ज्वला 2.0 आवेदन फॉर्म निशुल्क प्राप्त करें।' : 'Ask for the PM Ujjwala 2.0 application KYC form free of charge.',
                },
                {
                  step: '3',
                  title: currentLanguage === 'te' ? 'పత్రాల జిరాక్స్ జతచేయండి' : currentLanguage === 'hi' ? 'कागजात संलग्न करें' : 'Attach Document Photocopies',
                  desc: currentLanguage === 'te' ? 'మీ ఆధార్, రేషన్ కార్డు, బ్యాంక్ పాస్‌బుక్ జిరాక్స్ ప్రతులు మరియు ఫోటో జతచేసి సమర్పించండి.' : currentLanguage === 'hi' ? 'राशन कार्ड, आधार, बैंक पासबुक की फोटोकॉपी लगाकर फॉर्म जमा करें।' : 'Attach photocopies of your ration card, identity proof, bank passbook, and photo.',
                },
                {
                  step: '4',
                  title: currentLanguage === 'te' ? 'సున్నా రుసుము - ఉచిత డెలివరీ' : currentLanguage === 'hi' ? 'शून्य शुल्क - मुफ्त डिलीवरी' : 'Zero Fee - Free Home Installation',
                  desc: currentLanguage === 'te' ? 'ఎవరికీ ఏ రుసుము చెల్లించనవసరం లేదు. ఏజెన్సీ వారు పరిశీలించి మీ ఇంటికి సిలిండర్ మరియు పొయ్యిని అందజేస్తారు.' : currentLanguage === 'hi' ? 'कोई शुल्क न दें। सत्यापन के बाद एजेंसी गैस सिलेंडर और चूल्हा आपके घर पहुंचाएगी।' : 'No fee is required. After distributor verification, the gas cylinder and stove will be provided.',
                },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3 p-3 rounded-xl border border-stone-200 bg-stone-50">
                  <div className="w-7 h-7 rounded-full bg-amber-600 text-white font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-stone-900">{item.title}</h4>
                    <p className="text-xs text-stone-600 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= STEP 5: NEXT STEP ================= */}
        {currentStep === 5 && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-teal-950">
              <h3 className="font-black text-lg">
                {currentLanguage === 'te' ? 'మీరు సిద్ధంగా ఉన్నారు!' : currentLanguage === 'hi' ? 'आप तैयार हैं!' : 'You Are Ready!'}
              </h3>
              <p className="text-sm mt-1 leading-relaxed">
                {currentLanguage === 'te'
                  ? 'మీరు ప్రాథమిక సమాచారం మరియు పత్రాల గురించి తెలుసుకున్నారు. తుది ధృవీకరణ కోసం మరియు ఆన్‌లైన్ దరఖాస్తు కోసం అధికారిక ప్రభుత్వ పోర్టల్ లేదా టోల్-ఫ్రీ నంబర్‌ను ఉపయోగించండి.'
                  : currentLanguage === 'hi'
                  ? 'आपने बुनियादी शर्तें और दस्तावेज़ समझ लिए हैं। अंतिम पुष्टि और ऑनलाइन आवेदन के लिए आधिकारिक सरकारी पोर्टल या हेल्पलाइन का उपयोग करें।'
                  : 'You have reviewed the basic conditions and checklist. For final verification and online KYC, use the official government portal or call the national toll-free helpline.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="https://www.pmuy.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white flex items-center justify-between font-bold text-sm shadow-md transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <ExternalLink className="w-5 h-5" />
                  <span>{strings.officialSourceButton}</span>
                </div>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="tel:18002666696"
                className="p-4 rounded-2xl border-2 border-amber-600 text-amber-800 bg-amber-50 hover:bg-amber-100 flex items-center gap-3 font-bold text-sm transition-all"
              >
                <PhoneCall className="w-5 h-5 text-amber-700" />
                <div>
                  <span className="block text-xs font-semibold text-stone-500">
                    {strings.tollFreeCall}
                  </span>
                  <span className="text-base font-extrabold text-amber-900">1800-266-6696</span>
                </div>
              </a>
            </div>

            <div className="p-3 bg-stone-100 rounded-xl text-xs text-stone-600 leading-normal">
              🛡️ {strings.disclaimer}
            </div>
          </div>
        )}
      </div>

      {/* Footer Navigation Controls */}
      <div className="flex flex-wrap items-center justify-between pt-4 border-t border-amber-200/60 gap-2">
        <div className="flex items-center gap-2">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className={`px-4 py-2.5 rounded-xl border text-sm font-bold flex items-center gap-1.5 transition-colors ${
                highContrast
                  ? 'border-yellow-400 text-yellow-300 hover:bg-stone-900'
                  : 'border-stone-300 text-stone-700 bg-white hover:bg-stone-50 shadow-sm'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{strings.journeyControls.back}</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleStartAgain}
            className="px-3 py-2 rounded-xl text-xs font-semibold text-stone-500 hover:text-stone-800 flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{strings.journeyControls.startAgain}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Read Aloud Button for this Step */}
          <button
            type="button"
            onClick={() => {
              const textToRead =
                currentStep === 1
                  ? strings.steps.understand
                  : currentStep === 2
                  ? strings.steps.check
                  : currentStep === 3
                  ? strings.steps.prepare
                  : currentStep === 4
                  ? strings.steps.apply
                  : strings.steps.nextStep;
              onReadAloud(textToRead);
            }}
            className="p-2.5 rounded-xl border border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100 text-xs font-bold flex items-center gap-1.5"
            title="Read this step aloud"
          >
            {isPlayingAudio ? (
              <>
                <VolumeX className="w-4 h-4 text-red-600" />
                <span>{strings.stopAudio}</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-amber-700" />
                <span>{strings.readAloud}</span>
              </>
            )}
          </button>

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-1.5 shadow transition-all ${
                highContrast
                  ? 'bg-yellow-400 text-black hover:bg-yellow-300'
                  : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white'
              }`}
            >
              <span>{strings.journeyControls.next}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl font-bold text-sm bg-teal-700 hover:bg-teal-800 text-white shadow"
            >
              <span>{strings.journeyControls.finish} ✓</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
