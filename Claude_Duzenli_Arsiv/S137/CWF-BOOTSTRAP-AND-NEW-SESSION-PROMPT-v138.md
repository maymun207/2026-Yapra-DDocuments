# CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v138

Cut LAST, 2026-09-13T07:40Z, at the close of S137. Supersedes v137.

**EVERY LINE HERE IS EITHER MEASURED IN S137 AND SAYS SO, OR IS MARKED `CARRIED UNVERIFIED`.** Rewriting an
inherited claim as fact is a defect committed at closing time, so it is not done here.

⚠ **THIS CARRIER WAS CUT WHILE THE BRIDGE TO THE OWNER'S COMPUTER WAS DOWN.** Everything git-shaped in it —
the anchor, the branch head, the documents repository — is the LAST MEASUREMENT BEFORE THE DROP and is
marked as such. Everything database-shaped was measured live at 07:39Z through Supabase MCP, which stayed
reachable throughout. **Bus-reachable and clone-reachable are two different availabilities and they failed
independently in S137.**

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

⚠ **AND THE THING S137 MEASURED ABOUT IT:** `cwf-sota-definition` — the file this law names as the ONLY
acceptance criterion for v1 — **IS ABSENT FROM THE TREE.** Until it exists there, every statement about
SOTA coverage in this factory is unanchored. That is panel item #4 and it is a SYNC, not a build.

---

## 1 · THE ANCHOR

```evidence:anchor
master     e95b0fdf4fdb4c53eba3f3561b0eae0ac50f81c5
           "AG-5 LANDS GRAFT-WIRING-1 (PR 535) — adopted by AG-4 under
            OWNER: AG-4 benimsesin, ayarlara dokunmasin"
last read 2026-09-12T19:45Z from the owner's mounted clone, BEFORE the bridge dropped at 20:52Z.
⚠ This is a read of a remote-tracking ref that the LANES refresh. The bridge VM holds no
GitHub credential and `git fetch` fails there (F-S133-BRIDGE-VM-HAS-NO-GITHUB-CREDENTIAL-1),
so it is NOT a `git ls-remote`. It is also now HOURS OLD and the bridge has been down since.
VERIFY IT AT SESSION OPEN, AND EXPECT IT TO HAVE MOVED. Bootstrap version: v138.
```

**DO NOT CUT A PHASE CARD BEFORE THE ANCHOR IS VERIFIED IN A FRESH CLONE.**

---

## 2 · THE FIRST JOB OF S138, AND IT IS ONE LINE FROM THE OWNER

**`#546` IS GREEN AND CANNOT LAND, AND NO GATE REPORTS WHY.**

```evidence:blocked
branch  phase/ask-rendered-twice-s137-1
head    ce3f785ec0692c79c7583c5a7047965aa1357594
PR 546  OPEN, MERGEABLE, CLEAN — three workflows success
drift   "no drift -- all 7 narrative tabs synced (mode=head)"
authority  OWNER-AUTHORITY-S137-LAND-ASK-RENDERED-1, GRANTED AND UNSPENT
```

Three correct rules meet at one lane:

1. `scripts/land.ts::resolveAuthorLane` refuses a landing whose author lane equals the lander lane. A
   certificate must not be self-signed. **Correct.**
2. `CLAUDE.md` §6a: in a producer window `ADF_LANE_ROLE` is CORRECTLY unset, `gh pr merge` is REFUSED
   there, and **"the absence is the feature"** — do not set it, do not "fix" it. **Correct.**
3. AG-5 holds the only merge key, and AG-5 also accepts product cards. **This is the seam.**

Therefore **any product code AG-5 authors is unlandable by construction.** The Architect routed `#546` to
AG-5 by the wrong criterion — *who is idle* instead of *who will land it* — and then, trying to unblock it,
ordered AG-4 to set `ADF_LANE_ROLE` in a producer window. **AG-4 REFUSED, on `CLAUDE.md` §7 stopping
condition 5, and AG-4 WAS RIGHT.** The refusal was acknowledged by name
(`NOTICE-YOUR-REFUSAL-WAS-CORRECT-S137-1-v1`, consumed 03:07:07Z).

