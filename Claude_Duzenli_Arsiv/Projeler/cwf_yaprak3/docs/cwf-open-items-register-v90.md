# cwf-open-items-register · v90 — S86 kapanışı (2026-08-08)

<!-- cwf-open-items-register-v90 · v89'u geçersiz kılar. S37-1: sürümlü, sessizce
     üzerine yazılmaz. İşleyen kuyruk: REGISTER-BUG-BUCKET-v25 (TEK kaynak).
     Çalışma tabanı: cwf-work-board-S74-v1 — yeniden müzakere edilmez. -->

## §1 · S86 KAPANANLAR (12 kalem — kanıt işaretçili)
- **BUG-006** → `telemetry_events` satırı `04c636b9-a3c5-4c74-b537-14675264fc89`
  (04:37:20Z, guard=`synthetic-injector.tokensSpentToday`, err=`InducedReadFaultError`,
  session_id NULL — o guard altındaki TEK satır). Üçlü: HTTP gövdesi (AG) + log çifti +
  satır (Architect, bağımsız). Çit ilk kez POZİTİF kanıtla ateşledi.
- **BUG-009** → merge `43d15f38`. Üçüncü durum `healthReadFailed` + durable satır
  (`BACKEND_HEALth_GUARD`='gatewayPreflight.backendHealth' — kod evi
  mcpHealthWithholding.ts, ad JOIN-ANAHTARI olarak korunur) + çift-dilli çip.
  Fail-open KORUNDU ve test-pinli (fail-closed'a çevirmek ADR-012 POLICY vanası,
  sahip kararı).
- **BUG-036** → gövdenin `"disabled"`→`"spend-unmeasured"` dönüşü (onarım, onardığı
  sistemce kanıtlandı). Preview anahtarı sahip eliyle 08-08 sabahı oturdu
  ("Updated just now" tanığı; ilk deneme 42 günlük satır bulgusuyla yakalanmıştı —
  Finding 1: MEVCUDİYET ≠ GEÇERLİLİK).
- **BUG-012** → canlı mühür: `collisions=0 collided=[]` 5 doğal tur + 3 üretim nesli.
- **BUG-028** → kimlik denklemi `queryCount = Σkanıt + failures` (toolEvidence.ts
  belgeli; tek-diziden-tek-geçiş türetim bayt-doğrulandı).
- **F-S86-1/3/4/5** → RENDER-TIME-1 tanığı (trace `3e0e63b0`, ekran + log; F-S86-3
  KAPALI-TASARIM: EVIDENCE-CHIP-FAILED-CALL-1 sözleşmesi).
- **Kanarya-tavan** → 60/60 hesaplandı; `CWF_EVAL_CI_MONTHLY_RUN_CAP=240` (sahip,
  08-08); FENCE-WITNESS merge'inde koşu DOĞRULANDI (429 uyarısı yok).
- **Rescue dalı** → `b2d6c55` (42 günlük yarım supabase-ro MCP düzeltmesi master'da).

## §2 · AÇIK KALEMLER (kuyruk sırası bucket v25'te)
- **2F.1 PROCEDURE-RECALL-1 — SIRADAKİ.** F-S86-2'nin canlı örnekleri hammadde
  (hata-papağanlığı + tur-arası tekrar; S86 turları referans setinde).
- 2F.2 SEMANTIC-MEMORY-1 (sahip tetikli; GRAPH-KB-1 ile TEK organ) → 2F.3
  STEP-EFFICIENCY-1 → sonra #6.
- **#6 ALETLER FAZI — şartname BÜYÜDÜ:** BUG-015 + BUG-016 + BUG-017 +
  **CANARY-POWER-1** (3 ardışık underpowered; 9/9 rep → 3 skorlu; hükme varamayan
  kanarya kapı değildir — S86-2'nin ikizi).
- BUG-014 (aletsiz, adlı yokluk) · BUG-005 (sahip hükmü: EN SON).
- W-025 · W-022 (bayat) · W-020 R1/R2 + RAG 3-soru (dış bekleme) ·
  ATTR_TOOL_COLLISION_* → config.ts · `EVAL_CI_MONTHLY_RUN_CAP` DB-governance
  (replay-config fazına biner) · yerel-hata failure-çipi görünürlüğü (doğal tetik).

## §3 · ARMED NÖBETLER (pasif; Architect okur)
BUG-010 down-kolu · BUG-032 P1/P2 (ilk gerçek başarısız tur) · BUG-029 ·
[GatewaySearchZero] · chartId çipi · SUCCESS-ONLY §0 deneyi (ARMED-NOT-RUN) ·
kanarya 61+ satır serisi (POWER-1 bağlamında okunur).

## §4 · S86 YASALARI VE RATİFİKASYONLAR
- **S86-1:** Kullanıcı-gözü sözleşmeler modelin kendi çıktısıyla sondalanmadan
  mühürlenmez (parser'ı vuran, modelin makroyu prose'da ANMASIYDI).
- **S86-2:** Yeşil kanarya koşmuş kanarya bile değildir — job'un warning satırı
  okunur, conclusion asla (üç durumlu: cleared / converged-not-cleared / DID-NOT-RUN).
- **RULING-S86-1:** FaultSwitch iki-sınıf API (typo≠kanıt) + LAW2-önce-LAW3 kontrat.
- **RULING-S86-2:** C4' bulgusu kabul, kapı kalktı; tanık tüketici fazına taşındı
  (ve orada BAŞARDI).
- **Danışman ratifikasyonu S86-R1..R4** (plan v2_2 §Değişim-4'te tam):
  R1 QUERY-CANDIDATE-1 DOĞMAZ — CLOSED-BY-RECON (`gatewayProtocol.ts`:
  recover-from-validation-error/P6.8/decline-on-empty; uyum ölçümü 2F.3'e biner) ·
  R2 ders satırı §5'te · R3 PARK ROUTER-DISTILL-1 · R4 multi-agent verifier-side.
- **Sahip kuralı (kalıcı, bellekte de):** sahip aksiyon maddeleri HER ZAMAN
  human-readable, adım-adım, ekran kelimeleriyle; kriptik tek-satır YASAK.

## §5 · DERSLER
- **Compute ölçülen kaldıraç değildir; discovery'dir — MA-RERUN-2 (`b0e8c9e2`):
  clarification bloklarının %62–76'sı entity-unresolved.** (S86-R2; "daha çok
  sampling/daha büyük model" tartışmaları atıfla kapanır.)
- Mevcudiyet ≠ geçerlilik (env satırı 42 gün; Finding 1) — kapılar tazelik/tanık ister.
- Dürüstleşen alet zincirleme hastalık çıkarır: tavan açılınca POWER göründü.

## §6 · S87 AÇILIŞI → CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v87
<!-- END v90 -->
