# CWF → Yeni Proje Devir Manifestosu · S82 kapanışı · v1_1 · 2026-08-06

> **v1_1: BÖLÜM B MİNTLENDİ. Beş dosya artık mevcut — aşağıdaki "YÜKLENECEK NİHAİ LİSTE" hazır.**

<!-- Amaç: sıfırdan yeni bir Claude projesi açıldığında, Architect'in S82'nin
     bıraktığı yerden EKSİKSİZ devam edebilmesi için gereken TAM dosya listesi.
     İki bölüm: (A) HÂLÂ GEÇERLİ mevcut dosyalar — yeni projeye yüklenecek.
     (B) HENÜZ YOK — bu gece mintlenmeden yeni proje BAYAT boot eder. -->

## KURAL: yeni proje şu sırayla okur (bootstrap v82 §2'nin devamı)

Bir Claude projesi state'i hafızada taşımaz — **canlı pozisyon dosyalardadır.** Yeni
projeye aşağıdaki dosyalar yüklenmeli; Architect ilk mesajda bunları okuyup RULE-25 ile
canlı repoya karşı doğrular.

---

## BÖLÜM A · ZORUNLU ÇEKİRDEK — bunlarsız proje boot etmez

### A1 · Kimlik & doktrin (değişmez omurga)
| Dosya | Rol |
|---|---|
| `CLAUDE-PROJECT-INSTRUCTIONS-v4.md` | Durable map — üç şerit, yasalar, davranış |
| `cwf-architect-doctrine-v1_2.md` | D-1…D-7, çiğnenemez |
| `cwf-sota-definition-v1_5.md` | v1'in TEK kabul ölçütü (SOTA-1'in dayanağı) |

### A2 · Canlı pozisyon (EN kritik — her oturum başı okunur)
| Dosya | Rol | ⚠ |
|---|---|---|
| `CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v82.md` | Boot prompt · SOTA-1 verbatim · ilk eylemler | **v83 borçlu** |
| `cwf-master-rollout-plan-v2_0.md` | Yürüyüş haritası (bloklar, ölçütler) | **v2_1 borçlu** |
| `REGISTER-BUG-BUCKET-v20.md` | **İşleyen kuyruk (§BUG.5)** — asıl iş sırası | **v21 borçlu** |
| `CWF-SESSION-GRAPH-KB-v82.md` | Oturum grafiği, taşınan cümleler | **v83 borçlu** |
| `cwf-open-items-register-v85.md` | Açık kalemler | **v86 borçlu** |

> **A2'nin tamamı bayat.** Beş dosyanın da bir sonraki sürümü borçlu (Bölüm B).
> Yeni proje bugünkü sürümlerle boot ederse **S82'nin hiçbir işini görmez.**

### A3 · Mimari yasa zemini (ADR'ler — referans, nadiren değişir)
- `ADR-001` (backend trust/provenance) · `ADR-005` (supabase apply authority) ·
  `ADR-006` (operating modes) · `ADR-009` (entity topology discovered) ·
  `ADR-010` (earned trust) · `ADR-012` (restriction taxonomy)
- Not: ADR-013 ve S82'nin S82-3/4/5/6 yasaları **repoda + KB'de** yaşıyor; ayrı dosya değil.

### A4 · Bu oturumun kavram zemini (yeni — devirde ŞART)
| Dosya | Neden load-bearing |
|---|---|
| `cwf-architecture-research-S82-v1.md` | Bilişsel katman (2F) tasarımının SOTA dayanağı — progressive disclosure, dört bellek katmanı, AWM/Memp, benchmark seti |

---

## BÖLÜM B · BU GECE MİNTLENMELİ — yoksa yeni proje S82'yi kaybeder

Bunlar **henüz üretilmedi.** Architect (ben) token gerektirmeden çıkarır; AG/Operator'a
ihtiyaç yok. Her biri A2'deki bir bayat dosyanın yerini alır.

