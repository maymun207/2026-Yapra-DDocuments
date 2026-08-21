# CWF — PARALELLEŞTİRME ÇİT HARİTASI + 4-ŞERİT DALGA PLANI · S95 · v1

<!-- cwf-parallel-fence-map-S95-v1 · 2026-08-12. TÜRETİLMİŞ PLANLAMA GÖRÜNÜMÜ.
     Bağlayıcı sıra rollout v3_2; bu belge SIRAYI korur, yalnız eşzamanlılığı
     tasarlar. Zemin: d8f33f80 · rev 233. Çit iddiaları bölge düzeyinde;
     her faz promptu kesilirken S65-1 canlı okumayla dosya düzeyine pinlenir. -->

## §1 · TEKİL BOĞAZLAR (dalga başına TEK yazar)

| Kaynak | Kural |
|---|---|
| Mühür (`manifest.json`/docVersion) | Dalga başına 1 jeton; jetonsuz şeritler raporda `check:doc-drift = sıfır` kanıtı taşır |
| Migration ledger | Dalga başına ≤2 migration; damga slotları prompt'ta ÖNCEDEN atanır; Operator sırayla uygular |
| Turn pipeline (stages/frame) | Aynı dalgada tek yazar (#6 · #11 · #29 kendi aralarında SERİ) |
| Admin nav/route yüzeyi | Aynı dalgada tek yazar |
| CI workflow dosyaları | Aynı dalgada tek yazar |

## §2 · KALEM SINIFLANDIRMASI (öz-yeterlilik)

**SC-A · Tam self-contained** (yeni dosya / salt-okur teşhis / kendi köşesi —
mühürsüz, migrationsız veya tek-slot):
| # | Kalem | Çit özü |
|---|---|---|
| 22 | CORPUS-LINE-FILL-1 | korpus üretici + veri; synthTraffic ailesi |
| 24 | LINE-RESOLUTION-DIAGNOSIS-1 | salt-okur teşhis scripti + rapor |
| 26 | LLM-SCAN-BASELINE-1 | ölçüm koşumu; mevcut yol salt-okur |
| 17 | HONESTBENCH-HARNESS-0 | yeni harness dizini + stub backend |
| 20 | BENCH-SMOKE-1 | maliyet sayacı; telemetry salt-okur |
| 19 | BENCH-RESET-1 | organ RPC'lerini KOMPOZE eder (salt-çağrı); #40 sınıflarından tür etir → #40 SONRASI daha doğru |
| 7·8·9 | BUG-015/016/017 aletleri | scripts + api/cwf/__tests__; süreç kapıları |
| — | ADMIN-COPY-GATE-1 (S94 üçlüsü) | src/ admin metin + voiceGate tarayıcı genişletme |

**SC-B · Yarı-bağımsız** (kendi bölgesi + 1 dar dikiş):
| # | Kalem | Dikiş |
|---|---|---|
| 12 | METRIC-VOCAB-DISCOVERY-1 | governed metric satırları + keşif kancası |
| 15 | backend-lifecycle affordance | admin bölgesi + backends yazımı |
| 13 | PACK-FROM-PROTOCOL-1 | prompt kompozisyonu + evalGate 160-164 |
| 21 | DISCOVERY-EXTEND-2 | discovery bölgesi (ADR-009 hattı) |
| 28 | OPA-POLICY-1 | yeni policy motoru + tek kapı dikişi |
| 37 | GOLDEN-SET-REPLAYABILITY | eval-ci seçim kodu + governed cap; **mühürlü kapının kendisi — SAHİP KARARI ister** (K-3 koşu bedeli + kanaryayı erken açar) |
| 34 | AGENTBEATS | yeşil/mor ajan; dikişi #18'in A2A'sı |

**WIDE · Geniş çit** (dalganın A-şeridi; mühür jetonu bunlarda):
#6 · #10 🔑 · #11 · #16 🔑 · #18 🔑 · #23 🔑 · #25 🔑 · #29 🔑

**LOCKED · Kilitli** (önkoşul/kapı): #14 (←#7-9 ölçümü) · #27 (←#26 + Qdrant
altyapı onayı) · #31 (←#17) · #30/#32/#33 (kapı arkası, sahip sıralaması).

