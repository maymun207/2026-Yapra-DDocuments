const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.author = "ARDICTECH";
pres.title = "Yaygınlaştırma — kalan 13 ayın planı (COO brifingi)";

const C = {
  navy: "13233F", cardNavy: "1E3354", teal: "13A89E", tealDark: "0C7368", tealOnDark: "47D3C4",
  amber: "D9A441", white: "FFFFFF", cardLight: "F3F5F9",
  navyText: "13233F", body: "414E5E", mute: "8A95A5", lightText: "EAEFF6", lightMute: "9DABC1", hair: "DCE2EA",
};
const F = { h: "Calibri", b: "Calibri" };
const sh = () => ({ type: "outer", color: "0B1626", blur: 7, offset: 3, angle: 90, opacity: 0.12 });
const shD = () => ({ type: "outer", color: "000000", blur: 8, offset: 3, angle: 90, opacity: 0.28 });
function bg(s, dark) { s.background = { color: dark ? C.navy : C.white }; }
function footer(s, src, dark) {
  s.addText([{ text: "Kaynak: ", options: { bold: true } }, { text: src }], {
    x: 0.6, y: 7.04, w: 9.7, h: 0.32, fontSize: 9, italic: true, color: dark ? "7E8CA3" : C.mute, fontFace: F.b, align: "left", margin: 0, valign: "middle" });
  s.addText("ARDICTECH · Gizli", { x: 10.4, y: 7.04, w: 2.3, h: 0.32, fontSize: 9, italic: true, color: dark ? "7E8CA3" : C.mute, fontFace: F.b, align: "right", margin: 0, valign: "middle" });
}
function header(s, n, title, dark) {
  s.addShape(pres.shapes.OVAL, { x: 0.6, y: 0.52, w: 0.62, h: 0.62, fill: { color: dark ? C.tealOnDark : C.teal }, line: { width: 0 } });
  s.addText(String(n), { x: 0.6, y: 0.52, w: 0.62, h: 0.62, fontSize: 22, bold: true, color: dark ? C.navy : C.white, align: "center", valign: "middle", fontFace: F.h, margin: 0 });
  s.addText(title, { x: 1.45, y: 0.46, w: 11.25, h: 0.78, fontSize: 26, bold: true, color: dark ? C.lightText : C.navyText, align: "left", valign: "middle", fontFace: F.h, margin: 0 });
}
function card(s, x, y, w, h, dark) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.09,
    fill: { color: dark ? C.cardNavy : C.cardLight }, line: { color: dark ? C.cardNavy : C.hair, width: 0.75 }, shadow: dark ? shD() : sh() });
}

// ============ SLIDE 1 — KAPAK (dark) ============
(() => {
  const s = pres.addSlide(); bg(s, true);
  s.addShape(pres.shapes.OVAL, { x: 10.7, y: -1.7, w: 4.4, h: 4.4, fill: { color: C.navy }, line: { color: C.tealOnDark, width: 1.25 } });
  s.addShape(pres.shapes.OVAL, { x: 0.6, y: 1.06, w: 0.34, h: 0.34, fill: { color: C.tealOnDark }, line: { width: 0 } });
  s.addText("ARDICTECH · Kale Seramik — Yaygınlaştırma (SCL)", { x: 1.05, y: 1.0, w: 9.5, h: 0.45, fontSize: 14, bold: true, color: C.tealOnDark, charSpacing: 2, fontFace: F.b, align: "left", valign: "middle", margin: 0 });
  s.addText("Kalan 13 ayın planı:\nkurulum bitti, sıra takvimde", { x: 1.0, y: 2.0, w: 11.3, h: 2.0, fontSize: 44, bold: true, color: C.lightText, lineSpacingMultiple: 1.02, fontFace: F.h, align: "left", valign: "middle", margin: 0 });
  s.addText("Yaygınlaştırma sözleşmesinin bugünkü fotoğrafı, sahadaki üç blokaj ve 90 günlük ortak hızlanma planı. Her rakam sözleşmeye ve ortak proje kayıtlarına izli.", { x: 1.0, y: 4.25, w: 10.8, h: 0.95, fontSize: 16, color: C.lightMute, lineSpacingMultiple: 1.15, fontFace: F.b, align: "left", valign: "top", margin: 0 });
  s.addText("Temmuz 2026 · COO brifingi", { x: 1.0, y: 6.55, w: 5, h: 0.4, fontSize: 13, color: C.lightMute, fontFace: F.b, align: "left", valign: "middle", margin: 0 });
  s.addText("Gizli · Kale Group ile paylaşım için", { x: 6.0, y: 6.55, w: 6.7, h: 0.4, fontSize: 11, italic: true, color: "7E8CA3", fontFace: F.b, align: "right", valign: "middle", margin: 0 });
  s.addNotes("Açılış tonu: geriye dönük hesap değil, ileriye dönük yürütme toplantısı. Tez tek cümle: sistem kurulu ve kanıtlı; kalan iş saha blokajlarının kapatılması ve takvim disiplini — ikisi de ortak irade işi.");
})();

