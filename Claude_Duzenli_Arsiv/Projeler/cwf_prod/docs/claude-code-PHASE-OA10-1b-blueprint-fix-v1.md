# PHASE OA10-1b — Blueprint tab correction + push discipline (doc-only) — v1

> **Version:** v1 · rev 1 · 2026-07-02 · Author lane prompt (Claude Code on AntiGravity)
> **Baseline:** local `7086e15` (changelog seal) on top of `e609d99`; origin/master currently at `e609d99`
> **Type:** doc-only. ZERO source-code changes. If any file outside `public/architecture/`, `.agents/` is touched, you are out of scope — STOP.

---

## 0 · Why this phase exists (two findings from the architect's review)

1. **The in-app blueprint tab seals the WRONG content.** During OA10-1 you could not see the project-side `cwf-agent-control-plane-blueprint-v2_1.html`, so you rebuilt the repo tab from v1 framing. The v1 framing ("buy the telescope, build the microscope" — replay as a wholesale build differentiator) was **falsified by SOTA verification** (Jul 2026): the replay/experiment substrate is buyable (Langfuse Experiments; Laminar/LangGraph Studio/Braintrust already ship replay), stage-10 replay resolved to a **recorded-stub** from `messages.raw_tool_results`, and the empty-completion experiment sources inputs from `messages.content` (unredacted) making it **buildable pre-F-obs**. The manifest reviewNote claim "matrix CELLS unmoved, replay stays 0/14" sealed that wrong framing. The authoritative v2.1 file is embedded in §2 below — replace the tab with it **verbatim**.
2. **The unpushed-merge pattern repeated.** OA10-1's five commits sat local-only until prompted; now `7086e15` is local-only again. This becomes a standing rule (§3).

## 1 · Hard pre-flight gate

1. `git status` clean; `git log --oneline -2` shows `7086e15` then `e609d99`. If the tree is dirty or HEAD differs, STOP and report.
2. **Push the pending seal first:** `git push origin master && git rev-parse origin/master` → must print the `7086e15` full hash. Record it.
3. Confirm `public/architecture/diagrams/agent-control-plane-blueprint.html` exists and `public/architecture/manifest.json` says `docVersion rev 22`? — it should say **rev 21**; if it already says 22+, STOP and report (someone else moved it).

## 2 · The correction (branch `doc-oa10-1b-blueprint-v2_1`)

**2a.** Overwrite `public/architecture/diagrams/agent-control-plane-blueprint.html` with the EXACT content between the `BLUEPRINT-V2_1-BEGIN` / `BLUEPRINT-V2_1-END` markers below — byte-verbatim, no reflow, no reformatting, markers themselves excluded. After writing: `grep -c "recorded-stub\|messages.content\|buildable pre-F-obs" <file>` must return ≥ 3 and `grep -c $'\x00' <file>` must return 0 (the NUL lesson).

**2b.** Manifest reseal — `public/architecture/manifest.json`:
- `docVersion` → `rev 22 · 2026-07-02`.
- Blueprint tab entry: keep `lastSyncedCommit` at the OA10-1 code commit `53846ed` (the code state it depicts is unchanged); REDRAW note: *"OA10-1b: tab replaced with the project-side v2.1 (design authority) — v2 buy/build recalibration (OTel GenAI semconv + Langfuse Experiments = bought substrate; build = 4 domain lenses) + v2.1 milestone deltas (stage-10 replay resolved to recorded-stub from messages.raw_tool_results; empty-experiment inputs from messages.content, buildable pre-F-obs; UI home landed). Supersedes the OA10-1 reviewNote claim 'matrix CELLS unmoved / replay stays 0/14' — the replay column is re-scored buy/build, not flat-0."*
- reviewNote: state exactly the above supersession in one sentence (do not delete history; append).

**2c.** Push discipline rule — `.agents/AGENTS.md`: add the next free RULE number: *"A merge is NOT done until it is pushed: every phase/fix/doc seal ends with `git push origin master` + `git rev-parse origin/master` in the report, and the report states the remote hash. Never end a session with local-only commits; never ask whether to push — push, then report the hash."* Add a one-line CHANGELOG entry (house style).

**2d.** Seal: single doc-only commit on the branch → merge to master → **delete the branch** → `git push origin master`.

## 3 · Self-verification (evidence required)

1. Pre-flight transcript incl. the §1.2 push hash.
2. `git show --name-only <doc commit>` — ONLY `public/architecture/*` and `.agents/*` files.
3. The two greps from §2a (counts).
4. Manifest: `docVersion` line + the blueprint entry note (quote them).
5. Final: `git rev-parse origin/master` = the new merge hash; branch deleted (`git branch -a` shows no `doc-oa10-1b-*`).
6. Anything not completed → explicit **NOT DONE** section.

---

## The authoritative file (write verbatim)

