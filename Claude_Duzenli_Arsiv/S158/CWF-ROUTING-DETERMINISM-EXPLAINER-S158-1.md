# CWF — Soru → Araç Seçimi: Çerçeve Tablosu ve Deterministik Yol (S158, 2026-09-26)

Kaynaklar (ölçüm/okuma): master 5e0b13c8 üzerinden GitHub API ile okunan api/cwf/_lib/routing/irFrame.ts, routing/deriveCategories.ts, semanticRouter.ts, toolCategories.ts; canlı DB domain_rules (router.* parametreleri, tool_category satırları); turn_trace_digest 2026-09-26T02:58Z (sermaye sorusu).

## 1 · Çerçeve (IR frame) nedir
Sorunun yapılandırılmış özeti: action (6 değer: QUERY_STATUS, QUERY_METRIC, QUERY_EVENTS, QUERY_MASTER, COMPARE, COMMAND), object (13 değer: LINE, ZONE, FACTORY, EQUIPMENT, ORDER, RECIPE, MATERIAL, TRANSFER, VEHICLE, EMPLOYEE, QUALITY, DOWNTIME, SYSTEM), entity_ref, metrics, metricsSurface, time, confidence (HIGH/AMBIGUOUS).
"Çerçeve tablosu" = deriveCategories.ts içindeki MATRIX: 5 satır (COMPARE hariç action) × 13 sütun (object); her hücre bir kategori listesi ya da null (geçersiz çift). Ör. QUERY_MASTER × SYSTEM = [admin].

## 2 · Kim oluşturuyor
- Çerçevenin DEĞERLERİNİ: semantic router LLM çağrısı (tek çağrı; aynı cevapta kategori seçimi "matched" + "frame"). Kod zırhı enum dışını düşürür.
- Enum listeleri ve MATRIX: kod sabitleri (K1 onaylı, IR-3 fazı). Değiştirmek = kod değişikliği.

## 3 · Dinamik mi statik mi
| Parça | Yer | Tür |
|---|---|---|
| action/object enum | irFrame.ts | statik kod |
| MATRIX action×object→kategori | deriveCategories.ts | statik kod |
| Metrik ipuçları (categoryHints) | metric_registry satırları | dinamik veri, MATRIX sonucuna eklenir |
| Kategori kataloğu (ad, anahtar kelime, araçlar) | domain_rules *.tool_category (13 satır: 12 armes + 1 MKB) | dinamik veri |
| Router parametreleri | domain_rules agent.param: router.enabled=1, frameEnabled=1, frameRouting=1 (v4 2026-08-18), maxCategories=4, contextTurns=2, timeoutMs=1500 | dinamik veri |
| Router prompt şablonu | domain_rules router.prompt default v2 (2026-07-20) | dinamik veri |
| ALWAYS_INCLUDE {getFactoryList, getFactoryLines} | toolCategories.ts:1203 | statik kod — ARMES araç adları kodda (OWNER-RULING-S153-NO-ARMES-HARDCODE-1 ihlali, madde 58/83 G2c açık) |

## 4 · Sermaye sorusu, tur tur (2026-09-26T02:58Z, ölçülmüş)
1. Stage 01-02 (deterministik): telemetri + mesaj kaydı.
2. Router LLM (olasılıksal): kategori seçimi + çerçeve: action=QUERY_MASTER, object=SYSTEM, entity_ref=[Kaleseramik A.Ş.], metrics=[], metricsSurface=[kayıtlı sermaye tavanı, çıkarılmış sermaye], time=30.09.2025, confidence=HIGH.
3. Stage 03 clarify (deterministik): "Kaleseramik A.Ş." → governed alias → KS (factory katmanı); soru sorulmadı.
4. Stage 07 araç seçimi (deterministik): frameRouting=1 ve HIGH → MATRIX[QUERY_MASTER][SYSTEM]=[admin] router'ın kategori seçiminin YERİNE geçer (basis=frame). metrics boş → ipucu yok. Anahtar kelime eşleyici bu yolda hiç çalışmaz. + ALWAYS_INCLUDE. Sonuç: 15 araç, hiçbiri MKB değil.
5. Stage 09 prompt (deterministik, DB'den): identity v1 + b1_scope v4 + diğer segmentler.
6. Stage 10 cevap modeli (olasılıksal, Gemini Flash): doküman aracı yok → 0 araç çağrısı → kapsam reddi.
7. Stage 12/14 (deterministik): güven katmanı, kayıt.

## 5 · Deterministik harita
LLM iki yerde: (a) router çağrısı — kategori + çerçeve; (b) cevap modeli — hangi sunulan aracı çağıracağı ve metin. Geri kalan her adım kod + DB satırıdır ve aynı girdiye aynı çıktıyı verir.
Kural ailesi (stage 07): çerçeve yoksa → router'ın seçimi (yoksa anahtar kelime); çerçeve var + MATRIX hücresi dolu + HIGH → hücre seçimin yerine geçer; AMBIGUOUS → birleşim; hücre null → router seçimi kalır. Sonra sticky birleşim (önceki mesajın anahtar kelimeleri) ve ALWAYS_INCLUDE.
Kırılma noktası: MATRIX yalnız MES kategorilerini tanır; MATRIX'in adlandıramadığı bir kategori (MKB) HIGH çerçevede her zaman silinir. Düzeltme kartı: CARD-FRAME-KEEPS-UNMODELED-CATEGORIES-S158-1-v1 (scout incelemesinde).
