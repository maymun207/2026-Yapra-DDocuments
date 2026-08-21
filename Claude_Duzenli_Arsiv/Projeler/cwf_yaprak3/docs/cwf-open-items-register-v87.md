# cwf-open-items-register v87 — S83 kapanışı (2026-08-07)

<!-- v86'yı geçersiz kılar. İşleyen kuyruk = REGISTER-BUG-BUCKET-v22 §BUG.5. -->

## §0 · FLOOR (S83 sonu; boot'ta RULE-25 ile yeniden türetilir)
- master (FIX-1 merge ÖNCESİ son okunan): `ce2e244` · FIX-1 dalı `2cc554b0`
  GO'lu, merge sahip teyidi bekliyor → boot'ta master muhtemelen FIX-1 merge
  commit'i. Suite dalda 479/5481 · docVersion rev 202 · migrations 67 ·
  ADR 13.
- Üretim son teyit: READY @ `ce2e244` (`dpl_7cPq8upa…`). Governed canlı:
  historyWindowN=6 v1 · retrievalTopK=3 v1 (deney 0→3 gitti-döndü) ·
  contextTurns=2 v2 · superset.gateway_rule ×3 v1 (FIX-1 metinleri v2'yi
  REPUBLISH bekliyor — S80-3).
- Actions: elle dispatch #471 YEŞİL ce2e244; push-tetik ÖLÜ (BUG-033).

## §3 · İŞLEYEN KUYRUK → bucket v22 §BUG.5 (buraya kopyalanmaz; tek kaynak)

## §4 · WAIT CONTRACT (S83 kapanış anı)
| Beklenen | Bitiren çıktı | Sensör/Expiry |
|---|---|---|
| FIX-1 merge teyidi + BUG-033 sondası | AG-2 tek satır: merge SHA + "Actions run doğdu/doğmadı" | Architect origin taraması; S84 açılış sondası |
| Republish tercihi | Sahip tek harf: (a) bu gece kendi eliyle / (b) S84 Operator | S84 açılışında sorulur; default (b) |
| BUG-032 P1/P2 | İlk gerçek başarısız tur (doğal) | Architect [MemoryWrite]/episodes nöbeti; expiry yok |
| RAG dış ekip | RAG-TEAM-NOTES-v2'ye 3 cevap | sahip yapıştırır; S80'den beri sürüyor |

## §5 · BU OTURUMDA DOĞAN YASALAR/KURALLAR
- **S83-1**: Bir aracın YOKLUĞU, tool_search ile aranmadan iddia edilemez
  (ertelenmiş araçlar görünmez; sonda önce arama).
- **S83-2**: `ctx.emit ≠ istemci SSE.` turn_done payload'ı telemetri
  satırıdır; iki-kopya konvansiyonunun ikinci kopyası otomatik istemci
  değildir. Varış noktası okunmadan "istemci alıyor" yazılamaz.
- **S83-3 · MAIN-CLONE-QUIET**: ana klon hiçbir şeridin çalışma alanı
  değildir; her yazma adlı worktree'de, merge dahi worktree'den; ana klon
  yalnız fetch aynası. (Merged worktree budaması onaylı, force'suz.)
- **ÖNCÜL #24**: "Bir reconciler log satırı onu üreten mekanizmayı kanıtlar,
  ihtiyaç duyduğun mekanizmayı değil" — [Gate] publish = yokluk-tohumlama;
  S80-3 (kod-floor değişikliği yayınlı anahtarı ETKİLEMEZ) uygulanmadan
  "publishes: ZERO" yazıldı. AG-2 satır okuyarak yakaladı.
- **BLOK FORMATI (sahip talimatı)**: şeritlere iletilecek her metin
  `>> BLOCK: <hedef> <<` … `>> BLOCK END <<` arasında; dışı yorumdur.
- Reseal yasası CANLIDA doğrulandı: iki-şerit tab'ları her iki taraftan da
  farklı çıktı — elle hash seçmek doc-drift'in yeşil diyeceği yalanı
  mühürlerdi; `npm run reseal` birleşik ağaçta tek meşru yol.
- Merge sırası dersi: taban GO ile merge arasında İLERİ kayabilir; merge
  anında yeniden okunur (S81-1 ileri-genellemesi; AG-1 yakaladı).

## §6 · SAHİP SORULARINA VERİLEN MİMARİ CEVAPLAR (kayıt)
1. Bellek "successful" sunmadı çünkü (i) sunucu render'ı göremez → çizen tur
   bile `unproven`; (ii) bellek TASARIM GEREĞİ cevap metni değil kırıntı
   taşır (asked+tools) — "85'i çiz" bilgisi 2F.1 PROCEDURE-RECALL +
   2F.2 SEMANTIC-MEMORY'nin işi (henüz inşa edilmedi, kuyrukta).
2. Kök makinesi VAR ama frame katmanında; modelin list_charts'a yazdığı
   arama ipinin üstünde DEĞİL → W-018 (gateway mekanik kök-tekrarı) doğdu.
3. Plan B (Qdrant+BM25 hibrit, A23 ailesi): keşif katmanındaki ek-kırılganlığı
   KÖKTEN bitirir (LearnCorpus 796 varlık hammadde), karar katmanındaki
   çizim-reddine DOKUNMAZ → sıra: FIX-1 → 2F.1/2F.2 → RAG hibrit.

## §7 · HOUSEKEEPING
Eski sürümler projeden kaldırılmalı: bootstrap v82/v83 · register v85/v86 ·
KB v82/v83 · bucket v19/v20/v21 · rollout v2_0 (v2_1 kalır; 2F.0c satırındaki
ölü 6→0 deneyi v2_2'de amend edilir — S37-1 gereği v2_1'e elle dokunulmaz).

<!-- END v87 -->