BLUEPRINT-V2_1-BEGIN
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>CWF — Agent Control Plane · Blueprint · v2</title>
<style>
  :root{
    --bg:#0a0e14; --panel:#111a26; --panel2:#0f1722;
    --line:#1f2d3d; --line2:#2a3b4f;
    --ink:#dbe6f0; --ink-dim:#8aa0b6; --ink-faint:#5c7186;
    --cyan:#34d6e6;
    --observe:#34d6e6; --tweak:#d07bff; --replay:#ff6b7a; --stub:#2dd4bf;
    --buy:#67b3ff; --build:#3ad29f;
    --have:#3ad29f; --divergent:#7bc4ff; --partial:#e0a93b;
    --gap:#8aa0b6; --deferred:#c58bff;
    --mono:ui-monospace,"SF Mono","JetBrains Mono",Menlo,Consolas,monospace;
    --sans:ui-sans-serif,system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  }
  *{box-sizing:border-box}
  body{margin:0;background:
      radial-gradient(1100px 560px at 82% -8%, #10202c 0%, transparent 60%),
      radial-gradient(820px 460px at -8% 14%, #141018 0%, transparent 55%),
      var(--bg); color:var(--ink); font-family:var(--sans);
      -webkit-font-smoothing:antialiased; padding:26px 18px 72px; line-height:1.5}
  .wrap{max-width:1180px;margin:0 auto}
  a{color:var(--cyan)}

  header.top{border:1px solid var(--line);border-radius:14px;padding:24px 26px;
    background:linear-gradient(180deg,var(--panel),var(--panel2));position:relative;overflow:hidden}
  header.top::after{content:"";position:absolute;inset:0;
    background:repeating-linear-gradient(90deg,transparent 0 38px, rgba(52,214,230,.022) 38px 39px);pointer-events:none}
  .kick{font-family:var(--mono);font-size:11px;letter-spacing:.34em;text-transform:uppercase;color:var(--cyan);margin:0 0 10px}
  h1{font-size:30px;margin:0;letter-spacing:-.015em;font-weight:700}
  h1 .sub{display:block;color:var(--ink-dim);font-weight:400;font-size:16px;margin-top:7px;letter-spacing:0}
  .stamp{position:absolute;top:20px;right:24px;font-family:var(--mono);font-size:10.5px;color:var(--ink-faint);text-align:right;line-height:1.85}
  .stamp b{color:var(--have)}
  .thesis{margin:16px 0 0;padding:15px 17px;border:1px solid var(--line2);border-left:3px solid var(--cyan);border-radius:10px;
    background:linear-gradient(180deg,#0c1a20,#0b1318);font-size:14px;line-height:1.68;color:var(--ink)}
  .thesis b{color:#9fe9f3}
  .thesis .micro{color:var(--ink-dim);font-size:13px;display:block;margin-top:8px}
  .delta{margin:12px 0 0;padding:12px 15px;border:1px dashed var(--line2);border-left:3px solid var(--partial);border-radius:9px;
    background:#0d1119;font-size:12.5px;line-height:1.6;color:var(--ink-dim)}
  .delta b{color:var(--partial)}

  h2.sec{font-size:12.5px;font-family:var(--mono);letter-spacing:.22em;text-transform:uppercase;color:var(--cyan);
    margin:38px 4px 8px;display:flex;align-items:center;gap:12px}
  h2.sec .n{color:var(--ink-faint)}
  h2.sec::after{content:"";flex:1;height:1px;background:linear-gradient(90deg,var(--line2),transparent)}
  .lead{color:var(--ink-dim);font-size:13.5px;line-height:1.62;margin:2px 4px 18px;max-width:98ch}
  .lead b{color:var(--ink)}

  .spine{display:flex;flex-wrap:wrap;gap:7px;border:1px solid var(--line);border-radius:13px;
    background:linear-gradient(180deg,var(--panel),var(--panel2));padding:15px}
  .st{flex:1 1 120px;min-width:120px;border:1px solid var(--line2);border-radius:9px;padding:9px 10px 10px;
    background:#0c141d;position:relative}
  .st .num{font-family:var(--mono);font-size:9.5px;color:var(--ink-faint);letter-spacing:.06em}
  .st .nm{font-size:12px;font-weight:600;color:var(--ink);margin-top:3px;line-height:1.25}
  .st .dot{position:absolute;top:9px;right:9px;width:7px;height:7px;border-radius:50%}
  .d-have{background:var(--have)} .d-divergent{background:var(--divergent)}
  .d-partial{background:var(--partial)} .d-gap{background:var(--gap)} .d-deferred{background:var(--deferred)}
  .st.core{border-color:rgba(58,210,159,.4)} .st.div{border-color:rgba(123,196,255,.42)}
  .st.def{border-color:rgba(197,139,255,.4)} .st.par{border-color:rgba(224,169,59,.38)}

  .legends{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:4px}
  @media(max-width:820px){.legends{grid-template-columns:1fr}}
  .legend{border:1px solid var(--line);border-radius:11px;padding:13px 15px;background:#0c141d}
  .legend .lh{font-family:var(--mono);font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--ink-faint);margin-bottom:10px}
  .legend .row{display:flex;align-items:flex-start;gap:10px;font-size:12px;color:var(--ink-dim);margin:8px 0;line-height:1.45}
  .pill{font-family:var(--mono);font-size:9.5px;font-weight:700;letter-spacing:.04em;padding:2px 8px;border-radius:6px;white-space:nowrap;flex-shrink:0;margin-top:1px}
  .p-have{background:rgba(58,210,159,.13);color:var(--have);border:1px solid rgba(58,210,159,.45)}
  .p-div{background:rgba(123,196,255,.12);color:var(--divergent);border:1px solid rgba(123,196,255,.45)}
  .p-par{background:rgba(224,169,59,.13);color:var(--partial);border:1px solid rgba(224,169,59,.45)}
  .p-gap{background:rgba(138,160,182,.1);color:var(--gap);border:1px solid rgba(138,160,182,.4)}
  .p-def{background:rgba(197,139,255,.13);color:var(--deferred);border:1px solid rgba(197,139,255,.45)}
  .p-obs{background:rgba(52,214,230,.12);color:var(--observe);border:1px solid rgba(52,214,230,.4)}
  .p-twk{background:rgba(208,123,255,.12);color:#df9bff;border:1px solid rgba(208,123,255,.42)}
  .p-rep{background:rgba(255,107,122,.1);color:var(--replay);border:1px solid rgba(255,107,122,.42)}
  .p-stb{background:rgba(45,212,191,.1);color:var(--stub);border:1px solid rgba(45,212,191,.4)}
  .p-buy{background:rgba(103,179,255,.12);color:var(--buy);border:1px solid rgba(103,179,255,.45)}
  .p-build{background:rgba(58,210,159,.13);color:var(--build);border:1px solid rgba(58,210,159,.45)}

  /* buy / build line */
  .bb{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:2px}
  @media(max-width:820px){.bb{grid-template-columns:1fr}}
  .bbcol{border:1px solid var(--line);border-radius:12px;padding:15px 17px;background:#0c141d}
  .bbcol.buy{border-top:3px solid var(--buy)}
  .bbcol.build{border-top:3px solid var(--build);background:linear-gradient(180deg,#0b1811,#0c141d)}
  .bbcol h3{margin:0 0 4px;font-size:14px;font-weight:660}
  .bbcol .cap{font-family:var(--mono);font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-faint);margin-bottom:11px}
  .bbcol.buy h3{color:var(--buy)} .bbcol.build h3{color:var(--build)}
  .bbcol ul{margin:0;padding-left:0;list-style:none}
  .bbcol li{font-size:12.5px;color:var(--ink-dim);line-height:1.5;margin:9px 0;padding-left:18px;position:relative}
  .bbcol li::before{content:"›";position:absolute;left:2px;top:0;color:var(--ink-faint);font-family:var(--mono)}
  .bbcol li b{color:var(--ink)}
  .bbcol code{font-family:var(--mono);font-size:10.5px;color:#a9cdff;background:rgba(95,168,255,.08);padding:1px 4px;border-radius:4px}

  .matrix{border:1px solid var(--line);border-radius:13px;overflow:hidden;background:var(--panel2)}
  table{border-collapse:collapse;width:100%;font-size:12.5px}
  thead th{background:#0d1620;color:var(--ink-dim);font-family:var(--mono);font-size:10px;letter-spacing:.12em;
    text-transform:uppercase;text-align:left;padding:11px 12px;border-bottom:1px solid var(--line2);position:sticky;top:0}
  thead th .ax{display:inline-block;width:8px;height:8px;border-radius:2px;margin-right:6px;vertical-align:middle}
  .ax-obs{background:var(--observe)} .ax-twk{background:var(--tweak)} .ax-rep{background:var(--replay)} .ax-stb{background:var(--stub)}
  tbody td{padding:11px 12px;border-bottom:1px solid var(--line);vertical-align:top;line-height:1.5}
  tbody tr:last-child td{border-bottom:none}
  tbody tr:hover td{background:rgba(52,214,230,.03)}
  .stg{font-weight:600;color:var(--ink);font-size:12.5px}
  .stg .sub2{display:block;font-weight:400;color:var(--ink-faint);font-size:10.5px;font-family:var(--mono);margin-top:2px}
  td.cell{color:var(--ink-dim);font-size:11.5px}
  td.cell code{font-family:var(--mono);font-size:10.5px;color:#a9cdff;background:rgba(95,168,255,.08);padding:1px 4px;border-radius:4px}
  td.repcol{background:rgba(255,107,122,.035)}
  .none{color:var(--replay);opacity:.7;font-family:var(--mono);font-size:11px}
  .tag-buy{display:inline-block;font-family:var(--mono);font-size:9px;font-weight:700;letter-spacing:.03em;padding:1px 5px;border-radius:4px;margin-top:5px;
    background:rgba(103,179,255,.12);color:var(--buy);border:1px solid rgba(103,179,255,.4)}
  .tag-build{display:inline-block;font-family:var(--mono);font-size:9px;font-weight:700;letter-spacing:.03em;padding:1px 5px;border-radius:4px;margin-top:5px;
    background:rgba(58,210,159,.12);color:var(--build);border:1px solid rgba(58,210,159,.4)}
  .state{display:inline-flex;flex-direction:column;gap:3px}
  .state .why{color:var(--ink-faint);font-size:10.5px;line-height:1.35;max-width:20ch}

  .cards{display:grid;grid-template-columns:repeat(4,1fr);gap:13px}
  @media(max-width:820px){.cards{grid-template-columns:1fr 1fr}}
  .card{border:1px solid var(--line);border-radius:12px;padding:15px 16px;background:#0c141d}
  .card .big{font-family:var(--mono);font-size:26px;font-weight:700;letter-spacing:-.02em}
  .card .lab{font-family:var(--mono);font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-faint);margin-top:2px}
  .card .note{font-size:11.5px;color:var(--ink-dim);margin-top:9px;line-height:1.45}
  .c-obs .big{color:var(--observe)} .c-twk .big{color:var(--tweak)}
  .c-rep .big{color:var(--replay)} .c-stb .big{color:var(--stub)}
  .c-rep{border-color:rgba(255,107,122,.4);background:linear-gradient(180deg,#160c10,#0c141d)}

  .grid2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
  @media(max-width:820px){.grid2{grid-template-columns:1fr}}
  .box{border:1px solid var(--line);border-radius:12px;padding:15px 17px;background:#0c141d}
  .box h3{margin:0 0 9px;font-size:13px;color:var(--ink);font-weight:640}
  .box h3 .pill{margin-left:8px;vertical-align:middle}
  .box p{margin:6px 0;font-size:12.5px;color:var(--ink-dim);line-height:1.6}
  .box p b{color:var(--ink)}
  .box code{font-family:var(--mono);font-size:11px;color:#a9cdff}
  .divider-note{border-left:3px solid var(--divergent);background:linear-gradient(180deg,#0b1622,#0b1016)}
  .ban{border-left:3px solid var(--replay);background:linear-gradient(180deg,#160d11,#0b1016)}

  .seq{border:1px solid var(--line);border-radius:12px;background:#0c141d;padding:6px 0}
  .seq .step{display:flex;gap:14px;padding:13px 18px;border-bottom:1px solid var(--line);align-items:flex-start}
  .seq .step:last-child{border-bottom:none}
  .seq .ord{font-family:var(--mono);font-size:11px;color:var(--bg);background:var(--cyan);border-radius:6px;padding:3px 8px;font-weight:700;flex-shrink:0;height:fit-content}
  .seq .ord.later{background:var(--ink-faint)}
  .seq .body h4{margin:0 0 3px;font-size:13px;color:var(--ink);font-weight:620}
  .seq .body h4 .pill{margin-left:7px;vertical-align:middle}
  .seq .body p{margin:0;font-size:12px;color:var(--ink-dim);line-height:1.55}
  .seq .body code{font-family:var(--mono);font-size:10.5px;color:#df9bff}

  .flag{margin-top:14px;border:1px dashed var(--line2);border-radius:11px;padding:14px 16px;background:#0d1119;
    font-size:12.5px;color:var(--ink-dim);line-height:1.6}
  .flag b{color:var(--partial)}
  .cust{margin-top:14px;border:1px solid var(--line);border-left:3px solid var(--replay);border-radius:11px;padding:15px 17px;background:linear-gradient(180deg,#150c0f,#0c141d)}
  .cust h3{margin:0 0 8px;font-size:13.5px;color:#ff9ba5;font-weight:660}
  .cust p{margin:6px 0;font-size:12.5px;color:var(--ink-dim);line-height:1.6}
  .cust code{font-family:var(--mono);font-size:11px;color:#a9cdff}
  .cust .flow{font-family:var(--mono);font-size:11.5px;color:var(--ink);background:#0a1017;border:1px solid var(--line2);border-radius:8px;padding:11px 13px;margin-top:10px;line-height:1.9}
  .cust .flow b{color:var(--build)}

  footer{margin-top:40px;padding-top:16px;border-top:1px solid var(--line);
    font-family:var(--mono);font-size:10.5px;color:var(--ink-faint);line-height:1.9;display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px}
</style>
</head>
<body>
<div class="wrap">

  <header class="top">
    <div class="stamp">rev 3 · 2026-07-02<br><b>v2.1</b> · blueprint<br>RULE 23 re-sync<br>stage-10 resolved · home designed<br>CWF stage-state @ <b>5302ff1</b></div>
    <p class="kick">Agent Control Plane · Blueprint</p>
    <h1>The Electron Microscope
      <span class="sub">Buy the body, grind the lenses. A stage-by-stage lab for one agent — built mostly on standard parts, distinguished by the few that can't be bought.</span>
    </h1>
    <div class="thesis">
      Five SOTA references agree on <b>what an agent's pipeline is</b> (14 stages, raw query → LLM → rendered answer). A control plane is the layer that turns that pipeline into a <b>lab</b>: <b>see</b> each stage, <b>change</b> its input, <b>re-run</b> it, and <b>stub</b> a missing one. v1 called that layer "genuinely new." <b>v2 corrects the record:</b> by mid-2026 the observe + generic-replay + experiment substrate is a <b>standard, buyable import</b> — OpenTelemetry GenAI semantic conventions for the wire, and Langfuse (self-hosted) for observe, prompt/LLM replay, datasets and experiments. The differentiator is not "we build a microscope." It is the handful of <b>domain lenses no generic tool can grind</b>: replaying our deterministic governed-knowledge, scope-authority and <code>empty≠zero</code> stages, scored deterministically, inside a governance-integrated home.
      <span class="micro">Scope: single-agent optimization bench. Multi-agent orchestration deliberately out of scope — master one agent first.</span>
    </div>
    <div class="delta">
      <b>What changed v1 → v2.</b> v1 scored REPLAY 0/14 and framed it as a wholesale new build. Current SOTA falsifies "nothing off-the-shelf does it": Langfuse playground replays a production trace's prompt without re-running the pipeline; Laminar makes partial-trace/span replay first-class; LangGraph Studio does graph time-travel; Langfuse Experiments (now first-class) run against curated datasets or sampled production traces with CI regression. v2 splits every capability into a <b>buy/build line</b>, shrinks the build to four domain-specific pieces, and re-points the empty-completion "first customer" onto Langfuse Datasets + Experiments instead of a bespoke harness.
      <br><br><b>What changed v2 → v2.1 (RULE 23 milestone re-sync).</b> Two code-grounded results, verified against the repo at <code>5302ff1</code>: (1) <b>stage-10 replay resolved</b> — <code>messages.raw_tool_results</code> already stores tool results, so tool-loop replay is a cheap <b>stub-from-recorded-results</b> (no live ARMES re-hit, no F-obs), not the heavy build it looked like. (2) <b>Empty-experiment input sourcing corrected</b> — <code>telemetry_events.payload</code> is redacted (no text), so the empty-causing query is sourced from <code>messages.content</code> (unredacted), tools stubbed from <code>raw_tool_results</code> — making Part B <b>buildable pre-F-obs</b>. And the control plane now has a designed home: <b>OA-10 UI scope v1</b>.
    </div>
  </header>

  <!-- 01 canonical flow -->
  <h2 class="sec"><span class="n">01</span> The canonical flow — union of all five references</h2>
  <p class="lead">The SOTA list, kept <b>intact</b> and unchanged from v1. Every reference maps to these 14 stages at some granularity; we do not drop or rename any, so the map stays comparable to the literature. Stages 14+ (multi-agent, tool-synthesis) are future rows — the list is designed to grow.</p>
  <div class="spine">
    <div class="st core"><span class="dot d-have"></span><div class="num">00</div><div class="nm">User Query</div></div>
    <div class="st core"><span class="dot d-have"></span><div class="num">01</div><div class="nm">Conversation &amp; State</div></div>
    <div class="st par"><span class="dot d-partial"></span><div class="num">02</div><div class="nm">Query Understanding &amp; Intent</div></div>
    <div class="st def"><span class="dot d-deferred"></span><div class="num">03</div><div class="nm">Planning / Task Decomp</div></div>
    <div class="st par"><span class="dot d-partial"></span><div class="num">04</div><div class="nm">Memory Retrieval</div></div>
    <div class="st div"><span class="dot d-divergent"></span><div class="num">05</div><div class="nm">Knowledge Retrieval (RAG)</div></div>
    <div class="st core"><span class="dot d-have"></span><div class="num">06</div><div class="nm">Tool &amp; Skill Selection</div></div>
    <div class="st par"><span class="dot d-partial"></span><div class="num">07</div><div class="nm">Context Compression</div></div>
    <div class="st core"><span class="dot d-have"></span><div class="num">08</div><div class="nm">Prompt Assembly</div></div>
    <div class="st core"><span class="dot d-have"></span><div class="num">09</div><div class="nm">LLM Inference</div></div>
    <div class="st core"><span class="dot d-have"></span><div class="num">10</div><div class="nm">Tool Execution Loop</div></div>
    <div class="st div"><span class="dot d-divergent"></span><div class="num">11</div><div class="nm">Verification / Reflection</div></div>
    <div class="st core"><span class="dot d-have"></span><div class="num">12</div><div class="nm">Response Format / Render</div></div>
    <div class="st par"><span class="dot d-partial"></span><div class="num">13</div><div class="nm">Memory Update</div></div>
  </div>

  <div class="legends">
    <div class="legend">
      <div class="lh">Stage state — current + planned</div>
      <div class="row"><span class="pill p-have">HAVE</span>Built and working in CWF today.</div>
      <div class="row"><span class="pill p-div">DIVERGENT</span>Built, but a <b>principled departure</b> from the SOTA default — a choice kept on purpose.</div>
      <div class="row"><span class="pill p-par">PARTIAL / STUB</span>Present in reduced form (a window, an offload) — no full component yet.</div>
      <div class="row"><span class="pill p-gap">DELIBERATE-GAP</span>Intentionally absent, with a rationale. A decision, not a TODO.</div>
      <div class="row"><span class="pill p-def">DEFERRED →</span>Planned and sequenced to a named phase.</div>
    </div>
    <div class="legend">
      <div class="lh">Two axes now — control question × who provides it</div>
      <div class="row"><span class="pill p-obs">OBSERVE</span>Can we <b>see</b> what this stage did on a given request?</div>
      <div class="row"><span class="pill p-twk">TWEAK</span>Can we <b>change this stage's input</b> for a run, safely (session-only, no governed writes)?</div>
      <div class="row"><span class="pill p-rep">REPLAY</span>Can we <b>re-run</b> this stage on a captured request with the tweak, and diff?</div>
      <div class="row"><span class="pill p-buy">BUY</span>Standard, shipping capability — import it (OTel semconv · Langfuse).</div>
      <div class="row"><span class="pill p-build">BUILD</span>Domain-specific — no generic tool understands it. Ours to build.</div>
    </div>
  </div>

  <!-- 02 divergence -->
  <h2 class="sec"><span class="n">02</span> Where CWF takes a stand — sharpened against what SOTA ships</h2>
  <p class="lead">Union is easy; the <b>separation points</b> are where the design lives. These are not gaps — they are identity. v2 sharpens the LLM-judge line, because every mainstream platform now ships LLM-as-judge and the ban must be precise about <b>where</b> it applies.</p>
  <div class="grid2">
    <div class="box ban">
      <h3>No vector in the knowledge core <span class="pill p-div">DIVERGENT · stage 05</span></h3>
      <p>All five references assume <b>RAG = vector search</b>. CWF's deterministic core <b>bans it</b>: the critical slice is <b>always-injected typed data</b>, never lossy near-neighbor retrieval that could confuse <code>IKINCILUST</code> with <code>IKINCILALT</code>. pgvector stays a <b>gated slot</b> for a future advisory Layer-2 corpus only.</p>
    </div>
    <div class="box ban">
      <h3>LLM-as-judge — banned at runtime, allowed offline <span class="pill p-div">SHARPENED · stage 11</span></h3>
      <p>SOTA ships LLM-as-judge everywhere (Langfuse, Braintrust, Phoenix). CWF <b>bans it for runtime grounding &amp; trust</b> — a judge hallucinates its own verdict; verification stays <b>deterministic code</b> (<code>empty≠zero</code>, count-integrity, scope-authority). But the same LLM-judge is <b>fine as an offline, advisory experiment scorer</b> in the lab. That is exactly the project's determinism/soft split: correctness → deterministic; advisory → may be fuzzy. The ban has an address, not a blanket.</p>
    </div>
    <div class="box divider-note">
      <h3>Planning is implicit — for now <span class="pill p-def">DEFERRED → LangGraph</span></h3>
      <p>Docs make a hierarchical <b>Planner / Task-Graph</b> first-class. CWF plans <b>implicitly</b> inside the <code>stepCountIs</code> tool loop. An explicit planner is <b>deferred</b> to the LangGraph bridge (Shape B: TS core stays an MCP service, Python orchestrates, governance untouched).</p>
    </div>
    <div class="box divider-note">
      <h3>Intent, memory, skills — reduced by design <span class="pill p-par">PARTIAL / GAP</span></h3>
      <p><b>Intent:</b> a keyword router feeds tool-selection only — no separate intent LLM. <b>Memory:</b> short-term window ✓; <b>learned user memory</b> is a deliberate gap. <b>Skills:</b> <code>SKILL.md</code> serves the author lane, not a runtime skill layer.</p>
    </div>
  </div>

  <!-- 03 the buy/build line -->
  <h2 class="sec"><span class="n">03</span> The buy / build line — the heart of v2</h2>
  <p class="lead">Two things are now settled standards; adopting them is not engineering taste, it is table stakes. <b>The wire</b> is OpenTelemetry's GenAI semantic conventions (<code>chat</code> spans, <code>execute_tool</code> spans incl. MCP, <code>gen_ai.response.finish_reasons</code>, <code>gen_ai.input/output.messages</code>) — the Vercel AI SDK emits them near-free. <b>The workbench</b> is self-hosted Langfuse: observe (trace tree), prompt/LLM replay on a captured trace, datasets, and first-class experiments with CI regression. We import both. We build only what neither can see.</p>
  <div class="bb">
    <div class="bbcol buy">
      <h3>BUY — the microscope body</h3>
      <div class="cap">standard parts · import, don't invent</div>
      <ul>
        <li><b>Instrumentation standard:</b> OTel GenAI semconv. Our OBS-2 <code>finishReason</code> maps 1:1 onto <code>gen_ai.response.finish_reasons</code>; the empty signal is a <b>standard attribute</b>, not a bespoke schema.</li>
        <li><b>Observe (trace tree):</b> Langfuse span tree over the whole request — the final per-request prompt (stage 08), per-step tool spans (stage 10), token/latency/cost. Fills v1's observe gaps in one import.</li>
        <li><b>Single trace id:</b> the OTel trace id becomes SSOT and folds the <code>session_id</code> reconciliation (TD-10) in — no second per-turn id.</li>
        <li><b>Generic replay:</b> open a captured trace, tweak the prompt/model, re-run <b>without</b> the full pipeline. Covers the prompt (08) &amp; LLM (09) stages off the shelf.</li>
        <li><b>Experiment / dataset harness:</b> curate traces → dataset → run variants side-by-side → compare → gate in CI. This <b>is</b> the "replay harness" — we were about to rebuild it.</li>
        <li><b>Offline scorers:</b> LLM-as-judge <i>and</i> code evaluators as advisory experiment scores (never runtime grounding).</li>
      </ul>
    </div>
    <div class="bbcol build">
      <h3>BUILD — the four domain lenses</h3>
      <div class="cap">un-buyable · no generic tool models our stages</div>
      <ul>
        <li><b>1 · Semconv instrumentation of our stages (F-obs).</b> Wire <code>experimental_telemetry</code> on <code>streamText</code> + a span-processor <b>redaction scrubber</b> (tracing captures full I/O = a new secret surface) + serverless force-flush before response completes.</li>
        <li><b>2 · Domain-stage replay task-functions.</b> A Langfuse experiment "task" that re-runs our <b>real</b> deterministic stages — recompose the governed critical slice at published-version X, re-run the routing partition, re-inject — not a generic prompt call. This is the objective lens no playground has.</li>
        <li><b>3 · Domain-aware deterministic scorers.</b> <code>empty≠zero</code>, count-integrity, scope-authority as <b>code evaluators</b> in the experiment loop — because LLM-judge is banned for our correctness verdicts.</li>
        <li><b>4 · The governance-integrated home (OA-10).</b> Stitch the Langfuse trace to the governed knowledge editor: from a trace, jump to the exact <code>domain_rule</code> version that shaped stage 05. Generic tools see the prompt; only ours sees the <b>knowledge floor</b> behind it.</li>
      </ul>
    </div>
  </div>

  <!-- 04 matrix -->
  <h2 class="sec"><span class="n">04</span> The control-plane matrix — 14 stages, now marked buy vs build</h2>
  <p class="lead">Same rows as v1. The REPLAY column is re-scored: no longer a flat "none," but <span class="p-buy" style="padding:1px 5px;border-radius:4px">BUY</span> where a generic tool replays it, <span class="p-build" style="padding:1px 5px;border-radius:4px">BUILD</span> where only a domain task-function can. CWF stage-state verified against the repo at <code>5302ff1</code>; SOTA capability verified via web, Jul 2026.</p>
  <div class="matrix">
    <table>
      <thead>
        <tr>
          <th style="width:17%">Stage</th>
          <th style="width:12%">State</th>
          <th style="width:22%"><span class="ax ax-obs"></span>Observe</th>
          <th style="width:19%"><span class="ax ax-twk"></span>Tweak (today)</th>
          <th style="width:30%"><span class="ax ax-rep"></span>Replay — buy or build</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><span class="stg">00 · User Query<span class="sub2">/api/cwf/chat</span></span></td>
          <td><span class="pill p-have">HAVE</span></td>
          <td class="cell">request log, per-turn <code>[trace]</code> id → becomes OTel root span</td>
          <td class="cell">—</td>
          <td class="repcol cell">experiment input item <span class="tag-buy">BUY · dataset item</span></td>
        </tr>
        <tr>
          <td><span class="stg">01 · Conversation &amp; State<span class="sub2">ConversationRepo · auth</span></span></td>
          <td><span class="pill p-have">HAVE</span></td>
          <td class="cell">role/scopes, history window, language (logs → span attrs)</td>
          <td class="cell">—</td>
          <td class="repcol cell">carried in the item context <span class="tag-buy">BUY</span></td>
        </tr>
        <tr>
          <td><span class="stg">02 · Understanding &amp; Intent<span class="sub2">keyword router</span></span></td>
          <td><span class="state"><span class="pill p-par">PARTIAL</span><span class="why">no intent LLM; feeds tool-select</span></span></td>
          <td class="cell"><code>[ToolRoute]</code> categories, path</td>
          <td class="cell"><code>labMode.routingBypass</code></td>
          <td class="repcol cell">re-run router on captured query <span class="tag-build">BUILD · task-fn</span></td>
        </tr>
        <tr>
          <td><span class="stg">03 · Planning / Decomp<span class="sub2">implicit in tool loop</span></span></td>
          <td><span class="state"><span class="pill p-def">DEFERRED →</span><span class="why">LangGraph (Shape B)</span></span></td>
          <td class="cell"><span class="none">— not surfaced</span></td>
          <td class="cell">—</td>
          <td class="repcol cell"><span class="none">— deferred with the planner</span></td>
        </tr>
        <tr>
          <td><span class="stg">04 · Memory Retrieval<span class="sub2">history window</span></span></td>
          <td><span class="state"><span class="pill p-par">PARTIAL</span><span class="why">short-term ✓; user memory gap</span></span></td>
          <td class="cell">history slice (span attr)</td>
          <td class="cell">—</td>
          <td class="repcol cell">vary window in the item <span class="tag-buy">BUY</span></td>
        </tr>
        <tr>
          <td><span class="stg">05 · Knowledge (RAG)<span class="sub2">DbKnowledgeProvider</span></span></td>
          <td><span class="state"><span class="pill p-div">DIVERGENT</span><span class="why">typed always-inject; vector banned</span></span></td>
          <td class="cell">warm / floor logs (thin → span)</td>
          <td class="cell"><code>knowledgeSource</code> · <code>previewDrafts</code></td>
          <td class="repcol cell"><b>recompose slice at version X, re-inject</b> — no generic tool does this <span class="tag-build">BUILD · the flagship lens</span></td>
        </tr>
        <tr>
          <td><span class="stg">06 · Tool &amp; Skill Selection<span class="sub2">scope · partition · router</span></span></td>
          <td><span class="state"><span class="pill p-have">HAVE</span><span class="why">runtime skills = gap</span></span></td>
          <td class="cell"><code>[ToolRoute]</code> offered/gateway/canonicalOEE</td>
          <td class="cell"><code>routingBypass</code> · cache clear</td>
          <td class="repcol cell">re-run partition + scope-authority on captured toolset <span class="tag-build">BUILD · task-fn</span></td>
        </tr>
        <tr>
          <td><span class="stg">07 · Context Compression<span class="sub2">window + resultStore</span></span></td>
          <td><span class="state"><span class="pill p-par">STUB</span><span class="why">offload only; no summarizer</span></span></td>
          <td class="cell"><code>[ToolResult]</code> compacted/stored flags</td>
          <td class="cell">—</td>
          <td class="repcol cell">summarizer variant when built <span class="tag-buy">BUY-ish</span></td>
        </tr>
        <tr>
          <td><span class="stg">08 · Prompt Assembly<span class="sub2">buildSystemPrompt</span></span></td>
          <td><span class="state"><span class="pill p-have">HAVE·STRONG</span><span class="why">final per-request prompt now captured via span</span></span></td>
          <td class="cell">Langfuse captures the assembled prompt (was build-time only)</td>
          <td class="cell"><code>knowledgeSource</code>/<code>previewDrafts</code></td>
          <td class="repcol cell">edit prompt on captured trace, re-run <span class="tag-buy">BUY · playground</span></td>
        </tr>
        <tr>
          <td><span class="stg">09 · LLM Inference<span class="sub2">single gateway</span></span></td>
          <td><span class="pill p-have">HAVE</span></td>
          <td class="cell"><code>gen_ai.*</code> finish_reasons · usage · warnings</td>
          <td class="cell"><code>forceProvider</code></td>
          <td class="repcol cell">swap model/params, re-run <span class="tag-buy">BUY · playground/exp</span></td>
        </tr>
        <tr>
          <td><span class="stg">10 · Tool Execution Loop<span class="sub2">stepCountIs · meta-tools</span></span></td>
          <td><span class="pill p-have">HAVE</span></td>
          <td class="cell"><code>execute_tool</code> spans (MCP semconv); steps surfaced</td>
          <td class="cell">—</td>
          <td class="repcol cell">stub tool results from <code>messages.raw_tool_results</code> — no live re-hit, pre-F-obs <span class="tag-build">BUILD · recorded-stub</span></td>
        </tr>
        <tr>
          <td><span class="stg">11 · Verification / Reflection<span class="sub2">groundingCheck</span></span></td>
          <td><span class="state"><span class="pill p-div">DIVERGENT</span><span class="why">deterministic; LLM-judge banned</span></span></td>
          <td class="cell">grounding verdict → span + telemetry</td>
          <td class="cell">—</td>
          <td class="repcol cell">re-run deterministic verdict as a <b>code scorer</b> <span class="tag-build">BUILD · domain scorer</span></td>
        </tr>
        <tr>
          <td><span class="stg">12 · Response / Render<span class="sub2">FROM-TOOL directives</span></span></td>
          <td><span class="pill p-have">HAVE</span></td>
          <td class="cell">tool-result-raw, done; empty-guard (OBS-2)</td>
          <td class="cell"><code>rawToolData</code> toggle</td>
          <td class="repcol cell">diff rendered output across runs <span class="tag-buy">BUY · run compare</span></td>
        </tr>
        <tr>
          <td><span class="stg">13 · Memory Update<span class="sub2">persist + routing-cache</span></span></td>
          <td><span class="state"><span class="pill p-par">MINIMAL</span><span class="why">persist + routing self-learn ✓; user memory gap</span></span></td>
          <td class="cell">persistence, <code>[ToolFilter] Learned</code></td>
          <td class="cell">routing-cache clear</td>
          <td class="repcol cell"><span class="none">— out of the read-path replay loop</span></td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- 05 readout -->
  <h2 class="sec"><span class="n">05</span> The readout — recalibrated</h2>
  <div class="cards">
    <div class="card c-obs"><div class="big">BUY</div><div class="lab">Observe</div><div class="note">v1 scored ~9/14 partial. With Langfuse + OTel semconv it goes to <b>full trace-tree</b> across the run — the build-time-only prompt (08) and per-step spans (10) fill in. One import.</div></div>
    <div class="card c-twk"><div class="big">5→n</div><div class="lab">Tweak</div><div class="note">Keep the GOV-4 session-only overlay (the safety model is right); widen coverage. This stays a <b>build</b>, but a small one — coverage, not new mechanism.</div></div>
    <div class="card c-rep"><div class="big">BUY+4</div><div class="lab">Replay</div><div class="note">Prompt/LLM/compare replay = <b>buy</b> (playground + experiments). The <b>build</b> is 4 domain lenses: knowledge-slice (05), routing/scope (06), tool-loop record (10), deterministic verdict scorer (11).</div></div>
    <div class="card c-stb"><div class="big">seams</div><div class="lab">Stub / Extend</div><div class="note">Not a bespoke plugin engine. The experiment <b>task-function seam</b> + our existing behind-interface adapters (<code>KnowledgeProvider</code>, MCP adapter) <b>are</b> the extension points. Fold, don't build anew.</div></div>
  </div>

  <div class="grid2" style="margin-top:14px">
    <div class="box">
      <h3>What the market ships in mid-2026 <span class="pill p-buy">verified</span></h3>
      <p><b>OTel GenAI semconv</b> is the wire standard (chat/agent/execute_tool spans, finish_reasons, input/output messages); Vercel AI SDK, LangChain, CrewAI emit it.</p>
      <p><b>Langfuse:</b> self-host (Postgres+ClickHouse), OTLP/HTTP ingest, playground replay on production traces, first-class Experiments + Datasets, CI regression, LLM-judge + code scorers.</p>
      <p><b>Laminar / LangGraph Studio / Braintrust:</b> span/partial-trace replay, graph time-travel, production-span replay. Replay is <b>no longer novel</b>.</p>
    </div>
    <div class="box divider-note">
      <h3>Why the differentiator survives — narrower, and real</h3>
      <p>Every tool above replays <b>the prompt and the model call</b>. None can replay <b>"recompose the critical slice from the governed DB at published version X and re-inject"</b>, or <b>"re-run the deterministic <code>empty≠zero</code> / scope-authority verdict"</b> — because none knows our domain, our governance model, or our bans.</p>
      <p>So: <b>buy the body and the two easy stages; build the four lenses + the governance home.</b> The build is ~4 pieces, not a microscope from scratch. That is the honest moat.</p>
    </div>
  </div>

  <!-- 06 build order -->
  <h2 class="sec"><span class="n">06</span> Build order — buy-first, then the lenses</h2>
  <p class="lead">Each layer is sequenced so the next is <b>verifiable</b>. Buy the substrate before building on it; observe before replay; replay before extensibility.</p>
  <div class="seq">
    <div class="step"><span class="ord">0</span><div class="body"><h4>House first — the UI home <span class="pill p-build">BUILD · OA-10</span></h4><p>Redesign the admin/settings/telemetry surface into a govern-plane / microscope-plane split (see the panel audit). F-obs lands into a clean home, not scattered tabs. <b>Committed next concrete phase.</b></p></div></div>
    <div class="step"><span class="ord">1</span><div class="body"><h4>Observe backbone — unpark F-obs <span class="pill p-buy">BUY</span> <span class="pill p-build">+ instrument</span></h4><p>Self-hosted Langfuse + OTel semconv. Buy the trace tree; build the instrumentation (<code>experimental_telemetry</code>, redaction scrubber, serverless force-flush). Folds <code>session_id</code> reconciliation in. Blocked only on host placement (OA-8).</p></div></div>
    <div class="step"><span class="ord">2</span><div class="body"><h4>Generic replay + experiments — turn them on <span class="pill p-buy">BUY</span></h4><p>Playground replay for prompt/model; Datasets + Experiments for regression. Near-zero build: curate traces, define code scorers. Immediately usable.</p></div></div>
    <div class="step"><span class="ord">3</span><div class="body"><h4>Domain lenses — the real build <span class="pill p-build">BUILD</span></h4><p>Task-functions that replay our deterministic stages (knowledge-slice, routing/scope), plus deterministic code scorers (<code>empty≠zero</code>, scope-authority), plus MCP tool-result record/stub for stage 10. The heart of the moat.</p></div></div>
    <div class="step"><span class="ord later">·</span><div class="body"><h4>Out of scope, on purpose — multi-agent orchestration</h4><p>Not now. Optimize <b>one</b> agent to product quality first; orchestration is a later chapter.</p></div></div>
  </div>

  <!-- 07 first customer -->
  <div class="cust">
    <h3>The empty-completion — the lab's first customer · buildable pre-F-obs</h3>
    <p>OBS-3.1 (perturbed retry) must be designed against data, not guessed (Claude was wrong twice reactively). v1 said "wait for a bespoke replay harness." v2/v2.1: <b>the harness is Langfuse Experiments</b>, and the whole loop runs <b>before F-obs</b> because the inputs already exist in the DB — no new engine, no captured spans needed.</p>
    <p class="flow">
      source the empty-causing query from <code>messages.content</code> <b>(unredacted)</b> — NOT <code>telemetry_events</code> (redacted, no text) → <b>Dataset</b> of high-empty queries<br>
      → <b>Experiment</b>: variants = { baseline retry · nudge-perturbation · temp-bump }<br>
      → task-fn re-runs CWF's <b>real</b> stages 05/06/08/09 per variant, <b>tools stubbed from</b> <code>raw_tool_results</code> (deterministic, no live re-hit) <span style="color:var(--build)">(BUILD)</span><br>
      → <b>code scorer</b>: recovered? (non-empty ∧ grounded) <span style="color:var(--build)">(BUILD, deterministic)</span><br>
      → compare runs side-by-side → the perturbation that escapes high-empty inputs wins → <b>then</b> design OBS-3.1 once.
    </p>
    <p>Everything except the two BUILD tags is bought. "Don't reinvent America": the replay loop is Langfuse's; only the <b>domain task-function</b> and the <b>deterministic recovery scorer</b> are ours — because only we know our pipeline and our <code>empty≠zero</code> definition of "recovered." Tool-loop replay (stage 10) reuses the same recorded-stub, so the empty stays isolated to the LLM stage where it actually lives.</p>
  </div>

  <div class="flag">
    <b>RULE 23 note.</b> This is a roadmap-altitude map — re-sync on a capability milestone (a matrix cell flips buy→built, or a control-plane phase lands), not on every code edit. The control plane now has a designed home: <b>OA-10 UI scope v1</b> (govern-plane / microscope-plane split; five panels specified). The two bans (no vector-in-core, no LLM-judge-at-runtime) are identity, not backlog. Verify stage-state against the repo, never against this map.
  </div>

  <footer>
    <span>cwf-agent-control-plane-blueprint · v2.1 · rev 3 · 2026-07-02</span>
    <span>SOTA (OTel GenAI semconv · Langfuse · Laminar · LangGraph Studio · Braintrust) verified via web Jul 2026 · CWF stage-state @ 5302ff1 · verify against repo, not this map</span>
  </footer>

</div>
</body>
</html>

BLUEPRINT-V2_1-END

*PHASE OA10-1b · v1 · rev 1 · 2026-07-02 · doc-only · the tab must tell the truth the code already knows.*
