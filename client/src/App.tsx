import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SupportedLanguage, ChatMessage, ServiceCategory } from '../../shared/types';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from './constants/languages';
import { UI_LOCALES } from './constants/uiStrings';
import { Header } from './components/Header';
import { VoiceMicButton, VoiceState } from './components/VoiceMicButton';
import { HomeCategories } from './components/HomeCategories';
import { DemoScenariosBar } from './components/DemoScenariosBar';
import { QuickActions } from './components/QuickActions';
import { GuidedJourney } from './components/GuidedJourney';
import { ExplainSimply } from './components/ExplainSimply';
import { AssistantChat } from './components/AssistantChat';
import { OfficialSourceCard } from './components/OfficialSourceCard';
import { useSpeechRecognition } from './hooks/useSpeechRecognition';
import { useSpeechSynthesis } from './hooks/useSpeechSynthesis';
import { ShieldCheck, Info } from 'lucide-react';
import { findMatchingClientService, getClientStructuredGuidance } from './constants/servicesCatalog';
import { detectClientBroadIntent } from './constants/smartIntents';

export const App: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>(DEFAULT_LANGUAGE);
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [activePane, setActivePane] = useState<'chat' | 'journey' | 'explain'>('chat');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [hasSpokenPreviously, setHasSpokenPreviously] = useState<boolean>(false);
  const hasSpokenWelcomeRef = useRef<boolean>(false);

  const strings = UI_LOCALES[currentLanguage] || UI_LOCALES.te;
  const currentLangConfig = SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];

  // Speech synthesis hook
  const { isPlaying, activeId, speak, stop } = useSpeechSynthesis();

  // Initialize greeting when language changes
  useEffect(() => {
    stop();
    const initialGreetings: Record<SupportedLanguage, string> = {
      te: "నమస్తే అక్కయ్య! నేను మీ జనసఖి AI. మీకు అవసరమైన ప్రభుత్వ పథకాలు, రేషన్ కార్డు వంటి పత్రాలు, ఉచిత టైలరింగ్ నైపుణ్యాలు మరియు మహిళా స్వయం ఉపాధి గురించి నేను మీకు వివరంగా మార్గదర్శకత్వం చేస్తాను. క్రింది ఎంపికలను ఎంచుకోండి లేదా మాట్లాడండి.",
      hi: "नमस्ते बहन! मैं जनसखी एआई हूँ। आपको आवश्यक सरकारी योजनाओं, राशन कार्ड जैसे दस्तावेज़ों, मुफ्त सिलाई प्रशिक्षण और महिला स्वरोजगार के बारे में पूरी जानकारी दूंगी। नीचे दिए गए विकल्पों को चुनें या बोलकर सवाल पूछें।",
      ta: "வணக்கம் சகோதரி! நான் ஜனசகி AI. அரசு திட்டங்கள், குடும்ப அட்டை, இலவச தையல் பயிற்சி மற்றும் மகளிர் சுயஉதவிக் குழுக்கள் பற்றி வழிகாட்ட நான் தயாராக உள்ளேன். பேசுங்கள் அல்லது விருப்பங்களை தேர்வு செய்யவும்.",
      kn: "ನಮಸ್ಕಾರ ಸಹೋದರಿ! ನಾನು ಜನಸಖಿ AI. ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು, ರೇಷನ್ ಕಾರ್ಡ್, ಉಚಿತ ಹೊಲಿಗೆ ತರಬೇತಿ ಮತ್ತು ಮಹಿಳಾ ಸಂಘಗಳ ಬಗ್ಗೆ ನಾನು ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತೇನೆ. ಮಾತನಾಡಿ ಅಥವಾ ಆಯ್ಕೆಮಾಡಿ.",
      ml: "നമസ്കാരം സഹോദരി! ഞാൻ ജനസഖി AI. സർക്കാർ പദ്ധതികൾ, റേഷൻ കാർഡ്, സൗജന്യ തയ്യൽ പരിശീലനം എന്നിവയെക്കുറിച്ച് ഞാൻ സഹായിക്കാം. സംസാരിക്കുക അല്ലെങ്കിൽ തിരഞ്ഞെടുക്കുക.",
      bn: "নমস্কার বোন! আমি জনসখী এআই। সরকারি যোজনা, রেশন কার্ড, সেলাই প্রশিক্ষণ এবং মহিলাদের কাজের সুযোগ সম্পর্কে আপনাকে ধাপে ধাপে সাহায্য করব। কথা বলুন বা বেছে নিন।",
      mr: "नमस्ते ताई! मी जनसखी AI आहे. सरकारी योजना, रेशन कार्ड, मोफत शिलाई प्रशिक्षण आणि महिला बचत गटांबद्दल मी तुम्हाला टप्प्याटप्प्याने मार्गदर्शन करेन. बोला किंवा पर्याय निवडा.",
      en: "Hello sister! I am JanSakhi AI — your guide for essential government services, documents, free skill training, and women's livelihood. Tap an option below or speak in your language.",
    };

    setMessages([
      {
        id: 'initial-greeting',
        role: 'assistant',
        content: initialGreetings[currentLanguage] || initialGreetings.en,
        timestamp: Date.now(),
        suggestedActions: [
          strings.quickActionHelpMeApply,
          strings.quickActionAmIEligible,
          strings.quickActionWhatDoINeed,
        ],
      },
    ]);
  }, [currentLanguage]);

  // Synchronize HTML root lang, dark class, and body class
  useEffect(() => {
    document.documentElement.lang = currentLanguage;
    document.documentElement.classList.toggle('dark', highContrast);
    document.body.className = `${
      highContrast ? 'bg-black text-yellow-300' : 'bg-amber-50/40 text-stone-900'
    } antialiased min-h-screen selection:bg-orange-200 lang-${currentLanguage}`;
  }, [currentLanguage, highContrast]);

  // Send message to Backend with defense-in-depth fallback and voice-first response mode
  const handleSendMessage = async (text: string, isVoice = false) => {
    if (!text.trim() || isLoading) return;

    if (activePane !== 'chat') {
      setActivePane('chat');
    }

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);

    const handleVoiceResponse = (msgId: string, speechText: string) => {
      if (isVoice) {
        setVoiceState('speaking');
        speak(msgId, speechText, currentLangConfig.speechLocale, () => {
          setVoiceState('idle');
        });
      } else {
        setVoiceState('idle');
      }
    };



    // 2. Check Matching Service Catalog
    const matchedService = findMatchingClientService(text);
    const clientGuidance = matchedService ? getClientStructuredGuidance(matchedService, currentLanguage) : undefined;

    setIsLoading(true);
    if (isVoice) {
      setVoiceState('understanding');
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          message: text,
          language: currentLanguage,
        }),
      });

      clearTimeout(timeoutId);
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch AI response');
      }

      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: data.reply,
        readAloudText: data.readAloudText,
        isWarning: data.isWarning,
        suggestedActions: data.suggestedActions || [],
        structuredGuidance: data.structuredGuidance || clientGuidance,
        followUpQuestion: data.followUpQuestion,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
      handleVoiceResponse(assistantMsg.id, assistantMsg.readAloudText || assistantMsg.content);
    } catch (err: any) {
      console.error('Error sending message:', err);
      // Resilient fallback using grounded catalog if available
      const fallbackContent = clientGuidance
        ? `${clientGuidance.serviceName}\n\n${clientGuidance.whatItIs}\n\n👉 ${clientGuidance.nextStep}`
        : err?.name === 'AbortError' ? strings.errors.network : strings.errors.generic;

      const fallbackMsg: ChatMessage = {
        id: `fallback-${Date.now()}`,
        role: 'assistant',
        content: fallbackContent,
        readAloudText: fallbackContent,
        structuredGuidance: clientGuidance,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
      handleVoiceResponse(fallbackMsg.id, fallbackMsg.readAloudText || fallbackMsg.content);
    } finally {
      setIsLoading(false);
    }
  };

  // Voice recognition callback: directly triggers voice-first response flow
  const handleVoiceFinalResult = useCallback((spokenText: string) => {
    if (spokenText && spokenText.trim()) {
      setHasSpokenPreviously(true);
      setVoiceState('understanding');
      handleSendMessage(spokenText.trim(), true);
    } else {
      setVoiceState('idle');
    }
  }, [currentLanguage, currentLangConfig]);

  const {
    isSupported: isSpeechSupported,
    isListening,
    isProcessing: isSpeechProcessing,
    transcript: liveTranscript,
    startListening,
    stopListening,
    errorCode: speechError,
  } = useSpeechRecognition(handleVoiceFinalResult);

  // Sync listening and error state with voiceState
  useEffect(() => {
    if (isListening) {
      setVoiceState('listening');
    } else if (speechError) {
      setVoiceState('error');
    }
  }, [isListening, speechError]);

  const handleStartVoice = () => {
    stop();
    setVoiceState('listening');
    startListening(currentLangConfig.speechLocale);
  };

  const handleStopSpeaking = () => {
    stop();
    setVoiceState('idle');
  };

  // Quick Action Dispatcher
  const handleQuickAction = (actionKey: 'helpMeApply' | 'eligible' | 'documents' | 'apply' | 'explainSimply') => {
    if (actionKey === 'helpMeApply') {
      setActivePane('journey');
    } else if (actionKey === 'explainSimply') {
      setActivePane('explain');
    } else if (actionKey === 'eligible') {
      handleSendMessage(strings.quickActionAmIEligible);
    } else if (actionKey === 'documents') {
      handleSendMessage(strings.quickActionWhatDoINeed);
    } else if (actionKey === 'apply') {
      handleSendMessage(strings.quickActionHowDoIApply);
    }
  };

  // Read aloud handler
  const handleReadAloud = (id: string, text: string) => {
    speak(id, text, currentLangConfig.speechLocale);
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-150 ${
        highContrast ? 'bg-black text-yellow-300' : 'bg-amber-50/30 text-stone-900'
      }`}
    >
      {/* Skip to Main Content Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-amber-700 focus:text-white focus:rounded-xl focus:shadow-lg focus:font-bold focus:ring-4 focus:ring-amber-300"
      >
        Skip to main content
      </a>

      {/* Accessible Header */}
      <Header
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        highContrast={highContrast}
        onToggleHighContrast={() => setHighContrast(!highContrast)}
      />

      {/* Main Content Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-4 sm:py-6" id="main-content">
        {/* Banner Pill for Scheme Context */}
        <div className="flex items-center justify-between pb-2">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-800 dark:text-yellow-400">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>{strings.schemeTitle}</span>
          </div>
          {activePane !== 'chat' && (
            <button
              onClick={() => setActivePane('chat')}
              className={`text-xs font-bold underline ${
                highContrast ? 'text-yellow-400 hover:text-yellow-300' : 'text-amber-700 hover:text-amber-900'
              }`}
            >
              ← Back to Chat & Voice
            </button>
          )}
        </div>

        {/* Demo Scenarios Bar for Instant Hackathon Evaluation */}
        <DemoScenariosBar
          strings={strings}
          highContrast={highContrast}
          onSelectScenario={handleSendMessage}
        />

        {/* Big Tactile Voice Microphone Button */}
        <VoiceMicButton
          isSupported={isSpeechSupported}
          voiceState={voiceState}
          isListening={isListening || voiceState === 'listening'}
          isProcessing={isLoading || isSpeechProcessing || voiceState === 'understanding'}
          isSpeaking={isPlaying || voiceState === 'speaking'}
          onStartListening={handleStartVoice}
          onStopListening={() => {
            stopListening();
            setVoiceState('idle');
          }}
          onStopSpeaking={handleStopSpeaking}
          strings={strings}
          highContrast={highContrast}
          errorMessage={speechError}
          currentTranscript={liveTranscript}
          hasSpokenPreviously={hasSpokenPreviously}
          onSimulateDemoVoice={(txt) => {
            setHasSpokenPreviously(true);
            setVoiceState('understanding');
            handleSendMessage(txt, true);
          }}
        />

        {/* Home Screen: 6 Large Visual Categories & Guided Prompts */}
        {activePane === 'chat' && (
          <HomeCategories
            strings={strings}
            highContrast={highContrast}
            onSelectCategory={(_catKey, samplePrompt) => handleSendMessage(samplePrompt)}
            onSelectGuidedPrompt={handleSendMessage}
          />
        )}

        {/* Quick Action Navigation Grid */}
        <QuickActions
          strings={strings}
          onSelectAction={handleQuickAction}
          highContrast={highContrast}
        />

        {/* Conditional Panes */}
        {activePane === 'journey' && (
          <GuidedJourney
            currentLanguage={currentLanguage}
            strings={strings}
            highContrast={highContrast}
            onReadAloud={(txt) => handleReadAloud('journey-step', txt)}
            isPlayingAudio={isPlaying && activeId === 'journey-step'}
            onStopAudio={stop}
            onClose={() => setActivePane('chat')}
          />
        )}

        {activePane === 'explain' && (
          <ExplainSimply
            currentLanguage={currentLanguage}
            strings={strings}
            highContrast={highContrast}
            onReadAloud={(txt) => handleReadAloud('explain-simply', txt)}
            isPlayingAudio={isPlaying && activeId === 'explain-simply'}
            onStopAudio={stop}
            onClose={() => setActivePane('chat')}
          />
        )}

        {/* Assistant Chat Interface */}
        <section aria-label="JanSakhi AI Conversation">
          <AssistantChat
            messages={messages}
            currentLanguage={currentLanguage}
            strings={strings}
            highContrast={highContrast}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            onReadAloud={handleReadAloud}
            playingMessageId={isPlaying ? activeId : null}
            onStopAudio={stop}
          />
        </section>

        {/* Trust & Safety Assurance Callout */}
        <div
          className={`my-4 p-3.5 rounded-2xl border text-xs sm:text-sm flex items-start gap-2.5 font-medium ${
            highContrast
              ? 'bg-stone-900 border-yellow-400 text-yellow-200'
              : 'bg-amber-500/10 border-amber-200 text-stone-700'
          }`}
        >
          <ShieldCheck className={`w-5 h-5 shrink-0 mt-0.5 ${highContrast ? 'text-yellow-400' : 'text-amber-700'}`} />
          <p>{strings.trustSafetyNote}</p>
        </div>

        {/* Official Source and Non-Government Disclaimer Banner */}
        <OfficialSourceCard strings={strings} highContrast={highContrast} />
      </main>

      {/* Accessible Footer */}
      <footer
        className={`py-4 text-center text-xs font-medium border-t ${
          highContrast ? 'border-yellow-400 bg-black text-yellow-400' : 'border-amber-200/80 bg-white/70 text-stone-500'
        }`}
      >
        <p>JanSakhi AI • Designed for the "Invisible Woman" • 100% Grounded in Official Government Data</p>
      </footer>
    </div>
  );
};

export default App;
