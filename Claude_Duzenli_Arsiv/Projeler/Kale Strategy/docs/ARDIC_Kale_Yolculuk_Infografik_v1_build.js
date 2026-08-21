// ARDIC_Kale_Yolculuk_Infografik_v1 — İÇ ÇALIŞMA NOTU · tek sayfa A4 infografik
// Sınıf: İÇ (hasar modeli, ACT, NewCo dahil — Kale/ACT tarafıyla PAYLAŞILMAZ)
// KVKK: kurucu dışı gerçek isim YOK. Rakamlar: Bootstrap v19 / Mind Map v11 kilitli seti.
const pptxgen = require("pptxgenjs");

const NAVY = "1F3864", TEAL = "13A89E", AMBER = "E8A33D";
const INK = "2B2B2B", GRAY = "5A5A5A", LINE = "E1E7EE", CARD = "F4F7FA", TINT = "FDF6EA";

const p = new pptxgen();
p.defineLayout({ name: "A4P", width: 8.27, height: 11.69 });
p.layout = "A4P";
const s = p.addSlide();
s.background = { color: "FFFFFF" };

const MX = 0.42;

// ---------- Başlık ----------
s.addText("İÇ ÇALIŞMA NOTU · HİZMETE ÖZEL — KALE/ACT TARAFIYLA PAYLAŞILMAZ", {
  x: MX, y: 0.34, w: 5.6, h: 0.2, margin: 0, fontFace: "Calibri", fontSize: 8, bold: true, color: AMBER, charSpacing: 1.5 });
s.addText("17.07.2026", { x: 8.27 - MX - 1.4, y: 0.34, w: 1.4, h: 0.2, margin: 0, align: "right", fontFace: "Calibri", fontSize: 8, color: GRAY });
s.addText("ARDIÇ × KALE — Geçmişten Bugüne", {
  x: MX, y: 0.56, w: 7.43, h: 0.4, margin: 0, fontFace: "Calibri", fontSize: 21, bold: true, color: NAVY });
s.addText("2008'de kurulan platformdan, bugün masadaki çift-vitesli teklife: tek sayfada 18 yıl.", {
  x: MX, y: 0.97, w: 7.43, h: 0.22, margin: 0, fontFace: "Calibri", fontSize: 9.5, italic: true, color: GRAY });

// ---------- SOL: Zaman çizgisi ----------
const TLX = MX + 0.06, TY = 1.42, NODE_H = 0.745, NODES = [
  ["2008", "ARDICTECH kuruldu (İstanbul) — endüstriyel yazılım/AIoT çekirdeği."],
  ["2016", "ACT yatırımı: €2,725M (özsermaye + €400K C-Note) · %24 B-grup."],
  ["2019", "IoT-Ignite sözleşmesi — Kale ilişkisi doğdu (Granit, edge katmanı)."],
  ["2022", "Faz1 (19.08): ArMES sahaya indi — üretim yürütme kaydı başladı."],
  ["2023-24", "Faz1.5 USD protokolü · Faz2 — kapsam ve derinlik büyüdü."],
  ["15.08.2024", "SCL imza: 36 ay, YENİLENMEZ · $2,46M NRE + lisans motoru."],
  ["2024-25", "Revizyon dalgası: %100 belgeli erteleme · tempo $43K/ay'a düştü."],
  ["2026 Q2-Q3", "Strateji seferberliği: hasar modeli + deck seti + COO briefi + kanıt kitabı."],
  ["17.07.2026", "SAHİP GÖRÜŞMESİ — çift-vites teklif masada (bugün)."],
  ["14.08.2027", "Pencere kapanışı — kaybedilen her ay kalıcı lisans-ayı kaybı."],
];
// dikey hat
s.addShape(p.ShapeType.rect, { x: TLX + 0.07, y: TY + 0.05, w: 0.016, h: NODE_H * (NODES.length - 1) + 0.1, fill: { color: LINE } });
NODES.forEach((n, i) => {
  const y = TY + i * NODE_H;
  const hot = i === 8; // sahip görüşmesi vurgusu
  s.addShape(p.ShapeType.ellipse, { x: TLX, y: y, w: 0.15, h: 0.15, fill: { color: hot ? AMBER : TEAL } });
  s.addText(n[0], { x: TLX + 0.26, y: y - 0.035, w: 1.05, h: 0.2, margin: 0, fontFace: "Calibri", fontSize: 9, bold: true, color: hot ? AMBER : NAVY });
  s.addText(n[1], { x: TLX + 0.26, y: y + 0.155, w: 2.98, h: 0.5, margin: 0, fontFace: "Calibri", fontSize: 7.8, color: INK, lineSpacingMultiple: 1.02 });
});