## §3 · 4-ŞERİT DALGA PLANI v2 (Dalga 1 UÇUŞTA, değişmez)

Şablon: **A=ağır(mühür) · B=orta · C/D=SC-A hafif.** C/D raporları A'dan önce
düşecek boyda kesilir (kademeli teslim → RULE-25 bandı boşa akmaz).

| Dalga | A (mühür) | B | C | D | Not |
|---|---|---|---|---|---|
| 2 | #6 FRAME-SHADOW | ADMIN-COPY üçlüsü | #24 teşhis | #22 korpus | C/D salt-okur/veri → risk ~0 |
| 3 | 🔑 #10 CENSUS | #7 aletler | #8 denetçi | #9 ölçüm | #10 migration slot-1 |
| 4 | #11 FRAME-ALL-PATHS | #15 lifecycle | #19 RESET | #20 SMOKE | #19 artık #40-sınıf-türevli |
| 5 | 🔑 #16 MOUNT | #13 PACK | #17 HONEST-0 | #26 BASELINE | #16 migration slot-1 |
| 6 | 🔑 #18 A2A | #14 ROUTE-ASK (kilit açıldı) | #21 DISC-EXT-2 | #12 VOCAB-DISC | |
| 7 | 🔑 #23 PathB | #28 OPA | #34 AGENTBEATS | (#37 sahip onaylarsa) | #23'ü #24+#22 besledi |
| 8 | 🔑 #25 GRAPH-KB | #27 vektör (onaylıysa) | küçük artıklar | — | |
| 9 | 🔑 #29 A23 | (#37 kalmışsa) | — | — | **→ yaprak_gate** |
| 10 | #30 EVAL-SPLIT + ilk ölçüm | #33 B-FRONTIER | #31 honestbench | #32 v1.1 | |
| 11 | ölçüm artıkları / temizlik | — | — | — | **→ cinekop_gate** |

**Projeksiyon:** yaprak_gate ≈ Dalga 9 (2-şeritte 12 idi) · cinekop_gate ≈
Dalga 10-11 (15 idi). Uyarı aynen geçerli: bu iş SAYISI bölümü; #23/#25/#29
alt-faza bölünürse +2-3 dalga.

## §4 · GÜVENLİK KURALLARI (her 4-şerit dalga promptuna gömülür)

1. Mühür jetonu yalnız A'da; B/C/D `check:doc-drift` sıfır-kanıtı olmadan GO alamaz.
2. Migration damga slotları dalga açılışında atanır; rebase'te yeniden damga.
3. Her rapor `git diff --name-only` verbatim; Architect 4'lü kesişim matrisini
   hesaplar (6 ikili), beklenen ∅ — varsayılmaz, ölçülür (S88-1 genişletilmiş).
4. Merge sırası dalga içinde sabit: A → B → C → D; her merge sonrası sonraki
   şerit rebase + drift yeniden koşar.
5. C/D'ye makine-doğrulanır doğum kanıtı (kapı iki yönde kırmızı) zorunlu —
   RULE-25 incelemesi ucuzlar, banttaki derinlik A'ya saklanır.

## §5 · SAHİP KARARI GEREKTİRENLER (planı açan üç kilit)

1. `learning.snapshotRetentionMax` yayın (bekliyor — evet/hayır).
2. **#37 erken çekilsin mi?** Teknik çit dar; ama K-3 (cap 3→5) koşu bedeli var
   ve kanarya hükmünü ERKEN canlandırır. Önerim: Dalga 7'de evet — ilk skor
   turuna alet hazır girer.
3. **#27 Qdrant altyapısı** (harcama + host): Dalga 8 öncesi onay.

<!-- END · cwf-parallel-fence-map-S95-v1 -->
