<!-- relay-audit: v1 kind=card -->
# PHASE-SELF-DESCRIBING-REFUSALS-1 · v4

A refusal that does not name its own rule teaches nothing. A lane meets `[FAIL] CP-8` and
learns that something is wrong; it does not learn which rule it broke, where that rule is
written, or what the accepted form looks like. So it guesses, edits, and runs again. This card
ends that loop by making every refusal carry its own instructions.

**v2 supersedes v1, which three scout windows refused independently.** v1 was wrong in a way
worth stating: it assumed no rule here has a prose home. Two of the six surfaces already have
one, and one of them is GENERATED from the code. A card that had ordered `code-only` stamped
onto eleven rules whose home sits at a known path would have written a durable falsehood into
the exact strings meant to end guessing.

## PREMISE

MEASURED: 2026-08-27T21:20Z, `wc -c`, `grep -n` and `npx tsx scripts/cardPreflight.ts --check` over a fresh clone; every surface and every prose home named below was opened, not recalled.
MEASURED: `git ls-remote origin refs/heads/master` — the full sha sits in the `evidence:anchor` fence.
ON-DISAGREEMENT: if your own `git ls-remote` disagrees with that sha, STOP and report the value you read; do not rebase onto it and do not proceed.
DECAYS the moment any file in the scope fence lands, because the refusal texts this card edits live in exactly those files.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master is the sha this card was written against | MEASURED: git ls-remote origin refs/heads/master | anchor |
| CP-1 through CP-11 already have a prose home, and it is GENERATED from the code | MEASURED: grep over docs/ground/CARD-PREFLIGHT-v1.md for its section headings and its provenance line | homes |
| the relay rules have a prose home, and the canonical one is v2 rather than v1 | MEASURED: grep for GRAMMAR_DOC in scripts/relayAudit.ts | homes |
| the three hooks and the guard shim have NO prose home | MEASURED: grep for their fence names across docs/ | homes |
| `REFUSED-CHECKS=` on stdout is a machine contract with a live consumer and a pinning test | MEASURED: grep -n REFUSED-CHECKS over scripts/mail-wait.mjs and the preflight unit test | contract |
| the guard shim is a sixth refusal emitter, absent from v1's fence | MEASURED: grep -n over .claude/hooks/guard.sh | sixth |
| guard-secrets takes its arguments in the reverse order of its siblings and has no reason field | MEASURED: grep -n "def refuse" over the three hook files | signatures |
| the relay auditor carries 19 distinct rule ids, none with a prose field | MEASURED: count of the rule-id entries in the RULES map in scripts/relayAudit.ts | proof |
| a verdict-preserving proof corpus already exists | MEASURED: file count of the relay-audit fixture directory and ls over the hook test files | proof |
| whether a refusal text is understood by a lane that has not seen the code | NOT-READ | the FALSIFIER orders that measured, and it cannot be read before the change |

```evidence:anchor
$ git ls-remote origin refs/heads/master
2e1d193b5bf809228821d1934caa5bce474f3959
```

```evidence:homes
$ wc -c docs/ground/CARD-PREFLIGHT-v1.md docs/relay/RELAY-AUDIT-GRAMMAR-v2.md
13940 docs/ground/CARD-PREFLIGHT-v1.md
10197 docs/relay/RELAY-AUDIT-GRAMMAR-v2.md
$ grep -oE '^### CP-[0-9]+' docs/ground/CARD-PREFLIGHT-v1.md | tr '\n' ' '
### CP-1 ### CP-2 ### CP-3 ### CP-4 ### CP-5 ### CP-6 ### CP-7 ### CP-8 ### CP-9 ### CP-10 ### CP-11
$ head -4 docs/ground/CARD-PREFLIGHT-v1.md          # frontmatter delimiter and schema line ELIDED
artifact: CARD-PREFLIGHT-v1
provenance: MEASURED:npx tsx scripts/cardPreflight.ts --write-artifact
$ grep -n 'GRAMMAR_DOC' scripts/relayAudit.ts       # FIRST of 4 hits; 133, 142, 151 elided
81: export const GRAMMAR_DOC = 'docs/relay/RELAY-AUDIT-GRAMMAR-v2.md';
A v1 of that grammar file also exists and is NOT the canonical one. Point at v2.
NOTE FOR THE LANE: one of the elided hits, line 151, reads "prose ${GRAMMAR_DOC} — reasoning
only; NOT the authority for the kind list". That caveat is about the KIND LIST, not about where
the R- rules' text lives, so it does not disturb ORDER B — but you will meet it in the file.
```

```evidence:contract
$ grep -n 'REFUSED-CHECKS' scripts/mail-wait.mjs api/cwf/__tests__/cardPreflight.test.ts
scripts/mail-wait.mjs:1007:  const line = /^\[card:preflight\] REFUSED-CHECKS=(.*)$/m.exec(out);
api/cwf/__tests__/cardPreflight.test.ts:235: expect(out).toContain('[card:preflight] REFUSED-CHECKS=CP-10');
The prose refusals go to stderr; this line goes to stdout and is PARSED. The split is the
contract, and the preflight's own source comment says the prose above it is free to change
while this line is not.
```

