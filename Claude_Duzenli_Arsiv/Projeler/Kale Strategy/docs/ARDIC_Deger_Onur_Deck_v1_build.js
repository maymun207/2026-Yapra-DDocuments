const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.author = "ARDICTECH";
pres.title = "Değer & Onur — Kale·ARDIÇ (İçsel/YK)";

const C = {
  navy: "13233F", cardNavy: "1E3354", teal: "13A89E", tealDark: "0C7368", tealOnDark: "47D3C4",
  coral: "C76B4A", coralDark: "9A4E32", white: "FFFFFF", cardLight: "F3F5F9",
  navyText: "13233F", body: "414E5E", mute: "8A95A5", lightText: "EAEFF6", lightMute: "9DABC1", hair: "DCE2EA",
};
const F = { h: "Calibri", b: "Calibri" };
const makeShadow = () => ({ type: "outer", color: "0B1626", blur: 7, offset: 3, angle: 90, opacity: 0.12 });
const makeShadowDark = () => ({ type: "outer", color: "000000", blur: 8, offset: 3, angle: 90, opacity: 0.28 });

function bg(s, dark) { s.background = { color: dark ? C.navy : C.white }; }
function footer(s, src, dark) {
  s.addText([{ text: "Kaynak: ", options: { bold: true } }, { text: src }], { x: 0.6, y: 7.04, w: 9.4, h: 0.32, fontSize: 9, italic: true, color: dark ? "7E8CA3" : C.mute, fontFace: F.b, align: "left", margin: 0, valign: "middle" });
  s.addText("İçsel · YK / CFO / Hukuk — dışarı çıkmaz", { x: 10.0, y: 7.04, w: 2.7, h: 0.32, fontSize: 9, italic: true, color: dark ? "7E8CA3" : C.mute, fontFace: F.b, align: "right", margin: 0, valign: "middle" });
}
function header(s, n, title, dark) {
  s.addShape(pres.shapes.OVAL, { x: 0.6, y: 0.52, w: 0.62, h: 0.62, fill: { color: dark ? C.tealOnDark : C.teal }, line: { width: 0 } });
  s.addText(String(n), { x: 0.6, y: 0.52, w: 0.62, h: 0.62, fontSize: 22, bold: true, color: dark ? C.navy : C.white, align: "center", valign: "middle", fontFace: F.h, margin: 0 });
  s.addText(title, { x: 1.45, y: 0.46, w: 11.25, h: 0.78, fontSize: 27, bold: true, color: dark ? C.lightText : C.navyText, align: "left", valign: "middle", fontFace: F.h, margin: 0 });
}
function card(s, x, y, w, h, dark) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.09, fill: { color: dark ? C.cardNavy : C.cardLight }, line: { color: dark ? C.cardNavy : C.hair, width: 0.75 }, shadow: dark ? makeShadowDark() : makeShadow() });
}

