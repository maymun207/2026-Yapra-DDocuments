const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.3 x 7.5
pres.author = "ARDICTECH";
pres.title = "Kale Yaygınlaştırma (SCL) — vaat, kayma ve değer";

// ---- palette ----
const C = {
  navy: "13233F", cardNavy: "1E3354", teal: "13A89E", tealDark: "0C7368", tealOnDark: "47D3C4",
  coral: "C76B4A", coralDark: "9A4E32", white: "FFFFFF", cardLight: "F3F5F9",
  navyText: "13233F", body: "414E5E", mute: "8A95A5", lightText: "EAEFF6", lightMute: "9DABC1", hair: "DCE2EA",
};
const F = { h: "Calibri", b: "Calibri" };
const makeShadow = () => ({ type: "outer", color: "0B1626", blur: 7, offset: 3, angle: 90, opacity: 0.12 });
const makeShadowDark = () => ({ type: "outer", color: "000000", blur: 8, offset: 3, angle: 90, opacity: 0.28 });

function bg(slide, dark) { slide.background = { color: dark ? C.navy : C.white }; }
function footer(slide, src, dark) {
  slide.addText([{ text: "Kaynak: ", options: { bold: true } }, { text: src }], {
    x: 0.6, y: 7.04, w: 9.7, h: 0.32, fontSize: 9, italic: true,
    color: dark ? "7E8CA3" : C.mute, fontFace: F.b, align: "left", margin: 0, valign: "middle",
  });
  slide.addText("ARDICTECH · Gizli", {
    x: 10.4, y: 7.04, w: 2.3, h: 0.32, fontSize: 9, italic: true,
    color: dark ? "7E8CA3" : C.mute, fontFace: F.b, align: "right", margin: 0, valign: "middle",
  });
}
function header(slide, n, title, dark) {
  slide.addShape(pres.shapes.OVAL, { x: 0.6, y: 0.52, w: 0.62, h: 0.62, fill: { color: dark ? C.tealOnDark : C.teal }, line: { width: 0 } });
  slide.addText(String(n), { x: 0.6, y: 0.52, w: 0.62, h: 0.62, fontSize: 22, bold: true, color: dark ? C.navy : C.white, align: "center", valign: "middle", fontFace: F.h, margin: 0 });
  slide.addText(title, { x: 1.45, y: 0.46, w: 11.25, h: 0.78, fontSize: 26, bold: true, color: dark ? C.lightText : C.navyText, align: "left", valign: "middle", fontFace: F.h, margin: 0 });
}
function card(slide, x, y, w, h, dark) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h, rectRadius: 0.09,
    fill: { color: dark ? C.cardNavy : C.cardLight },
    line: { color: dark ? C.cardNavy : C.hair, width: 0.75 },
    shadow: dark ? makeShadowDark() : makeShadow(),
  });
}

// =========================================================
// SLIDE 1 — KAPAK (dark)
// =========================================================
(() => {
  const s = pres.addSlide(); bg(s, true);
  s.addShape(pres.shapes.OVAL, { x: 10.7, y: -1.7, w: 4.4, h: 4.4, fill: { color: C.navy }, line: { color: C.tealOnDark, width: 1.25 } });
  s.addShape(pres.shapes.OVAL, { x: 0.6, y: 1.06, w: 0.34, h: 0.34, fill: { color: C.tealOnDark }, line: { width: 0 } });
  s.addText("ARDICTECH · Kale Yaygınlaştırma (SCL)", { x: 1.05, y: 1.0, w: 9, h: 0.45, fontSize: 14, bold: true, color: C.tealOnDark, charSpacing: 2, fontFace: F.b, align: "left", valign: "middle", margin: 0 });
  s.addText("Kale Yaygınlaştırma Sözleşmesi:\nvaat, kayma ve değer", { x: 1.0, y: 2.0, w: 11.3, h: 2.0, fontSize: 44, bold: true, color: C.lightText, lineSpacingMultiple: 1.02, fontFace: F.h, align: "left", valign: "middle", margin: 0 });
  s.addText("İmzadan (15 Ağustos 2024) bugüne — sözleşmenin yapısı, Kale-kaynaklı takvim kayması ve kâr motorunun durumu. Her rakam kaynağa izli.", { x: 1.0, y: 4.25, w: 10.8, h: 0.95, fontSize: 16, color: C.lightMute, lineSpacingMultiple: 1.15, fontFace: F.b, align: "left", valign: "top", margin: 0 });
  s.addText("Haziran 2026", { x: 1.0, y: 6.55, w: 4, h: 0.4, fontSize: 13, color: C.lightMute, fontFace: F.b, align: "left", valign: "middle", margin: 0 });
  s.addText("Gizli · Kale Group ile paylaşım için", { x: 6.0, y: 6.55, w: 6.7, h: 0.4, fontSize: 11, italic: true, color: "7E8CA3", fontFace: F.b, align: "right", valign: "middle", margin: 0 });
  s.addNotes("Açılış: bu sözleşmenin imzadan bugüne yapısını, Kale-kaynaklı takvim kaymasını ve kâr motorunun (tekrarlayan lisans) durumunu anlatır. Tüm rakamlar kaynağa izli (Ek). Ton: suçlama değil — birlikte düzeltilecek yapısal bir durumu ortaya koymak.");
})();

