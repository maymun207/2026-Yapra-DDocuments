const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.3 x 7.5
pres.author = "ARDICTECH";
pres.title = "Kale Yaygınlaştırma (SCL) — Master Deck v4 (İçsel)";

// ---- palette ----
const C = {
  navy: "13233F",
  cardNavy: "1E3354",
  teal: "13A89E",
  tealDark: "0C7368",
  tealOnDark: "47D3C4",
  coral: "C76B4A",
  coralDark: "9A4E32",
  white: "FFFFFF",
  cardLight: "F3F5F9",
  navyText: "13233F",
  body: "414E5E",
  mute: "8A95A5",
  lightText: "EAEFF6",
  lightMute: "9DABC1",
  hair: "DCE2EA",
};
const F = { h: "Calibri", b: "Calibri" };
const makeShadow = () => ({ type: "outer", color: "0B1626", blur: 7, offset: 3, angle: 90, opacity: 0.12 });
const makeShadowDark = () => ({ type: "outer", color: "000000", blur: 8, offset: 3, angle: 90, opacity: 0.28 });

// ---- helpers ----
function bg(slide, dark) { slide.background = { color: dark ? C.navy : C.white }; }

function footer(slide, src, dark) {
  slide.addText([{ text: "Kaynak: ", options: { bold: true } }, { text: src }], {
    x: 0.6, y: 7.04, w: 9.4, h: 0.32, fontSize: 9, italic: true,
    color: dark ? "7E8CA3" : C.mute, fontFace: F.b, align: "left", margin: 0, valign: "middle",
  });
  slide.addText("İçsel · YK / CFO / Hukuk — dışarı çıkmaz", {
    x: 10.0, y: 7.04, w: 2.7, h: 0.32, fontSize: 9, italic: true,
    color: dark ? "7E8CA3" : C.mute, fontFace: F.b, align: "right", margin: 0, valign: "middle",
  });
}

function header(slide, n, title, dark) {
  // perde number circle
  slide.addShape(pres.shapes.OVAL, { x: 0.6, y: 0.52, w: 0.62, h: 0.62, fill: { color: dark ? C.tealOnDark : C.teal }, line: { width: 0 } });
  slide.addText(String(n), { x: 0.6, y: 0.52, w: 0.62, h: 0.62, fontSize: 22, bold: true, color: dark ? C.navy : C.white, align: "center", valign: "middle", fontFace: F.h, margin: 0 });
  slide.addText(title, { x: 1.45, y: 0.46, w: 11.25, h: 0.78, fontSize: 27, bold: true, color: dark ? C.lightText : C.navyText, align: "left", valign: "middle", fontFace: F.h, margin: 0 });
}

function card(slide, x, y, w, h, dark) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h, rectRadius: 0.09,
    fill: { color: dark ? C.cardNavy : C.cardLight },
    line: { color: dark ? C.cardNavy : C.hair, width: 0.75 },
    shadow: dark ? makeShadowDark() : makeShadow(),
  });
}

function stat(slide, x, y, w, num, label, dark, accent) {
  slide.addText(num, { x, y, w, h: 0.7, fontSize: 33, bold: true, color: accent || (dark ? C.tealOnDark : C.teal), align: "left", valign: "bottom", fontFace: F.h, margin: 0 });
  slide.addText(label, { x, y: y + 0.72, w, h: 0.7, fontSize: 12.5, color: dark ? C.lightMute : C.body, align: "left", valign: "top", fontFace: F.b, margin: 0 });
}

// =========================================================
// SLIDE 1 — KAPAK (dark)
// =========================================================
(() => {
  const s = pres.addSlide(); bg(s, true);
  s.addShape(pres.shapes.OVAL, { x: 10.7, y: -1.7, w: 4.4, h: 4.4, fill: { color: C.navy }, line: { color: C.tealOnDark, width: 1.25 } });
  s.addShape(pres.shapes.OVAL, { x: 0.6, y: 1.06, w: 0.34, h: 0.34, fill: { color: C.tealOnDark }, line: { width: 0 } });
  s.addText("ARDICTECH · Kale Yaygınlaştırma (SCL)", { x: 1.05, y: 1.0, w: 9, h: 0.45, fontSize: 14, bold: true, color: C.tealOnDark, charSpacing: 2, fontFace: F.b, align: "left", valign: "middle", margin: 0 });
  s.addText("Kale Yaygınlaştırma Sözleşmesi:\nvaat, safahat ve maliyet", { x: 1.0, y: 2.0, w: 11.3, h: 2.0, fontSize: 44, bold: true, color: C.lightText, lineSpacingMultiple: 1.02, fontFace: F.h, align: "left", valign: "middle", margin: 0 });
  s.addText("İmzadan (15 Ağustos 2024) bugüne — bütçe revizyonu, geç execution, lisans kaybı ve absorbe mekanizmasının tükenmesi. Her rakam kaynağa izli.", { x: 1.0, y: 4.25, w: 10.6, h: 0.95, fontSize: 16, color: C.lightMute, lineSpacingMultiple: 1.15, fontFace: F.b, align: "left", valign: "top", margin: 0 });
  s.addText("Haziran 2026", { x: 1.0, y: 6.55, w: 4, h: 0.4, fontSize: 13, color: C.lightMute, fontFace: F.b, align: "left", valign: "middle", margin: 0 });
  s.addText("İçsel belge · Yönetim Kurulu / CFO / Hukuk · owner/Kale-facing'e GİRMEZ", { x: 6.0, y: 6.55, w: 6.7, h: 0.4, fontSize: 11, italic: true, color: "7E8CA3", fontFace: F.b, align: "right", valign: "middle", margin: 0 });
  s.addNotes("Açılış: bu, satıcı-müşteri ilişkisinin imzadan bugüne safahatını ve ARDIÇ'a maliyetini anlatan içsel master belge. Owner/Kale versiyonu bundan hijyen-filtresiyle türetilir. Tüm rakamlar kaynağa izli (Appendix).");
})();