// ============ SLIDE 2 — TEK BAKIŞTA: PENCERE SAATİ (dark) ============
(() => {
  const s = pres.addSlide(); bg(s, true);
  s.addText("Tek bakışta: pencere saati", { x: 0.6, y: 0.5, w: 12.1, h: 0.7, fontSize: 30, bold: true, color: C.lightText, fontFace: F.h, align: "left", valign: "middle", margin: 0 });
  s.addText("Sözleşme 3 yıllık ve otomatik yenilenmiyor. Takvim, işin kendisinden hızlı ilerliyor.", { x: 0.6, y: 1.3, w: 12.0, h: 0.5, fontSize: 16, color: C.lightMute, fontFace: F.b, align: "left", valign: "top", margin: 0 });

  const bars = [
    ["Geçen süre", 0.63, "%63", "15 Ağu 2024 → bugün · kalan 13,4 ay"],
    ["Yaygınlaştırma NRE ilerlemesi", 0.44, "%44", "$980.879 / $2,25M faturalandı"],
    ["Lisans (kâr motoru) devreye girişi", 0.14, "%14", "$98.698 / $688.385 — plan vs fiili (2026)"],
  ];
  let y = 2.15;
  bars.forEach(([label, pct, ptxt, sub]) => {
    s.addText(label, { x: 0.6, y: y, w: 6.5, h: 0.35, fontSize: 15, bold: true, color: C.lightText, fontFace: F.b, align: "left", valign: "middle", margin: 0 });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: y + 0.42, w: 10.0, h: 0.42, rectRadius: 0.05, fill: { color: C.cardNavy }, line: { width: 0 } });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: y + 0.42, w: Math.max(10.0 * pct, 0.5), h: 0.42, rectRadius: 0.05, fill: { color: pct > 0.5 ? C.amber : C.tealOnDark }, line: { width: 0 } });
    s.addText(ptxt, { x: 10.75, y: y + 0.38, w: 1.6, h: 0.5, fontSize: 22, bold: true, color: pct > 0.5 ? C.amber : C.tealOnDark, fontFace: F.h, align: "left", valign: "middle", margin: 0 });
    s.addText(sub, { x: 0.6, y: y + 0.9, w: 10.0, h: 0.3, fontSize: 11, italic: true, color: C.lightMute, fontFace: F.b, align: "left", valign: "top", margin: 0 });
    y += 1.42;
  });

  card(s, 0.6, 6.15, 12.1, 0.75, true);
  s.addText([
    { text: "Aritmetik: ", options: { bold: true, color: C.tealOnDark } },
    { text: "kalan $1,27M NRE'nin pencere içinde teslimi, bugüne kadarki temponun ", options: {} },
    { text: "2,2 katını", options: { bold: true, color: C.amber } },
    { text: " gerektiriyor. Bu tempo teknik olarak mümkün — koşulları bir sonraki sayfalarda.", options: {} },
  ], { x: 0.95, y: 6.2, w: 11.4, h: 0.65, fontSize: 14, color: C.lightText, fontFace: F.b, align: "left", valign: "middle", margin: 0 });
  footer(s, "SCL sözleşmesi (15.08.2024, md.2.3) · ortak fatura/proje kayıtları · 02.07.2026 itibarıyla.", true);
  s.addNotes("Üç bar tek hikâye: zaman > iş > getiri. %63-%44-%14 sırası kendi kendini anlatır. 2,2x tempo cümlesini tehdit değil hedef olarak ver: 'mümkün, ama ancak birlikte'.");
})();

