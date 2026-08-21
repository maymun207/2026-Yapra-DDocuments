# CWF — AÇIK KALEMLER REGISTER · v99 (S95 kapanışı)

<!-- v98'i geçersiz kılar. Bağlayıcı sıra: cwf-master-rollout-plan-v3_2.
     İş tabanı: cwf-work-board-S74-v1 (yeniden gözden geçirilmez). -->

**ZEMİN:** `origin/master` `1b7f8dd` · docVersion **rev 240** · 554 test
dosyası · 73 migration (canlıda 73) · 14 ADR · drift 7/7 temiz.

**BURN-DOWN:** payda **41** · kapalı **16** · açık **25** · uçuşta **0**.
SOTA kapısı **1/7** (kalan anahtarlar: #10 · #16 · #18 · #23 · #25 · #29).

---

## §1 · S95'TE KAPANANLAR (yedi kalem, sekiz merge)

| # | Kalem | Merge | Ne getirdi |
|---|---|---|---|
| 24 | LINE-RESOLUTION-DIAGNOSIS-1 | `32c0222` | Salt-okur teşhis merceği; 785 iddiası ölçülebilir nicelik oldu. İki payda ayrı tutuldu (FRAME vs REFERENCE). `unclassified` yapıca erişilebilir |
| 22 | CORPUS-LINE-FILL-1 | `261714d` | 60 hücreli matris, 20 ifade (all-pairs bijeksiyon), 40 hücre ADIYLA boş. Tenant sözlüğü ağaca girmiyor ({{LINE:n}} token) |
| 41 | SWEEP-BARE-DELETE-1 | `6ab9cea` | Ev geneli etkin-gövde kapısı. **Sıfır ihlal ölçüldü.** 29 etkin gövde / 28 SECURITY DEFINER; canlı `pg_proc` bağımsız kâhini birebir doğruladı |
| 40 | PERSISTENCE-CLASS-1 | `d8e7688` | **ADR-014.** 49 tablo TOTAL sınıflandırma, 10 sınıflık kapalı sözlük, iki yönlü CI kapısı. `LEARNED_TABLES` artık türev |
| 26 | LLM-SCAN-BASELINE-1 | `6b7ac73` | Vektörün geçeceği çıta. Aday SIRASI enstrümanın parçası sayıldı (alfabetik/katalog/hash üçü de reddedildi) |
| 20 | BENCH-SMOKE-1 | `0ace26b` | Tek maliyet organı. Hakem modeli DAİMA satır. Sıfır fiyat sabiti — yönetilen kayıt |
| 6 | FRAME-SHADOW-EVIDENCE-1 | `b5745d3` | Frame kendi gerekçesini gölgede kaydediyor. Kaydedici fırlarsa tur tamamlanır (kanıtlı). `telemetry_events` altında, yeni tablo yok |
| 10 | TOOL-BEHAVIOR-CENSUS-**1A** | `1b7f8dd` | R1 sonda motoru + kayıt + R5 yazma-tarafı (flag KAPALI). **Anahtar DÖNMEDİ** — #10 açık kalır |

Operator: `20260812200000_tool_behavior_census.sql` uygulandı; 7/7 kapı
`pg_catalog`'dan geçti, ledger 73 / tepe `20260812200000`.

---

## §2 · AÇIK KALEMLER (25) — bağlayıcı sırada

| # | Kalem | Dalga | Not |
|---|---|---|---|
| 10 | 🔑 TOOL-BEHAVIOR-CENSUS-**1B** | **3** | R2 defter · R3 cron/FRESH · R4 evrim farkı. Anahtar burada döner |
| 7 | BUG-015 aletleri (+W-026 ×5) | 3 | |
| 8 | BUG-016 relay-denetçisi | 3 | |
| 9 | BUG-017 ölçüm | 3 | #7+#8+#9 → #14'ün kilidi |
| 11 | FRAME-ON-ALL-PATHS-1 | 4 | #6 kardeşi |
| 15 | backend-lifecycle affordance | 4 | #16 önkoşulu |
| 19 | BENCH-RESET-1 | 4 | ADR-014 sınıflarından türetir |
| 21 | DISCOVERY-EXTEND-2 | 4 | |
| 16 | 🔑 BENCH-BACKEND-MOUNT-1 | 5 | Zero-code mount |
| 13 | PACK-FROM-PROTOCOL-1 | 5 | |
| 17 | HONESTBENCH-HARNESS-0 | 5 | |
| 12 | METRIC-VOCAB-DISCOVERY-1 | 5 | |
| 18 | 🔑 BENCH-A2A-1 | 6 | #34'ün önkoşulu |
| 14 | ROUTE-ASK-1 | 6 | Yakıtı #6, kilidi #7-9. Gölge kanıt hazır |
| 28 | OPA-POLICY-1 | 6 | |
| 37 | GOLDEN-SET-REPLAYABILITY-1 | 6-7 | Sahip kararı bekliyor (erken çekim) |
| 23 | 🔑 PB-FULL-1 / PB-A | 7 | Yakıtı S95'te geldi (#24 + #22) |
| 34 | AGENTBEATS-INTEGRATION-1 | 7 | #18'e bağlı |
| 27 | vektör (Qdrant · bge-m3) | 7 | Çıtası #26. Sahip altyapı onayı bekliyor |
| 25 | 🔑 GRAPH-KB-1 | 8 | |
| 33 | B-FRONTIER-PAIRING-1 | 8 | Eşit maliyet sonradan kurulamaz |
| 29 | 🔑 A23 ANLAMA KATMANI | 9 | **→ yaprak_gate** |
| 30 | EVAL-SPLIT-LAW + ilk ölçüm turu | 10 | |
| 31 | honestbench (Fast_p) | 10 | |
| 32 | v1.1 kuyruğu | 10 | **→ cinekop_gate** |

**Yeni aday (yürüyüş kalemi DEĞİL, adlandırıldı):**
**SWEEP-BARE-WRITE-2** — `TRUNCATE` + WHERE'siz `UPDATE`; ikisi de bugün sıfır
ölçüldü ama #41'in kapısının kapsamı dışında. Aleti hazır, faz ucuz.

---

## §3 · S95'TE DOĞAN BULGULAR

- **F-S95-MULTISPAN (AG-3):** çoklu-hat ifadeleri ("Hat 3-4") sessizce İLK
  hatta çözülüyor — blok değil **kendinden emin yanlış cevap**. Hiçbir
  clarification-türevli sayı bunu göremez, bu merceğinki dahil. #23/#25
  tasarımına adıyla giriyor.
- **W-039 MAINTAIN-RESIDUE-READ (nöbet):** PG17'de revoke sonrası `anon`/
  `authenticated` üzerinde MAINTAIN kalır; `has_table_privilege` SELECT/INSERT
  için false. `verifyGrants` probu bunu "grant var" diye okumamalı.
- **#10 kısmi kapsam (1B girdisi):** sonda bütçesi 25, ARMES ~97 read-annotated
  araç yayınlıyor → büyük katalog bugün KISMEN sansüslü, plan bunu beyan ediyor.
- **A-REC-S95-1 (Architect):** iki SC-A prompta "sıfır mühür + drift temiz"
  yazıldı; Architecture Map globu altında yapısal olarak bağdaşmazdı.
- **A-REC-S95-2 (Architect):** sıra değişimi AG-1'e relaylenmedi.

---

## §4 · SAHİP KARARLARI (üçü de açık)

1. `learning.snapshotRetentionMax` yayını (taban 500) — öneri: **evet**.
2. #37'nin Dalga 6-7'ye erken çekimi (K-3 koşu bedeli) — öneri: **evet**.
3. Qdrant altyapı onayı (#27) — Dalga 7 öncesi yeterli.

## §5 · NÖBET (faz açtırmaz)

Kanarya `underpowered` kilidi (mühür #37) · CANARY-VERDICT verdikt nöbeti ·
Langfuse aylık fence penceresi (~20'si, ~10 gün): F-OBS-FLUSH-OK-LIE +
OBS-HOST-HEALTH-1 · S94 admin metin üçlüsü (F-S94-VOICEGATE-BLIND +
TRUST-COPY-STUTTER + HEALTH-SYSTEM-ROW) — ADMIN-COPY-GATE-1 adayı ·
W-030/032/033/018/034/035/036/037/038/**039** · UI-POLISH-NOTE · BUG-005 ·
BUG-014 · header SHA rozeti bayatlığı · #39'un el-tanıklığı (Restore).

## §6 · PARK (tetikli)

TENANT-CONSOLE/EAIP-TENANT (müşteri #2) · SEED-PROBATION (Graph-KB ∨ kurulum
#2) · nakil kanıtı 2. yarısı (kurulum #2) · RELAY-BUS-1 · Doctrine v1_2 D-6 ·
ACTION-AUTHORITY-ADR → BACKEND-N8N-1 (CENSUS tetiği — **1B ile yaklaşıyor**) ·
LangGraph · HISTORY-DIET-1 · MEMORY-HYGIENE-Q · ROUTER-DISTILL-1 ·
QUERY-CANDIDATE-1.

<!-- END · cwf-open-items-register-v99 -->
