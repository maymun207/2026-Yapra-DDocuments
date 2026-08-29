# CWF · S124 OPEN MEASUREMENT — v1

CUT 2026-08-29T03:45Z (06:45 TSİ) at the open of S124. Every line below is either MEASURED with its
instrument named, or marked UNMEASURED with the reason. Nothing is carried from `v124` as fact.

---

## 0 · POSITIVE CONTROL — `SOTA-1`, VERBATIM (S66-1)

Read from the canonical home in a real repository tree, not from memory and not from the project box:
`docs/laws/constitution/SOTA-1.md`, `sha1 396d3fafbf946b246b5f4b641fe0badd2ed0bc8e`, 2397 bytes.
**Byte-identical at `b86850250cb3d845ff5be5edc425e3304e0dc72f` and at the `v124` anchor
`3aab649dfbab5360c52aab58db839d0905649fa6`** — so the restatement below is valid AT THE ANCHOR.

> **SOTA-1 — KABUL KRİTERİ (S80).** v1'in tek kabul kriteri `cwf-sota-definition`'dır. O dosyadaki bir
> kritere izlenemeyen her şey v1 kapsamı dışıdır. Architect, bir SOTA kriterini ilerleten hiçbir kalemi
> *"şimdilik gerek yok / az trafik / bu kadarı yeter / sonra / v1.1'e"* gerekçesiyle **erteleyemez,
> küçültemez, sırada aşağı çekemez.** Elinde kalan **tek** itiraz sınıfı *"bu sıralama SOTA'yı
> kanıtlanamaz kılar"*dır ve ancak şunları YAZILI adlandırırsa kabul edilir: **(a)** hangi kriter
> kanıtsız kalır, **(b)** hangi tarihte kanıtlanabilir olur, **(c)** hangi ölçüm çözer. Üçü eksik her
> erteleme önerisi bir **SOTA-1 ihlalidir**: sahip adıyla iptal eder, Architect ya aynı mesajda
> (a)+(b)+(c)'yi verir ya öneriyi geri çeker — üçüncü yol yoktur. Bir kriter YALNIZ kanıtla emekli
> olur; kolaylık, maliyet veya kapsam baskısıyla asla.

---

## 1 · THE CAPABILITY GAP, DECLARED FIRST BECAUSE IT BOUNDS EVERYTHING BELOW

**GitHub is unreachable from BOTH shells available to the Architect this session.** This is a
measurement, not an inference, and it was taken four ways so that a single negative probe is not
mistaken for absence (`S102` · TEK NEGATİF PROB YOKLUK KANITI DEĞİLDİR):

```evidence:egress
cloud container   git clone https://github.com/maymun207/cwf_yaprak.git  -> could not read Username
cloud container   curl https://github.com/maymun207/cwf_yaprak            -> 403
cloud container   curl https://api.github.com/repos/maymun207/cwf_yaprak  -> 403
cloud container   curl https://registry.npmjs.org/vitest                  -> 200   (network itself is up)
device VM         curl https://github.com/maymun207/cwf_yaprak            -> 404
device VM         curl .../cwf_yaprak.git/info/refs?service=git-upload-pack -> 401
device VM         curl https://registry.npmjs.org/esbuild                 -> 200   (network itself is up)
WebFetch (out of both shells)  https://github.com/maymun207/cwf_yaprak    -> renders; repo is PUBLIC
```

A public repository that renders in a browser and returns 403/404/401 to both shells is an **egress
interception signature**, not a permission fact about the repository. **Consequences, stated plainly:**

1. **`v124` §0 step 3 — "VERIFY THE ANCHOR against `git ls-remote`" — CANNOT BE SATISFIED this session.**
   Under the project box §0 (*"Doğrulanmadan faz kartı kesilmez"*), no phase card may be cut on a wire
   claim until a lane supplies one.
2. **The Architect cannot fetch, and cannot push.** Every ref movement is lane work, as always
   (seed §11), but this session it is lane work *for reading too*.
