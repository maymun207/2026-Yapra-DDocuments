const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.author = "ARDICTECH";
pres.title = "Sahiplere Özel — Kale·ARDIÇ (v2)";

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
  s.addText([{ text: "Kaynak: ", options: { bold: true } }, { text: src }], { x: 0.6, y: 7.04, w: 9.7, h: 0.32, fontSize: 9, italic: true, color: dark ? "7E8CA3" : C.mute, fontFace: F.b, align: "left", margin: 0, valign: "middle" });
  s.addText("ARDICTECH · Gizli", { x: 10.4, y: 7.04, w: 2.3, h: 0.32, fontSize: 9, italic: true, color: dark ? "7E8CA3" : C.mute, fontFace: F.b, align: "right", margin: 0, valign: "middle" });
}
function header(s, n, title, dark) {
  s.addShape(pres.shapes.OVAL, { x: 0.6, y: 0.52, w: 0.62, h: 0.62, fill: { color: dark ? C.tealOnDark : C.teal }, line: { width: 0 } });
  s.addText(String(n), { x: 0.6, y: 0.52, w: 0.62, h: 0.62, fontSize: 22, bold: true, color: dark ? C.navy : C.white, align: "center", valign: "middle", fontFace: F.h, margin: 0 });
  s.addText(title, { x: 1.45, y: 0.46, w: 11.25, h: 0.78, fontSize: 27, bold: true, color: dark ? C.lightText : C.navyText, align: "left", valign: "middle", fontFace: F.h, margin: 0 });
}
function card(s, x, y, w, h, dark) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.09, fill: { color: dark ? C.cardNavy : C.cardLight }, line: { color: dark ? C.cardNavy : C.hair, width: 0.75 }, shadow: dark ? makeShadowDark() : makeShadow() });
}

// ===== SLIDE 1 — KAPAK (enerjili) =====
(() => {
  const s = pres.addSlide(); bg(s, true);
  s.addShape(pres.shapes.OVAL, { x: 10.7, y: -1.7, w: 4.4, h: 4.4, fill: { color: C.navy }, line: { color: C.tealOnDark, width: 1.25 } });
  s.addShape(pres.shapes.OVAL, { x: 0.6, y: 1.06, w: 0.34, h: 0.34, fill: { color: C.tealOnDark }, line: { width: 0 } });
  s.addText("ARDICTECH · Kale ortaklığı · 2019–2026", { x: 1.05, y: 1.0, w: 9, h: 0.45, fontSize: 14, bold: true, color: C.tealOnDark, charSpacing: 2, fontFace: F.b, align: "left", valign: "middle", margin: 0 });
  s.addText("Birlikte kanıtladık.\nŞimdi birlikte büyütelim.", { x: 1.0, y: 1.95, w: 11.5, h: 2.0, fontSize: 46, bold: true, color: C.lightText, lineSpacingMultiple: 1.02, fontFace: F.h, align: "left", valign: "middle", margin: 0 });
  s.addText("2019'dan bugüne fabrikalarda canlı bir üretim-zekâsı kurduk. Asıl fırsat şimdi başlıyor: KS'yi öne çıkaran, Kale Holding'e yayılan, Türkiye'ye ve dünyaya açılabilen bir kaldıraç.", { x: 1.0, y: 4.4, w: 11.0, h: 0.95, fontSize: 16, color: C.lightMute, lineSpacingMultiple: 1.18, fontFace: F.b, align: "left", valign: "top", margin: 0 });
  s.addText("Haziran 2026", { x: 1.0, y: 6.55, w: 4, h: 0.4, fontSize: 13, color: C.lightMute, fontFace: F.b, align: "left", valign: "middle", margin: 0 });
  s.addText("Gizli · Sahiplere özel", { x: 6.0, y: 6.55, w: 6.7, h: 0.4, fontSize: 11, italic: true, color: "7E8CA3", fontFace: F.b, align: "right", valign: "middle", margin: 0 });
  s.addNotes("Açılış proof→ambition. 'Kanıtladık → büyütelim.' Sıcak ama yüksek-irtifa. Bahsi ve ölçeği kesinlikle koy; bağır değil, emin ol.");
})();

