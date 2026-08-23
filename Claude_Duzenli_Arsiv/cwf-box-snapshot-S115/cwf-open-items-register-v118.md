# cwf-open-items-register-v118

**v117'yi GEÇERSİZ KILAR.** S114 kapanışında yazıldı, zemin `7c099fc6a6e6534dbabc4d9d0e4e89d84ac78c62`.

**ALTIN DEFTER:** taşıyıcılar append-only. Kalem defterden yalnız `CLOSED@evidence` · `SUPERSEDED-BY` · `MERGED-INTO` ile çıkar. Özetin özeti yasak. Her kalem **adıyla** yaşar.

---

## §0 · BU BELGENİN STATÜSÜ — v117'den değişti

S114'te **Kademe 2** koştu ve kapandı: yedi iniş, dördü script ile; kapı canlı; claim yürüyüşü tavanlı. Dört kalem `CLOSED@evidence` ile çıktı, on bir yeni kalem doğdu. §2'nin başı değişti: artık **bütçesiz poller + türetilmiş tamamlanma**, çünkü S114'ün insan-eli dakikalarının hepsi bu iki eksikten çıktı.

---

## §1 · S114'TE KAPANANLAR

**`CLOSED@evidence` · ⓵ KADEME 2 · `npm run land` + KAPI ÖZ-TESTİ**
`scripts/land.ts` yedi adım, `scripts/landSelfTest.ts` **on bir** sınıf (yedi + LOCK-UNKNOWN · MERGE-CONFLICT · MERGE-NOT-LANDED · AUTHOR-UNKNOWN), master `78d7d20b`. Dört PR script ile indi (#344 #346 #348 #353); script #352'yi `AUTHOR-UNKNOWN` ile reddetti ve reseal'i kabul etti — iki yönlü kanıt. Carry-diff: ⓶ ve ⓷ kalemleri (aşağıda) scriptin kendi bulguları; üç elle iniş (#349 #350 #351) scriptin doğumundan önceydi ve kartta adıyla istisna.

**`CLOSED@evidence` · ⓶ `guard-bash` MUTLAĞI**
Master `7a631833`: hook komutu `sh .claude/hooks/guard.sh <x>.py` (göreli; `$CLAUDE_PROJECT_DIR` tırnaksız boşluklu yolda kırılıyordu — `F-S114-HOOK-PATH-SPACES-1`, günün kök sebebi) · `gh pr merge` yalnız `--auto --merge` ve yalnız `ADF_LANE_ROLE=foreman` · `guard-secrets.py` Read/Bash sır-dosyası reddi · her boot ilk iş kapı probu, geçerse `GATE-INERT` + STOP. Harness `rm __pycache__`'i reddetti, `.gitignore` çözdü. Carry-diff: **kapının yeni pencerede BLOCKED ölçümü S115 sıfırıncı iş**; `F-S114-GUARD-TEXT-MATCH-1` açık.

**`CLOSED@evidence` · ⓷ `ADF-FOREMAN-SELF-LAND-1`**
Sahip onayı `onay ADF-FOREMAN-REPORT-LAND`: yalnız `docs/relay/**` dokunan kendi PR'ını ustabaşı indirir; karar yol listesiyle, bayrakla değil (`land.ts` order B). Dört kez çalıştı. Carry-diff: yazarlık login'den değil **commit konu satırındaki `AG-<n>` belirtecinden** (tek kimlik S113-H3 altında tek ölçülebilir yazarlık); belirteçsiz konu → `AUTHOR-UNKNOWN` — ustabaşı bunu kendi üstünde yedi.

**`CLOSED@evidence` · `ADF-SHARED-CLONE-SYNC-1`**
Dört bağımsız ölçüm: klon `de238bf`'de bayattı; S114 açılışını bu kırdı (`/wr` yok). `onay CLONE-SYNC-DISCARD` ile iki S113-öncesi `.claude` kopyası atıldı, `--ff-only` geçti, `HEAD = 7c099fc6`, ağaç boş. Carry-diff: kalıcı kural Kademe 3 — boot klon bayatlığını ilk iş ölçer (`CLONE-STALE` + STOP).

**`CLOSED@evidence` · `F-S114-CLAIM-WALK-NO-CEILING-1`**
#349: `scripts/claimRoster.ts` roster'ı `pg_get_constraintdef`'ten türetir; yürüyüş tavanda `NO-ADDRESS-FREE` basar. Ustabaşı boot'una lease-pinli devralma (`F-S114-FOREMAN-CLAIM-PERSIST-1` aynı PR'da kapandı).

---

## §2 · AÇIK — S115 sırası

**⓵ `ADF-KADEME-3-POLL-AND-DONE-1`** — S115'in birinci işi, AG-1.
(a) `F-S114-POLL-BUDGET-DEAF-1`: poll-sayı bütçesi kalkar; poller kapanış kartına kadar yaşar; tek koruma ardışık 5 `READ FAILED` → rapor, ölme. Gerekçe ölçüldü: görevler yalnız pencere açıkken ateşlenir, bütçe hayalet bir sorunu çözüyordu ve S114'te dört şeridi sağırlaştırdı.
(b) `RELAY-DONE-DERIVED-1` (sahip talebi): tamamlanma damgalanmaz, `docs/relay/<KART>-report.*` varlığından türetilir — CLOSED (master'da) / IN-FLIGHT (phase dalında) / TODO (hiçbir yerde). Damga yok, saat yok, hafıza yok; `consumed_at`'in neden terk edildiğinin doğru cevabı. Kart grameri 13. kural: rapor yolu kart adından türetilir.
(c) Her tick çift mercek: filtreli sonuç + filtresiz `max(created_at)`; ayrışırsa poller kendi körlüğünü görür.
(d) `ADF_LANE_ROLE` boot'tan: S114'te ustabaşı değişkeni elle verdi, `land.ts` onsuz her inişi `AUTHOR-UNKNOWN` yapıyor ve hiçbir boot/kart adlandırmıyor (AG-5 bulgusu).

**⓶ `ADF-KADEME-2-LAND-FIX-2`** — AG-2. `MERGE-CONFLICT` soğuk klonda yanlış etiket (step 4, fetch öncesi/sonrası bayt-aynı komut iki sonuç) · kuyruklu merge hükmü yapmadığı doğrulamayı iddia ediyor · step 3'e commit-status okuması: Vercel "Canceled by Ignored Build Step" `gh pr checks`'te yeşil görünüyor, check-runs API'sinde yok (AG-5, iki mercek iki roster).

**⓷ `ADF-KADEME-2-GUARD-FIX-1`** — AG-4. `F-S114-GUARD-TEXT-MATCH-1`: `gh pr merge` geçen salt-okunur `grep` reddediliyor (vocabulary vs purpose) · `F-S114-LANE-REF-PREVIEW-DEPLOY-1`: her claim nonce'u Vercel preview deploy üretiyor, `vercel-ignore.mjs`'e `lane/*`.

**⓸ Kart grameri** — `R-ABSENCE-LENS` "non-zero" üstünde yanlış pozitif (AG-5 raporunu kırmızıya çevirdi, AG-5 yeniden yazarak geçti).

**⓹ `ADF-ARCHDOC-2of2-1`** — değişmedi: `ADF-ARCHITECTURE-v1.html` repoda yok, düz metin parçalarla gidecek.

**⓺ `ADF-FENCE-DECL-DRIFT-1`** — değişmedi: beyan terraform `instance_id` çıktısından türetilmeli.

**⓻ BÜTÇE ÇİTİNİN ÜÇ KIRMIZISI** — değişmedi, S113-H4/H5. ⚠ Ay sonuna bir hafta; 125 USD otomatik durdurma riski artık yakın.

**⓼ `#29 A23`** — değişmedi; S113-H2 uyarınca ADF'nin arkasında. Sahip test seti kayda girdi: `CWF-OWNER-QSET-1` — `CWF_SorularSayfa1.csv`, 11 soru (1–9, 20, 21), 9'u ARMES kontrol URL'li, 2'si korelasyon; Not 1 (*"son 3 günün duruşları — zaman kısıtını anlayamadı"*) `CWF-TOOL-LOOP-REPEAT-1`'in kullanıcı yüzü. `#81 BACKEND-DISCOVERY-1` kabul çıtası artık bu set.

**⓽ `CWF-TOOL-LOOP-REPEAT-1` · ⓾ `CWF-TOOL-UNREACHABLE-COPY-1` · ⑪ `#81`** — değişmedi, A23 kapsamı.

**⑫ `F-S112-EVAL-CANARY-ZERO-RUNS`** — S114'te **yirmi beşe** çıktı (yedi iniş daha, hepsi SKIPPED, hepsi adlandırıldı, sıfır skor).

**⑬ Sahip maddeleri:** `F-S114-SECRET-IN-SETTINGS-LOCAL-1` — Supabase access token transkripte düştü, **döndürülmedi**, S115 ilk sahip işi; yeni token dosyaya değil env'e.

**⑭ Yeni küçük kalemler:** `ADF-LANE-MODEL-PIN-1` (`settings.json`'da model pini ölçülmedi; "hangi model yazdı" rapora girmeli — H6 ile aynı sınıf) · `F-S114-MERGE-VERDICT-MISSING-1` (#349 merge mesajı hükümsüz; master yeniden yazılmaz, hüküm AG-5 raporunda) · `F-S114-HARNESS-CRONCREATE-REFUSED-1` · `F-S114-FOREMAN-CLOCK-LOCAL-MIDNIGHT-1` (tick tarihi yerel gece yarısında dönüyordu) · `F-S114-INSTRUCTIONS-PASTE-STALE-1` (sohbete v5_6 yapıştırıldı, kutuda v5_7 — sahip proje talimatını güncellemeli) · `F-S114-CONSTITUTION-MIRROR-PATH-STALE-1` (talimat §0 `docs/laws/CONSTITUTION.md` diyor, repo `docs/laws/constitution/<YASA>.md`; kutudaki ayna tek dosya, bayat) · `.gemini/` ölçüldü (tek `settings.json`, Operator boot mekanizması yok) · MCP envanteri: ustabaşı terminalinde **14 sunucu** görüldü (`claude-in-chrome`, `trigger`, `MCP_DOCKER` dahil) — Kademe 3 envanteri · `ADF-CP8-INSTANCE-ID-1` · `ADF-KADEME-0-PREMISE-GAP-1` · `ADF-FIELD10-ROSTER-1` · `F-S112-BUDGET-FENCE-OUT-EMPTY` · `F-S112-DOCDRIFT-SHORT-SHA-FATAL` · `F-S112-MCP-TRANSPORT-PER-USER-DRIFT-1` · `F-S112-RULE55-UNGATED-HALF` · `F-S112-RULE42-PHRASE-MISMATCH` · `F-S112-CENSUS-STALE` (S114'te de 3000+ dk bayat ölçüldü) · `F-S111-GROUND-MD-UNGATED` · `F-S111-GROUND-GATE-IN-DEPLOY-BUILD` · `F-S111-SHARED-CLONE-IDENTITY-LEAK` · `F-S111-RELAY-CONSUMED-NOT-WRITTEN` · `F-S111-BACKEND-RETIRED-ENABLED` · `readAncestry` mükerrerliği · `RULE-54` migrasyon borcu · üç öksüz denetim defteri · `gateway_artifact_observations` · `MEMORY.md` sıkıştırma (**münhasır oturum ister**) · `PI-013` · `F-BW01` rule26 flake

---

## §3 · ÖLÇÜLMÜŞ SAYILAR — S114, kelimesi kelimesine

**İnişler:** #349 `ce72c867` · #350 `78d7d20b` · #344 `b0ae2f14` · #346 `8f47f636` · #348 `dafde074` · #351 `7a631833` · #353 `7c099fc6`.
**Script hükümleri:** #352 RED `AUTHOR-UNKNOWN exit 2` · #353 yeşil, merge mesajında item/head/base/tree/CI okuması.
**`land:selftest`:** reds=11 defects=0 control=green (AG-2 dalında; master'da ustabaşı koşusu raporda).
**Claim yürüyüşü:** altı pencere, AG-2/3/4/6/7 kazanıldı (AG-6, AG-7 roster dışı, salındı); `(stale info)` reddi dört pencerede ölçüldü; AG-5 devralma lease ile iki kez.
**Süreç sayımı:** 6 claude süreci = 6 pencere, tek ebeveyn `28603` (IDE host).
**Hook hatası, kelimesi kelimesine:** `/bin/sh: /Users/tunckahveci/Desktop/2026: No such file or directory`.
**Bütçe:** S114'te okunmadı (çit koşmadı). S113 değerleri taşınıyor: 98.054 / 147.445 / stop 125.

---

## §4 · UFUK — düşmez

- **`#82b` Design-RAG** — *"ASLA UNUTMA."* H2'ye binecek
- **`#75` VECTOR-CONSUMER-1** — valf açık, tüketici yok
- **`VECTOR-ONBOARD-DRIP-1` (VECTOR-QOS)** — motor anahtarından önce zorunlu
- **`A23 v1_4` mint** — Architect borcu
- **Qdrant admin yüzeyi** — sahip ertelemesi
- **G3 doğum kanıtı** — ARMES + Hülya
- **Sessiz fallback → gürültülü hata** — sahip kararı
- **Merge queue / org taşıma** — S113-H3 ile kapalı
- **Kademe 3 (H2 + arşiv) · Kademe 4 (H9, H10)**
- **`ADF-HEADLESS-LANE-1`** — S114-H1: ADF bağımsız ürün olduğunda; şimdi değil
- **Remote Control kanalı** (`claude.ai/code`) — pencereyi dışarıdan uyandırır mı, ölçülmedi; Kademe 3
- **10 şerit / ölçek** — RAFTA
- **`GI-001`** — private arşiv deposu

---

## §5 · SOTA KAPISI — İKİ SKORBORD

**(A) İç 7-anahtar sayacı: 6/7.** Açık **`#29 A23`**.
**(B) Kabul sözleşmesi: 0/16.** `mcp-honestbench` NOT BUILT.

**BAĞLAYICI:** SOTA-1 kabul kriterini **(B)**'ye bağlar. Bir oturum (A)'yı anıp (B)'yi anmadan kapanırsa **eksik kapanmıştır.** S114 ADF oturumuydu; (B) değişmedi ve bu cümle onu anıyor.

<!-- END cwf-open-items-register-v118 -->