3. `gh` is absent in both shells, so `architect:open` fields 4 and 10 return UNMEASURED. **That is the
   container's shape, not a fault.**

**Second gap, declared:** at session open **no device folder was connected**. Three were connected
during the open — `2026 - Yapra - DDocuments`, `2026 - Yapra -  Codes`, and `cwf-yaprak-AGB` by
request. Nothing in this document was written before that.

---

## 2 · WHAT WAS MEASURED INSTEAD OF THE WIRE, AND WHY IT IS ADMISSIBLE

A census of every git working copy on the device (16 clones under two connected folders) was taken and
ranked by HEAD date. The freshest is
`2026 - Yapra -  Codes/cwf_yaprak`, and **it already holds the anchor commit as a git object**, so the
anchor's *content* is readable from a primary source even though the wire is not.

```evidence:tree
clone            2026 - Yapra -  Codes/cwf_yaprak
local master     b86850250cb3d845ff5be5edc425e3304e0dc72f   2026-08-28 09:42:32 +0300
origin/master    3aab649dfbab5360c52aab58db839d0905649fa6   2026-08-28 17:14:40 +0300
                 = the v124 anchor, EXACTLY
ancestry         b8685025 IS an ancestor of 3aab649d          (git merge-base --is-ancestor -> YES)
between them     9 commits: #472 honestbench scorer, #479 A23 ask-shape build, and their seals
worktree         clean (git status --porcelain empty)
also present     phase/go-landing-s123-2 = 17305ff2, ONE commit past the anchor, a 182-line AG-5
                 report only, touching no ledger and no law
second-freshest  cwf-yaprak-AGB, master dfb78783..., 2026-07-16 — six weeks stale, predates docs/laws/
```

**What this proves and what it does not.** It proves the anchor SHA named by `v124` is a real commit
with the claimed ancestry and the claimed content. It does **not** prove `master` on the wire is still
that commit — `origin/master` here is a remote-tracking ref last written 2026-08-28, and a stale
tracking ref is exactly the derived-not-source class this project keeps being bitten by. **Anchor
status: CONTENT-VERIFIED, WIRE-UNVERIFIED.**

### The anchor's own numbers, re-derived at the anchor

```evidence:anchor-recheck
docs/laws/constitution   16 files    (v124 claimed 16)  MATCH
docs/laws/rules          59 files    (v124 claimed 59)  MATCH
docs/ground/open-items.md  38990 bytes = the pinned FLOOR  MATCH
open-items ledger        65 items = 61 OPEN + 4 closed-form, and architect:open independently prints 65
```

### `npm run architect:open`, actually run

Run against a `git archive` extraction of the anchor tree in scratch — the owner's repositories were
not checked out, not branched, and not written to. The Mac's `node_modules` is `darwin-arm64` and the
device shell is Linux, so `@esbuild/linux-arm64@0.27.0` was installed into a scratch copy; the owner's
tree was never touched.

```evidence:architect-open
[ 1/11][ 2/11][ 3/11][ 5/11]  UNMEASURED — the extraction has no .git (artifact of the method,
                              measured directly in §2 above instead)
[ 4/11][10/11]                UNMEASURED — spawnSync gh ENOENT (container shape)
[ 6/11] facts.json            stamp f367e7a6 · generated 2026-08-27T20:30:45Z
[ 7/11] census.latest.json    measured 2026-08-25T03:42:15Z · reach 26 measured / 0 unmeasured / 0 unreadable
[ 8/11] orphans.md            4 orphans (measured)
[ 9/11] open-items.md         65 items (measured)
[11/11] factory               UNMEASURED — no SUPABASE_ACCESS_TOKEN; read with the Supabase MCP instead
verdict                       [OK] 11 fields printed; no CONTRACT v1 violation in docs/ground/
```

---

## 3 · SOTA — BOTH BOARDS, READ RATHER THAN CARRIED