// =========================================================
// SLIDE 2 — YÖNETİCİ ÖZETİ (dark)
// =========================================================
(() => {
  const s = pres.addSlide(); bg(s, true);
  s.addText("Yönetici özeti — tek bakışta", { x: 0.6, y: 0.5, w: 12.1, h: 0.7, fontSize: 30, bold: true, color: C.lightText, fontFace: F.h, align: "left", valign: "middle", margin: 0 });
  s.addText("ARDIÇ, Kale çözümünü neredeyse maliyetine kurdu; kâr tekrarlayan lisanstan gelecekti. Kale gecikmesi lisansı öldürdü ve ARDIÇ açığı kendi fonladı.", { x: 0.6, y: 1.32, w: 12.0, h: 0.7, fontSize: 16, color: C.lightMute, lineSpacingMultiple: 1.12, fontFace: F.b, align: "left", valign: "top", margin: 0 });

  const cy = 2.45, cw = 2.86, gap = 0.18, cx0 = 0.6, ch = 2.0;
  const items = [
    ["~$1,5M", "Gelir makası", "sözleşme-planı vs fiili fatura (2025–26)"],
    ["~₺31,3M", "Gerçekleşen hasar", "~$777K — finansman + lisans kaybı"],
    ["~$1,04M/yıl", "Risk altındaki motor", "tekrarlayan lisans, gecikti / eriyor"],
    ["₺0", "Kullandığımız ceza hakkı", "standby + %1/ay + fesih: hiç işletilmedi"],
  ];
  items.forEach((it, i) => {
    const x = cx0 + i * (cw + gap);
    card(s, x, cy, cw, ch, true);
    s.addText(it[0], { x: x + 0.25, y: cy + 0.22, w: cw - 0.5, h: 0.72, fontSize: 28, bold: true, color: C.tealOnDark, fontFace: F.h, align: "left", valign: "middle", margin: 0 });
    s.addText(it[1], { x: x + 0.25, y: cy + 0.95, w: cw - 0.5, h: 0.4, fontSize: 14, bold: true, color: C.lightText, fontFace: F.b, align: "left", valign: "middle", margin: 0 });
    s.addText(it[2], { x: x + 0.25, y: cy + 1.34, w: cw - 0.5, h: 0.55, fontSize: 11.5, color: C.lightMute, fontFace: F.b, align: "left", valign: "top", lineSpacingMultiple: 1.05, margin: 0 });
  });

  card(s, 0.6, 4.78, 12.1, 1.55, true);
  s.addText([
    { text: "Sonuç. ", options: { bold: true, color: C.tealOnDark } },
    { text: "İnşa emeği ~başabaş; hasar ", options: {} },
    { text: "gecikme → lisans kaybı", options: { bold: true } },
    { text: " ve ", options: {} },
    { text: "gecikme → ödeme → finansman çağlayanında", options: { bold: true } },
    { text: ". Bilanço sağlam (TTK 376 temiz, özsermaye ~₺213M) — ama bu kayıpları tek başına absorbe etme modeli ", options: {} },
    { text: "tükendi", options: { bold: true, color: C.tealOnDark } },
    { text: ". Değer artık satıcı-müşteri ilişkisiyle değil, ", options: {} },
    { text: "ortak-sahiplikle (NewCo/JV)", options: { bold: true, color: C.tealOnDark } },
    { text: " yakalanır.", options: {} },
  ], { x: 0.95, y: 4.95, w: 11.4, h: 1.25, fontSize: 15, color: C.lightText, lineSpacingMultiple: 1.18, fontFace: F.b, align: "left", valign: "middle", margin: 0 });

  footer(s, "Sentez — bu deck'in Perde 1–8 + Appendix kanıtları (Mind Map v5 §22 entegre harita).", true);
  s.addNotes("Tek slaytta tüm tez. Vurgu sırası: (1) inşa başabaş → hasar emekte değil, (2) ~₺31,3M gerçekleşen + $1,04M/yıl motor risk, (3) ₺0 ceza = iyi niyet, (4) bilanço sağlam ama mekanizma tükendi → NewCo. ₺0 stat'ı Perde 6'ya bağlanır.");
})();

// =========================================================
// SLIDE 3 — 5N1K TEK TABLO (light)
// =========================================================
(() => {
  const s = pres.addSlide(); bg(s, false);
  s.addText("5N1K — vakanın tek tablosu (içsel tanı)", { x: 0.6, y: 0.5, w: 12.1, h: 0.7, fontSize: 28, bold: true, color: C.navyText, fontFace: F.h, align: "left", valign: "middle", margin: 0 });
  s.addText("Tüm resim tek bakışta: ne oldu, kim, ne zaman, nerede, neden, ne kadar. Her hücre kaynağa izli — bu içsel master; hijyenli owner-facing buradan türetilir.", { x: 0.6, y: 1.26, w: 12.1, h: 0.5, fontSize: 13.5, color: C.body, fontFace: F.b, align: "left", valign: "top", margin: 0 });

  const cells = [
    ["NE OLDU?", "Kale çözümü ~maliyetine kuruldu; kâr tekrarlayan lisanstaydı. Kale gecikmesi lisansı öldürdü, ARDIÇ açığı kendi fonladı. Sonuç: ~₺31,3M gerçekleşen hasar + $1,04M/yıl motor risk altında."],
    ["KİM?", "Kale-kaynaklı, ARDIÇ değil: kendi bütçe revizyonu (kendi notu) + sağlanmayan donanım/veri + geç ödeme. Skop daralmadı — büyüdü (2.233.541 → 2.304.790 ₺/ay)."],
    ["NE ZAMAN?", "Faz1 19.08.2022 → Faz1.5 11.12.2023 → Faz2 07.05.2024 → SCL 15.08.2024 → ~2 ay sonra Eki-24 NRE kesintisi → 2026 tahsilat %38. Pencere 3 yıl, yenilenmez."],
    ["NEREDE?", "5+ tesis: KS / Granit / Yerköy / Sinter / IRAQ. İki gelir katmanı: tek-seferlik NRE ($2,46M) + tekrarlayan lisans (~$1,04M/yıl)."],
    ["NEDEN SÜRDÜRÜLEMEZ?", "Dört absorbe kaldıracı tükendi: kurucu ₺30,89M (sonlu) · ücret erteleme (ekip 36→17) · devlet cezası ₺15,48M (bileşik) · tahsilat %100→%38. Özsermaye ₺213M ama nakit değil."],
    ["NE KADAR?", "Gerçekleşen ~₺31,3M (~$777K): finansman ₺19,7M + lisans ₺11,6M. Kullanılmayan haklar: §3.11 ₺0,31M (hesaplı), §3.6 ₺485K/ay ×duruş-ayı. İnşa emeği ~başabaş. Risk: $1,04M/yıl."],
  ];
  const cw = 6.05, ch = 1.55, gx = 0.18, gy = 0.16, x0 = 0.6, y0 = 1.92;
  cells.forEach((cl, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = x0 + col * (cw + gx), y = y0 + row * (ch + gy);
    card(s, x, y, cw, ch, false);
    s.addShape(pres.shapes.OVAL, { x: x + 0.28, y: y + 0.26, w: 0.14, h: 0.14, fill: { color: C.teal }, line: { width: 0 } });
    s.addText(cl[0], { x: x + 0.52, y: y + 0.16, w: cw - 0.8, h: 0.35, fontSize: 13, bold: true, color: C.tealDark, fontFace: F.h, align: "left", valign: "middle", charSpacing: 1, margin: 0 });
    s.addText(cl[1], { x: x + 0.3, y: y + 0.56, w: cw - 0.6, h: 0.92, fontSize: 11.5, color: C.body, fontFace: F.b, align: "left", valign: "top", lineSpacingMultiple: 1.13, margin: 0 });
  });

  footer(s, "Mind Map v5 §7/§8/§18–§22; §3.11 FIFO hesabı bu oturumda fatura defterinden (açık bakiye ₺2,44M ile mutabık); TIER ayrımı Ek'te.", false);
  s.addNotes("Master'ın tanı merkezi — 'tüm resmi detaylıca gördüğümüz' tek tablo. İçsel: distress (dört kaldıraç, ₺31,3M) burada açık. Owner-facing'e geçerken NEDEN/NE KADAR hücrelerindeki içsel kalemler (kurucu enjeksiyonu, ceza, %38, açık rakamlar) çıkarılır. §3.11=₺0,31M hesaplı (küçük); §3.6 duruş-ayı varsayımına bağlı.");
})();

