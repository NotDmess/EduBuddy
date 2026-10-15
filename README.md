# EduBuddy PWA — Teman Belajar Dimanapun

EduBuddy adalah Progressive Web App (PWA) inklusif dan ruang aman bagi pelajar/remaja. Aplikasi ini menyediakan manajemen jadwal fleksibel, asesmen diagnostik mandiri, modul belajar praktis, simulasi teman cerita/chat, pelaporan insiden ramah anak & rahasia, serta pengajuan bantuan konseling dan beasiswa/ekonomi.

---

## 🚀 Ringkasan Teknologi (Tech Stack)

- **Frontend Core**: Vanilla HTML5, CSS3 (Modern Utility & Variables), Vanilla JavaScript (ES Modules).
- **Arsitektur Aplikasi**: Single Page Application (SPA) berbasis Hash Routing (`src/core/router.js`).
- **PWA Capabilities**: Installable Progressive Web App, Web App Manifest (`manifest.webmanifest`), Service Worker Cache-First Offline Engine (`service-worker.js`).
- **Backend Architecture**: Supabase Auth (JWT, email/password) + PostgreSQL Database dengan Row Level Security (RLS) dipersiapkan di [`supabase/schema.sql`](supabase/schema.sql).
- **Deployment Target**: Vercel (Static Web Architecture via [`vercel.json`](vercel.json)) & GitHub.

---

## 🌟 Fitur yang Telah Diimplementasikan

1. **Beranda Interaktif (`#/beranda`)**: Ringkasan capaian, metrik bento (jadwal, belajar, ekonomi, konseling), banner refleksi risiko, dan bookmark quote harian.
2. **Modul Belajar Praktis (`#/belajar`)**: Tab filter (Paket C, Life Skills, Finansial), micro-learning interaktif 4 langkah, dan kuis pemahaman.
3. **Ruang Aman & Lapor Rahasia (`#/aman`)**: Form pengaduan perundungan anonim dengan nomor tiket pengaduan (`#EB-...`), pembersihan metadata EXIF foto bukti, dan tautan darurat telepon langsung (`tel:110`, `tel:129`, `tel:119`).
4. **Manajemen Jadwal (`#/jadwal`)**: Pengatur durasi belajar harian (10m, 15m, 25m, 45m), generator jadwal pintar, penambahan & penghapusan komitmen belajar, dan penyimpanan ke kalender.
5. **Mediasi & Konseling (`#/mediasi`)**: Tab panduan dialog orang tua, tab kesehatan mental, salin skrip dialog, integrasi share WhatsApp, pemilih 5 mood dengan respons empati, dan latihan napas ritmis 4 detik.
6. **Booking Konselor (`#/booking`)**: Pemilihan profil konselor/peer buddy, pemilihan tanggal dan jam temu, validasi jadwal ganda, dan konfirmasi sesi konsultasi.
7. **Teman Cerita (`#/chat`)**: Ruang curhat interaktif dengan quick-reply chips dan simulasi respons empati otomatis.
8. **Bantuan Solusi Ekonomi (`#/ekonomi`)**: Pengajuan bantuan beasiswa PIP, SPP Paket C, dan perlengkapan sekolah dengan dialog interaktif.
9. **Hasil Diagnostik (`#/diagnostik`)**: Peta refleksi tekanan siswa, grafik radar jaring SVG interaktif, dan CTA asesmen mandiri 8 langkah.
10. **Riwayat & Pencapaian (`#/riwayat`)**: Linimasa terpadu sesi konseling terjadwal, laporan insiden, pengajuan bantuan, dan status belajar.
11. **Profil & Pengaturan (`#/profil`)**: Modal edit profil (nama, avatar, warna), toggle push notifikasi, toggle mode privasi anonim, modal FAQ, modal panduan orang tua, dan logout.

---

## ⚠️ Batasan & Status Implementasi Saat Ini

Agar transparan dan sesuai dengan kondisi sistem aktual:
1. **Fitur Chat (`chat.js`) adalah Simulasi Lokal**: Percakapan di tab *Teman Cerita* merupakan simulasi respons empati berbasis bot otomatis di sisi klien (`setTimeout` 900ms) dan disimpan ke `localStorage` per user (`eb_<uid>chat`). Fitur ini **bukan** live WebSocket chat dengan manusia nyata.
2. **Mode Tamu (Local Storage Fallback)**: Jika Supabase belum dikonfigurasi dengan URL & Anon Key aktif, aplikasi otomatis berjalan dalam mode tamu. Data privat disimpan secara lokal di `localStorage` per perangkat.
3. **Koneksi Supabase Cloud**: Seluruh skema database PostgreSQL, fungsi trigger, dan kebijakan RLS di [`supabase/schema.sql`](supabase/schema.sql) telah diverifikasi secara sintaks dan unit test, namun **belum dihubungkan ke instance Supabase Cloud live**.

---

