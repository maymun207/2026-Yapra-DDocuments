# CWF — AÇIK KALEMLER REGISTER · v112 (S109 kapanışı)
<!-- 2026-08-20. v111'i GEÇERSİZ KILAR. BÜTÜN yazıldı (A-REC-S101-7).
     Taşıyıcı append-only; kalem yalnız CLOSED@evidence / SUPERSEDED-BY / MERGED-INTO ile çıkar. -->

## AÇIK — sıralı (S110 icra sırası implementation-order v22'de)

**#75 · VECTOR-CONSUMER-1 — S110'UN 1 NUMARASI.** Motor iki gündür açık (`vector.engine=qdrant` published), her gece indeksliyor, ve üretim turlarında onu okuyan TEK SATIR kod yok. Tüketicisi olmayan motor ölüdür (L-ADAY-4'ün altyapı hâli). A23 ③ Resolve'un zemini. Sahip hükmü S109: "S110'un ilk kartı yönetişim değil, VECTOR-CONSUMER olacak."

**#A23 · STEP 2+ — baseline mühürlü, makine sırada.** Step 0+1 CLOSED@evidence (#299+#307): RecallCat 66-ayrık = 0.5202 · v1 0.6494 · **v3 0.3333** · factory/logistics/transfer 0/0/0 · material 3/3 REGRESYON NÖBETİ. Yenilecek sayı v3'ünkü, genel ortalama değil. ÜÇLÜ-KANIT BOŞLUĞU kalıcı kayıt: ③ (bütün sonucu) bu karttan ölçülemedi ⇒ yalnız ①'den iddia edilecek her iyileşme odanın kendi anti-sahte kuralınca kurulmamıştır. Adlandırılmış boşluklar: arm-B (kimlik), coverage (kayıtlı tur ister), clarify-gate, tool-level Recall@k. KARAR-A23-SEQ-1 kilitleri aynen: Step-3 makinesi YOK, kanal-2 YOK, τ/β YASAK.

**#DRIP-BIRTH · drip doğum sertifikası — 03:50Z okuması.** Migration CANLIDA (S109, `onay migration-arch`, A-REC-S109-9'a bak). İlk koşuda beklenen: `ms` bütçe içinde · `rows`≤100 · `corpusSize` İLK KEZ BASILIR · `mark=<digested>/<items>` · degraded:absent BİTER. İkinci gece: işaretten devam + değişmeyen ATLANIR. Architect okur, S110 açılışında.

**#306-İZLEME · superset boş-vs-sıfır.** 22:30Z döngüsünde `superset annotationsStaged=0 unmapped=4` — tuzak şimdi ONUN için canlı. Ayrı ilgili; kartlanmadı.

**LANE-HOOKS-1 (S110 aday fazı, sahiple okundu 08-20).** Repo-evli `.claude/settings.json`: (a) Stop hook → `mail-wait.mjs` yoklar, kart varsa exit 2 ⇒ şerit ölmeden karta devam eder — posta ekonomisinin tam ölümü; (b) PreToolUse çitleri → heredoc-to-file, `|head`, çıplak `--force`, `--admin/--squash`, doğrudan master push MEKANİK yasak (PLATINUM: hatırlanan kural yanlış tasarım); (c) SessionStart → preflight enjeksiyonu; (d) her bash komutu loglanır ⇒ sınıflandırıcı-şekli verisi sistematik. S108 kapsam dersi çözüldü: settings repoya commit'lenir, worktree'ler taşır. Kaynaklar: code.claude.com/docs/en/hooks-guide + brick.institute Cherny özeti.

