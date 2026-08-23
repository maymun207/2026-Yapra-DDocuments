# CWF — SESSION GRAPH KB · v109 (S109)
<!-- 2026-08-20. v108'i GEÇERSİZ KILAR. BÜTÜN yazıldı. -->

## S109 tek cümlede
Dört şerit paralel dört fazı bitirdi; sekiz PR sahip-onaylı iki partiyle sıralı indi (7+1, tamamı iki-ebeveynli gerçek merge); üretim kanaması durdu, drip migration'ı canlıya indi, posta angaryasını öldüren mekanizma iki canlı uyanmayla kanıtlandı; Architect dokuz kez düzeltildi ve dokuzunun hesabı verildi.

## İniş defteri (final master `3e95c107`)
| slot | PR | merge sha | ne |
|---|---|---|---|
| 1 | #299 | 694ae9ce | A23 W1 flush + RecallCat skoreri + baseline raporu |
| 2 | #306 | ef62c2af | BACKEND_IDS A1 — kanama durdu (üretim kanıtlı) |
| 3 | #304 | 6c8eba70 | vector drip W1 + digest migration (authored) |
| 4 | #305 | c21da41b | mail-wait.mjs — uyandırma mekanizması |
| 5 | #300 | b6bebbe5 | LAW-OKF: 69 yasa bundle, monolitler emekli |
| 6 | #302 | 29d103b3 | relay recon notu |
| 7 | #303 | 07f98a3b | merge-queue platform-blok kaydı |
| 8 | #307 | 3e95c107 | oda kartı (ayrı adlı onay) |

## S109'da yerleşen hükümler (kalıcı)
- **A-REC-S109-9 / OPERATOR KAPISI MUTLAKTIR:** Sahip onayı rol çitini ESNETMEZ. Architect'in Supabase MCP'si SALT-OKUMADIR; DDL/DML yalnız Operator'dan, istisnasız. (İhlalin kendisi: S109 digest migration'ı Architect uyguladı, onaylı ama kapı yanlış; şema geçerli, süreç düzeltildi.)
- **OR'lu iniş talimatı yayınlanmış yarıştır** (A-REC-S109-8): talimat YA içerik koşulu YA durum koşulu adlandırır; "hangisi önce" iki koşulu bir yarışa çevirir. Kanıt: slot-1 oda-kartı yarışı.
- **RULE-41 "ACTIVE" = check BU head'e bağlanmış** (pending ya da geçmiş), çoktan-yeşil değil. "Doğru sha'da pending, yanlış sha'da pass'ten kesinlikle güvenlidir" (AG-4). #295'i ayıran şey head_sha eşleşmesi.
- **Pinli lease yanlışlanabilir iddiadır:** değeri uydur, sunucu reddeder; gevşek form yanlış tahmini sessizce geçirir (AG-2, makine-yakaladı vaka).
- **Erozyon tabanı BAYTTIR:** `İ→I` char'ı değiştirmez (549→549), baytı düşürür (610→609) — char tabanı Türkçe kanonik metnin ana erozyon sınıfına yapısal kör. Karakter gerekçesi yerinde emekli (RULE-20), tuzağı taşındı: sayıyı karttan kopyalama, birimi karıştırma, tabanı inen dosyadan ölç.
- **Kendi-boşluk-listesi tuzağı (oturumun en keskin yasası, 4 vaka):** boşluklarının dikkatli listesini tutan korpus, o boşluk aramalarıyla eşleşir — kayıt ne kadar iyiyse kapsamayı o kadar iyi taklit eder. Her seferinde SAYIM doğru, SONUÇ yanlıştı. Çözüm: korpusun kendi tanımladığı mercekten ara (yasa = `canonical:` cümlesi), serbest metinden değil. RULE-53'ün gerekçesi.
- **Fixture gerçek olabilir:** 'honestbench' literalini "kayıtsız id" fixture'ı yapan iki kontrol, backend kaydolunca sessizce başka soruya evet demeye başladı. Fixture = kaydedilemez rezerve id. "Fixture'ı gerçekleşebilen kontrolün kimsenin yazmadığı bir son kullanma tarihi vardır."
- **Yeniden-kurmak ≠ okumak:** kısaltmadan genişletilen sha, tutarsızlığı açıklamak için icat edilen sebep — ikisi de sonraki okura ölçümle bayt-aynı görünür. Tek savunma yazma anında yeniden türetmek (COMPUTED-NOT-ASSERTED'in varlık sebebi). Vakalar: AG-2 ×2 (biri lease'in yakaladığı), AG-3 ×1.
- **"docs-only" diff'i tarif eder; bayatlık TABANIN özelliğidir** — çakışmasız rebase de tam re-gate hak eder (AG-4).
- **manifest.json çakışması yalnız rebase ağacında `npm run reseal` ile çözülür, asla hunk seçerek** — hunk'lı çözüm iki ağaca da uymayan ama çözülmüş görünen manifest üretir (AG-3; parti yasası oldu).
- **Durum hakkında haklı olmak yetkiyi vermez** (AG-1, silahlanabilir PR'ın yanında 4 saat).
- **Saati olmayan alet ölçmüyordur, ölçülüyordur** (RELAY-WAKE ilk tespiti kendi gecikmesini söyleyemedi).
- **Kayıt-dışı görelilik:** log aleti bozuk değil, GÖRELİ zaman-penceresi yolu bozuk — dar ISO penceresi çalışır (AG-3 W0 NOT-READ düzeltmesi).
- **`--force-with-lease` yalnız ölçülmüş sha'ya pinli halde ve kart-emirli rebase sonrası kendi dalında meşrudur** (S109 hükmü; yasak çıplak bayrağı ve başkasının ref'ini hedefler).
- **Migration dosyasının inmesi migration'ın koşması değildir** (AG-4).
- **empty≠zero canlı çifti:** superset'in `failed=0`'ı tarihte 4-geçişti, bugün 0-denemedir — aynı satır, iki gerçek.

## Architect öz-düzeltme defteri (A-REC-S109-1…9)
1 unpushed→"DRAFT PR" yükseltmesi (dört belgeye yayıldı) · 2 canlı claim ref'lerini bayat sanma · 3 "local, unpushed"tan içerik çıkarma · 4 zaten-düzelmiş talimatı açık-defekt diye taşıma (türev kaynak) · 5 var olmayan `attestation` alanını koruma emri · 6 S102-çağı "valf KAPALI" öncülü (canlı `domain_rules` okunmadan) · 7 basılı WORKING etiketini koşan süreç sanma · 8 OR'lu yarış talimatı · 9 Operator kapısı ihlali (sahip hükmüyle mutlaklaştı).
Desen: 4/9 türev-kaynak, 2/9 gösterge-zemin karışması. İkisi de yasada vardı; hook'lu mekanikleştirme S110 (LANE-HOOKS-1).

## Şerit karnesi
AG-1: OKF dört adım + 3 silahlandırma + sweep-tuzağı keşfi + birim öz-düzeltmesi. AG-2: A23 uçtan uca + 2 silahlandırma + "65" itirafı (uydurulan sebep > yanlış sayı) + lease dersi. AG-3: 3 faz (stagedraft, wake, recon) + 2 silahlandırma + CHECK-çit çürütmesi + iki canlı uyanma. AG-4: drip W0+W1 + queue üç-problu sınırlama + mutant-testin mutantı + RULE-41 yorumu. Kimse kendi PR'ını indirmedi; tek manifest çakışması kurala göre çözüldü.
<!-- END v109 -->
