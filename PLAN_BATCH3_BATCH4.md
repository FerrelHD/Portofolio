# 📖 PLAN — Batch 3 & Batch 4 (Spider-Man Comic Portfolio)

> Ditetapkan: 2026-08-20
> Status: BELUM DIJALANKAN
> Konfirmasi user:
> 1. ✅ Page flip divider via existing Navbar IntersectionObserver (reuse)
> 2. ✅ Reduce Motion Toggle → **OPSI A** (CSS override class + localStorage, simple 90% coverage)

---

## 🎯 BATCH 3 — POLISH & AESTHETIC (Visual Delight)
Estimasi: **~3–4 jam** | 4 fitur + CSS utilities

---

### Fitur #6 — Custom Comic Cursor + Reticle Hover (DESKTOP ONLY)
**Komponen baru**: `src/components/ComicCursor.jsx`
**Dipasang di**: `src/App.jsx` (sibling level dengan AnimeBackground / BackToTop)
**CSS ditambah**: `src/index.css` (cursor-dot, cursor-ring, reticle classes)

#### Spesifikasi:
- **Aktif HANYA untuk pointer: fine (desktop non-touch)**:
  - Check via JS: `window.matchMedia('(pointer: fine)').matches`
  - Jika `false` (mobile/touch): **return null** — tidak render apa-apa, cursor native default
- **State & animasi**:
  - Track `window.mousemove` untuk koordinat `{x, y}` via `useState` + rAF throttle (atau `useMotionValue` dari Framer Motion — biar konsisten)
  - **Dua layer**:
    1. **Dot merah kecil** (8x8 px, `bg-spider-red`, border 1.5px ink-black) — follow 0ms delay, no spring
    2. **Ring jaring laba-laba** (36x36 px, SVG spider web outline, warna `comic-ink`, opacity 0.75) — follow **dengan spring delay kecil** (stiffness 350, damping 30 / 80ms), terasa "drag sedikit"
  - CSS global untuk hide cursor native:
    ```css
    @media (pointer: fine) {
      html[data-custom-cursor="1"],
      html[data-custom-cursor="1"] * {
        cursor: none !important;
      }
    }
    ```
    (Set `data-custom-cursor="1"` ke `<html>` saat mount komponen, lepas saat unmount)
- **Reticle hover mode (LOCK ON!)**:
  - Detect hover pada elemen interaktif: `a, button, [role="button"], .comic-panel, [data-cursor="target"]`
  - Saat hover:
    - Dot berubah jadi **targeting reticle kuning** (crosshair 4 sudut, 24x24px, `bg-spider-yellow`, border ink 1.5px)
    - Ring mengecil + opacity 1 + `scale(1.15)` berwarna spider-yellow
    - Muncul **badge mini `LOCK ON!`** (italic, 9px, comic-chip, `bg-spider-black text-spider-yellow`) pada posisi `(x+24, y-4)` pointer — pointer-events: none
- **Extra guard**:
  - Jangan tangkap mouse jika modal open (ShortcutsModal / SuccessModal) — atur event listener cek: `document.body.querySelector('.modal-backdrop') === null` → jika ada modal, ring jadi opacity 0.3 (mode idle)
  - Jika toggle motion OFF (Opsi A, Batch 4), ring pakai 0 delay (instant follow, no spring)

---

### Fitur #7 — Comic Page Flip Divider + Scroll Speed Lines
**Dibagi jadi 2 bagian, dipasang di komponen terpisah / inline**

#### Bagian A: Page Flip Divider (saat cross section boundary)
**Komponen**: Inline di `src/App.jsx` (state app level) ATAU buat `src/components/ScrollFX.jsx`
**Trigger**: Via **Navbar IntersectionObserver YANG SUDAH ADA** (sudah tracking section change)
  - Modifikasi `Navbar.jsx`: export fungsi callback? Atau cara lebih simple: **Navbar.jsx men-dispatch Custom Event** di document ketika lastActiveRef berubah:
    ```js
    // di Navbar useEffect observer, jika prev !== next:
    document.dispatchEvent(new CustomEvent('comic:section-change', {
      detail: { from: prev, to: next }
    }));
    ```
  - Kemudian ScrollFX / App.jsx: `window.addEventListener('comic:section-change', ...)` → trigger page flip
