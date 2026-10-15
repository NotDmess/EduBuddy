// EduBuddy View: Aman
// Multi-line formatted template for readability and maintainability

export const amanView = /* html */ `<div class="flex flex-col w-full pb-10 space-y-space-lg">
<!-- Top Reassurance Banner: Ruang Aman & Bebas Tekanan -->
<div class="relative overflow-hidden bg-gradient-to-br from-tertiary-fixed via-surface-container-low to-surface-container rounded-[20px] p-space-md shadow-sm">
<div class="absolute -right-6 -bottom-6 w-32 h-32 bg-tertiary-container/30 rounded-full blur-2xl pointer-events-none"></div>
<div class="flex items-start gap-space-sm relative z-10">
<div class="w-12 h-12 rounded-full bg-surface-container-lowest shadow-sm flex items-center justify-center shrink-0 text-tertiary">
<span class="material-symbols-outlined text-[28px]" style="font-variation-settings: 'FILL' 1;">shield_with_heart</span>
</div>
<div class="flex flex-col min-w-0">
<div class="flex items-center gap-1.5 mb-1">
<span class="inline-flex items-center px-2 py-0.5 rounded-full text-label-sm bg-tertiary-fixed text-on-tertiary-fixed">
            Enkripsi 100% Privat
          </span>
<span class="inline-flex items-center text-label-sm text-primary font-bold">
<span class="w-2 h-2 rounded-full bg-primary-container mr-1 animate-pulse"></span>Terlindungi
          </span>
</div>
<h2 class="font-headline-sm text-on-surface">Identitasmu 100% Dirahasiakan</h2>
<p class="font-body-sm text-on-surface-variant mt-1 leading-relaxed">
          Sekolah, guru, teman, atau orang tua tidak akan tahu siapa yang mengirim cerita ini. Suaramu sangat berharga dan berhak didengar dengan tenang.
        </p>
</div>
</div>
</div>
<!-- Section (B): Riwayat Laporan Aktif (Tracking Micro-Card) -->
<div class="bg-surface-container-lowest rounded-[20px] p-space-md shadow-sm flex flex-col gap-space-xs">
<div class="flex items-center justify-between">
<div class="flex items-center gap-2">
<div class="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center text-primary">
<span class="material-symbols-outlined text-[18px]">verified_user</span>
</div>
<div>
<span class="font-label-sm text-outline uppercase tracking-wider block">Pelacak Laporan Aktif</span>
<span class="font-label-md text-on-surface">ID: #LA-7821</span>
</div>
</div>
<span class="px-3 py-1 rounded-full text-label-sm font-semibold bg-tertiary-fixed text-on-tertiary-fixed">
        Sedang Ditinjau
      </span>
</div>
<div class="w-full bg-surface-container-highest rounded-full h-1.5 mt-2 overflow-hidden">
<div class="bg-tertiary h-1.5 rounded-full w-2/3 transition-all duration-500"></div>
</div>
<p class="font-body-sm text-on-surface-variant mt-1">
      Konselor ramah anak sedang membaca keluh-kesahmu dengan seksama. Respon aman tersimpan di kotak privatmu.
    </p>
</div>
<!-- Section (A): Formulir Aman (Lapor Pengalaman / Kendala) -->
<div class="bg-surface-container-lowest rounded-[20px] p-space-md shadow-sm space-y-space-md">
<div class="flex items-center gap-2">
<div class="w-2.5 h-6 bg-primary-container rounded-full"></div>
<div>
<h3 class="font-headline-sm text-on-surface">Formulir Cerita Bebas Tekanan</h3>
<p class="font-body-sm text-on-surface-variant">Tuliskan pelan-pelan, tidak ada kata salah di sini.</p>
</div>
</div>
<!-- Incident Type Chips -->
<div class="space-y-space-xs">
<label class="block font-label-md text-on-surface">Apa yang sedang kamu hadapi? <span class="text-tertiary text-body-sm">(bisa pilih lebih dari satu)</span></label>
<div class="flex flex-wrap gap-2 pt-1" id="chip-container">
<button class="chip-btn px-3.5 py-2 rounded-full font-label-md bg-surface-container text-on-surface-variant active:scale-95 transition-all text-left flex items-center gap-1.5" data-val="verbal" type="button">
<span class="material-symbols-outlined text-[16px]">record_voice_over</span> Bullying Verbal
        </button>
<button class="chip-btn px-3.5 py-2 rounded-full font-label-md bg-surface-container text-on-surface-variant active:scale-95 transition-all text-left flex items-center gap-1.5" data-val="fisik" type="button">
<span class="material-symbols-outlined text-[16px]">front_hand</span> Kekerasan Fisik
        </button>
<button class="chip-btn px-3.5 py-2 rounded-full font-label-md bg-surface-container text-on-surface-variant active:scale-95 transition-all text-left flex items-center gap-1.5" data-val="cyber" type="button">
<span class="material-symbols-outlined text-[16px]">phonelink_erase</span> Cyberbullying / Chat Teror
        </button>
<button class="chip-btn px-3.5 py-2 rounded-full font-label-md bg-surface-container text-on-surface-variant active:scale-95 transition-all text-left flex items-center gap-1.5" data-val="circle" type="button">
<span class="material-symbols-outlined text-[16px]">group_off</span> Dikucilkan / Circle Toxic
        </button>
<button class="chip-btn px-3.5 py-2 rounded-full font-label-md bg-surface-container text-on-surface-variant active:scale-95 transition-all text-left flex items-center gap-1.5" data-val="pungli" type="button">
<span class="material-symbols-outlined text-[16px]">money_off</span> Pungli / Pemerasan
        </button>
</div>
</div>
<!-- Lokasi Kejadian Dropdown / Input -->
<div class="space-y-space-xs">
<label class="block font-label-md text-on-surface" for="lokasi">Lokasi atau Ranah Kejadian</label>
<div class="relative">
<span class="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px]">location_on</span>
<select class="w-full h-[50px] pl-10 pr-10 rounded-[20px] bg-surface-container-low text-on-surface font-body-md appearance-none focus:outline-none focus:bg-surface-container-lowest shadow-sm transition-all" id="lokasi">
<option value="kelas">Di Ruang Kelas / Koridor Sekolah</option>
<option value="kantin">Kantin / Toilet / Area Belakang</option>
<option value="sosmed">Media Sosial / Grup WhatsApp / Game Online</option>
<option value="jalan">Perjalanan Berangkat / Pulang Sekolah</option>
<option value="lainnya">Lainnya / Tempat Berkumpul Luar</option>
</select>
<span class="material-symbols-outlined absolute right-3.5 top-1/2 -translate-y-1/2 text-outline pointer-events-none text-[20px]">expand_more</span>
</div>
</div>
<!-- Textarea Cerita -->
<div class="space-y-space-xs">
<label class="block font-label-md text-on-surface" for="cerita">Ceritakan Singkat Pengalamanmu</label>
<div class="relative">
<textarea class="w-full p-3.5 rounded-[20px] bg-surface-container-low text-on-surface placeholder:text-outline font-body-md focus:outline-none focus:bg-surface-container-lowest transition-all shadow-sm resize-none" id="cerita" placeholder="Tulis apa saja yang membuatmu cemas atau tersakiti. Boleh curhat santai, tidak perlu bahasa formal..." rows="4"></textarea>
</div>
<p class="font-label-sm text-outline flex items-center gap-1">
<span class="material-symbols-outlined text-[14px]">lock</span>
        Ceritamu tidak akan dipublikasikan ke forum publik mana pun.
      </p>
</div>
<!-- Upload Bukti Tangkapan Layar (Opsional) -->
<div class="space-y-space-xs">
<div class="flex items-center justify-between">
<label class="block font-label-md text-on-surface">Bukti Layar / Foto <span class="text-outline font-normal">(Opsional)</span></label>
<span class="text-label-sm text-tertiary font-semibold flex items-center gap-1">
<span class="material-symbols-outlined text-[14px]">cleaning_services</span> EXIF / Metadata Dihapus
        </span>
</div>
<div class="relative rounded-[20px] p-5 text-center bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer flex flex-col items-center justify-center gap-2 group" onclick="document.getElementById('file-input').click()">
<input accept="image/*" class="hidden" id="file-input" type="file">
<div class="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
<span class="material-symbols-outlined text-[24px]">add_photo_alternate</span>
</div>
<div class="space-y-0.5">
<span class="font-label-md text-on-surface block">Pilih Tangkapan Layar / Dokumen</span>
<span class="font-body-sm text-outline block">Format JPG, PNG. Informasi GPS dan nama HP dibersihkan otomatis demi privasimu.</span>
</div>
</div>
</div>
<!-- Tingkat Keparahan (Severity Slider / Scale) -->
<div class="space-y-space-xs pt-1">
<div class="flex justify-between items-center">
<label class="font-label-md text-on-surface">Tingkat Tekanan yang Dirasakan</label>
<span class="font-label-sm px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold" id="severity-label">
          3 - Sangat Menekan
        </span>
</div>
<div class="py-2">
<input class="w-full accent-primary-container h-2 rounded-lg cursor-pointer bg-surface-container-highest" id="severity-range" max="4" min="1" type="range" value="3">
<div class="flex justify-between font-label-sm text-outline px-1 mt-1">
<span class="">Ringan</span>
<span class="">Mengganggu</span>
<span class="">Sangat Menekan</span>
<span class="text-error font-bold">Butuh Segera</span>
</div>
</div>
</div>
<!-- Toggle Switch: Kirim Secara Anonim -->
<div class="p-space-sm bg-surface-container-low rounded-[20px] flex items-center justify-between gap-space-sm">
<div class="flex items-center gap-space-xs min-w-0">
<div class="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed shrink-0">
<span class="material-symbols-outlined text-[20px]">visibility_off</span>
</div>
<div class="min-w-0">
<span class="font-label-md text-on-surface block truncate">Kirim Secara Anonim</span>
<span class="font-body-sm text-outline block truncate">Tanpa nama, kelas, maupun nomor HP</span>
</div>
</div>
<label class="relative inline-flex items-center cursor-pointer shrink-0">
<input checked="" class="sr-only peer" id="anonim-toggle" type="checkbox">
<div class="w-12 h-7 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary-container shadow-inner"></div>
</label>
</div>
<!-- CTA Button -->
<button class="w-full min-h-[52px] bg-primary-container text-on-primary-container hover:opacity-95 font-label-lg rounded-[20px] shadow-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all" id="submit-btn" type="button">
<span class="material-symbols-outlined text-[20px]">lock</span>
<span class="">Kirim Laporan dengan Aman</span>
</button>
</div>
<!-- Section (C): Butuh Ngobrol Sekarang? Teman Cerita -->
<div class="space-y-space-sm">
<div class="flex items-center justify-between px-1">
<div>
<h3 class="font-headline-sm text-on-surface">Butuh Teman Ngobrol Sekarang?</h3>
<p class="font-body-sm text-on-surface-variant">Kamu tidak harus memendam semuanya sendirian.</p>
</div>
<span class="material-symbols-outlined text-tertiary text-[24px]">support_agent</span>
</div>
<div class="grid grid-cols-1 gap-space-sm">
<!-- Opsi 1: Konselor Profesional -->
<div class="bg-surface-container-lowest rounded-[20px] p-space-md shadow-sm flex flex-col sm:flex-row gap-space-sm items-start sm:items-center justify-between">
<div class="flex items-center gap-space-sm min-w-0">
<div class="relative shrink-0">
<img class="w-14 h-14 rounded-full object-cover shadow-sm" data-alt="Portrait of Bu Ratna, a warm and empathetic Indonesian female adolescent psychologist wearing a pleasant pastel lilac hijab, smiling reassuringly in a bright, modern counseling studio with soft mint and purple accents." src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCI+PHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjOEI1Q0Y2Ii8+PGNpcmNsZSBjeD0iMzIiIGN5PSIyNSIgcj0iMTEiIGZpbGw9IiNmZmYiIG9wYWNpdHk9Ii45Ii8+PHBhdGggZD0iTTEwIDY0YzItMTUgMTItMjIgMjItMjJzMjAgNyAyMiAyMnoiIGZpbGw9IiNmZmYiIG9wYWNpdHk9Ii45Ii8+PC9zdmc+">
<span class="absolute bottom-0 right-0 w-3.5 h-3.5 bg-primary-container rounded-full ring-2 ring-white"></span>
</div>
<div class="min-w-0">
<div class="flex items-center gap-1.5">
<span class="font-label-lg text-on-surface truncate">Bu Ratna, M.Psi</span>
<span class="px-2 py-0.5 rounded-full text-label-sm bg-primary-fixed text-on-primary-fixed">Online</span>
</div>
<p class="font-body-sm text-outline truncate">Psikolog Remaja Berlisensi (SIP 440/12)</p>
<p class="font-label-sm text-tertiary mt-0.5">Pendampingan trauma &amp; mediasi sekolah</p>
</div>
</div>
<button data-path="chat" class="w-full sm:w-auto px-5 py-2.5 min-h-[48px] rounded-[20px] bg-tertiary-fixed text-on-tertiary-fixed font-label-md flex items-center justify-center gap-1.5 active:scale-95 transition-all self-end sm:self-center" type="button">
<span class="material-symbols-outlined text-[18px]">forum</span>
<span class="">Chat Konselor</span>
</button>
</div>
<!-- Opsi 2: Peer Buddy Sebaya -->
<div class="bg-surface-container-lowest rounded-[20px] p-space-md shadow-sm flex flex-col sm:flex-row gap-space-sm items-start sm:items-center justify-between">
<div class="flex items-center gap-space-sm min-w-0">
<div class="relative shrink-0">
<img class="w-14 h-14 rounded-full object-cover shadow-sm" data-alt="Portrait of Kak Dimas, a cheerful and friendly Indonesian male university student mentor wearing a comfortable sage green knit sweater, natural soft lighting, smiling warmly like a supportive older sibling." src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCI+PHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjU5RTBCIi8+PGNpcmNsZSBjeD0iMzIiIGN5PSIyNSIgcj0iMTEiIGZpbGw9IiNmZmYiIG9wYWNpdHk9Ii45Ii8+PHBhdGggZD0iTTEwIDY0YzItMTUgMTItMjIgMjItMjJzMjAgNyAyMiAyMnoiIGZpbGw9IiNmZmYiIG9wYWNpdHk9Ii45Ii8+PC9zdmc+">
<span class="absolute bottom-0 right-0 w-3.5 h-3.5 bg-primary-container rounded-full ring-2 ring-white"></span>
</div>
<div class="min-w-0">
<div class="flex items-center gap-1.5">
<span class="font-label-lg text-on-surface truncate">Kak Dimas</span>
<span class="px-2 py-0.5 rounded-full text-label-sm bg-secondary-fixed text-on-secondary-fixed">Peer Buddy</span>
</div>
<p class="font-body-sm text-outline truncate">Mahasiswa Psikologi UI &amp; Relawan</p>
<p class="font-label-sm text-secondary mt-0.5">Spesialis: Toxic circle &amp; stres belajar</p>
</div>
</div>
<button data-path="chat" class="w-full sm:w-auto px-5 py-2.5 min-h-[48px] rounded-[20px] bg-surface-container text-on-surface font-label-md flex items-center justify-center gap-1.5 active:scale-95 transition-all self-end sm:self-center" type="button">
<span class="material-symbols-outlined text-[18px]">chat</span>
<span class="">Ngobrol Santai</span>
</button>
</div>
</div>
</div>
<!-- Section (D): Subtle Emergency / Hotline Row (Rose / Error Accent) -->
<div class="bg-error-container text-on-error-container rounded-[20px] p-space-md shadow-sm space-y-space-xs">
<div class="flex items-start gap-space-xs">
<div class="w-9 h-9 rounded-full bg-error text-on-error flex items-center justify-center shrink-0 shadow-sm">
<span class="material-symbols-outlined text-[20px]">night_sight_auto_off</span>
</div>
<div>
<h4 class="font-label-lg text-on-error-container">Dalam Bahaya Fisik Nyata atau Ancaman Darurat?</h4>
<p class="font-body-sm text-on-error-container/90 mt-0.5 leading-relaxed">
          Jangan ragu. Jika kamu sedang dalam situasi berbahaya langsung, segera hubungi Layanan Sahabat Perempuan &amp; Anak (SAPA 129) bebas pulsa.
        </p>
</div>
</div>
<div class="pt-2 flex flex-col sm:flex-row gap-2">
<a class="w-full min-h-[48px] bg-error text-on-error font-label-md rounded-[20px] flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-all" href="tel:129">
<span class="material-symbols-outlined text-[18px]">phone_in_talk</span>
<span class="">Telepon Hotline SAPA 129 (Gratis)</span>
</a>
<a class="w-full sm:w-auto px-4 min-h-[48px] bg-white text-error font-label-md rounded-[20px] flex items-center justify-center gap-1.5 shadow-sm active:scale-98 transition-all" href="https://wa.me/628111129129">
<span class="material-symbols-outlined text-[18px]">chat_bubble</span>
<span class="">WhatsApp 08111-129-129</span>
</a>
</div>
</div>
</div>`;
