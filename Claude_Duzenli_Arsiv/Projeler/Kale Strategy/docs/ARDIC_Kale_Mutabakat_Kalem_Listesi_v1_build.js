// ARDIC_Kale_Mutabakat_Kalem_Listesi_v1 — Finans ekipleri çalışma belgesi (A4, 2 sayfa)
// Hijyen sınıfı: KALE-FACING (finans katı). Ceza/689/finansman/ACT/isim/entegre-toplam YOK.
// Dil disiplini: "fark/tahakkuk/bakiye" — "hasar/kayıp/zarar" YOK. Sıfır-itiraf, litigation-safe.
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, ShadingType, AlignmentType, BorderStyle, Footer, PageNumber,
} = require("docx");
const fs = require("fs");

const NAVY = "1F3864";
const TEAL = "13A89E";
const INK  = "2B2B2B";
const GRAY = "5A5A5A";
const LINE = "D9E1EA";
const CARD = "F4F7FA";

const F = "Calibri";
const cellBorders = {
  top:    { style: BorderStyle.SINGLE, size: 4, color: LINE },
  bottom: { style: BorderStyle.SINGLE, size: 4, color: LINE },
  left:   { style: BorderStyle.SINGLE, size: 4, color: LINE },
  right:  { style: BorderStyle.SINGLE, size: 4, color: LINE },
};

const P = (text, opts = {}) => new Paragraph({
  spacing: { after: opts.after ?? 120, line: opts.line ?? 252 },
  alignment: opts.align,
  children: (Array.isArray(text) ? text : [{ t: text, o: {} }]).map(seg =>
    new TextRun({
      text: seg.t, font: F,
      size: seg.o.size ?? opts.size ?? 20,
      bold: seg.o.bold ?? opts.bold ?? false,
      italics: seg.o.italics ?? opts.italics ?? false,
      color: seg.o.color ?? opts.color ?? INK,
      characterSpacing: seg.o.charSpace ?? opts.charSpace,
    })
  ),
});

// ---- tablo hücre yardımcıları ----
const W = [700, 1850, 2450, 2050, 1750, 1400]; // toplam 10200 DXA ≈ 7,08"
const cell = (txt, w, o = {}) => new TableCell({
  width: { size: w, type: WidthType.DXA },
  borders: cellBorders,
  shading: o.fill ? { type: ShadingType.CLEAR, fill: o.fill } : undefined,
  margins: { top: 60, bottom: 60, left: 80, right: 80 },
  children: (Array.isArray(txt) ? txt : [txt]).map(t => new Paragraph({
    spacing: { after: 0, line: 216 },
    children: [new TextRun({
      text: t, font: F, size: o.size ?? 17,
      bold: o.bold ?? false, color: o.color ?? INK, italics: o.italics ?? false,
    })],
  })),
});
const headRow = new TableRow({
  tableHeader: true,
  children: ["Blok", "Kalem", "Dayanak (sözleşme / kayıt)", "Hesap yöntemi", "ARDIÇ ön değerlendirmesi*", "Masa çıktısı"]
    .map((h, i) => cell(h, W[i], { fill: NAVY, color: "FFFFFF", bold: true, size: 17 })),
});
const row = (arr, fill) => new TableRow({
  children: arr.map((t, i) => cell(t, W[i], { fill, bold: i === 0, color: i === 0 ? NAVY : INK })),
});

