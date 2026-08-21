# Proje bilgisi temizleme stratejisi

**Sohbet ID (UUID):** `f96854df-f402-4ed4-b984-203b83a0ad6f`

**Oluşturulma Tarihi:** 2026-07-23T11:54:35.604645Z

**Güncellenme Tarihi:** 2026-07-24T04:07:17.874217Z

**Özet:** **Conversation overview**

The person is working on a large-scale production agentic AI platform called CWF (Chat With Factory) / EAIP (Enterprise Agentic Intelligence Platform), built on a Supabase + Vercel + MCP architecture with two live backends (ARMES and Superset). The project knowledge folder had grown to approximately 550 files / 6.9 MB, triggering a "Project knowledge exceeds maximum" warning in Claude's UI, and the person asked for help resolving this — either by generating a deletion list based on three criteria (outdated/irrelevant to current architecture, closed open items, noisy/non-current documents) or by finding a cleverer alternative approach.

Claude diagnosed that the real problem was the project folder functioning as an archive rather than a working set, and that deleting 520+ files individually through the UI would be costly manual work — exactly the kind of angarya (drudgery) the project's PLATINUM RULE prohibits. The recommended approach was to open a new project ("CWF / EAIP — Live") and load only a curated keep-list of ~28 files, leaving the old project untouched as a read-only archive. Claude was honest that cross-project linking is not possible and that the new project would start with empty memory, but explained this is mitigated by the project's existing KB/register/bootstrap triplet designed for exactly this kind of re-initialization. A complete KEEP list (27 existing files across five categories: constitutional files, governing ADRs, permanent deliverables, live architecture visuals, open design notes, and one in-flight phase prompt) and a mechanical deletion rule (everything outside the keep list) were provided.

The person then asked Claude to fulfill a previously stated intention to mint `CLAUDE-PROJECT-INSTRUCTIONS-v3.md`, which was identified as missing and stale relative to the v2 file dated 2026-07-04. Claude read the current bootstrap (v60), session-graph KB (v60), open-items register (v62), and master plan (v5_2) to ground the new file accurately, then authored and delivered `CLAUDE-PROJECT-INSTRUCTIONS-v3.md`. Key changes from v2 included: a new §0 formalizing the working-set rule (canonizing the cleanup decision into the project constitution); a fully updated §2 with the verified floor hash `f551bc068a10714b7d43e35e614cd32f9e060a48` (rev 141, 350 test files, 56 migrations), the correct v5_2 release track (B1/B2 shipped, LOG-TRUTH-1 in flight, B3 Memory next), and removal of all stale state (F-obs3, ARMES 401, old Superset activation prescription); expanded §3 covering the four tool-information sources, IR layer, ADR-008 three-system observability split, and `turn_trace_digest`; restructured §4 separating constitutional laws (PLATINUM, GOLDEN LEDGER, FULL-TRACE MANDATE, TOTAL-45, S61-2 NO DEBT LEFT BEHIND) from verification and delivery discipline rules by name; and §6 aligned to register v62 open items (F169, F172, F173, F171-B). The TOTAL-45 law was applied to the hash itself, which is explicitly marked as a claim requiring fresh verification at session start.

---

## 👤 Kullanıcı (2026-07-23T11:54:37.701316Z)

simdi sen bana uyari veriyorsun, "Project knowledge exceeds maximum. Remove files to continue." burada files dan silinecek dosyalarin listesini olustururmusun bunu su kriter ile yap, 1) outdated hic bri sekilde bu gunki mimari ile alakasi yok, 2) ara da cikartilan KB veya open items, zaten kapatilmis ve guncel degil, 3) aradaki noisy dokumanalar projenin gunceli ile alakasi yok.... Yada baska bir oneri olabilir yeni bir proje baslat sadece current bilgileri o yeni projeye ekle gibi belkide yeni proje baslatik eski projeyi de yeni projeye linkleyebiliriz bilmiyorum bu mumkun mu kisacasi clever bir yol dusunursen onu da paylas silmek bize zaman kaybettirecek tma da su kritik donemecte...

