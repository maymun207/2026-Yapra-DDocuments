# CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v139

Cut LAST, 2026-09-14T00:22Z, at the true close of S137. **SUPERSEDES v138, which was stale within hours of
being cut** — it carried anchor `e95b0fdf` and named the `#546` route lock as S138's first job; `#546`
landed at 20:59:02Z and the lock is gone. Both of v138's claims were true when written. Neither survived the
night. That is the lesson at the top of this file: **a bootstrap cut before the session's last landing is a
bootstrap that lies to the next session.** v138 was cut while the bridge was down and nothing could move;
the bridge came back and three things moved.

**EVERY LINE HERE IS EITHER MEASURED AND SAYS SO, OR IS MARKED `CARRIED UNVERIFIED`.**

---

## 0 · SOTA-1, REWRITTEN WORD FOR WORD (S66-1 — a silent guarantee is an unverified guarantee)

> **SOTA-1 — KABUL KRİTERİ (S80).** v1'in tek kabul kriteri cwf-sota-definition'dır. O dosyadaki bir
> kritere izlenemeyen her şey v1 kapsamı dışıdır. Architect, bir SOTA kriterini ilerleten hiçbir kalemi
> "şimdilik gerek yok / az trafik / bu kadarı yeter / sonra / v1.1'e" gerekçesiyle erteleyemez,
> küçültemez, sırada aşağı çekemez. Elinde kalan tek itiraz sınıfı *"bu sıralama SOTA'yı kanıtlanamaz
> kılar"*dır ve ancak şunları YAZILI adlandırırsa kabul edilir: (a) hangi kriter kanıtsız kalır, (b) hangi
> tarihte kanıtlanabilir olur, (c) hangi ölçüm çözer. Üçü eksik her erteleme önerisi bir SOTA-1
> ihlalidir: sahip adıyla iptal eder, Architect ya aynı mesajda (a)+(b)+(c)'yi verir ya öneriyi geri
> çeker — üçüncü yol yoktur. Bir kriter YALNIZ kanıtla emekli olur; kolaylık, maliyet veya kapsam
> baskısıyla asla.

⚠ **`cwf-sota-definition` IS ABSENT FROM THE TREE.** The file this law names as v1's only acceptance
criterion does not exist where the law points. Until it does, every statement about SOTA coverage is
unanchored, and the first SOTA measurement of any session is whether the file exists.

---

## 1 · THE ANCHOR

```evidence:anchor
master     88d7a11cd4667ac0b6cb37b6779f6308ad54abc9
           "Merge pull request #546 — ASK-RENDERED-TWICE-S137-1"
           merged 2026-09-13T20:59:02Z, LIVE in production 20:59:06Z
read 2026-09-14T00:12:06Z from the owner's mounted clone.
⚠ A read of a remote-tracking ref the LANES refresh. The bridge VM holds no GitHub
credential and `git fetch` fails there (F-S133-BRIDGE-VM-HAS-NO-GITHUB-CREDENTIAL-1),
so it is NOT a `git ls-remote`. VERIFY IT AT SESSION OPEN. Bootstrap version: v139.
```

**DO NOT CUT A PHASE CARD BEFORE THE ANCHOR IS VERIFIED IN A FRESH CLONE.**

---

## 2 · WHAT S137 LANDED — SEVEN ON MASTER

```evidence:landings
432bb3ba --> 0cae062c   PR 537  BUS-REPLY-PATH
         --> f7640a48   PR 526
         --> 7f53f055   PR 532  TOOL-CALL-TRACE
         --> 52d9ba96   ten landing records, one batch
         --> 8f3ddebd   PR 529  REPLAY-EMITTER     18:14:14Z — 53 s after the card
         --> e95b0fdf   PR 535  GRAFT-WIRING       19:45Z, unblocked by ADOPTION
         --> 88d7a11c   PR 546  ASK-RENDERED-TWICE 20:59:02Z — 58 s after the notice
```

Two of the seven reached master under a minute from their instruction. Section 12.8's thirty-minute standard
is not aspirational in this factory; it is routinely beaten when nothing is in the way.

Also: the documents repository reached GitHub for the first time this wave — nine commits at ~18:42Z,
`origin/main` = `4b773c1e6b7f4f573e6a7674310e5d6fc0846baa`. **It is six commits ahead again and the push is
still pending** (see §6.5).

---

## 3 · THE THING S137 LEARNED THAT NO LAW HAD NAMED

**THE HARNESS IS A GATE, AND THE LAW CORPUS DOES NOT KNOW IT EXISTS.**

`#546` was green on every gate this factory models — CI, drift, and `npm run land:selftest` PASS
(`reds=21 defects=0 control=green`, the first reading since S136, which CLOSES the open half of
`ARCHITECT-RULING-S136-THE-MERGE-FORM-1`). It still did not land. The window's own permission classifier
refused the command before it ran, under the label "Merge Without Review", because
`.claude/settings.local.json` allowed `ADF_LANE_ROLE=AG-5 npm run land *` and nothing else.