**THE OWNER'S DECISION IS OUTSTANDING. Three shapes were put to him; none has been answered:**

| | ruling | effect |
|---|---|---|
| ① | `OWNER-RULING-S137-AG4-MAY-SET-THE-MERGE-KEY-FOR-546-1` | one-off §6a exemption, this landing only — opens `#546` immediately |
| ② | `OWNER-RULING-S137-AG5-DOES-NOT-AUTHOR-PRODUCT-CODE-1` | **the standing cure, and the Architect's recommendation** — AG-5 lands, it does not write |
| ③ | a second merge key | deliberately deferred: it widens the blast radius and deserves a rested decision |

**ASK FOR IT IN YOUR FIRST MESSAGE, IN ONE LINE, AND DO NOT CUT A CARD ON THIS SEAM BEFORE IT ARRIVES.**
A HOLD stands to AG-5 (`df516325`): no pushes to that branch until the landing closes.

Full record: `F-S137-THE-ONLY-LANDER-IS-ALSO-A-PRODUCER-1` (archive commit `469727f`),
`A-REC-S137-I-SENT-PRODUCT-WORK-TO-THE-ONLY-LANDER-1`, `CWF-SESSION-GRAPH-KB-v137` EDGE S137-E1.

---

## 3 · WHAT LANDED IN S137 — SIX ON MASTER, PLUS THE DOCUMENTS REPOSITORY

```evidence:landings
432bb3ba --> 0cae062c   PR 537  BUS-REPLY-PATH        (row 4 of the owner's list, CLOSED)
         --> f7640a48   PR 526
         --> 7f53f055   PR 532  TOOL-CALL-TRACE
         --> 52d9ba96   ten landing records, one batch (closes PR 539)
         --> 8f3ddebd   PR 529  REPLAY-EMITTER        18:14:14Z — 53 s after the card
         --> e95b0fdf   PR 535  GRAFT-WIRING          19:45Z
```

**PR 529 landed fifty-three seconds after its card was delivered.** §12.8 sets the standard at thirty
minutes; this is the first landing this factory has measured in under a minute, and it is recorded so the
standard is known to be reachable rather than aspirational.

**PR 535 was unblocked by ADOPTION, not by a re-cut**, and this is a reusable path: an AUTHOR-UNKNOWN
branch is not a dead branch, it is a branch missing ONE report file. AG-4 added
`docs/relay/GRAFT-WIRING-1-AG4-report.md`, signed as ADOPTER, naming the originating session (`24d72668`)
and the original shas; `reportLaneOf` then resolved AUTHOR-REPORT = AG-4 and the owner's existing authority
stayed valid. See EDGE S137-E2.

**THE DOCUMENTS REPOSITORY REACHED GITHUB FOR THE FIRST TIME THIS WAVE** — nine commits pushed by AG-4 at
~18:42Z, `origin/main` = `4b773c1e6b7f4f573e6a7674310e5d6fc0846baa`. **It is already four commits ahead
again, unpushed, at close.** This is recurring, not one-off. **The push card goes to AG-4, NOT AG-5** — same
routing rule as §2, in its cheapest form.

---

## 4 · STANDING INSTRUCTIONS FROM THE OWNER, IN HIS OWN WORDS

- **The documents flow is LOCAL FIRST, then a LANE syncs.** The Architect writes every document into the
  local documents git; a lane (scout or AG) pushes local to GitHub. *"tum dokumanlari once local git e
  mutlaka yazmalisin, ve bunu github a ise scout u yada ag yi kullanarak locak git ile remote u sync
  etmelisin."* The Architect never pushes.
- **The graft never takes our code.** *"graft in hic bir sekilde bizim codumuzu as is yada ozeti olarak
  bile almasina izin VERME!"* Not as-is, and **not as a summary.**
- **The graft's three settings stay open BY HIS INFORMED CHOICE.** Recorded so a future session does not
  "fix" a decision. The Architect's earlier framing of that gap as a breakage was wrong and was withdrawn.
- **His local time is UTC+3.** Every time in every report to him is converted or labelled.
- **`AG-4 benimsesin, ayarlara dokunmasin`** — adoption of the WORK without adoption of the SETTINGS.
- **The thirty-minute rule, from S134 §12.8, was enforced again in S137:** when working code is ready on a
  branch it reaches master within thirty minutes or ONE MEASURED reason is named. *"Waiting for the
  report"* is not a reason. Neither is a card version.
