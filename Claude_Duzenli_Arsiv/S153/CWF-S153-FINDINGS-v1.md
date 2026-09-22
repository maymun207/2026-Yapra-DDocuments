# CWF-S153-FINDINGS-v1

Every finding carries HOW and WHEN (owner rule 2026-09-10).

F-S153-ARMES-IS-HARDCODED-1 - MEASURED at master 4f6a919fc0fd80f496e4533bfd977f781fd24498: "armes" in 137 non-test product files (633 occurrences), 16 scripts, 5 e2e, 22 migrations, ~250 test files. Privilege sites: DEFAULT_BACKEND_ID='armes' (shared/dbConstants.ts:1691); HAND_PACKED_BACKENDS and composeArmesContext (DbKnowledgeProvider.ts:53,296); knowledge/backends/armes/toolGraph.ts:35-39 (hard entry tool + Turkish sequencing rule); buildSystemPrompt default ['armes'] (prompt/assemble.ts:87); ENTITY_ALIAS_BACKEND_ID='armes' (stageClarify.ts:150); catalog categories 12 of 13 ARMES-shaped; knowledge_search's own description steers away from "exact data". HOW: OWNER-RULING-S153-NO-ARMES-HARDCODE-1 plan G0 inventory -> G1 logic + G4 CI grep gate -> G2 knowledge to governed data -> G3 tests/fixtures. WHEN: G0 2026-09-22 10:00 TSI; G1+G4 2026-09-22 evening; G2+G3 2026-09-23 evening.

F-S153-STAMP-FLAGS-METHOD-NAME-NUMERAL-1 - stamp flagged "5" from "5 Neden Analizi". HOW: named exemption class in the numeric claim check with a planted test; scout first. WHEN: small card 2026-09-22.

F-S153-RECALLED-CLAIM-WRITTEN-AS-MEASURED-1 - Q3 answer stated "IKINCILALT barkodsuz, fire ARMES'te görünmüyor" from memory recall, not this turn's tools. HOW: recalled facts carry a recall stamp in the answer (A24 grounding path). WHEN: with the stamp small card, 2026-09-22.

F-S153-DOC-QUESTION-MODEL-CHOSE-ARMES-1 - "Dokümanlarda ara: ... personel sayısı": stage 07 offered knowledge_search (31 tools, categories employee + machine-knowledge) and the model called getEmployeesWorkedBetween 13-34 times. On 2026-08-20 the same phrasing answered from "Kaleseramik Faaliyet Raporu - 2025" (53.412.507 TL). HOW: offline replay of the 22:12:59Z turn with the offered set narrowed to the document backend (does narrowing fix it?), plus M2: does the report contain personnel counts. Then the A24 conformal-set/planner narrowing moved forward if the replay says yes. Also G1/G2 remove the ARMES privilege that tilts the choice. WHEN: replay + M2 by a lane 2026-09-22 morning; result to the owner as yes/no.

F-S153-PROSE-SAYS-ALL-WHEN-CALLS-WERE-DROPPED-1 - per-turn call cap dropped 4 calls; prose said "tüm fabrikalar". HOW: appended "M of N calls ran" notice (check the partial-read notice consumer first, 12.6). WHEN: small card 2026-09-22.

F-S153-CANNED-SPLIT-ADVICE-1 - budget-exhausted answer printed "Soruyu böl - önce duruşlar, sonra fire" for a personnel question: hard-coded advice text. HOW: derive from the question or neutral text; also falls under the ARMES-hardcode rule (ARMES vocabulary in code). WHEN: G1 wave 2026-09-22.

F-S153-TOOL-FANOUT-34-CALLS-1 - one question, 34 calls of one tool. HOW: A24 P1-B executor. WHEN: P1-B card (in AG-4's box) after PR 592.

F-S153-PR592-RULE26-TIMEOUT-1 - rule26 cancelled at 20 min on two heads of PR 592; passes ~6.5 min elsewhere; scout review said GREEN (12.13 disagreement). HOW/WHEN: section 2 of the session close.

F-S153-BRIDGE-HAS-GITHUB-READ-1 (closes the S133 bridge-no-credential finding for READS): see session close section 3. Writes stay with lanes and scouts by design.

END · CWF-S153-FINDINGS-v1
