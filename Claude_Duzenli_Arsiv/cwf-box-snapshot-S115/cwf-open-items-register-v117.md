# cwf-open-items-register-v117

**v116'yı GEÇERSİZ KILAR.** S113 kapanışında yazıldı, zemin `922ef571a4d8e1c6c9dd751d6c20f6ec144b3eea`.

**ALTIN DEFTER:** taşıyıcılar append-only. Kalem defterden yalnız `CLOSED@evidence` · `SUPERSEDED-BY` · `MERGED-INTO` ile çıkar. Özetin özeti yasak. Her kalem **adıyla** yaşar.

---

## §0 · BU BELGENİN STATÜSÜ — v116'dan değişti

S113'te **ADF dalgası** koştu: Kademe 0 kapandı, Kademe 1'in yarısı indi. Dokuz iniş, hiçbiri kendi işini merge etmeden.

Üç kalem **CLOSED@evidence** ile çıktı, dokuz yeni kalem doğdu. §2'nin sırası sahip hükmüyle değişti: **ADF %100 bitmeden CWF'ye dönülmez** (S113-H2).

---

## §1 · S113'TE KAPANANLAR

**`CLOSED@evidence` · H3 · KANIT DÜZYAZIYDI**
`REPORT-SCHEMA-v1.json` (JSON Schema draft 2020-12) + `scripts/reportSchemaCheck.ts` + `.github/workflows/report-schema.yml` + `api/cwf/__tests__/reportSchemaCheck.test.ts`. Master'da `f743dbea`. Bir şerit raporu artık makine-denetlenebilir bir artefakt.

**`CLOSED@evidence` · ⓵ BÜTÇE ÇİTİNİN İLK GERÇEK OKUMASI**
Dört zamanlanmış koşuda dört başarısızlıktan sonra, S113'te üç turda açıldı: `ViewBudget` reddi → `Describe*` reddi → assert adımı. **Altı assertion okundu, üçü kırmızı.** Sayılar §3'te. Carry-diff: kapı artık bakabiliyor; **A1, A2, A3 kırmızıları AÇIK kalemdir** ve aşağıda ayrı yaşar.

**`CLOSED@evidence` · H8 İSTEMCİ TARAFI · MERGE YETKİSİ ADVISORY'DİR**
`.claude/settings.json` içinde `gh pr merge` **sıfır** kez geçiyor; `.claude/settings.foreman.json` içinde bir kez, artı `env.ADF_LANE_ROLE=foreman`. Master'da `43f1452f`. Carry-diff: **sunucu tarafı AÇIK** — ruleset'te `pull_request` kuralı yok ve sahip hükmü tek kimlik (S113-H3), dolayısıyla koruma script + hook ile taşınacak.

---

## §2 · AÇIK — S114 sırası (sahip hükmüyle)

**⓵ KADEME 2 · `npm run land` + YEDİ SINIF KAPI ÖZ-TESTİ.**
S114'ün birinci işi. Yedi adım: kilit al (`refs/landing/lock` boş lease) → PR head 40-hex + güncelle → CI @head yalnız `success` → `merge-tree` provası + beklenen ağaç sha → `gh pr merge N --auto --merge -F hüküm.md` → master ağacı == beklenen ağaç → kilidi bırak. **Yetki almanın önkoşulu yedi sınıfın yedi kırmızısıdır.** Gerekçe ölçüldü: S113'te on bir kartın ikisi merge kilidi yüzünden yeniden yazıldı.

**⓶ `guard-bash` MUTLAĞI.**
`ADF_LANE_ROLE=foreman` taşımayan ortamda `gh pr merge` → `exit 2`. Mevcut `--dangerously-skip-permissions` / `--admin` / `--squash` / çıplak `--force` mutlakları **kalır**. ⚠ **Harness reddi ölçülmüş** (`A-REC-S113-*`): bir şerit kendi hook dosyasını yazamıyor. Sahip eli gerekebilir; önce `/free` ile ölçülecek.

**⓷ `ADF-FOREMAN-SELF-LAND-1`.**
Ustabaşı kendi raporunu indiremez ve bugün ikinci merger yok. Üç seçenek, karar bekliyor: ikinci ustabaşı · Architect tek-seferlik istisnası · ustabaşı rapor yazmaz. Şu an üç dal bu yüzden açık: `phase/adf-kademe-1-close` · `phase/adf-kademe-1-fence-read` · `phase/adf-kademe-1-foreman-first`.

