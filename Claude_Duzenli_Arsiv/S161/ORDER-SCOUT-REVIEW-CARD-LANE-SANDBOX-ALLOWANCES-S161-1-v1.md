<!-- relay-audit: v1 kind=order -->
ORDER-SCOUT-REVIEW-CARD-LANE-SANDBOX-ALLOWANCES-S161-1-v1

LANE: scout (scout-2 window; fresh; one order per window)
fanout: personalized (one lane, one body)
FROM: Architect, S161, 2026-09-28T00:02Z
OWNER APPROVAL: OWNER-APPROVAL-S161-PLAN-1 ("onay S161 planı", 2026-09-28 02:37 TSI, plan step P5).
NO POLL OR CRON TASK. FORBIDDEN: any repo edit, commit or push; printing any environment value; leaving the sandbox EXCEPT for the one gh measurement below, which you name in your status as unsandboxed (F-S160-SCOUT-GH-UNSANDBOXED-1).
PRECONDITION: master is c58438b59cff4d1d403634b28e44af9b01db6dea (you verify with gh api and print the 40-hex).

TASK: adversary review of the card below (NEW subject, 12.1). MEASURE, do not opine. For each numbered item print MEASURED/READ/UNMEASURED with the command:
1. The card's central unknown: does the INSTALLED Claude Code (print its version) expose a configurable sandbox in settings — network allow-list, filesystem write paths, IPC/unix sockets, TLS/CA? Quote the installed docs/schema lines by path. If it does not, the card's ORDER 1 cannot be executed as written: RED with the delta.
2. Reproduce refusals (a)–(d) once each, in the sandbox, minimal probes, hostnames and error codes only. Which layer refuses each (network policy / filesystem policy / Seatbelt)?
3. The doc-repo tracking-ref refusal (b): is it a filesystem-write policy on a path outside the workspace, or a git lock semantics issue? Show the exact refused path.
4. Does the repo's guard-bash.py / guard-secrets.py hook interact with any allowance (e.g. would a settings.local.json edit be refused by the hook)? Quote the hook lines.
5. Is `.claude/settings.local.json` gitignored today? Print `git check-ignore -v .claude/settings.local.json`.
6. Any allowance the card names that is WIDER than needed, or any it MISSES (e.g. the Supabase REST host if laneSlip uses it; print laneWrite's resolveLaneDsn host handling).
VERDICT: GREEN / RED with the complete delta. Status: SCOUT-STATUS-REVIEW-CARD-LANE-SANDBOX-ALLOWANCES-S161-1-v1 via laneSlip; if the bus write is refused (sandbox DNS), write the full status to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S161/SCOUT-STATUS-REVIEW-CARD-LANE-SANDBOX-ALLOWANCES-S161-1-v1.md" and print its sha256; the Architect commits it (register 109). Stop.

=== CARD UNDER REVIEW: CARD-LANE-SANDBOX-ALLOWANCES-S161-1-v1 — read it from the bus? NO: it is NOT on the bus until GREEN. Read it from the doc repo: "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S161/CARD-LANE-SANDBOX-ALLOWANCES-S161-1-v1.md" (md5 printed in the Architect's boot text). ===

END · ORDER-SCOUT-REVIEW-CARD-LANE-SANDBOX-ALLOWANCES-S161-1-v1