// =========================================================
// SLIDE 2 — YÖNETİCİ ÖZETİ (dark)
// =========================================================
(() => {
  const s = pres.addSlide(); bg(s, true);
  s.addText("Yönetici özeti — tek bakışta", { x: 0.6, y: 0.5, w: 12.1, h: 0.7, fontSize: 30, bold: true, color: C.lightText, fontFace: F.h, align: "left", valign: "middle", margin: 0 });
  s.addText("ARDIÇ, Kale çözümünü maliyet seviyesinde kurdu; kâr tekrarlayan lisanstan gelecekti. Kale-kaynaklı takvim kayması bu motoru vurdu — skop daralmadı, büyüdü.", { x: 0.6, y: 1.32, w: 12.0, h: 0.7, fontSize: 16, color: C.lightMute, lineSpacingMultiple: 1.12, fontFace: F.b, align: "left", valign: "top", margin: 0 });

  const cy = 2.45, cw = 2.86, gap = 0.18, cx0 = 0.6, ch = 2.0;
  const items = [
    ["$2,46M + $1,04M/yıl", "Sözleşmenin değeri", "tek-seferlik NRE + tekrarlayan lisans (kâr motoru)"],
    ["~$1,5M", "Gecikmiş / risk altında", "sözleşme-planı vs fiili lisans (2025–26)"],
    ["+71.249 ₺/ay", "Skop büyüdü, daralmadı", "2.233.541 → 2.304.790 ₺/ay aylık lisans"],
    ["₺0", "İşlettiğimiz ceza hakkı", "standby + %1/ay + fesih: hiçbiri kullanılmadı"],
  ];
  items.forEach((it, i) => {
    const x = cx0 + i * (cw + gap);
    card(s, x, cy, cw, ch, true);
    s.addText(it[0], { x: x + 0.25, y: cy + 0.22, w: cw - 0.5, h: 0.72, fontSize: 23, bold: true, color: C.tealOnDark, fontFace: F.h, align: "left", valign: "middle", margin: 0 });
    s.addText(it[1], { x: x + 0.25, y: cy + 0.95, w: cw - 0.5, h: 0.4, fontSize: 14, bold: true, color: C.lightText, fontFace: F.b, align: "left", valign: "middle", margin: 0 });
    s.addText(it[2], { x: x + 0.25, y: cy + 1.34, w: cw - 0.5, h: 0.55, fontSize: 11.5, color: C.lightMute, fontFace: F.b, align: "left", valign: "top", lineSpacingMultiple: 1.05, margin: 0 });
  });

  card(s, 0.6, 4.78, 12.1, 1.55, true);
  s.addText([
    { text: "Sonuç. ", options: { bold: true, color: C.tealOnDark } },
    { text: "İnşa (NRE) maliyet seviyesinde fiyatlandı; ARDIÇ'ın getirisi 3 yıllık tekrarlayan lisanstan gelecekti. ", options: {} },
    { text: "Kale-kaynaklı gecikme tam da bu motoru", options: { bold: true } },
    { text: " geciktirdi/erotti. Değer gerçek ve sürüyor; doğru yapı onu satıcı-müşteri ilişkisiyle değil, ", options: {} },
    { text: "ortak-sahiplikle (NewCo/JV)", options: { bold: true, color: C.tealOnDark } },
    { text: " yakalar.", options: {} },
  ], { x: 0.95, y: 4.95, w: 11.4, h: 1.25, fontSize: 15, color: C.lightText, lineSpacingMultiple: 1.18, fontFace: F.b, align: "left", valign: "middle", margin: 0 });

  footer(s, "Sentez — bu deck'in Perde 1–7 + Ek kanıtları; sözleşme Tablo-8, Kale revizyon dosyası, fatura defteri.", true);
  s.addNotes("Tek slaytta tüm tez. Vurgu sırası: (1) inşa maliyetine kuruldu → getiri lisanstaydı, (2) gecikme tam o motoru vurdu, (3) skop büyüdü (kayıp fabrika değil), (4) ₺0 ceza = iyi niyet → NewCo. Sözleşme değeri = $2,46M NRE + $1,04M/yıl lisans.");
})();