// ===== SLIDE 1 — KAPAK =====
(() => {
  const s = pres.addSlide(); bg(s, true);
  s.addShape(pres.shapes.OVAL, { x: 10.7, y: -1.7, w: 4.4, h: 4.4, fill: { color: C.navy }, line: { color: C.tealOnDark, width: 1.25 } });
  s.addShape(pres.shapes.OVAL, { x: 0.6, y: 1.06, w: 0.34, h: 0.34, fill: { color: C.tealOnDark }, line: { width: 0 } });
  s.addText("ARDICTECH · Kale ortaklığı · 2019–2026", { x: 1.05, y: 1.0, w: 9, h: 0.45, fontSize: 14, bold: true, color: C.tealOnDark, charSpacing: 2, fontFace: F.b, align: "left", valign: "middle", margin: 0 });
  s.addText("Değer & Onur:\nbirlikte kurulan 5,5 yıl", { x: 1.0, y: 2.0, w: 11.3, h: 2.0, fontSize: 44, bold: true, color: C.lightText, lineSpacingMultiple: 1.02, fontFace: F.h, align: "left", valign: "middle", margin: 0 });
  s.addText("2019'dan bugüne Kale ile kurulan ortaklık: doğan güven, üretilen teknoloji, yaratılan değer — ve ticari bedeline rağmen sözünü tutan bir partner.", { x: 1.0, y: 4.3, w: 10.8, h: 0.95, fontSize: 16, color: C.lightMute, lineSpacingMultiple: 1.15, fontFace: F.b, align: "left", valign: "top", margin: 0 });
  s.addText("Haziran 2026", { x: 1.0, y: 6.55, w: 4, h: 0.4, fontSize: 13, color: C.lightMute, fontFace: F.b, align: "left", valign: "middle", margin: 0 });
  s.addText("İçsel belge · Yönetim Kurulu / CFO / Hukuk · owner/Kale-facing'e GİRMEZ", { x: 6.0, y: 6.55, w: 6.7, h: 0.4, fontSize: 11, italic: true, color: "7E8CA3", fontFace: F.b, align: "right", valign: "middle", margin: 0 });
  s.addNotes("Bu, hasar/makas deck'inin pozitif karşı-ağırlığı: değer-önde, onurlu. İçsel/YK versiyonu; hijyenli owner-facing sonra türetilecek. Hasar bir kayıp değil, karakter kanıtı olarak konumlanıyor.");
})();

// ===== SLIDE 2 — YÖNETİCİ ÖZETİ =====
(() => {
  const s = pres.addSlide(); bg(s, true);
  s.addText("Yönetici özeti — tek bakışta", { x: 0.6, y: 0.5, w: 12.1, h: 0.7, fontSize: 30, bold: true, color: C.lightText, fontFace: F.h, align: "left", valign: "middle", margin: 0 });
  s.addText("ARDIÇ, Kale ile 5,5 yılda IoT'dan AI'a uzanan bir üretim-zekâsı platformu kurdu — fabrikalarda canlı, markette karşılığı olan. SCL execution ticari hasar verdi; ARDIÇ geri adım atmadı, sözünü tuttu.", { x: 0.6, y: 1.32, w: 12.0, h: 0.75, fontSize: 16, color: C.lightMute, lineSpacingMultiple: 1.12, fontFace: F.b, align: "left", valign: "top", margin: 0 });
  const cy = 2.5, cw = 2.86, gap = 0.18, cx0 = 0.6, ch = 2.0;
  const items = [
    ["5,5 yıl", "Kesintisiz ortaklık", "2019 IoT-Ignite → 2024 SCL, derinleşerek"],
    ["~440 adam-ay", "Kale'ye adanmış emek", "IoT'dan AI'a mühendislik yatırımı"],
    ["4 platform", "Canlı üretim sistemi", "IoT-Ignite · ArMES · ArAI · CWF"],
    ["~$1,04M/yıl", "İleriye-dönük motor", "tekrarlayan değer, büyüyen"],
  ];
  items.forEach((it, i) => {
    const x = cx0 + i * (cw + gap);
    card(s, x, cy, cw, ch, true);
    s.addText(it[0], { x: x + 0.25, y: cy + 0.22, w: cw - 0.5, h: 0.72, fontSize: 27, bold: true, color: C.tealOnDark, fontFace: F.h, align: "left", valign: "middle", margin: 0 });
    s.addText(it[1], { x: x + 0.25, y: cy + 0.95, w: cw - 0.5, h: 0.4, fontSize: 14, bold: true, color: C.lightText, fontFace: F.b, align: "left", valign: "middle", margin: 0 });
    s.addText(it[2], { x: x + 0.25, y: cy + 1.34, w: cw - 0.5, h: 0.55, fontSize: 11.5, color: C.lightMute, fontFace: F.b, align: "left", valign: "top", lineSpacingMultiple: 1.05, margin: 0 });
  });
  card(s, 0.6, 4.78, 12.1, 1.55, true);
  s.addText([
    { text: "Özet. ", options: { bold: true, color: C.tealOnDark } },
    { text: "Değer gerçek ve sürüyor: platform canlı, motor tekrarlayan, teknoloji markette karşılığı olan. Ticari hasar (SCL execution) yaşandı — ama ARDIÇ ", options: {} },
    { text: "sonuca ulaştı, sahiplerine sözünü tuttu, hakkını kullanmadı", options: { bold: true } },
    { text: ". Doğru yapı, bu değeri sürdürülebilir biçimde yakalayan ", options: {} },
    { text: "ortak-sahipliktir (NewCo)", options: { bold: true, color: C.tealOnDark } },
    { text: ".", options: {} },
  ], { x: 0.95, y: 4.98, w: 11.4, h: 1.2, fontSize: 15, color: C.lightText, lineSpacingMultiple: 1.2, fontFace: F.b, align: "left", valign: "middle", margin: 0 });
  footer(s, "Bu deck'in Perde 1–5 + Ek kanıtları; ilişki kronolojisi 2019–2026; efor PrjTimes (yeniden-türetilecek).", true);
  s.addNotes("Tek slaytta değer tezi. Vurgu: (1) 5,5 yıl + ~440 ay = ciddi yatırım, (2) 4 platform canlı, (3) $1,04M/yıl motor, (4) hasara rağmen onur. Kapanış NewCo'ya köprü.");
})();

