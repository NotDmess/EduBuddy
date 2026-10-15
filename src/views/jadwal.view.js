// EduBuddy View: Jadwal
// Multi-line formatted template for readability and maintainability

export const jadwalView = /* html */ `<div class="flex flex-col w-full pb-10 space-y-space-md">
<!-- Header Banner & Compassionate Framing -->
<div class="relative overflow-hidden rounded-[20px] bg-gradient-to-br from-surface-container-low via-surface-container to-surface-variant p-space-md shadow-sm">
<div class="flex items-start justify-between gap-space-sm relative z-10">
<div class="flex-1">
<div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm mb-space-xs">
<span class="material-symbols-outlined text-[15px]" style="font-variation-settings: 'FILL' 1;">schedule</span>
<span class="">Bebas Tekanan • Ritme Pribadi</span>
</div>
<h2 class="font-headline-md text-on-surface text-headline-md font-bold">Kalkulator Jadwal Fleksibel</h2>
<p class="font-body-sm text-on-surface-variant text-body-sm mt-1">
          Belajar tanpa mengorbankan kerja part-time atau bantu keluarga. Temukan celah waktu luang terbaikmu.
        </p>
</div>
<div class="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed shrink-0 shadow-sm">
<span class="material-symbols-outlined text-[26px]">hourglass_top</span>
</div>
</div>
<!-- Quick Emergency Action: Mode 5 Menit -->
<div class="mt-space-md pt-space-xs">
<button class="w-full min-h-[50px] rounded-[18px] bg-secondary-container text-on-secondary-container px-space-md py-space-sm flex items-center justify-between shadow-sm active:scale-[0.98] transition-all duration-200" id="quick-mode-btn" onclick="toggleQuickFiveMode()">
<div class="flex items-center gap-space-sm text-left">
<span class="w-8 h-8 rounded-full bg-surface-container-lowest/40 flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-[20px]">bolt</span>
</span>
<div>
<div class="font-label-md text-label-md font-bold flex items-center gap-1">
<span class="">Hari Berat? Aktifkan Mode 5 Menit</span>
<span class="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-surface-container-lowest/50 text-on-secondary-container font-semibold" id="mode-badge">Siap</span>
</div>
<p class="font-body-sm text-body-sm opacity-90 leading-tight">Streak aman, cukup 1 modul kilat tanpa rasa bersalah.</p>
</div>
</div>
<span class="material-symbols-outlined text-[22px] shrink-0" id="mode-icon">arrow_forward</span>
</button>
</div>
</div>
<!-- Step 1: Input Komitmen Tetap (Timetable Visual) -->
<div class="rounded-[20px] bg-surface-container-lowest p-space-md shadow-sm space-y-space-md">
<div class="flex items-center justify-between">
<div class="flex items-center gap-space-sm">
<span class="w-7 h-7 rounded-full bg-primary text-on-primary font-label-md text-label-md flex items-center justify-center font-bold">1</span>
<div>
<h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">Komitmen Utama Kamu</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant">Tandai waktu sibukmu agar tidak terganggu.</p>
</div>
</div>
<button onclick="komit(this)" class="font-label-sm text-label-sm text-primary font-bold flex items-center gap-0.5 active:opacity-75">
<span class="material-symbols-outlined text-[18px]">add_circle</span> Tambah
      </button>
</div>
<!-- Active Commitment Badges -->
<div class="grid grid-cols-1 gap-2">
<!-- Item 1: Part time -->
<div class="flex items-center justify-between p-3 rounded-[16px] bg-secondary-fixed/50 text-on-secondary-fixed">
<div class="flex items-center gap-space-sm min-w-0">
<span class="w-8 h-8 rounded-xl bg-secondary-container/20 flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-[18px] text-secondary">storefront</span>
</span>
<div class="min-w-0">
<p class="font-label-md text-label-md font-bold truncate">Kerja Shift Toko / Kasir</p>
<p class="font-body-sm text-body-sm opacity-80">13.00 - 18.00 WIB • Sen, Rab, Jum, Sab</p>
</div>
</div>
<span class="font-label-sm text-label-sm bg-surface-container-lowest/80 px-2.5 py-1 rounded-full text-secondary font-bold">5 Jam</span>
</div>
<!-- Item 2: Jaga Adik / Bantu Rumah -->
<div class="flex items-center justify-between p-3 rounded-[16px] bg-tertiary-fixed/60 text-on-tertiary-fixed">
<div class="flex items-center gap-space-sm min-w-0">
<span class="w-8 h-8 rounded-xl bg-tertiary-container/30 flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-[18px] text-tertiary">family_restroom</span>
</span>
<div class="min-w-0">
<p class="font-label-md text-label-md font-bold truncate">Bantu Jualan / Jaga Adik</p>
<p class="font-body-sm text-body-sm opacity-80">06.00 - 08.00 WIB • Setiap Hari</p>
</div>
</div>
<span class="font-label-sm text-label-sm bg-surface-container-lowest/80 px-2.5 py-1 rounded-full text-tertiary font-bold">2 Jam</span>
</div>
<!-- Item 3: Sekolah / Penugasan -->
<div class="flex items-center justify-between p-3 rounded-[16px] bg-surface-container-high text-on-surface">
<div class="flex items-center gap-space-sm min-w-0">
<span class="w-8 h-8 rounded-xl bg-surface-variant flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-[18px] text-primary">school</span>
</span>
<div class="min-w-0">
<p class="font-label-md text-label-md font-bold truncate">Sekolah / Paket C / Belajar Wajib</p>
<p class="font-body-sm text-body-sm text-on-surface-variant">08.00 - 12.30 WIB • Sen - Kam</p>
</div>
</div>
<span class="font-label-sm text-label-sm bg-surface-container-lowest px-2.5 py-1 rounded-full text-on-surface-variant font-bold">4.5 Jam</span>
</div>
</div>
<!-- Mini Visual Timetable Heatmap -->
<div class="space-y-space-xs pt-1">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm text-on-surface-variant font-bold">Pratinjau Kepadatan Mingguan</span>
<div class="flex items-center gap-3">
<div class="flex items-center gap-1">
<span class="w-2.5 h-2.5 rounded-full bg-secondary-container"></span>
<span class="font-label-sm text-label-sm text-on-surface-variant">Sibuk</span>
</div>
<div class="flex items-center gap-1">
<span class="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
<span class="font-label-sm text-label-sm text-on-surface-variant">Celah Luang</span>
</div>
</div>
</div>
<!-- Weekly Matrix Columns -->
<div class="grid grid-cols-7 gap-1.5 pt-1">
<!-- Senin -->
<div class="flex flex-col items-center gap-1 p-1.5 rounded-xl bg-surface-container">
<span class="font-label-sm text-label-sm font-bold text-on-surface">Sen</span>
<div class="w-full h-12 rounded-lg bg-surface-container-lowest flex flex-col justify-between p-0.5 overflow-hidden">
<span class="w-full h-3 rounded-sm bg-tertiary/70"></span>
<span class="w-full h-3 rounded-sm bg-primary-container"></span>
<span class="w-full h-4 rounded-sm bg-secondary-container"></span>
</div>
<span class="font-label-sm text-[10px] text-primary font-bold">1 Celah</span>
</div>
<!-- Selasa -->
<div class="flex flex-col items-center gap-1 p-1.5 rounded-xl bg-surface-container">
<span class="font-label-sm text-label-sm font-bold text-on-surface">Sel</span>
<div class="w-full h-12 rounded-lg bg-surface-container-lowest flex flex-col justify-between p-0.5 overflow-hidden">
<span class="w-full h-3 rounded-sm bg-tertiary/70"></span>
<span class="w-full h-4 rounded-sm bg-surface-variant"></span>
<span class="w-full h-3 rounded-sm bg-primary-container"></span>
</div>
<span class="font-label-sm text-[10px] text-primary font-bold">1 Celah</span>
</div>
<!-- Rabu -->
<div class="flex flex-col items-center gap-1 p-1.5 rounded-xl bg-surface-container">
<span class="font-label-sm text-label-sm font-bold text-on-surface">Rab</span>
<div class="w-full h-12 rounded-lg bg-surface-container-lowest flex flex-col justify-between p-0.5 overflow-hidden">
<span class="w-full h-3 rounded-sm bg-tertiary/70"></span>
<span class="w-full h-4 rounded-sm bg-secondary-container"></span>
<span class="w-full h-3 rounded-sm bg-primary-container"></span>
</div>
<span class="font-label-sm text-[10px] text-primary font-bold">1 Celah</span>
</div>
<!-- Kamis -->
<div class="flex flex-col items-center gap-1 p-1.5 rounded-xl bg-surface-container">
<span class="font-label-sm text-label-sm font-bold text-on-surface">Kam</span>
<div class="w-full h-12 rounded-lg bg-surface-container-lowest flex flex-col justify-between p-0.5 overflow-hidden">
<span class="w-full h-3 rounded-sm bg-primary-container"></span>
<span class="w-full h-4 rounded-sm bg-surface-variant"></span>
<span class="w-full h-3 rounded-sm bg-tertiary/70"></span>
</div>
<span class="font-label-sm text-[10px] text-primary font-bold">1 Celah</span>
</div>
<!-- Jumat -->
<div class="flex flex-col items-center gap-1 p-1.5 rounded-xl bg-surface-container">
<span class="font-label-sm text-label-sm font-bold text-on-surface">Jum</span>
<div class="w-full h-12 rounded-lg bg-surface-container-lowest flex flex-col justify-between p-0.5 overflow-hidden">
<span class="w-full h-3 rounded-sm bg-tertiary/70"></span>
<span class="w-full h-3 rounded-sm bg-primary-container"></span>
<span class="w-full h-4 rounded-sm bg-secondary-container"></span>
</div>
<span class="font-label-sm text-[10px] text-primary font-bold">1 Celah</span>
</div>
<!-- Sabtu -->
<div class="flex flex-col items-center gap-1 p-1.5 rounded-xl bg-surface-container">
<span class="font-label-sm text-label-sm font-bold text-on-surface">Sab</span>
<div class="w-full h-12 rounded-lg bg-surface-container-lowest flex flex-col justify-between p-0.5 overflow-hidden">
<span class="w-full h-4 rounded-sm bg-secondary-container"></span>
<span class="w-full h-3 rounded-sm bg-primary-container"></span>
<span class="w-full h-3 rounded-sm bg-tertiary/70"></span>
</div>
<span class="font-label-sm text-[10px] text-primary font-bold">1 Celah</span>
</div>
<!-- Minggu -->
<div class="flex flex-col items-center gap-1 p-1.5 rounded-xl bg-surface-container-low">
<span class="font-label-sm text-label-sm font-bold text-on-surface-variant">Min</span>
<div class="w-full h-12 rounded-lg bg-surface-container-lowest flex flex-col justify-center items-center p-0.5 overflow-hidden">
<span class="material-symbols-outlined text-[18px] text-primary">spa</span>
</div>
<span class="font-label-sm text-[10px] text-on-surface-variant font-semibold">Istirahat</span>
</div>
</div>
</div>
</div>
<!-- Step 2: Slider Pilihan Durasi Mikro-Belajar -->
<div class="rounded-[20px] bg-surface-container-lowest p-space-md shadow-sm space-y-space-md">
<div class="flex items-center gap-space-sm">
<span class="w-7 h-7 rounded-full bg-primary text-on-primary font-label-md text-label-md flex items-center justify-center font-bold">2</span>
<div>
<h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">Pilih Kapasitas Nafas Harian</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant">Berapa menit yang sanggup kamu luangkan tanpa lelah?</p>
</div>
</div>
<!-- Duration Selection Chips -->
<div class="grid grid-cols-3 gap-2">
<!-- 5 Menit -->
<button class="duration-option group p-3 rounded-[16px] bg-surface-container hover:bg-surface-variant flex flex-col items-center text-center transition-all duration-200 min-h-[56px] justify-center" onclick="selectDuration(5, this)" type="button">
<span class="font-headline-sm text-headline-sm font-bold text-on-surface">5 Menit</span>
<span class="font-label-sm text-label-sm text-on-surface-variant">Sangat Ringan</span>
</button>
<!-- 10 Menit (Disarankan - Selected State) -->
<button class="duration-option group p-3 rounded-[16px] bg-primary text-on-primary shadow-sm flex flex-col items-center text-center transition-all duration-200 min-h-[56px] justify-center relative" onclick="selectDuration(10, this)" type="button">
<span class="absolute -top-2.5 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-[10px] font-bold shadow-xs">
          Disarankan
        </span>
<span class="font-headline-sm text-headline-sm font-bold text-on-primary">10 Menit</span>
<span class="font-label-sm text-label-sm text-primary-fixed">Paling Pas</span>
</button>
<!-- 15 Menit -->
<button class="duration-option group p-3 rounded-[16px] bg-surface-container hover:bg-surface-variant flex flex-col items-center text-center transition-all duration-200 min-h-[56px] justify-center" onclick="selectDuration(15, this)" type="button">
<span class="font-headline-sm text-headline-sm font-bold text-on-surface">15 Menit</span>
<span class="font-label-sm text-label-sm text-on-surface-variant">Fokus Ekstra</span>
</button>
</div>
<!-- Range Indicator Pill -->
<div class="p-3 rounded-[16px] bg-surface-container-low flex items-center gap-space-sm text-on-surface-variant">
<span class="material-symbols-outlined text-primary text-[20px] shrink-0">psychology_alt</span>
<p class="font-body-sm text-body-sm leading-snug">
        Prinsip <span class="font-bold text-primary">Micro-habit</span>: 10 menit konsisten mengaktifkan daya ingat jangka panjang tanpa memicu burnout saat lelah fisik.
      </p>
</div>
<!-- Action CTA: Hitung Jadwal -->
<button class="w-full min-h-[52px] rounded-[20px] bg-primary text-on-primary font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-all" id="calc-cta-btn" onclick="calculateScheduleAnimation()">
<span class="material-symbols-outlined text-[20px]">search_insights</span>
<span class="">Hitung Jadwal Terbaikku</span>
</button>
</div>
<!-- Step 3: Hasil Kalkulator (Suggested Micro-Learning Slots) -->
<div class="rounded-[20px] bg-surface-container-lowest p-space-md shadow-sm space-y-space-md" id="results-section">
<div class="flex items-center gap-space-sm">
<span class="w-7 h-7 rounded-full bg-primary-container text-on-primary-container font-label-md text-label-md flex items-center justify-center font-bold">3</span>
<div>
<h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">Jadwal Celah Waktu Siap Pakai</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant">Dirancang otomatis di sela-sela jam istirahatmu.</p>
</div>
</div>
<!-- Weekly Total Badge -->
<div class="p-space-md rounded-[18px] bg-gradient-to-r from-primary-fixed to-primary-fixed-dim text-on-primary-fixed shadow-xs flex items-center gap-space-sm">
<div class="w-10 h-10 rounded-full bg-white/60 flex items-center justify-center text-primary shrink-0">
<span class="material-symbols-outlined text-[24px]">celebration</span>
</div>
<div class="min-w-0">
<h4 class="font-label-lg text-label-lg font-bold text-on-primary-fixed leading-tight" id="badge-total-text">
          Ditemukan 6 Celah Waktu: Total 55 Menit Minggu Ini!
        </h4>
<p class="font-body-sm text-body-sm text-on-primary-fixed-variant mt-0.5">
          Cukup untuk menyelesaikan 4 sub-topik modul esensial.
        </p>
</div>
</div>
<!-- Rekomendasi Slot Harian Timeline -->
<div class="space-y-space-sm">
<!-- Slot 1: Senin -->
<div class="flex items-start gap-space-sm p-3 rounded-[16px] bg-surface-container-low transition-all">
<div class="flex flex-col items-center shrink-0 w-12 pt-0.5">
<span class="font-label-md text-label-md font-bold text-primary">SENIN</span>
<span class="font-label-sm text-label-sm text-on-surface-variant">10 mnt</span>
</div>
<div class="flex-1 min-w-0 border-l border-outline-variant/30 pl-3">
<div class="flex items-center justify-between gap-1">
<span class="font-label-md text-label-md font-bold text-on-surface">12.45 - 12.55 WIB</span>
<span class="font-label-sm text-[11px] px-2 py-0.5 rounded-full bg-primary-container/20 text-primary font-bold">Selesai Makan</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5 line-clamp-1">
            Modul Matematika Praktis: Untung-Rugi Dagang Toko
          </p>
</div>
</div>
<!-- Slot 2: Selasa -->
<div class="flex items-start gap-space-sm p-3 rounded-[16px] bg-surface-container-low transition-all">
<div class="flex flex-col items-center shrink-0 w-12 pt-0.5">
<span class="font-label-md text-label-md font-bold text-primary">SELASA</span>
<span class="font-label-sm text-label-sm text-on-surface-variant">10 mnt</span>
</div>
<div class="flex-1 min-w-0 border-l border-outline-variant/30 pl-3">
<div class="flex items-center justify-between gap-1">
<span class="font-label-md text-label-md font-bold text-on-surface">18.45 - 18.55 WIB</span>
<span class="font-label-sm text-[11px] px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold">Ganti Shift</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5 line-clamp-1">
            Bahasa Inggris Komunikasi: Kalimat Sapaan Tamu
          </p>
</div>
</div>
<!-- Slot 3: Rabu -->
<div class="flex items-start gap-space-sm p-3 rounded-[16px] bg-surface-container-low transition-all">
<div class="flex flex-col items-center shrink-0 w-12 pt-0.5">
<span class="font-label-md text-label-md font-bold text-primary">RABU</span>
<span class="font-label-sm text-label-sm text-on-surface-variant">10 mnt</span>
</div>
<div class="flex-1 min-w-0 border-l border-outline-variant/30 pl-3">
<div class="flex items-center justify-between gap-1">
<span class="font-label-md text-label-md font-bold text-on-surface">20.15 - 20.25 WIB</span>
<span class="font-label-sm text-[11px] px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-bold">Rebahan Santai</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5 line-clamp-1">
            Literasi Keuangan: Cara Menabung dari Uang Harian
          </p>
</div>
</div>
<!-- Slot 4: Kamis (Mode 5 Menit) -->
<div class="flex items-start gap-space-sm p-3 rounded-[16px] bg-secondary-fixed/30 transition-all">
<div class="flex flex-col items-center shrink-0 w-12 pt-0.5">
<span class="font-label-md text-label-md font-bold text-secondary">KAMIS</span>
<span class="font-label-sm text-label-sm text-secondary font-bold">5 mnt</span>
</div>
<div class="flex-1 min-w-0 border-l border-secondary-container/40 pl-3">
<div class="flex items-center justify-between gap-1">
<span class="font-label-md text-label-md font-bold text-on-surface">07.10 - 07.15 WIB</span>
<span class="font-label-sm text-[11px] px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-bold">Kilat Pagi</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5 line-clamp-1">
            Kuis Kilat 3 Soal Logika Sehari-hari
          </p>
</div>
</div>
<!-- Slot 5: Jumat -->
<div class="flex items-start gap-space-sm p-3 rounded-[16px] bg-surface-container-low transition-all">
<div class="flex flex-col items-center shrink-0 w-12 pt-0.5">
<span class="font-label-md text-label-md font-bold text-primary">JUMAT</span>
<span class="font-label-sm text-label-sm text-on-surface-variant">10 mnt</span>
</div>
<div class="flex-1 min-w-0 border-l border-outline-variant/30 pl-3">
<div class="flex items-center justify-between gap-1">
<span class="font-label-md text-label-md font-bold text-on-surface">16.30 - 16.40 WIB</span>
<span class="font-label-sm text-[11px] px-2 py-0.5 rounded-full bg-primary-container/20 text-primary font-bold">Sore Tenang</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5 line-clamp-1">
            Pengenalan Digital: Merapikan Dokumen &amp; Portofolio HP
          </p>
</div>
</div>
</div>
<!-- Smart Reassurance & Notification Toggle -->
<div class="p-3.5 rounded-[18px] bg-surface-container flex items-center justify-between gap-space-sm">
<div class="flex items-center gap-space-sm">
<div class="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-[20px]">notifications_active</span>
</div>
<div>
<span class="font-label-md text-label-md font-bold text-on-surface block">Pengingat Ramah (10 Mnt Sebelumnya)</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">Notifikasi santai berupa pesan hangat Kakak Pendamping</span>
</div>
</div>
<!-- Accessible Toggle Switch -->
<label class="relative inline-flex items-center cursor-pointer shrink-0">
<input checked="" class="sr-only peer" id="notif-toggle" onchange="toggleNotificationToast(this)" type="checkbox">
<div class="w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface-container-lowest after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
<!-- Sibling Companion Note (Ruang Teduh Spirit) -->
<div class="p-4 rounded-[18px] bg-gradient-to-br from-tertiary-fixed/40 via-surface-container-low to-primary-fixed/20 flex items-start gap-space-sm">
<img class="w-10 h-10 rounded-full object-cover shrink-0 ring-2 ring-primary/20" data-alt="Warm welcoming portrait illustration of a friendly Indonesian older mentor sister smiling gently, soft pastel lighting, comforting empathetic style" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCI+PHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjQzRjVFIi8+PGNpcmNsZSBjeD0iMzIiIGN5PSIyNSIgcj0iMTEiIGZpbGw9IiNmZmYiIG9wYWNpdHk9Ii45Ii8+PHBhdGggZD0iTTEwIDY0YzItMTUgMTItMjIgMjItMjJzMjAgNyAyMiAyMnoiIGZpbGw9IiNmZmYiIG9wYWNpdHk9Ii45Ii8+PC9zdmc+">
<div class="space-y-1">
<div class="flex items-center gap-1.5">
<span class="font-label-md text-label-md font-bold text-on-surface">Pesan Kakak Pendamping</span>
<span class="font-label-sm text-[10px] px-1.5 py-0.2 rounded bg-tertiary text-on-tertiary font-bold">Setia Menemani</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface leading-relaxed italic">
          “Belajar 10 menit setiap hari jauh lebih bermakna daripada 3 jam tapi bikin kamu jatuh sakit. Capek kerja itu wajar banget, banggalah dengan perjuanganmu hari ini!”
        </p>
</div>
</div>
<!-- Secondary Save Button -->
<div class="pt-1 flex gap-2">
<button class="flex-1 min-h-[48px] rounded-[18px] bg-primary text-on-primary font-label-md text-label-md font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-sm" onclick="saveScheduleToCalendar()">
<span class="material-symbols-outlined text-[18px]">bookmark_added</span>
<span class="">Pasang ke Jadwalku</span>
</button>
<button class="min-h-[48px] px-4 rounded-[18px] bg-surface-container text-on-surface-variant font-label-md text-label-md font-bold flex items-center justify-center hover:bg-surface-container-high active:scale-95 transition-all" onclick="resetScheduleCustom()">
<span class="material-symbols-outlined text-[18px]">tune</span>
</button>
</div>
</div>
<!-- Toast Feedback Notification -->
<div class="fixed bottom-24 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface px-4 py-2.5 rounded-full font-label-md text-label-md flex items-center gap-2 shadow-xl opacity-0 pointer-events-none transition-all duration-300 z-50" id="toast-notif">
<span class="material-symbols-outlined text-primary-fixed text-[18px]">check_circle</span>
<span id="toast-message" class="">Jadwal mikro berhasil disinkronkan!</span>
</div>
</div>`;