## 🤖 Claude (2026-07-23T11:56:54.961308Z)


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```

## Teşhis önce: gizli tuzak burada değil, silmede

550 dosya / 6.9 MB birikmiş. Ama asıl mesele **hangi dosyanın gideceği değil, project knowledge klasörünün yanlış rolü üstlenmiş olması**: o klasör bir *arşiv* haline geldi, oysa olması gereken şey bir *working set* (çalışma seti). GOLDEN LEDGER zaten içerik kaybını register v62 içinde isim-isim garanti ediyor — yani eski register/KB/phase-prompt dosyalarını tutmak sana **hiçbir ek bilgi vermiyor**, sadece pencereyi dolduruyor.

İkinci ve daha kritik tuzak: **550'den ~520 dosyayı UI'dan tek tek silmek saatler alır.** Bu, tam da PLATINUM'un yasakladığı türden angarya. Yani "silme listesi" istediğin şey, doğru cevabın kendisi değil.

---

## Tavsiye (tek yol, menü değil): ARŞİV-PROJE + TEMİZ PROJE

**Eski projeye hiç dokunma. Sil-me. O, salt-okunur arşiv olarak kalsın.**
Yeni bir proje aç: **"CWF / EAIP — Live"**. İçine sadece aşağıdaki ~28 dosyayı yükle. Bundan sonra iş orada yürür.

Neden bu, tek tek silmekten iyi:
- Silme emeği **sıfır**. Yükleme emeği ~28 dosya (yeniden indirip yüklemen gerekir, o kadar).
- Bilgi kaybı **sıfır** — eski proje olduğu gibi duruyor; geçmiş sohbetler de o projenin içinde aranabilir kalıyor.
- Working set küçük kalınca her oturumda bootstrap daha keskin olur.

**Dürüst olmam gereken tek maliyet:** Projeler arasında **link kurulamıyor** ve **her projenin hafızası ayrıdır**. Yeni proje **boş hafıza** ile başlar. Bu, S37-1/S43-3/PLATINUM/GOLDEN LEDGER/TOTAL-45 gibi yasaların hafıza katmanındaki kopyasını kaybetmek demek — ama **kaybolmuyor**, çünkü bu proje zaten baştan beri "hafıza değil, ledger" prensibiyle kuruldu: KB-v60 + register-v62 + bootstrap-v60 üçlüsü tam da bu yeniden-kurulum için var. Yeni projede ilk oturumda hafızayı ben `memory_user_edits` ile tohumlarım — bunu senin yapmana gerek yok.

Eğer bu maliyeti almak istemiyorsan alternatif: aynı listeyi **silme listesi** olarak kullan (aşağıdaki KEEP listesi dışındaki her şey gider). Karar senin; ama S61 dönemecinde ben **arşiv-proje** derim.

---

## KEEP LİSTESİ (yeni projeye taşınacaklar / eski projede kalacaklar)

**Anayasa & oturum zemini (4)**
- `CLAUDE-PROJECT-INSTRUCTIONS-v3.md` ← **henüz yok, mintlemem lazım** (v2 rev-2 · 2026-07-04 tarihli, F-obs3'ü "in flight" sanıyor, ARMES 401 diyor — ~57 oturum bayat, taşınmamalı)
- `CWF-SESSION-GRAPH-KB-v60.md`
- `cwf-open-items-register-v62.md`
- `CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v60.md`

**Hâlâ hüküm süren ADR'ler (2)**
- `ADR-001-backend-trust-and-provenance-v2.md`
- `ADR-006-agent-operating-modes-v1.md`

**Kalıcı deliverable / referans (5)**
- `cwf-governance-replay-explained-v1.md`
- `cwf-master-plan-v5_2.md`
- `cwf-board-walk-checklist-v1.md`
- `cwf-synthetic-question-set-v1.md`
- `cwf-synthetic-question-set-v2-additions-v1.md`

**Canlı mimari görseller (6)**
- `cwf-architecture-map-v6.html`
- `cwf-grand-sequence-flow-v1_2.html`
- `cwf-ir-pathb-hybrid-logic-v1_3.html`
- `cwf-ir-sequence-logic-v1.html`
- `cwf-runtime-topology-v2.html`
- `cwf-agent-control-plane-blueprint-v2_1.html`

**Açık iş taşıyan design note'lar (9)**
- `cwf-ir-architecture-roadmap-v1_2.md`
- `cwf-ir-taxonomy-design-v3.md`
- `cwf-sota-understanding-layer-v1.md`
- `cwf-sota-review-trust-and-memory-v1.md`
- `cwf-sota-stage-sweep-part1-v1.md` / `part2-v1.md` / `part3-v1.md`
- `cwf-synthetic-traffic-design-v1_3.md`
- `cwf-stages-v1-review-findings-v5.md`

**Uçuşta olan tek phase prompt (1)**
- `claude-code-PHASE-LOG-TRUTH-1-v1.md`

**Toplam: 27 mevcut + 1 yeni = 28.**

---

## Silinecekler — mekanik kural (dosya adı saymana gerek yok)

Yukarıdaki 27 dışında **her şey**. Kuralın özeti, senin üç kriterinle birebir örtüşüyor:

1. **Sürüm ailesinin en yenisi hariç hepsi** → register v1–v61, KB v2–v59, bootstrap v2–v59, architecture-map (v4/v5/isimsiz), blueprint v1/v2, runtime-topology v1, ir-pathb v1_2, grand-sequence v1, master-plan v1–v5, stages-findings v1–v4, ir-taxonomy v1/v2, decision-surface v2, notebooklm v2/v3, ADR-001-v1.
2. **Tüketilmiş phase/fix/hotfix/DOC-FLIP prompt'ları** → `claude-code-*` ailesinin tamamı (LOG-TRUTH-1 hariç). Bunların çıktısı **git history + KB**'de; prompt'un kendisi bir daha kullanılmaz.
3. **Tüketilmiş operator prompt'ları ve publish job'ları** → `cwf-operator-*` (hepsi), `cwf-publish-job-*.json` (hepsi), `gate0-ui-batch-1-REBASE-instruction.md`.
4. **Shipped design note'lar** → kodu merge edilmiş her design/IA/mockup notu (`cwf-*-design-v*`, `cwf-*-ia-design-*`, `cwf-wave2-*`, `cwf-obs-*-design-*`, `cwf-viz-*`, `cwf-l1..l5-*`, `cwf-e0/e1/e3`, `cwf-*-findings-v1..v4`, segment-edit dosyaları).
5. **P3-öncesi fosiller** → `claude-code-SEED/PHASE-0/FOUNDATION-part1,2/VIZ-RESTORE`, `CWF-SERVICE-ARCHITECTURE-AND-BUILD-PLAN.md`, `cwf-architecture-map.html`, eski `cwf-request-lifecycle-v1/v2`, `cwf-llm-control-surface-v1`, `cwf-governance-model-v1/v2`, `cwf-oa10-*`, `cwf-aws-langfuse-bootstrap-walkthrough-v1`, `cwf-oee-parity-test-protocol-v1`, `cwf-ag-native-operator-lane-v1`, `cwf-mp-v4-execution-runbook-v1/v1_2`, `cwf-control-plane-activation-map-v1`, `cwf-sota-architecture-review-v1`, `cwf-user-management-surface-spec-v1`, `cwf-secret-by-reference-*`, `cwf-decision-surface-inventory-*`, `cwf-partA-*`, `cwf-single-request-*`, `cwf-phase-A*-design-*`, `cwf-real-architecture-reference-for-notebooklm-v2`, `cwf-sr1-*` (W3b hariç kapandı), `cwf-stages-dashboard-mockup-v1`.

> `cwf-stages-dashboard-mockup-v2.html` (64 KB, en büyük dosya): Stages v1 sözleşmesiydi, v1 + Wave-2 shipped. **Silinebilir** — ama board-walk yeniden yürüyüşünde referans istersen tut. Benim kararım: sil.

---

## YOUR ACTION ITEMS

- **Karar ver (tek gerçek karar):** (A) yeni "CWF / EAIP — Live" projesi açıp 28 dosyayı taşımak *[tavsiyem]*, yoksa (B) mevcut projede ~520 dosyayı elle silmek.
- **(A) seçersen:** yeni projeyi aç ve yukarıdaki 27 dosyayı yükle; 28.'yi (`CLAUDE-PROJECT-INSTRUCTIONS-v3`) ben üreteceğim, sen sadece yükleyeceksin.
- Başka manuel adım yok — hafıza tohumlaması, bootstrap uyarlaması ve register/KB devri bana ait.

Sıradaki somut artefakt bende: **onay verir vermez `CLAUDE-PROJECT-INSTRUCTIONS-v3.md`'yi mintliyorum** — S61 zemini (master `f551bc0` · rev 141 · 350 dosya · 56 migration), PLATINUM / GOLDEN LEDGER / FULL-TRACE MANDATE / TOTAL-45 / S54-2 / S43-3 yasaları, üç şerit, ve v62'nin açık kalemleri map irtifasında. Top sende.

## 👤 Kullanıcı (2026-07-24T04:04:55.977804Z)

sunu soykemistin "`CLAUDE-PROJECT-INSTRUCTIONS-v3.md` ← henüz yok, mintlemem lazım" bunu yparmisin

## 🤖 Claude (2026-07-24T04:07:17.874217Z)


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```

