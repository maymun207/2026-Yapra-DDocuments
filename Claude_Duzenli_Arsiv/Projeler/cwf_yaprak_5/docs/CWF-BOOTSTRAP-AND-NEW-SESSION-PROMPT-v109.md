# CWF — BOOTSTRAP & YENİ OTURUM PROMPTU · v109 (S109 açılışı)
<!-- 2026-08-19. v108'i GEÇERSİZ KILAR. ÇAPA S108 kapanışında CANLI ÖLÇÜLDÜ
     (taze klon, Architect'in kendi kabından). BÜTÜN yazıldı (A-REC-S101-7). -->

## §1 · ÇAPA TABLOSU (S109 açılışında TAZE KLONDA DOĞRULANACAK)
| Ölçüm | S108 kapanış değeri |
|---|---|
| `git rev-parse origin/master` | `cd2d5ed209411e10f09fcba55b3aaa0fa4a8f0bc` |
| Açık PR | **0** (#295 · #296 · #297 · #298 hepsi MERGED) |
| `docs/laws/CONSTITUTION.md` md5 | `7fb9eb4356947ad84217ca2768503ef4` (41 649 B) |
| `docs/laws/RULES.md` md5 | `cc9783892d6206071d6aac8c21ede602` |
| Son kural numarası | **RULE-44** (40 NUL · 41 auto-merge · 42 lane-lock · 43 header · 44 roster) |
| Master koruması | ruleset `master-merge-gate` id 21034238 · required `build (24.x)` · strict · `bypass_actors: []` |
| Klasik koruma düzlemi | **UNKNOWN** — AG-4'e silme emri verildi, sonuç Architect'çe DOĞRULANMADI |
| Üretim ARMES | **UP** — `[BackendHealth] checked:5 up:5 down:0` |
| Üretim `[McpClose]` armes | `session_terminated: 'true'` · `close_ok: true` |
| vector-index cron | **504** — 300 sn bütçe, ~284 sn ölçüldü, armes tek başına 223 sn |

⚠ **Bu tablo bir İDDİADIR (TOTAL-45).** Doğrulanmadan öncül yapılmaz.
⚠ **Klasik koruma satırı bilerek `UNKNOWN`:** Architect'in kabında kimlik yok (`could not read Username`)
ve API okumaları `403 rate-limit` döndü — bu bir "hayır" değil, bir OKUYAMADIM. S109 preflight bunu
İKİ MERCEKTEN birden okur (aşağı bak) ve sonucu kaydeder.

## §2 · AÇILIŞ SIRASI (bağlayıcı)
1. `cwf-memory-seed-CWF5-v1` oku.
2. Bu dosya + ÇAPA doğrulaması (taze klon, `git ls-remote` + `md5sum docs/laws/*`).
3. `cwf-open-items-register-v111` · `CWF-SESSION-GRAPH-KB-v108` · `REGISTER-BUG-BUCKET-v44` ·
   `cwf-implementation-order-S108-v21` oku.
4. **YASA PREFLIGHT — AYNA YOK.** Proje kutusundaki `CONSTITUTION.md` S108'de EMEKLİ EDİLDİ ve silindi.
   Yasalar taze klondan `docs/laws/` okunur. Repo erişilemiyorsa Architect DURUR ve söyler — sessizce
   yanlış bir aynayla çalışmaz.
5. **GOVERNANCE PREFLIGHT — İKİ MERCEK ZORUNLU (RULE/F-S108-SINGLE-LENS-GOVERNANCE):**
   `GET /repos/maymun207/cwf_yaprak/rulesets` **ve** `GET /branches/master/protection`.
   `404` tek başına "korumasız" DEMEK DEĞİLDİR — klasik uç ruleset'e yapısal olarak kördür.
   İkisi okunamıyorsa cevap `UNKNOWN` yazılır, tahmin edilmez.
6. SOTA-1 POZİTİF KONTROLÜ: ilk mesajda kelimesi kelimesine, taze klondan (S66-1).

## §3 · İLK İŞLER (sıra bağlayıcı)
**1 · AG-2'nin dalını al.** `phase/a23-step01-measure-1` — S108'de W0 recon'u bitti, DRAFT PR'da.
   A23 Step 0+1 oradan devam eder. SON SOTA anahtarı, ertelenemez (SOTA-1).
**2 · PHASE-LAW-OKF-1.** Sahip hükmü S108: *"merge'den sonra, ama MUTLAKA."* Merge-gate kapandı →
   bu artık vadesi gelmiş borçtur, seçenek değil.
**3 · MERGE-QUEUE-2.** Bugün canlı olan gerçek kuyruk değil: required-checks + `strict` + auto-merge,
   yani tazelikle serileştirme. Sahip dört şerit dedi; dördü güvenli kılan gerçek kuyruktur.
   Ön koşul: klasik düzlem kalkmış olmalı (iki düzlem okunamaz).
**4 · F-S108-VECTOR-INDEX-TIMEOUT.** ARMES açıldı → korpus büyüdü → 504'ün kötüleşmesi BEKLENİYOR.
   İlk 03:50 UTC koşusu okunur; `ms` ve `rows` buraya basılır. DRIP fazının ölçülmüş gerekçesi.

## §4 · S108'DE YERLEŞEN HÜKÜMLER (kalıcı)
- **Şerit adresi bir ETİKET, kilit DEĞİL.** Kimlik iki kaynaktan doğar: kazanılmış `refs/heads/lane/AG-N`
  claim'i (nonce ZORUNLU) ya da bu oturumda yaratılmış dal/PR. **Bus'tan kimlik çıkarmak YASAK** —
  "en taze kart AG-1'e yazılmış, demek ki AG-1'im" dört pencereyi aynı adrese düşürdü.
  Claim yürüyüşünden ÖNCE `ls-remote` ile varlık kontrolü (fast-forward eden claim sessizce çalar).
- **`--auto`, gerektirilen kontrol YOKKEN beklemez — DERHAL birleştirir.** Ölçüldü: #295, `build` ve
  `rule26` in_progress iken indi. Kapı armed iken aynı komut #297'yi **16 dakika bekletti.**
  `--auto` yalnız, hedef dalda required check'in AKTİF olduğu AYNI NEFESTE doğrulandığında serbest.
- **Şeritler merge etmez.** Dal → push → PR → check → DUR. Detached-merge deyimi EMEKLİ.
- **Sınıflandırıcı ret'i muhtemelen ŞEKİL × HEDEF-HASSASİYETİ çarpımıdır — HİPOTEZ, yasa değil.**
  Karşı örnek: bileşik `POST /rulesets` BAŞARILI oldu. Pratik kural her iki hipotez altında da bedava:
  hassas çağrı ÇIPLAK yazılır, satır başına bir komut, `&&` yok, pipe yok, wrapper yok.
- **Kart icra edilmeden önce BÜTÜN kuyruk okunur, yeniden eskiye.** Dört saatlik bir GO, aynı kutuda
  okunmamış üç yeni hüküm dururken koşturuldu; biri kartın HARCANMIŞ olduğunu söylüyordu.
  Eşlik eden kapı: `gh pr list --state all` (sadece-açık sorgusu harcanmış kartı göremez) + S81-1 fetch.
- **`consumed_at` bir sinyal DEĞİLDİR, iki yönde de.** Beş kartın beşi NULL göründü, PR #295 olarak
  inen dahil. `supabase-ro` yazamaz. ASLA damgalanmaz. Kartın okunduğunun kanıtı ŞERİT RAPORUDUR.
- **Her şerit mesajı ÖLÇÜLMÜŞ başlıkla açılır** (RULE-43): lane · kart · saat / claim ref / dal+PR /
  master / status. Dördü ölçülür ki etiket yanlışsa alt satırlar ele versin.
- **Bir muhafız, yazıldığı yerde değil KAPSAMASI GEREKEN YOLLARIN SINIRINDA incelenir**
  (L-S108-CROSS-FILE-HOLE). `runTurn.ts` tek başına F169-uyumlu okunuyor ve öyle — ona ULAŞAN her yol için.
- **Zorunluluk tüketimi ima etmez** (L-S108-REQUIRED-IS-NOT-CONSUMED). `intendedToolCategories` dört
  korpus nesli boyunca zorunlu, dolu ve HİÇ OKUNMAMIŞ. Tip sistemi VARLIĞI dayatır, KULLANIMI hiçbir şey.
- **Bir rapor, pencereler ve saatler arası taşınan İCRA EDİLEBİLİR bir artefakt olabilir.** İnen
  MERGE-GATE raporundaki payload bayt-bayt uygulandı, kartın hiç adlandırmadığı alan dahil.
- **Metrik ikamesi yasak.** Coverage ≠ Recall@k; kategori-seviyesi recall ≠ araç-seviyesi.
  Ölçülemeyen metrik ADIYLA boşluk olarak raporlanır. Bildirilen boşluk adımın tamamlanmasıdır.

## §5 · OTURUM HİJYENİ
Kuyruk boşaldığında Architect KAPANIŞI ÖNERİR. Claim ref'leri oturum sonunda silinir; `claim/<kart>`
ref'i kart kapanana kadar KALIR (silmek kartı çifte koşuya açar).

## §6 · KAPANIŞ SETİ — yedi belge, biri eksikse kapanış eksiktir
register · KB · bug-bucket · bootstrap · implementation-order · AG-boots · session-close.
<!-- END v109 -->
