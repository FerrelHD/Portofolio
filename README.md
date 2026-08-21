# 🕷️ Ferrel Rashad Akeyla — The Amazing Spider-Dev Portfolio

<div align="center">

![Spider-Man Portfolio Banner](https://img.shields.io/badge/STYLE-Spider--Man%20Comic%20Book-D31F1F?style=for-the-badge&logo=marvel&logoColor=white)
![React](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS%20v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/Deployed_on-GitHub%20Pages-222222?style=for-the-badge&logo=github&logoColor=white)

### 🌐 [Live Production Demo](https://ferrelhd.github.io/Portofolio/)

*An immersive, high-performance developer portfolio built with vintage Marvel comic aesthetics, 60 FPS physics animations, interactive canvas mini-games, and a live web synthesizer audio suite.*

<br />

[![Portfolio Preview](./preview.png)](https://ferrelhd.github.io/Portofolio/)

</div>

---

## 📖 Overview

This portfolio is an interactive digital experience crafted to showcase the engineering capabilities of **Ferrel Rashad Akeyla** (Full-Stack Web Developer, Game Designer, and Visual Creator). 

Inspired by classic Spider-Man comic books, the UI blends retro halftone Ben-Day dots, hard comic pop-shadows, bold typography, authentic newsprint cream palettes (`#EDEAE2`), and dynamic spring physics with modern web performance standards.

---

## ✨ Key Interactive Features

### 🕸️ 1. Dual-Ring Orbital Spider-Web Matrix (`SpiderSkillWeb.jsx`)
- **Continuous 60 FPS Orbital Rotation**: Powered by native `requestAnimationFrame` and polar coordinate trigonometry.
- **Inner Orbit (Core Stack)**: React 19, Tailwind CSS, TypeScript, Node.js, Video Editing, Framer Motion rotating clockwise.
- **Outer Orbit (Secondary & Exploring)**: Blender 3D, Unity C#, Figma, SQL Databases, AI Agents rotating counter-clockwise.
- **Smart Auto-Pause**: Automatically freezes orbital motion upon hover or touch so recruiters can comfortably inspect nodes and read technical breakdowns.
- **Classified Deck Mode**: Alternative view featuring collectible comic trading cards with arcade power mastery level meters.

### 🕹️ 2. Spidey Bug Hunter Mini-Game (`SpideyBugHunter.jsx`)
- Built-in 30-second HTML5 Canvas 2D arcade shooter.
- Shoot webs (`THWIP!`) at flying runtime exceptions (`NullPointer`, `SyntaxError`, `404 Not Found`, `Infinite Loop`, `MemoryLeak`).
- Features combo multipliers, web particle physics, local storage high scores, and audio synthesizer sound effects.

### 📰 3. The Daily Bugle Press (`DailyBugleModal.jsx`)
- Fullscreen retro investigative newspaper modal.
- Includes authentic halftone print effects, vintage classified ads, developer origin stories, and interactive comic articles.

### 📄 4. Interactive Pitch Deck & PDF Export (`PortfolioDeckModal.jsx`)
- Built-in presentation deck modeled after confidential superhero dossier files.
- Real-time slide navigation (<kbd>E</kbd> hotkey) with high-contrast comic styling.
- Direct high-resolution landscape PDF export generator.

### 🦸‍♂️ 5. Spider Control Dock / Gadget Drawer (`SpiderGadgetDrawer.jsx`)
- Floating comic dock on the left viewport margin with an animated pixel **Spider-Man perched on top**.
- **Multiverse Suit Switcher**: Dynamically changes site-wide CSS root variables:
  - 🔴 **Classic Red & Blue** (Peter Parker)
  - ⚫ **Brooklyn Cyber** (Miles Morales)
  - 🌸 **Ghost-Spider** (Gwen Stacy)
  - 🔷 **2099 Cyber Glow** (Miguel O'Hara)
- **Multiverse Achievement Badges**: Tracks 7 easter-egg milestones (Spider-Sense, Terminal Hacker, Suit Collector, Bug Squasher, etc.) with local storage persistence.
- **Audio Suite**: Web Audio API synthesizer for retro 8-bit sound effects (SFX) + background ambient music player with real-time volume slider and mute controls.

### ⌨️ 6. Web Terminal Command Palette (`CommandPalette.jsx`)
- Quick-access terminal drawer accessible via <kbd>Ctrl</kbd> + <kbd>K</kbd> or <kbd>Cmd</kbd> + <kbd>K</kbd>.
- Navigate sections, switch multiverse themes, trigger Spider-Sense, or download CV instantly from your keyboard.

### 📡 7. Mission Archives Radar Tracker (`Projects.jsx`)
- 3D interactive tilt cards for featured projects (E-Commerce, Unity Games, Roblox Simulations, Anime AMVs).
- Integrated with Spidey Tracker Radar Scanner and detailed **Project Brief Modal** popups.

### 📜 8. Daily Bugle Running Text Tickers (`ComicTicker.jsx` & `StickyComicTicker.jsx`)
- Seamless infinite marquee ribbons with authentic skill brand icons and spider emblems.
- Sticky bottom ribbon with viewport coordinate detection and dynamic color inversion.

---

## ⚡ Performance & Optimization Architecture

This application is engineered for maximum performance, minimal bundle weight, and smooth 60 FPS execution across desktop and mobile devices:

- 🚀 **Dynamic Code-Splitting & Lazy Loading (`React.lazy`)**: Interactive overlays, modals, and heavy canvas components (`SpideyBugHunter`, `DailyBugleModal`, `CommandPalette`, `SpiderGadgetDrawer`, `PortfolioDeckModal`) are loaded dynamically, reducing initial JavaScript bundle size for rapid FCP & LCP.
- 📱 **Adaptive 60 FPS Mobile Touch Scroll**: Automatically disables heavy smooth-scroll polyfills on touch screens (`< 768px`), using native browser momentum scrolling for zero-lag mobile navigation.
- 🔊 **Zero-Bloat Web Audio API Synthesizer**: Procedural Web Audio oscillators generate retro 8-bit sound effects (web-shooter THWIP!, chiptune beeps, victory fanfare) directly in code without requiring external audio asset network downloads.
- 🎨 **CSS Hardware Acceleration & DOM Scaffolding**: Utilizes `content-visibility: auto` on offscreen sections and GPU composite layers (`transform: translateZ(0)`) to eliminate frame drops during rapid scrolling.

---

## 🛠️ Tech Stack & Dependencies

| Category | Technologies / Libraries |
|---|---|
| **Core Framework** | React 19, JavaScript (ESNext) |
| **Styling & Design System** | Tailwind CSS v4, Custom CSS Utilities, Comic Pop Art Tokens |
| **Motion & Animation** | Framer Motion (Spring Physics, Layout Animations, Gestures) |
| **Audio Engine** | Native Web Audio API (Synthesizer SFX) + HTML5 Audio Element |
| **Icons & Assets** | Lucide React, Official Brand SVG/PNG Assets, Pixel Art GIFs |
| **Build & Tooling** | Vite, PostCSS, ESLint, Git |
| **Deployment** | GitHub Pages (GitHub Actions CI/CD pipeline) |

---

## 📁 Project Architecture

```plaintext
Portofolio/
├── public/
│   ├── preview.png            # High-res web preview for README & embeds
│   ├── spidey.gif             # Animated browser tab favicon
│   ├── cv.pdf                 # Curated downloadable CV
│   └── Ferrel_Rashad_Portfolio_Deck.pdf # Exportable landscape portfolio deck
├── src/
│   ├── assets/                # Real brand icons, sprites, audio tracks
│   ├── components/
│   │   ├── About.jsx          # Origin story & career milestones
│   │   ├── BackToTop.jsx      # Spider-web vertical launcher button
│   │   ├── ComicTicker.jsx    # Infinite Daily Bugle marquee banner
│   │   ├── CommandPalette.jsx # Keyboard shortcut terminal modal (Ctrl+K)
│   │   ├── Contact.jsx        # Comic transmission contact form & socials
│   │   ├── DailyBugleModal.jsx# Retro newspaper investigative modal
│   │   ├── Footer.jsx         # Multiverse edition footer & spider emblem
│   │   ├── Hero.jsx           # Superhero landing showcase
│   │   ├── Navbar.jsx         # Top comic navigation & motion toggles
│   │   ├── PortfolioDeckModal.jsx # Fullscreen pitch deck & PDF export
│   │   ├── ProjectBriefModal.jsx # Detailed technical project modal
│   │   ├── Projects.jsx       # Mission archives radar tracker & 3D cards
│   │   ├── ScrollFX.jsx       # Spider-laser scroll progress tracker
│   │   ├── Services.jsx       # What I do / Superhero mission offerings
│   │   ├── Skills.jsx         # Ability Matrix container & Classified Deck
│   │   ├── SpiderGadgetDrawer.jsx # Multiverse theme dock & audio suite
│   │   ├── SpiderSkillWeb.jsx # Dual-ring 60 FPS orbital web matrix
│   │   ├── SpideyBugHunter.jsx# HTML5 Canvas 30s arcade mini-game
│   │   ├── StickyComicTicker.jsx # Sticky bottom comic ribbon with color inversion
│   │   └── VideoModal.jsx     # Video player popup
│   ├── lib/
│   │   ├── achievements.js    # LocalStorage gamified achievement tracker
│   │   ├── animation.js       # Framer Motion spring presets & stagger variants
│   │   └── soundFx.js         # Native Web Audio API procedural sound fx
│   ├── App.jsx                # Main application assembler & state hub
│   ├── index.css              # Comic design system, keyframes & theme tokens
│   └── main.jsx               # React DOM entrypoint
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started Locally

To run this project on your local machine:

### 1. Clone the repository
```bash
git clone https://github.com/FerrelHD/Portofolio.git
cd Portofolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Open [http://localhost:5173/Portofolio/](http://localhost:5173/Portofolio/) in your browser.

### 4. Build for production
```bash
npm run build
```

### 5. Preview production build
```bash
npm run preview
```

---

## 🎮 Keyboard Shortcuts

- <kbd>Ctrl</kbd> + <kbd>K</kbd> / <kbd>Cmd</kbd> + <kbd>K</kbd> — Open Spider Terminal Command Palette
- <kbd>E</kbd> — Open Portfolio Pitch Deck & PDF Export Modal
- <kbd>S</kbd> — Trigger Spider-Sense Tingling Radar Glow
- <kbd>G</kbd> — Launch Spidey Bug Hunter 30s Arcade Mini-Game
- <kbd>N</kbd> / <kbd>B</kbd> — Read The Daily Bugle Newspaper Press Report
- <kbd>D</kbd> — Toggle Spider Gadget Dock & Multiverse Theme Suits
- <kbd>P</kbd> — Play / Pause Background Music Track
- <kbd>M</kbd> — Mute / Unmute Audio Suite
- <kbd>1</kbd> - <kbd>6</kbd> — Instant Jump to Sections (Hero, About, Services, Projects, Skills, Contact)
- <kbd>?</kbd> — Toggle Comic Shortcuts Cheatsheet Modal
- <kbd>Esc</kbd> — Close all active modals & slide-out drawers

---

## 👤 Author

**Ferrel Rashad Akeyla**
- 💼 **Portfolio**: [ferrelhd.github.io/Portofolio](https://ferrelhd.github.io/Portofolio/)
- 🐙 **GitHub**: [@FerrelHD](https://github.com/FerrelHD)
- 👔 **LinkedIn**: [Ferrel Rashad](https://www.linkedin.com/in/ferrel-rashad-8a165514b/)
- ✉️ **Email**: [ferrelrashadakeyla2014@gmail.com](mailto:ferrelrashadakeyla2014@gmail.com)

---

<div align="center">

*"With great code comes great responsibility."* 🕷️⚡

</div>
