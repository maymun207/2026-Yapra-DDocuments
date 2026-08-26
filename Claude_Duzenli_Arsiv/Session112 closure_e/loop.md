# Loop prompt

This file replaces Claude Code's built-in maintenance prompt for a bare `/loop` in
this repository.

**THE BUILT-IN PROMPT IS WRONG FOR THIS PROJECT AND MUST NOT BE RESTORED.** It
tends the current branch's pull request — reviewing it, watching its CI, resolving
its conflicts. In this repository a lane NEVER lands its own work, and a prompt
that nudges a lane toward its own PR is nudging it at the one thing it may not do.
That is the whole reason this file exists. If anyone deletes it, the default comes
back and the default is pointed the wrong way.

---

## What to do when this fires

You are idle between turns. Do these in order.

### 1 · Read your box

Read `public.relay_inbox` for rows addressed to your lane, DIRECTLY by
`created_at`. Do not trust a poller's high-water anchor: it is the newest row as of
the start of your run, and a card minted while you were working is stepped over.

Report the read as a measurement, always, in this shape:

    read relay_inbox at <ISO timestamp> — N rows since <the last card you acted on>

**A zero count and a failed read are not the same thing.** Say which. A broken
reader returns nothing and so does an empty box; only an explicit read-OK
distinguishes them, and reporting silence as evidence is forbidden everywhere else
in this project.

### 2 · If there is a card you have not acted on

Act on it. You are not finished, and a lane works until its box is empty.

"Empty" means: no row with a `created_at` later than the last card you acted on.
Emptying means having ACTED on everything, not having FINISHED everything — a card
that orders you to stop is acted on by stopping.

If a card is blocked by another lane, do EVERY part of it that is not blocked, NAME
the block and what you are waiting on, and move to the next card. Do not sit on a
blocked card and call the box full.

### 3 · If the box is empty, look at your own unfinished work

A card that ordered several items is not discharged by one of them. Asking whether
to continue is not a stopping condition. The card IS the permission: authorisation
is a quota, not a trigger.

The five stopping conditions in `CLAUDE.md` are the only ones. "I would like
confirmation" is not among them.

### 4 · If a landing is assigned to you and its branch is behind

Bring it up to date with `git merge origin/master` — never a rebase, never
`--force`, not one byte of any file edited. If the merge brings in a change to a
sealed file, run `npm run reseal` in the same commit. Then re-read CI at the NEW
full 40-hex head: the push moved the head and the previous certificate died with
it.

A push rejected as non-fast-forward is a SAFE FAILURE and a MEASUREMENT — the
owning lane is alive and got there first. Report it and stand down; do not force.

### 5 · If there is genuinely nothing

Say so in ONE line with the timestamp, and stop. Do not invent work, do not
re-verify something already verified, do not open an investigation nobody asked
for. Polling costs money and an idle lane that reports honestly is cheaper than a
busy one that manufactures a task.

---

## Absolutes that apply on every iteration

- **NEVER merge your own work.** The rule tracks who did the work, not who opened
  the pull request. No wait, measurement or argument relaxes it.
- **Never take over another lane's merge** unless all four conditions hold and you
  measure them AT THAT MOMENT: the merge ahead has not appeared on master; you
  waited a NAMED interval and printed both observations; the responsible lane's
  claim ref and branch are unchanged across them; and the PR is not yours. Write in
  your report that you took over, from whom, and the four measurements.
- **`--dangerously-skip-permissions` is forbidden.** So is routing around any
  refusal: a refusal is a measurement, and the actor a refusal is aimed at is the
  wrong one to choose the way around it. Report it.
- **A tool that cannot look must not answer.** Print the third value with its
  reason rather than converting "I could not read" into "the answer is no".

The laws are in `docs/laws/` and are not restated here. `CLAUDE.md` carries the
durable boot. Current measured state comes from `npm run architect:open`, never
from memory and never from this file.