// =========================================================
// SLIDE 3 — PERDE 1: VAAT (light)
// =========================================================
(() => {
  const s = pres.addSlide(); bg(s, false);
  header(s, 1, "Vaat: ne imzaladık", false);

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

  card(s, 6.85, 1.7, 5.85, 4.95, false);
  s.addText("Stratejik kurgu", { x: 7.2, y: 1.95, w: 5.15, h: 0.45, fontSize: 17, bold: true, color: C.navyText, fontFace: F.h, align: "left", valign: "middle", margin: 0 });
  s.addText([
    { text: "NRE ≈ maliyet.", options: { bold: true, breakLine: true, color: C.navyText } },
    { text: "Geliştirme/kurulum hak edişi maliyet seviyesinde fiyatlandı; inşadan kâr beklenmiyordu.", options: { breakLine: true } },
    { text: " ", options: { breakLine: true, fontSize: 6 } },
    { text: "Kâr lisanstaydı.", options: { bold: true, breakLine: true, color: C.navyText } },
    { text: "ARDIÇ'ın geri dönüşü, 3 yıl boyunca akacak tekrarlayan lisanstan (~$1,04M/yıl) gelecekti.", options: { breakLine: true } },
    { text: " ", options: { breakLine: true, fontSize: 6 } },
    { text: "Sonuç (ileride):", options: { bold: true, breakLine: true, color: C.tealDark } },
    { text: "Lisansı geciktiren ya da eroten herhangi bir şey, doğrudan ARDIÇ'ın tek kâr kaynağını vurur. İki-katmanlı durumun kökü burada.", options: {} },
  ], { x: 7.2, y: 2.55, w: 5.15, h: 3.9, fontSize: 13.5, color: C.body, lineSpacingMultiple: 1.16, fontFace: F.b, align: "left", valign: "top", margin: 0 });

  footer(s, "İmzalı SCL sözleşmesi md.2.3 / 3.1–3.4, Tablo-4 ve Tablo-8.", false);
  s.addNotes("Kontrat iki bileşenli: tek-seferlik NRE + tekrarlayan lisans, 3 yıllık YENİLENMEYEN pencerede. Kilit içgörü: NRE maliyetine fiyatlandı; kâr lisanstaydı. Bu, sonraki kayma slaytlarının kurgusunu kurar.");
})();

// =========================================================
// SLIDE 4 — KONTRAT KRONOLOJİSİ (light)
// =========================================================
(() => {
  const s = pres.addSlide(); bg(s, false);
  s.addText("Kontrat kronolojisi — vaadin hukuki soyağacı", { x: 0.6, y: 0.5, w: 12.1, h: 0.7, fontSize: 27, bold: true, color: C.navyText, fontFace: F.h, align: "left", valign: "middle", margin: 0 });
  s.addText("Dört imza, tek çerçevede toplandı. Her tarih kaynağa izli; SCL imzası 15 Ağustos 2024'te sabit.", { x: 0.6, y: 1.26, w: 12.1, h: 0.5, fontSize: 13.5, color: C.body, fontFace: F.b, align: "left", valign: "top", margin: 0 });

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

  footer(s, "İmzalı sözleşmeler: Faz1 (19.08.2022) · EK Protokol-3 (11.12.2023) · Faz2 (07.05.2024) · SCL Çerçeve (15.08.2024); süre md.2.3.", false);
  s.addNotes("Kontrat soyağacı, kaynak-kesin tarihlerle. Faz1=19.08.2022, Faz1.5=11.12.2023, Faz2=07.05.2024, SCL=15.08.2024. SCL hepsini EK-1..4 olarak topluyor. Çerçeve metni Eyl-24 planlı başlangıç + ödemelerin 2025'e ötelenmesini kendi yazıyor.");
})();