// ===== SLIDE 2 — PERDE 1: BİRLİKTELİK (timeline = rampa) =====
(() => {
  const s = pres.addSlide(); bg(s, false);
  header(s, 1, "Birliktelik: 2019'dan bugüne derinleşen ortaklık", false);
  s.addText("Kale ilişkisi 2019'da ARDIÇ'ın kendi edge platformuyla başladı; MES'e, oradan AI'a ve ölçeğe derinleşti. Her tarih kaynağa izli.", { x: 0.6, y: 1.3, w: 12.1, h: 0.5, fontSize: 13.5, color: C.body, fontFace: F.b, align: "left", valign: "top", margin: 0 });
  const cw = 2.27, ch = 3.35, gap = 0.2, x0 = 0.6, cy = 2.2;
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
    s.addText(st[2], { x: x + 0.22, y: cy + 1.28, w: cw - 0.44, h: 1.95, fontSize: 11.5, color: C.body, fontFace: F.b, align: "left", valign: "top", lineSpacingMultiple: 1.18, margin: 0 });
  });
  card(s, 0.6, 5.85, 12.1, 0.95, false);
  s.addText([
    { text: "Yedi yıla yakın kesintisiz ortaklık: ", options: { bold: true, color: C.tealDark } },
    { text: "bir edge platformundan, fabrikalarda canlı dört katmanlı bir üretim-zekâsı sistemine. Bu, asıl fırsatın fırlatma rampası.", options: {} },
  ], { x: 0.95, y: 6.0, w: 11.4, h: 0.65, fontSize: 13.5, color: C.body, lineSpacingMultiple: 1.15, fontFace: F.b, align: "left", valign: "middle", margin: 0 });
  footer(s, "İlişki kronolojisi 2019→SCL; beş imzalı belge kaynak-izli (29.03.2019 · 19.08.2022 · 11.12.2023 · 07.05.2024 · 15.08.2024).", false);
  s.addNotes("Birliktelik = rampa. Kısa tut; vurgu derinleşme ve 'asıl fırsat henüz önümüzde.'");
})();