// ===== SLIDE 3 — PERDE 1: BİRLİKTELİK (timeline) =====
(() => {
  const s = pres.addSlide(); bg(s, false);
  header(s, 1, "Birliktelik: 5,5 yılda derinleşen ortaklık", false);
  s.addText("Kale ilişkisi 2019'da ARDIÇ'ın kendi edge platformuyla başladı; MES'e, oradan AI/ölçeğe derinleşti. Her tarih kaynağa izli.", { x: 0.6, y: 1.3, w: 12.1, h: 0.5, fontSize: 13.5, color: C.body, fontFace: F.b, align: "left", valign: "top", margin: 0 });
  const cw = 2.27, ch = 3.4, gap = 0.2, x0 = 0.6, cy = 2.2;
  const steps = [
    ["2019", "IoT-Ignite", "Edge Gateway ×200 + PilarOS. İlişkinin doğuşu — saha/edge katmanı."],
    ["2022", "Faz 1", "Granit MES: Üretim Yönetimi + Otomasyon. İlk büyük dijital dönüşüm."],
    ["2023", "Faz 1.5", "QR–MES, StepBox, GW entegrasyonu. Saha bağlanırlığı derinleşti."],
    ["2024", "Faz 2", "Masse–Sır–Pasta Hazırlama. Süreç kapsamı genişledi."],
    ["2024", "SCL", "Yaygınlaştırma — 16 tesis/hat. Platform ölçeğe çıktı."],
  ];
  steps.forEach((st, i) => {
    const x = x0 + i * (cw + gap);
    card(s, x, cy, cw, ch, false);
    s.addShape(pres.shapes.OVAL, { x: x + cw / 2 - 0.15, y: cy - 0.15, w: 0.3, h: 0.3, fill: { color: C.teal }, line: { color: "FFFFFF", width: 2 } });
    s.addText(st[0], { x: x + 0.22, y: cy + 0.28, w: cw - 0.44, h: 0.5, fontSize: 20, bold: true, color: C.teal, fontFace: F.h, align: "left", valign: "middle", margin: 0 });
    s.addText(st[1], { x: x + 0.22, y: cy + 0.82, w: cw - 0.44, h: 0.4, fontSize: 15, bold: true, color: C.navyText, fontFace: F.h, align: "left", valign: "middle", margin: 0 });
    s.addText(st[2], { x: x + 0.22, y: cy + 1.28, w: cw - 0.44, h: 2.0, fontSize: 11.5, color: C.body, fontFace: F.b, align: "left", valign: "top", lineSpacingMultiple: 1.18, margin: 0 });
    if (i < steps.length - 1) s.addText("→", { x: x + cw - 0.06, y: cy + 0.25, w: gap + 0.12, h: 0.5, fontSize: 18, bold: true, color: C.teal, align: "center", valign: "middle", margin: 0 });
  });
  s.addText([
    { text: "Edge → MES → bağlanırlık → süreç → ölçek. ", options: { bold: true, color: C.tealDark } },
    { text: "Bu, tek seferlik bir proje değil — kademeli güvenle inşa edilmiş, derinleşen bir ortaklıktır.", options: { italic: true } },
  ], { x: 0.6, y: 5.85, w: 12.1, h: 0.6, fontSize: 13.5, color: C.body, fontFace: F.b, align: "left", valign: "middle", margin: 0 });
  footer(s, "2019 sözleşmesi (29.03.2019); Faz1 (19.08.2022); EK Prot-3 (11.12.2023); Faz2 (07.05.2024); SCL imza-günü fotoğrafı (15.08.2024).", false);
  s.addNotes("İlişki arkı: 2019 IoT-Ignite doğuşu → MES → AI/ölçek. Kademeli derinleşme = güven kanıtı. 2019 ilişki-değer resminde DAHİL (efor/hasar atfında hariç).");
})();