// =========================================================
// SLIDE 5 — PERDE 2: KAYMA (light) + revize chart
// =========================================================
(() => {
  const s = pres.addSlide(); bg(s, false);
  header(s, 2, "Kayma: Kale içeriği ve bütçeyi nasıl değiştirdi", false);

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

  footer(s, "Kale revizyon dosyası (kendi anotasyonu, Eki-2024); güncel skop 'Surecler' tablosu.", false);
  s.addNotes("Kale kendi dosyasında 2025'i $1,21M→$578K kıstı. Vurgula: skop DARALMADI, büyüdü (2,23→2,30M ₺/ay) — 'kayıp fabrika' itirazı peşinen kapanır. ARDIÇ revize-planı tutturdu (fiili≈revize). Kaynak: Kale'nin kendi revizyon dosyası.");
})();

// =========================================================
// SLIDE 6 — PERDE 3: ÜÇ KANIT AKIŞI (light)
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

  footer(s, "Kale revizyon dosyası; Kale 'KaleChangeMngmnt' lisans snapshot'ı (3 tarihli) ve 'Waiting for' donanım listesi.", false);
  s.addNotes("Üç akış birbirinden bağımsız ve hepsi Kale-belgeli. Kanıt 2 (skop-nötr erime) çekirdek: aynı tesis seti, sadece zaman değişti → karşı taraf çürütemez. Kanıt 1 nedeni, Kanıt 3 mekanizmayı verir.");
})();

// =========================================================
// SLIDE 7 — PERDE 4: EXECUTION GERÇEĞİ (light) + DSO chart
// =========================================================
(() => {
  const s = pres.addSlide(); bg(s, false);
  header(s, 4, "Execution gerçeği: kâğıt vs saha", false);

  const facts = [
    ["Geç devreye-alma", "Faz2 lisans ~6 ay overrun (Eki-2025); Granit Oca-2026; KB7 Mar-2026 (1/3-eksik). Donanım bekleyen tesisler hâlâ lisansa geçemiyor."],
    ["Geç ödeme", "Sözleşme vadesi 30 gün → fiilen ortalama 51 → 80 gün, maksimum 129 gün. 2026 ödemeleri vade gerisinde seyrediyor."],
    ["Lisansa geçemeyen tesisler", "Granit ikincil (Faz4), Granit Masse, YK Masse, KB7 ikincil, KB3 — hepsi Kale donanım/montaj gecikmesi."],
  ];
  let fy = 1.85;
  facts.forEach((ft) => {
    s.addShape(pres.shapes.OVAL, { x: 0.6, y: fy + 0.05, w: 0.16, h: 0.16, fill: { color: C.teal }, line: { width: 0 } });
    s.addText(ft[0], { x: 0.95, y: fy - 0.08, w: 5.5, h: 0.4, fontSize: 15, bold: true, color: C.navyText, fontFace: F.h, align: "left", valign: "top", margin: 0 });
    s.addText(ft[1], { x: 0.95, y: fy + 0.34, w: 5.55, h: 1.05, fontSize: 12.5, color: C.body, fontFace: F.b, align: "left", valign: "top", lineSpacingMultiple: 1.16, margin: 0 });
    fy += 1.6;
  });

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
  s.addText("Sözleşme 30 gün vadeli; fiili ödeme vadesi 30 → 80 güne çıktı (md.3.11 %1/ay gecikme faizi hakkıyla birleşir).", { x: 7.0, y: 6.08, w: 5.7, h: 0.55, fontSize: 11, italic: true, color: C.mute, fontFace: F.b, align: "left", valign: "top", lineSpacingMultiple: 1.1, margin: 0 });

  footer(s, "Fatura defteri (fatura/tahsilat, FIFO vade); go-live takvimi sözleşme Tablo-8 + güncel skop.", false);
  s.addNotes("Kâğıttaki plan ile sahadaki gerçeğin makası: geç go-live + geç ödeme. DSO 30→80, max 129. 2026 ödemeleri vade gerisinde. Çerçeve: Kale ödeme davranışı, ARDIÇ tarafı değil.");
})();