// =========================================================
// SLIDE 4 — PERDE 1: VAAT (light)
// =========================================================
(() => {
  const s = pres.addSlide(); bg(s, false);
  header(s, 1, "Vaat: ne imzaladık", false);

  // left: two-component model
  card(s, 0.6, 1.7, 6.0, 4.95, false);
  s.addText("İki bileşenli gelir modeli", { x: 0.95, y: 1.95, w: 5.3, h: 0.45, fontSize: 17, bold: true, color: C.navyText, fontFace: F.h, align: "left", valign: "middle", margin: 0 });

  s.addText("$2.460.000", { x: 0.95, y: 2.5, w: 5.3, h: 0.55, fontSize: 32, bold: true, color: C.teal, fontFace: F.h, align: "left", valign: "bottom", margin: 0 });
  s.addText("Tek seferlik NRE (geliştirme + kurulum)", { x: 0.95, y: 3.1, w: 5.3, h: 0.3, fontSize: 12.5, bold: true, color: C.body, fontFace: F.b, align: "left", valign: "top", margin: 0 });
  s.addText("79,6M ₺ @32,3655 · yaygınlaştırma $2,25M + Faz3 $100K + Faz4 $110K", { x: 0.95, y: 3.4, w: 5.3, h: 0.3, fontSize: 11, color: C.mute, fontFace: F.b, align: "left", valign: "top", margin: 0 });

  s.addShape(pres.shapes.LINE, { x: 0.95, y: 3.88, w: 5.3, h: 0, line: { color: C.hair, width: 1 } });

  s.addText("~46,2M ₺/yıl", { x: 0.95, y: 4.02, w: 5.3, h: 0.55, fontSize: 32, bold: true, color: C.teal, fontFace: F.h, align: "left", valign: "bottom", margin: 0 });
  s.addText("Tekrarlayan lisans (tam yaygınlaşma)", { x: 0.95, y: 4.62, w: 5.3, h: 0.3, fontSize: 12.5, bold: true, color: C.body, fontFace: F.b, align: "left", valign: "top", margin: 0 });
  s.addText("~$1,04M/yıl · güncel skop, TÜFE'li — kârın asıl kaynağı", { x: 0.95, y: 4.92, w: 5.3, h: 0.3, fontSize: 11, color: C.mute, fontFace: F.b, align: "left", valign: "top", margin: 0 });

  s.addText([
    { text: "Pencere sabit: ", options: { bold: true, color: C.tealDark } },
    { text: "3 yıl, otomatik yenilenmez (md.2.3) → geciken her ay geri gelmez.", options: {} },
  ], { x: 0.95, y: 5.45, w: 5.3, h: 0.95, fontSize: 13, color: C.body, lineSpacingMultiple: 1.15, fontFace: F.b, align: "left", valign: "top", margin: 0 });

  // right: the strategic insight
  card(s, 6.85, 1.7, 5.85, 4.95, false);
  s.addText("Stratejik kurgu", { x: 7.2, y: 1.95, w: 5.15, h: 0.45, fontSize: 17, bold: true, color: C.navyText, fontFace: F.h, align: "left", valign: "middle", margin: 0 });
  s.addText([
    { text: "NRE ≈ maliyet.", options: { bold: true, breakLine: true, color: C.navyText } },
    { text: "Geliştirme/kurulum hak edişi ($2,46M), ARDIÇ'ın o işe harcadığı toplam maliyete (~$2,75M) neredeyse eşit fiyatlandı. İnşadan kâr beklenmiyordu.", options: { breakLine: true } },
    { text: " ", options: { breakLine: true, fontSize: 6 } },
    { text: "Kâr lisanstaydı.", options: { bold: true, breakLine: true, color: C.navyText } },
    { text: "ARDIÇ'ın geri dönüşü, 3 yıl boyunca akacak tekrarlayan lisanstan (~$1,04M/yıl) gelecekti.", options: { breakLine: true } },
    { text: " ", options: { breakLine: true, fontSize: 6 } },
    { text: "Sonuç (ileride):", options: { bold: true, breakLine: true, color: C.tealDark } },
    { text: "Lisansı geciktiren/erot­en herhangi bir şey, doğrudan ARDIÇ'ın tek kâr kaynağını vurur. İşte iki-katmanlı hasarın kökü burada.", options: {} },
  ], { x: 7.2, y: 2.55, w: 5.15, h: 3.9, fontSize: 13.5, color: C.body, lineSpacingMultiple: 1.16, fontFace: F.b, align: "left", valign: "top", margin: 0 });

  footer(s, "İmzalı SCL sözleşmesi md.2.3 / 3.1–3.4, Tablo-4 ve Tablo-8; Mind Map v5 §3, §7.", false);
  s.addNotes("Kontrat iki bileşenli: tek-seferlik NRE + tekrarlayan lisans, 3 yıllık YENİLENMEYEN pencerede. Kilit içgörü: NRE maliyetine fiyatlandı; kâr lisanstaydı. Bu, sonraki hasar slaytlarının kurgusunu kurar. Kaynak: sözleşme Tablo-8.");
})();