**Visualisasi Page Flip**:
  - Full width bar 8px tinggi, `position: fixed; top: 50%; transform: translateY(-50%); left: 0; right: 0; z-index: 140`
  - Background: `linear-gradient(90deg, spider-red, spider-yellow, spider-red)`
  - Border 2px `ink-stroke` atas+bawah
  - Animasi: `width: 0% → 100% → 0%` tapi terlihat seperti **bergeser dari kiri ke kanan** (translate X dari -100vw ke +100vw, atau sweep)
  - Duration: ~320ms, easing `ease-out`
  - Hanya tampil 1x tiap ganti section, throttle (jika user scroll super cepat, tidak spam 5x berturut-turut)

#### Bagian B: Speed Lines (scroll cepat)
**Komponen**: Sama dengan ScrollFX.jsx (inline)
**Deteksi velocity**:
  - Gunakan `useScroll` Framer Motion: `const { scrollY } = useScroll()`
  - Track delta per frame (simpan `lastY` + hitung `velocity = Math.abs(scrollY.current - lastY)`)
  - Jika `velocity > 20` per frame (threshold bisa di-tune): render speed lines
**Visualisasi Speed Lines**:
  - Container: fixed inset 0, z-index 130, pointer-events: none
  - 12–18 garis tipis (`width: 1–2px`, `height: random(50px, 180px)`)
  - Warna: `rgba(255,255,255,0.22)` / transparan putih
  - Orientasi: miring sedikit (arah sesuai scroll — ke atas jika scroll ke bawah, ke bawah jika scroll ke atas) — skewY(±12°)
  - Posisi X: random di lebar viewport
  - Opacity: fade-in → hold sebentar → fade-out (0.2s cycle)
  - Tidak perlu persist, cuma "flash" saat velocity tinggi
- Jika reduce-motion ON (Opsi A): speed lines 0 opacity (tidak tampil)

---

### Fitur #9 — Skill Bar Click-to-Fun-Fact Tooltip
**File diedit**: `src/components/Skills.jsx`
**CSS ditambah**: `.fun-fact-tooltip` (di `index.css`)

#### Spesifikasi:
- **Data**: Tambah array `funFacts` parallel dengan `skills`:
  ```js
  const skills = [
    { name: "React JS", level: 90, accent: "spider-red",
      fact: "Belajar React karena terinspirasi costume upgrade Spider-Man 🕸️" },
    // + 5 skill lainnya, total 6 baris
  ];
  ```
- **State**: `useState(null)` → `openFactIndex` (index baris skill aktif, null = tutup)
- **Interaksi**:
  - KLIK di area skill bar (wrapper bar, bukan cuma fill):
    - Jika klik baris sama → tutup (set null)
    - Jika klik baris lain → toggle ke index itu
    - Klik LUAR skill container → tutup (pasang window click listener, cleanup)
  - Tooltip auto-close setelah 3.5 detik (setTimeout, cleanup on unmount / change)
- **UI Tooltip (comic style)**:
  - Position absolute, tepat di **sebelah kanan bar skill** (desktop) atau **bawah bar** (mobile < md) — pakai responsive CSS
  - Background: `bg-spider-yellow text-spider-black` / atau cycle sesuai accent skill
  - Border 2px ink + pop-shadow-sm (2px 2px 0 ink)
  - Padding 10px 14px, font 11px, font-bold italic
  - Ada **caret / panah kecil** (CSS triangle) menunjuk ke bar skill
  - Text awal: "💡 FUN FACT: " + `skill.fact`
  - Animasi masuk: scale(0.85,0) → scale(1,1), pivot di caret point
- **A11y hint**: Tambah text tiny di atas skill container, kanan: `(click bar for fun facts!)` — comic-chip 9px

---

### Fitur #10 — Project Cards Hover: Sound Effect Bubble (BAM! / WHAM! / ZAP!)
**File diedit**: `src/components/Projects.jsx`
**CSS ditambah**: `.sfx-bubble` (di `index.css`)

#### Spesifikasi:
- **Data SFX**: Assign **1 SFX per project TETAP** (bukan random, agar konsisten — random tiap hover = buggy). Contoh:
  ```
  Project 1 (Student Life Portal) → "WHAM!"
  Project 2 (Street Rush)        → "VROOOM!"
  Project 3 (Fersya Shop)        → "ZAP!"
  Project 4 (Shop Landing)       → "BAM!"
  ```
  Tambahkan field `sfx` di array `projects`