**⓸ `ADF-ARCHDOC-2of2-1`.**
`ADF-ARCHITECTURE-v1.html` (md5 `75ebbb8cbbfefe673ca0b31a59eeaa26`, 43145 bayt) repoda **yok**. `1of2` basıldı, `2of2` iki kez UTF-8 bozulmasıyla reddedildi. **Düz metin parçalarla gidecek**, kodlanmış yük değil. AG-5 üç mercekle yokluğunu ölçtü; boot §1 karar hakları tablosu o yüzden karanlık.

**⓹ `ADF-FENCE-DECL-DRIFT-1`.**
`infra/aws/budget-fence.json` ölü instance'ı beyan ediyor. Kutu 2026-08-16'da terraform apply ile yeniden inşa edildi (`PHASE-QDRANT-ENGINE-1-FIX-4`). Düzeltme kartı `fence-decl` bloklu indi. **Kalıcı çözüm:** beyan terraform `instance_id` çıktısından **türetilmeli**; apply-sonrası kontrol yalnız pencereyi kısaltır, sürüklenmeyi kaldırmaz (AG-1 hükmü).

**⓺ BÜTÇE ÇİTİNİN ÜÇ KIRMIZISI — sahip hükmüyle bekliyor.**
`A1` stop 125 < projeksiyon 138.17 · `A2` 138.17 ile 125 arasında aboneli uyarı yok · `A3` hedef canlı kutu, repo ölü kutuyu beyan ediyor. **S113-H4/H5: eşik ve bildirim seti değişmez, "en son bakacağız".** ⚠ Mevcut hızla ay bitmeden otomatik durdurma ateşlenmesi bekleniyor.

**⓻ `#29 A23` — iç sayacın kalan tek anahtarı.**
Üçlü teşhis `stageClarify.ts:321-329`'daki ikili döngüde ölüyor (S112'de ölçüldü, patlama yarıçapı 95/678). **Yürüyüş:** `turn_context` sıfırdan · ③ Mention Typer + BM25/RRF sıfırdan · L5 miss-ledger sıfırdan · soru bütçesi `b` + AUROC sıfırdan · τ/β **deklare, kalibre DEĞİL**. S113-H2 uyarınca ADF'nin arkasında.

**⓼ `CWF-TOOL-LOOP-REPEAT-1` — S113'te ölçüldü.**
Aynı soru iki tavanda koşuldu: `resolve_time_range` **her ikisinde de dört kez** çağrıldı. Deterministik bir çözümleyici; araç sonucu taşınmıyor, plan her adımda sıfırdan kuruluyor. Kontrol merceği: iki koşu arasında yalnız tavan değişti, çağrı deseni değişmedi. **A23 soru bütçesi `b` + L5 miss-ledger bunu kapatmalı.**

**⓽ `CWF-TOOL-UNREACHABLE-COPY-1` — S113'te ekrandan ölçüldü.**
ARMES erişilemezken kullanıcıya *"böyle bir aracım yok"* deniyor; kanıt satırı doğru söylüyor: *"yetenek var, erişilemiyor"*. Sistem doğru ölçtü, yanlış cümleyi kurdu. **A23 kapsamı.**

**⓾ `#81 BACKEND-DISCOVERY-1`** — dört eksik. Kabul çıtası sahip test seti, **orijinal cümlelerle**.

**⑪ `F-S112-EVAL-CANARY-ZERO-RUNS` — S113'te on sekize çıktı.**
AG-1 saydı: S112+S113 boyunca **on sekiz ardışık SKIPPED, sıfır skor.** Job `if: github.ref == master` taşıyor, PR düzleminde koşamıyor — bu yapı gereği doğru. Ama `eval-gate atlanamaz` yasası olan bir evde kanarya iki oturum boyunca hiç skor yapmadı.

**⑫ Küçük kalemler:** `ADF-CP8-INSTANCE-ID-1` (CP-8 17-hex EC2 id'sini kısa sha sanıyor — **değiştirilmemeli**, kalıbı genişletmek kesik sha yakalamasını bozar) · `ADF-KADEME-0-PREMISE-GAP-1` (kartın premise'i ürettiği değişikliğin tamamını adlandırmalı) · `ADF-FIELD10-ROSTER-1` (alan 10 kapı listesi sabit, `.github/workflows/` keşfiyle üretilmeli) · `ADF-SHARED-CLONE-SYNC-1` (paylaşılan klon şeritlerce erişilebilir mi, ölçülecek) · `F-S112-BUDGET-FENCE-OUT-EMPTY` · `F-S112-DOCDRIFT-SHORT-SHA-FATAL` · `F-S112-MCP-TRANSPORT-PER-USER-DRIFT-1` · `F-S112-RULE55-UNGATED-HALF` · `F-S112-RULE42-PHRASE-MISMATCH` · `F-S112-CENSUS-STALE` · `F-S111-GROUND-MD-UNGATED` · `F-S111-GROUND-GATE-IN-DEPLOY-BUILD` · `F-S111-SHARED-CLONE-IDENTITY-LEAK` · `F-S111-RELAY-CONSUMED-NOT-WRITTEN` · `F-S111-BACKEND-RETIRED-ENABLED` · `readAncestry` mükerrerliği · `RULE-54` migrasyon borcu · üç öksüz denetim defteri · `gateway_artifact_observations` · `MEMORY.md` sıkıştırma (**münhasır oturum ister**) · `PI-013` · `F-BW01` rule26 flake

