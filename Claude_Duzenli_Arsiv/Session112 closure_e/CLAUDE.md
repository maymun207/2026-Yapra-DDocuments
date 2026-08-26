# CLAUDE.md

This file auto-loads at the start of every session in this repository and is
re-read from disk after compaction. It carries the DURABLE half of the lane boot:
the parts that do not change from one session to the next.

**NO NUMBER APPEARS IN THIS FILE.** Not a rule count, not an item count, not a
master sha, not an open-PR count, not a phase status. The reason is measured, not
stylistic: this project has twice carried a number in a document that nobody
re-measured, and both were wrong for days. A number in an auto-loaded file is that
defect industrialised — it becomes the unexamined premise of every session and
nobody is ever prompted to check it.

Where a number is needed, run `npm run architect:open` and read the nine fields.

**LAW TEXT IS NOT MIRRORED HERE EITHER.** `docs/laws/` is canonical. This file
points at it. A mirror goes stale silently and the staleness is not noticed.

---

## 1 · Working until the box is empty

**A LANE WORKS UNTIL ITS BOX IS EMPTY.** It does not stop, does not ask, and does
not report finished while a card sits in `public.relay_inbox` unactioned.

"Empty" is checkable and it means: no row addressed to you with a `created_at`
later than the last card you acted on. Read the box DIRECTLY by `created_at` — a
poller's high-water anchor is the newest row as of the START of your run, and a
card minted while you were busy is stepped over.

Every report prints the check: `read relay_inbox at <ISO>, box empty`. That
sentence is a MEASUREMENT and can be verified against `created_at`. "I am done" is
not a measurement and is not an ending.

Two things that look like exceptions and are not:

- **A stop order is not an exception.** Acting on a card that orders you to stop
  IS acting on it. Emptying means having ACTED on everything, not having FINISHED
  everything.
- **A blocked card is not an exception.** Do every part it orders that is not
  blocked, NAME the block and what you are waiting on, and move to the next card.
  Do not sit on a blocked card and call the box full.

**Asking a question you already have the answer to is not a stopping condition.**
Neither is finishing one item of a card that ordered several. The card IS the
permission: authorisation is a QUOTA, not a TRIGGER, and there is no GO per item,
per file or per commit.

**Create your own poll task as your first action**, before any other work. Roughly
ninety seconds between polls, a bounded budget rather than forever, and — the part
that matters most — a result that reports READ OK alongside the row count. A broken
poller returns zero rows and so does an empty box; only an explicit read-OK tells
them apart. Create it, then list it and print its id: do not assume it was created,
read it back.

Scheduled tasks fire only while the session is running and IDLE. A closed window
fires nothing. This ends the routine poke, not every poke.

## 2 · Claiming an address

Identity is not asserted in prose; it is won by the server.

Measure `refs/heads/lane/AG-*` first, but understand that the absence of a ref means
UNKNOWN, not FREE — the push is the referee. Build the nonce commit with
`git commit-tree`, never `checkout` plus `commit --allow-empty`: plumbing touches
neither the index nor the tree, and windows share a clone.

Claim with one atomic push using `--force-with-lease=<ref>:` — the empty
expectation means "this ref must never have existed". A `(stale info)` refusal is a
MEASUREMENT, not an error: the ref exists, so move to the next address. A refusal
for ANY OTHER reason — auth, DNS, a 403 — STOPS the walk. Laundering an
infrastructure error as "that lane is taken" walks you past your own address.

After pushing, READ THE REF BACK. A zero exit says the write was accepted; it does
not say you hold the address.

Hold your claim until the Architect's final closing card releases it.

## 3 · Shell shape

- **Read `$?` unpiped.** `2>/dev/null` is forbidden: suppressed stderr is the same
  class of self-imposed deafness as a piped exit code.
- **Every bash call is ONE command.** No chains, no pipes, no heredocs. Permission
  rules match by command PREFIX, so a six-command chain cannot match one by
  definition. This is not a style preference — it is the precondition for the
  permission system working at all.
- **Write files with the editor tools.** Heredoc-to-file and string surgery are
  forbidden: an editor sees the file, a replace sees a string you remembered.
- **A message longer than one line goes in a FILE, passed with `-F`.** Never `-m`
  with a quoted multi-line string. A backtick inside double quotes is command
  substitution, and a commit message describing commands will EXECUTE them. This
  house learned that the hard way. `git commit -F <path>`; note that
  `git merge -F -` does not read stdin even though `git commit -F -` does.
- **Ask CI with the FULL 40-hex sha.** A short sha returns `total_count=0`, which
  reads byte-identically to "CI never ran" and is ALWAYS FAILED.

## 4 · Measurement discipline

- **A tool that cannot look must not answer.** "I could not read" is never reported
  as "I read, and the answer is no". Print the third value with its reason.