// ============ SLIDE 3 — TESLİM KANITI (light) ============
(() => {
  const s = pres.addSlide(); bg(s, false);
  header(s, 1, "ARDIÇ tarafı teslim ediyor — kanıtlı", false);
  const items = [
    ["Granit canlı — tam lisans kilitli", "Ocak 2026'dan beri lisansta; ArCloud geçişi tamam. Ancak Faz4 donanım beklediği için tek-kalem lisansın ~1/4'ü faturalanamıyor."],
    ["Faz2 tesisleri lisansta", "Masse ve Sır Hazırlık üretimde; Ekim 2025'ten beri aylık lisans akışında."],
    ["KB3 + YK Masse: iş bitti, devreye giremiyor", "Geliştirme 2025'te tamamlandı ve faturalandı (~$336K); saha donanımı gelmediği için iki tesis de canlıya alınamıyor."],
    ["Slab / Faz3: yazılım ilerliyor, saha bekliyor", "Ocak 2026'da başladı, hakedişler akıyor; ilerleme sahadaki donanım teslimi ve kurulumlarına bağlı."],
    ["Revize plana sadakat", "Ekim 2024'te revize edilen 2025 planının %92'si teslim edildi ($531K / $578K)."],
    ["Kapsam büyüdü", "Aylık lisans tabanı 2.233.541 → 2.304.790 ₺: tesis listesi daralmadı, genişledi."],
  ];
  const cw = 3.93, ch = 1.62, gx = 0.15, gy = 0.22, x0 = 0.6, y0 = 1.75;
  items.forEach((it, i) => {
    const x = x0 + (i % 3) * (cw + gx), y = y0 + Math.floor(i / 3) * (ch + gy);
    card(s, x, y, cw, ch, false);
    s.addShape(pres.shapes.OVAL, { x: x + 0.22, y: y + 0.22, w: 0.3, h: 0.3, fill: { color: C.teal }, line: { width: 0 } });
    s.addText("✓", { x: x + 0.22, y: y + 0.2, w: 0.3, h: 0.3, fontSize: 14, bold: true, color: C.white, align: "center", valign: "middle", fontFace: F.b, margin: 0 });
    s.addText(it[0], { x: x + 0.62, y: y + 0.12, w: cw - 0.85, h: 0.6, fontSize: 13, bold: true, color: C.navyText, fontFace: F.h, align: "left", valign: "middle", lineSpacingMultiple: 0.98, margin: 0 });
    s.addText(it[1], { x: x + 0.25, y: y + 0.74, w: cw - 0.5, h: 0.82, fontSize: 10.5, color: C.body, lineSpacingMultiple: 1.08, fontFace: F.b, align: "left", valign: "top", margin: 0 });
  });
  card(s, 0.6, 5.5, 12.1, 1.15, false);
  s.addText([
    { text: "Anlamı: ", options: { bold: true, color: C.tealDark } },
    { text: "teknoloji riski masada değil; platform üretimde ve ekip sahada. Bugün lisans akışını sınırlayan ortak payda tek: ", options: {} },
    { text: "sahaya gelmeyen donanım ve kurulumlar.", options: { bold: true } },
  ], { x: 0.95, y: 5.62, w: 11.4, h: 0.9, fontSize: 15, color: C.body, lineSpacingMultiple: 1.15, fontFace: F.b, align: "left", valign: "middle", margin: 0 });
  footer(s, "Ortak fatura kayıtları 2025–2026 · revizyon dosyası (Ekim 2024) · go-live kayıtları.", false);
  s.addNotes("Bu sayfa güven sayfası: önce kendi teslimatımızı kanıtla, sonra blokaj iste. %92 revize-sadakat rakamı kritik — 'plan değişti, biz yine tutturduk'.");
})();