// ===== SLIDE 4 — PERDE 2: YARATILAN DEĞER =====
(() => {
  const s = pres.addSlide(); bg(s, false);
  header(s, 2, "Yaratılan değer: fabrikalarda canlı bir platform", false);
  // left: platform stack
  s.addText("Kurulan teknoloji yığını", { x: 0.6, y: 1.7, w: 6.0, h: 0.4, fontSize: 16, bold: true, color: C.navyText, fontFace: F.h, align: "left", valign: "middle", margin: 0 });
  const stack = [
    ["IoT-Ignite", "Edge/IoT bağlanırlık platformu (PilarOS) — saha cihaz, sensör, gateway."],
    ["ArMES / MOM", "Üretim Yürütme / MOM — üretim yönetimi, izlenebilirlik, OEE."],
    ["ArAI", "Endüstriyel yapay zekâ katmanı — analiz ve optimizasyon."],
    ["CWF (Chat With Factory)", "Fabrikayla doğal-dil arayüz — operasyonel zekâ."],
  ];
  let yy = 2.18;
  stack.forEach((p) => {
    s.addShape(pres.shapes.OVAL, { x: 0.6, y: yy + 0.06, w: 0.16, h: 0.16, fill: { color: C.teal }, line: { width: 0 } });
    s.addText(p[0], { x: 0.95, y: yy - 0.08, w: 5.5, h: 0.4, fontSize: 15, bold: true, color: C.navyText, fontFace: F.h, align: "left", valign: "top", margin: 0 });
    s.addText(p[1], { x: 0.95, y: yy + 0.3, w: 5.6, h: 0.48, fontSize: 12, color: C.body, fontFace: F.b, align: "left", valign: "top", lineSpacingMultiple: 1.15, margin: 0 });
    yy += 0.78;
  });
  // right: deployment stats card
  card(s, 7.0, 1.7, 5.7, 3.35, false);
  s.addText("Sahadaki ölçek", { x: 7.3, y: 1.92, w: 5.1, h: 0.4, fontSize: 15, bold: true, color: C.navyText, fontFace: F.h, align: "left", valign: "middle", margin: 0 });
  const dep = [["16 tesis/hat", "SCL Tablo-1 yaygınlaştırma kapsamı"], ["~440 adam-ay", "Kale'ye adanmış mühendislik emeği"], ["Canlı üretim", "fabrikalarda çalışan, üreten sistemler"]];
  let dy = 2.45;
  dep.forEach((d) => {
    s.addText(d[0], { x: 7.3, y: dy, w: 5.1, h: 0.45, fontSize: 22, bold: true, color: C.teal, fontFace: F.h, align: "left", valign: "middle", margin: 0 });
    s.addText(d[1], { x: 7.3, y: dy + 0.46, w: 5.1, h: 0.35, fontSize: 12, color: C.mute, fontFace: F.b, align: "left", valign: "top", margin: 0 });
    dy += 0.88;
  });
  // bottom value-for band
  card(s, 0.6, 5.42, 12.1, 1.1, false);
  s.addText([
    { text: "Kale için: ", options: { bold: true, color: C.tealDark } },
    { text: "granit ve seramik fabrikalarının dijital dönüşümü — üretim yönetimi, otomasyon, izlenebilirlik, kalite. ", options: {} },
    { text: "ARDIÇ için: ", options: { bold: true, color: C.tealDark } },
    { text: "sahada kanıtlanmış, ürünleşmiş, market-karşılığı olan bir endüstriyel AIoT platformu.", options: {} },
  ], { x: 0.95, y: 5.56, w: 11.4, h: 0.9, fontSize: 13.5, color: C.body, lineSpacingMultiple: 1.18, fontFace: F.b, align: "left", valign: "middle", margin: 0 });
  footer(s, "Platform: Context Bootstrap v13 §1 (IoT-Ignite/ArMES/ArAI/CWF); tesis sayısı SCL Tablo-1; efor PrjTimes (T2, yeniden-türetilecek).", false);
  s.addNotes("Ne kuruldu: 4 katmanlı platform, 16 tesis/hatta canlı. ~440 ay emek (T2, flagged). İki taraflı değer: Kale dijital dönüşüm; ARDIÇ market-karşılığı platform. Market 'karşılığı' = ürünleşmiş/deploy edilmiş, abartısız.");
})();