// ---------- SAĞ: Kartlar ----------
const RX = 3.92, RW = 8.27 - MX - RX; // 3.93
const card = (y, h, title, fill = CARD, borderC = LINE) => {
  s.addShape(p.ShapeType.roundRect, { x: RX, y, w: RW, h, rectRadius: 0.06, fill: { color: fill }, line: { color: borderC, width: 0.75 } });
  s.addText(title, { x: RX + 0.14, y: y + 0.07, w: RW - 0.28, h: 0.2, margin: 0, fontFace: "Calibri", fontSize: 9, bold: true, color: TEAL, charSpacing: 1.5 });
};
const body = (y, h, segs, size = 8) => s.addText(segs, { x: RX + 0.14, y, w: RW - 0.28, h, margin: 0, fontFace: "Calibri", fontSize: size, color: INK, lineSpacingMultiple: 1.06 });

// K1 — Platform varlığı
card(1.42, 1.46, "PLATFORM VARLIĞI");
body(1.66, 1.18, [
  { text: "IoT-Ignite → ArMES/MOM → ArAI → CWF/CeramIQ", options: { bold: true, color: NAVY } },
  { text: " (4 katman). ", options: {} },
  { text: "4 canlı tesis + 2 bu yıl", options: { bold: true } },
  { text: " (16 kapsam birimi, kademeli). 7 yıl tescilli saha verisi · hat-seviyesi OEE (ISO 22400-2). İnşa emeği ~440 adam-ay (T2) · inşa ≈ başabaş (±$50K) — hasar emekte değil.", options: {} },
]);

// K2 — Pencere saati (3 sayaç)
card(3.00, 1.02, "PENCERE SAATİ · 17.07.2026");
const cnt = [["%64", "zaman"], ["%44", "NRE"], ["%14", "lisans"]];
cnt.forEach((c, i) => {
  const cx = RX + 0.14 + i * ((RW - 0.28) / 3);
  s.addText(c[0], { x: cx, y: 3.26, w: (RW - 0.28) / 3, h: 0.42, margin: 0, align: "center", fontFace: "Calibri", fontSize: 24, bold: true, color: NAVY });
  s.addText(c[1], { x: cx, y: 3.68, w: (RW - 0.28) / 3, h: 0.2, margin: 0, align: "center", fontFace: "Calibri", fontSize: 8, bold: true, color: TEAL, charSpacing: 1.5 });
});

// K3 — Hasar modeli (İÇ)
card(4.14, 1.94, "HASAR MODELİ · İÇ · DEFTER-İZLİ");
body(4.38, 1.62, [
  { text: "Gerçekleşen ~₺31,3M (~$777K): ", options: { bold: true, color: NAVY } },
  { text: "finansman çağlayanı ₺19,7M (689'da gizli gecikme zammı ₺15,5M dahil) + lisans farkı ₺11,6M + inşa başabaş. ", options: {} },
  { text: "Forward: ", options: { bold: true, color: NAVY } },
  { text: "$1,04M/yıl lisans motoru gecikmiş/eriyor (erime −$92,5K — Kale kendi kayıtları). ", options: {} },
  { text: "Nedensellik: ", options: { bold: true, color: NAVY } },
  { text: "revizyonların %100'ü belgeli Kale ertelemesi; ARDIÇ revize planı tutturdu. Her rakam T1/T2 etiketli — beyan ≠ kanıt.", options: {} },
]);