**AG-5's monopoly was written in THREE places** — `scripts/land.ts`, `CLAUDE.md` §6a, and the permission
file — and only the first two were modelled. From outside, a law refusal and a harness refusal are
byte-identical: nothing lands, the remote is untouched. Their cures are unrelated. A law refusal is cured by
a ruling; **a harness refusal is cured by no ruling at all**, because an authority the harness cannot see is
not an authority the harness will honour.

Filed as `F-S137-THE-HARNESS-IS-A-GATE-NO-LAW-NAMES-1`. Cured for that instance; NOT cured as a class.

**AG-4 did not route around it.** No `gh pr merge`, no hand-merge, no re-spelled command. It recorded a slip,
commented on the PR, and pushed nothing to the branch because that would decay its card's fence.

---

## 4 · STANDING RULINGS AND INSTRUCTIONS, IN THE OWNER'S OWN WORDS

- **`OWNER-RULING-S137-AG5-DOES-NOT-AUTHOR-PRODUCT-CODE-1`** — AG-5 lands; it does not write. A card's route
  is chosen by WHO WILL LAND IT, never by who is idle. The one-landing merge-key exemption granted alongside
  it is **SPENT, and its residue is gone**: the permission file is byte-identical to its pre-exemption state,
  md5 `5bdbb35bfd6f365092fef4a0f1422357`, verified 00:18:46Z.
- **The documents flow is LOCAL FIRST, then a LANE syncs.** *"tum dokumanlari once local git e mutlaka
  yazmalisin, ve bunu github a ise scout u yada ag yi kullanarak locak git ile remote u sync etmelisin."*
  The Architect never pushes.
- **The graft never takes our code.** *"graft in hic bir sekilde bizim codumuzu as is yada ozeti olarak bile
  almasina izin VERME!"* Not as-is, and not as a summary. Its three settings stay open by his informed
  choice — a decision, not a debt.
- **His local time is UTC+3.**
- **`AG-4 benimsesin, ayarlara dokunmasin`** — adoption of the WORK without adoption of the SETTINGS.
- `OWNER-RULING-S137-SYMMETRY-CLAUSE-FOUR-ROWS-PARKED-1` stands; which prerequisites to unpark is unanswered.

---

## 5 · STANDING RULES ADOPTED IN S137 — MECHANICAL, NOT MORAL

1. **Two consecutive unmoved measurements are a REPORT and a FINDING, never a third tick.**
2. **Every card insert arms its own wake in the SAME tool block.**
3. **Card bytes are transported ONCE**, into the bytes-for-review row; the seal is prepended IN THE
   DATABASE. Every hand-written insert carries md5 AND sha256 `WHERE` preconditions — that precondition
   caught a silent base64 corruption in S137 (`d7541b60…` against an expected `c1a5eaa6…`).
4. **A card's route is chosen by WHO WILL LAND IT.**
5. **WHEN THE BRIDGE IS DOWN, THE REPORT IS "I CANNOT MEASURE MASTER" — NEVER A STORY ABOUT WHY.** Paid for
   at 21:27Z: the Architect turned three absences into a claim that the machine had slept and the lane had
   not reached the command. The landing had happened twenty-eight minutes earlier.

---

## 6 · FIRST JOBS, IN ORDER

1. **Rewrite SOTA-1 verbatim in your first message.** Its absence means the session opened wrong.
2. **Verify the anchor** in a fresh clone. A difference is a bug, filed before any card is cut.
3. **Measure `cwf-open-items-register-v127` §4.** `REGISTER-BUG-BUCKET` is at v54 and has not advanced in
   S134–S137 — the **fourth** consecutive stale session. v125 called it a pattern; a marker noted every
   session and repaired in none is not being tracked, it is being decorated. **Repair it or close it; do not
   tick it a fifth time.**
4. **Land `PR 547`** — AG-4's landing report for `#546`, open on
   `phase/ask-rendered-twice-s137-1-land-report`. Route it to a lane that is not AG-4.
5. **The archive push.** Six commits ahead of `origin/main`. It needs a card, the card needs an adversary
   seal, and **the scout is CLOSED** — that is the actual blocker. Open the scout, or ride the push on the
   next scout-sealed card. Do NOT dress the order as an exempt kind to get past the gate; that is the
   laundering section 12.2 forbids, and S137 declined it deliberately.
6. **Re-measure, do not inherit:** the anchor, `npm run architect:open`, and whether `cwf-sota-definition`
   exists at all. The internal seven-key counter is NOT-READ and its 6/7 figure is never quoted; v122's
   `0/16` on the sixteen external criteria is CARRIED UNVERIFIED for a second wave.

