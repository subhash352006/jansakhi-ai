# JanSakhi AI

> **"Your voice. Your language. Your access."**  
> *"Don't just translate government services. Let AI guide you through them."*

JanSakhi AI is a multilingual, voice-friendly digital companion built for first-time women users in India with little or no digital literacy. It transforms cold, confusing government welfare portals into a patient, accessible step-by-step guidance journey in 8 Indian languages.

---

## Problem
First-time women users in India often struggle to independently access essential government services due to multiple compounding barriers:
- **Language Barriers**: Most official notices and portals rely on complex English or administrative jargon rather than everyday regional mother tongues.
- **Digital Literacy Gap**: Many first-time users have little or no typing experience, unfamiliarity with online forms, and discomfort with complex navigation trees.
- **Guidance Deficit**: Rural and marginalized women frequently have nobody at home available or patient enough to explain welfare schemes.
- **Confusion & Exploitation Risk**: Without clear guidance on required documents, zero-fee rules, and official application centers, users fall prey to middlemen or give up in frustration.

---

## Solution
JanSakhi AI replaces rigid chatbots and labyrinthine government websites with a warm, voice-first digital navigator that leads the user through an intuitive journey:
$$\text{LANGUAGE} \longrightarrow \text{NEED} \longrightarrow \text{ASK} \longrightarrow \text{UNDERSTAND} \longrightarrow \text{GUIDE} \longrightarrow \text{ACTION}$$

1. **Voice-First Mother Tongue Interaction**: The user can speak or type in Telugu, Hindi, Tamil, Kannada, Malayalam, Bengali, Marathi, or English.
2. **Simplified First-Time User Home**: 6 large, visual need categories (Schemes, Documents, Skills, Jobs, Finance, Ask) remove the burden of knowing what to ask.
3. **Structured 7-Part Guidance**: Every actionable inquiry generates clear, standardized takeaways: *What it is, Who is eligible, Tickable document checklist, Simple 5-step numbered guide, Where to apply, Verified official source/helpline, and Immediate next step*.
4. **"Explain This Simply" Engine**: Takes complex government circulars and transforms them into everyday layman's terms.
5. **Trust, Safety & PII Guardrails**: Automatically detects and redacts Aadhaar numbers, OTPs, and bank details; never collects credentials; points directly to verified `.gov.in` sources.

---

## Key Features
- **8 Indian Languages**: Comprehensive support for Telugu (`te`), Hindi (`hi`), Tamil (`ta`), Kannada (`kn`), Malayalam (`ml`), Bengali (`bn`), Marathi (`mr`), and English (`en`).
- **Voice + Text Interaction**: Web Speech API integration with live speech preview, audio waveforms, a spoken confirmation/touch-edit card, and browser-wide fallback.
- **Guided Service Discovery**: 6 visual cards on the homepage with instant prompt chips for users who do not know where to start.
- **Step-by-Step Instructions (`StepGuideCard`)**: 7-part guidance with interactive document checkboxes and verified `.gov.in` links.
- **Smart Follow-Up Engine**: Clarifies broad questions with clickable decision options instead of overwhelming text dumps.
- **4 One-Tap Demo Scenarios**: Immediate evaluations for PM Ujjwala 2.0 (Free Gas), New Ration Card, Free Tailoring Training (PMKVY), and Lakhpati Didi (SHG).
- **Accessibility-Focused UX**: High-contrast toggle, font scaling (`A`, `A+`, `A++`), WCAG AAA compliant color ratios, large touch targets ($96\text{px}+$), and regional Indic typography stacks.
- **Reliable Fallback & Error Handling**: Comprehensive handling for microphone denial, unsupported browsers, silence timeouts, and offline/resilient cached catalogs.

---

## Technology Stack
- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS with custom Indic typography stacks and WCAG high-contrast themes
- **Icons**: Lucide React
- **Voice / Speech**: Web Speech API (`SpeechRecognition` & `SpeechSynthesis`)
- **Backend Server**: Node.js with Express and TypeScript (`tsx`)
- **Testing Framework**: Vitest (Unit & Integration) + Chrome DevTools Protocol (CDP Headless Browser Automation)
- **Containerization**: Multi-stage Docker (Node 20 Alpine)

---

