# Stage S1 — Tab↔Section Mapping & SSoT Recon (READ-ONLY)

> **Type:** Recon · no code changes, no commits, no PR · the fact base S2 builds on
> **Author:** Claude (architect)
> **Purpose:** Lock the canonical mapping of the tool's 8 content tabs → the v6 SSoT's sections, measure the one known gap (the **Bridge** tab), and gather the mechanism facts S2 needs (how to pre-select a section + hide the SSoT's own nav when framed). We carve nothing into a decision record until these facts are in.

---

## 0. Hard rules

- **READ-ONLY.** No edits, no commits, no branches, no PR. Report only.
- **Run ONLY this stage.** Do not act on the migration plan or any later stage. This is S1 alone.
- **Two repos, both read-only:**
  - `agbuilder-platform/revolutionize` (content) — the SSoT: `docs/architecture/ARDICTECH_Platform_v6_SSoT_bilingual.html`
  - `maymun207/TheBluePrint23` (app) — the React content tabs.
- **Evidence for every claim** — `file:line` or a short excerpt. No assertions from memory. (We've had inaccurate self-reports; this must be ground-truthed.)
- If anything is ambiguous, **report the ambiguity** rather than resolving it yourself.

---

## 1. Confirm the 7 clear mappings

For each tab below, confirm in the SSoT that the named section render-function **and** its target element ID both exist. Report `file:line` for each.

| Tool tab | SSoT render fn | Element ID |
|---|---|---|
| Big Picture | `renderBig` | `sec-big` |
| EAIP Arch | `renderEarch` | `sec-earch` |
| EAIP Conn | `renderEconn` | `sec-econn` |
| EAIP Sched | `renderEplan` | `sec-eplan` |
| Rev Arch | `renderRarch` | `sec-rarch` |
| Rev Conn | `renderRconn` | `sec-rconn` |
| Rev Sched | `renderRplan` | `sec-rplan` |

Flag any that don't exist or are named differently.

## 2. The Bridge gap (the key question)

The tool has an **8th** content tab — **Bridge** — with no obvious SSoT section.

- **2a.** List the actual content the Bridge tab renders. Read its components (`app/bridge/page.tsx` + children: `BridgeOverview`, `BridgeGates`, `BridgeRouting`, `BridgeRisks`, `BridgeSkill`, `BridgeKick`, `BridgeOpens` — confirm the real set). For each, one line: what content/section it shows.
- **2b.** For each piece of Bridge content, report whether equivalent content exists **in the SSoT** (in `renderBig` or anywhere else) — with `file:line` if present, or "absent" if not. Be specific: gates, routing, risks, skill-transfer, kickoff readiness, open questions/prereqs.
- **2c.** Report the **gap**: which Bridge content is NOT in the SSoT today, and roughly how much (a paragraph? a whole sub-section? several?).
- **2d.** Also check the standalone `docs/architecture/03_bridge_revolutionize_builds_eaip.html` and `08_leadership_charter_bilingual.html` — does either already contain the Bridge tab's content, so S2 could source it from there rather than re-author it?

## 3. The Big Picture mapping correction

INV-1 found the app's root currently frames `03_bridge_…html` but labels it "Big Picture," while the real Big Picture is `renderBig` in the SSoT.
- Confirm what the Big Picture tab renders today (`file:line`).
- Confirm `renderBig`'s content (what sections/cards it shows) so we know the intended Big Picture source. Note any content the current Big-Picture-tab framing has that `renderBig` lacks, or vice-versa.

## 4. Embed-mode + section-entry mechanism recon (for S2)

S2 must frame the SSoT showing **one** section, with the SSoT's **own** internal nav hidden (so there's no double row of tabs under Choice 2). Report the facts S2 needs:
- **4a.** How does the SSoT switch sections? Read `switchTab` (around line 156) — what does it do, what arg does it take (section key), and how is the active section shown/hidden?
- **4b.** How is the SSoT's own nav/header rendered (the tab bar at ~line 141/720)? Could it be hidden cleanly via a flag (e.g. a body class or a `window.__EMBED` check) without breaking section rendering? Report the relevant markup/JS.
- **4c.** How does `setLang` (lang toggle, ~line 137) work, and is the lang state independent of section state? (S2/S6 will drive lang from the app shell.)
- **4d.** Note: the app frames docs via `DocumentFrame` using `srcDoc` (inline HTML), **not** a `src` URL — so `?section=…` query params won't reach the SSoT directly. Confirm this, and report the cleanest injection point for S2 to pass `{section, embed}` into the SSoT (e.g. prepend a `<script>window.__EMBED={section:'earch',embed:true}</script>` before the SSoT's own script runs). Identify where the SSoT's `<script>` block starts so we know the injection must precede it.

---

## 5. Output

1. **Mapping table** — the 8 tabs → SSoT sections, with the Bridge row resolved as either *"maps to existing X"* or *"needs a new Bridge section (content absent / partially present)"*, evidence-backed.
2. **Bridge gap summary** — what's missing, how much, and whether 03/charter can source it.
3. **Big Picture correction** — current vs intended source.
4. **Mechanism notes** — switchTab / nav-hide / setLang / injection point, as S2 inputs.
5. **One recommendation line** for the Bridge tab: new SSoT section vs expand `renderBig` vs source-from-03.

**Report all of the above. Change nothing.** I'll lock the mapping from this, write the decision record, and scope S2.
