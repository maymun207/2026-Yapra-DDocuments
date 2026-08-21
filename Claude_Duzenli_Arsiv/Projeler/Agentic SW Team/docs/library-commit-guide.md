# Library setup — commit guide (before D0.7b)

Commit the manifest and these documents to `agbuilder-platform/revolutionize` so the
document hub has content to render. Paths must match `docs/library/manifest.json` exactly.
Any document not committed yet renders a "not yet available" state in the hub — so you can
do this incrementally and documents light up as they land.

## 1. The manifest (required for D0.7b)

```
docs/library/manifest.json     ← the file I generated
```

## 2. Architecture HTMLs (already committed in D0.7a setup)

```
docs/architecture/01_revolutionize_architecture.html
docs/architecture/02_eaip_architecture.html
docs/architecture/03_bridge_revolutionize_builds_eaip.html   ← already serving on /
docs/architecture/04_eaip_connectivity.html
docs/architecture/05_revolutionize_connectivity.html
docs/architecture/06_eaip_schedule.html
docs/architecture/07_revolutionize_schedule.html
docs/architecture/08_leadership_charter_bilingual.html
docs/architecture/ARDICTECH_Platform_v6_SSoT_bilingual.html  ← the one you just added
```

→ If you committed any of these to a different path, either move it to match, or edit
   that document's `file` field in the manifest. The manifest is the contract.

## 3. ADRs

```
adrs/ADR-001-litellm-llm-gateway.md
adrs/ADR-002-mcp-external-tool-protocol.md
```

→ I used the repo's existing root `adrs/` folder (per the repo README). If your ADRs are
   elsewhere, adjust the two `file` fields in the manifest.

## 4. Process docs

```
docs/library/phase_0_runbook.md
docs/library/dev_schedule_patch_v1.md
```

→ These two live in your project files. Commit them under `docs/library/`.

## Path-mismatch is safe

D0.7b's Step 0 fetches every `file` path in the manifest and reports which resolve and which
404. Anything that 404s simply shows "not yet available" in the hub — no crash, no broken link.
So if a path is slightly off, the hub still works; you fix the path (or commit the file) and it
appears. Nothing is blocked by an incomplete commit.

## Minimum to run D0.7b

Just the manifest + the 9 architecture HTMLs (already done). The ADRs and process docs can
follow after — they'll appear in the hub the moment they're committed and the manifest path
matches.