// ===== SLIDE 3 — PERDE 2: GERÇEK (sessiz görünürlük) — DARK =====
(() => {
  const s = pres.addSlide(); bg(s, true);
  header(s, 2, "Gösteri değil, gerçek: aracısız görünürlük", true);
  s.addText("Görünürlüğün bir kuralı var: haberli bir ölçüm önceden duyulur — ölçülen şey, ölçüldüğünü bildiği an hazırlanır. O zaman hep gösteriyi görürsünüz, gerçeği değil.", { x: 0.6, y: 1.5, w: 12.1, h: 0.75, fontSize: 16, color: C.lightMute, lineSpacingMultiple: 1.14, fontFace: F.b, align: "left", valign: "top", margin: 0 });
  const cy = 2.65, ch = 1.95, cw = 5.95, gap = 0.17, x0 = 0.6;
  const pair = [
    ["Haberli ölçüm", "Ayak sesi vardır; gelmeden hazırlanılır. Gördüğünüz, size hazırlanmış görüntüdür."],
    ["Sessiz ölçüm — ArMES", "Haber vermez. 7/24, gerçeği olduğu gibi, ham kaydeder; gösteriye fırsat tanımaz."],
  ];
  pair.forEach((p, i) => {
    const x = x0 + i * (cw + gap);
    card(s, x, cy, cw, ch, true);
    s.addText(p[0], { x: x + 0.32, y: cy + 0.28, w: cw - 0.64, h: 0.5, fontSize: 18, bold: true, color: C.tealOnDark, fontFace: F.h, align: "left", valign: "middle", margin: 0 });
    s.addText(p[1], { x: x + 0.32, y: cy + 0.86, w: cw - 0.64, h: 0.95, fontSize: 13.5, color: C.lightMute, fontFace: F.b, align: "left", valign: "top", lineSpacingMultiple: 1.18, margin: 0 });
  });
  card(s, 0.6, 4.9, 12.1, 1.5, true);
  s.addText([
    { text: "Fark, gösteri ile gerçek arasındadır. ", options: { bold: true, color: C.tealOnDark } },
    { text: "ArMES sizi gerçeğin tarafına geçirir — kendi zemininize aracısız, doğrudan komuta. İlk kez fabrikanızı, hazırlanmamış hâliyle, kendiniz görürsünüz.", options: {} },
  ], { x: 0.95, y: 5.1, w: 11.4, h: 1.15, fontSize: 15.5, color: C.lightText, lineSpacingMultiple: 1.2, fontFace: F.b, align: "left", valign: "middle", margin: 0 });
  footer(s, "ArMES/MOM sistem mimarisi — sürekli, otomatik veri yakalama; sahaya/cihaza inen kayıt katmanı.", true);
  s.addNotes("Ölçüm-görünürlüğü ilkesi olarak sun; kimseyi suçlama. Sahibi 'gerçeği gören/komuta eden' tarafa koy. 'Sessiz terlik' imgesini sözlü kullanabilirsin, hikâye adını verme — bırak tanısınlar. Demo'ya köprü.");
})();

// ===== SLIDE 4 — PERDE 3: CANLI SİSTEM (demo = rampa kanıtı) =====
(() => {
  const s = pres.addSlide(); bg(s, false);
  header(s, 3, "Canlı sistem: şimdi birlikte görelim", false);
  s.addText("Anlatmak yerine açalım. Üç şey gösterelim — her biri, daha önce görünmeyen. Bu, vizyonun kurulu olduğu kanıt.", { x: 0.6, y: 1.3, w: 12.1, h: 0.5, fontSize: 13.5, color: C.body, fontFace: F.b, align: "left", valign: "top", margin: 0 });
  const cw = 3.92, ch = 2.85, gap = 0.17, x0 = 0.6, cy = 2.15;
  const st = [
    ["Masse / Sır akışı", "Daha önce uçtan uca görünmeyen üretim akışı, ilk kez tam izlenebilir. Süreç artık ekranda, gerçek zamanlı."],
    ["Bir karonun şeceresi", "Hangi hammadde, hangi kamyon, hangi elektrolit, hangi pres, hangi reçete, hangi lab sonucu — karodan kamyona tam soyağacı."],
    ["Reçete & lab geçmişi", "Eskiden kâğıttı, geriye-dönüş güçtü. Şimdi: tarih ver; reçeteyi ve lab sonuçlarını anında gör."],
  ];
  st.forEach((p, i) => {
    const x = x0 + i * (cw + gap);
    card(s, x, cy, cw, ch, false);
    s.addShape(pres.shapes.OVAL, { x: x + 0.32, y: cy + 0.32, w: 0.5, h: 0.5, fill: { color: C.teal }, line: { width: 0 } });
    s.addText(String(i + 1), { x: x + 0.32, y: cy + 0.32, w: 0.5, h: 0.5, fontSize: 18, bold: true, color: C.white, align: "center", valign: "middle", fontFace: F.h, margin: 0 });
    s.addText(p[0], { x: x + 0.32, y: cy + 1.0, w: cw - 0.64, h: 0.5, fontSize: 16, bold: true, color: C.navyText, fontFace: F.h, align: "left", valign: "middle", margin: 0 });
    s.addText(p[1], { x: x + 0.32, y: cy + 1.52, w: cw - 0.64, h: 1.2, fontSize: 12.5, color: C.body, fontFace: F.b, align: "left", valign: "top", lineSpacingMultiple: 1.18, margin: 0 });
  });
  card(s, 0.6, 5.3, 12.1, 1.1, false);
  s.addText([
    { text: "Ekranı şimdi birlikte açalım. ", options: { bold: true, color: C.tealDark } },
    { text: "Bunlar slayt değil — canlı sistemde, sizin verinizle. Hangi soruyu sorarsanız, cevabını birlikte çekelim.", options: {} },
  ], { x: 0.95, y: 5.5, w: 11.4, h: 0.7, fontSize: 14, color: C.body, lineSpacingMultiple: 1.15, fontFace: F.b, align: "left", valign: "middle", margin: 0 });
  footer(s, "Canlı ArMES/MOM ortamı + proje kayıtları; şecere/izlenebilirlik sistem fonksiyonları.", false);
  s.addNotes("Protagonist moment — demo. Masse/Sır mızrak ucu. Bırak SAHİP kendi sorusunu sorsun. Operasyon: şehir-dışı bağlantı yedeği (offline/önbellekli + kayıtlı walkthrough) hazır.");
})();