`v124` §6 said the two figures were carried from `v122` and NOT re-measured, and instructed the next
session to take the reading. **The reading is taken here.**

### (B) THE ACCEPTANCE CONTRACT — **0/16, MEASURED**

Read from the binding contract itself, `cwf-sota-definition-v1_5` §10, which is owner-held and lives in
the project box. Every one of the sixteen external rows reads **ÖLÇÜLMEDİ**, except `mcp-honestbench`
which reads **NOT BUILT** — which is not a measurement either:

τ²-bench · Gaia2 · MCP-Bench (score) · MCP-Bench (zero-code mount) · MCP-Universe (zero-code mount) ·
LongMemEval (abstention) · Mem2ActBench · ToolComp (process) · API-Bank · MCP-SafetyBench ·
MT-AgentRisk · Agent-SafetyBench · F1 BrowseComp-Plus · F2 DeepScholar-Bench · `mcp-honestbench` ·
B-FRONTIER baseline.

The document's own closing sentence in §10.1 says the same thing in its own words: *"Sixteen of sixteen
external criteria remain unmeasured, and the budget itself is unmeasured."* **No `v1_6` exists** — the
box carries `v1_5` and its §11 changelog ends at `v1_5`; the `v1_6` amendment is named as owed in
`cwf-implementation-order-S120-v32` and has never been cut.

**So (B) has not moved since 2026-08-04. Twenty-five days, zero external criteria.**

### (A) THE INTERNAL SEVEN-KEY COUNTER — **its carrier still reads 6/7 at the anchor**

`docs/ground/HANDOVER-PROCEDURE-v1.md` line 167 names the carrier for the seven-key question:
`open-items.md`. Read at the anchor, the row is still open:

```evidence:gi-101
line 131  - [GI-101] OPEN · Legacy id `#29` — the A23 UNDERSTANDING LAYER, the SOTA key.
                     FLAGGED AS AN APPARENT DUPLICATE OF PI-001, and NOT merged.
line  82  - [PI-001] OPEN · Legacy id `#29` — the CONSUMPTION arm of the artifact-name store.
```

**The A23 build LANDED in S123 and the ledger row did not move.** Under `S103-YASA-1` an item leaves the
OPEN set only through `CLOSED@evidence` / `SUPERSEDED-BY` / `MERGED-INTO`, and none of those was
written. Two honest readings remain and they are not the same:

* **ledger lag** — the key is turned and nobody wrote the closure; or
* **the key is not turned** — the build landed but the criterion the row states is not met.

**Which one is true is UNMEASURED, and it is a measurement, not a decision.** It is settled by reading
`#479`'s landed content against the sentence `GI-101` actually makes — not by anyone's recollection of
what the phase was for. Until then the honest tally is **6/7 with a pending closure**, and *"the
seventh key landed"* is a claim about a merge, not about the counter.

`PI-001` and `GI-101` both carry legacy `#29` against two different descriptions. That collision is
already flagged in the ledger as an owner ruling owed, and it must be ruled BEFORE either row is
closed, or the evidence the ruling needs is destroyed.

**And the standing sentence, unchanged: turning the seventh key does not satisfy `SOTA-1`.** (A) is a
readiness measure; `SOTA-1` binds acceptance to (B), and (B) is 0/16.

---

## 4 · THE FACTORY, READ LIVE

Supabase MCP, project `fjbrkimwvtpwoxhziidh`, read 2026-08-29T03:36Z:

```evidence:factory
mode row    row_kind=factory · mode=READY · changed_by=AG-5 · changed_at 2026-08-27T10:31:57Z
            note still quotes the S118 opening command verbatim
AG-1  WORKING   heartbeat/updated 2026-08-28T15:12:42Z   age 12h23m
AG-2  WORKING   heartbeat/updated 2026-08-28T15:12:53Z   age 12h23m
AG-3  WORKING   heartbeat/updated 2026-08-28T15:13:21Z   age 12h22m
AG-4  WORKING   heartbeat/updated 2026-08-28T15:12:19Z   age 12h23m
AG-5  CLAIMED   heartbeat/updated 2026-08-28T15:12:48Z   age 12h23m
scout CLOSED · operator CLOSED · both null heartbeat BY DESIGN
```

