// EduBuddy View: Mediasi
// Multi-line formatted template for readability and maintainability

export const mediasiView = /* html */ `<div class="flex flex-col w-full pb-6 space-y-space-md">
<!-- Warm Welcome Greeting -->
<div class="flex flex-col space-y-1">
<div class="flex items-center gap-space-xs text-primary">
<span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">spa</span>
<span class="font-label-sm uppercase tracking-wider text-primary">Infografis Ringkas EduBuddy</span>
</div>
<h2 class="font-headline-md text-on-surface">Teman Bicara &amp; Hati Tenang</h2>
<p class="font-body-md text-on-surface-variant">Dukungan hangat untuk hubungan keluarga, asmara, dan rasa cemasmu. Pelan-pelan kita urai bersama.</p>
</div>
<!-- Reassurance Banner -->
<div class="bg-surface-container-low rounded-xl p-space-md flex items-start gap-space-sm shadow-sm">
<div class="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center shrink-0 text-primary">
<span class="material-symbols-outlined text-[22px]">favorite</span>
</div>
<div class="flex flex-col min-w-0">
<span class="font-label-md text-on-surface">Kerahasiaanmu 100% Terjaga</span>
<p class="font-body-sm text-on-surface-variant">Ceritamu aman di sini. Tidak ada penilaian atau omelan. Setiap emosi yang kamu rasakan itu valid.</p>
</div>
</div>
<!-- Sub-Tabs Navigation (Custom Switcher) -->
<div class="bg-surface-container p-1 rounded-full flex gap-1 shadow-sm">
<button aria-label="Bicara dengan Orang Tua" class="flex-1 py-2.5 px-space-sm rounded-full font-label-md transition-all duration-200 flex items-center justify-center gap-1.5 bg-primary text-on-primary shadow-sm" id="tab-btn-orangtua" onclick="switchTab('orangtua')">
<span class="material-symbols-outlined text-[18px]">family_restroom</span>
<span class="truncate">Bicara Orang Tua</span>
</button>
<button aria-label="Hati &amp; Pikiran" class="flex-1 py-2.5 px-space-sm rounded-full font-label-md transition-all duration-200 flex items-center justify-center gap-1.5 text-on-surface-variant hover:text-on-surface" id="tab-btn-mental" onclick="switchTab('mental')">
<span class="material-symbols-outlined text-[18px]">psychology_alt</span>
<span class="truncate">Hati &amp; Pikiran</span>
</button>
</div>
<!-- ================= TAB 1: BICARA DENGAN ORANG TUA ================= -->
<div class="flex flex-col space-y-space-md" id="tab-content-orangtua">
<!-- Visual Guide Card -->
<div class="bg-surface-container-lowest rounded-xl p-space-md shadow-sm space-y-space-sm">
<div class="flex items-center gap-space-sm">
<div class="w-9 h-9 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
<span class="material-symbols-outlined text-[20px]">lightbulb</span>
</div>
<div class="flex flex-col">
<span class="font-label-md text-on-surface">Cara Negosiasi Impian &amp; Sekolah</span>
<span class="font-body-sm text-on-surface-variant">Tips bicara santai saat suasana rumah lagi adem</span>
</div>
</div>
<div class="grid grid-cols-2 gap-space-xs pt-1">
<div class="bg-surface-container-low p-2.5 rounded-lg flex flex-col gap-1">
<span class="font-label-sm text-primary flex items-center gap-1">
<span class="material-symbols-outlined text-[14px]">check_circle</span> Waktu Tepat
          </span>
<p class="font-body-sm text-on-surface">Setelah makan malam atau saat bersantai sore.</p>
</div>
<div class="bg-surface-container-low p-2.5 rounded-lg flex flex-col gap-1">
<span class="font-label-sm text-secondary flex items-center gap-1">
<span class="material-symbols-outlined text-[14px]">timer</span> Nada Suara
          </span>
<p class="font-body-sm text-on-surface">Dengarkan dulu beban mereka sebelum usulkan rencana.</p>
</div>
</div>
</div>
<!-- Interactive Script Builder -->
<div class="bg-surface-container-lowest rounded-xl p-space-md shadow-sm space-y-space-md">
<div class="flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-primary text-[22px]">forum</span>
<h3 class="font-headline-sm text-on-surface">Penyusun Kalimat Bicara</h3>
</div>
<span class="px-2.5 py-0.5 rounded-full font-label-sm bg-primary-fixed text-on-primary-fixed">Bantu Kamu Latihan</span>
</div>
<!-- Step 1: Topic -->
<div class="space-y-1.5">
<label class="font-label-md text-on-surface flex items-center gap-1.5">
<span class="w-5 h-5 rounded-full bg-primary text-on-primary font-label-sm flex items-center justify-center">1</span>
          Pilih Topik yang Ingin Disampaikan:
        </label>
<div class="bg-surface-container-low rounded-lg p-3 flex items-center justify-between">
<span class="font-body-md text-on-surface font-medium">Ingin Tetap Lulus SMA Sambil Kerja Toko</span>
<span class="material-symbols-outlined text-outline text-[20px]">check</span>
</div>
</div>
<!-- Step 2: Goal -->
<div class="space-y-1.5">
<label class="font-label-md text-on-surface flex items-center gap-1.5">
<span class="w-5 h-5 rounded-full bg-primary text-on-primary font-label-sm flex items-center justify-center">2</span>
          Tujuan / Kekhawatiran Orang Tua:
        </label>
<div class="bg-surface-container-low rounded-lg p-3 flex items-center justify-between">
<span class="font-body-md text-on-surface font-medium">Agar Orang Tua Yakin Aku Tidak Menelantarkan Rumah</span>
<span class="material-symbols-outlined text-outline text-[20px]">check</span>
</div>
</div>
<!-- Step 3: Script Output -->
<div class="space-y-2">
<label class="font-label-md text-on-surface flex items-center gap-1.5">
<span class="w-5 h-5 rounded-full bg-primary text-on-primary font-label-sm flex items-center justify-center">3</span>
          Kalimat Pembuka yang Disarankan:
        </label>
<div class="relative bg-surface-container p-space-md rounded-xl space-y-2">
<div class="flex items-center gap-2 text-primary font-label-sm">
<span class="material-symbols-outlined text-[16px]">format_quote</span>
<span class="">Gunakan nada tenang &amp; tawarkan solusi:</span>
</div>
<p class="font-body-md text-on-surface italic leading-relaxed" id="quote-script-text">
            “Ibu / Bapak, Rina paham kondisi keuangan kita lagi sulit. Tapi Rina punya rencana: Rina bisa tetap kerja 4 jam di toko sambil ambil modul fleksibel 10 menit supaya tetap punya ijazah SMA untuk karir yang lebih baik nanti. Boleh Rina jelaskan jadwalnya?”
          </p>
</div>
<!-- Action Buttons -->
<div class="flex flex-col gap-2 pt-1">
<button class="w-full min-h-[48px] py-3 px-space-md rounded-xl bg-surface-container-high text-on-surface hover:bg-surface-variant font-label-md flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-sm" id="copy-btn" onclick="copyScript()">
<span class="material-symbols-outlined text-[18px]" id="copy-icon">content_copy</span>
<span id="copy-label" class="">Salin Kalimat ke Catatan</span>
</button>
<a class="w-full min-h-[50px] py-3 px-space-md rounded-xl bg-primary text-on-primary font-label-md flex items-center justify-center gap-2 transition-transform active:scale-98 shadow-sm text-center" data-path="teman-cerita-chat" href="#">
<span class="material-symbols-outlined text-[20px]">mic</span>
<span class="">Latih Bicara dengan Kakak Pendamping</span>
</a>
</div>
</div>
</div>
<!-- WhatsApp Shareable Summary Card -->
<div class="bg-surface-container-lowest rounded-xl p-space-md shadow-sm space-y-space-sm">
<div class="flex items-center gap-space-sm">
<div class="w-10 h-10 rounded-full bg-secondary-fixed-dim/40 flex items-center justify-center text-secondary">
<span class="material-symbols-outlined text-[24px]">send_to_mobile</span>
</div>
<div class="flex flex-col min-w-0">
<span class="font-label-md text-on-surface">Undang Orang Tua Baca Ringkasan</span>
<span class="font-body-sm text-on-surface-variant">Bantu mereka paham tanpa kesan menggurui</span>
</div>
</div>
<!-- Infographic Preview Mockup -->
<div class="bg-surface-container-high rounded-xl p-space-md space-y-2">
<div class="flex items-center justify-between">
<span class="font-label-sm text-primary uppercase tracking-wider">Infografis Ringkas EduBuddy</span>
<span class="font-label-sm text-on-surface-variant">1 Menit Baca</span>
</div>
<h4 class="font-headline-sm text-on-surface">Kenapa Ijazah SMA Bikin Peluang Kerja Anak 3x Lebih Besar?</h4>
<p class="font-body-sm text-on-surface-variant">
          Didesain agar anak tetap bisa bantu mencari nafkah harian di rumah, tanpa harus mengorbankan masa depannya.
        </p>
<div class="flex items-center gap-2 pt-1 text-on-surface font-label-sm">
<span class="material-symbols-outlined text-primary text-[18px]">verified</span>
<span class="">Disiapkan oleh Konselor Pendidikan EduBuddy</span>
</div>
</div>
<button class="w-full min-h-[48px] py-3 px-space-md rounded-xl bg-primary-container text-on-primary-container font-label-md flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-sm" onclick="shareWhatsApp()">
<span class="material-symbols-outlined text-[20px]">chat</span>
<span class="">Kirim Ringkasan via WhatsApp</span>
</button>
</div>
</div>
<!-- ================= TAB 2: HATI & PIKIRAN (MENTAL & ASMARA) ================= -->
<div class="hidden flex flex-col space-y-space-md" id="tab-content-mental">
<!-- Mood Tracker Card -->
<div class="bg-surface-container-lowest rounded-xl p-space-md shadow-sm space-y-space-sm">
<div class="flex items-center justify-between">
<div>
<span class="font-label-md text-on-surface">Bagaimana Perasaanmu Hari Ini?</span>
<p class="font-body-sm text-on-surface-variant">Pilih yang paling mewakili hatimu sekarang:</p>
</div>
<span class="w-2.5 h-2.5 rounded-full bg-primary"></span>
</div>
<div class="grid grid-cols-5 gap-1.5 pt-1">
<button class="mood-btn flex flex-col items-center justify-center p-2 rounded-xl bg-surface-container hover:bg-surface-variant transition-all active:scale-95 min-h-[58px]" onclick="selectMood(this, 'Capek')">
<span class="material-symbols-outlined text-[24px]">sentiment_dissatisfied</span>
<span class="font-label-sm text-on-surface mt-1">Capek</span>
</button>
<button class="mood-btn flex flex-col items-center justify-center p-2 rounded-xl bg-surface-container hover:bg-surface-variant transition-all active:scale-95 min-h-[58px]" onclick="selectMood(this, 'Cemas')">
<span class="material-symbols-outlined text-[24px]">sentiment_very_dissatisfied</span>
<span class="font-label-sm text-on-surface mt-1">Cemas</span>
</button>
<button class="mood-btn flex flex-col items-center justify-center p-2 rounded-xl bg-surface-container hover:bg-surface-variant transition-all active:scale-95 min-h-[58px]" onclick="selectMood(this, 'Biasa')">
<span class="material-symbols-outlined text-[24px]">sentiment_neutral</span>
<span class="font-label-sm text-on-surface mt-1">Biasa</span>
</button>
<button class="mood-btn flex flex-col items-center justify-center p-2 rounded-xl bg-primary-fixed text-on-primary-fixed shadow-sm transition-all active:scale-95 min-h-[58px]" onclick="selectMood(this, 'Tenang')">
<span class="material-symbols-outlined text-[24px]">sentiment_satisfied</span>
<span class="font-label-sm mt-1">Tenang</span>
</button>
<button class="mood-btn flex flex-col items-center justify-center p-2 rounded-xl bg-surface-container hover:bg-surface-variant transition-all active:scale-95 min-h-[58px]" onclick="selectMood(this, 'Semangat')">
<span class="material-symbols-outlined text-[24px]">sentiment_very_satisfied</span>
<span class="font-label-sm text-on-surface mt-1">Ceria</span>
</button>
</div>
<div class="bg-surface-container-low p-2.5 rounded-lg text-center font-body-sm text-on-surface-variant" id="mood-feedback">
        Kamu memilih <span class="font-semibold text-primary">Tenang</span>. Bersyukur untuk hari yang damai ini ya!
      </div>
</div>
<!-- Breathing Exercise (1 Minute) -->
<div class="bg-surface-container-lowest rounded-xl p-space-md shadow-sm space-y-space-md overflow-hidden relative">
<div class="flex items-center gap-space-sm">
<div class="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
<span class="material-symbols-outlined text-[22px]">air</span>
</div>
<div>
<span class="font-label-md text-on-surface">Latihan Napas 1 Menit</span>
<p class="font-body-sm text-on-surface-variant">Redakan deg-degan saat kepala terasa penuh</p>
</div>
</div>
<div class="flex flex-col items-center justify-center py-2 space-y-3">
<!-- Visual breathing circle -->
<div class="relative w-28 h-28 flex items-center justify-center">
<div class="absolute w-24 h-24 rounded-full bg-primary-fixed-dim/30 animate-pulse flex items-center justify-center transition-all duration-1000" id="breathe-circle"></div>
<div class="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-md">
<span class="material-symbols-outlined text-[28px]">self_improvement</span>
</div>
</div>
<div class="text-center space-y-1">
<span class="font-label-lg text-primary" id="breathe-instruction">Tarik napas 4 detik...</span>
<p class="font-body-sm text-on-surface-variant max-w-[260px] mx-auto">Tahan 4 detik di dada, lalu hembuskan perlahan dari mulut.</p>
</div>
<button class="min-h-[48px] px-space-lg rounded-full bg-surface-container text-on-surface font-label-md hover:bg-surface-container-high transition-transform active:scale-95" onclick="toggleBreathingGuide(this)">
          Mulai Panduan Irama
        </button>
</div>
</div>
<!-- Relationship & Friend Boundaries Guide -->
<div class="bg-surface-container-lowest rounded-xl p-space-md shadow-sm space-y-space-sm">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-secondary text-[22px]">heart_broken</span>
<h4 class="font-label-md text-on-surface">Panduan Asmara &amp; Sahabat</h4>
</div>
<div class="bg-surface-container-low rounded-xl p-space-md space-y-2">
<span class="font-label-sm text-secondary uppercase tracking-wide">Tanya Hati</span>
<h5 class="font-headline-sm text-on-surface leading-snug">Saat Pacaran Ganggu Fokus Belajar: Kapan Harus Buat Batasan Sehat?</h5>
<p class="font-body-sm text-on-surface-variant">
          Mencintai seseorang tidak berarti harus mengorbankan impianmu lulus sekolah. Hubungan yang baik justru saling menguatkan masa depan.
        </p>
<div class="pt-2 flex flex-col gap-1.5">
<div class="flex items-start gap-2">
<span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_small</span>
<span class="font-body-sm text-on-surface">Bicarakan jam belajar tanpa saling curiga chat terlambat.</span>
</div>
<div class="flex items-start gap-2">
<span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_small</span>
<span class="font-body-sm text-on-surface">Ingat: Kamu berhak punya waktu untuk diri sendiri dan keluarga.</span>
</div>
</div>
</div>
</div>
<!-- Counselor Appointment CTA -->
<div class="bg-tertiary-fixed rounded-xl p-space-md shadow-sm space-y-space-sm text-on-tertiary-fixed">
<div class="flex items-center gap-space-sm">
<div class="w-12 h-12 rounded-full bg-surface-container-lowest flex items-center justify-center shrink-0 shadow-sm text-tertiary">
<span class="material-symbols-outlined text-[28px]">support_agent</span>
</div>
<div class="flex flex-col min-w-0">
<span class="font-label-md text-on-tertiary-fixed">Konsultasi Ramah &amp; Gratis</span>
<span class="font-body-sm text-on-tertiary-fixed/80">Dengan Bu Ani (Konselor Ramah Anak)</span>
</div>
</div>
<p class="font-body-sm text-on-tertiary-fixed/90 leading-relaxed">
        Punya beban yang sulit diceritakan ke orang tua atau teman? Bu Ani siap mendengar lewat pesan suara atau teks tanpa menghakimi.
      </p>
<button class="w-full min-h-[50px] py-3 px-space-md rounded-xl bg-tertiary text-on-tertiary font-label-md flex items-center justify-center gap-2 transition-transform active:scale-98 shadow-sm" onclick="scheduleCounseling()">
<span class="material-symbols-outlined text-[20px]">calendar_month</span>
<span class="">Jadwalkan Ngobrol dengan Bu Ani</span>
</button>
</div>
</div>
<!-- Notification Toast Modal (Hidden by Default) -->
<div class="fixed bottom-24 inset-x-margin bg-inverse-surface text-inverse-on-surface px-space-md py-3 rounded-xl shadow-xl flex items-center justify-between transition-all duration-300 opacity-0 pointer-events-none translate-y-4 z-50" id="toast-notif">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-primary-fixed text-[20px]">done</span>
<span class="font-body-sm" id="toast-text">Berhasil disalin!</span>
</div>
<button class="text-inverse-on-surface/70 hover:text-inverse-on-surface font-label-sm" onclick="dismissToast()">Tutup</button>
</div>
</div>`;
