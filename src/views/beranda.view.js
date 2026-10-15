// EduBuddy View: Beranda
// Multi-line formatted template for readability and maintainability

export const berandaView = /* html */ `<div class="flex flex-col w-full gap-space-md">
<!-- Greeting Banner with Warm Compassionate Vibe -->
<div class="relative overflow-hidden rounded-[20px] bg-gradient-to-br from-surface-container-low via-surface-container to-surface-variant p-space-md shadow-sm">
<div class="flex items-start justify-between gap-space-sm relative z-10">
<div class="flex flex-col min-w-0">
<div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-fixed/60 text-on-primary-fixed text-label-sm font-label-sm w-fit mb-1.5">
<span class="material-symbols-outlined text-[16px] text-primary" style="font-variation-settings: 'FILL' 1;">eco</span>
<span class="">Teman Perjalananmu</span>
</div>
<h2 class="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">Halo Rina, EduBuddy siap menemani belajarmu hari ini!</h2>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-1">Satu langkah kecil hari ini tetap sebuah kemajuan yang sangat berharga.</p>
</div>
<div class="shrink-0 w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary shadow-sm">
<span class="material-symbols-outlined text-[28px]" style="font-variation-settings: 'FILL' 1;">favorite</span>
</div>
</div>
<!-- Decorative Ambient Glow -->
<div class="absolute -right-6 -bottom-6 w-24 h-24 bg-primary-container/20 rounded-full blur-2xl pointer-events-none"></div>
</div>
<!-- Summary Metric Bento Grid (2x2) -->
<div class="grid grid-cols-2 gap-space-sm">
<!-- Metric 1: Jam Belajar -->
<div data-path="jadwal" role="button" tabindex="0" class="cursor-pointer active:scale-[0.98] transition-transform bg-surface-container-lowest rounded-[20px] p-space-md shadow-sm flex flex-col justify-between">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm text-on-surface-variant">Jam Belajar</span>
<span class="material-symbols-outlined text-[20px] text-primary">schedule</span>
</div>
<div class="my-space-sm flex items-center gap-space-sm">
<!-- Circular Progress Ring (Inline SVG) -->
<div class="relative w-12 h-12 shrink-0 flex items-center justify-center">
<svg class="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
<path class="text-surface-container" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="3.5"></path>
<path class="text-primary-container" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-dasharray="75, 100" stroke-linecap="round" stroke-width="3.5"></path>
</svg>
<span class="absolute text-[11px] font-bold text-on-surface">75%</span>
</div>
<div class="flex flex-col min-w-0">
<span class="font-headline-sm text-headline-sm font-bold text-on-surface leading-tight">45 <span class="font-body-sm text-body-sm font-normal text-on-surface-variant">mnt</span></span>
<span class="font-label-sm text-label-sm text-on-surface-variant truncate">Target 60 mnt</span>
</div>
</div>
<span class="font-label-sm text-label-sm text-primary font-semibold">15 menit lagi!</span>
</div>
<!-- Metric 2: Streak Harian -->
<div data-path="belajar" role="button" tabindex="0" class="cursor-pointer active:scale-[0.98] transition-transform bg-surface-container-lowest rounded-[20px] p-space-md shadow-sm flex flex-col justify-between">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm text-on-surface-variant">Streak Harian</span>
<span class="material-symbols-outlined text-[20px] text-secondary" style="font-variation-settings: 'FILL' 1;">local_fire_department</span>
</div>
<div class="my-space-sm">
<div class="flex items-baseline gap-1">
<span class="font-headline-lg text-headline-lg font-bold text-on-surface leading-none">4</span>
<span class="font-label-md text-label-md font-semibold text-on-surface-variant">Hari</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5 leading-snug">Hebat, konsisten terus!</p>
</div>
<div class="flex items-center gap-1">
<span class="w-2 h-2 rounded-full bg-primary-container"></span>
<span class="w-2 h-2 rounded-full bg-primary-container"></span>
<span class="w-2 h-2 rounded-full bg-primary-container"></span>
<span class="w-2 h-2 rounded-full bg-primary-container"></span>
<span class="w-2 h-2 rounded-full bg-surface-container"></span>
</div>
</div>
<!-- Metric 3: Bantuan Finansial -->
<div data-path="ekonomi" role="button" tabindex="0" class="cursor-pointer active:scale-[0.98] transition-transform bg-surface-container-lowest rounded-[20px] p-space-md shadow-sm flex flex-col justify-between">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm text-on-surface-variant">Bantuan Dana</span>
<span class="material-symbols-outlined text-[20px] text-primary">account_balance_wallet</span>
</div>
<div class="my-space-sm">
<span class="font-label-lg text-label-lg font-bold text-on-surface block leading-tight">PIP &amp; Beasiswa</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">KIP-Sekolah</span>
</div>
<div class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm w-fit font-bold">
<span class="material-symbols-outlined text-[14px]">verified</span>
<span class="">Diverifikasi</span>
</div>
</div>
<!-- Metric 4: Sesi Konseling Berikutnya -->
<div data-path="booking" role="button" tabindex="0" class="cursor-pointer active:scale-[0.98] transition-transform bg-surface-container-lowest rounded-[20px] p-space-md shadow-sm flex flex-col justify-between">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm text-on-surface-variant">Teman Cerita</span>
<span class="material-symbols-outlined text-[20px] text-tertiary">support_agent</span>
</div>
<div class="my-space-sm">
<span class="font-label-lg text-label-lg font-bold text-on-surface block leading-tight">Besok, 16.00</span>
<span class="font-body-sm text-body-sm text-on-surface-variant truncate block">Kak Maya (Konselor)</span>
</div>
<div class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm w-fit font-semibold">
<span class="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
<span class="">Terkonfirmasi</span>
</div>
</div>
</div>
<!-- Hero Reassurance Card 'Rekomendasi Untukmu Hari Ini' -->
<div class="relative overflow-hidden rounded-[20px] bg-surface-container-lowest p-space-md shadow-sm">
<div class="flex items-start gap-space-sm mb-space-sm">
<div class="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed shrink-0">
<span class="material-symbols-outlined text-[24px]">crisis_alert</span>
</div>
<div class="flex flex-col min-w-0">
<div class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-fixed/50 text-on-secondary-fixed font-label-sm text-label-sm font-bold w-fit mb-1">
<span class="">Hasil Asesmen Singkat</span>
</div>
<h3 class="font-headline-sm text-headline-sm font-bold text-on-surface leading-snug">
          Fokus Utama: Tantangan Ekonomi
        </h3>
</div>
</div>
<p class="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-space-md">
      Beban kerja sampingan atau biaya sekolah bikin pusing? Tenang, kamu bisa atur jadwal mikro 10 menit dan cek program beasiswa bantuan darurat senilai <span class="font-semibold text-on-surface">Rp 500.000</span> tanpa syarat rumit.
    </p>
<!-- Visual Hint Banner -->
<div class="bg-surface-container-low rounded-xl p-space-sm flex items-center gap-space-sm mb-space-md">
<img class="w-14 h-14 rounded-lg object-cover shrink-0" data-alt="A warm and gentle illustration of an Indonesian teenage student smiling calmly while receiving compassionate support and guidance in a cozy green nature-inspired room, flat modern vector style" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCI+PHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjOEI1Q0Y2Ii8+PGNpcmNsZSBjeD0iMzIiIGN5PSIyNSIgcj0iMTEiIGZpbGw9IiNmZmYiIG9wYWNpdHk9Ii45Ii8+PHBhdGggZD0iTTEwIDY0YzItMTUgMTItMjIgMjItMjJzMjAgNyAyMiAyMnoiIGZpbGw9IiNmZmYiIG9wYWNpdHk9Ii45Ii8+PC9zdmc+">
<div class="flex flex-col min-w-0">
<span class="font-label-md text-label-md text-primary font-bold">Langkah Tanpa Beban</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">Bisa dicicil kapan saja, kamu yang kendalikan waktunya.</span>
</div>
</div>
<!-- Big Action Button (Min Height 52px, Rounded 20px) -->
<button class="w-full min-h-[52px] py-3.5 px-space-md rounded-[20px] bg-primary text-on-primary font-label-lg text-label-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-transform shadow-md font-bold" data-path="jadwal">
<span class="">Coba Jadwal Fleksibel &amp; Ajukan Bantuan</span>
<span class="material-symbols-outlined text-[20px]">arrow_forward</span>
</button>
</div>
<!-- Quick Access Hub 'Langkah Cepatmu' -->
<div class="flex flex-col gap-space-sm">
<div class="flex items-center justify-between px-1">
<h3 class="font-headline-sm text-headline-sm font-bold text-on-surface">Langkah Cepatmu</h3>
<span class="font-label-sm text-label-sm text-primary font-semibold">Pilih Sesuai Mood</span>
</div>
<!-- Card 1: Jembatan Pelajaran -> Cuan & Skill -->
<a class="group bg-surface-container-lowest rounded-[20px] p-space-md shadow-sm flex items-center justify-between gap-space-sm active:bg-surface-container-low transition-colors min-h-[72px]" data-path="belajar" href="#/belajar">
<div class="flex items-center gap-space-md min-w-0">
<div class="w-12 h-12 rounded-[16px] bg-primary-fixed flex items-center justify-center text-on-primary-fixed shrink-0">
<span class="material-symbols-outlined text-[26px]">storefront</span>
</div>
<div class="flex flex-col min-w-0">
<div class="flex items-center gap-2">
<h4 class="font-label-lg text-label-lg font-bold text-on-surface truncate">Jembatan Pelajaran → Cuan &amp; Skill</h4>
</div>
<span class="font-body-sm text-body-sm text-on-surface-variant truncate">Matematika dagang &amp; tips jualan online</span>
<div class="mt-1">
<span class="inline-block px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">Populer: Matematika Dagang</span>
</div>
</div>
</div>
<span class="material-symbols-outlined text-on-surface-variant shrink-0 group-active:translate-x-1 transition-transform">chevron_right</span>
</a>
<!-- Card 2: Ruang Aman: Cerita Tanpa Nama -->
<a class="group bg-surface-container-lowest rounded-[20px] p-space-md shadow-sm flex items-center justify-between gap-space-sm active:bg-surface-container-low transition-colors min-h-[72px]" data-path="aman" href="#/aman">
<div class="flex items-center gap-space-md min-w-0">
<div class="w-12 h-12 rounded-[16px] bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed shrink-0">
<span class="material-symbols-outlined text-[26px]" style="font-variation-settings: 'FILL' 1;">forum</span>
</div>
<div class="flex flex-col min-w-0">
<div class="flex items-center gap-2">
<h4 class="font-label-lg text-label-lg font-bold text-on-surface truncate">Ruang Aman: Cerita Tanpa Nama</h4>
</div>
<span class="font-body-sm text-body-sm text-on-surface-variant truncate">Tumpahkan unek-unek tanpa dihakimi</span>
<div class="mt-1">
<span class="inline-block px-2 py-0.5 rounded-full bg-tertiary-fixed-dim/40 text-on-tertiary-fixed font-label-sm text-label-sm font-bold">100% Rahasia</span>
</div>
</div>
</div>
<span class="material-symbols-outlined text-on-surface-variant shrink-0 group-active:translate-x-1 transition-transform">chevron_right</span>
</a>
<!-- Card 3: Atur Jam Belajar 5 Menit -->
<a class="group bg-surface-container-lowest rounded-[20px] p-space-md shadow-sm flex items-center justify-between gap-space-sm active:bg-surface-container-low transition-colors min-h-[72px]" data-path="jadwal" href="#/jadwal">
<div class="flex items-center gap-space-md min-w-0">
<div class="w-12 h-12 rounded-[16px] bg-surface-container flex items-center justify-center text-on-surface shrink-0">
<span class="material-symbols-outlined text-[26px]">timer</span>
</div>
<div class="flex flex-col min-w-0">
<div class="flex items-center gap-2">
<h4 class="font-label-lg text-label-lg font-bold text-on-surface truncate">Atur Jam Belajar 5 Menit</h4>
</div>
<span class="font-body-sm text-body-sm text-on-surface-variant truncate">Mikro-sesi belajar kilat tanpa stres</span>
<div class="mt-1">
<span class="inline-block px-2 py-0.5 rounded-full bg-primary-fixed/50 text-on-primary-fixed font-label-sm text-label-sm font-bold">Santai &amp; Ringan</span>
</div>
</div>
</div>
<span class="material-symbols-outlined text-on-surface-variant shrink-0 group-active:translate-x-1 transition-transform">chevron_right</span>
</a>
</div>
<!-- Motivational Quote of the Day: Ruang Teduh -->
<div class="relative overflow-hidden rounded-[20px] bg-gradient-to-r from-tertiary-fixed/30 via-surface-container-low to-primary-fixed/30 p-space-md shadow-sm">
<div class="flex items-start gap-space-sm relative z-10">
<div class="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shrink-0 shadow-sm mt-0.5">
<span class="material-symbols-outlined text-[20px]">spa</span>
</div>
<div class="flex flex-col min-w-0">
<span class="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider">Pesan Hari Ini Dari Kakak Pendamping</span>
<p class="font-body-md text-body-md text-on-surface italic mt-1 leading-relaxed">
          "Kamu tidak sendirian. Kalau hari ini capek, istirahat 5 menit itu bukan gagal, tapi bersiap melangkah lagi."
        </p>
<div class="mt-space-sm flex items-center gap-space-sm">
<button class="font-label-sm text-label-sm text-primary font-bold inline-flex items-center gap-1 active:opacity-75" data-act="save-quote">
<span class="material-symbols-outlined text-[16px]">bookmark_add</span>
<span class="">Simpan Pengingat Ini</span>
</button>
</div>
</div>
</div>
</div>
<!-- Community Support Footer Pill -->
<div class="bg-surface-container-lowest rounded-[20px] p-space-sm flex items-center justify-between gap-space-sm shadow-sm">
<div class="flex items-center gap-2 min-w-0">
<div class="w-9 h-9 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed shrink-0">
<span class="material-symbols-outlined text-[18px]">group</span>
</div>
<div class="flex flex-col min-w-0">
<span class="font-label-sm text-label-sm font-bold text-on-surface truncate">Komunitas Pejuang EduBuddy</span>
<span class="font-body-sm text-body-sm text-on-surface-variant truncate">1.240 anak muda saling dukung</span>
</div>
</div>
<button class="shrink-0 px-3 py-1.5 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm font-bold active:scale-95 transition-transform" data-path="chat">
      Gabung
    </button>
</div>
</div>`;