- **A single negative probe is not proof of absence.** An absence claim rests on
  lenses that could see DIFFERENT evidence — two greps of the same shape are one
  lens twice. Try other formulations, other catalogues, both languages.
- **Judge MERGED by CONTENT, not by ancestry.** A cherry-pick lands the same
  content under a different sha. `git diff --name-only master <branch>` shows
  master-ahead and is not an unlanded signal; the ancestry test answers the
  question actually asked.
- **A gate certifies a TREE, not a branch name.** A rebase cancels the certificate.
- **`cancelled` is neither `failed` nor a pass.**
- **The LABEL of a field is not its COMPUTATION.** Before making an indicator a
  premise, read the expression that produces it.
- **Prove a gate by planting a fault in the thing it guards**, not in a fixture
  that resembles it. Assertions over a test's own fixtures prove only the fixtures.
- **A check that defends its VOCABULARY rather than its PURPOSE is itself a
  defect.** So is a signal that barks on the majority case: it teaches its reader
  to ignore it, and is worse than no signal.
- **A diagnosed transient is not a licence to re-run.** If CI reproduces a local
  failure, that is a STRONGER signal and it is reported as such. Nobody retries
  until green.

## 5 · Delivery

Branch `phase/<card-name>`, push early and keep pushing — an unpushed branch makes
a working lane and a stopped one look identical. Report at
`docs/relay/<CARD>-AGN-report.md`. Open the pull request. **NEVER MERGE YOUR OWN
WORK** — that rule tracks who did the work, not who opened the PR, and no
measurement, wait or argument relaxes it.

The landing verdict lives in the MERGE COMMIT MESSAGE, never inside the tree being
merged. It names the item, the full sha, the CI run read, and what is still dark. A
SKIPPED job is named, never folded into the green.

Bringing master into a branch is `git merge origin/master` — never a rebase, never
`--force`, and not one byte of any file edited. A conflict means the other lane's
content is genuinely in play: STOP and report it. A concurrent push rejected as
non-fast-forward is a SAFE FAILURE and a MEASUREMENT — it means the other lane is
alive.

If the merge brings in a change to a sealed file, run `npm run reseal` in the SAME
commit. The only remedy for a seal conflict is reseal; hand-picking hunks never is.
Verify it the measured way: the re-derived digests must match the ones the gate
itself reported, and `git status` must show the seal as the only other change. A
reseal landing on different numbers proves only that something was written.

`RULE-49`: measure MERGED by content, THEN delete. A deletion is destructive and a
measurement carried from earlier is not a measurement, it is a memory.

Writing under `docs/ground/` follows the ground contract: provenance is
`MEASURED:` only, and `RELAYED` or `RECALLED` live under `docs/relay/`.

## 6 · Fences

**The MCP layer never carries backend-specific code.** Not in a condition, not in a
map, not in a default, not in a lookup table. A vendor name may appear only in a
provenance comment recording where an observation came from — and even there it is
a magnet for future special-casing. If you find yourself wanting one in a code
path, STOP and report.

**`--dangerously-skip-permissions` is forbidden.** A repository that governs itself
by gates does not disable the gate to go faster. An allow-list is a named,
reviewable, revocable decision; the flag is none of those.

**Do not route around a refusal.** When the harness refuses something, that refusal
is a measurement and usually a policy this project endorses. Choosing the route
around a refused mechanism is precisely the decision that should not be made by the
actor the refusal is aimed at. Report it and let the Architect rule.

Auto memory stays OFF. It is a store of RECALLED premises Claude writes to itself,
outside the repository, read by no gate and shown in no PR. This project keeps its
memory in `docs/ground/`, `docs/laws/` and `docs/relay/` — gated, versioned,
reviewable.

## 7 · Stopping

Five conditions, and they are the only ones:

1. A precondition you MEASURED has fallen.
2. An obstacle you cannot pass by measuring.
3. Work that would cross your card's scope or another lane's fence.
4. Destructive or replacing work — that needs named owner consent.
5. A card that contradicts a law or another card — REPORT IT, do not resolve it.

A card is authority but it is not a premise. Every correction made to the Architect
in this project's history came from a lane, and they were right. Measure the card,
and if it is wrong, say so with the bytes.

## 8 · Hygiene at close

Print `git worktree list` and remove your own with `git worktree remove` plus
`prune` — `rm -rf` alone leaves a stale record. Print
`git status --porcelain -uall` before removing anything, and if it is not empty NAME
the files rather than discarding them. Print both `git branch --merged` and
`--no-merged`; never delete an unmerged branch, name it. Leave the shared clone's
HEAD on master.

---

Canonical law lives in `docs/laws/`. Current measured state comes from
`npm run architect:open`. Neither is reproduced here, and if this file ever
contradicts either of them, they win and the difference is a bug.
