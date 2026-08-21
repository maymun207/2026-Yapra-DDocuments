# REGISTER — BUG BUCKET · v45 (S109 kapanışı)
<!-- 2026-08-20. v44'ü GEÇERSİZ KILAR. BÜTÜN yazıldı. Kalem yalnız CLOSED@evidence / SUPERSEDED-BY ile çıkar. -->

## AÇIK
- **F-S109-ADMISSION-LATENCY-FLAKE** — `admission.test.ts` gecikme assert'i (44≤36) bir oturumda 2×, yalnız tam-suite yükü altında; tek başına 14/14, tam yeniden-koşu 2× yeşil. F-BW01 yanına; rule26-muamelesi adayı (gecikme assert'i doğruluk suite'inde yaşamamalı).
- **F-S109-CI-REF-LITERAL-VS-SYMBOLIC** — ruleset `~DEFAULT_BRANCH` vs workflow `branches:["master"]`; rename CI'ı sessizce kapatır, kapı koşmayan check istemeye devam eder. Latent; rename ÖNCESİ kartlanır.
- **F-S109-RELAY-POLICY-USING-TRUE** — `relay_lane_find_row` `USING(true)`, `lane_addr` yüklemi yok; rol kablolanırsa her şerit operatör kanalı dahil herkesin postasını okur. Rolü kablolayan AYNI değişiklikte düzeltilir (RELAY-RETURN-PATH-2'ye bağlı).
- **F-S109-GATE-SCOPE-TRACKED-ONLY** — takipli-dosya kapısı takipsiz yeni işi görmez; boş yeşil gerçek yeşilden ayırt edilemez (rule24 1722→1723 ancak commit sonrası; `comm -12` de aynı sınıf). Kural yerleşti: takipli kapı COMMIT'TEN SONRA + dosya sayısı BASILIR + kapı kendi kırmızısını CANLI korpusta gösterir. OKF kapısı bu şablona göre yazıldı (dizin tarar). Hook fazında genelleşir.
- **F-S109-DOC-DRIFT-SET-MEMBER** — doc-drift raporu commit'in hiç dokunmadığı dosyayı adlandırıyor; İKİ bağımsız vaka (AG-2 W1+W2). Kayıtlı, kovalanmadı.
- **F-S109-MCP-REPLY-DOUBLE-ENCODED** — supabase-ro MCP cevabı çift-kodlu: `content[].text` içinde JSON, satırlar kaçışlı string içinde; naif ilk-`[` taraması iç diziyi ayrıştırıp offset 2'de ölür ve bozuk-satır hatası gibi görünür. Busu okuyan her araç önce DIŞ katmanı çözer. (`mail-wait.mjs` doğru yapıyor.)
- **F-S109-VERCEL-RELATIVE-WINDOW-TIMEOUT** — log sorgusunda her göreli pencere (24h/3h/2h/25m) timeout; dar ISO penceresi çalışır. Alet değil yol bozuk; log okuma ritüeli ISO-pencere kullanır.
- **superset boş-vs-sıfır (adsız izleme)** — 22:30Z döngüsü `annotationsStaged=0 unmapped=4`; tarihsel geçişler (08-09) gerçekti, bugünkü sıfır deneme-yokluğu. Backend sahibine; bu depo fazı değil.

## S109'DA KAPANDI (carry-diff)
- **F-S108-VECTOR-INDEX-TIMEOUT** → kod+şema CLOSED@evidence (#304 + migration canlı; nihai mühür ilk 03:50Z drip okuması — register #DRIP-BIRTH).
- **F-S108-STAGEDRAFT-UNKNOWN-KIND** → CLOSED@evidence: `failed=0` + `annotationsStaged=4` iki backend, 22:30:46Z; self-seed 5-aile satırlarını migration'sız açtı; 8 araç maruziyet sınıfı kazandı.
- **F-S107-LANE-WAKE-MANUAL** → mekanizma CLOSED@evidence (34.4s · 12.4s canlı uyanmalar); tam kapanış S110 boot standardı + LANE-HOOKS-1.
- **F-S107-RELAY-ONE-WAY** → SUPERSEDED-BY doğru teşhis: durduran şey grant'sızlık, CHECK şekil çiti; RELAY-RETURN-PATH-2 park kaydı taşıyor.
- **F-S108-RULE24-COLLISION (kalıntı: talimat aynası)** → CLOSED@evidence: canlı alan zaten doğruydu (A-REC-S109-4), bayat kutu DOSYASI silindi — pozitif kontrollü yokluk ölçümü (dizin 72 dosya listeledi, komşu dosya duruyor, hedef yok, desen sayımı 0).
- **F-S109-A23-BRANCH-PHANTOM** → CLOSED@evidence: dal vardı ama 0 commit'ti; "DRAFT PR" yükseltmesi Architect'indi (A-REC-S109-1); içerik commit'lenerek tek-nokta arıza kaldırıldı, sonuçta #299+#307 indi.
- **F-S108-CLASSIFIER-MATCHES-SHAPE** → RAFİNE-KAPANDI (çözüldü değil): "bileşik reddedilir" ÇÜRÜTÜLDÜ (R2: gh'siz heredoc+jq DENIED; iki bileşik yönlendirmeli satır SUCCESS); belirlenimsiz bileşen ÖLÇÜLDÜ ve açıklanmadı. Her hipotez altında bedava mekanik kural yürürlükte: heredoc-to-file yok (Write aracı), `|head` yok, hassas çağrı çıplak satır-başına-bir. Hook fazı PreToolUse loglarıyla sistematik veri toplayacak.
<!-- END v45 -->