---

## §3 · ÖLÇÜLMÜŞ SAYILAR — S113, kelimesi kelimesine

**Bütçe (canlı API, 2026-08-22):**
```
BudgetLimit      150.0 USD   MONTHLY
ActualSpend       98.054 USD  (22 gün → 4.46/gün)
ForecastedSpend  147.445 USD
çit projeksiyonu 138.17 USD
stop threshold   125 USD
HealthStatus     HEALTHY
```
Bildirimler: ACTUAL 0.01 / 101.0 / 125.0, hepsi `ABSOLUTE_VALUE`, her biri tek abone.
Stop action: `b1151db3-c3b0-4de4-a069-b17db8c8e0be`, toplam 2 action, `ApprovalModel=AUTOMATIC`.

**IAM:** politika `v5` varsayılan (2026-08-22T15:36:34Z), `BudgetsRead` = `budgets:ViewBudget` + `budgets:Describe*`, kaynak `arn:aws:budgets::867418408435:budget/*`.

**EC2 eu-central-1:** tek instance, `running`, doğum `2026-08-16T14:37:41Z`, ad `cwf-langfuse-host`. Repo'nun beyan ettiği id → `Reservations: []`.

**Tavan deneyi:** `turn.maxTokensPerTurn` 300000 → 600000 (panel v2, SCHEMA+REFERENTIAL+BEHAVIORAL geçti). 300k'da 8 çağrı + fren; 600k'da 9 çağrı + tam cevap. `resolve_time_range` **ikisinde de ×4**.

---

## §4 · UFUK — düşmez

- **`#82b` Design-RAG** — sahip hükmü S105: *"ASLA UNUTMA."* Bağlam organına (H2) binecek
- **`#75` VECTOR-CONSUMER-1** — valf açık, **tüketici yok**; gece indeksleyici yazıyor, canlı tur okumuyor. ⚠ S113 ölçümü: Qdrant tüketicisiz koşuyor ve bütçenin bir parçasını yakıyor
- **`VECTOR-ONBOARD-DRIP-1` (VECTOR-QOS)** — öncelik kuyruğu + throttling, **motor anahtarından ÖNCE zorunlu**, sahip hükmü S102
- **`A23 v1_4` mint** — Architect borcu
- **Qdrant admin yüzeyi** — sahip ertelemesi
- **G3 doğum kanıtı** — ARMES toparlanması + Hülya'nın üç soruluk gözlemi. ⚠ S113'te ARMES bir tur düştü, bir tur ayağa kalktı
- **Sessiz fallback → gürültülü hata** — sahip kararı
- **Merge queue / org taşıma** — sahip kararı; S113-H3 tek kimlik hükmüyle şimdilik kapalı
- **Kademe 3 (bağlam organı H2 + arşiv otomasyonu) · Kademe 4 (H9 deploy doğrulama, H10 `lane_events`)**
- **10 şerit / ölçek · channels bayrağı** — sahip hükmü S113: RAFTA, CWF bittikten sonra
- **`GI-001`** — private arşiv deposu `2026-Yapra-DDocuments` açıldı

---

## §5 · SOTA KAPISI — İKİ SKORBORD

**(A) İç 7-anahtar sayacı: 6/7.** Kapalı `#2·#10·#16·#18·#23·#25`, açık **`#29 A23`**.
**(B) Kabul sözleşmesi: 0/16.** `cwf-sota-definition-v1_5` §10 — on altı dış kriterin on altısı ÖLÇÜLMEDİ, `mcp-honestbench` NOT BUILT.

**BAĞLAYICI:** SOTA-1 kabul kriterini **(B)**'ye bağlar. **(A)'yı 7/7 yapmak SOTA'yı KANITLAMAZ.** Bir oturum (A)'yı anıp (B)'yi anmadan kapanırsa **eksik kapanmıştır.**

<!-- END cwf-open-items-register-v117 -->
