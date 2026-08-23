# CWF — BOOTSTRAP & YENİ OTURUM PROMPTU · v112 (S112 açılışı)
<!-- 2026-08-21. v111'i GEÇERSİZ KILAR. ÇAPA S111 kapanışında CANLI ÖLÇÜLDÜ.
     v112'nin v111'den TEK YAPISAL FARKI: açılış artık YİRMİ BELGE OKUMAK DEĞİL,
     BİR KOMUT KOŞTURMAKTIR. O komut S111'de inşa edildi ve master'da duruyor. -->

## §1 · ÇAPA TABLOSU (S112 açılışında TAZE KLONDA DOĞRULANACAK)

| Ölçüm | S111 kapanış değeri |
|---|---|
| `git rev-parse origin/master` | `2f0804622c59b9b857208342314912499ba076f1` |
| `git ls-remote --heads origin` | **TEK SATIR: master** — sıfır faz dalı, sıfır claim |
| Açık PR | **0** (AG-1 ölçtü, kimlik doğrulanmış kabuktan) |
| Yasa evi | `docs/laws/` · **55 kural** · **15 anayasa** · son kural **RULE-54** |
| `docs/ground/` | **7 artefakt**: facts.json · census.latest.json · census.log.jsonl · orphans.md · open-items.md · HANDOVER-PROCEDURE-v1.md · MEMORY-REMEDY-v1.md |
| Öksüz sayımı | ORPHAN **4** · READ-OFF-TURN 15 · READ-ON-TURN 37 · READ-ONLY 2 · INERT 0 |
| Canlı sayım | backends 7 · backend_tools 330 · entity_registry 800 · census 194 · gateway_obs 126 (79+47) · vector_index_digest 342 |
| Üretim | `2f080462` deploy READY |

⚠ Bu tablo bir **İDDİADIR** (TOTAL-45). Doğrulanmadan öncül yapılmaz — ve artık doğrulaması
**tek komuttur**.

---

## §2 · AÇILIŞ SIRASI — **TEK KOMUT, BAĞLAYICI**

> **YENİ YASA:** Architect oturumu **`npm run architect:open` ÇIKTISIYLA** açar.
> v111 *"özetlerle değil ölçümle aç"* diyordu ama ölçümü elle yaptırıyordu. S111 o ölçümü bir
> komuta koydu. Özet zinciri artık kırılmış değil — **gereksiz.**

1. **TAZE KLON → `npm ci` → `npm run architect:open`.** Dokuz alan basar: master sha · kalan dallar
   · açık PR · `docs/laws` sayım+md5 · `facts.json` özeti · `census.latest.json` · `orphans.md` ·
   `open-items.md` başı · HEAD/master hizası. **Her alan provenance etiketli ve zaman damgalı.**
   Ölçülemeyen alan `UNMEASURED` + sebep basar — **asla sıfır basmaz.**
2. **ÇIKTIYI OKU. Çelişki varsa taze klon + canlı DB kazanır** ve fark bir bug olarak kaydedilir.
3. **`docs/ground/open-items.md`** — açık kalemlerin **KANONİK EVİ ARTIK BURASI.** Append-only, iki
   kat kapısının arkasında: bir kalem yalnız `CLOSED@<evidence>` / `SUPERSEDED-BY` / `MERGED-INTO`
   ile OPEN kümesinden çıkar ve satırını korur. Kutudaki register bir AYNADIR; çelişkide repo kazanır.
4. **SOTA-1 POZİTİF KONTROLÜ.** İlk mesajda kelimesi kelimesine, taze klondan
   `docs/laws/constitution/SOTA-1.md` (S66-1).
5. **Sonra** kutu belgeleri — anlatıdır, öncül değildir.
6. **ARCHITECT DB DURUŞU (MUTLAK).** Supabase MCP **SALT-OKUMADIR**. Tek yazma istisnası:
   `relay_inbox`'a kart INSERT'i. Şüphede: yazma = Operator.

---

## §3 · İLK İŞLER (sıra bağlayıcı)

**1 · `PHASE-ARCHITECT-CARD-GRAMMAR-1`** — belgesi kutuda, S111'de yazıldı.
On iki kart kuralı, hepsi S111'in altı kusurlu turundan türetildi. `kind=card` grameri +
insert-öncesi denetim + yasa metinleri + preflight. **ZEMİN kalemleri KARANLIK iner.**
Gerekçe: retrieval'i kusurlu kartlarla yönetmek, aynı dört saati yeniden ödemektir.