// =========================================================
// SLIDE — KONTRAT KRONOLOJİSİ (light)
// =========================================================
(() => {
  const s = pres.addSlide(); bg(s, false);
  s.addText("Kontrat kronolojisi — vaadin hukuki soyağacı", { x: 0.6, y: 0.5, w: 12.1, h: 0.7, fontSize: 27, bold: true, color: C.navyText, fontFace: F.h, align: "left", valign: "middle", margin: 0 });
  s.addText("Dört imza, tek çerçevede toplandı. Her tarih kaynağa izli; SCL imzası hard kanıtla (imza-günü fotoğrafı) sabit.", { x: 0.6, y: 1.26, w: 12.1, h: 0.5, fontSize: 13.5, color: C.body, fontFace: F.b, align: "left", valign: "top", margin: 0 });

  const cw = 2.86, ch = 3.0, gap = 0.25, x0 = 0.6, cy = 2.2;
  const steps = [
    ["19.08.2022", "Faz 1", "Hizmet Sözleşmesi — Granit Fabrikası MES (Üretim Yönetimi + Otomasyon). Aynı gün Tadil Protokolü: bedel kur-sabitleme."],
    ["11.12.2023", "Faz 1.5", "EK Protokol-3 — Faz 1 tamamlama: QR Yazıcı–MES entegrasyonu, StepBox, GW. (NDA 10.12.2023)"],
    ["07.05.2024", "Faz 2", "Protokol — Masse–Sır–Pasta Hazırlama süreçleri (Granit). Faz 3 / Faz 4 protokolleri SCL paketinde."],
    ["15.08.2024", "SCL Yaygınlaştırma", "Çerçeve Sözleşme — ARMES fazlarının tesis×faz yaygınlaştırması. Süre 3 yıl, otomatik yenilenmez."],
  ];
  steps.forEach((st, i) => {
    const x = x0 + i * (cw + gap);
    card(s, x, cy, cw, ch, false);
    s.addShape(pres.shapes.OVAL, { x: x + cw / 2 - 0.16, y: cy - 0.16, w: 0.32, h: 0.32, fill: { color: C.teal }, line: { color: "FFFFFF", width: 2 } });
    s.addText(st[0], { x: x + 0.25, y: cy + 0.3, w: cw - 0.5, h: 0.5, fontSize: 19, bold: true, color: C.teal, fontFace: F.h, align: "left", valign: "middle", margin: 0 });
    s.addText(st[1], { x: x + 0.25, y: cy + 0.82, w: cw - 0.5, h: 0.4, fontSize: 15, bold: true, color: C.navyText, fontFace: F.h, align: "left", valign: "middle", margin: 0 });
    s.addText(st[2], { x: x + 0.25, y: cy + 1.26, w: cw - 0.5, h: 1.6, fontSize: 11.5, color: C.body, fontFace: F.b, align: "left", valign: "top", lineSpacingMultiple: 1.16, margin: 0 });
    if (i < steps.length - 1) s.addText("→", { x: x + cw - 0.04, y: cy + 0.25, w: gap + 0.08, h: 0.5, fontSize: 20, bold: true, color: C.teal, align: "center", valign: "middle", margin: 0 });
  });

  card(s, 0.6, 5.5, 12.1, 1.1, false);
  s.addText([
    { text: "SCL (15.08.2024) ", options: { bold: true, color: C.tealDark } },
    { text: "üç aşamayı + Faz 3/4 protokollerini ", options: {} },
    { text: "EK-1", options: { bold: true } },
    { text: ", şartnameyi ", options: {} },
    { text: "EK-2", options: { bold: true } },
    { text: ", gizliliği ", options: {} },
    { text: "EK-3", options: { bold: true } },
    { text: ", bakımı ", options: {} },
    { text: "EK-4", options: { bold: true } },
    { text: " olarak tek çerçevede topladı. Çerçeve metni ayrıca, yaygınlaştırmanın Eylül-2024 planlı başlangıcına rağmen aylık ödemelerin 2025'e ötelendiğini kendi kaydediyor.", options: {} },
  ], { x: 0.95, y: 5.62, w: 11.4, h: 0.85, fontSize: 12.5, color: C.body, lineSpacingMultiple: 1.14, fontFace: F.b, align: "left", valign: "middle", margin: 0 });

  footer(s, "Faz1 syf1 + SCL md.2 (19.08.2022); EK Protokol-3 (11.12.2023); Faz2 kaşe (07.05.2024); SCL imza — imza-günü fotoğrafı/WhatsApp (15.08.2024); süre md.2.3.", false);
  s.addNotes("Kontrat soyağacı, kaynak-kesin tarihlerle. Faz1=19.08.2022 (5× teyit), Faz1.5=11.12.2023 (EK Prot-3), Faz2=07.05.2024, SCL=15.08.2024 (hard kanıt: imza-günü fotoğrafı, WhatsApp). SCL hepsini EK-1..4 olarak topluyor. Bonus makas: çerçeve metni Eyl-24 planlı başlangıç + ödemelerin 2025'e ötelenmesini kendi yazıyor.");
})();

// =========================================================
// SLIDE 4 — PERDE 2: KAYMA (light) + revize chart
// =========================================================
(() => {
  const s = pres.addSlide(); bg(s, false);
  header(s, 2, "Kayma: Kale içeriği ve bütçeyi nasıl değiştirdi", false);

  // left text
  s.addText([
    { text: "15 Ağustos imzadan ~2 ay sonra (Ekim 2024)", options: { bold: true, color: C.navyText, breakLine: true } },
    { text: "Kale, 2025 NRE bütçesini ", options: {} },
    { text: "$1.214.349 → $578.414", options: { bold: true, color: C.coralDark } },
    { text: " indirdi; $720.853'ü 2027'ye attı. Bu, Kale'nin kendi revize-öneri dosyasındaki kendi notu.", options: { breakLine: true } },
    { text: " ", options: { breakLine: true, fontSize: 7 } },
    { text: "Skop kaydı — ama büyüdü.", options: { bold: true, color: C.navyText, breakLine: true } },
    { text: "KS5 / KS6 / KS7 kapatıldı; Slab#2, Yerköy#2, IRAQ, Yerköy-SIR, Sinter#2 eklendi. Aylık run-rate ", options: {} },
    { text: "2.233.541 → 2.304.790 ₺ (+71.249)", options: { bold: true, color: C.tealDark } },
    { text: ".", options: {} },
  ], { x: 0.6, y: 1.75, w: 6.0, h: 3.0, fontSize: 14, color: C.body, lineSpacingMultiple: 1.2, fontFace: F.b, align: "left", valign: "top", margin: 0 });

  card(s, 0.6, 5.05, 6.0, 1.6, false);
  s.addText([
    { text: "Çerçeve: ", options: { bold: true, color: C.tealDark } },
    { text: "Bu \"kayıp fabrika\" değil — skop büyüdü. Değişen, takvim ve nakit-zamanlaması. Açık tamamen Kale ertelemesinden.", options: {} },
  ], { x: 0.95, y: 5.25, w: 5.3, h: 1.2, fontSize: 13.5, color: C.body, lineSpacingMultiple: 1.18, fontFace: F.b, align: "left", valign: "middle", margin: 0 });

  // right chart: 2025 NRE budget
  s.addText("2025 NRE bütçesi (bin USD)", { x: 7.0, y: 1.75, w: 5.7, h: 0.4, fontSize: 14, bold: true, color: C.navyText, fontFace: F.h, align: "left", valign: "middle", margin: 0 });
  s.addChart(pres.charts.BAR, [{ name: "2025 NRE", labels: ["İmzalı\n(Ağu-24)", "Kale-revize\n(Eki-24)", "ARDIÇ fiili"], values: [1214, 578, 565] }], {
    x: 7.0, y: 2.2, w: 5.7, h: 4.0, barDir: "col",
    chartColors: [C.teal],
    chartArea: { fill: { color: "FFFFFF" } },
    catAxisLabelColor: C.body, valAxisLabelColor: C.mute, catAxisLabelFontSize: 11, valAxisLabelFontSize: 10,
    valGridLine: { color: C.hair, size: 0.5 }, catGridLine: { style: "none" },
    showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.navyText, dataLabelFontSize: 12, dataLabelFontBold: true,
    showLegend: false, showTitle: false, valAxisHidden: true, valAxisMaxVal: 1400,
  });
  s.addText("ARDIÇ fiili ($565K) ≈ Kale-revize ($578K) → revize-planı tutturduk.", { x: 7.0, y: 6.3, w: 5.7, h: 0.4, fontSize: 11, italic: true, color: C.mute, fontFace: F.b, align: "left", valign: "top", margin: 0 });

  footer(s, "ReSCH 2024-2026 Project Revisions (r53/r57/r58/r96); UPDATED Proj_SCOPE 'Surecler' tab; Mind Map v5 §8a, §7.", false);
  s.addNotes("Smoking gun: Kale kendi dosyasında 2025'i $1,21M→$578K kıstı. Vurgula: skop DARALMADI, büyüdü (2,23→2,30M ₺/ay) — yani 'kayıp fabrika' itirazı peşinen kapanır. ARDIÇ revize-planı tutturdu (fiili≈revize). Kaynak: revizyon dosyası anotasyonları.");
})();

