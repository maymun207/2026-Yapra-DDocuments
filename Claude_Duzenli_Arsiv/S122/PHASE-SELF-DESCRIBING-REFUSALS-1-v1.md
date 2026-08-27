<!-- relay-audit: v1 kind=card -->
# PHASE-SELF-DESCRIBING-REFUSALS-1 · v1

A refusal that does not name its own rule teaches nothing. A lane meets `[FAIL] CP-8` and
learns that something is wrong; it does not learn which rule it broke, where that rule is
written, or what the accepted form looks like. So it guesses, edits, and runs again. This
card ends that loop by making every refusal carry its own instructions.

## PREMISE

MEASURED: 2026-08-27T20:41Z, `npx tsx scripts/cardPreflight.ts --check` over a fresh clone — the surfaces this card edits are enumerated in the scope fence below.
MEASURED: `git ls-remote origin refs/heads/master` — the full sha sits in the `evidence:anchor` fence.
ON-DISAGREEMENT: if your own `git ls-remote` disagrees with that sha, STOP and report the value you read; do not rebase onto it and do not proceed.
DECAYS the moment any card-grammar or hook file lands, because the refusal texts this card edits live in exactly those files.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master is the sha this card was written against | MEASURED: git ls-remote origin refs/heads/master | anchor |
| the preflight already emits a rule id and a title, and no pointer to a text home | MEASURED: npx tsx scripts/cardPreflight.ts --check, run against this card's own first draft | preflight |
| the bash guard emits rule and reason through one `refuse` helper | MEASURED: sed over .claude/hooks/guard-bash.py | guard |
| whether a refusal text is understood by a lane that has not seen the code | NOT-READ | the FALSIFIER orders that measured, and it cannot be read before the change |

```evidence:preflight
$ npx tsx scripts/cardPreflight.ts --check <this card, first draft>
[card:preflight] [FAIL] CP-3 every premise line carries its instrument or prints the third
value — premise line carries no instrument and no UNMEASURED: ```
The refusal names the rule and its title. It does not say what an instrument IS, does not
say where CP-3 is written, and fired on a fence delimiter. Three of the four things ORDER A
requires are missing from a refusal this card's own author met while writing it.
```

```evidence:anchor
$ git ls-remote origin refs/heads/master
2e1d193b5bf809228821d1934caa5bce474f3959
```

```evidence:guard
$ sed -n '97,101p' .claude/hooks/guard-bash.py
def refuse(rule: str, why: str) -> None:
    """Print the reason to stderr and BLOCK. Never exit 1 from here."""
    sys.stderr.write(f"[guard-bash] BLOCKED · {rule}\n{why}\n")
    sys.exit(EXIT_BLOCK)
One helper carries rule and reason. It has no field for a text home and no field for the
expected form, so ORDER A items 3 and 4 have nowhere to go until its signature widens.
```

```scope
- scripts/cardPreflight.ts — emits `[card:preflight] [FAIL] <id> <title> — <violation>`
- scripts/relayAudit.ts — emits a rule id and a message per violation
- .claude/hooks/guard-bash.py — `refuse(rule, why)` writes `[guard-bash] BLOCKED · <rule>`
- .claude/hooks/guard-mcp.py — refuses a route segment, exit 2
- .claude/hooks/guard-secrets.py — refuses a path, exit 2
```

## ORDER A — every refusal states four things

Each refusal emitted by any surface in the scope fence carries, in this order:

1. the rule id — `CP-n`, the tripwire name, or the fence name;
2. the rule itself in ONE sentence, in the imperative;
3. a pointer to where its text lives — a repository path — or, when the rule has no prose
   home, the literal marker `code-only; prose home pending T2-B`;
4. the expected form, shown rather than described.

The fourth is what ends the guessing. `short sha ... a prefix is ambiguous` states the
defect; it never states that the accepted form is the full forty characters.

## ORDER B — the marker is not a placeholder to be filled in here

A rule with no prose home carries the `code-only` marker verbatim. Do NOT write the prose
home in this card: that page is T2-B and it sits behind an owner review. A lane that invents
it here creates exactly the second copy this corpus already has too many of.

## ORDER C — prove each refusal by tripping it

For every surface in the scope fence, trip its check deliberately in a scratch context and
paste the resulting refusal text into the report. A refusal text nobody has read is a claim
about a string rather than a measurement of one. Where a surface refuses more than one way,
one worked example per surface is enough; name which one you chose and why.

## ORDER D — the arm that must not move

After the change, trip a genuine violation of each surface again and confirm it is still
refused. This card widens what a refusal SAYS. It must not widen or narrow what a refusal
CATCHES. If any check's verdict changes on any input, that is a defect in this card's
execution: stop and report it rather than adjusting the check to match.

## FALSIFIER

This card is wrong if, after it lands, a lane meeting any refusal still cannot name the
rule, find its home, and write the accepted form without asking. Test it that way: hand one
refusal text alone, with no other context, to a fresh window and ask it to produce a
conforming line. If it cannot, the refusal is still not self-describing and this card
failed, whatever its diff shows.

## SHARED SURFACES

`scripts/cardPreflight.ts` and `scripts/relayAudit.ts` are shared with every lane that mints
or lands. Touch ONLY refusal-message construction. Do not touch a regular expression, a
rule's predicate, an exemption set, or a verdict. A message change that alters a verdict is
outside this card's fence and must be reported, never made.

If your work would collide with another lane on these files, stop and report the collision.

## DECISION RIGHTS

The Architect decides the refusal wording contract in ORDER A. The lane decides the
implementation and the choice of worked example per surface. NOBODY decides inside this card
what any check catches; ORDER D fences it.

Two repair attempts per artifact. On a second refusal, STOP, attach both refusal texts
verbatim, and escalate. Do not mutate wording a third time to satisfy a validator.

BODIES: docs/laws/ constitution and rules · CLAUDE.md · the project box · the producer boot ·
the card grammar in scripts/cardPreflight.ts · the report grammar in scripts/relayAudit.ts ·
the hook fences · RULE-RUNTIME-CONSOLIDATION-DIRECTIVES-v1.1, items T1-4 and P-4.

fanout: personalized

Branch `phase/self-describing-refusals-1`. Push it to origin. Report to
`docs/relay/PHASE-SELF-DESCRIBING-REFUSALS-1-AG3-report.md`. Open a pull request against
master so the checks run on the request head.

TAIL ANCHOR: PHASE-SELF-DESCRIBING-REFUSALS-1-v1 ends here.
