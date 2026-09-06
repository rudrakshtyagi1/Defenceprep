# DefencePrep 🛡️

> **"Prepare like it's the real exam."**

DefencePrep is a modern, high-precision exam preparation platform built specifically for Indian defence aspirants targeting the **UPSC NDA (National Defence Academy)** and **UPSC CDS (Combined Defence Services)** examinations.

The platform transforms official UPSC Previous Year Question Papers (PYQs) into real-time, timed, full-length computer-based mock tests with authentic marking schemes, detailed question palettes, and performance telemetry.

---

## ⚡ Key Highlights

- **Authentic Exam Simulator**: 150-minute (NDA) and 120-minute (CDS) countdown timers with threshold alert styling, auto-submission protocol, and accidental exit protection.
- **Full-Scale Question Palette**: Real-time tracking of 5 distinct question states (*Not Visited*, *Not Answered*, *Answered*, *Marked for Review*, *Answered + Marked*).
- **Official UPSC Scoring Engine**: Exact penalty modeling (-0.83 for NDA Math, -1.33 for NDA GAT, -0.33 for CDS) with safe handling for pending official answer keys.
- **Mathematical Print Authenticity**: High-resolution 300 DPI visual crops for every extracted math question, preserving matrix brackets, determinants, radicals, and geometry diagrams.
- **Multi-Item Directions Context**: Automated extraction and UI display of shared problem instructions for question sets (e.g., Q46–Q50, Q51–Q52).
- **In-Depth Performance Analytics**: Interactive score breakdowns, accuracy donuts, topic diagnostics (identifying high-scoring strengths vs. negative leakage areas), and longitudinal attempt history stored locally.
- **Military Precision Aesthetic**: High-contrast Charcoal Dark mode (`#0a0e1a`) and Day Light mode (`#ffffff`) with electric teal and royal blue accents.

---

## 🛠️ Architecture & Tech Stack

```
defenceprep/
├── data/                               # Raw UPSC PDFs and structured questions
│   ├── nda/                            # Official NDA question papers (PDF)
│   ├── cds/                            # Official CDS question papers (PDF)
│   └── processed/                      # Structured JSON and high-res image crops
├── scripts/                            # High-accuracy OCR & vision extraction pipeline
│   ├── test_pdf_ingestion.py           # Pilot detection and validation script
│   └── extract_full_math_paper.py      # Dual-column OCR & 300 DPI bbox cropper
└── defenceprep/                        # Modern React web application
    ├── src/
    │   ├── types/                      # TypeScript domain models and interfaces
    │   ├── context/                    # Theme and persistent state providers
    │   ├── services/                   # Score calculation, history telemetry, attempt state
    │   ├── hooks/                      # Timer and test session state machines
    │   ├── data/                       # Exam catalogs, papers metadata, and question registries
    │   ├── components/                 # Reusable UI, exam cards, simulators, palette
    │   └── pages/                      # Home, Papers, NDA, CDS, Test, Results, Performance
    └── public/
        └── questions/                  # 300 DPI question crops for instant UI rendering
```

### Technologies Used
- **Frontend**: React 19, TypeScript (Strict Mode)
- **Styling**: Tailwind CSS v4, Custom Design Tokens
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Data Visualization**: Recharts
- **Routing**: React Router v7
- **Tooling**: Vite 8, Oxlint

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/rudrakshtyagi1/Defenceprep.git
cd Defenceprep/defenceprep

# Install frontend dependencies
npm install

# Start local development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build & Linting
```bash
# Type-check and build for production
npm run build

# Run linter
npm run lint
```

---

## 📄 Question Extraction Pipeline (Python)

DefencePrep incorporates a dual-column Python extraction pipeline powered by PyMuPDF and Apple Vision framework:

```bash
# Extract full NDA Mathematics paper (120 questions + 300 DPI crops)
python3 scripts/extract_full_math_paper.py
```

Features of the pipeline:
- Filters bilingual UPSC papers by isolating odd-page English columns from even-page Hindi text.
- Segregates shared problem contexts from individual questions.
- Automatically crops and saves individual question boxes at 300 DPI for zero-loss mathematical rendering.

---

## ⚖️ Disclaimer

DefencePrep is an independent educational practice platform and is **not affiliated with, endorsed by, or associated with the Union Public Service Commission (UPSC), the Ministry of Defence, or the Indian Armed Forces**. All question papers are property of UPSC and are utilized solely for educational practice purposes.

---

## 👨‍💻 Author

Crafted with precision by **[Rudraksh Tyagi](https://github.com/rudrakshtyagi1)**.
