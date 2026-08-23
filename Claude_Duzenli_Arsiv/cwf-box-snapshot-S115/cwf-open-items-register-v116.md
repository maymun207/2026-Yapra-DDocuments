# CWF — AÇIK KALEMLER REGISTER · v116 (S112 kapanışı)
<!-- 2026-08-22. v115'i DEVRALIR. ALTIN DEFTER: hiçbir kalem kapanış kaydı
     olmadan düşmedi. BÜTÜN yazıldı (A-REC-S101-7). -->

## §0 · BU BELGENİN STATÜSÜ — v115'ten değişti

Açık kalemlerin **KANONİK** evi `docs/ground/open-items.md`'dir ve **S112'de gerçekten doldu**: 15 kalem → **49** (`GI-001…015` + `PI-001…034`). v115'in *"göç yapılmadı"* uyarısı **KAPANDI** — `CLOSED@ab4ba34c`.

**Bu belge bir AYNADIR. Çelişkide REPO KAZANIR.**

⚠ **Ve S112'de bir ayrım hükme bağlandı:** kanonik defter **KALEM KÜMESİNİN** evidir — id'ler, durumlar, kapanış kapıları, manifesto. **Kalem GÖVDELERİNİN evi DEĞİLDİR.** Sözleşme `MEASURED`-only olduğu için, kanıtı yalnız bu kutuda yaşayan bir kalem orada **adlandırılabilir ve izlenebilir**, tam olarak **ifade edilemez**. Bootstrap v112 ve register v114 "kanonik ev" derken bu ayrımı yapmıyordu; ifade fazla genişti ve daraltıldı.

---

## §1 · S112'DE KAPANANLAR

| Kalem | Kapanış |
|---|---|
| `PHASE-ARCHITECT-CARD-GRAMMAR-1` (A–F) | `CLOSED@e3b25da3` — dört iniş, silahlanma commit'i #325 |
| `F-S112-CANONICAL-LEDGER-SCOPE-1` | `CLOSED@ab4ba34c` — defter 15 → 49 |
| `F-S112-ARCHOPEN-ORPHAN-LABEL-1` | `CLOSED@e3b25da3` — alan 8, `28` → `4 (measured)` |
| `PHASE-LAW-DESIGN-SOURCE-1` | `CLOSED@2e2042d7` — `S112-YASA-1` mintlendi, anayasa 15 → 16, `S102-YASA-1` blob oid **değişmedi** |
| `F-S112-LAWGATE-PRESENCE-HOLE` | `CLOSED@2e2042d7` — gerçek korpusa arıza ekilerek kanıtlandı |
| `PHASE-BUDGET-FENCE-READ-1` (item 1+2) | `CLOSED@baead83e` — mesajcı onarıldı, cevap alındı |
| `PHASE-LANE-AUTONOMY-1` (1–7) | `CLOSED@cbae7955` — izin listesi, hook, `claim.md`, auto-memory, `CLAUDE.md`, `loop.md` |
| `PHASE-MCP-CONNECT-OBSERVABILITY-1` | `CLOSED@7a81e0c6` |
| `PHASE-MCP-TRANSPORT-SWITCH-1` | `CLOSED@mcp_global_settings + mcp_settings` — ⚠ çalışma-zamanı kanıtı UNMEASURED |
| `RULE-55` enforcement yolu | `CLOSED@6ab3542a` — iki yolunu adlandırarak |
| `GRAMMAR_DOC` drift | `CLOSED@fd3c1e26` |
| `F-S112-OPERATOR-BOOT-MISSING-1` | `CLOSED@S112-OPERATOR-BOOT-v1` |
| `PHASE-LANE-SHELL-PERMISSIONS-1` | `CLOSED@8effd967` — sahibin "hiç aşamadık" dediği takılma |

**Toplam: 14 PR inişi** (4 dalga + 10 kapanış), yapısal olarak sayıldı.

---

## §2 · AÇIK — S113 sırasıyla

**⓵ BÜTÇE ÇİTİNİN İLK GERÇEK OKUMASI.**
Dört zamanlanmış koşunun dördü başarısız, `Assert the fence` **her seferinde SKIPPED**. Sebep master'da: `budgets:ViewBudget` reddi. Sahip izni verdi — **`RELAYED`, ölçülmedi.** Tek `workflow_dispatch`, üç değerli rapor. **Bağlam: 2026-08-10'da aynı bütçe eylemi üretimi otomatik öldürdü.**

