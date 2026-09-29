<!-- relay-audit: v1 kind=notice -->
ORDER-MEASURE-TOUR-SEAMS-S163-1

LANE: AG-1 (in mail-wait)
fanout: personalized (one lane, one body)
FROM: Architect, S163, 2026-09-29T02:45Z
AUTHORITY: OWNER-APPROVAL-S163-PLAN-1 (plan item 6) · OWNER-RULING-S161-CAPTURE-TOUR-1 (register 131: "KB7 Pişmiş stokta hangi işler bulunuyor?" must be answered truthfully in production) · OWNER-RULING-S153-NO-ARMES-HARDCODE-1.
WHAT: a READ-ONLY MEASUREMENT. No branch, no commit, no PR (one open PR at a time: AG-4 holds the slot). Its output is the ground for two small cards the Architect cuts next.
FIRST: PR 634 is on master (1a6279e0c3eddf5ac331b38f5c028b5f17668690). If your mail-wait runs from a worktree older than that, `--take` cannot stamp (your two S163 notices show consumed_at NULL). Run this order from a worktree at origin/master and quote the [STAMPED] line of your --take.
SOURCE: CWF-S161-TOUR-ASSESSMENT-PISMIS-STOK-v1 (project box / doc repo S161). The production trace: 1 search_tools {"query":"stok"} → [] · 2 search_tools {"query":"inventory"} → [] · 3 getInventoryCatalogue {"entityTypes":[],"factoryId":"KB7"} → [] · 4 getInventory {"factoryId":"KB7","entityTypes":[],"state":"ACTIVE"} → [] · 5 same with ["PRODUCT"] → [] · 6 getInventory {"factoryId":"KB7"} → validation failed: required entityTypes, state · 8–11 getMaterialImportRequest → [] ×3 + one transport error; answer prose: "… şu an için mevcut değildir".
NO CRON TASK. GRAFT: graft first (node cards + graft/.graph/wiring.json), git grep only for what graft does not index. SECURITY: never print, echo, printenv or cat any environment variable; never print a tool credential.

## MEASURE
S1 · search_tools. Find its implementation (file:line) and the INDEX it searches: which fields of a tool are indexed (name? description? keywords? Turkish arm?) and how the query is matched (exact token, prefix, BM25, vector). Then explain, by the code, why "inventory" returns [] while a tool named getInventory exists (camelCase not split? name not indexed? backend filter? catalogue not loaded for armes at that moment?). If a unit test or a local run can reproduce it WITHOUT a live backend (the index built from the stored catalogue), run it and quote the output. Name the ONE smallest change that makes every tool findable by its own name and its camelCase parts — and the test that would pin it.
S2 · getInventoryCatalogue / getInventory. Read the tool's INPUT SCHEMA as CWF stores it (the backend tool catalogue in the DB or data/, whichever the code reads — name the table/file and the row) and quote: the enum of entityTypes, the enum of state, and the description text of both tools. Say from the schema/description whether entityTypes:[] means "all" or "none". If the repo has a read-only path to call an ARMES tool from a lane (name the script), call getInventoryCatalogue for KB7 with EACH entityTypes enum value one at a time and quote row counts only (no row bodies); if there is no such path, write UNMEASURED and name what is missing — do not build one.
S3 · wrong-tool drift. From the stored catalogue, list every ARMES tool whose name or description contains inventory / stock / stok / WIP / buffer / fired / pişmiş — names only.
S4 · empty reported as zero. Find the compose stage that writes the final answer prose (file:line) and whether it RECEIVES the per-call outcome (empty [] vs error vs data) of the turn's tool calls. Find where the footer "⚠ N tool call(s) failed … incomplete data" is produced (file:line) — that code already knows the counts. Name the smallest wiring (§12.6: CONSUMER, not a new mechanism) that lets compose forbid an absence claim when every relevant call returned [] or failed, and the UI surface that must show "veri yok" distinctly (OWNER-RULING-S160-UI-UX-WITH-EVERY-CARD-1).

## SLIP
SLIP-MEASURE-TOUR-SEAMS-S163-1 (bus; if > 8192 chars, the bus row carries the summary + sha256 and the full text goes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S163/SLIP-MEASURE-TOUR-SEAMS-S163-1.md" — always write the file). Sections S1–S4, each: file:line evidence · verdict (MEASURED / UNMEASURED + what is missing) · the one smallest change. GRAFT line. Then back to `node scripts/mail-wait.mjs AG-1 --budget-min 480`.
FORBIDDEN: any edit, commit, push, PR, DB write other than your slip and stamp, cron; printing an environment value or a tool credential; printing ARMES row bodies.

END · ORDER-MEASURE-TOUR-SEAMS-S163-1
