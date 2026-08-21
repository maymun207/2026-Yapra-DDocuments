# A23-GAP-RECON · S103 · v1 — Hedef Mimari ↔ Canlı Sistem, oda oda

<!-- A23-GAP-RECON-S103-v1 · 2026-08-17 · Architect'in bağımsız keşfi.
     Hedef: A23_cwf-understanding-layer-architecture-v1_3.html (LOCKED, rev-142
     çapalı). Canlı: master bc821b95 (rev 272, paket-merge sonrası) — her iddia
     dosya:satır kanıtlı, taze klondan ölçüldü. Bu belge #29 faz kartlarının
     ZORUNLU girdisidir; bellekten değil buradan kesilir. TÜRETİLMİŞ GÖRÜNÜM. -->

## §0 · TEK CÜMLELİK HÜKÜM
#29 uygulanmadı ve plana göre uygulanmamalıydı (dalga 9) — AMA aradaki 130
revizyon zemini üç sınıfta değiştirdi: (1) beş oda EMBRİYON halinde doğdu ve
hepsi A23'ün kendi kısıtlarıyla uyumlu; (2) yedi bileşen ölçülmüş SIFIR —
organ yok; (3) kilitli belgenin "Bugün" fotoğrafları kısmen BAYATLADI ve bir
İÇ SIRALAMA GERİLİMİ (§9-adım-3 τ/β ↔ A-7) faz kesiminden ÖNCE sahip
hükmü ister.

## §1 · ODA ODA MATRİS (hedef | canlı | kanıt | hüküm)