// =========================================================
// SLIDE 8 — PERDE 5: KÂR MOTORU (light) — forward-looking, rakamsız iç-hasar
// =========================================================
(() => {
  const s = pres.addSlide(); bg(s, false);
  header(s, 5, "Gecikmenin vurduğu yer: kâr motoru", false);

  s.addText([
    { text: "İnşa (NRE) maliyet seviyesinde fiyatlandı — ARDIÇ'ın getirisi tekrarlayan lisanstan gelecekti. ", options: { bold: true, color: C.navyText } },
    { text: "Kale-kaynaklı gecikme ve erime tam da bu motoru vurdu.", options: {} },
  ], { x: 0.6, y: 1.6, w: 12.1, h: 0.6, fontSize: 15, color: C.body, lineSpacingMultiple: 1.14, fontFace: F.b, align: "left", valign: "top", margin: 0 });

  const cy = 2.45, ch = 2.05, cw = 3.92, gap = 0.17, x0 = 0.6;
  const blocks = [
    ["$1,04M/yıl", "Tam yaygınlaşma motoru", "tekrarlayan lisans — gecikti, sabit 3-yıl penceresinde geri gelmeyen aylar"],
    ["~$1,5M", "Gecikmiş / risk altında", "2025–26 sözleşme-planı vs fiili lisans akışı arasındaki fark"],
    ["−$92.549", "Skop-nötr erime", "Kale'nin kendi snapshot'ı: aynı tesis seti, 2026'da −%10,1"],
  ];
  blocks.forEach((b, i) => {
    const x = x0 + i * (cw + gap);
    card(s, x, cy, cw, ch, false);
    s.addText(b[0], { x: x + 0.3, y: cy + 0.25, w: cw - 0.6, h: 0.6, fontSize: 30, bold: true, color: C.teal, fontFace: F.h, align: "left", valign: "middle", margin: 0 });
    s.addText(b[1], { x: x + 0.3, y: cy + 0.92, w: cw - 0.6, h: 0.4, fontSize: 14, bold: true, color: C.navyText, fontFace: F.b, align: "left", valign: "middle", margin: 0 });
    s.addText(b[2], { x: x + 0.3, y: cy + 1.32, w: cw - 0.6, h: 0.65, fontSize: 11.5, color: C.mute, fontFace: F.b, align: "left", valign: "top", lineSpacingMultiple: 1.12, margin: 0 });
  });

  card(s, 0.6, 4.85, 12.1, 1.55, false);
  s.addText([
    { text: "Mekanizma. ", options: { bold: true, color: C.tealDark } },
    { text: "NRE'den kâr beklenmiyordu; kâr 3 yıl boyunca akacak lisanstan gelecekti. Lisansı geciktiren/eroten her şey doğrudan ARDIÇ'ın tek getiri kaynağını vurur — pencere sabit ve yenilenmez olduğu için ", options: {} },
    { text: "kaybedilen aylar geri gelmez", options: { bold: true, color: C.navyText } },
    { text: ". Bu, \"kayıp fabrika\" değil; geciken devreye-almanın sabit pencerede yarattığı kalıcı motor kaybıdır.", options: {} },
  ], { x: 0.95, y: 5.02, w: 11.4, h: 1.25, fontSize: 13.5, color: C.body, lineSpacingMultiple: 1.18, fontFace: F.b, align: "left", valign: "middle", margin: 0 });

  footer(s, "Sözleşme Tablo-8 (planlı lisans) + güncel skop run-rate; Kale 'KaleChangeMngmnt' lisans snapshot'ı (skop-nötr erime).", false);
  s.addNotes("Forward-looking çerçeve: gecikme kâr motorunu (tekrarlayan lisans) vurdu. Üç figür de kaldıraç/dış-kaynak: motor $1,04M/yıl, gecikmiş değer ~$1,5M, Kale'nin kendi snapshot erimesi −$92,5K. Vurgu: pencere sabit+yenilenmez → kaybedilen ay geri gelmez. 'Kayıp fabrika' değil, geciken devreye-alma.");
})();

