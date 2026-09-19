# cwf_yaprak_9 · TAŞIMA PAKETİ (S142 kapanışı)

Bu zip, cwf_yaprak_9 kabının açılış kaynağıdır. İçindekilerin hepsi cwf_yaprak_8 proje kutusundan
BAYT-AYNI çekildi (sessiz sıkıştırma yok).

## BU PAKETTEKİ 5 DOSYA — _9 KUTUSUNA YÜKLE
1. CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v144.md  ← S143'ün açılış kaynağı, EN ÖNEMLİSİ
2. cwf-open-items-register-v132.md               ← açık kalemler + dört açık sahip kararı
3. CWF-SESSION-GRAPH-KB-v142.md                  ← öğrenilen kenarlar
4. CWF-S142-FINDINGS-v1.md                       ← bu oturumun bulguları
5. CWF-S142-SESSION-CLOSE-v1.md                  ← kapanış kaydı

## BU PAKETTE OLMAYAN, AMA _9'A GEREKEN İKİ ŞEY
6. **Proje talimatları (v5_10)** — _8 kutusundaki `CLAUDE-PROJECT-INSTRUCTIONS-v5_10.md` dosyası VE _8
   proje ayarlarındaki talimat metni. İkisi aynı. _9 → Project instructions alanına **BÜTÜN** yapıştır.
   Pakete koymadım çünkü kanonik kaynağı zaten _8'de duruyor; oradan kopyala ki bir kopya-drift riski olmasın.
7. **Hafıza tohumu (`cwf-memory-seed-CWF5-v3.md`)** — ⚠ ÖLÇÜLDÜ: bu dosya _8 PROJE KUTUSUNDA YOK. Her
   oturumun ilk okuduğu dosya buraya hiç yüklenmemiş; yalnız YEREL REPODA / arşivde yaşıyor. _9'a onu
   yerel repodan taşı. (Bu bir bulgu olarak GRAPH-KB-v142 §E'ye ve FINDINGS'e yazıldı.)

## SIRA
1. _9 kabını yarat, adını ver.
2. Talimatları (madde 6) bütün yapıştır.
3. Bu 5 dosyayı + tohumu (madde 7) _9 kutusuna yükle.
4. Repo / Supabase (`fjbrkimwvtpwoxhziidh`) / Vercel — aynılar, bağla, yeni kimlik üretme.
5. _9'da ilk oturumu aç: "kap devri, S143, tohumu oku, çapayı canlı doğrula." S143 taşınan her satırı
   DOĞRULANMAMIŞ kabul eder ve çapayı (master 7572c3bb…) canlı ölçer.

## YEREL DOC REPO
Senin hükmün: tüm dokümanlar önce yerel git'e yazılır, GitHub'a itmeyi bir şerit yapar. Bu paket + S142
arşivi yerel repona da yazılıyor (ayrı adımda ölçülüp raporlanacak). GitHub'a sync bir şerit işi.