const doc = new Document({
  styles: { default: { document: { run: { font: F, size: 20, color: INK } } } },
  sections: [{
    properties: { page: { margin: { top: 900, bottom: 900, left: 1000, right: 1000 } } },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "ÖZEL VE GİZLİDİR · Finans Ekipleri Çalışma Belgesi · Sayfa ", font: F, size: 14, color: GRAY }),
            new TextRun({ children: [PageNumber.CURRENT], font: F, size: 14, color: GRAY }),
          ],
        })],
      }),
    },
    children: [
      // ---------- Kimlik + başlık ----------
      P([{ t: "ARDICTECH  ·  KALE GRUBU FİNANS EKİPLERİNE", o: { bold: true, color: TEAL, size: 16, charSpace: 20 } }], { after: 40 }),
      P([{ t: "Açık-Defter Mutabakatı — Kalem Listesi ve Süreç Çerçevesi", o: { bold: true, color: NAVY, size: 30 } }], { after: 60 }),
      P([{ t: "17 Temmuz 2026 · Mobilizasyon Önerisi Madde 4'ün uygulama belgesidir · ÖZEL VE GİZLİDİR", o: { color: GRAY, size: 16 } }], { after: 180 }),

      // ---------- 1. Amaç ve ilkeler ----------
      P([{ t: "1. Amaç ve İlkeler", o: { bold: true, color: NAVY, size: 22 } }], { after: 80 }),
      P("Bu belge, taraflar arasındaki karşılıklı açık kalemlerin otuz gün içinde, tek oturumda ve belge üzerinden mutabakata bağlanması için başlangıç çerçevesidir. Dört ilkeye dayanır:", { after: 80 }),
      P([{ t: "Beyan değil belge. ", o: { bold: true, color: NAVY } }, { t: "Tablodaki her kalem bir sözleşme hükmüne ve bir kayıt sınıfına atıflıdır; belgesi olmayan kalem tabloda kalmaz.", o: {} }], { after: 60 }),
      P([{ t: "Çift yönlülük. ", o: { bold: true, color: NAVY } }, { t: "Kale tarafının karşı-kalemleri aynı tabloya, aynı disiplinle girer (F bloğu bu amaçla açık bırakılmıştır).", o: {} }], { after: 60 }),
      P([{ t: "Bağlayıcılık sınırı. ", o: { bold: true, color: NAVY } }, { t: "Ön değerlendirme sütunundaki tutarlar bağlayıcı teklif değil, mutabakat başlangıç noktasıdır; kesin tutarlar masada, kayıt üzerinden oluşur.", o: {} }], { after: 60 }),
      P([{ t: "Sonuç bağlantısı. ", o: { bold: true, color: NAVY } }, { t: "Mutabık kalınan bakiye, tarafların tercihine göre bir ödeme planına veya görüşülen stratejik ortaklık yapısında mahsuba bağlanabilir.", o: {} }], { after: 180 }),

      // ---------- 2. Kalem tablosu ----------
      P([{ t: "2. Kalem Listesi", o: { bold: true, color: NAVY, size: 22 } }], { after: 80 }),
      new Table({
        width: { size: 10200, type: WidthType.DXA },
        columnWidths: W,
        rows: [
          headRow,
          row(["A", "Cari hesap eşleştirmesi",
               "İki tarafın cari ekstreleri; fatura, ödeme ve bakiye kayıtları",
               "Defter-defter mekanik eşleştirme",
               "— (masada oluşur)",
               "Mutabık bakiye tutanağı"]),
          row(["B", "Madde 3.6 tahakkuku",
               "SCL md. 3.6 (plan değişikliği hâlinde aylık ₺485.483 tahakkuk öngören hüküm) + yazılı/imzalı revizyon kayıtları",
               "Aylık tutar × belgeli plan-değişikliği dönemi; hüküm bugüne dek hiç işletilmemiştir",
               "~$150–250K (dönem tespitine bağlı)",
               "Dönem tespiti + tutar"], CARD),
          row(["C", "Gerçekleşmiş, faturalanmamış iş",
               "İş ve saha kayıtları + zaman çizelgeleri; örnek: KB3 yeniden-entegrasyonu (Temmuz 2025, bedelsiz gerçekleştirildi)",
               "Adam-saat × sözleşme birim bedelleri",
               "~$150–210K",
               "Kayıt incelemesi + tutar"]),
          row(["D", "Pencere-içi lisans farkı (ileriye dönük)",
               "SCL md. 3.7 + Tablo-8; imzalı revizyon takvimi; Kale Ocak-2026 kesiti ile çapraz doğrulama (±%4)",
               "Plan tahakkuku − fiili faturalama",
               "Plan 2025-26: $688.385 · Fiili: $98.698 (17.07.2026 itibarıyla)",
               "Geriye dönük fatura talebi DEĞİLDİR; telafi mekanizması Mobilizasyon md. 2-3"], CARD),
          row(["E", "Ödenmiş, devreye alınmamış değer",
               "KB3 ($225.227) + YK Masse ($110.935) fatura ve ödeme kayıtları",
               "Aktivasyon ön koşul listesi + saha takvimi",
               "$336.162 — Kale lehine planlama kalemi",
               "60–90 günlük aktivasyon takvimi"]),
          row(["F", "Kale karşı-kalemleri",
               "Kale tarafınca belgelenecek",
               "Aynı disiplin",
               "(açık)",
               "Aynı tabloya işlenir"], CARD),
        ],
      }),
      P([{ t: "* Ön değerlendirmeler bağlayıcı değildir; USD tutarlar sözleşme kuru (₺32,3655) bazlıdır. Güncel kur farkları masada ayrıca ele alınır.", o: { italics: true, size: 15, color: GRAY } }], { after: 200 }),

      // ---------- 3. Yöntem notları ----------
      P([{ t: "3. Yöntem Notları", o: { bold: true, color: NAVY, size: 22 } }], { after: 80 }),
      P([{ t: "B bloğu — ", o: { bold: true, color: NAVY } }, { t: "tahakkuk hükmü sözleşmede mevcuttur ve bugüne dek işletilmemiştir; bu kalem yeni bir talep değil, defter düzeltmesi niteliğindedir. Tetikleyici belgeler tarafların ortak revizyon kayıtlarıdır.", o: {} }], { after: 80 }),
      P([{ t: "D bloğu — ", o: { bold: true, color: NAVY } }, { t: "revizyon takvimleri iki tarafın ortak imzalı kayıtlarıdır; bu blok geriye dönük fatura üretmez. İşlevi, pencere içinde kalan lisans değerinin korunma mekanizmasını (aylık hakediş temposu ve Faz4 kapanışı) rakamsal olarak gerekçelendirmektir. ARDIÇ plan modeli, Kale'nin kendi Ocak-2026 kesitiyle yüzde dört içinde örtüşmektedir — tartışma yöntem üzerinde değil, yalnızca takvim üzerindedir.", o: {} }], { after: 80 }),
      P([{ t: "E bloğu — ", o: { bold: true, color: NAVY } }, { t: "bu kalem ARDIÇ alacağı değildir; Kale'nin ödemiş olduğu ve henüz değere dönüşmemiş yatırımın aktivasyon planıdır. Tabloya alınma nedeni, mutabakatın tek yönlü bir alacak listesi değil, ortak bir defter fotoğrafı olmasıdır.", o: {} }], { after: 180 }),

      // ---------- 4. Süreç takvimi ----------
      P([{ t: "4. Süreç Takvimi (T = mutabakat kararı)", o: { bold: true, color: NAVY, size: 22 } }], { after: 80 }),
      P([{ t: "T+10 — ", o: { bold: true, color: TEAL } }, { t: "karşılıklı veri paylaşımı: cari ekstreler, revizyon kayıtları, zaman çizelgeleri, fatura ve ödeme dökümleri, aktivasyon ön koşul listeleri.", o: {} }], { after: 60 }),
      P([{ t: "T+20 — ", o: { bold: true, color: TEAL } }, { t: "finans ekipleri ön eşleştirmesi (uzaktan); kalem bazında \u201Cmutabık / kısmen mutabık / açık\u201D ön statüleri.", o: {} }], { after: 60 }),
      P([{ t: "T+30 — ", o: { bold: true, color: TEAL } }, { t: "tek oturum mutabakat masası ve imzalı tutanak; mutabık bakiye için ödeme planı veya stratejik yapı mahsubu tercihi.", o: {} }], { after: 180 }),

      // ---------- Kapanış ----------
      P([{ t: "Bu liste kapalı değil, açıktır: masaya belgeyle gelen her kalem tabloya girer; belgesiz hiçbir kalem tabloda kalmaz — iki taraf için de.", o: { bold: true, color: NAVY } }], { after: 0 }),
    ],
  }],
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync("/home/claude/ARDIC_Kale_Mutabakat_Kalem_Listesi_v1.docx", buf);
  console.log("OK: docx yazıldı");
});
