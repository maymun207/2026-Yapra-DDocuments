<!-- relay-audit: v1 kind=notice -->
ORDER-REVIEW-CARD-APPLY-TOOL-ARG-POLICY-SEED-LINES-S141-1-v1

LANE: scout

Adversary review of CARD-APPLY-TOOL-ARG-POLICY-SEED-LINES-S141-1-v1 (bytes in the row named BYTES-FOR-REVIEW-CARD-APPLY-TOOL-ARG-POLICY-SEED-LINES-S141-1-v1; digests in `raw-tokens`). An OPERATOR card — the first of S141 — to apply the seed migration PR 577 landed (master in raw-tokens), by `supabase db push` under ADR-005. NEW subject → scout (§12.1). The Operator window is opened by the owner (PLATINUM-BREACH-S137-1 stands), so this review should not wait on him: measure and post.

DISCRIMINATORS, measure each and print what you measured:
(1) `git ls-remote origin refs/heads/master` NOW versus the card's `the-head`; `git show <master>:supabase/migrations/<file in raw-tokens>` — print the bytes' shape: INSERT ... ON CONFLICT DO NOTHING on public.tool_arg_policy, no UPDATE/DELETE/DDL. If any other statement is in the file, RED with the line.
(2) The row-set claim: the card names the five tools that hold rows today and says NONE for the two witness tools (the Architect's execute_sql at 03:33Z). You cannot read the table; say so, and instead confirm from the FIRST seed migration in the tree (the 20260817 seed) that exactly those five tools are seeded there and neither witness tool is — the tree's word, since the table's is refused to you.
(3) ADR-005 as written in the tree (docs/adr/ADR-005-supabase-apply-authority.md): confirm `supabase db push` is the named route and `apply_migration` is not; confirm the card orders nothing else.
(4) ORDER 4's read (`backend_tools.input_schema`) is READ-only and the card STOPs on a contradiction rather than editing a row — confirm the text says so.
(5) TENANT lens over the card body — tool names are vendor API identifiers already in the tree; no factory or line name.

VERDICT on ONE line first: `ADVERSARY-VERDICT: GREEN card=CARD-APPLY-TOOL-ARG-POLICY-SEED-LINES-S141-1-v1 sha256=<hex>` or RED with the discriminator number, with `reply_to` = THIS row's id. Bridge preflight GREEN on eleven checks at 2026-09-17T06:02:14Z after one refusal (the first draft lacked the card sections and carried UUIDs in an anchored fence; rewritten whole).

```evidence:raw-tokens
card md5        d65f9b961494f1db1f3cdce92b11995c
card sha256     24dc28f8062f225b13fdf369b5a4ece8b258887a60fef66ca2c1d7841dbf2939
card bytes      7212
master          d29935c1b87ce3878061061556689dc67006e411
migration file  supabase/migrations/20260917070000_tool_arg_policy_seed_armes_lines.sql
```
