const pptxgen = require("pptxgenjs");
const C = {
  navy: "13233F", teal: "13A89E", tealDark: "0C7368", coral: "C76B4A", coralDark: "9A4E32",
  white: "FFFFFF", cardLight: "F3F5F9", navyText: "13233F", body: "414E5E", mute: "8A95A5", hair: "DCE2EA",
};
const F = { h: "Calibri", b: "Calibri" };
const shadow = () => ({ type: "outer", color: "0B1626", blur: 7, offset: 3, angle: 90, opacity: 0.12 });

const p = new pptxgen();
p.layout = "LAYOUT_WIDE"; p.author = "ARDICTECH"; p.title = "Asıl Resim — İç Mutabakat";
const s = p.addSlide(); s.background = { color: C.white };

// header
s.addText("Asıl resim — taşıdığımız yük vs gerçek hasar", { x: 0.6, y: 0.4, w: 9.6, h: 0.55, fontSize: 25, bold: true, color: C.navyText, fontFace: F.h, align: "left", valign: "middle", margin: 0 });
s.addText("iç mutabakat · 2022→2025 · tüm rakamlar mizandan doğrulanmış (T1)", { x: 0.6, y: 0.97, w: 9.6, h: 0.36, fontSize: 12.5, color: C.body, fontFace: F.b, align: "left", valign: "middle", margin: 0 });
s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: 10.55, y: 0.46, w: 2.18, h: 0.5, rectRadius: 0.07, fill: { color: C.coral }, line: { width: 0 } });
s.addText("İÇ · PAYLAŞILMAZ", { x: 10.55, y: 0.46, w: 2.18, h: 0.5, fontSize: 12, bold: true, color: C.white, fontFace: F.b, align: "center", valign: "middle", margin: 0 });

const Hl = (t) => ({ text: t, options: { bold: true, color: C.white, fill: { color: C.navy }, valign: "middle", align: "left" } });
const Hr = (t) => ({ text: t, options: { bold: true, color: C.white, fill: { color: C.navy }, valign: "middle", align: "right" } });
const L = (t, o = {}) => ({ text: t, options: { color: C.body, valign: "middle", align: "left", ...o } });
const R = (t, o = {}) => ({ text: t, options: { color: C.body, valign: "middle", align: "right", ...o } });

// ===== Panel 1 — Taşıdığımız yük =====
s.addText("1 · Taşıdığımız yük  (yıl-sonu stok)", { x: 0.6, y: 1.46, w: 5.4, h: 0.32, fontSize: 13.5, bold: true, color: C.tealDark, fontFace: F.h, align: "left", valign: "middle", margin: 0 });
const fillC = { color: C.cardLight };
const t1 = [
  [Hl("Kalem"), Hr("Defter"), Hr("Gerçek")],
  [L("Kurucu nakit — Tunç¹"), R("₺14,87M"), R("₺28,12M", { bold: true, color: C.navyText })],
  [L("Kurucu nakit — Hülya"), R("₺0,27M"), R("₺0,27M")],
  [L("Kurucu eksik/ertelenen maaş"), R("₺4,11M"), R("₺10,20M", { bold: true, color: C.navyText })],
  [L("Personel ertelenen ücret (19)"), R("₺4,25M"), R("₺8,79M", { bold: true, color: C.navyText })],
  [L("Banka kredisi bakiyesi"), R("₺4,37M"), R("₺4,37M")],
  [L("= Üç kalem (kurucu+maaş+borç)", { bold: true, color: C.navyText, fill: fillC }), R("₺27,9M", { bold: true, color: C.navyText, fill: fillC }), R("₺51,8M", { bold: true, color: C.coralDark, fill: fillC })],
  [L("Vergi/SGK ertelenen (+689 ceza)"), R("₺7,81M"), R("₺7,81M")],
  [L("GENEL TOPLAM", { bold: true, color: C.white, fill: { color: C.tealDark } }), R("₺35,7M", { bold: true, color: C.white, fill: { color: C.tealDark } }), R("₺59,6M", { bold: true, color: C.white, fill: { color: C.tealDark } })],
];
s.addTable(t1, { x: 0.6, y: 1.84, w: 5.4, colW: [2.7, 1.35, 1.35], rowH: 0.345, fontSize: 11, fontFace: F.b, border: { type: "solid", pt: 0.5, color: C.hair }, margin: [2, 5, 2, 5], valign: "middle" });
s.addText("¹ Tunç nominal nakit ₺14,87M (≈₺4,6M'si 2024–26 taze); altına endeksli claim ₺28,12M. 431.01.002 · T1. Tüm satırlar mizan hesabına izli.", { x: 0.6, y: 5.0, w: 5.4, h: 0.7, fontSize: 9.5, italic: true, color: C.mute, fontFace: F.b, align: "left", valign: "top", lineSpacingMultiple: 1.12, margin: 0 });

