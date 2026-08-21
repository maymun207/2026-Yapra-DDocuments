# PHASE · FENCE-DB-1 — fail-closed Supabase project-ref guard

<!-- claude-code-PHASE-FENCE-DB-1-v1 · rev 1 · 2026-07-17 · Architect-authored, owner-endorsed.
     Relay to AG (Author lane) verbatim. FULL ceremony (api/persistence + trust surface — never lightened). -->

**PLATINUM compliance:** self-configuring, zero owner env step, fail-closed, no
future human vigilance — the code itself becomes physically unable to write to
any Supabase project other than the pinned build DB. This is the PLATINUM face
of the fence: configure-once-in-code, enforce-forever.

**PRECONDITION (S47-1):** valid ONLY while `origin/master == 3d115b9` (Merge
VIZ-BIND-3). On any mismatch: STOP and report the actual `git rev-parse
origin/master` — do not build on a moved tree.

---

## 0 · The trap being fenced

There are **two live Supabase projects**:
- `fjbrkimwvtpwoxhziidh` — the governed EAIP build DB (our runtime SSOT). **The only DB our code may ever touch.**
- `rsiyilsgclghplpoadlf` — a SEPARATE, still-LIVE POC-era CWF database (dev stopped, users still on it). **Our code must be physically unable to write here.**

A misconfigured `SUPABASE_URL` today would silently connect our secret-key client
to the wrong project and write governed rows into a live foreign product. The
fence makes that impossible: a project-ref mismatch fails LOUD and CLOSED before
any client is returned.

**Scope boundary (state, do not exceed):** this phase fences the code write path
only — `getServiceClient()`, through which AG gated-service scripts and all
runtime/replay/golden writes flow. The Operator (Gemini) lane writes via Supabase
MCP DIRECTLY and does NOT pass through this client; it is fenced separately
(Architect-owned: MCP-config pin + Step-0 standing rule). **Do not attempt to
cover the Operator lane in this phase.**

## 1 · The single chokepoint

`api/cwf/_lib/persistence/client.ts` → `getServiceClient()`. It is the ONE place
a real `createClient(...)` is constructed, after resolving
`process.env[DB_ENV.SUPABASE_URL]` / `[DB_ENV.SUPABASE_SECRET_KEY]`. The fence
lives here, immediately after the url/key presence check and before `createClient`.

## 2 · Binding constraints

1. **Graceful-degradation contract UNCHANGED.** url or key absent → warn + return
   `null` exactly as today. The guard fires ONLY on the real-construction path
   (both env vars present).
2. **Test/mocked paths UNAFFECTED.** Callers that pass an explicit `SupabaseClient`
   (e.g. `loadGoldenSpecimenSet(client)`, repositories under test) never reach
   this guard. Do not add the guard anywhere but the env-driven construction path.
3. **Pinned ref = identity invariant, in `shared/dbConstants.ts`** (alongside the
   table-name / env-key invariants), e.g.
   `EXPECTED_SUPABASE_PROJECT_REF = 'fjbrkimwvtpwoxhziidh'`. RULE 1 framing: this
   is a fixed identity invariant, NOT tunable config — it belongs with the other
   invariants, not in env, so there is zero owner env step and the pin cannot be
   silently dropped by an unset var.
4. **Fail-CLOSED, never silent.** On mismatch, THROW a named error
   (`WrongSupabaseProjectError`) whose message names the observed ref and the
   pinned ref. Never warn-and-continue, never return a client. A wrong DB must
   never be reachable.
5. **Ref extraction is explicit.** Parse the hosted pattern
   `https://<ref>.supabase.co`. If the URL is present but does NOT match that
   pattern (unexpected shape), treat it as a mismatch and throw — an unrecognized
   URL shape is itself suspicious. (If a legitimate non-hosted URL is ever needed,
   that is a deliberate code change to an allowlist, not a silent bypass.)
6. **Born-loud (S41-1).** On a successful match, emit exactly one line:
   `[Fence] supabase project ref=<observed> pinned=<expected> ok` — so the pin is
   visible in production logs at first real client construction.
7. **Secret hygiene.** NEVER log, echo, or include `SUPABASE_SECRET_KEY` in the
   log line or the error message. The ref (a public project identifier) is fine;
   the key is not.
8. **Memoization intact.** The guard runs once (the client is cached). A mismatch
   throw must occur before `cached` is set to a live client.

## 3 · Gated sub-phases

- **G1** — add `EXPECTED_SUPABASE_PROJECT_REF = 'fjbrkimwvtpwoxhziidh'` to
  `shared/dbConstants.ts` as an exported identity invariant, with a one-line
  doc comment naming the two-live-DB rationale.
- **G2** — in `getServiceClient()`, after the url/key presence check: extract the
  ref from `url`; if it does not equal the pinned ref, throw
  `WrongSupabaseProjectError` (new named error class, message names both refs,
  no secret); on match, emit the `[Fence]` line, then construct + cache as today.
- **G3** — tests (new file, or extend the client test):
  - match (url = `https://fjbrkimwvtpwoxhziidh.supabase.co`, key present) →
    returns a client, no throw, `[Fence] … ok` line emitted.
  - mismatch (url = `https://rsiyilsgclghplpoadlf.supabase.co`, key present) →
    throws `WrongSupabaseProjectError`, message contains both refs, contains NO
    secret substring.
  - unrecognized url shape (e.g. a custom domain) with key present → throws.
  - url or key absent → returns `null` (degradation contract unchanged).
  Use `__resetServiceClientForTests()` between cases.
- **G4** — CI/test-posture verification (report in the PR): confirm no test
  constructs a REAL env-driven client against a non-pinned ref, and confirm CI
  either mocks the client or (if it sets a real `SUPABASE_URL`) sets it to
  `fjbrkimwvtpwoxhziidh`. If CI would break, STOP and report — do not weaken the
  guard to accommodate it; we fix the CI env, not the fence.

## 4 · Self-verify (evidence required in the PR)

- [ ] `getServiceClient()` returns `null` unchanged when env absent (paste the branch).
- [ ] Mismatch throws `WrongSupabaseProjectError`; paste the test assertion + the error message (redacted key).
- [ ] `[Fence] … ok` line present on match; paste it.
- [ ] `grep -rn "createClient(" api/` still shows exactly ONE call site (this file).
- [ ] No secret in any log/error path (paste the grep proving the key var isn't interpolated into a log/throw).
- [ ] G4 CI-posture finding stated explicitly.

## 5 · Ceremony (FULL — trust/DB surface, no lightening)

Fresh clone AG-side; **unsharded CI on the PR head is the sole test arbiter
(S37-2)** — a local green is not sufficient. Push branch → CI runs → Architect
FAST-GATE review (frozen-surface diff, security greps, full read of the changed
persistence file) → merge `--no-ff` ONLY if CI is green. Report the remote HEAD
hash after merge (RULE 25 — merge isn't done until pushed + remote hash reported).

<!-- END · claude-code-PHASE-FENCE-DB-1-v1 · rev 1 · 2026-07-17 -->
