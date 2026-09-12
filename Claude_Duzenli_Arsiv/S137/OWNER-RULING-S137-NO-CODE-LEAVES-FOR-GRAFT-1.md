# OWNER-RULING-S137-NO-CODE-LEAVES-FOR-GRAFT-1

Given by the owner, 2026-09-12, in his own words, in the same breath as approving the four settings:

    dort kararini da onayliyorum, ve graft in hic bir sekilde bizim codumuzu as is yada ozeti olarak bile
    almasina izin VERME!

**No code leaves for graft. Not as-is, not as a summary.** That is absolute and it outranks convenience.

## IT RETRACTS ONE OF THE ARCHITECT'S OWN FOUR SETTINGS, AND THE ARCHITECT SAYS SO FIRST

Setting three read `GRAFT_PROVIDER=anthropic` with the factory's own key, so that "the build path stays with
the vendor already trusted with this code". Under this ruling that setting is WRONG, and it was wrong when
it was written: it moved the destination and left the departure intact. The owner corrected it one turn
later. Recorded here by name, beside the blind spot that produced it — the Architect optimised for which
vendor rather than asking whether anything should leave at all.

The replacement is stronger and simpler: **no `GRAFT_API_KEY` in any lane environment.** Not a chosen
provider — no key. With no key the model path throws instead of sending, so the rule is enforced by a
missing credential rather than by everyone remembering a flag. Fail-closed, not fail-polite.

## WHAT THE RULING COSTS, MEASURED — AND THE ANSWER IS ALMOST NOTHING

The Architect expected this ruling to make graft inert and was ready to recommend against landing `#535` on
that basis. Reading the package changed the answer.

```evidence:build-is-free
dist/cli.js, the build command's own description:

  "Build graft/ from your code — wiring graph + per-file cards ($0, no key).
   Add --deep for the LLM concept map + per-symbol summaries/crux."

  .option("--deep", "run the LLM pass: concept nodes (graft/*.md) + per-symbol summary/crux")
```

So the DEFAULT build is structural: tree-sitter parsing, a wiring graph and per-file cards, no key, no
network. The model is reached only by `--deep`, which is opt-in and typed by a person.

And the automatic paths — the ones the hooks drive, which are the whole reason a permission file is being
changed — are forbidden from the model by the package's own design, in its own comments:

```evidence:money-guard
dist/claude/sync-run.js line 6:
  /** MONEY GUARD: plain `graft build` only — structural, $0, offline. Never --deep. */

dist/graph/refresh.js line 15:
  * - **$0 and offline.** Tier-1 only — never a summarizer, never `--deep`. Same
```

The query path was already local: `dist/ask/ask.js` line 13 — *"v1 is deterministic and $0 (term-overlap
scoring, no LLM, no embeddings)."*

## WHAT `--deep` WOULD HAVE SENT, SO THE BAN IS UNDERSTOOD RATHER THAN OBEYED

It is not a digest. It is the files.

```evidence:what-deep-sends
dist/ai/summarize.js

  function userContent(code, path) {
      const clipped = code.length > MAX_CODE_CHARS
          ? `${code.slice(0, MAX_CODE_CHARS)}\n… (truncated at ${MAX_CODE_CHARS} characters)`
          : code;
      return `File: ${path}\n\n${clipped}`;
  }
```

One call per file, carrying the file's PATH and its SOURCE, clipped only for length. The owner's phrase
"as-is or even as a summary" turns out to describe the mechanism exactly: what crosses is the source, and
the summary is what comes back.

## THE SETTINGS AS THEY NOW STAND, ALL FIVE

1. `DO_NOT_TRACK=1` in every lane environment — closes telemetry by the convention the package honours
   unconditionally, ahead of its own setting.
2. PIN THE VERSION and record it in the repository. The resolver takes the highest version it finds across a
   hard-coded Homebrew path, package resolution and `npm root -g`; unpinned, two lanes on two machines
   inject different context for the same prompt.
3. **SUPERSEDED BY THIS RULING.** Was: name a provider. Now: **no `GRAFT_API_KEY`, anywhere.**
4. Never `GRAFT_BRAIN_TOKEN`. That is the path that posts a repository digest to `agents.nanonets.com`.
5. **NEVER `--deep`**, and it is written into the boot text rather than left to memory, because a person
   typing it is the only way the ban can break.

## THE ONE HOLE LEFT, NAMED

`.claude/skills/graft/SKILL.md` in `#535`'s diff instructs the agent about graft. Its own template line
reads: *"`build` is for the LLM layer (`--deep` adds a concept map; skip unless asked)"* — **"unless asked"
is exactly the door this ruling closes.** A lane that reads that sentence and is asked will run `--deep`.

The skill text must be amended before the landing, or the landing carries an instruction that contradicts an
owner ruling. With no key present the call would throw rather than send, so the harm is bounded — but a
governed factory does not rely on a missing credential to enforce a rule its own documents contradict.

That amendment joins the author-lens repair as a precondition of `#535`.

## WHAT REMAINS UNMEASURED

Whether the version installed on the owner's machine behaves as 0.18.0 does. The bridge cannot reach the
Homebrew path the resolver names.

Whether `graft init` sets a key or writes anything beyond `#535`'s diff.

END · OWNER-RULING-S137-NO-CODE-LEAVES-FOR-GRAFT-1