**2 · `PHASE-CONTEXT-RETRIEVAL-1`** — sahip hükmü: *"skip sakın."* Projenin **kendi** Qdrant'ıyla
(TEK-ORGAN). Bağımlılık: `VECTOR-ONBOARD-DRIP-1` (öncelik kuyruğu + throttling) — iki tüketici tek
kutuda olduğu an taşıyıcı hale gelir. Korpus sırası: yasalar+ground → repo dokümanları+ADR →
proje kutusu → oturum arşivleri (sonuncusu sahip aksiyonu ister).

**3 · `#81 BACKEND-DISCOVERY-1`** — kabul çıtası sahip test seti (Q2 · Q20 · Q21 + iki doküman
sorusu), orijinal cümlelerle.

**4 · `#29 A23 ⑤/⑥ MAKİNESİ`** — spec dormant, makine yok; üçlü teşhis `stageClarify.ts:329`'da
ölüyor; patlama yarıçapı 95/678.

**Küçük kalemler (sıra serbest):** `F-S111-GROUND-MD-UNGATED` (tek `validateStamp` uzaklıkta) ·
`F-S111-GROUND-GATE-IN-DEPLOY-BUILD` · `F-S111-SHARED-CLONE-IDENTITY-LEAK` · `readAncestry`
mükerrerliği · RULE-54 migrasyonu (1512/1715) · üç öksüz denetim defteri ·
`PHASE-LANE-SHELL-PERMISSIONS-1` (repoda `.claude/settings.json` + tek-komut kabuk kuralı).

---

## §4 · S111 HÜKÜMLERİ (kalıcı — tam liste session-close'da; en kritik yedi)

1. **BAKAMAYAN BİR ALET CEVAP VERMEMELİDİR.** Beş yüzü ölçüldü; `MEASURE-READ-HONESTY-1`'in kod
   katmanındaki hali. `UNKNOWN` ne suçlar ne sessizce geçer.
2. **KAPI KARANLIK İNER, EN SON SİLAHLANIR.** Silahlanma adımı **iki ortamda** kanıt taşır.
3. **ÖNCÜL BİR ZAMAN DA TAŞIR.** Durum değişikliği emreden kart, emrettiği değişime karşı yaşlanır.
4. **KANONİK OLAN MASTER'IN TAŞIDIĞIDIR.** İsim/format ölçümle biter, hükümle değil.
5. **PAYLAŞILAN DOSYANIN TEK SAHİBİ KARTTA ADLANDIRILIR** — yoksa ikinci şema doğar.
6. **İNİŞ HÜKMÜ MERGE COMMIT MESAJINDA YAŞAR** — merge edilen ağacın içinde asla.
7. **BİR KAPI BİR AĞACI BELGELER** — ruleset dayatıyor; `--force-with-lease=<ref>:` boş beklentiyle
   atomik test-and-set'tir ve reddi bir ÖLÇÜMDÜR, hata değil.

**Ek araç tuzakları:** CI hükmü **TAM 40-hex** ile sorulur (kısa sha `total_count=0` döndürür ve
"CI koşmadı" ile bayt-aynı okunur) · `git diff --name-only master <branch>` master-ilerisini
gösterir, **inmemişlik sinyali değildir** — ata testi kullan · sözleşmesi emekli olmuş bir poller
ölmüş bir soruyu cevaplamaya devam eder.

---

## §5 · OTURUM HİJYENİ

- Kuyruk boşalınca Architect KAPANIŞI ÖNERİR.
- **Kapanışın tek başarısızlık modu: kaydı olmayan açık dal.** Her dal ya `LANDED` ya
  `RETIRED (yazılı gerekçeyle)`, ve emeklilik **ata testiyle** ölçülür.
- Claim ref'leri yalnız FİNAL KAPANIŞ KARTINDA bırakılır; kimse kendininkini bırakmaz.
- **Yerel hijyen kapanışın parçasıdır:** worktree'ler kaldırılır (`git worktree remove` + `prune`,
  asla yalnız `rm -rf`), merge olmuş yerel dallar silinir, **merge olmamış olan adıyla bildirilir**,
  paylaşımlı klon HEAD'i **master'da** bırakılır.
- Mühür çakışması: **yalnız `npm run reseal`.**
- Architect bağlam uzadığında sahibi uyarır.

---

## §6 · KAPANIŞ SETİ — yedi belge

register(ayna) · KB · bug-bucket · bootstrap · implementation-order · AG-boots · session-close.

<!-- END v112 -->