**RELAY-CHANNEL-FENCE (S110 aday).** Architect'in Supabase MCP'si yazma-yetkili kaldıkça A-REC-S109-9 kuralı davranışsaldır. Tam read-only KART KANALINI DA keser (kartlar INSERT'tir) ⇒ bugün kapatılamaz. Mekanik dedektör önerisi: Operator ritüeline şema-drift kontrolü (`supabase db diff` boş dönmeli) — kayıt-dışı her DDL'i yakalar; drift ≠ boş ⇒ ihlal adıyla basılır.

**DEBT-BACKEND-IDENTITY-AS-DATA-1.** A1 bilerek per-backend literal yazdı (ADR-009 satır der). Tetik: bir sonraki backend kaydı YA DA mint sahasına dokunan ilk faz.

**F-S109-ADMISSION-LATENCY-FLAKE.** `admission.test.ts` 44≤36, bir oturumda İKİ kez, yalnız tam-suite yükü altında. rule26/F-BW01 muamelesi adayı.

**F-S109-CI-REF-LITERAL-VS-SYMBOLIC.** Ruleset `~DEFAULT_BRANCH` (sembolik) vs `build-test.yml` `branches:["master"]` (literal) — rename CI'ı sessizce kapatır, kapı koşmayan check ister. Latent; rename'den ÖNCE kartlanır.

**MERGE-QUEUE — PLATFORM-BLOCKED (kalem düşmez).** GitHub dokümanı: merge queue yalnız org repolarında. Tetik: yalnız sahip-başlatmalı org transferi (blast radius önce recon). `strict`+ruleset serileştirici KALIR — S109'da 8 iniş, sıfır yarışla ölçüldü. `merge_group` tetiği master'da hazır bekler.

**RELAY-RETURN-PATH-2 — PARK.** Yazma-yarısı. Blok: yazabilen konektörün rol kimliği ÖLÇÜLMEDİ (sınır: yalnız postgres/service_role yazabilir). Açılırken `relay_lane_find_row USING(true)` (F-S109-RELAY-POLICY-USING-TRUE) AYNI değişiklikte düzeltilir, sonra değil.

**#82b Design-RAG — PARK, ASLA DÜŞMEZ.** Tetik: sahip çağrısı ya da A23-sonrası envanter konuşması.

**Üç-model test tablosu (Gm/Oa/CL) harness'ı.** S108 hükmü: aynı-oturum karşılaştırması bağlam sızmasıyla geçersiz; temiz-oturum × (soru×model×koşu) + hata sınıfı kodlaması. eval-canary `underpowered N=9` ölçümü gerekçeye eklendi (S109): 9-örneklem canary dağılım ölçemez.

**Qdrant dashboard sahip-yüzeyi.** Ertelenmiş (S102 sahip kararı). Tetik: sahip isteği.

**Dal hijyeni (S110 açılış adımı).** Silinecekler (yazarları tarafından, MERGED ölçülerek): `phase/a23-step01-measure-1`(AG-2, artık yasal) · `phase/merge-queue-2-arm-1` · `phase/relay-return-path-recon-1` · `phase/relay-wake-1` · `phase/stagedraft-kind-1`(AG-3/AG-4) · kart claim'leri `claim/merge-queue-2` · `claim/vector-drip-1`. `lane/AG-*` S109 kalıntıları: S110-AG-BOOTS §0 ölçülü-koşullu silme.

## S109'DA KAPANANLAR (carry-diff)
- **F-S108-VECTOR-INDEX-TIMEOUT → kod+şema tarafı CLOSED@evidence** (#304 + migration canlıda; nihai kapanış #DRIP-BIRTH okumasıyla).
- **F-S108-STAGEDRAFT-UNKNOWN-KIND → CLOSED@evidence**: 22:30:46Z `failed=0 annotationsStaged=4` İKİ backend + veri düzlemi 4'er maruziyetli satır. Günlük ~384 taslak ölümü durdu.
- **F-S107-LANE-WAKE-MANUAL → mekanizma CLOSED@evidence** (iki canlı uyanma: 34.4s · 12.4s; `scripts/mail-wait.mjs` master'da). Tam kapanış = S110 boot standardı + LANE-HOOKS-1.
- **F-S107-RELAY-ONE-WAY → yeniden yazıldı**: CHECK çit değil ŞEKİL çitidir; şeridi durduran GRANT'SIZLIK; grant'sız politika kesinlikle atıldır (S101-L3 aynası). SUPERSEDED-BY RELAY-RETURN-PATH-2 kaydı.
- **F-S108-RULE24-COLLISION kalıntısı → CLOSED@evidence** (talimat §3 ayna emekli; kutu dosyası silindi, pozitif kontrollü yokluk ölçümü).
- **F-S108-MIRROR-CLOSURE-UNMEASURED → CLOSED** (ayna sınıfı tümden emekli: CONSTITUTION S108 + talimat §3 S109).
- **A23 Step 0+1 → CLOSED@evidence** (#299+#307, oda kartı master'da).
- **LAW-OKF-1 → CLOSED@evidence** (69 yasa bundle, monolitler emekli, bayt tabanları, kapı sayaç-basar + canlı-kırmızı-önce).
- **PHASE-MERGE-QUEUE-2 → CLOSED-AS-BLOCKED@evidence** (üç problu 422 sınırlaması + GitHub docs birincil kaynak).
- **`consumed_at` "ASLA damgalanmaz" evrenseli → GERİ ÇEKİLDİ** (216/79 damgalı ölçümü; terk edilmiş ≠ imkânsız). Ayakta kalan: güvenilir sinyal değil; kanıt şerit raporudur.
<!-- END v112 -->