// =========================================================
// SLIDE 5 — PERDE 3: ÜÇ KANIT AKIŞI (light) — 3 cards
// =========================================================
(() => {
  const s = pres.addSlide(); bg(s, false);
  header(s, 3, "Üç bağımsız kanıt akışı — hepsi Kale'nin kendi belgesi", false);

  const cy = 1.75, ch = 4.85, cw = 3.92, gap = 0.17, x0 = 0.6;
  const cards = [
    ["1", "Kale'nin kendi bütçe revizyonu", "Ekim 2024'te 2025 NRE bütçesi $1.214.349 → $578.414 (Kale'nin kendi anotasyonu). ARDIÇ fiili 2025 (~$565K) revize plana oturdu.", "→ İmzalıya göre açık tamamen Kale ertelemesi."],
    ["2", "Skop-nötr lisans erimesi  ·  ÇEKİRDEK", "2026 lisans projeksiyonu, aynı tesis seti:\nOca $919.350 → Nis $863.236 → Haz $826.801 = −%10,1 (−$92.549).", "→ Skop değişmedi → saf gecikme. Çürütülemez."],
    ["3", "Sağlanmayan donanım & veri", "Fırın doğalgaz verisi, elektrik sayaçları, SCADA, kamera/StepBox, QR yazıcı sağlanmadı → tesisler lisansa geçemiyor.", "→ Sözleşme: tedarikçi gecikmesi süreye eklenir, ARDIÇ sorumlu değil."],
  ];
  cards.forEach((cd, i) => {
    const x = x0 + i * (cw + gap);
    card(s, x, cy, cw, ch, false);
    s.addShape(pres.shapes.OVAL, { x: x + 0.3, y: cy + 0.3, w: 0.5, h: 0.5, fill: { color: C.teal }, line: { width: 0 } });
    s.addText(cd[0], { x: x + 0.3, y: cy + 0.3, w: 0.5, h: 0.5, fontSize: 18, bold: true, color: C.white, align: "center", valign: "middle", fontFace: F.h, margin: 0 });
    s.addText(cd[1], { x: x + 0.3, y: cy + 0.95, w: cw - 0.6, h: 0.85, fontSize: 14.5, bold: true, color: C.navyText, fontFace: F.h, align: "left", valign: "top", lineSpacingMultiple: 1.05, margin: 0 });
    s.addText(cd[2], { x: x + 0.3, y: cy + 1.9, w: cw - 0.6, h: 1.85, fontSize: 12.5, color: C.body, fontFace: F.b, align: "left", valign: "top", lineSpacingMultiple: 1.18, margin: 0 });
    s.addText(cd[3], { x: x + 0.3, y: cy + 3.85, w: cw - 0.6, h: 0.85, fontSize: 12, bold: true, color: C.tealDark, fontFace: F.b, align: "left", valign: "top", lineSpacingMultiple: 1.12, margin: 0 });
  });

  footer(s, "ReSCH revizyon dosyası; UPDATED Proj_SCOPE 'KaleChangeMngmnt' (3 tarihli snapshot) ve 'Waiting for'; Mind Map v5 §8a/8b/8c.", false);
  s.addNotes("Üç akış birbirinden bağımsız ve hepsi Kale-belgeli. Kanıt 2 (skop-nötr erime) çekirdek: aynı tesis seti, sadece zaman değişti → karşı taraf çürütemez. Kanıt 1 nedeni, Kanıt 3 mekanizmayı verir. Kaynak: Kale revizyon + snapshot + Waiting-for tab.");
})();

// =========================================================
// SLIDE 6 — PERDE 4: EXECUTION GERÇEĞİ (light) + DSO chart
// =========================================================
(() => {
  const s = pres.addSlide(); bg(s, false);
  header(s, 4, "Execution gerçeği: kâğıt vs saha", false);

  // left: three execution facts
  const facts = [
    ["Geç devreye-alma", "Faz2 lisans ~6 ay overrun (Eki-2025); Granit Oca-2026; KB7 Mar-2026 (1/3-eksik). Donanım bekleyen tesisler hâlâ lisansa geçemiyor."],
    ["Geç ödeme", "Sözleşme vadesi 30 gün → fiilen ortalama 51 → 80 gün, maksimum 129 gün. 2024/25 %100 tahsil; 2026 yalnız %38 (öncü gösterge)."],
    ["Lisansa geçemeyen tesisler", "Granit ikincil (Faz4), Granit Masse, YK Masse, KB7 ikincil, KB3 — hepsi Kale donanım/montaj gecikmesi."],
  ];
  let fy = 1.85;
  facts.forEach((ft) => {
    s.addShape(pres.shapes.OVAL, { x: 0.6, y: fy + 0.05, w: 0.16, h: 0.16, fill: { color: C.teal }, line: { width: 0 } });
    s.addText(ft[0], { x: 0.95, y: fy - 0.08, w: 5.5, h: 0.4, fontSize: 15, bold: true, color: C.navyText, fontFace: F.h, align: "left", valign: "top", margin: 0 });
    s.addText(ft[1], { x: 0.95, y: fy + 0.34, w: 5.55, h: 1.05, fontSize: 12.5, color: C.body, fontFace: F.b, align: "left", valign: "top", lineSpacingMultiple: 1.16, margin: 0 });
    fy += 1.6;
  });

  // right chart: payment terms (days)
  s.addText("Ödeme vadesi (gün)", { x: 7.0, y: 1.85, w: 5.7, h: 0.4, fontSize: 14, bold: true, color: C.navyText, fontFace: F.h, align: "left", valign: "middle", margin: 0 });
  s.addChart(pres.charts.BAR, [{ name: "vade", labels: ["Sözleşme", "2024 ort.", "2025 ort.", "2024 max"], values: [30, 51, 80, 129] }], {
    x: 7.0, y: 2.3, w: 5.7, h: 3.7, barDir: "col",
    chartColors: [C.teal],
    chartArea: { fill: { color: "FFFFFF" } },
    catAxisLabelColor: C.body, valAxisLabelColor: C.mute, catAxisLabelFontSize: 11,
    valGridLine: { color: C.hair, size: 0.5 }, catGridLine: { style: "none" },
    showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.navyText, dataLabelFontSize: 12, dataLabelFontBold: true,
    showLegend: false, showTitle: false, valAxisHidden: true, valAxisMaxVal: 145,
  });
  s.addText("Sözleşme 30 gün vadeli; DSO 30 → 80 güne çıktı, %1/ay gecikme faizi hakkıyla birleşir.", { x: 7.0, y: 6.08, w: 5.7, h: 0.55, fontSize: 11, italic: true, color: C.mute, fontFace: F.b, align: "left", valign: "top", lineSpacingMultiple: 1.1, margin: 0 });

  footer(s, "Ftr Kale fatura raporu (fatura/tahsilat, FIFO DSO); go-live takvimi Mind Map v5 §6, §10.", false);
  s.addNotes("Kâğıttaki plan ile sahadaki gerçeğin makası: geç go-live + geç ödeme. DSO 30→80, max 129. 2026 tahsilat %38 (öncü, tam yıl bitince kesinleşir — dürüst bayrak). Kaynak: fatura defteri.");
})();

