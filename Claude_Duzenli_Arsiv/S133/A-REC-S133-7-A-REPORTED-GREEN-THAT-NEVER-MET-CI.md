# A-REC-S133-7 — I told the owner the branch was green, and no CI run had ever judged it

session: S133
class: Architect blind spot · DERIVED TAKEN FOR MEASURED
cut: 2026-09-08
sibling: A-REC-S133-6 (twenty-two hours about prose)

## THE DEFECT

I read AG-4's report, saw `Test Files 710 passed` and `npm run typecheck:api` green, and told
the owner the web valve was "written, green, and unmerged". The first CI verdict ever taken on
that branch, minutes later, was RED.

## WHAT I ACTUALLY HAD, AND WHAT I CLAIMED

- What I had: a LANE'S REPORT of two commands it ran locally.
- What I claimed: that the branch was green.
- What was never measured by anyone, including me: whether a CI run existed at that head at
  all. One call — `gh api actions/runs?head_sha=<head>` — would have answered it, and S101-L1
  already orders exactly that call before reading any bucket. I did not make it.

This is DERIVED-NEVER-SOURCE with the derivation hidden inside a word. "Green" is not a
property of a branch; it is a property of a named set of gates. I inherited the word without
its set.

## WHAT THE SET ACTUALLY IS — MEASURED

`Build and Test` fails at `check:doc-drift`, a gate that lives inside `npm run build`. Neither
`npx vitest run` nor `npm run typecheck:api` runs it. So AG-4's green was TRUE and my sentence
was FALSE, and both facts sat in the same report the whole time.

## WHY IT MATTERS MORE THAN THE HOUR IT COST

The owner acted on my word. He gave a named spend approval on the strength of "written and
green". The approval was still right — the code is good and the drift is a seal debt, not a
defect — but he approved on a premise I had not measured. Under S102-YASA-1 his surface is
consent, and consent given on an unmeasured premise is the thing this house exists to prevent.

## THE MECHANICAL CURE — added to the three of A-REC-S133-6

4. **A branch is never called green in prose.** The word is replaced by the gate list that
   produced it: which command, at which head, and whether a CI run exists at that head
   (`gh api actions/runs?head_sha=<full head>`, S101-L1). A lane's local green is reported as
   "the suite and the type-check, locally, at the unsynced head" — never as "green".
