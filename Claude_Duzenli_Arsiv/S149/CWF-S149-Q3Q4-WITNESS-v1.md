CWF-S149-Q3Q4-WITNESS-v1
P0 witness: the owner asked Soru 3 and Soru 4 verbatim in production (cwfyaprak.vercel.app, model footer "Gemini Flash"), 2026-09-21 ~04:50Z–05:00Z; the Architect read both answers from the built-in browser pane (get_page_text) at 2026-09-21T05:00Z. This is the MEASUREMENT of the current system on the two golden questions — not proof of the new design (R-12). Every line below is read from the rendered answer; the traces (Langfuse) were NOT read this turn.

## 1 · What the current system did (measured from the rendered answers)

| Step | Q3 (son 24 saat, A3, asakai) | Q4 (bugün, üretim raporu, literatür, yol haritası) |
|---|---|---|
| Clarification ask | NONE. Footer: "'KB7 glazur3 fırın alt ikincil alt hatları' → 'Kalebodur 7 Fabrikası' olarak yorumlandı (prefix eşleşme)" — stage 03 resolved only the factory. | NONE, same footer. |
| Line resolution | The MAIN LLM read getFactoryLines and picked THREE lines: Glazur3, FIRINALT, IKINCILALT (with zone ids). So the owner's phrase names three sibling lines, not a kiln→sub-line descent. | Same three lines. |
| Time | resolve_time_range → 2026-09-20T04:50:48.911Z–2026-09-21T04:50:48.911Z (24h, UTC). | resolve_time_range → 2026-09-20T21:00:00Z–2026-09-21T20:59:59Z (Europe/Istanbul CALENDAR day; production-day boundary unmeasured). |
| Tools called (footer) | resolve_time_range ×1 · getFactoryLines ×1 · getLineStopsReportForZones ×1 · getOeeValuesForZones ×1 (4). Multi-zone in ONE call (zoneIds[]) — no N×3 fan-out needed. | + getDailyManualScrapForZones ×1 (5). |
| Scrap (fire) | NOT fetched. Answer text: "mevcut araç setimde son 24 saate ait doğrudan fire miktarını çeken bir araç bulunmamaktadır." The tool EXISTS (used in Q4). | Fetched. |
| Aggregation | "Ortalama OEE ve Bileşenleri" table: render guard printed "3 satır kaynakta yok · 0 satır · Sonuç döndürülmedi" — the LLM-computed averages were REJECTED from the table — yet the prose asserts "%95.84", "%82.06", "%82.19", "%82.68", "%94.77", "%99.1". | Same for OEE ("3 satır kaynakta yok") AND for scrap ("22 satır kaynakta yok · 0 satır"), yet prose asserts "215 adet KABARCIK", "90 adet", "7 adet Fırın Kırığı", "%96.86", "%78.57", "%88.57". |
| Output format | Generic sectioned report; NOT an A3 (no background/target/root-cause/countermeasure/plan/follow-up frame). "asakai" acknowledged in prose only. | Sectioned report; prioritized list produced (Öncelik 1–4) — priority is the LLM's judgment, not a measured impact order. |
| Literature | not asked | REFUSED by scope: "Ben yalnızca Kale Seramik fabrika verilerinin analizi ve seramik üretimi konularında yardımcı olabilirim… harici literatür araştırması ve … yol haritası oluşturma yeteneklerimin dışındadır." Also refused the roadmap (a synthesis task, in-domain). web.enabled=0 anyway (carried unverified). |
| Advisory label | present: "No registered procedure was used — advisory · engineering judgment required" | present |
| Data quality (real) | IKINCILALT: all 28 stop rows have null reason/type; two Glazur3 PRESS rows null. | same |

## 2 · Findings (each with HOW and WHEN)

F-S149-LLM-AGGREGATE-LEAKS-TO-PROSE-1 — the render layer refuses unsourced rows in tables ("satır kaynakta yok") but the SAME numbers are asserted in prose; the user reads an average that no tool computed (TOTAL-45 at the user's eye). HOW: R-16 deterministic executor computes aggregates from tool bytes so the numbers exist in the source; interim, st12 grounding must treat a numeric claim absent from tool bytes as ungrounded and either drop it or mark it "model hesabı, kaynakta yok". WHEN: interim card in the S149/S150 small-card block; executor in v1_2 P1–P2.

F-S149-SCRAP-TOOL-NOT-OFFERED-Q3-1 — getDailyManualScrapForZones was used in Q4 and declared absent in Q3 for the same backend and lines. Either the offered set differed (keyword router / offered-set lock) or the model did not search. HOW: read both traces' offered set; this pair becomes a routing-exam golden case (same backend, near-identical intent, tool must be offered in both). WHEN: trace read next turn (Architect, Langfuse); golden case in P1.

F-S149-SCOPE-REFUSES-IN-DOMAIN-SYNTHESIS-1 — b1_scope refused literature AND the corrective-action roadmap (in-domain synthesis). Confirms A24 §5 / C3 class and Q4-S4-4. HOW: P3 removes the domain sentence (eval-gated segment version); R-19 web card; until then the refusal is expected and named. WHEN: P3.

F-S149-TODAY-IS-CALENDAR-DAY-1 — "bugün" resolved to the Istanbul calendar day (21:00Z–20:59Z). Whether the factory's production day differs is UNMEASURED. HOW: R-22 (production calendar as card data); measure the ARMES shift definition. WHEN: P0 addition (Architect reads ARMES shift tool or backend config).

F-S149-A3-TEMPLATE-ABSENT-1 — no A3 frame produced. HOW: R-20 output contracts as configuration. WHEN: P3.

F-S149-LINE-RESOLUTION-BY-MAIN-LLM-1 — the three lines were resolved by the main LLM from getFactoryLines output, not by stage 03 (which stopped at the factory). It worked here; determinism and trace visibility are UNMEASURED. HOW: R-21 becomes "line/zone resolution in stage 03′ against the backend's own list, deterministic, in the trace"; the descendant-walk reading in the trace analysis was the Architect's misreading of the phrase (A-REC-S149-5). WHEN: v1_2.

## 3 · Architect's own error
A-REC-S149-5 — I read "fırın alt ikincil alt hatları" as a four-level hierarchy with a descendant set and built R-21 around it. The factory's own list says FIRINALT and IKINCILALT are LINES beside Glazur3. The phrase was three names, not a path. Cure (mechanical): before writing an entity-resolution design for a named phrase, print the backend's own list for that factory (getFactoryLines) — a fifteen-second read the owner's production system performed before I did.

## 4 · What this witness settles for v1_2
- The composite chain RUNS today up to aggregation and format; the two live holes are (a) numbers the model computes and the guard cannot stop in prose, (b) the scope sentence refusing in-domain synthesis and the web. R-16 (executor) and P3 (scope) are therefore the first two v1_2 deliverables; R-21 shrinks to stage-03 line resolution; R-20/R-22/R-23 stand.
- Q3 and Q4 are golden E2E questions from today, with this answer pair as the baseline (OWNER-APPROVAL: E2E N=10, 2026-09-21).

END · CWF-S149-Q3Q4-WITNESS-v1