// =========================================================
// SLIDE 7 — PERDE 5: HASARIN BİLANÇOSU (light) + damage chart
// =========================================================
(() => {
  const s = pres.addSlide(); bg(s, false);
  header(s, 5, "Hasarın bilançosu: gerçekleşen ~₺31,3M + risk altındaki motor", false);

  // left chart: damage decomposition
  s.addText("Gerçekleşen hasar (milyon ₺)", { x: 0.6, y: 1.8, w: 5.7, h: 0.4, fontSize: 14, bold: true, color: C.navyText, fontFace: F.h, align: "left", valign: "middle", margin: 0 });
  s.addChart(pres.charts.BAR, [{ name: "hasar", labels: ["Finansman\nçağlayanı", "Lisans\ngecikme kaybı"], values: [19.7, 11.6] }], {
    x: 0.6, y: 2.25, w: 5.7, h: 3.55, barDir: "col",
    chartColors: [C.coral],
    chartArea: { fill: { color: "FFFFFF" } },
    catAxisLabelColor: C.body, valAxisLabelColor: C.mute, catAxisLabelFontSize: 11.5,
    valGridLine: { color: C.hair, size: 0.5 }, catGridLine: { style: "none" },
    showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.navyText, dataLabelFontSize: 13, dataLabelFontBold: true, dataLabelFormatCode: "0.0",
    showLegend: false, showTitle: false, valAxisHidden: true, valAxisMaxVal: 24,
  });
  s.addText([
    { text: "Toplam ≈ ₺31,3M (~$777K)", options: { bold: true, color: C.coralDark } },
    { text: "   ·   inşa (NRE) emeği ~başabaş (−$16K)", options: { italic: true, color: C.mute } },
  ], { x: 0.6, y: 5.85, w: 5.9, h: 0.5, fontSize: 12.5, fontFace: F.b, align: "left", valign: "top", margin: 0 });

  // right: layered breakdown cards
  card(s, 6.6, 1.8, 6.1, 4.55, false);
  const rows = [
    ["İnşa (NRE) emeği", "~başabaş (−$16K)", "Kale NRE'yi maliyet+sermaye seviyesinde ödedi → hasar emekte değil."],
    ["Finansman çağlayanı", "~₺19,7M (~$500K)", "gecikme zammı ₺15,48M + banka ₺2,67M + teşvik ~₺1,5M (T2)"],
    ["Lisans (kâr motoru)", "−₺11,6M gecikme", "planlı ₺18,05M − fiili ₺6,43M; kalıcı kapanan ₺3,12M; erime −$92,5K"],
    ["İleriye-dönük motor", "~$1,04M/yıl", "tekrarlayan lisans gecikmiş/eriyor — risk altında"],
  ];
  let ry = 2.05;
  rows.forEach((r, i) => {
    s.addText(r[0], { x: 6.9, y: ry, w: 2.55, h: 0.95, fontSize: 13, bold: true, color: C.navyText, fontFace: F.b, align: "left", valign: "middle", lineSpacingMultiple: 1.05, margin: 0 });
    s.addText(r[1], { x: 9.5, y: ry, w: 3.0, h: 0.45, fontSize: 14.5, bold: true, color: i === 0 ? C.tealDark : (i === 3 ? C.tealDark : C.coralDark), fontFace: F.h, align: "left", valign: "middle", margin: 0 });
    s.addText(r[2], { x: 9.5, y: ry + 0.42, w: 3.0, h: 0.55, fontSize: 10.5, color: C.mute, fontFace: F.b, align: "left", valign: "top", lineSpacingMultiple: 1.05, margin: 0 });
    if (i < rows.length - 1) s.addShape(pres.shapes.LINE, { x: 6.9, y: ry + 1.05, w: 5.5, h: 0, line: { color: C.hair, width: 0.75 } });
    ry += 1.12;
  });

  footer(s, "Mizan 689.01.001 / 780 / 750; sözleşme Tablo-8 (planlı); Ftr (fiili lisans); KaleChangeMngmnt; Mind Map v5 §18–§22.", false);
  s.addNotes("Entegre harita. Kritik: inşa ~başabaş → hasar emekte DEĞİL. İki çağlayan: (a) finansman ₺19,7M (gecikme zammı 689'da gizliydi), (b) lisans −₺11,6M. Toplam gerçekleşen ~₺31,3M + $1,04M/yıl motor risk. Çift-sayma yok (maliyet vs kazanılmamış gelir). Kaynak: mizan + sözleşme + fatura.");
})();

