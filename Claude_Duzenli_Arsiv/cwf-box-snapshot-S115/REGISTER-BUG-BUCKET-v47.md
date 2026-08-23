# CWF — BUG KOVASI · v47 (S111 kapanışı)
<!-- 2026-08-21. v46'yı DEVRALIR. Append-only: hiçbir kalem kapanış kaydı olmadan düşmez. -->

## §1 · S111'DE KAPANANLAR

| Id | Ne | Kapanış |
|---|---|---|
| `GI-015` | Ancestry kapısı, sığ klonda tarih olmadığı için dürüst artefaktları *"fabricated or rewritten provenance"* diye **suçluyordu**. Tek bir `catch`: `git merge-base --is-ancestor` 1 ile *"baktım, hayır"*, 128 ile *"bakamadım"* der; kod ikisini tek cevaba indirmişti. | `CLOSED@fa299b2f` — üç değerli predikat. Architect gerçek bir depth-1 klonda üç yönde doğruladı: inmiş kapı RED · düzeltme GREEN · **düzeltme + sahte damga hâlâ RED**. |
| `F-S111-TURNCTXLOG-SCOPE-MENTION-VS-IMPORT` | Kapsam testi *"imported by no production module"* diyor, *"named by no file"* uyguluyordu. Mention ≠ import. | `CLOSED@2f080462` — uygulama kapsamına uyduruldu, kapsam zayıflatılmadı |
| Tırnaklı front-matter sapması | Üç şerit sözleşmeyi bağımsız uyguladı, altı damga anahtarında mutabık kaldı; tırnak yazılmamıştı ve ayrıştı. | `CLOSED@2f080462` — tırnaksız kanonik; **okuyucu hoşgörülü YAPILMADI** |
| İki `groundContract.ts` | Sözleşme mintlendi, uygulayıcı sahibi adlandırılmadı. | `CLOSED@2f080462` — AG-1'inki modül, AG-4 katkısı o dosyaya ek |
| Sahte öksüz (AG-2 kendi aletinde) | Üç mercek defekti, üçü de sessiz; biri sahte bir öksüz yayımladı. | `CLOSED@9837563c` — mutasyonla pinlendi + **sayan** kaplama tabanı |

## §2 · S112'YE AÇIK TAŞINANLAR

