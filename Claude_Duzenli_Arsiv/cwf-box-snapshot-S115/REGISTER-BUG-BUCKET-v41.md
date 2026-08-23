# CWF — BUG BUCKET REGISTER · v41 (S105)

<!-- REGISTER-BUG-BUCKET-v41 · 2026-08-17. v40'ı GEÇERSİZ KILAR.
     Kalem yalnız CLOSED@evidence ile çıkar. Kusur SAHİPLİDİR: her satır
     hangi elin düşürdüğünü ADIYLA yazar (RULE-25'in özü: doğrulanan taraf
     kendi hakemi olamaz — hakemin kaçırması da kayda geçer). -->

## §1 · S105'TE AÇILANLAR

| Bug | Sınıf | Fail | Durum |
|---|---|---|---|
| **F-S105-SWITCH-CARD-R2-UNRUNNABLE** | kart / ölçmeden iddia | **Architect** | **KAPALI** — `vector-live-proof.yml` (dispatch-only, sıfır terraform) ile onarıldı, iki koşuyla kanıtlandı |
| **F-S105-VECTORLANE-ADMISSION-UNREACHABLE** | beyan-edilmiş-okunmayan yüzey | yazan el **AG-3**, kaçıran hakem + eksik kabul kriteri **Architect** | **KAPALI** — `:214` koşullu spread + kırmızı-yetenekli falsifier; ayrıca `VectorLaneDeps.engines`'in ikinci kopyası (tip denetçisi buldu) |
| **F-S105-DESIGN-HOME-TENANT-COLLISION** | kart / kapıyı koşmadan hüküm | **Architect** | **KAPALI** — FIX-1 ile bölme; 4 repo, 8 owner-held, muafiyet REDDEDİLDİ |
| **F-S105-ARCHITECT-INGEST-CHANNEL-FAULT** | kanal / elle taşıma | **Architect** | **AÇIK** — zehirli satır `governance_archive`'da (`md5 <> md5(content)`; `bağlı`→`başlı`, aynı bayt boyu). Onarım: tek dosyalık migration, kendini-kanıtlayan predicate. AG-2 kapanış partisi |
| **F-S105-PARITY-IS-A-DISTRIBUTION** | ölçüm / tek örnek | ilk iddia **AG-3**, kendi çürüttü; **Architect** tek örneği v107 §5'e hüküm diye yazdı | **AÇIK** — %26,7/%20,0/%26,7 aynı build. Kapanışı: tekrarlı ölçüm protokolü (→L-ADAY-5) |
| **F-S105-SEAL-TABS-BEYOND-EDIT** | mühür / açıklanamayan drift | — (gözlem) | **AÇIK/İZLEME** — batch-merge'de 3 sekme, AG-3'ün R3'ünde 1 sekme düzenlemesiz oynadı |
| **F-S105-TENANT-ZERO-COUNT-DELTA** | ölçüm / iki lens aynı bölünme farklı sayı | — | **AÇIK/DÜŞÜK** — Architect guarded 54 hit vs AG-4 45 hit; temiz-kirli bölünmesi BİREBİR aynı. Kapatılmadan kapı sayısı alıntılanmaz |
| **PLATINUM-BREACH-S105-1** | sahibe iş düştü | **Architect** | **AÇIK** — `/private/tmp/ag3-ano1`'i sahip sildi. Yasa adayı L-ADAY-8 |

## §2 · S105'TE KAPANANLAR (önceki sicilden)
| Bug | Kapanış kanıtı |
|---|---|
| **F-S103-MIGRATION-LEDGER-DRIFT** (canlı defterde uygulama-anı anahtarları) | Operator `migration repair` + `db push`; canlı: 88=88 bire bir, kayık anahtar 0. **Kural doğdu: Operator YALNIZ `supabase db push`; MCP `apply_migration` repo migration'ları için YASAK** (uygulama-anı anahtarı basıyor) |
| **F-A23-SIBLING-REF-MISMATCH** (ters yön) | v1_1 VAR ve kilitli; KARAR-A23-SEQ-1 §3(c)'nin "hiç mint edilmedi" hükmü YANLIŞTI. v1_4 mint'inde düzeltilecek |
| Bayat yeşil (run `31998819422`, `bc821b95`) | Taze koşular **32052501343** + **32053413647** bu revizyonda dört kol yeşil |

## §3 · DERSLER (S105)
1. **Şerit kendi kusurunu kendi bulup kendine karşı raporladı** (AG-3: admission; AG-4: mojibake yargı çağrısı; AG-3: kendi parite iddiasının çürütülmesi). Bu sistemin bağışıklığıdır, kayıt bunu ödüllendirir.
2. **Sahip sadeleştirdi, Architect fazla kurmuştu** — 8 belgenin DB'ye taşınması gereksizdi. *"Niye bu kadar kompleks hale getirdik?"* sorusu bir ölçüm aracıdır; kayda geçer.
3. **Kapı üçüncü ve dördüncü kez kazandı** (merge mesajı · vektör korpusu · tasarım korpusu · harness kayıtsız enstrüman). Kapıya karşı gelen hüküm, hükmün kendisidir ki yanlış olan.
4. **Auto-merge temizliği güvenilmezdir** — AG-4 master altından kaydığında diff'i ölçtü (383→384 başlık, tam kendi girdisi), varsaymadı.

<!-- END · REGISTER-BUG-BUCKET-v41 -->