// ===== SLIDE 5 — PERDE 3: SCL ERA İLERİ-DEĞER =====
(() => {
  const s = pres.addSlide(); bg(s, false);
  header(s, 3, "SCL era: bugünü çözen, yarına hazırlayan teknoloji", false);
  s.addText("SCL sadece bir projeyi teslim etmedi — fabrika ölçeğinde, hem Kale hem market için ileriye-dönük bir platform üretti.", { x: 0.6, y: 1.3, w: 12.1, h: 0.5, fontSize: 14, color: C.body, fontFace: F.b, align: "left", valign: "top", margin: 0 });
  const cy = 2.05, ch = 2.55, cw = 3.92, gap = 0.17, x0 = 0.6;
  const cards = [
    ["Ölçek platformu", "ARMES yaygınlaştırması: çok tesis, tek mimari. Tekrarlanabilir, ölçeklenebilir kurulum modeli."],
    ["İleriye-dönük motor", "~$1,04M/yıl tekrarlayan lisans (güncel skop); tam yaygınlaşmada büyüyen sürdürülebilir gelir."],
    ["Market karşılığı", "Egemen, Türkiye-merkezli endüstriyel AIoT/AI yığını — Kale ötesinde ürünleştirilebilir stratejik potansiyel."],
  ];
  cards.forEach((cd, i) => {
    const x = x0 + i * (cw + gap);
    card(s, x, cy, cw, ch, false);
    s.addText(cd[0], { x: x + 0.3, y: cy + 0.28, w: cw - 0.6, h: 0.5, fontSize: 16, bold: true, color: C.tealDark, fontFace: F.h, align: "left", valign: "top", margin: 0 });
    s.addText(cd[1], { x: x + 0.3, y: cy + 0.9, w: cw - 0.6, h: 1.5, fontSize: 12.5, color: C.body, fontFace: F.b, align: "left", valign: "top", lineSpacingMultiple: 1.2, margin: 0 });
  });
  card(s, 0.6, 4.85, 12.1, 1.55, false);
  s.addText([
    { text: "Önemli ayrım: ", options: { bold: true, color: C.tealDark } },
    { text: "SCL era'da yaşanan ticari hasar, üretilen teknolojinin değerini düşürmüyor. Platform çalışıyor, motor dönüyor, market potansiyeli duruyor. Sorun ", options: {} },
    { text: "execution'ın ticari sonucunda", options: { bold: true } },
    { text: " — varlığın kendisinde değil. (Hasarın detayı: hasar/makas deck.)", options: {} },
  ], { x: 0.95, y: 5.0, w: 11.4, h: 1.25, fontSize: 13.5, color: C.body, lineSpacingMultiple: 1.18, fontFace: F.b, align: "left", valign: "middle", margin: 0 });
  footer(s, "İleriye-dönük motor Mind Map v5 §7 (~$1,04M/yıl); platform/strateji Context Bootstrap v13 §1; market potansiyeli stratejik çerçeve.", false);
  s.addNotes("SCL era değeri: ölçek platformu + $1,04M/yıl motor + market potansiyeli. Kritik köprü: ticari hasar ≠ teknolojinin değersizliği. Varlık sağlam, sorun execution'ın ticari sonucu. Market 'potansiyel' olarak çerçeveli (kanıtsız traction yok).");
})();

