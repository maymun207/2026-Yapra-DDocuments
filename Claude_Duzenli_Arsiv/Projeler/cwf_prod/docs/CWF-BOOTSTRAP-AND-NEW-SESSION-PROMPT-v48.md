# CWF — Bootstrap & New-Session Prompt · v48

<!-- CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v48 · rev 48 · 2026-07-17 · Supersedes v47.
     Open S50 with this. Ledger: register v51 (carry-diff inside). Story: KB v48. -->

## 0 · CONSTITUTION
PLATINUM (BREACH-3 on record; ZERO breaches in S49) · GOLDEN LEDGER · FAST-GATE
(S43-2) · S43-3 · S43-4 (fence live-validated S49: identity refusal fired in
production before any spend) · S44-1-as-amended · S45-1/2 · S46-1/2/3 · S47-1
(absorbed a real relay-crossing in S49, zero damage) · **S49-1 NEW**: expectation
lines AND query lines in relays/EXEC prompts are literals an agent will act on —
verify from code/schema before authoring, never guess (two S49 instances: plan
CREATE/UPDATE vocabulary = findOwnDraft draft-reuse; router_proposals column
names). · 🧊 **GOLDEN FREEZE unchanged & absolute** (register v51 §2).

## 1 · FIRST COMMANDS (seconds, no suite)
```bash
cd /tmp && rm -rf cwf_yaprak && git clone -q https://github.com/maymun207/cwf_yaprak.git
cd cwf_yaprak && git rev-parse origin/master   # badge at close: b563046 (Merge SR1-W3a)
python3 -c "import json; print(json.load(open('public/architecture/manifest.json'))['docVersion'])"  # ≥ rev 107
ls supabase/migrations | tail -1   # …router_proposals (LIVE-VERIFIED since 06:55:46Z Jul 17)
```
2714 tests / 275 files unsharded — CI is the arbiter; never full-suite locally as
proof. Remote heads = exactly master.

## 2 · WAKE-UP SEQUENCE
1. **F126 check** (first log read, any time after 05:00Z UTC): Vercel logs, query
   `RouteProposals`, narrow since. Expected: `[RouteProposals] daily pending=N …`
   with N≥1 (the `alarms` machine row is pending). The line emits ALWAYS —
   **a silent 05:00Z is an incident, not a success.** Seals F126.
2. **W3c observation accrual**: opportunistic reads for `[Route] path=semantic`
   rate, new proposals, floor_reason occurrences. Material feeds the learned-map
   **retirement DECISION** (owner's call — decision, not execution). Stopword-write
   evidence already on record (register v51 §0).
3. **WAVE2-IA-2 → re-walk** (M1 remainder, unchanged scope) — the main build lane.
4. Small phases where surfaces are touched: **F129** (router-ab panel affordance +
   governed cap) · **F119** · **F120** · **F118**. F131 (answer-language follows
   question-language) folds into the Wave-2 content phase.

## 3 · THINGS S50'S ARCHITECT GETS WRONG WITHOUT THIS
1. **THE ROUTER IS LIVE** — no longer dark. `router.enabled` = rule 236ad3c7 **v2
   value=1 published** (v1 value=0 archived). The `[Params]` log line does NOT
   include router.enabled — behavior is the proof (`path=semantic` cannot run on
   the floor 0).
2. **router_proposals is LIVE-VERIFIED and NON-EMPTY** (1 pending machine row:
   `alarms`→machine, 06:55:46Z). Its only exit is the Araç Eşleme panel's gated
   accept → publish seam (S41-2 structural). Never author a side-door.
3. **Actual column names** (S49-1 second instance): `suggested_category`, `count`,
   `first_seen`, `last_seen` — not category/seen_count/first_seen_at/last_seen_at.
4. **Learned map still WRITES stopwords on semantic turns** ("you","bring",…) —
   F123's guard filters at LOAD only. This is retirement-decision evidence, NOT a
   bug to hotfix. Do not patch the write side unilaterally.
5. **W3a evidence reading discipline**: recorded-successful-turn specimens make
   coverage a NON-REGRESSION metric by construction. Quote it as "parity + 0/72
   floor = safe," never as "no router effect." Wilson overlap at N=24/72 =
   underpowered, not null.
6. **Plan vocabulary** (S49-1 first instance): publishGovernedContent `plan`
   CREATE/UPDATE = "does THIS actor have a reusable draft" (findOwnDraft) — it
   never diffs the published row. Publish supersedes unconditionally
   (archive old + version++).
7. Production admin identity for gated `--as`: **ksadmin@ardictech.com**
   (f4805bd1…); `maymun207@gmail.com` has NO auth.users row. auth.users total 12.
8. Job files for publishGovernedContent REQUIRE both `promptSegments[]` and
   `ruleInstances[]` arrays (loader-validated) — even when one is empty.
9. Standing WATCHES: F126 (§2.1) · F122 first natural `[LLMRetry] …
   finishReason=error` · seed-line grammar `rows=N skipped=M failed=K`, any
   `[Seed] FAILED` is real.
10. After ANY production deploy switch, re-resolve the production deploymentId
    before scoping runtime-log reads; runtime-log queries: single inner content
    word, narrow since (broad windows time out).
11. Never propose golden work — freeze is owner law; SR1-W3a's 48,444 tokens rode
    ordinary replay quota (38,081,613 standing) and is the pattern.
12. Every close: carry-diff pasted into the new register (GOLDEN tooth #2).

## 4 · LANES & FENCES
Unchanged (v47 §4): Operator fence + single-ref fjbrkimwvtpwoxhziidh in every
Operator prompt; db push only (ADR-005); AG gated-service scripts per ADR-006
rev 2 (S49 lane-hygiene record: raw read-only diagnostics also go Operator/gated —
register v51 §5); raw DB = Operator MCP only; secrets never printed (ADR-007);
identity-tag protocol + S47-1 precondition line on every relay.

<!-- END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v48 · rev 48 · 2026-07-17 -->
