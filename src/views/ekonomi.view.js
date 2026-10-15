// EduBuddy View: Ekonomi
// Multi-line formatted template for readability and maintainability

export const ekonomiView = /* html */ `
<div class="flex flex-col gap-3">
  <h2 class="font-headline-md font-bold">Bantuan Ekonomi & Beasiswa</h2>
  <p class="text-body-sm text-on-surface-variant">Pilih bantuan yang sesuai. Pengajuanmu dicek tim dalam 3–5 hari kerja.</p>

  <div class="bg-surface-container-lowest rounded-[20px] p-4 shadow-sm flex flex-col gap-2">
    <h3 class="font-label-lg font-bold">PIP (Program Indonesia Pintar)</h3>
    <p class="text-body-sm text-on-surface-variant">Bantuan tunai untuk kebutuhan sekolah.</p>
    <div class="flex items-center justify-between">
      <span class="font-bold text-primary">Rp 750.000</span>
      <button data-apply="PIP (Program Indonesia Pintar)" class="px-4 h-10 rounded-full bg-primary-container text-on-primary-container font-label-md">Ajukan</button>
    </div>
  </div>

  <div class="bg-surface-container-lowest rounded-[20px] p-4 shadow-sm flex flex-col gap-2">
    <h3 class="font-label-lg font-bold">Dana SPP & Ujian Paket C</h3>
    <p class="text-body-sm text-on-surface-variant">Membantu biaya ujian kelulusan.</p>
    <div class="flex items-center justify-between">
      <span class="font-bold text-primary">Rp 1.200.000</span>
      <button data-apply="Dana SPP & Ujian Paket C" class="px-4 h-10 rounded-full bg-primary-container text-on-primary-container font-label-md">Ajukan</button>
    </div>
  </div>

  <div class="bg-surface-container-lowest rounded-[20px] p-4 shadow-sm flex flex-col gap-2">
    <h3 class="font-label-lg font-bold">Alat Tulis & Sepatu</h3>
    <p class="text-body-sm text-on-surface-variant">Untuk siswa pekerja paruh waktu.</p>
    <div class="flex items-center justify-between">
      <span class="font-bold text-primary">Rp 350.000</span>
      <button data-apply="Alat Tulis & Sepatu" class="px-4 h-10 rounded-full bg-primary-container text-on-primary-container font-label-md">Ajukan</button>
    </div>
  </div>
</div>
`;