// K4 — Üç cephe
card(6.20, 1.94, "ÜÇ CEPHE");
body(6.44, 1.62, [
  { text: "KALE — ", options: { bold: true, color: NAVY } },
  { text: "tedarikçi → ortak-sahiplik (NewCo/JV, Holding katı); owner-direct kanal açık, iç şampiyon hizada.  ", options: {} },
  { text: "ACT — ", options: { bold: true, color: NAVY } },
  { text: "BATNA≈0; tek çıkış Kale-işlem-fonlu paket; LP üçgeni yapısal müttefik.  ", options: {} },
  { text: "DIŞ PAZAR — ", options: { bold: true, color: NAVY } },
  { text: "Netaş mastership (%18-22 royalty, açık) · FRWRD DACH v1 teslim · CWF: \u201CEveryone has a chatbot. Ours has a factory.\u201D", options: {} },
]);

// ---------- ALT: Bugün masada — çift vites ----------
s.addText("BUGÜN MASADA — ÇİFT VİTES", {
  x: MX, y: 8.98, w: 7.43, h: 0.24, margin: 0, fontFace: "Calibri", fontSize: 10, bold: true, color: NAVY, charSpacing: 2 });
const BW = (8.27 - 2 * MX - 0.16) / 2;
// Vites 0
s.addShape(p.ShapeType.roundRect, { x: MX, y: 9.28, w: BW, h: 1.52, rectRadius: 0.06, fill: { color: TINT }, line: { color: AMBER, width: 1 } });
s.addText("VİTES 0 · OKSİJEN (30-60 gün)", { x: MX + 0.14, y: 9.36, w: BW - 0.28, h: 0.2, margin: 0, fontFace: "Calibri", fontSize: 9, bold: true, color: AMBER, charSpacing: 1 });
s.addText("$350K mobilizasyon avansı (çift-mahsup) · ~$95-100K/ay hakediş takvimi · Faz4 kapanışı → Granit tam kesim (+₺110K/ay baz) · 30 gün açık-defter mutabakatı. Aciliyetin gerekçesi bizim bilançomuz değil, Kale'nin pencere saati.", {
  x: MX + 0.14, y: 9.58, w: BW - 0.28, h: 1.14, margin: 0, fontFace: "Calibri", fontSize: 8, color: INK, lineSpacingMultiple: 1.06 });
// Vites 1
s.addShape(p.ShapeType.roundRect, { x: MX + BW + 0.16, y: 9.28, w: BW, h: 1.52, rectRadius: 0.06, fill: { color: "E9F5F4" }, line: { color: TEAL, width: 1 } });
s.addText("VİTES 1 · NEWCO (45 gün term sheet)", { x: MX + BW + 0.30, y: 9.36, w: BW - 0.28, h: 0.2, margin: 0, fontFace: "Calibri", fontSize: 9, bold: true, color: TEAL, charSpacing: 1 });
s.addText("Holding %50-60 + ARDIÇ %25-35 + ESOP %10-15 · IP münhasır lisans (ayni) + milestone dilimleri + call opsiyonu (predatory-wait panzehiri) · ACT temiz-çıkış = kapanış şartı · SCL novasyonu. Vites 0 ödemeleri dilimlere mahsup.", {
  x: MX + BW + 0.30, y: 9.58, w: BW - 0.28, h: 1.14, margin: 0, fontFace: "Calibri", fontSize: 8, color: INK, lineSpacingMultiple: 1.06 });

// Kapanış + kaynak
s.addText("Başarı ölçütü: mandat + tarihli nakit kararı. İkisi birden çıkmazsa toplantı başarılı sayılmaz.", {
  x: MX, y: 10.92, w: 7.43, h: 0.22, margin: 0, fontFace: "Calibri", fontSize: 9.5, bold: true, color: NAVY });
s.addText("Kaynaklar: Bootstrap v19 · Mind Map v11 · Master Fact Book v1 — tüm rakamlar defter/sözleşme-izli, T1/T2 etiketli. USD: sözleşme kuru ₺32,3655.", {
  x: MX, y: 11.16, w: 7.43, h: 0.2, margin: 0, fontFace: "Calibri", fontSize: 7.5, italic: true, color: GRAY });

p.writeFile({ fileName: "/home/claude/ARDIC_Kale_Yolculuk_Infografik_v1.pptx" })
  .then(() => console.log("OK: pptx yazıldı"));
