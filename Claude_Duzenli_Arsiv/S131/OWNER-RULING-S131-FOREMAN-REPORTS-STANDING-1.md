# OWNER-RULING-S131-FOREMAN-REPORTS-STANDING-1 — for the rest of S131, the foreman's own docs/relay-only observation-report PRs land under the owner's standing order, CI green at the synced head; the order lapses at S131 close

Owner's word in the Architect chat, 2026-09-07T04:4xZ (07:4x TSİ), verbatim:

> OWNER-RULING-S131-FOREMAN-REPORTS-STANDING-1: onay — S131 kapanana kadar foreman'ın yalnız docs/relay/ altına dokunan kendi gözlem-raporu PR'ları, senkron head'de CI yeşil olmak şartıyla, sahibin daimi emri sayılarak foreman tarafından indirilir; S131 kapanışında bu emir düşer.

## OPERATIVE TERMS

1. Scope: pull requests whose author lane is AG-5 (AUTHOR-SUBJECT), whose every changed path starts with `docs/relay/`, and whose CI at the synced head shows `build (24.x)`, `report-schema` and `relay corpus (grammar v1)` success. Such a PR is landed by the foreman under this standing order; the landing block names this ruling.
2. It covers PR #502 (`phase/land-499-1`), the report PR of CARD-LAND-HOLDS-REPORTS-1, and every later foreman report PR minted in S131 — including the report of the card that drains them.
3. It does NOT cover any PR touching a path outside `docs/relay/` (§5 in full), nor any PR authored by another lane (OWNER-RULING-S131-REPORT-ONLY-DRAIN-1 already covers author ≠ lander report-only PRs).
4. It LAPSES at S131 close. CWF-S131-SESSION-CLOSE-v1 records the lapse; bootstrap v132 does not carry it as a standing ruling — a new session needs a new word.
5. Why a standing order and not a widening of ⑤: ⑤ keeps a foreman's own report out of self-landing so that a person decides it. This ruling IS that person's decision, given once for a bounded set (this session's report PRs) instead of once per PR; the ⑤ text and the land.ts predicate are untouched.

TAIL ANCHOR: OWNER-RULING-S131-FOREMAN-REPORTS-STANDING-1 ends here.
