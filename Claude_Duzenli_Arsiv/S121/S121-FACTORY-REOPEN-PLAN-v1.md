# S121 · FACTORY REOPEN — the measured plan, and the one consent it needs

MEASURED-AT 2026-08-27 10:50Z (13:50 TSİ). Written on the owner's instruction *"fabrikayı bir
şekilde artık açmamız lazım."*

---

## 1 · WHAT THE LIVE STATE ACTUALLY ALLOWS — measured, not assumed

| measurement | value | why it matters |
|---|---|---|
| mode row | `READY`, set 2026-08-26 02:21:24Z by AG-5 | the database never learned the factory stopped |
| lane rows | AG-1..AG-4 `WORKING`, AG-5 `CLAIMED`, all holding nonces, heartbeats frozen 05:56–05:58Z | five addresses held by dead windows |
| **stored nonce vs live lane ref** | **all five match, exactly** — e.g. AG-1 `9235075a5460f4c539589ccfd40e3cac27839c08` = `refs/heads/lane/AG-1` | **decisive: see §2** |
| `factory_claim` shape 2 | re-claim permitted when `v_old = 'CLOSED'` — `supabase/migrations/20260824060000_factory_write_channel.sql` | a CLOSED row is a lawful, *ordinary* takeover path |
| `factory_reclaim` | deployed, byte-identical to its migration, `cwf_lane` holds EXECUTE — **behaviour untested** | the recovery verb we would rather NOT depend on |
| Architect's DB identity | `current_user = postgres`; `has_function_privilege` on `factory_write_lane` and `factory_set_mode` = **true** | **the fence is a RULE, not a permission — see §4** |

## 2 · THE FINDING THAT MAKES THIS CLEAN

**Because every stored nonce still equals its live lane ref, the death certificate can be written
with the ORDINARY verb.** `factory_write_lane(addr, 'CLOSED', <that sha>)` passes
`factory_assert_nonce` — no takeover, no forgery, and **no dependence on the untested
`factory_reclaim`.**

And it would not be a false certificate. The five windows are physically dead: the owner shut them,
heartbeats have been frozen for over four hours, and not one lane ref has moved. **`CLOSED` here is
a true sentence**, which is exactly the property `PHASE-FACTORY-RECOVERY-1` refused to give up when
it rejected a release verb for "manufacturing a death certificate".

**Writing the certificate now converts reopening from *"depends on a verb nobody has ever run"*
into *"the ordinary claim path"*. That is the whole argument for doing it before opening anything,
rather than after.**

## 3 · THE PLAN — one address, not five

**Recommendation: open ONE window. Not the factory.**

Measured reasons, not preference:

1. **There is exactly one product card to cut** — the provenance export card (precondition 4). One
   card does not need five addresses.
2. **Five producers behind one serial verifier is the measured defect** (`S120-WHERE-IT-BROKE-v1`
   §"WHERE IT BROKE, STRUCTURALLY"). One producer behind one verifier is 1:1 and the defect does not
   arise.
3. **The mode that has actually worked is a single address with a decision in hand**: seventeen
   minutes to a verified fix. The mode that failed was five addresses waiting ten hours.
4. **"Cannot run unattended" is unfixed.** Nothing in S121 addressed it. A single window while the
   owner is at the machine is the only configuration whose failure mode is bounded.
5. Opening five to cut one card is how S120 produced 43 factory cards out of 47.

**What would change this, stated in advance:** three or more independent cards, each naming an
acceptance criterion, queued at once. Then the parallelism is earning something. Today it is not.

### The sequence, in order, with who does each step

| # | step | actor | needs |
|---|---|---|---|
| 1 | mode row → `DRAINING` | **Architect** — the mode row is the declared surface (memory seed §7), on owner command | the command already given |
| 2 | five lane rows → `CLOSED` via `factory_write_lane(addr,'CLOSED',<matching nonce>)` | **Architect, but OUTSIDE the declared surface** | **a named, one-off owner consent — this is the only thing blocking** |
| 3 | mode row → `SHUTDOWN` | Architect | — |
| 4 | mode row → `READY` | Architect | — |
| 5 | open **one** window as AG-1; its boot claims normally over a `CLOSED` row (shape 2) | **the owner's hand** — no machine can open an IDE window | irreducible real-world act |
| 6 | dispatch **one** card: the provenance export | Architect | steps 1–5 |

**Steps 1–4 are seconds of work and fully reversible** — every transition writes a
`factory_events` row, and the mode can be moved back.

**No ref deletion is required.** A returning window pushes its own nonce to `refs/heads/lane/AG-1`
and claims over the CLOSED row. Nothing has to be destroyed, which is why this plan needs no
`S102-YASA-3` destructive-plan consent — only the lane-row consent in step 2.

## 4 · THE HONEST DECLARATION ABOUT AUTHORITY

`current_user` on the Architect's database surface is **`postgres`**, and it holds EXECUTE on both
`factory_write_lane` and `factory_set_mode`. **There is no technical barrier to this seat writing
all five lane rows right now.** The barrier is `cwf-memory-seed-CWF5-v3` §7 — a *rule* the Architect
obeys, not a permission it lacks.

That distinction is stated rather than left implicit, because a fence that is only a rule fails
silently the day someone forgets it, and because the owner is entitled to know that his consent
here is governing a capability that already exists rather than granting one.

## 5 · WHAT THE OWNER IS ACTUALLY BEING ASKED

Two things, and nothing else:

1. **A named consent for step 2** — "the five lane rows may be written CLOSED". One sentence. It
   is the only step outside the Architect's declared surface.
2. **Opening one window** when steps 1–4 report done.

Everything else is machine work and is not carried to him.

<!-- END · S121-FACTORY-REOPEN-PLAN-v1 -->
