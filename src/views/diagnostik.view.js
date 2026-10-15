// EduBuddy View: Diagnostik
// Multi-line formatted template for readability and maintainability

export const diagnostikView = /* html */ `<div class="flex flex-col w-full pb-8">
<!-- Encouraging Status Banner -->
<div class="bg-surface-container-low rounded-xl p-space-md shadow-sm mb-space-md">
<div class="flex items-start gap-space-sm">
<div class="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-on-primary-fixed text-[26px]" style="font-variation-settings: 'FILL' 1;">explore</span>
</div>
<div class="flex flex-col min-w-0">
<div class="flex items-center gap-space-xs flex-wrap">
<span class="font-label-sm text-primary uppercase tracking-wide">Hasil Refleksi Diri</span>
<span class="inline-flex items-center px-2 py-0.5 rounded-full bg-primary-fixed/40 text-on-primary-fixed text-label-sm font-label-sm">8/8 Terisi</span>
</div>
<h2 class="font-headline-sm text-on-surface mt-0.5">Peta Langkah &amp; Kondisimu</h2>
<p class="font-body-sm text-on-surface-variant mt-1 leading-relaxed">
          Tidak ada nilai jelek atau hukuman di sini. Ini bukan rapot, melainkan kompas pelindung agar kamu bisa terus melangkah sesuai kapasitasmu saat ini.
        </p>
</div>
</div>
</div>
<!-- Warm Peer Mentor Reassurance Card -->
<div class="relative overflow-hidden rounded-xl bg-tertiary-fixed/30 p-space-md mb-space-md shadow-sm">
<div class="flex items-center gap-space-sm">
<img class="w-12 h-12 rounded-full object-cover shrink-0" data-alt="A friendly Indonesian young adult mentor smiling warmly in natural daylight, wearing a cozy casual green cardigan, conveying empathy and trust, soft background illustration of growing green sprouts." src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCI+PHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjU5RTBCIi8+PGNpcmNsZSBjeD0iMzIiIGN5PSIyNSIgcj0iMTEiIGZpbGw9IiNmZmYiIG9wYWNpdHk9Ii45Ii8+PHBhdGggZD0iTTEwIDY0YzItMTUgMTItMjIgMjItMjJzMjAgNyAyMiAyMnoiIGZpbGw9IiNmZmYiIG9wYWNpdHk9Ii45Ii8+PC9zdmc+">
<div class="flex flex-col min-w-0">
<span class="font-label-sm text-tertiary">Pesan Hangat Kakak Pendamping</span>
<p class="font-body-sm text-on-surface italic mt-0.5">
          "Hebat sudah jujur sama diri sendiri. Apapun situasimu sekarang, kita cari celah bareng-bareng ya!"
        </p>
</div>
</div>
</div>
<!-- Visual Risk Breakdown & Radar Diagram -->
<div class="bg-surface-container-lowest rounded-xl p-space-md shadow-sm mb-space-md">
<div class="flex items-center justify-between mb-space-sm">
<div>
<h3 class="font-headline-sm text-on-surface">Peta Tekanan yang Kamu Hadapi</h3>
<p class="font-body-sm text-on-surface-variant">Beban terbesar teridentifikasi pada faktor ekonomi keluarga.</p>
</div>
<button class="px-3 py-1.5 rounded-full bg-surface-container text-on-surface font-label-sm flex items-center gap-1 active:scale-95 transition-all" id="toggleGraphBtn">
<span class="material-symbols-outlined text-[18px]">auto_graph</span>
<span class="">Grafik</span>
</button>
</div>
<!-- Interactive Visual Radar Chart Representation -->
<div class="flex flex-col items-center justify-center py-space-sm bg-surface-container-low/50 rounded-xl mb-space-md">
<div class="relative w-64 h-64 flex items-center justify-center">
<!-- SVG Radar Mesh & Polygon -->
<svg class="w-full h-full overflow-visible" viewBox="0 0 200 200">
<!-- Concentric Hexagon Backgrounds -->
<polygon fill="none" points="100,20 169.3,60 169.3,140 100,180 30.7,140 30.7,60" stroke="#dae2fd" stroke-width="1"></polygon>
<polygon fill="none" points="100,44 148.5,72 148.5,128 100,156 51.5,128 51.5,72" stroke="#dae2fd" stroke-width="1"></polygon>
<polygon fill="none" points="100,68 127.7,84 127.7,116 100,132 72.3,116 72.3,84" stroke="#dae2fd" stroke-width="1"></polygon>
<!-- Axis lines -->
<line stroke="#dae2fd" stroke-dasharray="2 2" stroke-width="1" x1="100" x2="100" y1="100" y2="20"></line>
<line stroke="#dae2fd" stroke-dasharray="2 2" stroke-width="1" x1="100" x2="169.3" y1="100" y2="60"></line>
<line stroke="#dae2fd" stroke-dasharray="2 2" stroke-width="1" x1="100" x2="169.3" y1="100" y2="140"></line>
<line stroke="#dae2fd" stroke-dasharray="2 2" stroke-width="1" x1="100" x2="100" y1="100" y2="180"></line>
<line stroke="#dae2fd" stroke-dasharray="2 2" stroke-width="1" x1="100" x2="30.7" y1="100" y2="140"></line>
<line stroke="#dae2fd" stroke-dasharray="2 2" stroke-width="1" x1="100" x2="30.7" y1="100" y2="60"></line>
<!-- Filled Stress Area (Points corresponding to: Finansial 82%, Waktu 65%, Relevansi 58%, Mental 40%, Keluarga 35%, Bullying 20%) -->
<polygon fill="rgba(254, 166, 25, 0.25)" points="100,34.4 145.0,74 140.2,123.2 100,132 75.7,114 86.1,92" stroke="#fea619" stroke-linejoin="round" stroke-width="2.5"></polygon>
<!-- Point Markers -->
<circle cx="100" cy="34.4" fill="#855300" r="4"></circle>
<circle cx="145.0" cy="74" fill="#fea619" r="3.5"></circle>
<circle cx="140.2" cy="123.2" fill="#fea619" r="3.5"></circle>
<circle cx="100" cy="132" fill="#10b981" r="3.5"></circle>
<circle cx="75.7" cy="114" fill="#10b981" r="3.5"></circle>
<circle cx="86.1" cy="92" fill="#10b981" r="3.5"></circle>
</svg>
<!-- Dynamic Labels positioned around the radar -->
<span class="absolute top-0 font-label-sm text-secondary bg-surface-container-lowest px-2 py-0.5 rounded-full shadow-sm text-center">Ekonomi (82%)</span>
<span class="absolute right-0 top-16 font-label-sm text-on-surface-variant bg-surface-container-lowest px-1.5 py-0.5 rounded-full text-center">Waktu (65%)</span>
<span class="absolute right-0 bottom-12 font-label-sm text-on-surface-variant bg-surface-container-lowest px-1.5 py-0.5 rounded-full text-center">Relevansi (58%)</span>
<span class="absolute bottom-0 font-label-sm text-primary bg-surface-container-lowest px-1.5 py-0.5 rounded-full text-center">Mental (40%)</span>
<span class="absolute left-0 bottom-12 font-label-sm text-primary bg-surface-container-lowest px-1.5 py-0.5 rounded-full text-center">Keluarga (35%)</span>
<span class="absolute left-0 top-16 font-label-sm text-primary bg-surface-container-lowest px-1.5 py-0.5 rounded-full text-center">Sosial (20%)</span>
</div>
<p class="font-label-sm text-on-surface-variant text-center mt-2">Diagram jaring menunjukkan area yang menyita paling banyak energimu saat ini.</p>
</div>
<!-- Category Multi-Bar Details with Empathetic Chips -->
<div class="flex flex-col gap-space-sm">
<!-- 1. Ekonomi & Finansial (Highest) -->
<div class="p-3 bg-secondary-fixed/30 rounded-xl flex flex-col gap-1.5">
<div class="flex items-center justify-between">
<div class="flex items-center gap-space-xs">
<span class="material-symbols-outlined text-secondary text-[20px]">payments</span>
<span class="font-label-md text-on-secondary-fixed">Ekonomi &amp; Finansial</span>
</div>
<div class="flex items-center gap-2">
<span class="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm">Perlu Pendampingan</span>
<span class="font-headline-sm text-secondary font-bold">82%</span>
</div>
</div>
<div class="w-full bg-surface-container h-2.5 rounded-full overflow-hidden">
<div class="bg-secondary h-full rounded-full" style="width: 82%;"></div>
</div>
<span class="font-body-sm text-on-surface-variant">Tantangan membantu nafkah orang tua &amp; biaya sekolah harian.</span>
</div>
<!-- 2. Waktu & Beban Kerja -->
<div class="p-3 bg-surface-container-low rounded-xl flex flex-col gap-1.5">
<div class="flex items-center justify-between">
<div class="flex items-center gap-space-xs">
<span class="material-symbols-outlined text-on-surface-variant text-[20px]">schedule</span>
<span class="font-label-md text-on-surface">Waktu &amp; Beban Kerja</span>
</div>
<div class="flex items-center gap-2">
<span class="px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm">Cukup Padat</span>
<span class="font-label-lg text-on-surface font-bold">65%</span>
</div>
</div>
<div class="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
<div class="bg-secondary-container h-full rounded-full" style="width: 65%;"></div>
</div>
</div>
<!-- 3. Relevansi Pelajaran -->
<div class="p-3 bg-surface-container-low rounded-xl flex flex-col gap-1.5">
<div class="flex items-center justify-between">
<div class="flex items-center gap-space-xs">
<span class="material-symbols-outlined text-on-surface-variant text-[20px]">menu_book</span>
<span class="font-label-md text-on-surface">Relevansi Pelajaran</span>
</div>
<div class="flex items-center gap-2">
<span class="px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm">Perlu Penyesuaian</span>
<span class="font-label-lg text-on-surface font-bold">58%</span>
</div>
</div>
<div class="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
<div class="bg-secondary-container/80 h-full rounded-full" style="width: 58%;"></div>
</div>
</div>
<!-- 4. Mental & Asmara -->
<div class="p-3 bg-surface-container-low rounded-xl flex flex-col gap-1.5">
<div class="flex items-center justify-between">
<div class="flex items-center gap-space-xs">
<span class="material-symbols-outlined text-on-surface-variant text-[20px]">favorite</span>
<span class="font-label-md text-on-surface">Kondisi Mental &amp; Asmara</span>
</div>
<div class="flex items-center gap-2">
<span class="px-2 py-0.5 rounded-full bg-primary-fixed/50 text-on-primary-fixed font-label-sm">Relatif Stabil</span>
<span class="font-label-lg text-on-surface font-bold">40%</span>
</div>
</div>
<div class="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
<div class="bg-primary-container h-full rounded-full" style="width: 40%;"></div>
</div>
</div>
<!-- 5. Keluarga -->
<div class="p-3 bg-surface-container-low rounded-xl flex flex-col gap-1.5">
<div class="flex items-center justify-between">
<div class="flex items-center gap-space-xs">
<span class="material-symbols-outlined text-on-surface-variant text-[20px]">home_health</span>
<span class="font-label-md text-on-surface">Hubungan Keluarga</span>
</div>
<div class="flex items-center gap-2">
<span class="px-2 py-0.5 rounded-full bg-primary-fixed/50 text-on-primary-fixed font-label-sm">Aman</span>
<span class="font-label-lg text-on-surface font-bold">35%</span>
</div>
</div>
<div class="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
<div class="bg-primary-container h-full rounded-full" style="width: 35%;"></div>
</div>
</div>
<!-- 6. Sosial & Bullying -->
<div class="p-3 bg-surface-container-low rounded-xl flex flex-col gap-1.5">
<div class="flex items-center justify-between">
<div class="flex items-center gap-space-xs">
<span class="material-symbols-outlined text-on-surface-variant text-[20px]">group</span>
<span class="font-label-md text-on-surface">Sosial &amp; Lingkungan</span>
</div>
<div class="flex items-center gap-2">
<span class="px-2 py-0.5 rounded-full bg-primary-fixed/50 text-on-primary-fixed font-label-sm">Sangat Aman</span>
<span class="font-label-lg text-on-surface font-bold">20%</span>
</div>
</div>
<div class="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
<div class="bg-primary-container h-full rounded-full" style="width: 20%;"></div>
</div>
</div>
</div>
</div>
<!-- Primary Recommendation Card (Prominent Mapped to Highest Risk: Ekonomi) -->
<div class="bg-surface-container-lowest rounded-xl p-space-md shadow-md mb-space-md bg-gradient-to-b from-secondary-fixed/20 to-surface-container-lowest">
<div class="flex items-center justify-between mb-space-sm">
<div class="flex items-center gap-2">
<div class="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed shrink-0">
<span class="material-symbols-outlined text-[18px]">payments</span>
</div>
<span class="px-2.5 py-1 rounded-full bg-secondary text-on-secondary font-label-sm">Rekomendasi Utama #1</span>
</div>
<span class="material-symbols-outlined text-primary text-[28px]" style="font-variation-settings: 'FILL' 1;">stars</span>
</div>
<h3 class="font-headline-sm text-on-surface">Jadwal Belajar Fleksibel + Akses Beasiswa Mikro</h3>
<div class="mt-space-xs mb-space-md">
<p class="font-body-md text-on-surface-variant leading-relaxed">Karena kamu juga bantu orang tua cari nafkah, kamu tidak perlu belajar 2 jam nonstop. Cukup 10 menit mikro-modul dan ajukan subsidi kuota/SPP EduBuddy.</p>
</div>
<!-- Micro Highlights -->
<div class="grid grid-cols-2 gap-space-xs mb-space-md">
<div class="bg-surface-container-low p-2.5 rounded-xl flex items-center gap-2">
<span class="material-symbols-outlined text-primary text-[20px]">timer</span>
<div class="flex flex-col">
<span class="font-label-sm text-on-surface-variant">Durasi Belajar</span>
<span class="font-label-md text-on-surface font-bold">10 Menit/Hari</span>
</div>
</div>
<div class="bg-surface-container-low p-2.5 rounded-xl flex items-center gap-2">
<span class="material-symbols-outlined text-secondary text-[20px]">savings</span>
<div class="flex flex-col">
<span class="font-label-sm text-on-surface-variant">Bantuan Kuota</span>
<span class="font-label-md text-on-surface font-bold">Tersedia 100%</span>
</div>
</div>
</div>
<!-- Primary Action Button -->
<a class="w-full min-h-[52px] bg-primary text-on-primary font-label-lg rounded-xl flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-all" data-path="solusi-ekonomi" href="#">
<span class="">Buka Solusi Fleksibel &amp; Bantuan Sekarang</span>
<span class="material-symbols-outlined text-[20px]">arrow_forward</span>
</a>
</div>
<!-- Secondary Recommendations Section -->
<div class="flex flex-col gap-space-sm mb-space-md">
<div class="flex items-center justify-between px-1">
<h3 class="font-headline-sm text-on-surface">Langkah Penyesuaian Lainnya</h3>
<span class="font-label-sm text-primary font-bold">2 Pilihan</span>
</div>
<!-- Card A: Waktu & Beban Kerja -->
<div class="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm">
<div class="flex items-start justify-between gap-space-sm">
<div class="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-on-surface-variant text-[22px]">coffee</span>
</div>
<div class="flex-1 min-w-0">
<span class="font-label-sm text-secondary">Faktor Waktu (65%)</span>
<h4 class="font-label-lg text-on-surface mt-0.5">Mode 5 Menit di Jam Istirahat Kerja</h4>
<p class="font-body-sm text-on-surface-variant mt-1">
            Penyesuaian jam belajar pintar agar materi audio dan kartu rangkum tidak pernah bentrok dengan jam shift kerja harianmu.
          </p>
</div>
</div>
<div class="flex items-center justify-end">
<a class="min-h-[48px] px-space-md bg-surface-container-low hover:bg-surface-container text-primary font-label-md rounded-xl flex items-center gap-1 active:scale-95 transition-all" data-path="atur-jadwal" href="#">
<span class="material-symbols-outlined text-[18px]">calendar_month</span>
<span class="">Atur Jadwal</span>
</a>
</div>
</div>
<!-- Card B: Relevansi Pelajaran -->
<div class="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm">
<div class="flex items-start justify-between gap-space-sm">
<div class="w-10 h-10 rounded-xl bg-primary-fixed/40 flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-primary text-[22px]">storefront</span>
</div>
<div class="flex-1 min-w-0">
<span class="font-label-sm text-on-primary-fixed-variant">Relevansi Materi (58%)</span>
<h4 class="font-label-lg text-on-surface mt-0.5">Belajar Matematika untuk Usaha Kecil</h4>
<p class="font-body-sm text-on-surface-variant mt-1">
            Ganti rumus teoritis rumit dengan hitungan praktis margin warung, kas harian, dan pencatatan untung-rugi nyata.
          </p>
</div>
</div>
<div class="flex items-center justify-end">
<a class="min-h-[48px] px-space-md bg-surface-container-low hover:bg-surface-container text-primary font-label-md rounded-xl flex items-center gap-1 active:scale-95 transition-all" data-path="belajar-praktis" href="#">
<span class="material-symbols-outlined text-[18px]">local_library</span>
<span class="">Lihat Modul</span>
</a>
</div>
</div>
</div>
<!-- Ruang Teduh Reassurance Module -->
<div class="rounded-xl p-space-md bg-gradient-to-br from-tertiary-fixed/30 to-surface-container-low shadow-sm mb-space-md">
<div class="flex items-center gap-space-sm">
<div class="w-12 h-12 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-[24px]">support_agent</span>
</div>
<div class="flex-1 min-w-0">
<h4 class="font-label-lg text-on-surface">Masih ragu atau ada yang bikin cemas?</h4>
<p class="font-body-sm text-on-surface-variant mt-0.5">
          Kamu bisa obrolin santai bareng Kakak Relawan tanpa nama. Bebas cerita tanpa dinilai.
        </p>
</div>
</div>
<div class="mt-space-md">
<a class="w-full min-h-[48px] bg-tertiary-fixed text-on-tertiary-fixed font-label-md rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all" data-path="teman-cerita-chat" href="#">
<span class="material-symbols-outlined text-[20px]">chat</span>
<span class="">Ngobrol Sama Kakak Pendamping</span>
</a>
</div>
</div>
<!-- Re-take Disclaimer / Refresh Note -->
<div class="flex flex-col items-center justify-center text-center p-space-md bg-surface-container-low rounded-xl">
<div class="flex items-center gap-1.5 text-on-surface-variant mb-1">
<span class="material-symbols-outlined text-[18px]">event_repeat</span>
<span class="font-label-md text-on-surface">Ingin mengulang tes kapan saja?</span>
</div>
<p class="font-body-sm text-on-surface-variant max-w-xs">
      Kondisi hidupmu bisa berubah sewaktu-waktu. Tes dapat diperbarui setiap bulan atau kapanpun kamu merasa ritmemu berganti.
    </p>
<button class="mt-space-sm px-4 py-2 text-primary font-label-md rounded-full bg-surface-container hover:bg-surface-container-high transition-colors active:scale-95" id="retakeModalTrigger">
      Simpan Hasil &amp; Kembali ke Beranda
    </button>
</div>
</div>
`;
