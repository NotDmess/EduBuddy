// EduBuddy View: Profil
// Multi-line formatted template for readability and maintainability

export const profilView = /* html */ `
<div class="flex flex-col gap-4">
  <!-- Profile Avatar and Level Card -->
  <div class="bg-surface-container-lowest rounded-[20px] p-4 shadow-sm flex items-center gap-4">
    <img
      src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCI+PHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjMTBCOTgxIi8+PGNpcmNsZSBjeD0iMzIiIGN5PSIyNSIgcj0iMTEiIGZpbGw9IiNmZmYiIG9wYWNpdHk9Ii45Ii8+PHBhdGggZD0iTTEwIDY0YzItMTUgMTItMjIgMjItMjJzMjAgNyAyMiAyMnoiIGZpbGw9IiNmZmYiIG9wYWNpdHk9Ii45Ii8+PC9zdmc+"
      class="w-16 h-16 rounded-full ring-4 ring-primary/20"
      alt="Profile Avatar"
    >
    <div>
      <h2 class="font-headline-md font-bold">Rina</h2>
      <p class="text-body-sm text-on-surface-variant">Level Belajar 3 • Streak 4 hari</p>
    </div>
  </div>

  <!-- All Features Grid -->
  <h3 class="font-headline-sm font-bold">Semua Fitur</h3>
  <div class="grid grid-cols-2 gap-3">
    <button data-path="diagnostik" class="bg-surface-container-lowest rounded-[20px] p-4 shadow-sm text-left flex flex-col gap-2 active:scale-[.98] transition">
      <span class="w-11 h-11 rounded-full flex items-center justify-center text-primary bg-primary-fixed/60">
        <span class="material-symbols-outlined">monitor_heart</span>
      </span>
      <span class="font-label-lg font-bold">Diagnostik Risiko</span>
      <span class="text-body-sm text-on-surface-variant">Hasil & rekomendasi</span>
    </button>

    <button data-path="belajar" class="bg-surface-container-lowest rounded-[20px] p-4 shadow-sm text-left flex flex-col gap-2 active:scale-[.98] transition">
      <span class="w-11 h-11 rounded-full flex items-center justify-center text-primary bg-primary-fixed/60">
        <span class="material-symbols-outlined">local_library</span>
      </span>
      <span class="font-label-lg font-bold">Career Bridge</span>
      <span class="text-body-sm text-on-surface-variant">Materi tepat guna</span>
    </button>

    <button data-path="aman" class="bg-surface-container-lowest rounded-[20px] p-4 shadow-sm text-left flex flex-col gap-2 active:scale-[.98] transition">
      <span class="w-11 h-11 rounded-full flex items-center justify-center text-tertiary bg-tertiary-fixed">
        <span class="material-symbols-outlined">shield</span>
      </span>
      <span class="font-label-lg font-bold">Ruang Aman</span>
      <span class="text-body-sm text-on-surface-variant">Lapor bully anonim</span>
    </button>

    <button data-path="jadwal" class="bg-surface-container-lowest rounded-[20px] p-4 shadow-sm text-left flex flex-col gap-2 active:scale-[.98] transition">
      <span class="w-11 h-11 rounded-full flex items-center justify-center text-primary bg-primary-fixed/60">
        <span class="material-symbols-outlined">event_available</span>
      </span>
      <span class="font-label-lg font-bold">Jadwal Fleksibel</span>
      <span class="text-body-sm text-on-surface-variant">Belajar 5–15 menit</span>
    </button>

    <button data-path="mediasi" class="bg-surface-container-lowest rounded-[20px] p-4 shadow-sm text-left flex flex-col gap-2 active:scale-[.98] transition">
      <span class="w-11 h-11 rounded-full flex items-center justify-center text-tertiary bg-tertiary-fixed">
        <span class="material-symbols-outlined">family_restroom</span>
      </span>
      <span class="font-label-lg font-bold">Mediasi & Konseling</span>
      <span class="text-body-sm text-on-surface-variant">Orang tua, hati & pikiran</span>
    </button>

    <button data-path="ekonomi" class="bg-surface-container-lowest rounded-[20px] p-4 shadow-sm text-left flex flex-col gap-2 active:scale-[.98] transition">
      <span class="w-11 h-11 rounded-full flex items-center justify-center text-secondary bg-secondary-fixed">
        <span class="material-symbols-outlined">account_balance_wallet</span>
      </span>
      <span class="font-label-lg font-bold">Bantuan & Beasiswa</span>
      <span class="text-body-sm text-on-surface-variant">PIP, KIP, dana SPP</span>
    </button>

    <button data-path="chat" class="bg-surface-container-lowest rounded-[20px] p-4 shadow-sm text-left flex flex-col gap-2 active:scale-[.98] transition">
      <span class="w-11 h-11 rounded-full flex items-center justify-center text-tertiary bg-tertiary-fixed">
        <span class="material-symbols-outlined">forum</span>
      </span>
      <span class="font-label-lg font-bold">Teman Cerita</span>
      <span class="text-body-sm text-on-surface-variant">Chat konselor & peer buddy</span>
    </button>

    <button data-path="beranda" class="bg-surface-container-lowest rounded-[20px] p-4 shadow-sm text-left flex flex-col gap-2 active:scale-[.98] transition">
      <span class="w-11 h-11 rounded-full flex items-center justify-center text-primary bg-primary-fixed/60">
        <span class="material-symbols-outlined">home</span>
      </span>
      <span class="font-label-lg font-bold">Beranda</span>
      <span class="text-body-sm text-on-surface-variant">Ringkasan harianmu</span>
    </button>
  </div>

  <!-- Settings Section -->
  <h3 class="font-headline-sm font-bold mt-2">Pengaturan</h3>
  <div class="bg-surface-container-lowest rounded-[20px] p-4 shadow-sm !p-0 divide-y divide-surface-container">
    <button data-act="edit" class="w-full flex items-center gap-3 p-4 text-left">
      <span class="material-symbols-outlined text-primary">person</span>
      <span class="flex-1 font-label-lg">Edit Profil</span>
      <span class="material-symbols-outlined text-outline">chevron_right</span>
    </button>
    <button data-act="sw:notif" class="w-full flex items-center gap-3 p-4 text-left">
      <span class="material-symbols-outlined text-primary">notifications</span>
      <span class="flex-1 font-label-lg">Notifikasi & Pengingat</span>
      <span class="material-symbols-outlined text-outline">chevron_right</span>
    </button>
    <button data-act="sw:anon" class="w-full flex items-center gap-3 p-4 text-left">
      <span class="material-symbols-outlined text-primary">lock</span>
      <span class="flex-1 font-label-lg">Privasi & Mode Anonim</span>
      <span class="material-symbols-outlined text-outline">chevron_right</span>
    </button>
    <button data-act="ortu" class="w-full flex items-center gap-3 p-4 text-left">
      <span class="material-symbols-outlined text-primary">contact_phone</span>
      <span class="flex-1 font-label-lg">Kontak Orang Tua/Wali</span>
      <span class="material-symbols-outlined text-outline">chevron_right</span>
    </button>
    <button data-act="faq" class="w-full flex items-center gap-3 p-4 text-left">
      <span class="material-symbols-outlined text-primary">help</span>
      <span class="flex-1 font-label-lg">Bantuan & FAQ</span>
      <span class="material-symbols-outlined text-outline">chevron_right</span>
    </button>
    <button data-act="logout" class="w-full flex items-center gap-3 p-4 text-left text-error">
      <span class="material-symbols-outlined">logout</span>
      <span class="flex-1 font-label-lg">Keluar</span>
    </button>
  </div>

  <p class="text-center text-label-sm text-outline">EduBuddy v1.0 • Teman Belajar Dimanapun</p>
</div>
`;