// ===== SLIDE 6 — PERDE 4: ONURUN BEDELİ =====
(() => {
  const s = pres.addSlide(); bg(s, false);
  header(s, 4, "Onurun bedeli: zarar gördük, sözümüzü tuttuk", false);
  s.addText("SCL execution, ARDIÇ'a ticari olarak zarar verdi. ARDIÇ geri adım atmadı — sonuca ulaştı ve taahhütlerini onurlandırdı.", { x: 0.6, y: 1.3, w: 12.1, h: 0.5, fontSize: 14.5, color: C.body, fontFace: F.b, align: "left", valign: "top", margin: 0 });
  // left: the damage (one dignified figure)
  card(s, 0.6, 2.0, 5.5, 4.4, false);
  s.addText("Ödenen bedel", { x: 0.95, y: 2.25, w: 4.8, h: 0.4, fontSize: 16, bold: true, color: C.navyText, fontFace: F.h, align: "left", valign: "middle", margin: 0 });
  s.addText("~₺31,3M", { x: 0.95, y: 2.7, w: 4.8, h: 0.85, fontSize: 46, bold: true, color: C.coralDark, fontFace: F.h, align: "left", valign: "middle", margin: 0 });
  s.addText("(~$777K) SCL execution'ın ARDIÇ'a gerçekleşen ticari hasarı", { x: 0.95, y: 3.6, w: 4.8, h: 0.6, fontSize: 12.5, color: C.body, fontFace: F.b, align: "left", valign: "top", lineSpacingMultiple: 1.12, margin: 0 });
  s.addShape(pres.shapes.LINE, { x: 0.95, y: 4.35, w: 4.8, h: 0, line: { color: C.hair, width: 1 } });
  s.addText([
    { text: "Finansman çağlayanı ~₺19,7M", options: { breakLine: true } },
    { text: "Lisans gecikme kaybı ~₺11,6M", options: {} },
  ], { x: 0.95, y: 4.5, w: 4.8, h: 0.8, fontSize: 12.5, color: C.mute, fontFace: F.b, align: "left", valign: "top", lineSpacingMultiple: 1.3, margin: 0 });
  s.addText("Granülerlik: hasar/makas deck", { x: 0.95, y: 5.95, w: 4.8, h: 0.35, fontSize: 11, italic: true, color: C.mute, fontFace: F.b, align: "left", valign: "top", margin: 0 });
  // right: the honor (4 points)
  s.addText("ARDIÇ'ın duruşu", { x: 6.4, y: 2.0, w: 6.3, h: 0.4, fontSize: 16, bold: true, color: C.navyText, fontFace: F.h, align: "left", valign: "middle", margin: 0 });
  const honor = [
    ["Geri adım atmadık", "Sistemi teslim ettik, sonuca ulaştık — projeyi yarıda bırakmadık."],
    ["Sözümüzü tuttuk", "Sahiplere/paydaşlara verilen taahhüt onurlandırıldı."],
    ["Hakkımızı kullanmadık", "₺0 ceza/standby/gecikme faizi — sözleşmesel haklarımızı işletmedik."],
    ["Kendi kaynağımızı koyduk", "Kurucular ₺30,89M öz-kaynak enjekte ederek krizi taşıdı."],
  ];
  let hy = 2.5;
  honor.forEach((h) => {
    s.addShape(pres.shapes.OVAL, { x: 6.4, y: hy + 0.04, w: 0.18, h: 0.18, fill: { color: C.teal }, line: { width: 0 } });
    s.addText(h[0], { x: 6.75, y: hy - 0.1, w: 5.9, h: 0.4, fontSize: 15, bold: true, color: C.navyText, fontFace: F.h, align: "left", valign: "top", margin: 0 });
    s.addText(h[1], { x: 6.75, y: hy + 0.3, w: 5.95, h: 0.6, fontSize: 12, color: C.body, fontFace: F.b, align: "left", valign: "top", lineSpacingMultiple: 1.12, margin: 0 });
    hy += 1.0;
  });
  footer(s, "Hasar Mind Map v5 §18–§22 (mizan/sözleşme); rezerv haklar SCL md.3.6/3.11/11.1; öz-kaynak ₺30,89M ortak kredi (31.12.2025).", false);
  s.addNotes("Karakter perdesi. Bir onurlu hasar figürü (₺31,3M) + dört duruş kanıtı (teslim, söz, ₺0 hak, ₺30,89M öz-kaynak). Şikâyet değil — onur. Hasar granülerliği makas deck'te. İçsel olduğu için ₺30,89M ve ₺31,3M burada açık.");
})();