// ===== SLIDE 5 — PERDE 4: ONUR (kompakt güven damgası) =====
(() => {
  const s = pres.addSlide(); bg(s, false);
  header(s, 4, "Onur: zorlandık, sözümüzü tuttuk", false);
  s.addText("Süreç kolay olmadı. ARDIÇ geri adım atmadı — sonuca ulaştı ve taahhütlerini onurlandırdı. Bu bir şikâyet değil; güvenebileceğiniz bir ortağın kanıtı.", { x: 0.6, y: 1.55, w: 12.1, h: 0.7, fontSize: 15, color: C.body, lineSpacingMultiple: 1.14, fontFace: F.b, align: "left", valign: "top", margin: 0 });
  const cy = 2.5, ch = 1.85, cw = 6.0, gx = 0.17, gy = 0.18, x0 = 0.6;
  const honor = [
    ["Geri adım atmadık", "Sistemi teslim ettik, sonuca ulaştık — projeyi yarıda bırakmadık."],
    ["Sözümüzü tuttuk", "Sahiplere ve paydaşlara verilen taahhütler onurlandırıldı."],
    ["Hakkımızı kullanmadık", "₺0 ceza / standby / gecikme faizi — sözleşmesel hakları işletmedik."],
    ["Yükü taşıdık", "Krizi yarıda bırakmadan; ekibi ve platformu ayakta tutarak taşıdık."],
  ];
  honor.forEach((h, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = x0 + col * (cw + gx), y = cy + row * (ch + gy);
    card(s, x, y, cw, ch, false);
    s.addShape(pres.shapes.OVAL, { x: x + 0.32, y: y + 0.34, w: 0.42, h: 0.42, fill: { color: C.teal }, line: { width: 0 } });
    s.addText(String(i + 1), { x: x + 0.32, y: y + 0.34, w: 0.42, h: 0.42, fontSize: 16, bold: true, color: C.white, align: "center", valign: "middle", fontFace: F.h, margin: 0 });
    s.addText(h[0], { x: x + 0.95, y: y + 0.3, w: cw - 1.25, h: 0.45, fontSize: 16, bold: true, color: C.navyText, fontFace: F.h, align: "left", valign: "middle", margin: 0 });
    s.addText(h[1], { x: x + 0.95, y: y + 0.82, w: cw - 1.25, h: 0.85, fontSize: 12.5, color: C.body, fontFace: F.b, align: "left", valign: "top", lineSpacingMultiple: 1.15, margin: 0 });
  });
  s.addText([
    { text: "Gerçek ve güvenilir. ", options: { bold: true, color: C.tealDark } },
    { text: "Bu zemin, büyük bir geleceği konuşmaya hak kazandırır — sırada o var.", options: { italic: true } },
  ], { x: 0.6, y: 6.45, w: 12.1, h: 0.5, fontSize: 13.5, color: C.body, fontFace: F.b, align: "left", valign: "middle", margin: 0 });
  footer(s, "Rezerv haklar SCL sözleşmesi md.3.6 / 3.11 / 11.1; teslim/sonuç proje kayıtları.", false);
  s.addNotes("Güven damgası — zirve değil. 'Gerçek + güvenilir → büyük geleceği konuşmaya hak.' Vizyona köprü.");
})();

