# CWF — SOTA YOLCULUĞU · GÜNCEL TAM TABLO · S106 · v2
<!-- cwf-sota-full-table-S106-v2 · 2026-08-18. v1'i GEÇERSİZ KILAR.
     v2 FARKI: (a) #75 master'a indi (974e24a5, rev 278) ve deploy READY;
     (b) router.frameRouting v4 published=1 — Clarify CANLI, üretim logundan
     ölçüldü; (c) §F ANLAMA KATMANI oda-oda durumu eklendi (sahip talebi);
     (d) iki yeni bulgu. TÜRETİLMİŞ GÖRÜNÜM — bağlayıcı: register v108 +
     A23-GAP-RECON-S103 + KARAR-A23-SEQ-1 + canlı okumalar. BÜTÜN yazıldı. -->

## Yolculuğun haritası, tek satırda
Bugün buradayız → **KAPI 6/7** → (#75 canlı kanıtı → parite tekrarı →
**A23 v1_4 mint** → adım-1 taban ölçümü) → **#29 A23** → **7/7 = yaprak_gate**
→ (dalga 9.5) → (dalga 10: ilk skor turu) → **cinekop_gate**

## A · YEDİ ANAHTAR
| 🔑 | Anahtar | Durum |
|---|---|---|
| #2 · #10 · #16 · #18 · #23 · #25 | öğrenme fotoğrafı · araç sayımı · sıfır-kod mount · A2A · Path-B leksikal · bilgi grafiği | ✅ S93 · S96 · S98 · S99 · S100 · S103 |
| **#29** | **Anlama katmanı (A23)** | ⬜ Dalga 9 — **ama zemin bugün oynadı: ② ve ⑤/⑥ karanlıktan çıktı** (§F) |

