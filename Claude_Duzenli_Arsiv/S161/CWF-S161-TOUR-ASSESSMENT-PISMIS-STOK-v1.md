CWF-S161-TOUR-ASSESSMENT-PISMIS-STOK-v1

Architect, S161, 2026-09-28T05:35Z. READ from the built-in browser pane (https://cwfyaprak.vercel.app, production = master 81c87d58962bc01a1e164f8189fb97928810dee9 per Vercel dpl_EmnaYgNTuSP3GrGfhBojHbRdip6K), the owner's own tour. Owner asked two things: review the exchange, and assess whether A25 fully implemented would answer this question.

## 1 · THE EXCHANGE, AS THE PAGE SHOWS IT (bytes quoted, no paraphrase where it matters)
Question (owner): `KB7 Pişmiş stokta hangi işler bulunuyor?` — which work orders / lots are sitting in KB7's fired-ware stock (the post-kiln buffer before secondary/sorting).
Answer (CWF, Gemini Flash, 11 queries): checked material import requests on FIRINALT · FIRINUST · IKINCILALT (none), IKINCILUST "ulaşım hatası"; inventory queries "başarılı bir sorgu yapılamamıştır"; then: `KB7 pişmiş stokta aktif olarak tanımlanmış başka bir "iş" bilgisi şu an için mevcut değildir.`
Footer: `No registered procedure was used` · `3 past interaction(s) recalled` · `⚠ 4 tool call(s) failed (armes) — this answer was formed on incomplete data`.

Tool trace (Ham tool çıktısı, expanded):
1. search_tools {"query":"stok"} → content: [] (isError false)
2. search_tools {"query":"inventory"} → content: [] (isError false)
3. getInventoryCatalogue {"entityTypes":[],"factoryId":"KB7"} → []
4. getInventory {"factoryId":"KB7","entityTypes":[],"state":"ACTIVE"} → []
5. getInventory {"factoryId":"KB7","entityTypes":["PRODUCT"],"state":"ACTIVE"} → []
6. getInventory {"factoryId":"KB7"} → validation failed: required 'entityTypes', 'state'
7. getFactoryLines {"factoryId":"KB7"} → 7 lines (Glazur1/2/3 · FIRINUST · FIRINALT · IKINCILUST · IKINCILALT)
8–11. getMaterialImportRequest per Secondary zone → [] ×3, one transport error

## 2 · WHAT WENT WRONG — FOUR SEPARATE SEAMS
S1 · DISCOVERY DEAD: `search_tools("inventory")` returned NOTHING while a tool literally named getInventory exists. Turkish "stok" also nothing. The tool-search index does not match a tool by its own name. Defect, not a vocabulary gap. → F-S161-SEARCH-TOOLS-EMPTY-FOR-EXISTING-TOOL-NAME-1 (measure: the index's field set — name included or descriptions only?).
S2 · VOCABULARY UNMAPPED: "pişmiş stok" is a plant term (fired-ware buffer). Nothing in CWF maps it to an ARMES inventory concept (an entity type, a state, or a zone/location). The model GUESSED enum values (entityTypes [], "PRODUCT", state "ACTIVE") and got empties. The catalogue call that should have listed the vocabulary (getInventoryCatalogue) also returned [] — UNMEASURED whether entityTypes:[] means "all" (then KB7 has no inventory catalogue in ARMES at all, and the honest answer is "ARMES holds no inventory catalogue for KB7") or "none" (then the call was a no-op). This discriminator decides whether the data EXISTS. → F-S161-PISMIS-STOK-VOCAB-UNMAPPED-1.
S3 · WRONG-TOOL DRIFT: with discovery dead and vocabulary unmapped, the model routed to getMaterialImportRequest (material import requests are not fired stock) and reported ITS emptiness as the answer. Classic A25 K-A/K-A′ shape: a vocabulary the router does not know gets zero correct routing — measured today on the fixtures (PR 630: 90 questions, hits=0).
S4 · EMPTY REPORTED AS ZERO: the footer says "incomplete data", the prose says "mevcut değildir" (does not exist). empty ≠ zero is a constitutional law of this project (§2) and the RENDER/COMPOSE layer broke it: three empty arrays + one validation error + one transport error became "there is no such work". → F-S161-EMPTY-AS-ZERO-IN-ANSWER-PROSE-1. The honest sentence was: "Pişmiş stok için hangi envanter tipini/durumunu sorgulayacağımı bilmiyorum; sorgular boş döndü ve iki çağrı başarısız oldu — bu yokluk kanıtı değil."
Also: `No registered procedure was used` — there is no procedure for "stock by work order", and the three recalled past interactions did not carry one.

## 3 · WILL A25, FULLY IMPLEMENTED, ANSWER THIS? — ASSESSMENT
Short answer: NOT BY ITSELF. A25 will make this failure MEASURABLE and will stop the FAKE answer; it will not, on its own, produce the TRUE answer.
What A25 delivers against each seam:
- S1 (discovery bug): OUTSIDE A25. It is a defect in search_tools's index; a small card (name-field match + a test that every tool is found by its own name and by its Turkish keyword arm). Cheap, independent of A25.
- S2 (vocabulary): A25 E2's contract (K33 identity, kinds over the backend registry) and the entity-layer configuration give the PLACE where "pişmiş stok → <ARMES inventory concept>" lives as DATA (backend_entity_layers / a term table), never in code (NO-ARMES-HARDCODE). E5 learning can capture it AFTER a human confirms it once (the ask-shape: "pişmiş stok ile hangi envanteri kastediyorsun: FIRIN çıkışı tampon mu, depo mu?"). But the first mapping is a DATA ENTRY that someone with plant knowledge (or an ARMES catalogue read, if S2's discriminator says the catalogue exists) must supply. A25 makes the absence a scored miss (E1 exam) and turns the guess into an ASK (three-state verdict resolved | unresolved | ambiguous — built, CALLER-ABSENT today, §12.6). Without the data entry the honest post-A25 answer is a QUESTION, not the list.
- S3 (wrong tool): A25 E1 (K-A fixtures, FirstCall-Hit@1, KeywordArm-Coverage) measures it; E5 learning repairs it over time; E3 shadow catches regressions. This is exactly the A25 target.
- S4 (empty as zero): NOT in A25's current cards. E1-a's bar (K25) scores routing, not answer honesty. Recommendation: add ONE acceptance metric to the E1 exam — "empty-vs-zero honesty": an answer formed on [] / errors must not assert absence; graded from the composed prose against the tool trace. This is a SOTA-definition matter and therefore the OWNER's to accept (SOTA-1: a criterion enters by name). If accepted, it is an E1-a v3 line, not a new card.
And the data question underneath everything: whether ARMES for KB7 HOLDS fired-ware stock by work order at all. If the catalogue is truly empty for KB7, no routing, learning or vocabulary work produces the list — the correct product behaviour is to SAY SO ("ARMES bu fabrika için envanter kataloğu tutmuyor"), which is S4 done right. This must be MEASURED first (Operator read of the ARMES catalogue for KB7 with explicit entity types, or a lane probe with the tool's documented enum), before any card is cut on S2.

## 4 · WHAT I PROPOSE (one path)
1. NOW (S162 open, no new spend): a scout order to MEASURE the two discriminators — (i) search_tools index fields (why "inventory" ≠ getInventory); (ii) getInventoryCatalogue semantics of entityTypes:[] and the real enum of entityTypes/state from the tool's own schema (installed source, not memory). Both are reads.
2. Then two small cards, both to the scout first (new subjects): CARD-SEARCH-TOOLS-NAME-MATCH (S1) and CARD-EMPTY-NOT-ZERO-IN-COMPOSE (S4: the compose stage carries the trace's empty/error counts and forbids absence claims over them; UI shows "veri yok" state distinctly).
3. S2 waits on the discriminator; if the catalogue exists, the mapping is a DATA row the owner or a plant user confirms once through the ask-shape (E2/E5), never a code literal.
4. E1-a v3 adds the honesty metric only if the owner accepts it into the SOTA definition.

## 5 · OWNER CONTRIBUTIONS (S112-YASA-1, by name)
The tour itself and the question "A25 bittiğinde bu soruya cevap verebilecek miyiz?" are the owner's design input: they exposed that A25's acceptance bar measures routing but not answer honesty (S4), which the Architect's E1 cards had not covered.

END · CWF-S161-TOUR-ASSESSMENT-PISMIS-STOK-v1