// ============ SLIDE 4 — ÜÇ SAHA GERÇEĞİ (light) ============
(() => {
  const s = pres.addSlide(); bg(s, false);
  header(s, 2, "Tempoyu tutan tek ortak payda: saha donanımı", false);
  const cols = [
    ["1 · Faz4 donanımı — Granit'in kilidi", "Granit ikincil işlemler (Faz4) sahadaki donanım teslimini bekliyor. Bu tek kalem hem Faz4'ü hem Granit tek-kalem lisansının kalan ~1/4'ünü kilitliyor.", C.amber],
    ["2 · KB3 + YK Masse donanımı", "İki tesiste de yazılım tarafı tamam (~$336K, 2025'te tamamlandı-faturalandı). Sayaç/bağlantı/saha donanımı gelmediği için lisans üretmiyorlar — ödenmiş yatırımın çalışmayan kısmı.", C.tealDark],
    ["3 · Slab + genel saha ön koşulları", "Slab kurulumları ve diğer tesislerde fırın enerji verisi, sayaçlar, SCADA erişimi, kamera/StepBox, QR yazıcılar. Liste tesis-tesis elimizde; her kalem bir go-live'ı tutuyor.", C.teal],
  ];
  const cw = 3.93, gx = 0.15, x0 = 0.6, y0 = 1.75, ch = 3.55;
  cols.forEach((c, i) => {
    const x = x0 + i * (cw + gx);
    card(s, x, y0, cw, ch, false);
    s.addText(c[0], { x: x + 0.25, y: y0 + 0.2, w: cw - 0.5, h: 0.75, fontSize: 15.5, bold: true, color: c[2], fontFace: F.h, align: "left", valign: "top", lineSpacingMultiple: 1.02, margin: 0 });
    s.addText(c[1], { x: x + 0.25, y: y0 + 1.0, w: cw - 0.5, h: 2.4, fontSize: 12.5, color: C.body, lineSpacingMultiple: 1.18, fontFace: F.b, align: "left", valign: "top", margin: 0 });
  });
  card(s, 0.6, 5.55, 12.1, 1.1, false);
  s.addText([
    { text: "Çerçeve: ", options: { bold: true, color: C.tealDark } },
    { text: "bu bir kusur listesi değil, ", options: {} },
    { text: "kapatma listesi.", options: { bold: true } },
    { text: " Üçü de operasyonel kararla çözülür — hepsi satın alma / saha kurulum kararı — teknoloji, bütçe müzakeresi ya da yeni sözleşme gerektirmiyor.", options: {} },
  ], { x: 0.95, y: 5.67, w: 11.4, h: 0.85, fontSize: 15, color: C.body, lineSpacingMultiple: 1.15, fontFace: F.b, align: "left", valign: "middle", margin: 0 });
  footer(s, "Revizyon dosyası (Ekim 2024, ortak kayıt) · ortak proje takip listesi (bekleyen donanım/erişim) · 2025 hakediş kayıtları.", false);
  s.addNotes("Dil disiplini: suçlama yok, isim yok. 'Saha tarafındaki ön koşullar' — pasif, nötr. Atıl yatırım kartı COO için en güçlü kanca: kendi ödenmiş parasının çalışmayan kısmı, ve bunu açabilecek kişi o.");
})();