---

## 7 · WHAT S137 COST, RECORDED SO IT IS NOT MISTAKEN FOR THEORY

Ten defects in the Architect's own work, and **every single one was caught by a lane or by the owner.** It
called a working lane asleep and asked the owner to interrupt its window. It ticked four times on an unmoved
measurement. It asserted no language signal reaches the turn when `ctx.language` comes off the request body.
It fenced a landing card to a head superseded three minutes earlier. It decayed its own fence by committing
to the surface the scout was reading. It said `npm run build` runs five gates; it runs six. It dramatised
the graft's settings gap until the owner asked *"bunu tüm dünya indiriyor ve kullanıyor bizde neden
patlıyor?"* and nothing was broken. It ordered AG-4 to break `CLAUDE.md` §6a. It left a thirty-hour lock in
the shared clone. And it fabricated a red from three absences while the landing was already live.

In the same hours: **AG-4 refused the illegal order and cited the law.** AG-4 found the adoption path that
unblocked `#535` without invalidating the owner's authority, refused to route around the harness wall, and
measured the land self-test nobody had read since S136. **AG-5 corrected the Architect's card with a
citation** — the card named `ctx.language`; AG-5 selected by `turnLanguage(ctx)` because a standing owner
ruling (BUG-029 / PHASE-SIGNAL-SOURCE-1 §G2) says a system sentence follows the turn's own language, and it
reported the deviation rather than taking it silently or obeying into a known bug. **The owner was right
every time he pushed back** — on the graft, on the archive, on the route, and on the action item he refused
to accept until it was measured.

**Read that asymmetry before assuming the Architect is the careful one.**

---

## 8 · TRAPS, RE-CONFIRMED OR NEW IN S137

- **THE BRIDGE IS NOT CONTINUOUSLY AVAILABLE, AND ITS TWO SURFACES FAIL INDEPENDENTLY.** It dropped and
  returned repeatedly across sixteen hours. The BUS (Supabase MCP) stayed reachable throughout while the
  clone, git and the gates were unreadable. Never plan on reading the clone at an arbitrary moment; never
  conclude anything about the machine from bus silence.
- **`cardPreflight` GREEN IS NOT A REVIEW**, and two gates still disagree over the same bytes with
  `CARD_GATE=REPORT` printing and not enforcing. Which is stale is UNMEASURED.
- **THE ADVERSARY GATE ADMITS `ADVERSARY: EXEMPT` + `ack: <row id>`** where the row is a scout row OR a row
  whose kind is `ruling`. That is the designed path for a loop-breaking card, it was measured in the gate's
  own source before use, and the exemption is never self-issued.
- **VERCEL SILENCE ON A PUSH IS A DESIGNED SKIP.** `scripts/vercel-ignore.mjs` cancels docs-only pushes and
  its exit codes are INVERTED (0 skips). Read the script before reading the silence.
- **`npm run build` RUNS SIX STEPS:** `tsc -b`, `typecheck:api`, `gen:arch-facts`, `check:ground`,
  `vite build`, `check:doc-drift`. The drift check is the last command of that build, not a workflow.
  `npm run reseal` is the only way past it (RULE 20).
- **ADOPTION RESCUES ONLY AN UNREADABLE AUTHOR.** `land.ts`, in its own words: when the subject lens
  resolves, *"the report is not even read"*. `#535` was rescued by adoption because its subjects were
  unreadable; `#546` could not be, because its subjects carried `AG-5`. A partial token lands on
  AUTHOR-CONTRADICTED, refused by construction.
- **LIVENESS IS POSITIVE ONLY.** AG-4 landed `#546` while both its heartbeat and the bridge were dark.

---

## 9 · STATE AT CLOSE

```evidence:state
MEASURED 2026-09-14T00:12–00:18Z:
master                    88d7a11cd4667ac0b6cb37b6779f6308ad54abc9
Vercel production         dpl_8yrT2wip8j84bdX8N7Tt5AHEmuzR  READY  commit 88d7a11c
.claude/settings.local.json  md5 5bdbb35bfd6f365092fef4a0f1422357 — pre-exemption state restored
PR 547                    OPEN — AG-4's landing report, needs a lander that is not AG-4
documents origin/main     4b773c1e… — six commits ahead locally, UNPUSHED, scout CLOSED
lanes                     AG-4 and AG-5 alive within the hour; AG-1/2/3 heartbeats from 09-10
scout · operator          CLOSED
SOTA scoreboard           NOT re-measured; v122's 0/16 CARRIED UNVERIFIED
docs/laws                 rules 59 · constitution 16 — CARRIED from S136, not re-measured
REGISTER-BUG-BUCKET       v54 — FOURTH consecutive stale session
```

END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v139
