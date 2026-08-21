# cwf-open-items-register · v91 — S87 kapanış
<!-- v90'ı geçersiz kılar. S37-1. §BUG verbatim kaynağı: REGISTER-BUG-BUCKET-v26.
     Plan gövdesi: cwf-master-rollout-plan-v2_4 (§S87-CARRY dahil, yüklü).
     Envanter referansı: cwf-bug-inventory-S87-v6. -->

## §1 · ZEMİN (S87 kapanış anı)
master `4b828993985ce461cfb5f232865fe4fe75e07c9a` · suite 497/5894 · docVersion
rev 214 · 68 migration · 13 ADR · GATEWAY_RULES 18 · üretim `dpl_79qgr1` READY @
`ac764d6` · governed: superset.routing_hint/energy-synonym-search **v4** ·
armes.persona_fragment/armes.analyst **v2** · kanarya borcu OKUNDU-ÖDENMEDİ
(S87'de İLK kez koştu: 3-rep ve 4-rep, ikisi de underpowered).

## §2 · AKIŞTA (S88'in ilk sırası)
İki AG şeridi ÇALIŞIYOR, çapa `4b82899`: **PHASE-PROCEDURE-YIELD-1** (AG-1) ·
**PHASE-READY-EDIT-TRUTH-1** (AG-2). Raporlar düşünce: iki RULE-25 → GO'lar
(ikinci merge birleşik reseal + çift CHANGELOG — S87'de üç kez işleyen desen).

## §3 · SAHİPTE BEKLEYEN (S87'den devir)
(1) machine kategorisine 7 enerji kelimesi (ARMES→Tool Category→keywords sonu:
doğalgaz, gaz, enerji, energy, sarfiyat, tüketim, consumption → direkt Yayınla) ·
(2) tanık-2 çifti: "Granit fabrikası için son 3 günün OEE değerlerini getirir
misin?" + "Aynı Granit fabrikası için 8 günlük OEE değerlerini getirir misin?"
→ "tanık 2 bitti" (SM1 dossier-bacağı bununla kapanır) · (3) opsiyonel canlı
test: "Şu an Granit'te Sırlama 3,4,5'te çalışanları listele".

## §4 · S87 DERSLERİ (adlı; tam kayıtlar plan v2_4 §S87-CARRY + bucket v26)
S87-1: envanter denetimi kapanış CÜMLESİNİ okur (isim-grep denetim değildir) ·
S87-2: docs-uç kısayolu kullanılınca docs ucu üzerinde check:tenant-zero yine
koşar (kural adayı; SM1 raporu) · S87-3: çift-şeritte master checkout
paylaşılmaz (kural adayı; SE1 raporu) · S87-4: beyan bir iddiadır — boş-dizi
gerçeğini yalnız DENEYEN öğrendi (ADR-010 sahada; sahibin deneyi iki analizi
yanlışladı) · S87-5: Architect comprehension sınıfı iki örnek verdi (gri alarm +
census'u eksik hatırlama) — karşılık YAPI: BUG-016 denetçisi + değişmez tasarım
notları · saklama tanıtıcıları (res_N) TUR-KAPSAMLIDIR, turlar arası
adreslenemez.

## §5 · YENİ ADLI KALEMLER
TOOL-BEHAVIOR-CENSUS-1 (tasarım notu v1 BAĞLAYICI — sahip algoritması R1–R5) ·
FRAME-ON-ALL-PATHS-1 · READY-EDIT-TRUTH-1 (akışta) · PROCEDURE-YIELD-1 (akışta)
· ARMES API isteği + PII veri-sınıfı W'ları + LLMFinish-error-gövdesi W'sı
(bucket v26 §BUG.2).

<!-- END · cwf-open-items-register-v91 -->
