# B4-LITE — RAG Service Readiness Probe · v1
<!-- B4LITE-READINESS-PROBE-v1 · 2026-07-30 · S72 · Architect: Claude.
     Audience: the RAG-service team (owner relays; S54-3 one self-contained
     artifact). Binding sources: cwf-v1-scope-cut-v1_2 §3 (R9, owner-ratified)
     · register v73 §2 (MCP 2026-07-28 disposition 1: guard(a) += SDK-1.29.0
     handshake proof). Purpose: produce the guard(a) evidence that lets the
     RAG service join CWF as a BACKEND (the Superset pattern — one row, one
     domain pack, tool_category rows; ZERO core code). -->

## Fence

This probe touches ONLY the team's RAG service. No CWF repo contact, no CWF
DB contact. **Never paste a secret value anywhere in the reply — names and
header shapes only (ADR-007).** Evidence = literal command/transcript output,
scrubbed of tokens.

## The five proofs (return all five in ONE reply document)

**PROBE-1 · Reachability from Vercel egress.**
The MCP endpoint must be publicly reachable over HTTPS (CWF runs on Vercel
serverless — no VPN, no private-network hop, no IP allowlist unless it can
admit Vercel's egress ranges). Return: the endpoint URL · transport
(streamable-HTTP or SSE) · one `curl -sS -o /dev/null -w '%{http_code}'`
from any public host · a yes/no on any network precondition.

**PROBE-2 · MCP handshake on the pinned SDK.**
CWF's client pin is **MCP SDK 1.29.0**. The connection's FIRST proof is a
successful `initialize` → `initialized` exchange against a 1.29.0 client:
negotiated protocol version + declared server capabilities. Return the
scrubbed handshake transcript. A handshake that only works on a newer/older
client is a red — report it as such, do not adapt CWF's pin.

**PROBE-3 · Tool surface, read-only.**
Return the full `tools/list` output: the query tool's exact name + its JSON
input schema. Confirm explicitly that the surface exposes **zero
write/mutating tools** (documents are loaded on YOUR side; CWF only queries).
Read-only makes ADR-011 trivially satisfied and is a join precondition.

**PROBE-4 · Source attribution in the answer (the make-or-break proof).**
Run ONE real query against loaded documents and return the raw response.
The response must carry **which document (and ideally which section/page)
the answer came from as a structured field** — not as prose inside the
answer text. CWF's provenance chain (evidence chip, grounding) covers RAG
only if attribution exists; un-attributed answers will be recorded as a
named finding and block the join, per R9. If attribution is configurable,
state where it is switched on.

**PROBE-5 · Auth shape and rotation.**
Name the auth mechanism (header name + scheme, e.g. `Authorization: Bearer`)
and confirm a long-lived or renewable service credential exists that CWF can
hold **by reference** (global entry + `apiKeyRef` → `mcp_secrets`; a raw
value never sits in any row — the A9 lesson). State the token's lifetime /
rotation cadence: anything that expires in hours joins the secret-freshness
watch, so say so now rather than after a 401.

## What happens on receipt

Green on all five → CWF connects the service as a backend: one `mcp_settings`
row + one domain pack + `tool_category` rows. Zero core code — if a row +
pack + categories cannot connect it, we stop and report (guard b). Usage is
measured from day one (guard c, the F207-class read); zero adoption is a
prompt/routing finding, not silence.

## The clock

**guard(a) must be green by the time CWF's phase A5 completes.** If it is
not, B4-lite reverts to v1.1 by the ratified escape clause — the release tag
never waits on this lane. Partial evidence is welcome early: send what is
green, name what is pending.

<!-- END · B4LITE-READINESS-PROBE-v1 · 2026-07-30 -->