**⓶ `PHASE-CONTEXT-RETRIEVAL-1` — belgesi hazır, kartı kesilmedi.**
Sahip hükmü S110: *"skip sakın."* Sekiz kapı tanımlı; kalp olan ikisi **aile tamamlama** ve **hüküm okuma anında hesaplanır**. Korpus bugün yalnız araç açıklamaları — sıfır doküman. Ön koşul: arşiv envanteri **bir şeritçe** ölçülür (Architect private repoya erişemez, ölçüldü).

**⓷ `F-S112-EVAL-CANARY-ZERO-RUNS`.**
On dört inişte on dört kez SKIPPED, her seferinde adıyla. `eval-gate atlanamaz` yasası olan bir evde kanarya bir oturum boyunca **sıfır** skor yaptı.

**⓸ `#81 BACKEND-DISCOVERY-1`** — dört eksik. Kabul çıtası sahip test seti, **orijinal cümlelerle**.

**⓹ `#29 A23 ⑤/⑥ MAKİNESİ`** — iç sayacın kalan tek anahtarı. Üçlü teşhis `stageClarify.ts:321-329`'daki **ikili** döngüde ölüyor (S112'de ölçüldü). Patlama yarıçapı 95/678.

**⓺ Küçük kalemler:** `F-S112-BUDGET-FENCE-OUT-EMPTY` · `F-S112-DOCDRIFT-SHORT-SHA-FATAL` · `F-S112-MCP-TRANSPORT-PER-USER-DRIFT-1` · `F-S112-RULE55-UNGATED-HALF` · `F-S112-RULE42-PHRASE-MISMATCH` · `F-S112-CENSUS-STALE` · `F-S111-GROUND-MD-UNGATED` · `F-S111-GROUND-GATE-IN-DEPLOY-BUILD` · `F-S111-SHARED-CLONE-IDENTITY-LEAK` · `F-S111-RELAY-CONSUMED-NOT-WRITTEN` · `F-S111-BACKEND-RETIRED-ENABLED` · `readAncestry` mükerrerliği · `RULE-54` migrasyon borcu · üç öksüz denetim defteri · `gateway_artifact_observations` · `MEMORY.md` sıkıştırma (**münhasır oturum ister**) · `PI-013` (S112'de **kanıt kazandı**) · `F-BW01` rule26 flake

---

## §3 · UFUK — düşmez

- **`#82b` Design-RAG** — sahip hükmü S105: *"ASLA UNUTMA."* ⓶ ile aynı organa binecek
- **⑦ Yol B vektör tüketicisi** — `vector.toolRetrievalMode=0`, kod yazıldı rung kapalı
- **`A23 v1_4` mint** — Architect borcu
- **Qdrant admin yüzeyi** — sahip ertelemesi
- **G3 doğum kanıtı** — ARMES toparlanması ve Hülya'nın üç soruluk gözlemi
- **Sessiz fallback → gürültülü hata** — **sahip kararı**, üretim yarıçapı gerçek
- **Merge queue / org taşıma** — **sahip kararı**. S112 ölçülmüş kanıt üretti: `strict` altında altı iniş **beş** güncelleme-ve-yeniden-koşma döngüsü ürettti
- **`GI-001` hükmü** — private arşiv deposu açıldı (`2026-Yapra-DDocuments`); engel *"public"*tu ve kalktı

---

## §4 · SOTA KAPISI — İKİ SKORBORD

**(A) İç 7-anahtar sayacı: 6/7.** Kapalı `#2·#10·#16·#18·#23·#25`, açık **`#29 A23`**.
**(B) Kabul sözleşmesi: 0/16.** `cwf-sota-definition-v1_5` §10 — on altı dış kriterin on altısı ÖLÇÜLMEDİ, `mcp-honestbench` NOT BUILT.

**BAĞLAYICI:** SOTA-1 kabul kriterini **(B)**'ye bağlar. **(A)'yı 7/7 yapmak SOTA'yı KANITLAMAZ.** Bir oturum (A)'yı anıp (B)'yi anmadan kapanırsa **eksik kapanmıştır.**

<!-- END cwf-open-items-register-v116 -->