// =========================================================
// SLIDE 8 — PERDE 6: KARAKTER / REZERV HAKLAR (light)
// =========================================================
(() => {
  const s = pres.addSlide(); bg(s, false);
  header(s, 6, "Karakter: hakkımız olanı kullanmadık", false);

  s.addText("Sözleşme ARDIÇ'a güçlü haklar verdi. İyi niyet, dürüstlük ve karşılıklı fayda düsturuyla hiçbirini işletmedik — açığı kendimiz absorbe ettik.", { x: 0.6, y: 1.65, w: 12.1, h: 0.6, fontSize: 15, color: C.body, lineSpacingMultiple: 1.12, fontFace: F.b, align: "left", valign: "top", margin: 0 });

  const cy = 2.5, ch = 1.78, cw = 6.0, gx = 0.17, gy = 0.18, x0 = 0.6;
  const rights = [
    ["Standby ödemesi  ·  md.3.6", "₺485.483/ay", "Kale-duruşunun 2. ayından. 6-ay senaryosu ~₺2,9M [T3 — duruş-ayı varsayımı]. Talep edilmedi."],
    ["Gecikme faizi  ·  md.3.11", "₺0,31M", "%1/ay; FIFO-hesaplı hak ediş (fatura %66'sı 30+ gün geç). Faturalanmadı [T1]."],
    ["Erken fesih tazminatı  ·  md.11.1", "3 aylık ödeme tam", "ARDIÇ kusursuz fesihte — kullanılmadı."],
    ["Delil sözleşmesi  ·  md.14 (HMK 193)", "Kesin delil", "ARDIÇ kayıtları bağlayıcı; hukukçu yazılı teyidi gerekli."],
  ];
  rights.forEach((r, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = x0 + col * (cw + gx), y = cy + row * (ch + gy);
    card(s, x, y, cw, ch, false);
    s.addText(r[0], { x: x + 0.3, y: y + 0.22, w: cw - 0.6, h: 0.4, fontSize: 13, bold: true, color: C.navyText, fontFace: F.b, align: "left", valign: "middle", margin: 0 });
    s.addText(r[1], { x: x + 0.3, y: y + 0.6, w: cw - 0.6, h: 0.55, fontSize: 22, bold: true, color: C.teal, fontFace: F.h, align: "left", valign: "middle", margin: 0 });
    s.addText(r[2], { x: x + 0.3, y: y + 1.18, w: cw - 0.6, h: 0.5, fontSize: 11.5, color: C.mute, fontFace: F.b, align: "left", valign: "top", lineSpacingMultiple: 1.08, margin: 0 });
  });

  s.addText([
    { text: "İyi olmanın, dürüst olmanın bizi getirdiği nokta bu. ", options: { bold: true, color: C.tealDark } },
    { text: "Karşınızdaki, hakkını kullanmak yerine üretmeyi ve karşılıklı faydayı seçen ortaktır.", options: { italic: true } },
  ], { x: 0.6, y: 6.42, w: 12.1, h: 0.5, fontSize: 13.5, color: C.body, fontFace: F.b, align: "left", valign: "middle", margin: 0 });

  footer(s, "SCL md.3.6/3.11/11.1/14; §3.11 ₺0,31M FIFO ile fatura defterinden hesaplandı (bu oturum); §3.6 kümülatifi duruş-ayı varsayımına bağlı [T3]; md.14 hukukçu teyidi gerekli.", false);
  s.addNotes("Karakter slaytı — distress'i kaldıraca çevirir. Mesaj: bu hakları HİÇ kullanmadık (₺0). Standby/%1-ay tutarları fatura defterinden birebir hesaplanabilir (rapor öncesi kesinleştir). Sözlü olarak burada şahsi enjeksiyon/ekip fedakârlığı candan anlatılabilir; YAZIYA geçmez. Kaynak: sözleşme maddeleri.");
})();

// =========================================================
// SLIDE 9 — PERDE 7: SÜRDÜRÜLEMEZLİK (light)
// =========================================================
(() => {
  const s = pres.addSlide(); bg(s, false);
  header(s, 7, "Bu model sürdürülemez — absorbe mekanizması tükendi", false);

  s.addText([
    { text: "ARDIÇ iflas etmedi: TTK 376 temiz, özsermaye ~₺213M (eşik ₺3,24M). ", options: { bold: true, color: C.navyText } },
    { text: "Sorun bilançoda değil — Kale gecikmesini absorbe eden dört kaldıracın dördü de tükendi/bozuldu.", options: {} },
  ], { x: 0.6, y: 1.6, w: 12.1, h: 0.6, fontSize: 14.5, color: C.body, lineSpacingMultiple: 1.12, fontFace: F.b, align: "left", valign: "top", margin: 0 });

  const cy = 2.35, ch = 2.0, cw = 2.95, gap = 0.13, x0 = 0.6;
  const levers = [
    ["Kurucu sermayesi", "₺30,89M", "sonlu · şahsi", "Şahsi enjeksiyon. Bir kurucu müşteri gecikmesini sonsuza dek fonlayamaz."],
    ["Ertelenen ücretler", "~36 → 17", "attrition'la kırıldı", "İİK 206 ₺4,11M / içsel ~₺10,2M. Platformu kuran ekip eriyor — geri dönülemez."],
    ["Devlet ceza-borcu", "₺15,48M", "bileşik büyüyor", "Geç vergi/SGK'nın gecikme zammı (2025). Finansman değil — değer imhası."],
    ["Tahsilat runway'i", "%100 → %38", "2026 trendi", "Kendi kendini düzelten tek kaldıraç (eninde sonunda tahsilat) çalışmıyor."],
  ];
  levers.forEach((lv, i) => {
    const x = x0 + i * (cw + gap);
    card(s, x, cy, cw, ch, false);
    s.addText(lv[0], { x: x + 0.25, y: cy + 0.2, w: cw - 0.5, h: 0.35, fontSize: 12.5, bold: true, color: C.navyText, fontFace: F.b, align: "left", valign: "middle", margin: 0 });
    s.addText(lv[1], { x: x + 0.25, y: cy + 0.56, w: cw - 0.5, h: 0.5, fontSize: 21, bold: true, color: C.coralDark, fontFace: F.h, align: "left", valign: "middle", margin: 0 });
    s.addText(lv[2], { x: x + 0.25, y: cy + 1.06, w: cw - 0.5, h: 0.3, fontSize: 10.5, italic: true, color: C.coral, fontFace: F.b, align: "left", valign: "middle", margin: 0 });
    s.addText(lv[3], { x: x + 0.25, y: cy + 1.36, w: cw - 0.5, h: 0.6, fontSize: 10.5, color: C.mute, fontFace: F.b, align: "left", valign: "top", lineSpacingMultiple: 1.08, margin: 0 });
  });

  card(s, 0.6, 4.55, 12.1, 0.95, false);
  s.addText([
    { text: "Yapısal not. ", options: { bold: true, color: C.tealDark } },
    { text: "₺213M özsermaye nakit değil — büyük ölçüde kapitalize Ar-Ge'ye dayalı (opex \"patlaması\" = amortisman). SGK'yı ödeyemez. Kâğıtta ödeme-gücü ≠ nakitte absorbe-kapasitesi.", options: {} },
  ], { x: 0.95, y: 4.7, w: 11.4, h: 0.65, fontSize: 13, color: C.body, lineSpacingMultiple: 1.12, fontFace: F.b, align: "left", valign: "middle", margin: 0 });

  s.addText([
    { text: "Sonuç: ", options: { bold: true, color: C.navyText } },
    { text: "Dört kaldıraç sonlu/bozuk + ceza bileşik büyüyor + emek geri-dönülemez gidiyor → ARDIÇ bu kayıpları tek başına absorbe ederek devam edemez. Bu bilanço çökmesi değil, ", options: {} },
    { text: "mekanizma tükenmesi", options: { bold: true, color: C.tealDark } },
    { text: ".", options: {} },
  ], { x: 0.6, y: 5.7, w: 12.1, h: 0.95, fontSize: 14, color: C.body, lineSpacingMultiple: 1.16, fontFace: F.b, align: "left", valign: "top", margin: 0 });

  footer(s, "31.12.2025 bilanço (TTK 376, özsermaye); mizan 689.01.001; ortak kredi ₺30,89M; headcount serisi; tahsilat Mind Map v5 §10.", false);
  s.addNotes("Pivot slaytı. Çerçeve KRİTİK: iddia solvency değil — mekanizma tükenmesi (TTK 376/5-mercek ile tutarlı). Dört kaldıracın dördü de bitti. ₺213M özsermaye likit değil (kapitalize Ar-Ge). %38 öncü gösterge. Buradan Perde 8'e (NewCo) köprü. Kaynak: bilanço + mizan + headcount.");
})();