// ============ SLIDE 5 — KURULAN VARLIK: DÜRÜST KIYAS (light) ============
(() => {
  const s = pres.addSlide(); bg(s, false);
  header(s, 3, "Kurulan varlık nedir — dürüst bir kıyas", false);

  card(s, 0.6, 1.62, 5.95, 4.95, false);
  s.addText("Bugün Kale'de kurulu olan", { x: 0.95, y: 1.84, w: 5.25, h: 0.4, fontSize: 16, bold: true, color: C.navyText, fontFace: F.h, align: "left", valign: "middle", margin: 0 });
  const own = [
    ["Seramiğe özel MES + IoT katmanı", "ArMES + IoT-Ignite: fırın, sır, masse süreç modelleri hazır — jenerik MES'lerde olmayan alan bilgisi."],
    ["Karo seviyesinde izlenebilirlik", "Her karonun hat üzerinde tek tek takibi — parça-seviyesi dijital kimliğin (ürün pasaportu) altyapısı bugün çalışıyor."],
    ["7 yıllık hat-seviyesi veri birikimi", "2019'dan beri biriken üretim verisi: hiçbir yeni tedarikçinin geriye dönük üretemeyeceği varlık."],
    ["CWF — fabrikayla konuşma katmanı", "Üretim verisinin üzerine konuşma-AI arayüzü geliştiriliyor; sektörde yeni öncüler bu yönde ilerliyor."],
  ];
  let yy = 2.3;
  own.forEach((o) => {
    s.addShape(pres.shapes.OVAL, { x: 0.95, y: yy + 0.05, w: 0.22, h: 0.22, fill: { color: C.teal }, line: { width: 0 } });
    s.addText(o[0], { x: 1.28, y: yy - 0.04, w: 4.95, h: 0.35, fontSize: 12.5, bold: true, color: C.navyText, fontFace: F.b, align: "left", valign: "middle", margin: 0 });
    s.addText(o[1], { x: 1.28, y: yy + 0.3, w: 4.95, h: 0.63, fontSize: 10.5, color: C.body, lineSpacingMultiple: 1.08, fontFace: F.b, align: "left", valign: "top", margin: 0 });
    yy += 1.06;
  });

  card(s, 6.75, 1.62, 5.95, 4.95, false);
  s.addText("Sıfırdan, kurumsal MES ile kurulsaydı (sektör kıyası)", { x: 7.1, y: 1.84, w: 5.3, h: 0.4, fontSize: 15, bold: true, color: C.navyText, fontFace: F.h, align: "left", valign: "middle", margin: 0 });
  const alt = [
    ["Süre", "Kurumsal MES kurulumları tesis başına 12–36 ay sürer; çok-tesisli programlar dalgalar hâlinde yıllara yayılır."],
    ["Maliyet", "Kurumsal katman tesis başına ~$1–3M toplam sahip olma maliyeti; çok-tesisli projeler tek-tesisin 2–3 katı (MESA, 2023). Entegrasyon tek başına maliyetin %20–40'ı (Deloitte)."],
    ["Seramik uyarlaması", "Jenerik MES'te fırın/sır/masse süreç bilgisi yoktur — üzerine ayrıca uyarlama projesi gerekir."],
    ["Dürüst ayrım", "Bağlantı ve gösterge panoları piyasada emtialaşmıştır; farkı yaratan seramiğe özel süreç modeli + karo-seviyesi izlenebilirlik + 7 yıllık veridir. Bunlar satın alınamaz, ancak birikir."],
  ];
  yy = 2.3;
  alt.forEach((o) => {
    s.addShape(pres.shapes.OVAL, { x: 7.1, y: yy + 0.05, w: 0.22, h: 0.22, fill: { color: C.amber }, line: { width: 0 } });
    s.addText(o[0], { x: 7.43, y: yy - 0.04, w: 4.95, h: 0.35, fontSize: 12.5, bold: true, color: C.navyText, fontFace: F.b, align: "left", valign: "middle", margin: 0 });
    s.addText(o[1], { x: 7.43, y: yy + 0.3, w: 4.95, h: 0.63, fontSize: 10.5, color: C.body, lineSpacingMultiple: 1.08, fontFace: F.b, align: "left", valign: "top", margin: 0 });
    yy += 1.06;
  });

  footer(s, "MES sektör kıyasları: TeepTrak/Symestic pazar rehberleri 2026 (kurumsal katman $1–3M/tesis, 18–36 ay) · MESA 2023 (çok-tesis 2–3×) · Deloitte Mfg. Tech Survey (entegrasyon %20–40).", false);
  s.addNotes("Dürüstlük bu sayfanın silahı: 'panolar emtia' cümlesini biz söylersek karşı taraf söyleyemez. Vurgu: satın alınamayan üç şey — seramik süreç modeli, karo-seviyesi izlenebilirlik, 7 yıllık veri.");
})();

