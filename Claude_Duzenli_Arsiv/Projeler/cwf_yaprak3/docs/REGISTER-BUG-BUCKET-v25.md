# REGISTER-BUG-BUCKET · v25 — işleyen kuyruk (S86 kapanışı, 2026-08-08)

<!-- v24'ü geçersiz kılar. TEK kaynak bu dosyadır; register v90 buradan türetir.
     Kalem SİLİNMEZ; kapananlar §K'ya kanıtla iner. Yeni kalem adıyla eklenir. -->

## §Q · SIRA (yukarıdan aşağı işlenir)
1. **2F.1 `PROCEDURE-RECALL-1`** — başarılı turdan rutin damıtma (ToolComp · Memp).
   Hammadde: F-S86-2 canlı örnekleri (trace 58f1a8b3/9d80df71/0f4902e5: `"son 3 gün"`
   kanıtlı başarısı tur-arası taşınmadı; hata-papağanlığı). D-1: recon önce —
   MemoryWrite/episodes yüzeyi + SUCCESS-ONLY G1 damgaları canlı okunur.
2. **2F.2 `SEMANTIC-MEMORY-1`** — soru→artefakt ("tablo nerede?" vakası); GRAPH-KB-1
   ile TEK organ, tasarım notu ORTAK yazılır (plan 2D.3 bağı).
3. **2F.3 `STEP-EFFICIENCY-1`** — [TurnEfficiency] → pano; S86 turları referans;
   gateway kural-UYUM okuması buna biner (S86-R1).
4. **#6 ALETLER FAZI** — BUG-015 (ölçmeden başarı raporlayan 3 alet) + BUG-016
   (23 öncül hatası tek şekil) + BUG-017 (frame taksonomi zorlaması) +
   **CANARY-POWER-1** (9/9 rep→3 skorlu, 3 ardışık underpowered; hükme varamayan
   kanarya kapı değildir; skorlama/rep konfigi okunur, güç hedefi tasarlanır).
5. **2F.4 `PLANNER-0`** — plan-first + re-plan gate; eylem-iddiası sınıfının
   (F-S86-2/T2 "dönüştürdüm" yalanı) önleyicisi; 2F.1/2F.2 tüketir.
6. `HONESTBENCH-RUN-1` — Blok 4 kapısı.
7. **BUG-005** — Langfuse verbatim; SAHİP HÜKMÜ: proje kapanışı.

**Aletsiz açık:** BUG-014 (credential yolu; credential isteyen backend doğana dek).
**F-S86-2** ayrı faz DEĞİL — 2F.1+2F.4'ün şartnamesine adıyla gömülü.

## §W · İZLEME
W-025 (doc-drift likelyCulprits masumu suçlar — 3. teyit S86) · W-022
(verifySupersetGatewayLive bayat) · W-020 R1/R2 + RAG 3-soru (dış bekleme) ·
ATTR_TOOL_COLLISION_* → config.ts · EVAL_CI_MONTHLY_RUN_CAP → DB-governance
(replay-config fazına biner) · yerel-araç hatasında failure-çipi görünürlüğü
(doğal hata turunda bakılır, üretilmez).

## §A · ARMED (pasif nöbet)
BUG-010 down-kolu · BUG-032 P1/P2 · BUG-029 · [GatewaySearchZero] · chartId çipi ·
SUCCESS-ONLY §0 (historyWindowN 6→0, ARMED-NOT-RUN) · kanarya serisi (POWER-1 lensli).

## §K · S86 KAPANIŞLARI (kanıtla; tam metin register v90 §1)
BUG-006 (satır `04c636b9…`) · BUG-009 (`43d15f38`) · BUG-012 (canlı mühür ×3 nesil) ·
BUG-028 (kimlik denklemi) · BUG-036 (`"spend-unmeasured"`) · F-S86-1/3/4/5
(tanık `3e0e63b0`) · kanarya-tavan (CAP=240, koşu doğrulandı) · rescue (`b2d6c55`).
Önceki kapanışlar: v24 §K aynen.

<!-- END v25 -->