Onaylandı — mintliyorum. Önce zemini doğruladım (bootstrap v60 · KB v60 · register v62 · master plan v5_2 okundu), sonra map irtifasında yazdım.
```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```

**v2'den v3'e ne değişti (özet):**

- **§0 yeni:** okuma sırası + *working-set kuralı* — project knowledge arşiv değildir. Bu, az önceki temizlik kararını anayasaya yazıyor.
- **§2 tamamen yenilendi:** floor `f551bc0` · rev 141 · 350 dosya / ~3711 test · 56 migration; v5_2 yayın hattı (GATE-0 ✓ → B1 ✓ → B2 ✓ → LOG-TRUTH-1 uçuşta → B3 Memory → … → B7 → Path B). v2'nin "F-obs3 in flight / ARMES 401 kırmızı / Superset seed bekliyor" tablosu tamamen ölüydü.
- **§3 spine'a eklenenler:** IR katmanı (frame→semantic→keyword), **dört tool-bilgi kaynağı**, `backend_tools` mirror, ADR-008 üç-sistem gözlemlenebilirlik ayrımı, `turn_trace_digest`.
- **§4 yeniden yapılandırıldı:** anayasal yasalar (PLATINUM · GOLDEN LEDGER · FULL-TRACE · TOTAL-45 · NO DEBT LEFT BEHIND) ile doğrulama/teslim disiplinleri ayrıldı; S37-1/2, S43-2/3/4, S47-1, S54-2/3/4, S55-1/2, S61-1/2/3 isimle girdi; partial≠complete ve ABSENCE-ONLY LAW eklendi.
- **§6 açık kalemler** v62 §5 ile hizalandı (F169/F172/F173/F171-B + taşınanlar).