## 🛠️ Panduan Menjalankan Secara Lokal

Karena aplikasi menggunakan ES Modules (`<script type="module">`) dan PWA Service Worker, aplikasi harus dibuka melalui HTTP/HTTPS server lokal (bukan `file://`):

```bash
# Opsi 1: Menggunakan Python
python3 -m http.server 8000

# Opsi 2: Menggunakan Node.js
npx serve . -p 8000
```
Buka browser pada alamat: `http://localhost:8000`

---

## 🔑 Variabel Lingkungan & Konfigurasi Supabase

Template variabel lingkungan tersedia di [`.env.example`](.env.example):
```env
# Supabase Project API URL
VITE_SUPABASE_URL=https://your-project-id.supabase.co

# Supabase Public Anonymous API Key (SAFE for frontend client exposure)
# NEVER put service_role secret here!
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Langkah Setup Database Supabase:
1. Buat proyek baru di [Supabase](https://supabase.com).
2. Buka menu **SQL Editor** pada dashboard Supabase Anda.
3. Salin seluruh isi dari [`supabase/schema.sql`](supabase/schema.sql) lalu klik **Run**. Seluruh tabel, fungsi, trigger, dan kebijakan RLS akan terpasang otomatis.
4. Salin **Project URL** dan **anon public key** dari menu *Project Settings > API*.

### Cara Menghubungkan ke Aplikasi:
- **Cara 1 (Layar Setup In-App - Direkomendasikan)**: Buka aplikasi, masukkan URL & Anon Key pada dialog setup yang muncul, lalu klik "Simpan & Hubungkan".
- **Cara 2 (Injeksi Global)**: Definisikan `window.EDUBUDDY_CONFIG = { SUPABASE_URL: "...", SUPABASE_ANON_KEY: "..." };` sebelum pemanggilan `src/core/app.js`.

> **PERINGATAN KEAMANAN**: JANGAN PERNAH memasukkan atau membagikan `service_role` key ke dalam frontend atau repositori publik.

---

## 📦 Panduan Deployment ke GitHub

### 1. Inisialisasi Repositori Git Lokal
```bash
git init
git add .
git commit -m "feat: initial commit EduBuddy PWA for GitHub and Vercel deployment"
```

### 2. Hubungkan ke GitHub Remote
1. Buat repositori baru di akun GitHub Anda (misalnya: `edubuddy-pwa`).
2. Jalankan perintah berikut di terminal:
```bash
git remote add origin https://github.com/<USERNAME>/edubuddy-pwa.git
git branch -M main
git push -u origin main
```

---

## ▲ Panduan Deployment ke Vercel

EduBuddy dikonfigurasi sebagai aplikasi web statis siap-deploy melalui [`vercel.json`](vercel.json):

### Cara Deploy via Vercel Dashboard (Paling Mudah):
1. Masuk ke [Vercel Dashboard](https://vercel.com).
2. Klik **"Add New"** > **"Project"**.
3. Pilih repositori GitHub `edubuddy-pwa` yang telah Anda push.
4. Pada bagian **Configure Project**:
   - **Framework Preset**: Pilih **`Other`** (atau biarkan default Vercel mendeteksi static HTML).
   - **Root Directory**: `./` (Default root).
   - **Build Command**: Kosongkan (tidak memerlukan build step).
   - **Output Directory**: Kosongkan (file statis langsung dari root).
5. Pada bagian **Environment Variables** (Opsional jika ingin otomatis terisi):
   - `VITE_SUPABASE_URL` : *URL project Supabase Anda*
   - `VITE_SUPABASE_ANON_KEY` : *Anon public key Supabase Anda*
6. Klik **Deploy**.

Aplikasi akan segera tersedia melalui URL HTTPS publik Vercel (misal: `https://edubuddy-pwa.vercel.app`).

### Verifikasi PWA di Vercel:
- Buka URL publik melalui Google Chrome / Safari / Edge di smartphone atau desktop.
- Periksa ikon install di address bar browser untuk menginstal EduBuddy PWA ke homescreen.
- Uji navigasi offline dengan mematikan koneksi internet — app shell dan modul tetap dapat diakses.

---

## 🧪 Pengujian Otomatis

Proyek dilengkapi dengan test suite otomatis:

```bash
# 1. Jalankan Unit & Security Test (RLS, XSS sanitization, SW origin check)
node --test tests/supabase_security.test.mjs

# 2. Jalankan Headless Chrome CDP Interaction Audit
node tests/browser_interaction_audit.mjs
```

### Hasil Test Terverifikasi:
- ✔ 11/11 Security & Architecture Tests PASS
- ✔ 108/108 Elemen DOM Interaktif Terverifikasi di 11 Rute
- ✔ 11/11 Skenario Behavioral PASS
- ✔ 0 Console Errors & 0 Mobile Horizontal Overflow
- ✔ Service Worker terproteksi dari caching endpoint API eksternal/privat