// =========================================================
// SLIDE 10 — PERDE 8: YAPISAL SONUÇ + YOL (dark)
// =========================================================
(() => {
  const s = pres.addSlide(); bg(s, true);
  header(s, 8, "Sonuç: model tavanında → ortak-sahiplik", true);

  s.addText([
    { text: "Tanı net: ", options: { bold: true, color: C.tealOnDark } },
    { text: "satıcı-müşteri ilişkisi, ARDIÇ tek başına absorbe ederken yapısal tavanına ulaştı. Ama varlık duruyor — ve değer hâlâ orada.", options: {} },
  ], { x: 0.6, y: 1.55, w: 12.1, h: 0.7, fontSize: 16, color: C.lightText, lineSpacingMultiple: 1.14, fontFace: F.b, align: "left", valign: "top", margin: 0 });

  const cy = 2.5, ch = 2.05, cw = 3.92, gap = 0.17, x0 = 0.6;
  const blocks = [
    ["Kanıtlanmış platform", "IoT-Ignite + ArMES + ArAI + CWF — Kale fabrikalarında canlı, çalışan dağıtım."],
    ["Tekrarlayan motor", "Tam yaygınlaşmada ~$1,04M/yıl + IRAQ ve yeni tesisler (Slab#2, Yerköy#2, Sinter#2) upside."],
    ["Yapısal müttefik", "Owner + LP üçgeni: işlemi finanse edebilecek hizalı sahiplik kanalı."],
  ];
  blocks.forEach((b, i) => {
    const x = x0 + i * (cw + gap);
    card(s, x, cy, cw, ch, true);
    s.addText(b[0], { x: x + 0.3, y: cy + 0.28, w: cw - 0.6, h: 0.5, fontSize: 16, bold: true, color: C.tealOnDark, fontFace: F.h, align: "left", valign: "top", lineSpacingMultiple: 1.02, margin: 0 });
    s.addText(b[1], { x: x + 0.3, y: cy + 0.92, w: cw - 0.6, h: 1.0, fontSize: 13, color: C.lightMute, fontFace: F.b, align: "left", valign: "top", lineSpacingMultiple: 1.18, margin: 0 });
  });

  s.addText([
    { text: "Yol: ", options: { bold: true, color: C.tealOnDark } },
    { text: "Değer artık satıcı-müşteri ilişkisiyle değil, ortak-sahiplikle (NewCo / JV) yakalanır. ARDIÇ'ın IP'si ve platformu, finansal olarak sürdürülebilir bir ortaklık yapısına yerleşir.", options: {} },
  ], { x: 0.6, y: 4.85, w: 12.1, h: 1.0, fontSize: 16, color: C.lightText, lineSpacingMultiple: 1.18, fontFace: F.b, align: "left", valign: "top", margin: 0 });

  footer(s, "Tam yaygınlaşma run-rate Mind Map v5 §7; platform/strateji Context Bootstrap v13 §1.", true);
  s.addNotes("Kapanış — yarada değil, gelecekte bitir. Tanı (model tavanı) → varlık duruyor (platform + $1,04M/yıl motor + owner/LP müttefik) → yol (NewCo/JV). Bu, broader deal'in (term sheet, ACT çıkışı) köprüsü. Kaynak: run-rate + strateji.");
})();

// =========================================================
// SLIDE 11 — APPENDIX: KANIT ARŞİVİ & KAYNAK MATRİSİ (light)
// =========================================================
(() => {
  const s = pres.addSlide(); bg(s, false);
  s.addText("Ek — Kanıt arşivi: her rakam kaynağa iner", { x: 0.6, y: 0.5, w: 12.1, h: 0.7, fontSize: 27, bold: true, color: C.navyText, fontFace: F.h, align: "left", valign: "middle", margin: 0 });
  s.addText("Beyan ≠ kanıt. Her başlık figürü adlandırılmış dosya/madde/hesaba inebilir; bu deck simetrik (LLM-destekli) incelemeye dayanacak şekilde kuruldu.", { x: 0.6, y: 1.28, w: 12.1, h: 0.5, fontSize: 13.5, color: C.body, fontFace: F.b, align: "left", valign: "top", margin: 0 });

  const head = (t) => ({ text: t, options: { bold: true, color: C.white, fill: { color: C.navy }, fontFace: F.b, align: "left", valign: "middle" } });
  const rows = [
    [head("Bulgu"), head("Değer"), head("Kaynak (dosya · madde/hesap) · TIER")],
    ["Toplam faturalanan (çıpa)", "$1.985.895", "Ftr fatura raporu · özet pivot (3 kaynak birebir) · T1"],
    ["2025 NRE bütçe kesintisi", "$1.214.349 → $578.414", "ReSCH revizyon dosyası · Kale anotasyonu r57/r58 · T1"],
    ["Skop-nötr lisans erimesi", "$919.350 → $826.801 (−$92.549)", "UPDATED Proj_SCOPE · KaleChangeMngmnt (3 snapshot) · T1"],
    ["Gecikme zammı (devlet cezası)", "₺15.483.298", "Mizan 31.12.2025 · 689.01.001 · T1"],
    ["§3.11 gecikme faizi hak edişi", "₺310.794 (~$7K)", "Ftr defteri · FIFO eşleştirme (açık bakiye ₺2,44M mutabık) · T1"],
    ["Lisans gecikme kaybı", "−₺11,6M (planlı 18,05M − fiili 6,43M)", "Sözleşme Tablo-8 (planlı) · Ftr (fiili) · T1"],
    ["Kale efor (toplam ↔ SCL-skop)", "Toplam ~439,9 ay (2021–26) · SCL-skop ~203,5 ay", "PrjTimes · çok-kodlu (Kale/ArMes/ArAI; IoT-Ignite hariç) · yeniden-türetilecek · T2"],
    ["Solvency testi", "Özsermaye ~₺213M vs eşik ₺3,24M", "31.12.2025 bilanço · TTK 376 · T1"],
  ];
  s.addTable(rows, {
    x: 0.6, y: 1.95, w: 12.1, colW: [3.7, 3.4, 5.0],
    rowH: 0.52, fontSize: 11.5, fontFace: F.b, color: C.body,
    valign: "middle", align: "left",
    border: { type: "solid", pt: 0.5, color: C.hair },
    fill: { color: "FFFFFF" },
    autoPage: false,
  });

  footer(s, "Mind Map v5 §23 (TIER/kaynak matrisi) — tam izlenebilirlik omurgası.", false);
  s.addNotes("Kanıt appendix'i. Her satır TIER1 (timesheet/sözleşme/mizan) ya da işaretli T2. Bu slayt, simetrik (Cemşit/Haluk/CSO LLM-destekli) incelemeye karşı 'arkası boş hiçbir şey yok' güvencesidir. Kaynak: §23 matrisi.");
})();

pres.writeFile({ fileName: "/home/claude/ARDIC_Kale_SCL_Master_Deck_v4.pptx" }).then((fn) => {
  console.log("WROTE", fn);
}).catch((e) => { console.error("ERR", e); process.exit(1); });