## B · S106'DA KAPANANLAR / OLANLAR (hepsi ölçüldü)
| İş | Kanıt |
|---|---|
| **#66 → MERGED-INTO #75** | Öncelik kuyruğu S105'te inmişti (`3820e940`, 15 test); defterdeki "eksik" iddiası yanlıştı |
| **#75 VECTOR-CONSUMER-1 master'da** | `974e24a5`, iki ebeveyn, ağaç eşitliği `f7885210` bağımsız hesaplandı, mesaj bayt-aynı, docVersion **rev 278**, Vercel production **READY** |
| **VALF: `router.frameRouting` = 1** | **v4 PUBLISHED**, eval-gate 3/3 (SCHEMA·REFERENTIAL·BEHAVIORAL), öncül v3 atomik arşivli. Sahip yayınladı, Architect canlı DB'den doğruladı |
| **CLARIFY CANLI — ilk kez ölçüldü** | Üretim logu, tur `98530e5d`: `[Frame] action=QUERY_MASTER object=EMPLOYEE conf=HIGH` · `[EntityResolve] resolved=[Granit:fuzzy@factory] unresolved=[sırlama 3-4-5]` · `[Clarify] layerStatus=resolved refs=2 reads=ok` · `[Ask] wouldHaveAsked=1 valve=0` |
| **Vercel anahtar borcu (S103'ten)** | 3 env değişkeni Production+Preview, merge deploy'undan önce |
| **Tasarım nezareti 8/8** | Eksik 4 belge kutuya indi, md5 = INDEX pini |
| Vektör env/config zinciri | Kâğıt üstünde uçtan uca doğrulandı (published satırlar · referans bildirimleri · URL doğrulayıcı) |

## C · S106 BULGULARI (üçü de Architect'in eli)
- **`F-S106-VECTOR-OUTCOME-SILENT`** — tüketicinin `off` ve `unavailable`
  çıkışları span AÇMIYOR, log BASMIYOR. "Kapalıydı" · "motor yok" · "encoder
  yok" · "koştu boş döndü" dışarıdan AYNI sessizlik. `empty ≠ zero` ihlali,
  şeridin kendi okuyucusunun içinde. Onarım: FIX-1 kartı AG-3'te (⏳).
- **`F-S106-LANE-PERMISSION-SCOPE-INCOMPLETE`** — GO kartı bir yol emretti,
  şeridin o yolu koşma yetkisi ölçülmemişti (merge/push izni yoktu). Boot
  şablonuna dört git izni birden yazılacak (S100-4 genişletmesi).
- **`F-S106-CONSTITUTION-MIRROR-STALE`** — kutudaki ayna 6 kayıt, repo 15.
- **Ölçüm aleti hatası (kendi kaydım):** span'i `turn_trace_digest`'te aradım;
  o defter aşama-kapsamlı span tutuyor, Clarify'ın kendi span'leri de orada
  yok. Yanlış aletin boş dönmesi yokluk kanıtı değildir.
- **`rule26` (F-BW01)** — `974e24a5` kanaryasında ASILI kaldı (22dk+).
  `build` ✅ + `eval-canary` ✅. Hüküm: **iptal, verdikt ÖLÇÜLMEMİŞ**
  (yeşil DEĞİL), bir sonraki master push'unda kapanır. Kapı artık
  "kronik flake nöbeti"nden çıkıp **onarılacak kalem**.

## D · AÇIK YÜRÜYÜŞ — **20 kalem**
| Dalga | Kalem | Durum |
|---|---|---|
| **UÇUŞTA** | **#75 FIX-1** (tüketici hükmü sesli olsun) | 🔄 AG-3 |
| 8.6 | zehirli-satır okuma-muhafızı · **#65** · R4-FIX-3 · **#74** · LAW-LEDGER-4 · **#64** | kartlar Architect'te |
| 8.7 | **#69 BATARYAN** · #70 · admin-üçlüsü · SEED-PROBATION · S63-1 canlı okumalar | sıralı |
| **9** | **A23 v1_4 mint (Architect borcu, W1 kilidi)** → **adım-1 taban ölçümü** → **#29 A23 🔑** · #81 · #71 · #17 · #48 · #59 | anahtar dalgası → 7/7 |
| 9.5 | #33 · #72 RAG · #73 WEB-VALVE · #37 · **#82b (PARK)** | kapı-sonrası |
| 10 | #30 · #31 · #32 | → cinekop_gate |
| tetikli | #68 Qdrant sahip-yüzü · RELAY-BUS-2 | — |

## E · NÖBET
⏰ **Langfuse bütçe çiti ~20 AĞUSTOS — 2 GÜN.** Kapanınca ~10 gün gözlem
körlüğü. Bugünün önceliği: vektör hükmü + parite tekrarını çitten ÖNCE almak ·
`rule26` onarımı · zehirli satır · F180 enjeksiyon (A23 bandı) · ARDIC ×2.

---

# §F · ANLAMA KATMANI (A23) — ODA ODA, BUGÜN
<!-- Taban: A23-GAP-RECON-S103 (rev 272'de ölçüldü) + bugünün canlı logları. -->

## F.1 · Hedef mimarinin dokuz odası
| Oda | Hedef | Bugün | Bugün ne değişti |
|---|---|---|---|
| **② Normalizer / IR Router** | niyet+nesne+varlık+metrik çıkar | **VAR ve BUGÜN CANLIYA GEÇTİ** | `frameRouting=1` → `[Frame]` üretimde basıyor. Eksik: güven **frame seviyesinde** ikili (HIGH/AMBIGUOUS); hedef **her slota** güven ister |
| **③ Mention Typer** | "4-12 vardiyası" varlık DEĞİL, zaman ifadesidir — türü ayır | **YOK (0 dosya)** | Değişmedi. Bugünkü turda zaman ayrı yakalandı (`time.surface`) ama `sırlama 3-4-5` hâlâ varlık sanılıp çözülemedi — F175 vakasının aynısı |
| **④ Resolve** | iki kanal + skor + RRF füzyonu | **TEK KANAL** (exact→prefix→fuzzy DL≤2) | Kanal sayısı değişmedi. **#75 bir ÜÇÜNCÜ ŞEY ekledi: vektör ÖNERİ katmanı** — skor kanalı değil, yalnız çözülemeyen yüzeye "bunu mu demek istedin" adayı. Polarite korundu: hüküm çeviremez |
| **⑤ Teşhis + ⑥ Yürütme kararı** | üçlü teşhis LINK/NIL/AMBIGUOUS + karar tablosu | **EMBRİYON, ve BUGÜN İLK KEZ CANLI ÖLÇÜLDÜ** | `[Ask] decision=ask unresolved=1 valve=0 wouldHaveAsked=1` — gölge kanıt üretimde doğdu. Eksik: üçlü teşhis birinci sınıf değil (ambiguous→unresolved ÇÖKÜYOR), NIL dalı, kapsam kapısı, karar tablosu, atıf beyanı |
| **⑦ Araç getirimi** | Yol A + Yol B | Yol A canlı; **Yol B motoru hazır** (Qdrant+bge-m3, dense+sparse+RRF) | #75 ilk tüketiciyi taktı; hükmü ölçülmeyi bekliyor |
| **⑧/⑨ Cevap + Atıf** | "Granit olarak yorumladım" beyanı + güven çürümesi | kısmen; güven-çürümesi YOK | Bugün fuzzy düzeltme **oldu** (`Ganit`→`Granit`) ama kullanıcıya **beyan edilmedi** — atıf açığı canlıda görüldü |
| **turn_context (GWT)** | tur boyu paylaşılan bağlam | **YOK (0 dosya)** | — |
| **Kapsama grafı §6** | in_scope / roots / ancestors | **arayüzün ~%60'ı var** (GraphKbReader) | — |
| **τ/β · çapraz-tur taşıyıcı · L5 miss-ledger · sinyal tablosu** | dördü de | **DÖRDÜ DE YOK** | τ/β'nın yokluğu A-7 gereği **bugün DOĞRU durum** |

## F.2 · Build order (§9) — hangi adımdayız
| Adım | İş | Durum |
|---|---|---|
| **0** | flush cevaptan önce (awaited) | ÖDENMİŞ görünüyor (`runTurn.ts:318`); faz açılışında ölçümle teyit |
| **1** | **ÖLÇ: Recall@k taban çizgisi** | ⛔ **KOŞULMADI — ve bu GİRİŞ KAPISI, atlanamaz.** F174 set genişliği: repoda sıfır iz. **Bugünün kazancı tam burada: dün taban ölçümü KARANLIK bir sistemi ölçecekti; bugün ② ve ⑤/⑥ canlı, yani taban artık ANLAMLI ölçülebilir** |
| 2 | turn_context | sıfırdan |
| 3 | ⑤/⑥ makinesi + taşıyıcı (τ/β **deklare**, kalibre DEĞİL) | embriyonun üstüne |
| 4 | ③ Mention Typer + BM25/RRF kanal-2 | sıfırdan |
| 5 | L5 miss-ledger | sıfırdan |
| 6 | kelime haritası rol değişimi | zemin hazır ✓ |
| 7 | soru bütçesi b + AUROC | sıfırdan |

## F.3 · Kapıdaki tek engel: W1
`KARAR-A23-SEQ-1 §4` bağlayıcı: **#29'un İLK faz kartı, "A23 v1_4 kutuda ve §9
KARAR'ın sırasını taşıyor" ön koşulunu taşımak ZORUNDA; amendment yoksa kart
KESİLEMEZ.** v1_4 mint'i **Architect borcu** ve S106'ya taşındı. İçeriği:
(a) §9 tablosu KARAR sırasıyla yeniden yazılır — *makine önce, kanal-2
kalibrasyondan önce*; (b) A-7 çapraz-atfı; (c) kardeş atfı düzeltmesi
(turn-sequence **v1_1 VAR ve kilitli** — S105'te ölçüldü, KARAR'ın "hiç mint
edilmedi" hükmü YANLIŞTI); (d) changelog.

## F.4 · Tek cümlelik dürüst hüküm
**Anlama katmanı inşa edilmedi — ama bugün ilk kez NEFES ALDI.** Çerçeve
çıkarma ve soru-kararı organları karanlıktan çıkıp üretimde ölçülür oldu;
sıradaki iş sıfırdan inşa değil, **v1_4 mint'i + taban ölçümü**, ve o iki
adım #29'un kartını kesilebilir kılıyor.

<!-- END · cwf-sota-full-table-S106-v2 -->
