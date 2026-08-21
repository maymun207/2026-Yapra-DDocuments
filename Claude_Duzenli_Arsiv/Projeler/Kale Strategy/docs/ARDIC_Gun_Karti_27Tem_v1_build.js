// ARDIC_Gun_Karti_27Tem_v1 — İÇ NOT · YALNIZ ŞAHSİ KULLANIM
// Glance-safe kodlama: taban rakamı YOK, altın/hasar/ceza YOK, "ACT" yerine YATIRIMCI, "29" yerine Salı, kişiler kısaltma.
const pptxgen = require("pptxgenjs");

const NAVY = "1F3864", TEAL = "13A89E", TEALD = "0E7C74", AMBER = "C8862A";
const INK = "2B2B2B", GRAY = "5A5A5A", CARD = "F4F7FA", TINT = "FDF6EA", TEALT = "E9F5F4", LINE = "E1E7EE";

const p = new pptxgen();
p.defineLayout({ name: "A4P", width: 8.27, height: 11.69 });
p.layout = "A4P";
const s = p.addSlide();
s.background = { color: "FFFFFF" };

const MX = 0.40;
const LW = 2.98;                 // sol kolon genişliği
const RX = MX + LW + 0.16;       // sağ kolon x
const RW = 8.27 - MX - RX;       // sağ kolon genişliği (~4.73)

// ---------- Başlık ----------
s.addText("İÇ NOT · YALNIZ ŞAHSİ KULLANIM — MASAYA AÇIK KONMAZ", {
  x: MX, y: 0.28, w: 5.9, h: 0.18, margin: 0, fontFace: "Calibri", fontSize: 7.5, bold: true, color: AMBER, charSpacing: 1.5 });
s.addText("27.07.2026", { x: 8.27 - MX - 1.2, y: 0.28, w: 1.2, h: 0.18, margin: 0, align: "right", fontFace: "Calibri", fontSize: 7.5, color: GRAY });
s.addText("GÜN KARTI — İki Masa, Bir Pusula", {
  x: MX, y: 0.46, w: 7.47, h: 0.34, margin: 0, fontFace: "Calibri", fontSize: 17, bold: true, color: NAVY });

// ---------- Kolon kartları (arka plan) ----------
const TOPY = 0.94, COLH = 8.60;
s.addShape(p.ShapeType.roundRect, { x: MX, y: TOPY, w: LW, h: COLH, rectRadius: 0.06, fill: { color: CARD }, line: { color: LINE, width: 0.75 } });
s.addShape(p.ShapeType.roundRect, { x: RX, y: TOPY, w: RW, h: COLH, rectRadius: 0.06, fill: { color: "FFFFFF" }, line: { color: TEAL, width: 1 } });

// ---------- Blok yardımcıları ----------
let yL = TOPY + 0.12, yR = TOPY + 0.12;
const PAD = 0.14;

function colHead(x, w, isLeft, title, sub) {
  const y = isLeft ? yL : yR;
  s.addText(title, { x: x + PAD, y: y, w: w - 2 * PAD, h: 0.22, margin: 0, fontFace: "Calibri", fontSize: 11.5, bold: true, color: NAVY });
  s.addText(sub, { x: x + PAD, y: y + 0.22, w: w - 2 * PAD, h: 0.30, margin: 0, fontFace: "Calibri", fontSize: 7.3, italic: true, color: GRAY, lineSpacingMultiple: 1.0 });
  if (isLeft) yL = y + 0.56; else yR = y + 0.56;
}

// runs: pptxgenjs text array; h: gövde yüksekliği
function block(isLeft, label, runs, h, labelColor) {
  const x = isLeft ? MX : RX, w = isLeft ? LW : RW;
  const y = isLeft ? yL : yR;
  s.addText(label, { x: x + PAD, y: y, w: w - 2 * PAD, h: 0.15, margin: 0, fontFace: "Calibri", fontSize: 7, bold: true, color: labelColor || TEALD, charSpacing: 1.2 });
  s.addText(runs, { x: x + PAD, y: y + 0.155, w: w - 2 * PAD, h: h, margin: 0, fontFace: "Calibri", fontSize: 8, color: INK, lineSpacingMultiple: 1.05, valign: "top" });
  const ny = y + 0.155 + h + 0.07;
  if (isLeft) yL = ny; else yR = ny;
}
const Q = (t) => ({ text: t, options: { italic: true, color: TEALD } });          // ezber cümle
const B = (t) => ({ text: t, options: { bold: true, color: NAVY } });
const N = (t) => ({ text: t, options: {} });