// ===== SLIDE 6 — PERDE 5: ASIL RESİM / VİZYON (dark, zirve) =====
(() => {
  const s = pres.addSlide(); bg(s, true);
  header(s, 5, "Asıl resim: buradan dünyaya", true);
  s.addText([
    { text: "Kanıtlanmış, çalışan bir temel — 4 platform · 16 tesis · canlı gerçek-veri. ", options: { bold: true, color: C.tealOnDark } },
    { text: "Aynı kaldıraç dört kat büyür:", options: {} },
  ], { x: 0.6, y: 1.45, w: 12.1, h: 0.7, fontSize: 16, color: C.lightText, lineSpacingMultiple: 1.14, fontFace: F.b, align: "left", valign: "top", margin: 0 });

  const cw = 2.65, ch = 2.25, cy = 2.75, xs = [0.7, 3.77, 6.84, 9.91];
  const rungs = [
    ["KS", "Kazanma kaldıracı", "Enerji + verim → küresel rekabette öne."],
    ["KALE HOLDING", "Egemen AI yeteneği", "~20 şirket, tek katman — Holding'in malı."],
    ["TÜRKİYE", "Ulusal platform", "Sanayiye AI'ı yayan sahip. (Netaş hattı)"],
    ["GLOBAL", "İhraç ürünü", "Aynı sorun her yerde — dünyaya."],
  ];
  rungs.forEach((r, i) => {
    const x = xs[i];
    card(s, x, cy, cw, ch, true);
    s.addText(r[0], { x: x + 0.28, y: cy + 0.26, w: cw - 0.56, h: 0.35, fontSize: 12, bold: true, color: C.tealOnDark, charSpacing: 1.5, fontFace: F.b, align: "left", valign: "middle", margin: 0 });
    s.addText(r[1], { x: x + 0.28, y: cy + 0.7, w: cw - 0.56, h: 0.7, fontSize: 16.5, bold: true, color: C.lightText, fontFace: F.h, align: "left", valign: "top", lineSpacingMultiple: 1.0, margin: 0 });
    s.addText(r[2], { x: x + 0.28, y: cy + 1.42, w: cw - 0.56, h: 0.75, fontSize: 12, color: C.lightMute, fontFace: F.b, align: "left", valign: "top", lineSpacingMultiple: 1.16, margin: 0 });
  });
  [3.46, 6.53, 9.6].forEach((cxr) => {
    s.addText("›", { x: cxr, y: cy + 0.7, w: 0.34, h: 0.8, fontSize: 30, bold: true, color: C.tealOnDark, align: "center", valign: "middle", fontFace: F.h, margin: 0 });
  });

  card(s, 0.6, 5.35, 12.1, 1.1, true);
  s.addText([
    { text: "Aynı kaldıraç: ", options: { bold: true, color: C.tealOnDark } },
    { text: "KS'yi kazandırır, Holding'i güçlendirir, Türkiye'ye platform, dünyaya ürün. Bunu bir satıcı ilişkisi değil — ortaklık taşır.", options: {} },
  ], { x: 0.95, y: 5.52, w: 11.4, h: 0.78, fontSize: 15.5, color: C.lightText, lineSpacingMultiple: 1.18, fontFace: F.b, align: "left", valign: "middle", margin: 0 });
  footer(s, "Ölçek mimarisi ARDICTECH stratejik çerçevesi; Kale Holding kapsamı (~20 şirket); Netaş master-lisans hattı.", true);
  s.addNotes("ZİRVE. Enerji burada. Rampa = kanıtlanmış temel; tırmanış KS→Holding→Türkiye→Global. KS rungu kadına (domain/can simidi), Türkiye/Global erkeğe (ulusal/egemen). Uydurma pazar rakamı YOK; büyüklük merdivenden + bahisten. Kesin konuş, bağırma. NewCo'ya köprü.");
})();

