// EduBuddy View: Chat
// Multi-line formatted template for readability and maintainability

export const chatView = /* html */ `
<div class="flex flex-col gap-3">
  <!-- Counselor Status Header -->
  <div class="bg-surface-container-lowest rounded-[20px] p-4 shadow-sm flex items-center gap-3">
    <img
      src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCI+PHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjOEI1Q0Y2Ii8+PGNpcmNsZSBjeD0iMzIiIGN5PSIyNSIgcj0iMTEiIGZpbGw9IiNmZmYiIG9wYWNpdHk9Ii45Ii8+PHBhdGggZD0iTTEwIDY0YzItMTUgMTItMjIgMjItMjJzMjAgNyAyMiAyMnoiIGZpbGw9IiNmZmYiIG9wYWNpdHk9Ii45Ii8+PC9zdmc+"
      class="w-12 h-12 rounded-full"
      alt="Bu Ani K."
    >
    <div>
      <h2 class="font-label-lg font-bold">Bu Ani K.</h2>
      <p class="text-body-sm text-primary">● Online • Konselor</p>
    </div>
  </div>

  <!-- Messages Container -->
  <div id="chatBox" class="flex flex-col gap-2 min-h-[40vh]">
    <div class="self-start max-w-[80%] bg-surface-container-lowest rounded-2xl rounded-tl-sm p-3 shadow-sm text-body-md">
      Halo Rina, aku di sini untuk mendengarkan. Mau cerita apa hari ini?
    </div>
  </div>

  <!-- Quick Reply Chips -->
  <div class="flex flex-wrap gap-2">
    <button class="qr px-3 h-9 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-label-md">
      Aku dibully
    </button>
    <button class="qr px-3 h-9 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-label-md">
      Capek belajar
    </button>
    <button class="qr px-3 h-9 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-label-md">
      Masalah teman/asmara
    </button>
  </div>

  <!-- Input and Send Controls -->
  <div class="flex gap-2">
    <input
      id="chatIn"
      placeholder="Tulis pesan..."
      class="flex-1 h-12 rounded-full px-4 bg-surface-container-lowest border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary"
    >
    <button
      id="chatSend"
      aria-label="Kirim Pesan"
      class="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center"
    >
      <span class="material-symbols-outlined">send</span>
    </button>
  </div>
</div>
`;