// ===== SLIDE 7 — PERDE 5: SENTEZ → ORTAKLIK (dark) =====
(() => {
  const s = pres.addSlide(); bg(s, true);
  header(s, 5, "Sentez: değeri ortak-sahiplikle yakalamak", true);
  s.addText([
    { text: "Değer gerçek ve sürüyor. ", options: { bold: true, color: C.tealOnDark } },
    { text: "Satıcı-müşteri modeli yapısal tavanına ulaştı; doğru yapı, bu değeri sürdürülebilir ve adil biçimde yakalayan ortak-sahipliktir (NewCo).", options: {} },
  ], { x: 0.6, y: 1.55, w: 12.1, h: 0.7, fontSize: 16, color: C.lightText, lineSpacingMultiple: 1.14, fontFace: F.b, align: "left", valign: "top", margin: 0 });
  const cy = 2.55, ch = 2.1, cw = 3.92, gap = 0.17, x0 = 0.6;
  const layers = [
    ["K1 — Egemen AI Bulut", "Holding BT harcamasının yönlendirilmesiyle finanse edilen egemen bulut katmanı."],
    ["K2 — ArMES / IoT-Ignite", "ARDIÇ lisansıyla kurulan üretim-zekâsı platformu — kanıtlanmış çekirdek."],
    ["K3 — Dikey AI ürünleri", "Enerji optimizasyonu, kalite görüntü, CWF — markete açılan ürün katmanı."],
  ];
  layers.forEach((l, i) => {
    const x = x0 + i * (cw + gap);
    card(s, x, cy, cw, ch, true);
    s.addText(l[0], { x: x + 0.3, y: cy + 0.28, w: cw - 0.6, h: 0.5, fontSize: 16, bold: true, color: C.tealOnDark, fontFace: F.h, align: "left", valign: "top", lineSpacingMultiple: 1.02, margin: 0 });
    s.addText(l[1], { x: x + 0.3, y: cy + 0.92, w: cw - 0.6, h: 1.05, fontSize: 12.5, color: C.lightMute, fontFace: F.b, align: "left", valign: "top", lineSpacingMultiple: 1.18, margin: 0 });
  });
  s.addText([
    { text: "Masada olan: ", options: { bold: true, color: C.tealOnDark } },
    { text: "kanıtlanmış platform + 5,5 yıllık ekip/know-how + canlı dağıtım + ~$1,04M/yıl motor. Bunu satıcı-müşteri ilişkisi değil, ortaklık taşır.", options: {} },
  ], { x: 0.6, y: 4.95, w: 12.1, h: 1.0, fontSize: 16, color: C.lightText, lineSpacingMultiple: 1.18, fontFace: F.b, align: "left", valign: "top", margin: 0 });
  footer(s, "NewCo 3-katman modeli ve run-rate Context Bootstrap v13 §1 + Mind Map v5 §7.", true);
  s.addNotes("Kapanış: değer sürüyor → NewCo. 3-katman (K1 egemen bulut, K2 ArMES/IoT-Ignite, K3 dikey AI). Masada: platform + ekip + dağıtım + motor. Bu, broader deal'in (term sheet, ACT) köprüsü.");
})();