// ===== SLIDE 7 — SENTEZ: NEWCO = ROKET + DAVET (dark) =====
(() => {
  const s = pres.addSlide(); bg(s, true);
  header(s, 6, "Bu geleceği taşıyan yapı: ortaklık", true);
  s.addText([
    { text: "Bu ölçek bir satıcı-müşteri ilişkisine sığmaz. ", options: { bold: true, color: C.tealOnDark } },
    { text: "Onu taşıyan yapı ortak-sahipliktir (NewCo) — değeri adil paylaşan, herkesi aynı geleceğe hizalayan üç katman.", options: {} },
  ], { x: 0.6, y: 1.5, w: 12.1, h: 0.85, fontSize: 16, color: C.lightText, lineSpacingMultiple: 1.14, fontFace: F.b, align: "left", valign: "top", margin: 0 });
  const cy = 2.6, ch = 2.05, cw = 3.92, gap = 0.17, x0 = 0.6;
  const layers = [
    ["K1 — Egemen AI bulut", "Holding BT harcamasının yönlendirilmesiyle finanse edilen egemen bulut katmanı."],
    ["K2 — ArMES / IoT-Ignite", "ARDIÇ lisansıyla kurulan üretim-zekâsı platformu — kanıtlanmış çekirdek."],
    ["K3 — Dikey AI ürünleri", "Enerji optimizasyonu, kalite görüntü, CWF — markete ve dünyaya açılan katman."],
  ];
  layers.forEach((l, i) => {
    const x = x0 + i * (cw + gap);
    card(s, x, cy, cw, ch, true);
    s.addText(l[0], { x: x + 0.3, y: cy + 0.28, w: cw - 0.6, h: 0.5, fontSize: 16, bold: true, color: C.tealOnDark, fontFace: F.h, align: "left", valign: "top", lineSpacingMultiple: 1.02, margin: 0 });
    s.addText(l[1], { x: x + 0.3, y: cy + 0.92, w: cw - 0.6, h: 1.0, fontSize: 12.5, color: C.lightMute, fontFace: F.b, align: "left", valign: "top", lineSpacingMultiple: 1.18, margin: 0 });
  });
  card(s, 0.6, 4.95, 12.1, 1.45, true);
  s.addText([
    { text: "Davet. ", options: { bold: true, color: C.tealOnDark } },
    { text: "İkinizin de bu resmi görmesini istedik. Sıradaki bölümü — KS'den dünyaya — birlikte kuralım. Bugün bir karar değil; bir başlangıç.", options: {} },
  ], { x: 0.95, y: 5.15, w: 11.4, h: 1.1, fontSize: 15.5, color: C.lightText, lineSpacingMultiple: 1.2, fontFace: F.b, align: "left", valign: "middle", margin: 0 });
  footer(s, "NewCo 3-katman modeli ARDICTECH stratejik çerçevesi; çekirdek sözleşme Tablo-8.", true);
  s.addNotes("Climax: NewCo = geleceği taşıyan ROKET, varış değil. Çatal owner-irtifasında. Kapanış DAVET, 'imzala' değil; adamın planına yer bırak. Legacy: 'sıradaki bölüm' — mezuniyet/nesil zemini.");
})();

pres.writeFile({ fileName: "/home/claude/ARDIC_Sahipler_Sunumu_v2.pptx" }).then((fn) => console.log("WROTE", fn)).catch((e) => { console.error("ERR", e); process.exit(1); });