| Id | Ne | Ölçüm |
|---|---|---|
| `F-S111-GROUND-MD-UNGATED` | `docs/ground/*.md` damgalarının **içi** denetlenmiyor (altı anahtar, sıra, `MEASURED:` öneki, 40-hex, ISO). Front-matter varlığı ve tırnak **denetleniyor** (slot 1b). | tek `validateStamp` çağrısı uzaklıkta |
| `F-S111-GROUND-GATE-IN-DEPLOY-BUILD` | `check:ground`, `npm run build`'in içinde — Vercel'in **deploy** komutu. Bir depo-hijyen kapısı üretim dağıtımını kırabiliyor. Kapı, `check:doc-drift` için kurulmuş bir `fetch-depth: 0` azaltıcısına biniyordu; **o ortamda korunuyor, her yerde açıkta.** | AG-1'in kendi yerleştirme kararı, adıyla bildirdi |
| `F-S111-SHARED-CLONE-IDENTITY-LEAK` | Paylaşımlı klon HEAD'inde bayat `lane-claim AG-3` commit'i; orada boot eden pencere ağaçta kimlik buluyor. **Sabah dört pencerenin kendini AG-3 sanmasının sebebi.** | AG-4 reflog'dan ölçtü, iki yabancı pid |
| `F-S111-RELAY-CONSUMED-NOT-WRITTEN` | `relay_inbox.consumed_at` son yazma **2026-08-19T02:03Z** — sekiz PR'ın indiği bir oturum boyunca hiç işaretlenmedi. **Canlılık sinyali değildir; iki yönde de kanıt taşımaz.** | Architect ölçtü, 79/270 satır |
| `F-S111-BACKEND-RETIRED-ENABLED` | `armes-new`: `lifecycle='retired'` ama `enabled=true`, üstünde 141 araç satırı. Kod tabanı 6 backend, DB 7. Statü/izin karışımı (ADR-010). | `#81`'in kapsamına girer |
| `readAncestry` mükerrerliği | AG-4'ün cevaplanabilirlik ön koşulu, hotfix indikten sonra modül predikatının içindekini kısmen tekrarlıyor. Uyuşuyorlar; **doğruluk kazancı yok, düzeltme kalemi.** | AG-4 adlandırdı, silmedi |
| RULE-54 migrasyon borcu | 1512/1715 satır etiketsiz · **380 tek-mercek yokluk iddiası** | AG-3'ün provenance taraması |
| Üç öksüz denetim defteri | `llm_provider_secret_audit` (1 satır) · `mcp_secret_audit` (25) · `provider_audit` (7). **Yazılıyor, kimse okumuyor**, ve ikisinde yazarın gerekçesi bile yok. | AG-2'nin yürüyücüsü, altı mercek |
| `gateway_artifact_observations` | **CANLI öksüz**: 126 satır, iki kanal — `list_charts` 79 (bugün 12:13Z, canlı) · `list_datasets` 47 (18'inden beri sessiz). Besleniyor, okunmuyor. | REPRODUCED, tek `max()` ölü kanalı gizlerdi |
| `F-S110-SUITE-TIMING-ASSERTION-LOADSENSITIVE` | master defekti, kendi kartı | v46'dan taşındı |
| `rule26` flake geçmişi (`F-BW01`) | S111'de **iki kez ilk denemede yeşil**. Merge queue açılmadan önce ölçülmeli: kuyrukta bir flake zincirleme yeniden başlatma üretir. | AG-2 not düştü |

## §3 · ARCHITECT ÖZ-DÜZELTMELERİ (A-REC) — S111

| Id | Ne | Sınıf |
|---|---|---|
| `A-REC-S111-1` | Kart, claim yürüyüşünün karar vereceği adresi ön-atadı | kart kusuru |
| `A-REC-S111-2` | S110'un dur emri açıkça iptal edilmedi | kart kusuru |
| `A-REC-S111-3` | Bayt-aynılık talebi ile canlı damga sözleşmesi çelişkili | kart kusuru |
| `A-REC-S111-4` | Sözleşme mintlendi, uygulayıcı sahibi adlandırılmadı | kart kusuru |
| `A-REC-S111-5` | İki kartımda rapor dosya adı farklı yazıldı | kart kusuru |
| `A-REC-S111-6` | **Durum değişikliği emreden kart, emrettiği değişime karşı yaşlanır** — üç örnek | **yeni sınıf** |
| (kayıtsız, kıl payı) | Dal emekliliğini `git diff --name-only master <branch>` ile kontrol ettim; master-ilerisi "inmemiş iş" gibi okunuyordu. **İddia etmeden önce ata testine geçtim.** | ölçüm merceği |

## §4 · ARAÇ TUZAKLARI — S111'de doğanlar

- **CI hükmü TAM 40-hex ile sorulur.** Kısa sha `total_count=0` döndürür ve *"CI hiç koşmadı"*
  (= `S101-L1` ALWAYS FAILED) ile **bayt-aynı** okunur. Üç şerit de bu tuzağa değdi.
- **`git diff --name-only master <branch>`** master-ilerisini gösterir; **inmemişlik sinyali
  değildir.** Ata testi (`merge-base --is-ancestor`) sorulan soruyu cevaplar.
- **`--force-with-lease=<ref>:`** boş beklentiyle *"bu ref hiç var olmamalı"* demektir; atomik
  test-and-set'tir ve `(stale info)` reddi **bir ölçümdür**, hata değil.
- **`git merge -F -` stdin okumaz** (`git commit -F -` okur); index'e dokunmadan önce düşer.
- **Sözleşmesi emekli olmuş bir poller** ölmüş bir soruyu cevaplamaya devam eder ve yanlış anda
  yeşil "git" sinyali basar.
- **`cancelled` ≠ `failed`.** Üstüne push edilen koşuyu GitHub iptal eder; ikisinden biri gibi
  raporlamak yanlıştır.
- **`rm -rf` bir worktree'yi kaldırmaz** — bayat yönetim kaydı bırakır; `git worktree remove` +
  `prune`.

<!-- END REGISTER-BUG-BUCKET-v47 -->