// ===== SLIDE 8 — APPENDIX =====
(() => {
  const s = pres.addSlide(); bg(s, false);
  s.addText("Ek — Değer kanıt arşivi", { x: 0.6, y: 0.5, w: 12.1, h: 0.7, fontSize: 27, bold: true, color: C.navyText, fontFace: F.h, align: "left", valign: "middle", margin: 0 });
  s.addText("Her başlık kaynağa izli. Bu içsel/YK versiyon; owner-facing'e geçerken içsel kalemler (öz-kaynak, hasar rakamı) çıkarılır.", { x: 0.6, y: 1.28, w: 12.1, h: 0.5, fontSize: 13.5, color: C.body, fontFace: F.b, align: "left", valign: "top", margin: 0 });
  const head = (t) => ({ text: t, options: { bold: true, color: C.white, fill: { color: C.navy }, fontFace: F.b, align: "left", valign: "middle" } });
  const rows = [
    [head("Bulgu"), head("Değer"), head("Kaynak · TIER")],
    ["İlişki süresi", "~5,5 yıl (2019–2026)", "2019 sözleşme + SCL imza (15.08.2024) · T1"],
    ["Doğuş (2019)", "IoT-Ignite ×200 + PilarOS · $81K + 100K TL", "Kale 2019 sözleşmesi (29.03.2019) · T1"],
    ["Toplam Kale eforu", "~440 adam-ay (tüm fazlar)", "PrjTimes · çok-kodlu; IoT-Ignite hariç · yeniden-türetilecek · T2"],
    ["Yaygınlaştırma kapsamı", "16 tesis/hat", "SCL Tablo-1 (tesis×faz eşleştirmesi) · T1"],
    ["Platform yığını", "IoT-Ignite · ArMES/MOM · ArAI · CWF", "Context Bootstrap v13 §1 · T2"],
    ["İleriye-dönük motor", "~$1,04M/yıl (büyüyen)", "Mind Map v5 §7 · T2"],
    ["SCL ticari hasar (içsel)", "~₺31,3M (~$777K)", "Mizan/sözleşme · Mind Map v5 §18–§22 · T1"],
  ];
  s.addTable(rows, { x: 0.6, y: 1.95, w: 12.1, colW: [3.5, 3.6, 5.0], rowH: 0.52, fontSize: 11.5, fontFace: F.b, color: C.body, valign: "middle", align: "left", border: { type: "solid", pt: 0.5, color: C.hair }, fill: { color: "FFFFFF" }, autoPage: false });
  footer(s, "İlişki kronolojisi: 2019→SCL, beş belge kaynak-izli; efor/hasar provenance Mind Map v5 §22–§23.", false);
  s.addNotes("Değer provenance. ~440 ay T2 (re-derivation pending). Doğuş 2019 T1. Hasar ₺31,3M T1 (içsel). Owner-facing'de öz-kaynak/hasar/içsel kalemler çıkar.");
})();

pres.writeFile({ fileName: "/home/claude/ARDIC_Kale_Deger_Onur_Deck_v1.pptx" }).then((fn) => console.log("WROTE", fn)).catch((e) => { console.error("ERR", e); process.exit(1); });
