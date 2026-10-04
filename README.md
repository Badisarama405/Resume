# CareerPilot 🚀
> **AI-Powered Job Matching & Application Automation Platform for Indian IT Professionals**

CareerPilot is a production-ready web platform tailored for mid-level software engineers (2–5 years of experience) navigating the Indian tech hiring ecosystem (Bangalore, Hyderabad, Pune, Delhi-NCR, Remote).

---

## ✨ Key Features

- **Automated Resume Parsing & Extraction**: Drop any `.pdf`, `.docx`, or `.txt` resume. CareerPilot instantly extracts candidate identity, contact information, tech stack taxonomy, current CTC, and target roles.
- **100% Interactive Profile Review**: Real-time editable fields for candidate name, headline, skills tags, locations, and experience depth.
- **Explainable 5-Dimension ATS Match Scoring (0–100)**:
  - Skill Overlap (0–40 pts)
  - Experience Depth (0–25 pts)
  - Role Title Relevance (0–15 pts)
  - Location & Notice Period Alignment (0–10 pts)
  - Job Recency & Freshness (0–10 pts)
- **Consent-Driven Application Pipeline**: DPDP-compliant pre-submission review modal before any application payload is dispatched.
- **5-Status Application Tracker**: Complete tracking across *Discovered*, *Saved*, *Action Required*, *Applied*, and *Interviews*.
- **Multi-Resume Profile Management**: Pro tier support for maintaining targeted resumes (e.g. Backend vs. Fullstack).
- **Comprehensive 33-Screen Architecture**: Full implementation of all 5 phases spanning onboarding, job discovery, ATS analytics, application automation, and account/tier settings.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Vanilla CSS Design System with dark mode tokens, glassmorphism, and responsive utilities
- **Icons**: Lucide React
- **Testing**: Google Chrome Headless Automated DOM Suite (33/33 screens verified)
- **Deployment Ready**: Out-of-the-box support for Vercel, Netlify, and Docker (Nginx)

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### 3. Build for Production
```bash
npm run build
```

---

## 📁 Project Structure

```text
├── src/
│   ├── components/        # HeaderNav, ErrorBoundary, Shared UI
│   ├── context/           # AppContext (central reactive state store)
│   ├── data/              # Mock jobs catalog, candidates & ATS scoring engine
│   ├── screens/           # All 33 screens across Phases 1 to 5
│   ├── App.jsx            # Master router and screen assembler
│   ├── index.css          # Design system & tokens
│   └── main.jsx           # App entry point
├── scripts/               # Automated test runners (headless Chrome suite)
├── vercel.json            # Vercel deployment configuration
├── netlify.toml           # Netlify SPA redirect rules
├── Dockerfile             # Multi-stage production container
└── nginx.conf             # Nginx web server configuration
```

---

## 🌐 Deployment

- **Vercel**: Import this GitHub repository into [Vercel](https://vercel.com) for instant deployment.
- **Netlify**: Connect your GitHub repo or drag-and-drop the `dist` folder into [Netlify Drop](https://app.netlify.com/drop).
- **Docker**: Run `docker build -t careerpilot:latest . && docker run -p 80:80 careerpilot:latest`.