| Yeni artifact | İçermesi ZORUNLU olan S82 hareketi |
|---|---|
| **`REGISTER-BUG-BUCKET-v21.md`** | 8 kapanış (020·021·023·024·025·026·027·030 kanıtla) · yeni kalemler (028·029 AG-1'de · **BUG-031 aday-seçim** · **SUCCESS-ONLY-RECALL** · CHART-CANDIDATE) · dört sayının pozitif kontrolü |
| **`cwf-open-items-register-v86.md`** | §BUG **verbatim** taşınır (D-003 böyle düşer) · WAIT CONTRACT güncel |
| **`cwf-master-rollout-plan-v2_1.md`** | 2F.0a/0b ✅ · **conv-poisoning bulgusu** (8/8 desen) · yeni 2F sırası: SUCCESS-ONLY-RECALL → CHART-CANDIDATE |
| **`CWF-SESSION-GRAPH-KB-v83.md`** | S82'nin hikâyesi: iki günlük savaş, çift şerit, viz zinciri, conv-poisoning keşfi |
| **`CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v83.md`** | Yeni zemin SHA `40085d6` · 477 test · rev 199 · yeni kuyruk · SOTA-1 + S82-6 verbatim |

### B'nin içine giren, kaybolmaması gereken CANLI KANITLAR
- **conv-poisoning deseni** (bugünün en büyük bulgusu): `conv=0`→8/8 başarı,
  `conv≥1`→8/8 başarısızlık. Trace'ler: `27f4ec93·8b2cb9bc·4802570d` (✅) vs
  `31f2276d·0c8632b3·ce354e56·b875b00d` (❌).
- **İki grafik tuzağı:** ID 85 (`echarts_timeseries_bar`, 5 satır) vs ID 94
  (`big_number_total`, 1 satır) — "sarfiyat" vs "sarfiyatı" tek harf.
- **Zemin:** master `40085d62627d3277fb4cb2cb9251ec2c0296ca7c` · 477 test dosyası ·
  67 migration · docVersion rev 199 · üretim deploy `dpl_J2ioabs…`.
- **Askıdaki AG işi:** `phase/signal-source-1` promptu AG-1'de duruyor (028+029);
  `chartId` camelCase alias notu eklenecek.

---

## BÖLÜM C · YÜKLEMEYE GEREK YOK — repo ground truth

- Kod tabanı `maymun207/cwf_yaprak` — her zaman RULE-25 ile taze klonlanır, hiçbir
  özet ona üstün değildir.
- İkinci repo `mcp-honestbench` — kadran `activeMode:null`, HONESTBENCH-RUN-1'e kadar.
- Altyapı sabitleri (Vercel/Supabase/GitHub ID'leri) memory'de + instructions'da.

---

## TEK CÜMLE

**Yeni proje için minimum yükleme = Bölüm A (10 dosya) + Bölüm B (5 mintlenecek
dosya).** A'daki A2 grubu bayat olduğu için, **B mintlenmeden A tek başına yetmez.**
Devir güvenli olması için: önce bu gece B üretilir, sonra {A1, A3, A4} + {B'nin 5
dosyası} yeni projeye yüklenir — A2'nin eski sürümleri yüklenmez (B onların yerine geçer).


---

## YÜKLENECEK NİHAİ LİSTE — yeni projeye tam ve eksiksiz (15 dosya)

**Kimlik & doktrin (3):** CLAUDE-PROJECT-INSTRUCTIONS-v4 · cwf-architect-doctrine-v1_2 ·
cwf-sota-definition-v1_5
**ADR zemini (6):** ADR-001 · ADR-005 · ADR-006 · ADR-009 · ADR-010 · ADR-012
**Kavram zemini (1):** cwf-architecture-research-S82-v1
**CANLI POZİSYON — YENİ mintlenen (5):** REGISTER-BUG-BUCKET-v21 · cwf-open-items-register-v86
· cwf-master-rollout-plan-v2_1 · CWF-SESSION-GRAPH-KB-v83 · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v83

**YÜKLENMEZ:** v82/v85/v20/v2_0 ve önceki tüm eski sürümler (yenileri onların yerine geçer).
**KLON:** kod her zaman taze RULE-25 ile — `maymun207/cwf_yaprak` @ 40085d6.

Yeni projede ilk mesaj: "S82'den devam" — Architect SOTA-1+S82-6 verbatim tekrarlar,
RULE-25 koşar, `SUCCESS-ONLY-RECALL-1`'den sürer.
