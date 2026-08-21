# CWF — BUG BUCKET · v46 (S110 kapanışı)
<!-- 2026-08-20. v45'i GEÇERSİZ KILAR. BÜTÜN yazıldı. -->

## §1 · S110'DA KAPANANLAR

| Kayıt | Ne | Kapanış kanıtı |
|---|---|---|
| `F-S110-DIGEST-PGRST-404` | `vector_index_digest` Postgres'te VAR, PostgREST 404 döndürüyordu (03:50–03:53 arası 14 vuruş). Migration 04:18:16Z koştu, reload commit'le yarıştı (önbellek 57 relation), tablo dışarıda kaldı. | Operator `NOTIFY pgrst, 'reload schema'` → `edge_logs` 05:45:31Z GET **200**; 05:45:24Z reload → önbellek 58. Diferansiyel: `turn_trace_digest` bayt-aynı ACL duruşuyla 200/201 dönüyordu → duruş beraat. |
| `F-S110-ABSENT-CLASSIFIER-MISSES-PGRST205` | `isTableAbsent()` yalnız `42P01` tanıyordu; PostgREST'in şema-önbellek ıskası `PGRST205`/404. Log `degraded:error` yazdı — **ve ne `absent` ne `error` doğruydu**, üçüncü bir hâl vardı. | PR #310 `b33ac46d` — `unexposed` durumu, yalnız cevabın KANITLADIĞINI iddia ediyor. 4 mutant öldürüldü. |
| `F-S110-DRIP-ON-FALSE-GREEN` | `storeStatus` `'ok'` ile başlıyordu; sıfır-kalemli backend store'u hiç çağırmadan `drip=on` basıyordu. "Sağlıklı cevap verdi" ile "hiç sorulmadı" aynı kelimeydi. | PR #310 — başlangıç `idle`. Canlıda görüldü: `backend=system items=0 drip=idle`. |
| `F-S108-VECTOR-INDEX-TIMEOUT` (soyağacı) | Drip'in doğum sertifikası | Korpus 342/342; dört koşu 242→142→42→0; koşu 5 kararlı durum encoded=0, mark=N/N, ~7.6s. |

## §2 · AÇIK DEFEKTLER

| Kayıt | Şiddet | Ne | Sahibi |
|---|---|---|---|
| `F-S110-SUITE-TIMING-ASSERTION-LOADSENSITIVE` | **orta-yüksek** | Master'da önceden var olan, yüke duyarlı bir zamanlama iddiası. 2 taban × 4 koşu = 2 yeşil / 2 kırmızı, 1–2 ms taşma. `vectorLane` ağaç nesnesi master'la bayt-aynı → dal sebep olamaz. 8/8 izolasyonda geçiyor — **ama izolasyon nedeni yok ediyor** (L-ADAY-S110-ISOLATION). | S111, kendi kartı |
| `F-S110-MODEL-ASSERTS-ABSENCE-FROM-TWO-PROBES` | **orta** | Model iki Türkçe alt-dize probundan ("doğalgaz tüketim", "tüketim") genel yokluk hükmü çıkardı: *"bu veri panolarımızda yok."* İlk cümlesi dürüsttü (hangi kelimeleri kullandığını söyledi), ikincisi bizim kendi yasamızı çiğnedi. | ⑧ Cevaplama odası, A23 |
| `F-S110-FIRSTSEEN-MEANS-FIRST-WRITTEN` | düşük-orta | `gateway_artifact_observations`: 47 satırın **37'sinde** `first_seen > last_seen`. Sebep: `first_seen` upsert yükünden kasten çıkarılmış (iyi gerekçe: yeniden gözlem doğumu sıfırlamasın) → `DEFAULT now()` devreye giriyor (DB'nin INSERT saati), `last_seen` ise uygulamanın gözlem anı. **Hüküm: backfill YOK, uygulanmış migration düzenlenmeyecek** — yalnız sütun yorumu düzeltilecek. | **Operator**, S111 |
| `F-S110-OPERATOR-PROOF-STATUS-BODY-MISMATCH` | düşük | Operator raporu Adım C-2'de `HTTP/2 401 / 403` + gövde `{"code":"42501"}` yazdı. Telde ölçülen **401**. PostgREST `42501`'i **403** ile döner; ikisi aynı anda doğru olamaz. Yani raporun "ACL/RLS doğrulaması" yarısı iddia ettiği şeyi doğrulamıyor (çit ayrı okumayla doğrulandı: `anon_select=false`). | Operator disiplini |
| `F-S110-RELAY-AUDIT-PIPE-IN-CLAIMS-FENCE` | düşük | `## CLAIMS` bölümü bir sonraki `##`'e kadar sürüyor; kanıt bloklarındaki boru-hizalı satırlar `R-CLAIM-ROW` tetikliyor. Mevcut notun "satır-ortası borular sorunsuz" cümlesini düzeltiyor. ⚠ Mekanizma **ÇIKARIM** — parser okunmadı. | S111 |
| Korpus kendi dokümanlarını sayamıyor | **orta** | Doküman korpusu kendi envanterini listeleyemiyor. #81'in doküman yarısının ön koşulu. | #81 |
| `#79` düz-metin sırlar | 🔴 **güvenlik** | `mcp_secrets` üç satır (`armes-new` 36, `ragbackend` 71, `supersettoken` 149 bayt) — değerler DÜZ. Üç register mint'idir defterde yoktu. Rotasyon **sahip** eylemi. | Sahip + Operator |
| `#80` Obs R2 / Langfuse | 🔴 | S110 boyunca canlıda arızalı: `[Obs] flush delivery=failed … err=Request timed out … swallowed=N`, N gün içinde büyüdü. Bütçe çiti ~20 Ağustos'ta doldu. **Sahip hükmü: uzatma yok, adlandırılmış erteleme.** FULL-TRACE'in yarısı (panel) çalışıyor. | S111 |

## §3 · ADLANDIRILMIŞ DESENLER (defekt değil, tuzak)

| Kayıt | Ne |
|---|---|
| `F-S110-POST-MERGE-ORPHAN-COMMIT` | Bir PR ölçtüğü head'de birleşir (doğru davranış); o sırada itilen sonraki commit kapanmış bir PR'ın dalında öksüz kalır. **Doğru bir kuralın bilinen bedeli**, defekt değil. Çare: kurtar + yazılı gerekçeyle emekliye ayır. |
| `F-S110-CLAIM-DELETE-RACE` | Delete-then-push atomik değil; silme adımı first-push-wins hakemliğini yok eder. Çare hükme bağlandı → S111 boot standardı. |
| `F-S110-UNOBSERVABLE-PRECONDITION` | Bekleme sözleşmesi, bekleyenin okuyamayacağı bir sinyale dayandırılırsa **kartın kusurudur**. |
| Alet sağırlığı ×3 | `2>/dev/null` git'in non-fast-forward reddini yuttu (77 yoklama kayıp) · boru `$?`'ı yuttu · `LIKE 'cwf__armes__%'` — `_` tek-karakter joker, `armes-new`'i de yuttu. Üçü de **sessizlik** olarak yüzeye çıktı. |

## §4 · SAYIM

Kapanan: **4** · Açık: **8** · Adlandırılmış desen: **4** · Architect öz-düzeltmesi (A-REC-S110-1…9): **9**

<!-- END v46 -->
