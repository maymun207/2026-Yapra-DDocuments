# PROBE-OBS — Vercel Production Egress Reachability (one-shot, time-boxed)
**claude-code-PROBE-OBS-vercel-egress-reachability-v1 · rev 1 · 2026-07-04**
**Repo:** `cwf_yaprak` · **Base:** `origin/master` @ `8c5387d` (639/639, docVersion rev 23, F-obs1 landed)
**Nature:** OPS PROBE, not a build phase. Zero application-code changes. One small doc commit at the end.

---

## 0. WHY

F-obs1 proved the pipeline from **local dev**. The two traps RULE 27 names — serverless span-loss and silent transport failure — can only be disproven from the **real Vercel production runtime**. This probe opens a short-lived public HTTPS tunnel to the local Langfuse stack, points production at it for a bounded window, and demands one piece of evidence:

**A span from a real production chat turn is VISIBLE in the local Langfuse UI after force-flush.** HTTP 200 is not evidence. A green deploy is not evidence.

Passing this de-risks the later AWS move to a pure `LANGFUSE_HOST` env swap.

## 1. HARD PRE-FLIGHT GATE

```bash
git fetch origin && git rev-parse origin/master     # MUST be 8c5387d...
docker compose -f infra/langfuse/docker-compose.yml ps   # 6/6 healthy
curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/api/public/health   # 200
```
Confirm `cloudflared` is available (install via winget/brew/binary if not — it is a client tool, not repo infra).

## 2. HARD CONSTRAINTS

- **C1 — Time-boxed exposure.** The tunnel + prod env window stays open only as long as the probe needs (target < 30 min). The teardown step (§3.4) is MANDATORY and part of the probe's definition of done.
- **C2 — Known cost while the window is open (name it, accept it, bound it):** with `LANGFUSE_*` set in prod, every production turn attempts span export; if the tunnel drops mid-window, the flush adds up to `OTEL_FLUSH_TIMEOUT_MS = 5000` ms to a turn's tail (bounded, non-fatal — RULE 27 floor holds, chat never breaks). This is acceptable for <30 min; it is exactly why teardown is a gate.
- **C3 — Secrets discipline unchanged.** The Langfuse keys go into Vercel env only. Prefer `vercel env add` via an already-authenticated Vercel CLI; if no authenticated CLI exists, the operator adds the three vars in the Vercel dashboard (secrets→ENV is the one sanctioned manual step). Key values never appear in the report.
- **C4 — Quick Tunnel is ephemeral by design.** Use `cloudflared tunnel --url http://localhost:3000` (no account needed). The random `*.trycloudflare.com` URL is the probe's `LANGFUSE_HOST`. Do NOT build a named/permanent tunnel — permanence is the AWS phase's job.
- **C5 — No application code changes.** If the probe fails, the output is a DIAGNOSIS, not a hotfix. Report and stop.

## 3. GATED STEPS

### 3.1 — Tunnel up + externally verified
1. `cloudflared tunnel --url http://localhost:3000` → record the `https://<random>.trycloudflare.com` URL.
2. Verify from the OUTSIDE path (not localhost): `curl -s https://<tunnel>/api/public/health` → expect `{"status":"OK",...}`.

**Gate:** external health JSON pasted (URL may be shown — it is ephemeral and dies with the process).

### 3.2 — Production env (bounded window opens)
1. Set in Vercel project `prj_0fDFCY8qXj8Kr5y7n4zmyefjHY8i`, **Production** scope: `LANGFUSE_HOST=<tunnel URL>`, `LANGFUSE_PUBLIC_KEY`, `LANGFUSE_SECRET_KEY` (same `cwf-dev` project keys — dev project is fine for a probe).
2. Trigger a redeploy of current master (env changes need a new deployment). Record the `deploymentId`.

**Gate:** three vars present in Production scope (names only) + new deployment READY.

### 3.3 — THE probe
1. Send one real chat turn through the **production app** (real login, a query that triggers ≥1 tool call).
2. In the local Langfuse UI: find the trace. **Evidence:** trace id, span count, span names, and the `service.name=cwf-api` resource — plus one visibly SCRUBBED-or-absent credential check: confirm no `authorization`/api-key material appears in any span attribute of that trace.
3. Corroboration hook: note the wall-clock time of the turn (the architect will independently pull the matching production Vercel logs via MCP).
4. Negative-latency sanity: the turn's user-visible behavior is normal (no multi-second stall at the tail beyond ordinary variance).

**Gate:** trace-in-UI evidence from a PRODUCTION-originated turn. This single line is the probe's entire reason to exist.

### 3.4 — MANDATORY teardown (window closes)
1. Remove the three `LANGFUSE_*` vars from Vercel Production scope (or set `OBSERVABILITY_DISABLED=1` — removal preferred: clean absence beats a kill-switch flag left around).
2. Redeploy; confirm READY.
3. Kill the cloudflared process. Confirm the tunnel URL now fails from outside.
4. Post-teardown check: one more production turn → normal, and NO new trace appears in local Langfuse.

**Gate:** env removed + redeployed + tunnel dead + post-teardown negative turn evidenced.

### 3.5 — Record the outcome (one small doc commit)
Append to `.agents/CHANGELOG.md`: probe date, deploymentId, trace id, PASS/FAIL, and the sentence "AWS phase = LANGFUSE_HOST swap; egress + flush + HTTP transport proven from production." No manifest bump (no mapped code areas touched). Commit + push; report the remote hash (RULE 25).

## 4. SELF-VERIFICATION CHECKLIST (evidence per line)
- [ ] Pre-flight: HEAD 8c5387d, stack 6/6 healthy, local health 200
- [ ] External tunnel health JSON
- [ ] 3 env vars in Production (names only) + deploymentId of the probe deploy
- [ ] PRODUCTION turn → trace id + spans + service.name in LOCAL Langfuse UI + no credential material in attributes
- [ ] Turn wall-clock time reported (for independent Vercel-log corroboration)
- [ ] Teardown: vars removed, redeployed, tunnel dead from outside, post-teardown negative turn
- [ ] Changelog commit pushed, remote hash reported

## 5. NON-GOALS
No named tunnel, no AWS, no code changes, no manual spans, no id work (F-obs2), no scrubber hardening (F-obs3). If the probe FAILS: capture the failing layer (tunnel? auth? transport? flush?), tear down anyway, report — the fix is the architect's diagnosis, not an in-probe improvisation.