// ================= SOL KOLON — SABAH =================
colHead(MX, LW, true, "SABAH · G. KAHVALTISI", "mod: %70 dinle · amaç: hizala + oku + Salı'yı şekillendir · müzakere DEĞİL");

block(true, "TEK MESAJ", [
  Q("\u201CSüreç owner seviyesinde canlı; yapısal aşamaya giriyor. Temiz çıkışınız işlemin tanımlı bileşeni — 12 aylık pencerenizle uyumlu tek yol bu.\u201D"),
], 0.62);

block(true, "SALI ÇERÇEVESİ", [
  Q("\u201CMasadan önce konuşulan her sayı, konuşanın aleyhine çalışır.\u201D"), N("  "),
  Q("\u201CLP hattında detay süreci bulandırır — önce sizin fiyatınızı bozar.\u201D"),
], 0.62);

block(true, "SORU GELİRSE", [
  B("Değerleme → "), Q("\u201CMasada, kayıtla oluşur.\u201D"), N("   "),
  B("Not/dönüşüm → "), Q("\u201CKapanış paketinin bütünü içinde.\u201D"), N("  Taahhüt sıfır."),
], 0.60);

block(true, "ÖDEV VER", [
  N("Kapanış dosyası hazır olsun: "), B("cap table · not belgeleri · yetki zinciri."),
], 0.44);

block(true, "TOPLA", [
  N("beklenti sinyali · fon baskısı şiddeti · vadeli ödemeye açıklık · Z-temas ritmi."),
], 0.44);

block(true, "SÖYLENMEZ", [
  N("öğleden sonraki masa · tutarlar · takvim · yapı.  Tavan: "),
  Q("\u201CÜst düzey temaslar bu dönemde yoğun.\u201D"),
], 0.58, AMBER);

block(true, "ÇIKIŞ", [
  Q("\u201CNetleşince ilk bilgilendirilecek taraf sizsiniz.\u201D"), N("  (tarihsiz)"),
], 0.42);

// ================= SAĞ KOLON — ÖĞLEDEN SONRA =================
colHead(RX, RW, false, "ÖĞLEDEN SONRA · SAHİPLER MASASI", "Z + E + COO + Cem — karar odası · yürütme kanıttır, gündem iki karardır");

block(false, "AÇILIŞ (EZBER)", [
  Q("\u201CYedi yılda fabrikalarınızın sinir sistemini kurduk — dört tesisiniz gerçeği saniye saniye kaydediyor. Zamanın %65'i geçti; lisans motorunun %14'ü çalışıyor. Pencere yenilenmiyor, kaybeden ikimiz. Buraya istemeye değil, iki karar önermeye geldik.\u201D"),
], 0.70);

block(false, "RAKAM SETİ — YALNIZ BUNLAR", [
  B("%65"), N(" zaman · "), B("%44"), N(" NRE · "), B("%14"), N(" lisans · kalan "), B("~12,6 ay"), N(" · gerek "), B("$100K/ay"), N(" vs fiili $43K = "), B("2,3×"), N(" · atıl "), B("~$336K"), N(" · avans "), B("$350K"), N(" (çift-mahsup) · "), B("45g"), N(" term sheet · "), B("90g"), N(" sprint · Haluk "), B("≤10g"),
], 0.46);

block(false, "İSTİSNA ANI (vade kararı açıklanınca)", [
  N("Teşekkür + "), Q("\u201CNakit akışı vade × hacim çarpımıdır. Vade kararını verdiniz; hacim kararı bu masada.\u201D"),
], 0.42);

block(false, "CEM", [
  N("Kapasite: 7 yıl üretimde · 4 canlı tesis · karo-seviyesi iz. "),
  Q("\u201CHam veri sözleşme gereği müşteri ortamında kalır; tam on-prem mümkün.\u201D"),
  N(" 90 sn canlı demo hazır. Davet: "), Q("\u201Cİlk hafta Cem Bey'le tam günlük teknik oturum.\u201D"),
  N(" Mimari harita YOK.  Yılbaşı: "), Q("\u201CTemas doğru ihtiyacı gösterdi; eksik olan yapıydı — o yapı bu masada kuruluyor.\u201D"),
], 0.88);

block(false, "RAKİP / OEM — yalnız COO açarsa", [
  Q("\u201CRakip verinizi değil, platformun yeteneğini alır — ham veri sizde kalır. Asıl soru: rakibiniz bu platformu aldığında, sahibi siz olacak mısınız?\u201D"),
  N("  Fiyat/komisyon bugün yok → çalışma grubu."),
], 0.58);

block(false, "\u201CKAÇ PARA?\u201D GELİRSE", [
  Q("\u201CBugün üç şeyi kilitleyelim: yapı, takvim, ekip. Rakam 45 günde masada, kayıtla oluşur — sürpriz olmayacak. Yönü bugün kilitleyelim; hızı ben getiriyorum.\u201D"),
], 0.52);