**② Normalizer/IR Router** — VAR, kısmen.
Canlı: `routing/irFrame.ts` (IR-1): frame{action·object·entity_ref[]·metrics}
router'ın MEVCUT LLM cevabına biner (çağrı sayısı artmadı — hedefin "hâlâ İKİ
çağrı" yasası bugünden doğru). Zırh: katalog-dışı değer → frame null, asla
throw. `resolveTurnFrame.ts` (#11, S97) = TEK DİKİŞ: her kullanıcı turu frame
katmanını ya koşar ya yokluğunu ÜÇ ayrı adla kaydeder (dark / no-covered-set /
no-frame) — hedefin empty≠zero disiplini önden döşenmiş.
EKSİK: güven FRAME-SEVİYESİ ikili (`HIGH|AMBIGUOUS`, irFrame.ts:86); hedef HER
SLOTA güven ister. GOLDEN FREEZE'e temas yok ✓ (hedefle aynı).

**③ Mention Typer** — YOK (ölçüldü: 0 dosya). Negatif sınıflandırıcı da
yönetilen desen satırı da mevcut değil. Bugün "4-12 vardiyası" entity_ref'e
düşüyor ve çözülemeyip ask-adayı oluyor (F175 vakası tam bu).

**④ Resolve** — VAR, TEK KANAL.
Canlı: `resolveEntityRef.ts`: deterministik kademe exact→prefix(≥3)→fuzzy
DL≤2; Turkish-fold TEK uygulama (F185-GUARD B5 yasası); alias kanalı keşiften
(`attrs.description`); AMBIGUOUS RAPORLANIR, ASLA SEÇİLMEZ ("a resolver that
quietly picks one is worse than one that asks" — hedefin ruhu kodda).
Governed `armes.entity_alias` HER ZAMAN kazanır (polarite yasası).
EKSİK: (a) 2. kanal (BM25) ve RRF füzyonu yok; (b) SKOR yok — kademe var,
s₁/s₂ yok → τ/β bugün TANIMSIZ ve A-7 gereği DL-üstüne kurulamaz; (c) arama
uzayı çapa-kapsamlı değil (kapsama-grafı arayüzü tüketilmiyor).

**⑤ Teşhis + ⑥ Yürütme Kararı** — EMBRİYON VAR, ve D-N3 ayrımı KODDA.
Canlı: `askOnUnresolved.ts` (#14, S99): aday KEŞFİ yumuşak (mirror verisi,
sıfır elle tablo) / SORMA KARARI sert-deterministik (`decideAsk` METİN değil
HÜKÜM okur) — "hiçbir öneri soruyu yaratamaz da bastıramaz da", falsifier
testli. `stageClarify.ts:447`'de kablolu; **governed valf
`router.askOnUnresolved` (kod tabanı 0 = KAPALI)** — karanlık valf: karar her
turda hesaplanıp `wouldHaveAsked` telemetrisiyle loglanıyor (F199 born-loud),
soru sorULMUYOR. Bilinen daraltma KODDA İTİRAFLI: paylaşılan harita
ambiguous→unresolved'a ÇÖKERTİYOR (stageClarify.ts:417-424) — üçlü teşhis
(LINK/NIL/AMBIGUOUS) henüz birinci-sınıf değil.
EKSİK: taşıyıcılık kuralı · NIL'in "sor değil BİLDİR + kapsamlı liste" dalı ·
kapsam kökü/soru kapısı (tamamı) · ⑥'nın tam karar tablosu · atıf beyanı.

**⑦ Araç getirimi** — Yol A CANLI; **Yol B'nin MOTORU BU GECE DOĞDU.**
routerAbLens var (F129 governed tavan, replay/routerAbLens.ts:206). Qdrant+
bge-m3: dense+sparse+RRF portun arkasında, dört yerel kanıt tamam, parite
uçuşta. Hedefin "IR-4 sözleşmesi" dediği dikişin motoru hazırlanmış durumda.

**⑧/⑨ Cevaplama + Atıf** — kısmen.
Güven-çürümesi mekanizması YOK (turn_context yok). Atıf altyapısının yapısal
yarısı var (frameEvidence, askEvidence, born-loud loglar); "Granit olarak
yorumladım" render beyanı — faz kesiminde CANLIDAN doğrulanacak (iddia
edilmiyor).

**turn_context akışı (GWT)** — YOK (0 dosya). Bugün ctx mutable çanta; ama
kuzeni döşenmiş: S101 purpose-gate (her digest okuması ZORUNLU amaç etiketi,
141 site) = "okuyan ağırlığını/niyetini beyan eder" disiplininin ilk yarısı.

**Kapsama-grafı §6** — ARAYÜZÜN ~%60'I BU GECE DOĞDU.
`GraphKbReader`: `parentsOf` (≈ancestors adımı) · `containsAmong` (≈children)
· `usesOf` · `observationAuthority` — her cevap measurement∈{answered,empty,
unreadable} taşıyor (hedefin amber ailesi). `in_scope(a,b)` ve `roots(tip)`
türetilebilir; kenar defteri TEK kimlik uzayı. FAZ BAĞI: §6 arayüzü kenar
defterinden OKUR, ikinci organ doğmaz (TEK-ORGAN).

**Planlayıcı sınırı** — KODDA MÜHÜRLÜ: `turn/planner.ts` başlığı: "ONE planner
organ: A23 extends THIS file, it does not grow a second decision center."
Deterministik plan bloğu + re-plan kapısı (`planner.replanNudgeMax`) canlı.

**Çapraz-tur taşıyıcı / L5 miss-ledger / sinyal tablosu / τ-β paramları** —
DÖRDÜ DE YOK (ölçüldü, sıfır iz). τ/β yokluğu A-7 gereği bugün DOĞRU durumdur.

## §2 · BUILD ORDER (§9) ÖN KOŞUL DURUMU
- **Adım 0 · F169** (flush cevaptan önce, awaited): `runTurn.ts:318
  await forceFlushObservability()` — ÖDENMİŞ görünüyor; faz açılışında
  ölçümle teyit (S62-2 ruhu), iddia değil.
- **Adım 1 · ÖLÇ**: alet HAZIR (routerAbLens + F129 governed tavan); Recall@k
  TABAN ÇİZGİSİ hiç koşulmamış görünüyor; **F174 set genişliği: repoda SIFIR
  iz — AÇIK.** Adım 1 giriş kapısı olmayı sürdürüyor: atlanamaz.
- Adım 2 (turn_context) → sıfırdan. Adım 3 (⑤/⑥ + taşıyıcı) → embriyonun
  üstüne. Adım 4 (③ + BM25/RRF) → sıfırdan + tek-kanal genişlemesi.
  Adım 5 (L5) → sıfırdan. Adım 6 (kelime haritası rol değişimi) → harita
  donmuş zemin olarak duruyor ✓. Adım 7 (soru bütçesi b + AUROC) → sıfırdan.

## §3 · SIFIR-HATA YAKALAMALARI (faz kesiminden ÖNCE çözülür)
1. **İÇ GERİLİM — §9-adım-3 ↔ A-7:** Adım 3 τ/β'yı kurar; adım 4 ikinci
   kanalı (BM25+RRF) ekler. A-7 ise "τ/β yalnız-DL üstüne KURULMAZ" der.
   Kilitli belgede sıralama çelişkisi. Çözüm amendmenti (v1_4, asla in-place)
   sahip hükmü ister; iki aday: (a) kanal-2'yi adım 3'ün önüne al; (b) adım 3
   üçlü-teşhis MAKİNESİNİ kademe-hükümleriyle kurar, τ/β paramları DEKLARe
   edilir ama KALİBRASYON adım 4/5'e kapılıdır.
2. **Bayatlayan "Bugün" fotoğrafları** (karta KOPYALANMAZ, yeniden ölçülür):
   "stageClarify.ts:97 tek sert kapı" artık doğru değil — kapı 683 satır,
   decideAsk'lı, valfli, born-loud; "turu öldüren soru" davranışının bugünkü
   hâli = adım-1 taban çizgisinin kendisi.
3. **Ambiguous çökertmesi** (stageClarify itirafı) adım 3'ün İLK onarımı.
4. **§6 TEK-ORGAN bağı**: kapsama-grafı = kenar defteri okuru; karta yazılır.
5. **F180/LB-11** (araç-çıktısı enjeksiyonu) — nöbete girdi (v17), #29 ∨
   Tier-D bandında ele alınır.
6. **Kutu eksikleri**: iki kilitli kardeş (component-architecture v1_1 ·
   turn-sequence v1_1) faz kesiminden önce kutuya girmeli (A-REC-S100-2).
7. **Valf envanteri güncel**: `router.askOnUnresolved` (taban 0) — #29'un
   adım-3'ü bu valfi üçlü-teşhisle YENİDEN anlamlandırır; körlemesine
   açılmaz.

## §4 · NE DEĞİŞMEDİ (hedefin hâlâ bugüne birebir doğru söyledikleri)
İki LLM çağrısı (②+⑧) · GOLDEN FREEZE dokunulmazlığı · governed-satır
disiplini (alias polaritesi, F129 tavanı, ask valfi — üçü de yönetilen) ·
"soru yalnız gerçek muğlaklıkta" istikameti (decideAsk'ın var oluş sebebi) ·
tek planlayıcı yasası · C1-LAW/ADR-008 sınırları (taşıyıcı tasarımında).

<!-- END · A23-GAP-RECON-S103-v1 -->
