# CWF · SESSION GRAPH KB · v94 — S93

<!-- CWF-SESSION-GRAPH-KB-v94 · 2026-08-11 · v93'ü supersede eder. -->

## §1 · S93'ÜN TEK CÜMLESİ

*"Ölçü aletinin kendisi hastaydı — boş şemalı stub'a bayt-aynı argüman
sınavı, %70 sessiz fire, %82 boşa jeton — bir günde teşhis edildi, tamir
edildi ve üst üste üç 9/9 ile mühürlendi; aynı gün SOTA kapısının ilk
anahtarı LEARNING-SNAPSHOT canlı doğum kanıtıyla döndü (1.060 satır bayt-aynı
tur), taban canlıya eşitlendi, ve iki fence olayı (Operator'ün repo dokunuşu,
sahiplenilmemiş post-merge edit) yakalanıp üç yeni yasaya dönüştü."*

## §2 · ZİNCİR (neden → ne → sonuç)

1. **Bootstrap RULE-25** → zemin 7/7 (`0de5ffd`, rev 226). #35 teşhisi:
   `stubTools.ts:175` boş şema + `:140` `name#argsHash` defter anahtarı +
   `taskFn.ts:221` stream-SONRASI strict-miss → jeton yanmış rep sessiz ölür.
2. **Büyük ölçüm:** `golden_run_chunks` 400 chunk → 282 sıfır-skor (%70,5),
   0 failed/0 error işaretli, 8.04M/9.78M jeton (%82) boşa; sıfır-skorlu rep
   skorlananın 1,93×'i yakıyor → fırlatma sınıfı ELENDİ (282/282 jetonlu).
   Kusur kanaryaya özgü değil — yayın kapısı aynı motor.
3. **Sahip eleştirileri (ikisi de kabul, sicile):** (a) deterministik test ×
   stokastik sistem = MODELLEME hatası — aleti Architect tasarladı, kendi
   LLM doğasını hesaba katmadı → **S93-1 doğum kanıtı yasası**; (b) PLATINUM
   ihlali (ratifikasyon töreni + yükletme) → düzeltildi: relay = onay.
4. **#35 fazı tek atışta:** gerçek şema türetimi + SAYILAN `servedByName`
   isim-yedeği (emsal: `reusedLast` zaten vardı) + sebep atfı tüm havuz
   sınırlarından. RULE-25: bayt-pin'ler + bağımsız sayım; merge `0d622de`
   (rev 227). **Tanık: 9/9 · 0 failed · 121k jeton (yarıdan az).** Durma
   şartı (scored<9 ⇒ alet sınıfı reddi) TETİKLENMEDİ — kanarya ailesi bitti.
5. **#2 amend zinciri:** recon **6. tabloyu buldu** (`semantic_memory` — v1
   envanterinde yoktu; kapsam mekanikleşti) + migration şekli rafine (çıplak
   -PK iki tabloya kolon DEĞİL, kapı reddi; `task_id` yalnız episodes +
   semantic_memory) + S93-1 gömüldü → sahip sorusu paneli fazın İÇİNE aldı
   (v1_2 §2.5) → sahip UX hükmü A1 (yıkıcı onay TAM CÜMLE) + A2 (şifre
   re-auth reddedildi, gerekçeli).
6. **Çift şerit (S88-1 çapraz-kontrollü):** AG-1 #2, AG-2 #36; merge
   SİMÜLASYONU çakışmayı ÖNCEDEN ölçtü (`toolCategories.ts` temiz —
   AG-1 çit dışı, AG-2 çit içi; manifest+CHANGELOG çakışır, iki lane de
   rev 228 basmıştı) → GO'lar ikinci-merger emrini ölçümden yazdı.
7. **Sevkiyatlar:** `dd561c5` (#2, rev 228; D1 `NULLS NOT DISTINCT`
   izolasyon hatasını migration'da önledi; D4 güvenlik testi GÜÇLENDİ;
   mutasyon 17/17 — 3 survivor'ın üçü de testleri düzeltti) → Operator
   apply + **CANLI DOĞUM KANITI** (manifest=canlı 6/6; aynı görüntüden
   restore bayt-aynı; epoch tam bir; sahip tarayıcı tanığı) → `f6d6e48`
   (#36, rev 229; G-EXCLUDE: kapılı kelime sayıya dönüşerek reddedildi,
   `employee` bayt-aynı; ikinci-merger S92-1 birebir).
8. **Hijyen turu (sahip ekran uyanıklığı):** AG yerel artıkları denetledi —
   master'da 2 commit'lenmemiş dosya RESTORE (köken kuralı: post-merge edit
   içeriğine bakılmaksızın ölür; yama saklandı), `obs-trace-1b` 0-önde dal
   silindi, worktree yasası doğdu (**S93-2**).
9. **Fence olayı çözüldü:** canlı `pg_proc` okuması — uygulanmış SQL
   `where true` TAŞIYOR = düzenlenmiş sürüm; sahip ekranı Gemini'nin diff
   panelini gösterdi → **F-S93-OPERATOR-REPO-TOUCH KESİN** (+ G6 eksik
   beyanı: 3 take, 1 raporlu) → **S93-3 tam-beyan yasası**;
   F-S93-APPLIED≠REVIEWED kayıtlı-zararsız (anlamsal eş), "düzeltme" töreni
   REDDEDİLDİ — fırsatçı yakınsama hükmü.
10. **Doğumlar:** #37 GOLDEN-SET-REPLAYABILITY-1 (14/20 spesimen ancak
    yedekle + alfabetik alt küme + K-3 cap 3→5 — canlı ölçümle güçlendi:
    checked-N 6<9 hüküm kelimesini kilitliyor) · #38 SNAPSHOT-LIFECYCLE-1
    (ad benzersizliği · silme · saklama; sahip ekranı 3× s93-birth gördü).

## §3 · S93'ÜN ÜÇ SEVKİYATI

`0d622de` CANARY-REP-FAILURE-1 (rev 227 · 17/17) ·
`dd561c5` LEARNING-SNAPSHOT-1 🔑1/7 (rev 228 · 17/17 + canlı doğum kanıtı) ·
`f6d6e48` FLOOR-RESYNC-1 (rev 229 · 14/14 · S92-1 ikinci-merger birebir).

## §4 · GELECEK OTURUMLARIN BİLMESİ GEREKENLER

- **SOTA kapısı 1/7** — kalan: #10 · #16 · #18 · #23 · #25 · #29.
- **Kanarya kelimesi cap 3'te `underpowered` KALIR** (checked-N 6<9) —
  beklenen; yeniden teşhis YASAK; mühür #37'de. Fren (regression) bugün tam.
- **`taskId` = temiz-ajan + isim-alanı tek bayrakta**; bugün hiçbir çağıran
  set etmiyor; ilk tüketici #18 A2A.
- **Uygulanmış migration `20260811120000` repo'dan ~13 satır sapar**
  (`where true`, anlamsal eş) — F-S93 kaydı; DÜZELTİLMEZ, ilk dokunan faz
  fırsatçı yakınsar.
- **`WIPE_CONFIRM_SENTENCE`** `shared/learningSnapshot.ts`'te TEK kaynak.
- Operator relay şablonu artık S93-3 üç cümlesini taşır; her faz sonrası
  worktree ÖLÜdür (S93-2).
- Rollout **v3_1** bağlayıcı; payda **38 · açık 32**; implementation-order
  **S93-v5** sayıca ESKİDİ (gün içi üretildi) — v3_1/register v97 kazanır.

<!-- END · CWF-SESSION-GRAPH-KB-v94 -->