**Read it the way the discipline requires, and it says almost nothing.** `mode=READY` is hand-written
and its note is two sessions old — a fossil, exactly what `v5_8` §4 warns about. A stale heartbeat is
ANTI-correlated with production and therefore not evidence of stopping. The only positive-only lens is
OUTPUT, and the last output is the `phase/go-landing-s123-2` branch at **2026-08-28 17:25 +0300** —
*earlier* than the last heartbeat, so it does not extend the window either.

**Every lane's liveness at this open is `UNMEASURED`. Not dead. Not `HUNG`. Unmeasured** — and only a
human eye on those windows, or new output, settles it (seed §2, S117 addendum).

---

## 5 · THE FINDING OF THIS OPEN

**`F-S124-ARCHIVE-CLOSE-COMMIT-UNPUSHED-1` — the S123 close artefacts exist in exactly one place.**

`v124`'s own anchor block asserts, in the fence it offers as evidence:

> `archive 2026-Yapra-DDocuments main = c5cc031e655d89ad467b891f1683eed442a17778, remote MATCHES,`
> `nothing unpushed. AG-4 pushed it and read the remote back.`

Measured on the device this morning:

```evidence:archive
refs/heads/main          c4de42f7b7f402c959ea5998f070ba824af123bd
                         "S123 close: the seventeen remaining artifacts, and the two close artifacts"
                         2026-08-28 15:05:09 +0000
refs/remotes/origin/main c5cc031e655d89ad467b891f1683eed442a17778   (2026-08-28 13:34:45 +0000)
relationship             local main is ONE COMMIT AHEAD of the tracking ref
untracked                9 files, all under Claude_Duzenli_Arsiv/Projeler/
```

**The claim was true when it was written and false about the commit that came after it.** AG-4 pushed,
read the remote back, and reported honestly — and then the close commit was made and never pushed. The
seventeen S123 artefacts and both close artefacts, *including `v124` itself*, are on this Mac and, on
the evidence available, nowhere else.

**Stated at its exact strength:** `origin/main` is a tracking ref and this session has no wire, so a
push made from elsewhere afterwards cannot be excluded. But this clone is the one that pushes, and a
push from it would have moved this very ref. **Treat it as unpushed until a lane proves otherwise.**

This is the class `v124` §8 names, and it is worth naming that the carrier that fooled the reader was
an evidence fence — the form this factory trusts most. **A fence records a measurement's moment. It
does not renew itself.**

---

## 6 · THE ONE PATH

Two blockers, and they are the same shape: **something needs GitHub, and nothing the Architect can
reach has GitHub.** A lane window on the Mac has a real macOS shell and a real credential, and it is
the only actor here that does.

So the first work of S124 is **one card to one producer window**, doing two reads and one write:

1. `git ls-remote https://github.com/maymun207/cwf_yaprak.git refs/heads/master` — printed verbatim.
   This is the wire check `v124` §0 step 3 demands, and until it lands **no phase card may be cut**.
2. `git -C <archive> push origin main`, then read the remote back with `ls-remote` and print both.
   This closes `F-S124-ARCHIVE-CLOSE-COMMIT-UNPUSHED-1`, and the read-back — not the push's exit code —
   is the evidence.
3. The nine untracked files under `Claude_Duzenli_Arsiv/Projeler/` reported by name, **not committed**.
   What belongs in the archive is a ruling, and a lane does not make it.

**No governance or mechanism change is in this** — the `P-6` observation window stays honoured. This is
ordinary lane work, and it is the precondition for every item on the GATE-1 agenda.

---

TAIL ANCHOR: CWF-S124-OPEN-MEASUREMENT-v1 ends here.