block(false, "YATIRIMCI — yalnız Z açarsa", [
  Q("\u201CDoğru adres sizsiniz. Tek ricam iki masanın senkron yürümesi — hisse çıkış fiyatı ile işletme değeri ayrı defterlerdir.\u201D"),
  N("  Sabahtan tek kelime yok."),
], 0.54);

block(false, "GEÇMİŞ / KARŞILIK", [
  N("Geçmiş → "), Q("\u201CTempoyu etkiledi; bu karar tempoyu korur.\u201D"), N(" (rakam yok)   Karşılık iması → "), Q("\u201CKarşılıklı kalemler açık-defter masasının işi.\u201D"),
], 0.44);

block(false, "4 TARİH — tarihsiz = çıktı değil", [
  B("\u2460"), N(" Haluk oturumu + mobilizasyon karar tarihi  "), B("\u2461"), N(" çalışma grubu: isimler + ilk oturum  "), B("\u2462"), N(" COO: blokaj listesi sahip + tarih  "), B("\u2463"), N(" Cem: teknik oturum."),
], 0.46, AMBER);

block(false, "SALI + KAPANIŞ", [
  N("\u201CSalı'ya kalın\u201D → "), B("EVET, koşulsuz."), N("  Kapanış (ezber): "),
  Q("\u201C2027'de Kale 70. yılına giriyor; aynı ay bu pencere kapanıyor. Bu tarih ya bir kayıp tarihi olacak ya bir kuruluş tarihi.\u201D"),
], 0.56);

// ================= ALT ŞERİT — İÇ PUSULA =================
const PY = 9.62, PH = 1.78;
s.addShape(p.ShapeType.roundRect, { x: MX, y: PY, w: 8.27 - 2 * MX, h: PH, rectRadius: 0.06, fill: { color: TINT }, line: { color: AMBER, width: 1 } });
s.addText("İÇ PUSULA — HER TEKLİFE ÜÇ SORU", {
  x: MX + PAD, y: PY + 0.10, w: 7.2, h: 0.18, margin: 0, fontFace: "Calibri", fontSize: 8.5, bold: true, color: AMBER, charSpacing: 1.2 });
s.addText([
  B("\u2460 "), N("Alacağa "), B("tarih + teminat"), N(" var mı?   "),
  B("\u2461 "), N("Yük (maaş / borç çevirme) "), B("ilk günden devroluyor"), N(" mu?   "),
  B("\u2462 "), N("Gelecek yükümlülüğüm "), B("süre + kapsam sınırlı"), N(" mı?"),
], { x: MX + PAD, y: PY + 0.32, w: 8.27 - 2 * MX - 2 * PAD, h: 0.26, margin: 0, fontFace: "Calibri", fontSize: 8.6, color: INK, lineSpacingMultiple: 1.05 });
s.addText([
  B("3 evet = imzala. Tek hayır = hayır"), N(" — parlaklığına bakma."),
], { x: MX + PAD, y: PY + 0.60, w: 8.27 - 2 * MX - 2 * PAD, h: 0.20, margin: 0, fontFace: "Calibri", fontSize: 8.6, color: INK });
s.addText([
  B("SESSİZLER: "), N("taban · geçmiş rakamları · sabah görüşmesi · yüzdeler ve bantlar."),
], { x: MX + PAD, y: PY + 0.86, w: 8.27 - 2 * MX - 2 * PAD, h: 0.20, margin: 0, fontFace: "Calibri", fontSize: 8.4, color: INK });
s.addText([
  B("DURUŞ: "), N("sakin · açık · acelesiz — saat onlarda işliyor.  El sıkışma anı gelirse: "), B("ilke evet, fiyat asla."),
], { x: MX + PAD, y: PY + 1.10, w: 8.27 - 2 * MX - 2 * PAD, h: 0.20, margin: 0, fontFace: "Calibri", fontSize: 8.4, color: INK });
s.addText("Kaynak: Bootstrap v19 · Mind Map v11 kilitli seti — kart glance-safe kodlanmıştır; kişi/rakam detayı bilinçli dışarıdadır.", {
  x: MX + PAD, y: PY + 1.38, w: 8.27 - 2 * MX - 2 * PAD, h: 0.18, margin: 0, fontFace: "Calibri", fontSize: 6.8, italic: true, color: GRAY });

p.writeFile({ fileName: "/home/claude/ARDIC_Gun_Karti_27Tem_v1.pptx" })
  .then(() => console.log("OK: Gun Karti v1 yazildi"));