// =========================================================
// SLIDE 9 — PERDE 6: KARAKTER / REZERV HAKLAR (light) — rakamsız
// =========================================================
(() => {
  const s = pres.addSlide(); bg(s, false);
  header(s, 6, "Karakter: hakkımız olanı kullanmadık", false);

  s.addText("Sözleşme ARDIÇ'a güçlü haklar verdi. İyi niyet, dürüstlük ve karşılıklı fayda düsturuyla hiçbirini işletmedik — sonuca ulaşmayı seçtik.", { x: 0.6, y: 1.65, w: 12.1, h: 0.6, fontSize: 15, color: C.body, lineSpacingMultiple: 1.12, fontFace: F.b, align: "left", valign: "top", margin: 0 });

  // big ₺0 anchor on the left
  card(s, 0.6, 2.45, 3.4, 4.05, false);
  s.addText("₺0", { x: 0.85, y: 3.1, w: 2.9, h: 1.1, fontSize: 72, bold: true, color: C.teal, fontFace: F.h, align: "center", valign: "middle", margin: 0 });
  s.addText("İşlettiğimiz sözleşmesel hak", { x: 0.85, y: 4.25, w: 2.9, h: 0.5, fontSize: 14, bold: true, color: C.navyText, fontFace: F.b, align: "center", valign: "top", lineSpacingMultiple: 1.1, margin: 0 });
  s.addText("Talep, faiz, tazminat — hiçbiri faturalanmadı.", { x: 0.85, y: 4.85, w: 2.9, h: 0.8, fontSize: 12, color: C.mute, fontFace: F.b, align: "center", valign: "top", lineSpacingMultiple: 1.15, margin: 0 });

  // four rights, names only (no amounts)
  const cy = 2.45, ch = 1.93, cw = 4.28, gx = 0.17, gy = 0.18, x0 = 4.25;
  const rights = [
    ["Standby ödemesi  ·  md.3.6", "Kale-kaynaklı duruşta talep edilebilirdi — edilmedi."],
    ["Gecikme faizi  ·  md.3.11", "%1/ay; faturaların önemli kısmı 30+ gün geç ödendi. Faturalanmadı."],
    ["Erken fesih tazminatı  ·  md.11.1", "ARDIÇ'ın kusursuz feshinde hak; kullanılmadı."],
    ["Delil sözleşmesi  ·  md.14 (HMK 193)", "ARDIÇ kayıtları kesin delil; işletilmedi."],
  ];
  rights.forEach((r, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = x0 + col * (cw + gx), y = cy + row * (ch + gy);
    card(s, x, y, cw, ch, false);
    s.addText(r[0], { x: x + 0.28, y: y + 0.28, w: cw - 0.56, h: 0.45, fontSize: 13.5, bold: true, color: C.navyText, fontFace: F.b, align: "left", valign: "middle", margin: 0 });
    s.addText(r[1], { x: x + 0.28, y: y + 0.78, w: cw - 0.56, h: 0.95, fontSize: 12, color: C.body, fontFace: F.b, align: "left", valign: "top", lineSpacingMultiple: 1.15, margin: 0 });
  });

  footer(s, "SCL sözleşmesi md.3.6 / 3.11 / 11.1 / 14 (HMK 193).", false);
  s.addNotes("Karakter slaytı. Mesaj: bu hakların hiçbirini kullanmadık (₺0) — hakkını kullanmak yerine üretmeyi ve karşılıklı faydayı seçen bir ortak.");
})();