- **`OWNER-RULING-S137-SYMMETRY-CLAUSE-FOUR-ROWS-PARKED-1`** stands; which prerequisites to unpark is
  unanswered.

---

## 5 · STANDING RULES ADOPTED IN-SESSION — MECHANICAL, NOT MORAL

1. **Two consecutive unmoved measurements are a REPORT and a FINDING, never a third tick.** Adopted after
   the Architect reported four. A well-built loop with no exit runs forever (A-REC-S133-6) and an hourly
   poll is that loop in a new costume.
2. **Every card insert arms its own wake in the SAME tool block.** A delivered card never waits on an
   Architect who forgot to come back.
3. **Card bytes are transported ONCE**, into the bytes-for-review row; the seal is prepended IN THE
   DATABASE. Base64 corrupts silently above a length — an S137 notice arrived at md5 `d7541b60…` against an
   expected `c1a5eaa6…` and decoded cleanly. The md5/sha256 `WHERE` precondition is what caught it; chunked
   base64 is a habit, and a habit is not a mechanism.
4. **A card's route is chosen by WHO WILL LAND IT, never by who is idle.**

---

## 6 · FIRST JOBS, IN ORDER

1. **Rewrite SOTA-1 verbatim in your first message.** Its absence means the session opened wrong.
2. **Verify the anchor** in a fresh clone, and expect it to have moved — it is hours old and was read
   through a bridge that then dropped. Difference = a bug, filed before any card is cut.
3. **Ask the owner for the §2 routing line.** One line. It is the only thing standing between a green
   branch and master.
4. **Measure `cwf-open-items-register-v126` §5.** `REGISTER-BUG-BUCKET` is at v54 and has NOT advanced in
   S134, S135, S136 or S137 — the **fourth** consecutive stale session. v125 called it a pattern rather than
   an incident; a marker noted every session and repaired in none is not being tracked, it is being
   decorated. **Repair it or close it, do not tick it a fifth time.**
5. **Cut the documents-push card TO AG-4.** Four commits ahead at close, including all three closing
   carriers.
6. **Re-measure, do not inherit:** the anchor, `npm run architect:open`, and the SOTA scoreboard — the
   sixteen EXTERNAL criteria of `cwf-sota-definition` are the only valid one, and that file is ABSENT FROM
   THE TREE, so the first measurement is whether it exists. The internal seven-key counter is NOT-READ and
   its 6/7 figure is never quoted. v122's `0/16` is CARRIED UNVERIFIED for a second wave.

---

## 7 · WHAT S137 COST, RECORDED SO IT IS NOT MISTAKEN FOR THEORY

Eight defects in the Architect's own work. It called a working lane asleep and asked the owner to interrupt
that lane's window — `consumed_at` was twenty-four seconds after the insert. It ticked four times on an
unmoved measurement. It asserted no language signal reaches the turn when `ctx.language` comes off the
request body in `api/cwf/chat.ts`. It fenced a landing card to a head superseded three and a half minutes
earlier. It decayed its own fence by committing to the surface the scout was reading. It said `npm run
build` runs five gates; it runs six. It dramatised the graft's settings gap as a breakage until the owner
asked *"bunu tüm dünya indiriyor ve kullanıyor bizde neden patlıyor?"* and nothing was broken. And it
ordered a lane to break `CLAUDE.md` §6a.

In the same hours: **AG-4 refused that order and cited the law.** AG-4 also found the adoption path that
unblocked `#535` without invalidating the owner's authority. The scout measured a superseded head's runs as
CANCELLED — neither pass nor failure — rather than calling them red, refused a card whose reseal was missing
on two SEALED files, and corrected the Architect's gate count. The owner caught four things by memory and
was right every time.

**Read that asymmetry before assuming the Architect is the careful one.**

---

## 8 · TRAPS RE-CONFIRMED OR NEWLY MEASURED IN S137

