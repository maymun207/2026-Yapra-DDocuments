# REGISTER — BUG BUCKET · v35 (S99 kapanışı)

<!-- REGISTER-BUG-BUCKET-v35 · 2026-08-14. v34'ü geçersiz kılar. -->

## 🔴 AÇIK
| Ad | Detay | Yol |
|---|---|---|
| **F-S99-SYNTHETIC-INJECTOR-SILENT** | 21 planlı ateşleme → 0 `synthetic_runs`, 0 digest; kontrol: obs-host cron AYNI pencere/deploy'da attı → cron düzlemi canlı, arıza enjektöre ÖZGÜ; sessizlik 01:39:34Z'den beri (S99 merge'lerinden ÖNCE). Sonuç: golden runner güçsüz, kanarya aç, honestbench izi ödenemez. | **#57** (Dalga 7, teşhis-önce; AG-2) |
| silent_finish | 30 günde **16 olay / 16 tur** — Health panel top hata sınıfı. S98'in "tek örnek; tekrarında tasarım maddesi" nöbeti AŞILDI. | **#59** (Dalga 8) |
| ARMES yetki: 13 araç | "no access to factory" — ARDIC'ta; sayım bulgusu DEĞİL, erişim grant'ı. Tek dokunuş 13 aracı açar. | dış bekleme |
| F-S98-SHIFT-QUERY-UNUSABLE | Vardiya yüzeyi ARMES'te kullanılamaz — ARDIC'a iletildi. | dış bekleme |

## 🟡 SAHİP HİJYENİ
| Ad | Detay |
|---|---|
| User-voice kuyruğu | 3 incelenmemiş 👎, hepsi 48s+ eski, golden dönüşüm 0/3. Üçü de gerçek grounding/erişim şikâyeti — golden-set adayı: "bana felsefe yapıyorsun…" · "fabrika listesini KB7 ile nerede ilişkilendirdin" · "yanlış cevap, armes'e ulaşamadın". Boş 2 dakikada panel → User voice → Inspect. |

## 🔵 NÖBET
| Ad | Detay |
|---|---|
| Adsız flake ×2 | (a) #55 raporu "one unnamed intermittent — NOT-READ"; (b) AG-4 push-on-red: 1 failed/8209, üç re-run yeşil, **kırmızı satır yakalanmadan kayboldu**. S99-9 adli disiplini: kırmızı çıktı önce DOSYAYA. Üçüncü görülmede kalem açılır. |
| BUG-016 sayacı | değişmedi |
| Kanarya kilidi | kelime cap'te; verdikt nöbeti sürüyor |
| transient permission classifier retry | tek örnek |
| F-S97-REGISTRY-PARENT-OVERWRITE | #25 çağında ele alınır |
| GitHub App token formatı (ghs_, ~520 kar.) | entegrasyon nöbeti |

## ✅ S99'DA KAPANANLAR
| Ad | Nasıl |
|---|---|
| F-S99-BUS-WRITE-AUTHORITY-BY-CONVENTION | #53: `relay_lane` rolü canlı; tam 2 sütun ayrıcalığı; pozitif kontrol 1 satır; TELDE DEĞİL (authenticator grant'ı bilinçli yok, test-pinli) |
| F-S99-BENCH-RESET-UNARMED | #54: katalog doğdu (54/54, drift 0/0, panel GOOD, sahip gözü); 503 artık dünya değiştiği için çözülür; uç okuması W7 bench kullanımına katlandı (session-gated) |
| F-S99-CI-ZERO-RUNS-READS-AS-CLEAN | Yasalaştı: `total_count:0` = BAŞARISIZ; teşhis uzayı conflicted/unpushed/**no-PR-yet**/docs-only-master |
| F-S99-MAILWAIT-ATTRACTOR | S99-3 + S99-4 |
| OBS-HOST-HEALTH-1 | #45: 5 ardışık `reachable` tick (249-296ms); `could-not-read` YAZILIR; pencere anotasyonu yapısal ayrık |
| F-OBS-FLUSH-OK-LIE artığı | #52: türetilmiş pack span iddiası `ctx.systemPrompt`'a karşı hesaplanır |
| W-035 → #50 | Sebep DÜZELTMESİYLE kapandı (A-REC-S99-8): literal `isArmes` arkasındaydı; zarar backend adsız üç kardeşteydi; dördü de artık hesaplar |
| born-knowing-ARMES ailesi | #50 + #55 (+S90 metric): platform kodu yalnız doğduğu adları bilemez — aile kapandı |
| `4faf054` CANCELED nöbeti | sonraki merge'lerle kapandı |
| ARDIC "kusur listesi" | ölçümle GERİ ÇEKİLDİ: 18/18 bizim; üç-liste yasası census'a bağlandı; canlı re-probe borç |

<!-- END · REGISTER-BUG-BUCKET-v35 -->