// =========================================================
// SLIDE 10 — PERDE 7: YAPISAL SONUÇ + YOL (dark)
// =========================================================
(() => {
  const s = pres.addSlide(); bg(s, true);
  header(s, 7, "Sonuç: model tavanında → ortak-sahiplik", true);

  s.addText([
    { text: "Tanı net: ", options: { bold: true, color: C.tealOnDark } },
    { text: "satıcı-müşteri ilişkisi yapısal tavanına ulaştı. Ama varlık duruyor — ve değer hâlâ orada.", options: {} },
  ], { x: 0.6, y: 1.55, w: 12.1, h: 0.7, fontSize: 16, color: C.lightText, lineSpacingMultiple: 1.14, fontFace: F.b, align: "left", valign: "top", margin: 0 });

  const cy = 2.5, ch = 2.05, cw = 3.92, gap = 0.17, x0 = 0.6;
  const blocks = [
    ["Kanıtlanmış platform", "IoT-Ignite + ArMES + ArAI + CWF — Kale fabrikalarında canlı, çalışan dağıtım."],
    ["Tekrarlayan motor", "Tam yaygınlaşmada ~$1,04M/yıl + IRAQ ve yeni tesisler (Slab#2, Yerköy#2, Sinter#2) upside."],
    ["Hizalı sahiplik", "İşlemi taşıyabilecek, uzun-vadeli düşünen sahiplik yapısı — ortaklık için zemin."],
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

  footer(s, "Tam yaygınlaşma run-rate sözleşme Tablo-8 + güncel skop; platform/strateji ARDICTECH.", true);
  s.addNotes("Kapanış — yarada değil, gelecekte bitir. Tanı (model tavanı) → varlık duruyor (platform + $1,04M/yıl motor + hizalı sahiplik) → yol (NewCo/JV). Bu, broader deal'in (term sheet) köprüsü.");
})();

// =========================================================
// SLIDE 11 — EK: KANIT ARŞİVİ (light)
// =========================================================
(() => {
  const s = pres.addSlide(); bg(s, false);
  s.addText("Ek — Kanıt arşivi: her rakam kaynağa iner", { x: 0.6, y: 0.5, w: 12.1, h: 0.7, fontSize: 27, bold: true, color: C.navyText, fontFace: F.h, align: "left", valign: "middle", margin: 0 });
  s.addText("Beyan ≠ kanıt. Her başlık figürü adlandırılmış dosya/madde/belgeye inebilir.", { x: 0.6, y: 1.28, w: 12.1, h: 0.5, fontSize: 13.5, color: C.body, fontFace: F.b, align: "left", valign: "top", margin: 0 });

  const head = (t) => ({ text: t, options: { bold: true, color: C.white, fill: { color: C.navy }, fontFace: F.b, align: "left", valign: "middle" } });
  const rows = [
    [head("Bulgu"), head("Değer"), head("Kaynak · TIER")],
    ["Sözleşme değeri (NRE + lisans)", "$2,46M + ~$1,04M/yıl", "İmzalı SCL md.3.1–3.4, Tablo-4/Tablo-8 · T1"],
    ["Toplam faturalanan (çıpa)", "$1.985.895", "Fatura defteri · özet pivot · T1"],
    ["2025 NRE bütçe kesintisi", "$1.214.349 → $578.414", "Kale revizyon dosyası · Kale anotasyonu · T1"],
    ["Skop-nötr lisans erimesi", "$919.350 → $826.801 (−$92.549)", "Kale 'KaleChangeMngmnt' (3 tarihli snapshot) · T1"],
    ["Skop büyümesi (run-rate)", "2.233.541 → 2.304.790 ₺/ay", "Sözleşme Tablo-8 + güncel skop · T1"],
    ["Ödeme vadesi", "30 → 80 gün (max 129)", "Fatura defteri · FIFO vade · T1"],
    ["Kale efor (toplam ↔ SCL-skop)", "~439,9 ay (2021–26) · SCL-skop ~203,5 ay", "PrjTimes · çok-kodlu (IoT-Ignite hariç) · yeniden-türetilecek · T2"],
  ];
  s.addTable(rows, {
    x: 0.6, y: 1.95, w: 12.1, colW: [3.9, 3.4, 4.8],
    rowH: 0.52, fontSize: 11.5, fontFace: F.b, color: C.body,
    valign: "middle", align: "left",
    border: { type: "solid", pt: 0.5, color: C.hair },
    fill: { color: "FFFFFF" },
    autoPage: false,
  });

  footer(s, "Tam izlenebilirlik omurgası — kaynak matrisi (talep üzerine madde-madde sunulabilir).", false);
  s.addNotes("Kanıt eki. Her satır TIER1 (sözleşme/fatura/Kale dosyası) ya da işaretli T2 (efor, yeniden-türetilecek). Simetrik incelemeye karşı 'arkası boş hiçbir şey yok' güvencesi.");
})();

pres.writeFile({ fileName: "/home/claude/ARDIC_Kale_SCL_Master_Deck_Kale_v1.pptx" }).then((fn) => {
  console.log("WROTE", fn);
}).catch((e) => { console.error("ERR", e); process.exit(1); });