// ============ SLIDE 6 — KALE NE KAZANIR: SEKTÖR KANITI + REGÜLASYON (light) ============
(() => {
  const s = pres.addSlide(); bg(s, false);
  header(s, 4, "Kale ne kazanır — sektör kanıtı ve yaklaşan zorunluluk", false);

  const cards = [
    ["+%40 / +5–10 puan", "Dijital dönüşümün ölçülmüş getirisi", "WEF Global Lighthouse ağı ortalaması: işgücü verimliliği +%40, OEE +5–10 puan; 3 yılda 2–3× yatırım getirisi. Türkiye'den Ford Otosan (üretim 2×, verimlilik +%44) ve Bosch Bursa (OEE +%9) aynı ağda.", C.teal],
    ["~%50 → fırında", "Enerji, seramiğin en büyük kalemi", "Seramikte enerjinin ana tüketicisi fırındır; literatürde pişirme enerjisinin ~%50'si baca/soğutma ile kaybolur. Gerçek-zamanlı fırın verisi = doğrudan enerji/CO₂ optimizasyon zemini.", C.tealDark],
    ["2026 → 2030", "AB: dijital ürün pasaportu geliyor", "Yeni AB Yapı Ürünleri Tüzüğü (2024/3110) yürürlükte; öncelikli ürünlerde çevresel beyanlar 2026'da başladı, yapı ürünlerinde dijital ürün pasaportu kademeli zorunlu hâle geliyor. AB'ye ihracatta karo-seviyesi izlenebilirlik regülasyon varlığına dönüşüyor.", C.amber],
  ];
  const cw = 3.93, gx = 0.15, x0 = 0.6, y0 = 1.7, ch = 3.6;
  cards.forEach((c, i) => {
    const x = x0 + i * (cw + gx);
    card(s, x, y0, cw, ch, false);
    s.addText(c[0], { x: x + 0.25, y: y0 + 0.2, w: cw - 0.5, h: 0.6, fontSize: 21, bold: true, color: c[3], fontFace: F.h, align: "left", valign: "middle", margin: 0 });
    s.addText(c[1], { x: x + 0.25, y: y0 + 0.85, w: cw - 0.5, h: 0.55, fontSize: 13, bold: true, color: C.navyText, fontFace: F.b, align: "left", valign: "top", lineSpacingMultiple: 1.05, margin: 0 });
    s.addText(c[2], { x: x + 0.25, y: y0 + 1.45, w: cw - 0.5, h: 2.0, fontSize: 11, color: C.body, lineSpacingMultiple: 1.14, fontFace: F.b, align: "left", valign: "top", margin: 0 });
  });

  card(s, 0.6, 5.55, 12.1, 1.1, false);
  s.addText([
    { text: "Sözleşmenin kendi rakamı: ", options: { bold: true, color: C.tealDark } },
    { text: "tam yaygınlaşma ~46,2M ₺/yıl lisans karşılığında 16 tesis/hatta gerçek-zamanlı görünürlük — bugün ~%14'ü canlı. Orta vadede kazanım verim/enerji; uzun vadede AB pazarına ", options: {} },
    { text: "pasaport-hazır", options: { bold: true } },
    { text: " ihracat altyapısı.", options: {} },
  ], { x: 0.95, y: 5.66, w: 11.4, h: 0.88, fontSize: 14, color: C.body, lineSpacingMultiple: 1.14, fontFace: F.b, align: "left", valign: "middle", margin: 0 });

  footer(s, "WEF Global Lighthouse Network 2023–2026 raporları/basın bültenleri · AB Tüzükleri 2024/3110 (CPR) ve 2024/1781 (ESPR) · seramik fırın enerji literatürü (roller kiln geri-kazanım çalışmaları).", false);
  s.addNotes("Üç kart üç zaman ufku: bugün (verim), orta vade (enerji/CO2), uzun vade (AB pasaport zorunluluğu). DPP kartı en güçlüsü: yapılan iş regülasyon-varlığına dönüşüyor; Kale ihracatçı. Rakamlar WEF/AB kaynaklı — bizim iddiamız değil.");
})();