**TOTAL-45 notu:** `f551bc0` hash'ini metinde açıkça *"2026-07-23 itibarıyla bir İDDİA"* diye işaretledim ve her oturumun taze klon + `git rev-parse` ile başlamasını şart koştum — LOG-TRUTH-1 merge olmuşsa map yalan söylemesin.

**Ayrıca:** Superset'in eski aktivasyon reçetesi v2 §6'da hâlâ duruyordu ve bootstrap v60 onu "STALE" diye uyarmak zorunda kalıyordu. v3'te reçete kökten kaldırıldı ve "diriltme" yasağı yazıldı — yani bootstrap v61'de o uyarı satırına artık gerek kalmayacak.

## YOUR ACTION ITEMS
- `CLAUDE-PROJECT-INSTRUCTIONS-v3.md`'yi indir; yeni "CWF / EAIP — Live" projesini açıyorsan oraya, açmıyorsan mevcut projeye yükle (v2'yi sil ya da bırak — v3 açıkça supersede ediyor).
- Karar hâlâ sende: **arşiv-proje mi, yerinde budama mı.** Hangisini seçersen keep-listesi aynı; tek fark emek.

Sıradaki iş bende ve LOG-TRUTH-1 uçuşta: AG raporu gelir gelmez FAST-GATE + kuyruk çıpalı GO paketi, ardından F169 için **prod `[Obs]` tick'lerini ben okurum**. Rapor sende beklerken boş durmayayım diye alternatif olarak F172'nin üç aday sorusunu (reasonSource semantiği · `stopType` null · `KB7_StopAlternative`) canlı loglardan kendim daraltıp sana tek tıklık bir v2 overlay taslağı çıkarabilirim — söyle, başlayayım.