## Google Services
1. **Google Gemini API / Google GenAI SDK (`@google/genai`)**:
   - Powers the conversational assistant and "Explain This Simply" circular simplifier using **Gemini 2.5 / 2.0 Flash**.
   - Server-side system instruction strictly enforces empathy, plain regional language, grounding facts, and zero hallucination.
2. **Google Cloud Run**:
   - Production container deployment target using standard HTTP port 8080.
3. **Google Fonts**:
   - High-quality Indic typography stack (`Noto Sans Telugu`, `Noto Sans Devanagari`, `Noto Sans Tamil`, `Noto Sans Kannada`, `Noto Sans Malayalam`, `Noto Sans Bengali`, `Inter`).

---

## Architecture
```
[ User Browser / Mobile Device ]
       │  ▲
       │  │ Web Speech API (Input: SpeechRecognition | Output: SpeechSynthesis)
       ▼  │
[ React + TypeScript + Vite + Tailwind CSS ]
       │  ▲
       │  │ JSON REST API (Port 8080)
       ▼  │
[ Express.js Backend Server ]
   ├── PII Guardrail & Sanitizer (Aadhaar / OTP / Bank details blocked)
   ├── Services Grounding Catalog (Ujjwala 2.0, Ration, PMKVY, Lakhpati Didi)
   ├── Smart Intent Disambiguation Engine
   └── Google GenAI SDK (@google/genai)
       │  ▲
       ▼  │
[ Google Gemini 2.5 / 2.0 Flash ]
```

---

## Local Setup

### Prerequisites
- Node.js LTS (v20+ or v22+)
- npm (v10+)

### 1. Clone & Install
```bash
git clone https://github.com/your-org/jansakhi-ai.git
cd jansakhi-ai
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Edit `.env`:
```env
PORT=8080
GEMINI_API_KEY=your_gemini_api_key_here
MOCK_AI=false
```
*(If no `GEMINI_API_KEY` is provided, JanSakhi AI automatically engages its resilient offline grounding catalog).*

### 3. Build & Run
```bash
# Build production bundle
npm run build

# Start production server
npm start
```
Open [http://localhost:8080](http://localhost:8080) in your browser.

---

## Environment Variables
| Variable | Description | Default | Required? |
| :--- | :--- | :--- | :--- |
| `PORT` | HTTP port the server binds to | `8080` | No |
| `NODE_ENV` | Runtime environment (`development` / `production`) | `development` | No |
| `GEMINI_API_KEY` | Google Gemini API Key (Server-side ONLY) | None | Recommended |
| `MOCK_AI` | Enables grounded fallback mode without live API | `false` | No |

---

## Testing
JanSakhi AI includes automated unit, integration, and headless browser tests:

```bash
# Run Vitest test suite (12 test suites covering 8 languages, catalog, PII, voice)
npm test

# Run Headless Chrome CDP Browser verification
node test-voice-and-fonts.mjs
node test-wow-features.mjs
```

---

## Deployment
JanSakhi AI is packaged with a multi-stage `Dockerfile` configured for Google Cloud Run:

```bash
# Deploy to Google Cloud Run
gcloud run deploy jansakhi-ai \
  --source . \
  --region asia-south1 \
  --allow-unauthenticated \
  --set-env-vars GEMINI_API_KEY="YOUR_KEY_HERE",NODE_ENV="production"
```

---

## Security
- **No Client Secrets**: API keys are strictly confined to the backend server and never exposed in frontend bundles or client network payloads.
- **PII Guardrail**: Pre-execution regex filters intercept and redact 12-digit Indian Aadhaar numbers, 6-digit OTPs, and bank accounts before any data reaches the model.
- **Zero Credential Collection**: JanSakhi AI explicitly warns users never to share passwords or pins and does not ask for personal identification.
- **Stateless Privacy**: No personal conversational data is retained or stored in databases.

---

## Accessibility
- **Target Audience Alignment**: Designed for first-time women users with low digital literacy.
- **Large Touch Targets**: 96px+ microphone button and oversized visual cards prevent mis-clicks.
- **Typography**: Google Noto Indic fonts with increased line-heights ($1.62 - 1.68$) ensure regional vowel signs (*matras*) and conjuncts never clip.
- **High-Contrast Mode**: Single-tap toggle switching to an accessible high-contrast yellow/black palette.
- **Font Sizing**: Instant font scale controls (`A`, `A+`, `A++`).
- **Screen Reader Support**: Complete ARIA roles (`role="dialog"`, `role="alert"`, `aria-live="polite"`).