// ===== Panel 2 — Kale-dışı carve-out =====
s.addText("2 · Kale-dışı carve-out  (31.12.25, doğrulanmış)", { x: 6.25, y: 1.46, w: 6.5, h: 0.32, fontSize: 13.5, bold: true, color: C.tealDark, fontFace: F.h, align: "left", valign: "middle", margin: 0 });
const strike = { color: C.mute, italic: true };
const t2 = [
  [Hl("Müşteri"), Hl("Tip"), Hr("Tutar")],
  [L("Cyclothe", { bold: true, color: C.navyText }), L("açık alacak"), R("₺4,15M", { bold: true, color: C.coralDark })],
  [L("GİB yenileme (Kas·Coretek)"), L("ertelenmiş gelir"), R("~₺4M / ₺500K", { color: C.coralDark })],
  [L("Coretek May-ihale ₺8,16M", strike), L("tahsil edildi", strike), R("hariç", strike)],
  [L("GİB direkt ₺606K", strike), L("tahsil edildi", strike), R("hariç", strike)],
  [L("Kale (karşılaştırma)", { color: C.body, fill: fillC }), L("açık alacak", { color: C.body, fill: fillC }), R("₺3,41M", { bold: true, color: C.navyText, fill: fillC })],
];
s.addTable(t2, { x: 6.25, y: 1.84, w: 6.5, colW: [2.7, 2.0, 1.8], rowH: 0.32, fontSize: 11, fontFace: F.b, border: { type: "solid", pt: 0.5, color: C.hair }, margin: [2, 5, 2, 5], valign: "middle" });

// ===== Panel 3 — Temiz Kale hasarı =====
s.addText("3 · Temiz Kale hasarı  (üçgenlenmiş)", { x: 6.25, y: 3.92, w: 6.5, h: 0.32, fontSize: 13.5, bold: true, color: C.tealDark, fontFace: F.h, align: "left", valign: "middle", margin: 0 });
const t3 = [
  [Hl("Bileşen"), Hr("Tutar / nitelik")],
  [L("Lisans makası — motor", { bold: true, color: C.navyText }), R("₺21–26M  ($464.699–$589.687)", { bold: true, color: C.coralDark })],
  [L("2024 DSO taşıma maliyeti"), R("₺8,3M ~1 yıl kilitli (telafi edildi)")],
  [L("NRE zaman-değeri + KB3 teslim borcu"), R("ileri / süregelen")],
];
s.addTable(t3, { x: 6.25, y: 4.3, w: 6.5, colW: [3.55, 2.95], rowH: 0.36, fontSize: 11, fontFace: F.b, border: { type: "solid", pt: 0.5, color: C.hair }, margin: [2, 5, 2, 5], valign: "middle" });
s.addText("2024 DSO sıçraması: net alacak ₺0,6M→₺8,5M; bunun ₺8,30M'i (%97) Kale — 2025'te tahsil edildi. Kale'nin asıl hasarı alacakta değil, makasta.", { x: 6.25, y: 5.78, w: 6.5, h: 0.42, fontSize: 9.5, italic: true, color: C.mute, fontFace: F.b, align: "left", valign: "top", lineSpacingMultiple: 1.12, margin: 0 });

// ===== Takeaway =====
s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 6.28, w: 12.13, h: 0.74, rectRadius: 0.08, fill: { color: C.tealDark }, line: { width: 0 }, shadow: shadow() });
s.addText([
  { text: "Okuma: ", options: { bold: true, color: "DFF6F2" } },
  { text: "Taşıdığımız yük ₺28–60M (kurucu nakdi + eksik maaş + borç + vergi). Tetikleyen ana sürücü Kale lisans makası (~₺21–26M) + 2024 DSO (₺8,3M, telafi edildi). Kale-dışı açık yalnız Cyclothe ₺4,15M; Coretek+GİB ödedi. −$92.549 bu tablonun yanında bir dilim bile değil.", options: { color: C.white } },
], { x: 0.95, y: 6.28, w: 11.45, h: 0.74, fontSize: 11, fontFace: F.b, align: "left", valign: "middle", lineSpacingMultiple: 1.05, margin: 0 });

s.addText([{ text: "Kaynak: ", options: { bold: true } }, { text: "Finansman Şelalesi v1 · Ortaklar Alacak/Sermaye v5-CFO · Personel Konsolide v3 · 2024–25 mizan (120/300/335/360/431) · Lisans Plan-vs-Fiili. Tüm rakamlar T1." }], { x: 0.6, y: 7.08, w: 9.9, h: 0.3, fontSize: 8.5, italic: true, color: C.mute, fontFace: F.b, align: "left", valign: "middle", margin: 0 });
s.addText("ARDICTECH · İç · Gizli", { x: 10.5, y: 7.08, w: 2.23, h: 0.3, fontSize: 8.5, italic: true, color: C.mute, fontFace: F.b, align: "right", valign: "middle", margin: 0 });
s.addNotes("İÇ-REFERANS, ASLA owner/Kale ile paylaşılmaz. 3 panel: (1) taşıdığımız yük ₺28-60M defter/gerçek; (2) Kale-dışı carve-out — Cyclothe ₺4,15M açık + GİB yenileme ertelemesi; Coretek ₺8,16M & GİB direkt ₺606K TAHSİL EDİLDİ (mizan borç=alacak, bakiye 0), hariç; (3) temiz Kale hasarı = lisans makası ₺21-26M + 2024 DSO taşıma + NRE/KB3. Üçgenleme: Kale-dışı ayıklandıktan sonra Kale hasarı makas+DSO ile sınırlı.");

p.writeFile({ fileName: "/home/claude/ARDIC_Kale_AsilResim_IC_v1.pptx" }).then((f) => console.log("WROTE", f)).catch((e) => { console.error("ERR", e); process.exit(1); });
