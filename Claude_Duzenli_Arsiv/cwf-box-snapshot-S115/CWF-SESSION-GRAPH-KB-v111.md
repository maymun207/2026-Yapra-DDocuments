# CWF — OTURUM GRAF BİLGİ TABANI · v111 (S111)
<!-- 2026-08-21. v110'u DEVRALIR. Bu belge NEDENSELLİK taşır: ne olduğu değil,
     neyin neyi ürettiği. Anlatıdır; kanonik durum docs/ground/ altındadır. -->

## §1 · OTURUMUN ŞEKLİ

Tek faz açıldı ve kapandı: `PHASE-ARCHITECT-GROUND-TRUTH-1`, dört şeritte paralel.
Beş PR indi (#317 · #318 · #319 · #321 · #322). Süre 16:00Z–21:41Z. 44 kart, 11 tur.
Üretim hiç düşmedi.

## §2 · NEDENSELLİK ZİNCİRİ — S110'un faturasından S111'in aletine

```
S110: Architect 9 öz-düzeltme, 6'sı ölçülebilir gerçeği yanlış beyan
      kaynak: oturumdan oturuma yeniden yazılan ÖZET ZİNCİRİ
        ↓
sahip hükmü: "aklını kaybeden bir mimarla köprü yapılmaz"
        ↓
PHASE-ARCHITECT-GROUND-TRUTH-1 → gerçek ÜRETİLİR, niyet YAZILIR, ikisi kapıyla kilitlenir
        ↓
      ┌────────────┬────────────┬────────────┬────────────┐
   facts.json    census      orphans     ledgers+RULE-54  architect:open
   (kod gerçeği) (canlı)     (öksüz)     (append-only)    (tek komut açılış)
        └────────────┴────────────┴────────────┴────────────┘
                                ↓
              S112 açılışı = "şu komutu koştur", "şu 20 belgeyi oku" DEĞİL
```

## §3 · BEŞ DEFEKT, TEK ŞEKİL — bu oturumun taşıyıcı bulgusu

> **Bakamayan bir alet cevap vermemelidir.**

| Vaka | "Bakamadım" neye dönüştü | Kim yakaladı |
|---|---|---|
| Barrel (re-export) | *"her repository tur yolunda okunuyor"* → her öksüz yok olur | AG-2, inşa ederken |
| Sahte öksüz | *"okuyucu yok"* = *"grep'im eşleşmedi"* | AG-2, **kendi aletinde**, SAYAN kontrolle |
| `total_count=0` | *"CI hiç koşmadı"* (= ALWAYS FAILED) — aslında yanlış sha | AG-3, AG-4, AG-1 (üç kez) |
| Defter kapısı | var olmayan kurala atıf — **atıfın silindiğini kanıtlayacak grep'in içinde** | AG-4, gate tarafından |
| `GI-015` | *"fabricated or rewritten provenance"* — aslında sığ klon | AG-3 ölçtü, AG-1 düzeltti, AG-4 tüketici tarafını |

**Neden aynı şekil:** hepsinde bir ölçüm başarısızlığı, bir ölçüm sonucunun yüzünü takıyor.
`MEASURE-READ-HONESTY-1` bunu yıllardır söylüyordu; S111 onu **koda** taşıdı: `UNKNOWN` ne suçlar
ne sessizce geçer, ve `{"value":null,"state":"unmeasured","reason":…}` şekli bunu mekanik yapar.

## §4 · ARCHITECT'İN HATA EKSENİ — ve neyin çaresi olduğu

S110'un ekseni **ölçülebilir gerçeği yanlış beyan**: özet zincirinden geliyordu → `docs/ground/`
ve `architect:open` onu kapattı.

S111'in ekseni **YAPISAL KART KUSURU**: adres ön-atama · iptal edilmemiş dur emri · sahipsiz
paylaşılan dosya · gözlemlenemez bekleyiş · zemin/yük karışımı · **yaşlanmış öncül**.
Altısı da tur maliyeti ürettti → çaresi `PHASE-ARCHITECT-CARD-GRAMMAR-1`.

**Değişmeyen üçüncü sınıf:** muhakeme. Onun çaresi bugün dört şeridin gösterdiği reflekstir —
**kart otoritedir ama öncül değildir** — ve bu oturumda bana yapılan her düzeltme bir şeritten
geldi. Refleks çalışıyor.

## §5 · YENİ DÜĞÜMLER (S112'de bilinmesi gerekenler)

- **`docs/ground/`** — yedi artefakt, CONTRACT v1.2 altında. Damga altı anahtar; sayılar
  `{value,state}` nesnesi; çok yazarlı yüzeyler **yazar başına** raporlanır; **MEASURED-only**.
- **`docs/ground/open-items.md`** — açık kalemlerin kanonik evi, iki kat kapısı arkasında.
- **`RULE-54`** — LIVE, relay gramerinde. Yapısal denetim: bir temelin BEYAN edildiğine bakar,
  doğru olduğuna değil. Migrasyon borcu 1512/1715.
- **`architect:open`** — dokuz alan, provenance etiketli, `UNMEASURED`+sebep.
- **Claim yürüyüşü** — `git commit-tree` ile (index'e ve ağaca dokunmaz) standart tarif;
  `--force-with-lease=<ref>:` boş beklentiyle **atomik test-and-set**, reddi bir ÖLÇÜMDÜR.
- **Heartbeat push** — şerit canlılığı kabloda okunur; sahibi harcamaz.
- **Entegrasyon dalı** — N iniş yerine tek sertifika: "bir kapı bir ağacı belgeler" kuralının
  üç kez yerine bir kez uygulanması.

## §6 · ÖLÇÜLEN SAYILAR (S112 tabanı)

```
master 2f080462 · tek ref · açık PR 0
docs/laws  55 kural · 15 anayasa
docs/ground 7 artefakt
orphans    ORPHAN 4 · READ-OFF-TURN 15 · READ-ON-TURN 37 · READ-ONLY 2 · INERT 0
           erişilebilirlik boşluğu 14 modül (moduleLoad 252 vs symbolUse 238)
census     backends 7 · tools 330 · entity 800 · behavior 194 · gateway 126 (79+47) · vector 342
memory     409 konu · 195 ulaşılabilir (%47.7) · 0 kırık link
relay      44 S111 kartı · 11 tur
suite      674 dosya · 9604 geçti
```

## §7 · v110'DAN TAŞINAN, HÂLÂ GEÇERLİ

Türev kaynağın yerine geçmez (Architect'in kendi protokolü dahil) · claim = ölçülmüş bayat sha'ya
pinli, **silme adımı yok** · bekleme sözleşmesi bekleyenin kendi aletiyle okuyabileceği sinyallerle
ifade edilir · **rebase sertifikayı iptal eder** · izolasyon tarafsız bir kontrol değildir ·
ölçülebilir bir koşulu beklemek onu okumamak için mazeret değildir · bir statü bir izin olamaz.

<!-- END CWF-SESSION-GRAPH-KB-v111 -->