- **UI Bubble (small comic style)**:
  - Di pojok **kanan atas card**, sedikit di atas badge tech stack, absolute position
  - **Shape**: Ellipse / rounded comic bubble, `rotate(-5deg)`
  - Background: cycle sesuai palet — project 1 merah, 2 kuning, 3 biru, dst
  - Text: bold, italic, 9px (desktop) / 8px (mobile), uppercase, stroke tipis, warna sesuai contrast (merah/biru → text putih/ink; kuning → text hitam)
  - Border 2px ink + `box-shadow: 2px 2px 0 ink` (pop shadow mini)
  - Pointer-events: none
- **Animasi**:
  - Trigger via card wrapper `onMouseEnter` / `onMouseLeave`
  - atau pakai CSS `group:hover .sfx-bubble` saja (lebih simpel)
  - Entry: `scale(0.2) rotate(-25deg)` → `scale(1) rotate(-5deg)` — spring `stiffness 450 damping 20`, delay 80ms
  - Exit: `scale(0) rotate(+15deg)` — cepat
- **Mobile**: Hover tidak ada (touch). Bisa di-tap: tap 1x bubble muncul 1.2s lalu hilang (toggle short)

---

### CSS Utilities Batch 3 (ditambah ke src/index.css @layer utilities)
Semua class baru Batch 3 & keyframes:
- `.cursor-dot`, `.cursor-ring`, `.cursor-reticle`, `.cursor-lock-badge`
- `.page-flip-sweep` (bar page flip) + `@keyframes page-flip-sweep`
- `.speed-lines-wrap`, `.speed-line`
- `.fun-fact-tooltip` + `.fun-fact-caret`
- `.sfx-bubble`
- `html[data-custom-cursor="1"]` @media pointer fine

---

## 🛡️ BATCH 4 — QUICK WINS + A11y UX (Lebih Ringan)
Estimasi: **~1–1.5 jam** | 2 fitur utama + 2 micro-fix

---

### Fitur #12 — Footer Progress Tracker "Next Issue: ___%"
**File diedit**: `src/components/Footer.jsx` (sekitar L128-L133 yang isinya "Next Issue — Coming Soon...")
**Reuse CSS**: `.loader-progress-track` dan `.loader-progress-fill` (sudah ada dari PageLoader)

#### Spesifikasi:
- **Ganti strip lama** dengan layout 3 kolom horizontal (wrap di mobile jadi 2 baris):
  1. **Kiri**: Chip komik merah `ISSUE #002` (bold 10px, tracking lebar)
  2. **Tengah**: Progress bar (lebar 220–300px desktop, 100% mobile)
     - Track: `bg-comic-panel` border 2px ink, `pop-shadow-sm`
     - Fill: **40%** (user bisa ganti angkanya nanti), `linear-gradient(90deg, spider-blue, spider-yellow)`, border-right ink
     - Jagged notch di ujung fill (sama PageLoader)
  3. **Kanan**: Text **Completion 40%** + chip di bawahnya `Next: Case Studies / Blog`
- **Responsif**: Mobile (<md) → tumpuk vertikal: ISSUE #002 → Progress bar → Completion text
- **Simpan angka sebagai const**:
  ```jsx
  const NEXT_ISSUE = { num: 2, progress: 40, nextUp: "Case Studies / Blog Section" };
  ```
  (User nanti tinggal ganti 40 → berapa saja persennya)

---

### Fitur #14 — Reduce Motion Toggle (OPSI A: CSS Override + LocalStorage)
**Komponen baru**: `src/components/MotionToggle.jsx`
**Tempatkan**:
  - **Desktop**: Kanan Navbar (samping links / samping burger menu, tapi di-hidden sm:)
  - **Mobile**: Didalam mobile menu (Navbar.jsx mobile menu), paling bawah sebelum close
**File diedit**: `src/App.jsx` (bootstrap state + apply class ke body) + `src/index.css` (CSS override)

#### Alur Opsi A (Detail Step):
1. **Komponen MotionToggle**:
   - Baca initial state dari `localStorage.getItem('comic_motion_enabled')` → default `'1'` (enabled)
   - Icon:
     - ON: **motion lines bergerak** (3 garis miring, svg) - chip biru
     - OFF: **motion lines dicoret** (3 garis + X merah di atasnya) - chip abu-abu
   - Label kecil: "Motion" 8px di sebelah icon (desktop), atau panjang "Motion Effects: ON/OFF" di mobile menu
   - Toggle: onClick → flip state, simpan ke localStorage
   - **Dispatch Custom Event** setiap toggle:
     ```js
     document.dispatchEvent(new CustomEvent('comic:motion-change', {
       detail: { enabled: boolean }
     }));
     ```
