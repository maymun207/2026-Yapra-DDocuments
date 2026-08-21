# REGISTER-BUG-BUCKET · v27 — S88 kapanış
**2026-08-09 · master `19e8420` · kaynak: canlı log/DB okumaları + 4 merge**
<!-- v26'yı geçersiz kılar. Sayım: 34✅ · 5🔶 · 2🛡 · GRİ 0 -->

## Durum değişimleri (v26 → v27)
| Kalem | v26 | v27 | Kanıt |
|---|---|---|---|
| BUG-032 conv-poisoning | 🛡 ARMED | ✅ | S87 doğal tetik + S88 Sırlama-failed karantinası (`54984697`) |
| BUG-037 ready-edit kaybı | 🔶 (workaround) | ✅ | merge `3d6b056`; saha kullanımı machine-v5 yayını |
| F-S87-4 kör-zincir damıtma | ✅(fix bekliyor tanık) | ✅ tanıklı | `8292168` + tersine-dönüş çifti |
| F-S88-1 seri patlaması | — (S88 doğdu) | ✅ tanıklı | `b7f26ce` + sahip-göz 5 seri/5 renk |
| F-S88-2 tablo-failed | — (S88 doğdu) | ✅ tanıklı | `fc8ab78` + `87181610` LandingGate YOK |
| PROCEDURE-YIELD-2 | — (S88 doğdu) | ✅ tanıklı | `fc8ab78` + `4e21e8df` procedure=0 |
| F-S88-3 UI listeleme | — | ❌ GERİ ÇEKİLDİ | arama filtresi tasarım gereği (`GovernanceTab.tsx:293`) |
| F-S88-4 soru-yerinden-etme | — | 📌 AÇIK → PLANNER-0 baş tanık | `af5dbe5f`, BurstGuard ilk doğal turn_tokens kesme |

## Açık 🔶 (5)
BUG-005 (proje kapanışı, sahip hükmü) · BUG-014 (credential kanıtı; credential'lı backend
doğunca uyanır) · BUG-015 harness-dürüstlük CI kapısı (#6) · BUG-016 mekanik relay denetçisi
(#6) · BUG-017 frame zorla-oturtma (yapısal 2E.3; ölçüm #6; F-S87-2 aynı aile).

## ARMED 🛡 (2)
BUG-010-down-kolu · BUG-029.

## W defteri (aktif)
W-018 suffix-retry (gateway-side) · W-026 tenant-zero lokal yanlış-kırmızı (changelog kopyası;
CI'da temiz) · **W-028 domainYield/BurstGuard snapshot yarışı (S88)** · **W-029
MAX_CHART_SERIES grup-vs-seri (S88)** · **W-030 series-ekseni model niyeti (prompt katmanı,
S88)** · **W-031 deriveTableData kopya-kolon denetimi (S88)** · iki-sekme yarışı (optimistic
concurrency, READY-EDIT kalıntısı) · fabricated-macro çifti (grounding) · Gemini+PII error
(3 veri noktası; ARMES tarih-aralıklı vardiya API isteğiyle akraba) · çöp dossier satırı
akıbeti (v93 karar) · Card-05 üç-yasa → STAGE-CARD-COVERAGE-1 · UI-POLISH-NOTE (Stages
admin-UI tetikli; filtre sayacı + rol-scope etkisiz toggle).

## Kanarya / POWER-1 defteri
6 master koşusu, tümü underpowered; reps serisi 4→3→2→1→1→3 (son: `b7f26ce` koşusu n=3
"cannot decide"). Hüküm değişmedi: enstrüman gücü sorunu; çözüm yöntemiyle #6 CANARY-POWER-1.
Yeşil job ≠ hüküm (S86-2) her GO'da payload okumasıyla uygulandı.

<!-- END · REGISTER-BUG-BUCKET-v27 -->