- **THE BRIDGE IS NOT CONTINUOUSLY AVAILABLE, AND ITS TWO SURFACES FAIL INDEPENDENTLY.** It dropped
  2026-09-12T20:52Z, returned 03:02–03:08Z, dropped again. Throughout, the BUS stayed reachable through
  Supabase MCP while the clone, git and the gates were unreadable. Never plan on reading the clone at an
  arbitrary moment; never conclude from a bus reading that the machine is up.
- **`cardPreflight` GREEN IS NOT A REVIEW, AND TWO GATES DISAGREE.** Re-instantiated live in S137: local
  `cardPreflight` returned GREEN on all eleven checks for a body the repository's own `mail-wait` refused on
  CP-1, CP-3, CP-4, CP-5. `CARD_GATE=REPORT` printed and did not enforce. **Which gate is stale is
  UNMEASURED** and it is not settled by whichever answered green (§12.13).
- **`CALLER-ABSENT` — TWO READINGS DISAGREE AND S137 RE-MEASURED NEITHER.** S133/S134: `relay_post_from_lane`
  is defined, granted, tested, uncalled. `cwf-open-items-register-v125` §3: it does have callers and files
  every lane report under `operator`, making the defect AUTHOR LOSS. Carried as an explicit disagreement.
- **VERCEL SILENCE ON A MASTER PUSH IS A DESIGNED SKIP.** `scripts/vercel-ignore.mjs` cancels docs-only
  pushes. Read the ignore script before reading the silence.
- **LIVENESS IS POSITIVE ONLY, AND AT THIS CLOSE IT SAYS ALMOST NOTHING.** AG-4's heartbeat stops at
  03:16:52Z and AG-5's at 03:15:05Z — the same minutes the bridge dropped, which is consistent with the
  owner's machine sleeping and is **NOT a death reading**. AG-1, AG-2 and AG-3 carry heartbeats from
  09-10.
- **`npm run build` RUNS SIX STEPS:** `tsc -b`, `typecheck:api`, `gen:arch-facts`, `check:ground`,
  `vite build`, `check:doc-drift`. `check:doc-drift` is NOT a workflow — it is the LAST command of that
  build, inside step `Build`, inside job `build (24.x)`, inside `Build and Test`. `npm run reseal` is the
  only way past it (RULE 20).
- **The adversary gate lift is NARROW** (§12.1): liftable only for a card that REPEATS a superseded card's
  subject. A NEW subject goes to the scout, and the card says so.
- **Every hand-written bus insert carries md5 AND sha256 `WHERE` preconditions.** Still true, still the only
  lens that catches silent transport corruption.

---

## 9 · STATE AT CLOSE

```evidence:state-live
MEASURED LIVE 2026-09-13T07:39:04Z through Supabase MCP:
bus rows          1593, latest row 2026-09-13T03:06:36Z
                  (NOTICE-YOUR-REFUSAL-WAS-CORRECT-S137-1-v1 → AG-4, consumed 03:07:07Z)
factory mode      READY
lanes             AG-4 WORKING hb 03:16:52Z · AG-5 CLAIMED hb 03:15:05Z
                  AG-1/AG-2/AG-3 WORKING, heartbeats 2026-09-10T06:39–06:40Z
                  operator CLOSED · scout CLOSED
```

```evidence:state-carried
LAST MEASURED BEFORE THE BRIDGE DROPPED — CARRIED, NOT CURRENT:
master                     e95b0fdf4fdb4c53eba3f3561b0eae0ac50f81c5   (19:45Z, 09-12)
phase/ask-rendered-twice   ce3f785ec0692c79c7583c5a7047965aa1357594   PR 546 OPEN/MERGEABLE
documents origin/main      4b773c1e6b7f4f573e6a7674310e5d6fc0846baa   +4 local, UNPUSHED
CARD-LAND-ASK-RENDERED-TWICE-S137-1-v2  cb4923be — delivered to AG-4, REFUSED on route, CORRECTLY
HOLD to AG-5               df516325 — no pushes to that branch until the landing closes
SOTA scoreboard            NOT re-measured in S137; v122's 0/16 CARRIED UNVERIFIED
docs/laws                  rules 59 · constitution 16 — CARRIED from S136, not re-measured
REGISTER-BUG-BUCKET        v54 — FOURTH consecutive stale session
```

END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v138
