
## S167-FINAL · HEADER FOR v162 (this version)
v162 = v161 bytes (Claude_Duzenli_Arsiv/S167/cwf-open-items-register-v161.md, md5 4a39dbd4752370cb6b04960e218eb718) + this section, concatenated by script at owner turn 20 (2026-09-30T22:00Z). Second cut of S167. ANCHOR: master 1f694e1ff47d84d6e7b321e332446519f443b1f0 (gh.sh, 21:57Z). Open PRs: 656 (42e9eb273ab2131653c572a25649e56d89160df4, Build and Test in progress past the guard), 658 (d8c2fe4062a056744fd4868a93060b496c30f7c2, RED at merge guard), 659 (e3889ccd1c5ada3dae14a817e51714fb23e40c34, RED at merge guard). PR 657 CLOSED, SUPERSEDED-BY 659.

### Corrections to S167 rows
- 187 (TEST-ROOT, PR 656): guard passed after AG-1's report push; suite running at cut.
- 188 (INBUCKET): 657 CLOSED SUPERSEDED-BY 659 (AG-3 carry, own report, NOTICE-INBUCKET-CARRY-S167-1). NOTICE-INBUCKET-HEADER-FIX-S167-1 WITHDRAWN (premise false: header alone → 36/37; AG-3 refused correctly). 659 RED at merge guard step 6, cause UNMEASURED (its report HAS a FILE-FENCE at line 76) → scout-2 reads the log under ORDER-SCOUT-LAND-656-657-S167-1 + NOTICE-SCOUT2-LAND-AMEND-S167-1.
- 186 (SESSION-TOKEN, PR 658): code done (AG-4: 32 new + 177 existing tests pass locally, typecheck pass). RED at merge guard: owner screenshot of the first head shows `FAIL NO-FENCE — 0 FILE-FENCE blocks` (the first push carried no report, because the Architect's card ordered push-first before the report — A-REC-S167-4). Second head (with report) still RED; hypothesis UNMEASURED: the guard takes the fence from the FIRST commit, which had none → fresh-branch carry (one commit = code + report). S168 first job after the log read.
- 184 / 185: scout-1 pre-reviews of CI-SPEED and SCOUT-ACK NOT returned; scout-1 silent on the bus since 21:32Z (its SD1 landing succeeded, adversary status posted, no SCOUT-STATUS-LAND-SD1 reply). Owner tab-check ⚡ issued 00:46 TSİ, answer pending at cut.

### New rows
| # | item | kind | next step | when | exit |
|---|---|---|---|---|---|
| 193 | CARD ORDER RULE (A-REC-S167-4): the FIRST commit of every card carries the report skeleton with line 1 `<!-- relay-audit: v1 kind=report -->`, ## CLAIMS, ## DIFF and the complete FILE-FENCE; push-first means code + report together, never code alone | practice H | in every card from S168 | now | no PR red on NO-FENCE / FENCE-GREW from its first push |
| 194 | A-REC-S167-3: the header-only fix notice was cut without reading relayAuditGate's grammar | Architect discipline | a repair notice names the gate's rule set it must satisfy, read from source first | now | — |
| 195 | CI-DIET SCOPE (owner question 00:59 TSİ "biz bunu diet moda çekmedik mi?"): CI-DIET (build-test.yml `changes` job) skips only PRs whose diff touches no code/test surface; 656 touches 33 test files, so the full suite runs BY DESIGN. The speed-up for code PRs is 184 (CI-SPEED), not the diet | answered | — | — | — |

### §5 carriers at this cut
CWF-S167-SESSION-CLOSE-v2 · CWF-S167-FINDINGS-v2 · CWF-SESSION-GRAPH-KB-v167 (unchanged) · cwf-open-items-register-v162 (= v161 + this section) · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v175 · CWF-S167-PLAN-v1 · instructions v5_11.
END · cwf-open-items-register-v162