```evidence:sixth
$ grep -n 'BLOCKED' .claude/hooks/guard.sh
77: printf '%s\n' "[guard.sh] BLOCKED · the guard '$want' could not be located." >&2
```

```evidence:signatures
$ grep -n 'def refuse' .claude/hooks/guard-*.py
guard-bash.py:97:   def refuse(rule: str, why: str) -> None:
guard-mcp.py:99:    def refuse(rule: str, why: str) -> None:
guard-secrets.py:66: def refuse(path: str, rule: str) -> None:
The third is reversed AND has no reason field. Widening its signature is IN scope.
```

```evidence:proof
$ ls api/cwf/__tests__/fixtures/relay-audit/*.md | wc -l
30
$ ls .claude/hooks/*.test.py
guard-bash.test.py  guard-mcp.test.py  guard-secrets.test.py
$ grep -cE "^\s+[A-Z_]+: 'R-" scripts/relayAudit.ts
19
Nineteen rule ids in a flat map with no title and no requirement field, against eleven
preflight checks that each already carry both. The auditor is the larger half of this job.
```

```scope
- scripts/cardPreflight.ts — 11 checks, one emitter; home EXISTS at docs/ground/CARD-PREFLIGHT-v1.md
- scripts/relayAudit.ts — 19 rule ids across 5 render sites, no prose field on any; home EXISTS at docs/relay/RELAY-AUDIT-GRAMMAR-v2.md
- .claude/hooks/guard-bash.py — refuse(rule, why), 4 call sites; NO home
- .claude/hooks/guard-mcp.py — refuse(rule, why), 2 call sites; NO home
- .claude/hooks/guard-secrets.py — refuse(path, rule), reversed, no reason field; NO home
- .claude/hooks/guard.sh — one refusal at line 77; NO home
```

## ORDER A — every refusal states four things, IN ADDITION to what it already says

Each refusal emitted by any surface in the scope fence carries:

1. the rule id — `CP-n`, the `R-` rule name, or the fence name;
2. the rule itself in ONE sentence, in the imperative;
3. a pointer to where its text lives, per ORDER B;
4. the expected form, shown rather than described — **or, where no conforming form exists, the
   accepted alternative.** A secret path has no conforming spelling; the honest fourth element
   there is the route that is allowed instead.

**ADDITIVE, NEVER SUBTRACTIVE.** These four are added to what each refusal already carries.
Nothing is removed — above all not the offending value.

**AND THE NET IS ALMOST ENTIRELY ABSENT, WHICH IS WHY THIS IS AN ORDER RATHER THAN A HINT.**
Exactly ONE landed assertion protects it: `.claude/hooks/guard-secrets.test.py:131`
(`proc.returncode == 2 and named in proc.stderr`). On the other five surfaces — guard-bash,
guard-mcp, guard.sh, cardPreflight and relayAudit — a lane could drop the offending value and
every item in the ORDER D proof-set would still pass green. The guilty-case loops in
`guard-bash.test.py` and `guard-mcp.test.py` assert the exit code and nothing else; the other
`in proc.stderr` hits in those files are exit-ZERO allow-path checks, not refusals. So on five
of six surfaces the additive property rests on you, unenforced. Verify it by reading your own
refusal output, not by watching the suite go green.

## ORDER B — point at the home that exists; use the marker only where none does

* `CP-1` … `CP-11` → **`docs/ground/CARD-PREFLIGHT-v1.md`**.
* the `R-` rules → **`docs/relay/RELAY-AUDIT-GRAMMAR-v2.md`**, never the v1 file, which exists
  and is not canonical.
* the hooks and the guard shim → the literal marker `code-only; prose home pending T2-B`.

**`T2-B` IS AN OWNER-HELD PROGRAM ITEM AND IS NOT IN THIS REPOSITORY.** Do not grep for it and
do not write it. That page is gated behind an owner review, and inventing it here creates
exactly the duplicate home this corpus already suffers from.

## ORDER B-2 — the CP prose home is GENERATED; regenerate it, never hand-edit it

`docs/ground/CARD-PREFLIGHT-v1.md` is produced by `npx tsx scripts/cardPreflight.ts
--write-artifact` and carries its own provenance line. If your change touches any check's
`title` or `requirement`, run that command and land the regenerated file in the same branch.
**Do not hand-edit it** — a hand-edit is a second vocabulary that goes stale on its own
schedule, and the file says so itself.

## ORDER C — prove each refusal by tripping it, and paste it where the grammar allows

For every surface in the scope fence, trip its check deliberately and paste the resulting
refusal text into the report **inside an `evidence:`-prefixed fence**. This is not house style:
the report grammar's `R-TRIP-HEX` refuses any bare 7-to-40 character hex run outside the CLAIMS
table and the evidence and diff fences, and several refusal texts **echo the token that tripped
them**. Pasting such a refusal into prose reds your own report on a collision this repository
has already recorded once.

The hooks are stdin-JSON programs, so tripping one is a pipe rather than a blocked tool call.
One worked example per surface is enough; name which one you chose.