// ============ SLIDE 6 — 90 GÜNLÜK ORTAK SPRINT (light) ============
(() => {
  const s = pres.addSlide(); bg(s, false);
  header(s, 5, "90 günlük ortak hızlanma planı", false);
  const steps = [
    ["0–30 gün", "Donanım kapatma dalgası", "Tek sayfa liste: Faz4 donanımı (Granit kilidini açar) + KB3/YK Masse saha donanımı + Slab kurulum kalemleri. Her kaleme Kale tarafında bir sahip ve tarih.", C.teal],
    ["30–60 gün", "Go-live dalgası 1", "Donanımı kapanan tesislerde devreye alma: önce KB3 + YK Masse (yazılım hazır) ve Granit tam-lisans geçişi; haftalık kadans (ARDIÇ PM ↔ Kale saha sahibi).", C.tealDark],
    ["60–90 gün", "Go-live dalgası 2 + kadans", "Slab kurulumları ve sonraki tesis dalgası; aylık COO-seviyesi gözden geçirme: biten / devrede / bekleyen — tek tablo, tek gerçek.", C.amber],
  ];
  const cw = 3.93, gx = 0.15, x0 = 0.6, y0 = 1.8, ch = 3.4;
  steps.forEach((st, i) => {
    const x = x0 + i * (cw + gx);
    card(s, x, y0, cw, ch, false);
    s.addShape(pres.shapes.OVAL, { x: x + 0.25, y: y0 + 0.25, w: 0.52, h: 0.52, fill: { color: st[3] }, line: { width: 0 } });
    s.addText(String(i + 1), { x: x + 0.25, y: y0 + 0.25, w: 0.52, h: 0.52, fontSize: 18, bold: true, color: C.white, align: "center", valign: "middle", fontFace: F.h, margin: 0 });
    s.addText(st[0], { x: x + 0.92, y: y0 + 0.25, w: cw - 1.2, h: 0.52, fontSize: 15, bold: true, color: C.navyText, fontFace: F.h, align: "left", valign: "middle", margin: 0 });
    s.addText(st[1], { x: x + 0.25, y: y0 + 0.95, w: cw - 0.5, h: 0.4, fontSize: 14, bold: true, color: st[3], fontFace: F.b, align: "left", valign: "middle", margin: 0 });
    s.addText(st[2], { x: x + 0.25, y: y0 + 1.42, w: cw - 0.5, h: 1.85, fontSize: 12, color: C.body, lineSpacingMultiple: 1.16, fontFace: F.b, align: "left", valign: "top", margin: 0 });
  });
  card(s, 0.6, 5.45, 12.1, 1.2, false);
  s.addText([
    { text: "Kural basit: ", options: { bold: true, color: C.tealDark } },
    { text: "her tesis için tek liste, tek sahip, tek tarih. ARDIÇ tarafında kapasite ayrıldı; 2,2× tempo, blokajlar kapandığında ", options: {} },
    { text: "bizim tarafımızda hazır.", options: { bold: true } },
  ], { x: 0.95, y: 5.57, w: 11.4, h: 0.95, fontSize: 15, color: C.body, lineSpacingMultiple: 1.15, fontFace: F.b, align: "left", valign: "middle", margin: 0 });
  footer(s, "Ortak proje takip listesi · go-live kayıtları · ARDIÇ kapasite planı.", false);
  s.addNotes("Plan sayfası taahhüt sayfasıdır: biz kapasiteyi taahhüt ediyoruz, karşılığında sahiplik+tarih istiyoruz. 'Tek tablo, tek gerçek' — COO'ların sevdiği dil.");
})();