2. **App.jsx**:
   - `useEffect` mount: baca localStorage + addEventListener `comic:motion-change` → terapkan class di body:
     ```js
     if (enabled) document.body.classList.remove('user-reduce-motion');
     else document.body.classList.add('user-reduce-motion');
     ```
3. **CSS index.css (global, bukan di layer utilities)**:
   ```css
   body.user-reduce-motion,
   body.user-reduce-motion * {
     animation-duration: 0.001ms !important;
     animation-iteration-count: 1 !important;
     transition-duration: 0.001ms !important;
     scroll-behavior: auto !important;
   }
   ```
   - CSS ini **override SEMUA** CSS animation + transition di page (spider-sense, blink, confetti, loader progress, hover, speed lines, shake error, sfx bubble tooltip — semuanya INSTANT). Framer Motion JS tetap jalan tapi visualisasi animasinya 0 duration → terlihat instant / pop. **Hasil akhir: 90% motion mati secara efektif, hemat baterai ~90%**.

---

### Micro Fixes Tambahan (Batch 4, 10 menit):
1. **BackToTop.jsx**: Jika motion OFF → ganti `scrollTo({behavior:'smooth'})` jadi `scrollTo({top:0, behavior:'auto'})` (instant ke atas)
2. **ComicCursor.jsx**: Jika motion OFF → ring tidak pakai spring delay, langsung sama koordinat dot (instant follow)

---

## ✅ Cross Check Akhir (WAJIB setelah Batch 3 + 4 selesai)
1. `npm run build` — exit 0, no warning
2. VS Code GetDiagnostics — 0 error
3. **Manual test checklist**:
   - [ ] Desktop: custom cursor muncul (dot + ring)
   - [ ] Hover link/button: reticle + "LOCK ON!" badge
   - [ ] Mobile: custom cursor TIDAK muncul (cursor default normal)
   - [ ] Scroll cepat antar section: page flip sweep muncul 1x tiap boundary
   - [ ] Scroll super cepat: speed lines putih muncul flash
   - [ ] Click skill bar: tooltip fun fact muncul, caret menunjuk bar
   - [ ] Hover project cards: SFX bubble (WHAM!/ZAM!/dll) muncul sesuai project
   - [ ] Footer progress: progress bar 40% tampil sesuai, mobile wrap OK
   - [ ] Motion toggle chip ada di Navbar desktop & mobile menu
   - [ ] Motion toggle OFF: class `user-reduce-motion` di body (cek via DevTools)
   - [ ] Motion toggle OFF: semua CSS animasi berhenti, BackToTop instant scroll
   - [ ] Toggle persist setelah page refresh (localStorage OK)
   - [ ] Keyboard S dan ? shortcut tetap jalan di mode motion OFF (hanya animasi visual yang kurang)

---

## 📁 Summary File yang Akan Dientri
### File Baru (6 file):
- `src/components/ComicCursor.jsx`
- `src/components/ScrollFX.jsx` (page flip + speed lines)
- `src/components/MotionToggle.jsx`

### File Diedit (9 file):
- `src/App.jsx` — pasang ComicCursor, ScrollFX, Motion bootstrap
- `src/components/Navbar.jsx` — dispatch comic:section-change event, pasang MotionToggle
- `src/components/Skills.jsx` — fun fact state + click handler + tooltip
- `src/components/Projects.jsx` — SFX bubble data + hover bubble
- `src/components/Footer.jsx` — progress tracker next issue
- `src/components/BackToTop.jsx` — micro-fix scroll motion OFF instant
- `src/index.css` — tambah semua utilities Batch 3+4 + keyframes + @media pointer fine rules + user-reduce-motion override
- (Opsional kecil) `src/components/PageLoader.jsx` / `ShortcutsModal.jsx` — tidak perlu diubah, Opsi A sudah cukup dengan CSS override

---

> Catatan untuk next agent (jika ganti akun):
> 1. Semua nama class CSS baru HARUS konsisten: snake-case / kebab-case, prefix `cursor- / sfx- / tooltip- / page-flip- / speed-line`
> 2. Selalu `npm run build` **sebelum dan sesudah** Batch untuk verify
> 3. Jika Framer Motion `useMotionValue` untuk cursor laggy, fallback ke `useEffect` + `mousemove` listener biasa dengan `requestAnimationFrame` throttle — sama saja hasilnya
