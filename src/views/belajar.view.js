// EduBuddy View: Belajar
// Multi-line formatted template for readability and maintainability

export const belajarView = /* html */ `<div class="flex flex-col w-full">
<!-- Visual Header / Motivation Intro -->
<div class="flex flex-col gap-space-xs mb-space-md">
<div class="flex items-center gap-space-xs">
<span class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary-fixed text-primary">
        <span class="material-symbols-outlined text-[16px]">school</span>
      </span>
<span class="font-label-sm text-primary uppercase tracking-wider">Jembatan Masa Depan</span>
</div>
<h2 class="font-headline-md text-on-surface">Materi Tepat Guna: Jembatan Ilmu → Dunia Nyata</h2>
<p class="font-body-md text-on-surface-variant leading-relaxed">
      Buktikan materi sekolah langsung bisa kamu pakai cari penghasilan dan skill nyata. Nggak ada ilmu yang sia-sia!
    </p>
</div>
<!-- Interactive Explainer Banner ('Kenapa Aku Belajar Ini?') -->
<div class="bg-surface-container-low rounded-2xl p-space-md shadow-sm mb-space-md transition-all">
<button aria-expanded="false" class="w-full flex items-center justify-between text-left group min-h-[48px] focus:outline-none" id="explainerToggle" onclick="toggleExplainer()">
<div class="flex items-center gap-space-sm min-w-0">
<div class="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center shrink-0 text-on-secondary-fixed">
<span class="material-symbols-outlined text-[22px]">psychology_alt</span>
</div>
<div class="min-w-0">
<h3 class="font-headline-sm text-on-surface flex items-center gap-1.5">
            Kenapa Aku Belajar Ini?
          </h3>
<p class="font-body-sm text-on-surface-variant truncate">Sentuh untuk lihat rahasia praktisnya</p>
</div>
</div>
<span class="material-symbols-outlined text-primary text-[24px] transition-transform duration-200" id="explainerIcon">
        expand_more
      </span>
</button>
<div class="hidden pt-space-sm mt-space-xs border-t-0" id="explainerContent">
<div class="p-space-sm bg-surface rounded-xl flex items-start gap-space-sm shadow-sm">
<span class="material-symbols-outlined text-primary text-[22px] shrink-0 mt-0.5">lightbulb</span>
<p class="font-body-sm text-on-surface leading-relaxed">
          Rumus matematika bukan sekadar buat lewatin ujian semester. Ini rahasia biar <strong class="text-primary">warung kopimu nggak tekor</strong>, modal putar aman, dan kamu tahu persis kapan kamu untung bersih!
        </p>
</div>
</div>
</div>
<!-- Filter Chips Bar (Horizontal Scrollable) -->
<div class="flex items-center gap-space-xs overflow-x-auto pb-space-xs mb-space-md no-scrollbar -mx-margin px-margin">
<button class="filter-chip active-chip px-space-md py-space-xs min-h-[48px] rounded-full font-label-md bg-primary text-on-primary shrink-0 transition-transform active:scale-95 flex items-center justify-center shadow-sm" onclick="filterModules('all', this)">
      Semua (12)
    </button>
<button class="filter-chip px-space-md py-space-xs min-h-[48px] rounded-full font-label-md bg-surface-container text-on-surface-variant shrink-0 transition-transform active:scale-95 flex items-center justify-center" onclick="filterModules('uang', this)">
      Uang &amp; Usaha (4)
    </button>
<button class="filter-chip px-space-md py-space-xs min-h-[48px] rounded-full font-label-md bg-surface-container text-on-surface-variant shrink-0 transition-transform active:scale-95 flex items-center justify-center" onclick="filterModules('karir', this)">
      Kerja &amp; Karir (5)
    </button>
<button class="filter-chip px-space-md py-space-xs min-h-[48px] rounded-full font-label-md bg-surface-container text-on-surface-variant shrink-0 transition-transform active:scale-95 flex items-center justify-center" onclick="filterModules('digital', this)">
      Digital &amp; Konten (3)
    </button>
</div>
<!-- Bridge Cards List -->
<div class="flex flex-col gap-space-md">
<!-- Card 1: Matematika -> Dapur Finansial -->
<div class="module-card group bg-surface-container-lowest rounded-2xl p-space-md shadow-sm transition-all hover:shadow-md flex flex-col gap-space-sm" data-category="uang">
<!-- Subject Badge & Bridge Route -->
<div class="flex items-center justify-between gap-space-xs">
<div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm">
<span class="material-symbols-outlined text-[16px] text-primary">functions</span>
<span class="">Matematika</span>
</div>
<span class="material-symbols-outlined text-outline-variant text-[18px]">arrow_forward</span>
<div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm font-bold">
<span class="material-symbols-outlined text-[16px]">point_of_sale</span>
<span class="">Dapur Finansial</span>
</div>
</div>
<!-- Skill Title & Real World Income Tag -->
<div class="flex flex-col gap-1 mt-1">
<h3 class="font-headline-sm text-on-surface">Untung-Rugi &amp; Margin Usaha Warung</h3>
<p class="font-body-sm text-on-surface-variant">
          Kuasai cara menghitung modal porsi jualan, Margin HPP makanan, dan pembukuan sederhana lewat HP.
        </p>
</div>
<!-- Micro Badges -->
<div class="flex flex-wrap items-center gap-space-xs mt-1">
<div class="flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm">
<span class="material-symbols-outlined text-[15px]">timer</span>
<span class="">8 Menit</span>
</div>
<div class="flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm font-bold">
<span class="material-symbols-outlined text-[15px]">payments</span>
<span class="">Potensi: Rp 200rb - 500rb/bln</span>
</div>
</div>
<!-- Visual Context Placeholder -->
<div class="w-full h-32 rounded-xl overflow-hidden mt-1 bg-surface-container">
<img alt="Belajar hitung modal" class="w-full h-full object-cover" data-alt="A warm daylight photo of an Indonesian teenager sitting in a lively local food kiosk or warung, holding a notebook and a smartphone with a clean profit calculation sheet, smiling proudly. Modern soft lighting, natural emerald and warm yellow tones, authentic community vibe." src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCI+PHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjMEVBNUU5Ii8+PGNpcmNsZSBjeD0iMzIiIGN5PSIyNSIgcj0iMTEiIGZpbGw9IiNmZmYiIG9wYWNpdHk9Ii45Ii8+PHBhdGggZD0iTTEwIDY0YzItMTUgMTItMjIgMjItMjJzMjAgNyAyMiAyMnoiIGZpbGw9IiNmZmYiIG9wYWNpdHk9Ii45Ii8+PC9zdmc+">
</div>
<!-- Progress Section -->
<div class="flex flex-col gap-1 mt-2">
<div class="flex justify-between items-center font-label-sm">
<span class="text-on-surface-variant">Modul 3 dari 4</span>
<span class="text-primary font-bold">65% Berjalan</span>
</div>
<div class="w-full h-2 rounded-full bg-surface-container overflow-hidden">
<div class="h-full bg-primary-container rounded-full" style="width: 65%;"></div>
</div>
</div>
<!-- Action Buttons -->
<div class="flex items-center gap-space-xs pt-space-xs mt-1">
<button class="flex-1 min-h-[48px] bg-primary text-on-primary rounded-xl font-label-md flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-transform" onclick="lesson('Untung-Rugi Usaha')">
<span class="material-symbols-outlined text-[20px]">play_arrow</span>
<span class="">Lanjut Belajar (8 mnt)</span>
</button>
<button class="min-h-[48px] px-3.5 bg-surface-container text-on-surface-variant rounded-xl font-label-sm flex items-center justify-center gap-1 active:bg-surface-container-high transition-colors" onclick="openReasonModal('Matematika', 'Biar tokomu untung betulan bukan cuma kelihatan ramai omzet!')" title="Alasan modul ini penting">
<span class="material-symbols-outlined text-[18px]">help_outline</span>
<span class="">Kenapa Perlu?</span>
</button>
</div>
</div>
<!-- Card 2: Bahasa Indonesia & Inggris -> Content & Freelance -->
<div class="module-card group bg-surface-container-lowest rounded-2xl p-space-md shadow-sm transition-all hover:shadow-md flex flex-col gap-space-sm" data-category="karir">
<div class="flex items-center justify-between gap-space-xs">
<div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm">
<span class="material-symbols-outlined text-[16px] text-tertiary">translate</span>
<span class="">B. Indo &amp; Inggris</span>
</div>
<span class="material-symbols-outlined text-outline-variant text-[18px]">arrow_forward</span>
<div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-sm font-bold">
<span class="material-symbols-outlined text-[16px]">edit_note</span>
<span class="">Freelance Writing</span>
</div>
</div>
<div class="flex flex-col gap-1 mt-1">
<h3 class="font-headline-sm text-on-surface">Penulis Caption &amp; Pembuat Konten</h3>
<p class="font-body-sm text-on-surface-variant">
          Trik menyusun caption medsos yang bikin penasaran, copywriting katalog toko online, dan email penawaran sopan.
        </p>
</div>
<div class="flex flex-wrap items-center gap-space-xs mt-1">
<div class="flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm">
<span class="material-symbols-outlined text-[15px]">timer</span>
<span class="">10 Menit</span>
</div>
<div class="flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm font-bold">
<span class="material-symbols-outlined text-[15px]">payments</span>
<span class="">Rp 50.000 / artikel pemula</span>
</div>
</div>
<div class="w-full h-32 rounded-xl overflow-hidden mt-1 bg-surface-container">
<img alt="Belajar copywriting" class="w-full h-full object-cover" data-alt="A young creative Indonesian student writing drafts on a laptop in a cozy warm cafe setting with soft natural window sunlight, creative journal beside them with hand-drawn social media content plans. Uplifting, clean modern aesthetic." src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCI+PHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjMTBCOTgxIi8+PGNpcmNsZSBjeD0iMzIiIGN5PSIyNSIgcj0iMTEiIGZpbGw9IiNmZmYiIG9wYWNpdHk9Ii45Ii8+PHBhdGggZD0iTTEwIDY0YzItMTUgMTItMjIgMjItMjJzMjAgNyAyMiAyMnoiIGZpbGw9IiNmZmYiIG9wYWNpdHk9Ii45Ii8+PC9zdmc+">
</div>
<div class="flex flex-col gap-1 mt-2">
<div class="flex justify-between items-center font-label-sm">
<span class="text-on-surface-variant">Modul 1 dari 5</span>
<span class="text-primary font-bold">20% Berjalan</span>
</div>
<div class="w-full h-2 rounded-full bg-surface-container overflow-hidden">
<div class="h-full bg-primary-container rounded-full" style="width: 20%;"></div>
</div>
</div>
<div class="flex items-center gap-space-xs pt-space-xs mt-1">
<button class="w-full min-h-[48px] bg-primary text-on-primary rounded-xl font-label-md flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-transform" onclick="lesson('Penulis Konten')">
<span class="material-symbols-outlined text-[20px]">rocket_launch</span>
<span class="">Mulai Mikro-Modul</span>
</button>
</div>
</div>
<!-- Card 3: Fisika & Prakarya -> Teknisi & Listrik -->
<div class="module-card group bg-surface-container-lowest rounded-2xl p-space-md shadow-sm transition-all hover:shadow-md flex flex-col gap-space-sm" data-category="karir">
<div class="flex items-center justify-between gap-space-xs">
<div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm">
<span class="material-symbols-outlined text-[16px] text-secondary">bolt</span>
<span class="">Fisika &amp; Prakarya</span>
</div>
<span class="material-symbols-outlined text-outline-variant text-[18px]">arrow_forward</span>
<div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm font-bold">
<span class="material-symbols-outlined text-[16px]">build</span>
<span class="">Teknisi &amp; Servis HP</span>
</div>
</div>
<div class="flex flex-col gap-1 mt-1">
<h3 class="font-headline-sm text-on-surface">Instalasi Listrik Rumahan &amp; Ganti Komponen</h3>
<p class="font-body-sm text-on-surface-variant">
          Paham dasar arus DC/AC untuk solder kabel putus, colokan aman, dan ganti baterai gadget tanpa rusak.
        </p>
</div>
<div class="flex flex-wrap items-center gap-space-xs mt-1">
<div class="flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm">
<span class="material-symbols-outlined text-[15px]">timer</span>
<span class="">12 Menit</span>
</div>
<div class="flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm font-bold">
<span class="material-symbols-outlined text-[15px]">payments</span>
<span class="">Jasa servis Rp 75.000 / alat</span>
</div>
</div>
<div class="flex flex-col gap-1 mt-2">
<div class="flex justify-between items-center font-label-sm">
<span class="text-on-surface-variant">Belum dimulai</span>
<span class="text-outline font-semibold">0% Siap</span>
</div>
<div class="w-full h-2 rounded-full bg-surface-container overflow-hidden">
<div class="h-full bg-outline-variant rounded-full" style="width: 0%;"></div>
</div>
</div>
<div class="flex items-center gap-space-xs pt-space-xs mt-1">
<button class="w-full min-h-[48px] bg-primary text-on-primary rounded-xl font-label-md flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-transform" onclick="lesson('Teknisi Pemula')">
<span class="material-symbols-outlined text-[20px]">play_circle</span>
<span class="">Mulai Mikro-Modul</span>
</button>
</div>
</div>
<!-- Card 4: TIK / Komputer -> Kewirausahaan Digital -->
<div class="module-card group bg-surface-container-lowest rounded-2xl p-space-md shadow-sm transition-all hover:shadow-md flex flex-col gap-space-sm" data-category="digital">
<div class="flex items-center justify-between gap-space-xs">
<div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm">
<span class="material-symbols-outlined text-[16px] text-primary">devices</span>
<span class="">TIK / Komputer</span>
</div>
<span class="material-symbols-outlined text-outline-variant text-[18px]">arrow_forward</span>
<div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm font-bold">
<span class="material-symbols-outlined text-[16px]">storefront</span>
<span class="">Admin Toko Online</span>
</div>
</div>
<div class="flex flex-col gap-1 mt-1">
<h3 class="font-headline-sm text-on-surface">Kewirausahaan Digital &amp; Admin Olshop</h3>
<p class="font-body-sm text-on-surface-variant">
          Membuat katalog WhatsApp Business, Canva cepat untuk promo, dan membalas chat pembeli dengan ramah.
        </p>
</div>
<div class="flex flex-wrap items-center gap-space-xs mt-1">
<div class="flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm">
<span class="material-symbols-outlined text-[15px]">timer</span>
<span class="">5 Menit</span>
</div>
<div class="flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm font-bold">
<span class="material-symbols-outlined text-[15px]">payments</span>
<span class="">Gaji admin part-time fleksibel</span>
</div>
</div>
<div class="flex flex-col gap-1 mt-2">
<div class="flex justify-between items-center font-label-sm">
<span class="text-primary font-bold">Selesai (100%)</span>
<span class="text-primary-container font-bold">Lulus Praktik</span>
</div>
<div class="w-full h-2 rounded-full bg-surface-container overflow-hidden">
<div class="h-full bg-primary-container rounded-full" style="width: 100%;"></div>
</div>
</div>
<div class="flex items-center gap-space-xs pt-space-xs mt-1">
<button class="w-full min-h-[48px] bg-surface-container text-on-surface rounded-xl font-label-md flex items-center justify-center gap-2 active:bg-surface-container-high transition-colors" onclick="lesson('Admin Olshop')">
<span class="material-symbols-outlined text-[20px] text-primary">replay</span>
<span class="">Ulas Kembali</span>
</button>
</div>
</div>
</div>
<!-- Bottom Reassurance / Encouraging Tip Banner -->
<div class="mt-space-lg mb-space-sm p-space-md rounded-2xl bg-surface-container-low flex items-center gap-space-sm shadow-sm">
<div class="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed shrink-0">
<span class="material-symbols-outlined text-[26px]">celebration</span>
</div>
<div class="flex flex-col min-w-0">
<span class="font-label-sm text-primary uppercase font-bold tracking-wide">Kata Kakak Pendamping</span>
<p class="font-body-md text-on-surface leading-snug">
        “Satu modul selesai = satu langkah mandiri finansial. Kamu pasti bisa!”
      </p>
</div>
</div>
<!-- Interactive Reason Dialog Modal (Client-side) -->
<div class="fixed inset-0 z-50 flex items-center justify-center p-margin bg-inverse-surface/40 backdrop-blur-sm hidden" id="reasonModal">
<div class="bg-surface-container-lowest rounded-2xl p-space-md max-w-sm w-full shadow-xl flex flex-col gap-space-sm animate-in fade-in zoom-in duration-200">
<div class="flex justify-between items-center">
<div class="flex items-center gap-1.5 text-primary">
<span class="material-symbols-outlined">lightbulb</span>
<span class="font-headline-sm text-on-surface" id="modalSubject">Kenapa Ini Penting?</span>
</div>
<button class="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-on-surface rounded-full" onclick="closeReasonModal()">
<span class="material-symbols-outlined">close</span>
</button>
</div>
<p class="font-body-md text-on-surface-variant" id="modalBody">
        Pelajaran ini langsung dipakai buat mengamankan bisnismu di lapangan.
      </p>
<div class="pt-space-xs mt-space-xs">
<button class="w-full min-h-[48px] bg-primary text-on-primary font-label-md rounded-xl shadow-sm active:scale-95 transition-transform" onclick="closeReasonModal()">
          Paham, Semangat!
        </button>
</div>
</div>
</div>
</div>`;