## ORDER D — the arm that must not move, with its boundary and its instruments

This card widens what a refusal SAYS. It must not widen or narrow what a refusal CATCHES.

**The proof corpus is exactly this, and "unchanged" means unchanged across it** — not across
every conceivable input, which no instrument can demonstrate:

```proof-set
- npx tsx scripts/cardPreflight.ts --self-test
- npx tsx scripts/relayAudit.ts --self-test
- the 30 markdown fixtures under api/cwf/__tests__/fixtures/relay-audit/
- .claude/hooks/guard-bash.test.py
- .claude/hooks/guard-mcp.test.py
- .claude/hooks/guard-secrets.test.py
```

Snapshot the verdicts before your change, re-run after, and diff. Report both.

**THE RULING YOU WOULD OTHERWISE HAVE TO GUESS AT.** A test that asserts on refusal *text*
rather than on a verdict may be updated to match a new message — that is not "adjusting the
check to match", because the verdict is untouched. A test that asserts on a **verdict, an exit
code, or a rule id** may NOT be updated: if one of those goes red, your change altered
behaviour, and you stop and report rather than edit the test. State in the report which
assertions you touched and which class each was in.

**A COMPOUND ASSERTION IS A VERDICT ASSERTION.** Where one line tests a verdict AND a text
together, it is a verdict test and may NOT be weakened, split, or relaxed on the strength of
its text half. This is not hypothetical: `guard-secrets.test.py:131` is exactly that shape, and
it is the single assertion protecting ORDER A's additive rule. Without this sentence a lane
could red it by widening `refuse`, reclassify it as a text test, and delete the only net in the
repository — while believing it had obeyed both orders.

**ONE RED IS EXPECTED, AND IT IS THE SAFE KIND.** `guard-bash.test.py:236` is
`proc.returncode == 2 and "could not be located" in proc.stderr` — a compound assertion, and by
the rule above a verdict assertion. But the text it pins is `guard.sh`'s own wrapper message,
scope-fence surface six, which ORDER A and ORDER E require you to reword. **So expect that line
to red when you touch guard.sh.** It pins a wrapper message rather than an offending value, so
this is a false positive in the sense that behaviour did not change — but the rule stands:
**report it, do not relax it.** Say in the report that this is the anticipated red, name the
assertion, and show the before-and-after refusal text so the reader can see the verdict held.
If any OTHER verdict assertion reds, that is not this case and you stop.

## ORDER E — the hooks have no id namespace; mint one and say so

The hooks' `rule` argument is free text today. Mint a stable id per hook refusal, keep the
existing free text as the one-sentence rule, and list the ids you minted in the report. Do not
invent ids for `cardPreflight` or `relayAudit` — those already have them.

## FALSIFIER

This card is wrong if, after it lands, a lane meeting any refusal still cannot name the rule,
**know whether a home exists**, and write the accepted form without asking. Test it that way:
hand one refusal text alone, with no other context, to a fresh window and ask it to produce a
conforming line. If it cannot, the refusal is still not self-describing and this card failed,
whatever its diff shows.

## SHARED SURFACES

`scripts/cardPreflight.ts` and `scripts/relayAudit.ts` are shared with every lane that mints or
lands. Touch ONLY refusal-message construction. Do not touch a regular expression, a rule's
predicate, an exemption set, or a verdict.

**OUT OF BOUNDS, AND IT IS NOT A MESSAGE:** the `[card:preflight] REFUSED-CHECKS=` line on
**stdout**. It is parsed by `scripts/mail-wait.mjs` and pinned by the preflight's unit test.
Prose refusals go to stderr; that line goes to stdout unchanged. Enriching it would break the
box reader while looking exactly like the message improvement this card asks for — the card's
own failure mode, one level up.

If your work would collide with another lane on these files, stop and report the collision.

## DECISION RIGHTS

The Architect decides the wording contract in ORDER A and the home mapping in ORDER B. The lane
decides the implementation, the minted hook ids, and the worked example per surface. NOBODY
decides inside this card what any check catches; ORDER D fences it.

Two repair attempts per artifact. On a second refusal, STOP, attach both refusal texts
verbatim, and escalate. Do not mutate wording a third time to satisfy a validator.

BODIES: docs/laws/ constitution and rules · CLAUDE.md · the project box · the producer boot ·
the card grammar in scripts/cardPreflight.ts and its generated home docs/ground/CARD-PREFLIGHT-v1.md ·
the report grammar in scripts/relayAudit.ts and its home docs/relay/RELAY-AUDIT-GRAMMAR-v2.md ·
the hook fences and their tests · OWNER-RULING-S122-T1-v1 · DIRECTIVES v1.1 items T1-4, P-4, P-9.

fanout: personalized

Branch `phase/self-describing-refusals-1`. Push it to origin. Report to
`docs/relay/PHASE-SELF-DESCRIBING-REFUSALS-1-AG3-report.md`. Open a pull request against master
so the checks run on the request head.

TAIL ANCHOR: PHASE-SELF-DESCRIBING-REFUSALS-1-v4 ends here.