// ============ SLIDE 7 — KARAR (dark) ============
(() => {
  const s = pres.addSlide(); bg(s, true);
  s.addText("Bugün istediğimiz üç karar", { x: 0.6, y: 0.55, w: 12.1, h: 0.7, fontSize: 30, bold: true, color: C.lightText, fontFace: F.h, align: "left", valign: "middle", margin: 0 });
  const asks = [
    ["1", "Blokaj listesine sahip ve tarih", "Faz4 + KB3/YK Masse + Slab donanım listesi 30 gün içinde kapanacak şekilde Kale tarafında sahiplendirilsin."],
    ["2", "Tesis sırası birlikte kilitlensin", "Önce yazılımı hazır olanlar (KB3, YK Masse, Granit/Faz4), ardından ortak öncelik matrisi — pencereye en çok tesis sığacak sırayla."],
    ["3", "Aylık yönetim kadansı", "COO seviyesinde 45 dakikalık aylık gözden geçirme: biten / devrede / bekleyen. Tek tablo."],
  ];
  let y = 1.7;
  asks.forEach((a) => {
    card(s, 0.6, y, 12.1, 1.28, true);
    s.addShape(pres.shapes.OVAL, { x: 0.95, y: y + 0.32, w: 0.62, h: 0.62, fill: { color: C.tealOnDark }, line: { width: 0 } });
    s.addText(a[0], { x: 0.95, y: y + 0.32, w: 0.62, h: 0.62, fontSize: 22, bold: true, color: C.navy, align: "center", valign: "middle", fontFace: F.h, margin: 0 });
    s.addText(a[1], { x: 1.85, y: y + 0.16, w: 10.6, h: 0.45, fontSize: 17, bold: true, color: C.lightText, fontFace: F.h, align: "left", valign: "middle", margin: 0 });
    s.addText(a[2], { x: 1.85, y: y + 0.62, w: 10.6, h: 0.55, fontSize: 13, color: C.lightMute, lineSpacingMultiple: 1.1, fontFace: F.b, align: "left", valign: "top", margin: 0 });
    y += 1.48;
  });
  s.addText([
    { text: "Kurulum bitti. Kalan iş takvim işi — ", options: {} },
    { text: "ve takvim ikimizin elinde.", options: { bold: true, color: C.tealOnDark } },
  ], { x: 0.6, y: 6.25, w: 12.1, h: 0.55, fontSize: 19, color: C.lightText, fontFace: F.h, align: "left", valign: "middle", margin: 0 });
  footer(s, "Bu brifingin 2–6. sayfaları; tüm rakamlar sözleşme ve ortak kayıtlara izli.", true);
  s.addNotes("Üç istek de operasyonel — bütçe, hukuk, yeni sözleşme yok. Kapanış cümlesini aynen söyle. Gündemi operasyonel tut; başka başlık açılırsa not al, bu toplantıda derinleşme.");
})();

pres.writeFile({ fileName: "/home/claude/ARDIC_Kale_COO_Brief_v2.pptx" }).then(() => console.log("written"));
