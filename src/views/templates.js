// EduBuddy View Templates Registry
import { berandaView } from "./beranda.view.js";
import { diagnostikView } from "./diagnostik.view.js";
import { jadwalView } from "./jadwal.view.js";
import { belajarView } from "./belajar.view.js";
import { mediasiView } from "./mediasi.view.js";
import { amanView } from "./aman.view.js";
import { profilView } from "./profil.view.js";
import { ekonomiView } from "./ekonomi.view.js";
import { chatView } from "./chat.view.js";

export const V = {
  beranda: berandaView,
  diagnostik: diagnostikView,
  jadwal: jadwalView,
  belajar: belajarView,
  mediasi: mediasiView,
  aman: amanView,
  profil: profilView,
  ekonomi: ekonomiView,
  chat: chatView,
  booking: '<div></div>',
  riwayat: '<div></div>'
};
