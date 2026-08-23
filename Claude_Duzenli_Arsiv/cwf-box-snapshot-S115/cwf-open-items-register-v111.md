# CWF — AÇIK KALEMLER REGISTER · v111 (S108 kapanışı)
<!-- 2026-08-19. v110'u GEÇERSİZ KILAR. ALTIN DEFTER: append-only; kalem yalnız
     CLOSED@evidence / SUPERSEDED-BY / MERGED-INTO ile çıkar. Her kalem ADIYLA yaşar. -->

## §0 · S108'DE KAPANANLAR (carry-diff ile)

| Kalem | Kapanış kanıtı |
|---|---|
| **G3 · MCP session doğum kanıtı** | CLOSED@evidence — üretim 05:00:21Z/05:04:59Z `[McpClose] label=armesMes… session_terminated:'true' close_ok:true` ×3; `mcpClient.ts:190` kaynaktan okundu: sessionId vardı → `terminateSession()` fırlatmadan döndü → DELETE status 405 DEĞİLDİ ⇒ sunucu 2xx. `F-S107-MCP-NO-SESSION-AMBIGUOUS` okuma (a) doğrulandı, (b) çürüdü. |
| **#81 vector-index cron okuması** | CLOSED@evidence — 03:50:40Z okundu. Kapanış bir DEFEKT doğurdu (§1). |
| **MERGE-GATE-1** | CLOSED@evidence — PR #295 (09:26:26Z) spec+ölçüm; #296 FIX-1 (12:45:58Z) düzeltme. |
| **W4-NEGATİF** | CLOSED@evidence — `GH013 · Repository rule violations found for refs/heads/master · Required status check "build (24.x)" is expected`. Metin RULESET kelime dağarcığı ⇒ ret ruleset'e atfedilebilir. |
| **W4-POZİTİF** | CLOSED@evidence — #297 `--auto` armed iken `build (24.x)` IN_PROGRESS; **16 dakika bekledi**; 13:02:06Z GitHub birleştirdi. #295 ile aynı komut, aynı check durumu, ZIT sonuç; tek değişken ruleset. |
| **PROBE-CLASSIFIER-1** | CLOSED@evidence — AG-3: `PUT /branches/lane/AG-3/protection` HTTP 200, `DELETE` rc=0, master 404 (dokunulmadı). Ret pencereye özgü DEĞİL. |
| **F-S108-RULE24-COLLISION** | CLOSED@evidence — PR #297. RULE-40 mintlendi (numara ledger'ın `id:` alanlarından HESAPLANDI, max 39). CI etiketi + script başlığı aynı commit'te (RULE-20). Dosya adı ve npm script bilerek yeniden adlandırılmadı — dosya adı bir hakikat yüzeyi değildir; kalıntı kayda geçti. |
| **Required-check roster** | CLOSED@evidence — PR #298, RULE-44. Roster `build (24.x)`'te KAPALI; üç dışlama, ÜÇ FARKLI SEBEP, asla tek satıra indirilmez. |
| **F-S106-CONSTITUTION-MIRROR-STALE** | SUPERSEDED-BY `PB-S108-1` — ayna EMEKLİ EDİLDİ. Kutu nüshası ölçüldü: md5 `03070bec`, 7 234 B, 160 satır, 10× `OWNER-HELD`, `## ⚠ Provenance warning` → 2026-08-15 restorasyon-öncesi nesil. Kanon: `7fb9eb43`, 41 649 B, 616 satır, 0× `OWNER-HELD`. İkisi de AYNI satırla başlıyor ⇒ gözle ayırt edilemez ⇒ tasarım defekti. Sahip kutudan sildi; yerine hiçbir şey konmadı. Architect yasaları repodan okur. |
| **F-S108-IDENTITY-BY-BUS-INFERENCE** | CLOSED@evidence — dört pencere `lane/AG-1…AG-4` claim ref'leriyle tekilleşti (nonce'lu, sunucu hakemliğinde). |
| **F-S107-LANE-PERMISSION-SCOPE / settings hygiene** | CLOSED@evidence — allow 830→749, 81 kaldırıldı (hepsi `Bash(git` ile başlıyor, sıfır git-dışı), 8 KEEP gerekçeli (prefix kuralı ilk token'ı okur, hiçbirinde ilk token `git` değil), üç sha256 kayıtlı, hook user-scope'ta canlı / project-scope kopyası yok, 13/13 PASS (AG-4, canlı hook regex'inden yeniden türetilmiş — hatırlanmış değil). |

## §1 · AÇIK DEFEKTLER

| Ad | Ölçüm | Ağırlık |
|---|---|---|
| `F-S108-VECTOR-INDEX-TIMEOUT` | 03:50:40Z: `GET /api/admin/vector-index 504` · Vercel 300 sn timeout · armes `items=170 upserted=170 memo=cold ms=223331` · toplam ≈283 785 ms (%95) · `[Vector] corpusSize` satırı YOK (koşu oraya varmadan ölüyor — empty ≠ zero) · beş backend `memo=cold` her koşuda | **AĞIR** — ARMES açıldı, korpus büyüdü, kötüleşmesi bekleniyor |
| `F-S108-STAGEDRAFT-UNKNOWN-KIND` | `honestbench`/`mount-probe` her 30 dk'da 4'er taslağı `unknown kind '<backend>.tool_annotation'` ile REDDEDİYOR, `failed=4`; superset aynı yerde `failed=0` | Orta, bloklamayan |
| `F-S108-LAW-OUTSIDE-HOME` | Denetim raporlandı, landing kartı YOK. Örnek: `ran-floor` yalnız şeridin yerel `MEMORY.md`'sinde yaşıyordu — pencere silinse yasa ölürdü | Orta |
| `F-S108-RULE24-COLLISION` **(kalıntı)** | Repoda kapandı; **Architect'in kendi talimat korpusu (v5_6 §3) hâlâ yanlış metni taşıyor**: "RULE-24 — source = text, no NUL". Kanon: RULE-24 = /admin UI evi; NUL yasası artık RULE-40 | Orta — sahip düzeltmesi gerekir |
| `F-S108-CLASSIFIER-MATCHES-SHAPE` | **HİPOTEZE İNDİRİLDİ.** Karşı örnek: AG-1'in bileşik `POST /rulesets` çağrısı BAŞARILI. Rafine hipotez: ret = şekil × hedef-hassasiyeti; `/rulesets` hassas listede değil. Kanıtlanmamış | Açık |
| `PROBE-CLASSIFIER-2` | Karar verici veri: AG-4'ün komut biçimleri (çıplak mı bileşik mi). Diagnostik, taşıyıcı değil, sahipsiz. `claim/probe-classifier-1` ref'i BU YÜZDEN silinmedi | Diagnostik |
| `F-S108-A23-RECALL-UNIMPLEMENTED` | DARALTILDI: yer gerçeği v1'den beri var (`intendedToolCategories`, 66/66 dolu), yalnız TÜKETİCİ yoktu. Tasarım belgesi metriği iyi niyetle adlandırmış | Hafif |
| `F-S108-SINGLE-LENS-GOVERNANCE` | `GET /branches/{b}/protection` ruleset'e kör; `GET /rules/branches/{b}` klasiğe kör. Hiçbiri tek başına "korunuyor mu" sorusunu cevaplayamaz. AG-3 ve AG-4 bağımsız buldu | Yasa oldu |
| `F-S108-QUEUE-ORDER-IGNORED` | Dört saatlik GO, okunmamış üç yeni hüküm dururken koşturuldu | Yasa oldu |
| `F-S108-MIRROR-CLOSURE-UNMEASURED` | S107 kapanışı repo md5'ini kutununki sanarak yazdı; kapanan yüzey hiç ölçülmedi | Kayıt |
| `F-S107-LANE-WAKE-MANUAL` | Şeritler kendiliğinden yoklamıyor; her tur sahibin "posta"sına bağlı. S108'de sahip ~12 kez yazdı | **AĞIR** — RELAY-RETURN-PATH-1 |
| `F-S107-RELAY-ONE-WAY` | `relay_inbox_reply_authority CHECK ((direction='to_lane') OR (lane_addr='operator'))` — şeritler yazamaz | Yapısal |

## §2 · SIRADAKİ İŞLER (adlandırılmış, kesilmemiş)

1. **#29 A23 Step 0+1** — AG-2'nin `phase/a23-step01-measure-1` dalından devam. SON SOTA anahtarı.
2. **PHASE-LAW-OKF-1** — **sahip hükmü: "merge'den sonra ama MUTLAKA"**. Merge-gate kapandı ⇒ vadesi geldi.
   Kapsam: `docs/laws/` bir OKF bundle'ına (yasa başına bir dosya, yol=kimlik ⇒ numara çakışması inşa gereği
   imkânsız) · frontmatter `enforcement` ve `attestation` alanlarını KORUR + `type`/`timestamp` ekler ·
   `index.md` kademeli açılım · `log.md` = ALTIN DEFTER · **CI konformans kapısı** (kapısız format süstür) ·
   taban-uzunluk kapısı monolitten KAVRAM BAŞINA iner. Kırmızı çizgi: her kavram BAYT-KORUNUMU doğrulanarak
   taşınır (S102: sessiz sıkıştırma defekttir).
3. **MERGE-QUEUE-2** — gerçek kuyruk. Ön koşul: klasik düzlem kalkmış olmalı.
4. **VECTOR-ONBOARD-DRIP-1** — öncelik kuyruğu (sorgular indekslemeyi HER ZAMAN yener) + throttling.
   S102 sahip hükmü: AYRI FAZ, motor anahtarı bunsuz açılmaz. 504 artık ölçülmüş gerekçesi.
5. **RELAY-RETURN-PATH-1** — dönüş yolu + otonom yoklama. Sahibe zamanı geri veren kalem.
6. **Üç-modelli test harness'ı** — 11 soru hazır, sınıflar (CLARIFY/RESOLVE/PARAM/EXEC/HONESTY/SYNTH) kararlı.
   Kurulum: her (soru × model × koşu) TEMİZ session; hücre başına ≥3 koşu (parite bir dağılımdır);
   her hücre `turn_id` taşır. Sahip doğruladı: model bizim pipeline'ımız İÇİNDE değişiyordu ama AYNI
   session'da — bağlam bulaşması ⇒ eski gözlemler model farkı ile sıra etkisini ayıramaz.
7. `PHASE-A23-STEP2-7` · `RULE26-DEBIAN-DETOX-1` · `LANE-TERRITORY-1` (S88 rezervi, hâlâ açık)

## §3 · PARK EDİLMİŞ — ASLA DÜŞÜRÜLMEZ
- **#82b Design-RAG** — Qdrant üstünde tasarım korpusu RAG'i. Tetik: sahip çağrısı ya da A23-sonrası envanter.
- **OKF-TENANT-BUNDLE-1** — tenant topolojisini (17 fabrika · 783 hat · 141 araç · kapsama grafı) OKF bundle
  olarak emit etmek. Sahip S108'de ilgi beyan etti: çok-ajanlı yapıya geçişte gerekli olacak ve **upstream'e
  enhancement olarak önerilebilir**. Aday iki alan, ikisi de ödediğimiz bedelden çıktı:
  `enforcement:` (kavramı bağlayan KABLOLU kapının adresi — OKF'de yok) ve `attestation:` (metnin hangi
  tanıklıkla kanonik olduğu — `resource` bir link, sessiz kısalmayı söyleyemez). Önce KENDİ bundle'ımızda
  kanıtlanır, sonra önerilir. RULE-23: yol-haritası irtifasında, şema taahhüdü yok.
- **Qdrant dashboard erişimi** — sahip kendi çağrısıyla erteledi.
- **STAGE-CONTRACT-TYPES · SEAL-SHARD-1** — S88 rezervleri. SEAL-SHARD-1 fiilen SUPERSEDED: SEAL-DERIVE
  skaler docVersion'ı öldürdü, parçalanacak yüzey kalmadı.
<!-- END v111 -->
