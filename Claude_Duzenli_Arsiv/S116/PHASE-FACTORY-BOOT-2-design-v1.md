# PHASE-FACTORY-BOOT-2 — design v1 (Architect, S117)
Owner ruling verbatim: "1- onayliyorum, 2- hadi devam" on the Architect's option-(a)-with-verbs judgment (chat, 24 Aug ~04:1x TSİ). Supersedes nothing; first design doc of the phase.

## WHY (measured ground, S117 open)
F-S117-FACTORY-STATE-NO-WRITE-CHANNEL-1: lane path is supabase-ro (ADR-006, postgres-enforced 25006); READY/CLAIMED/heartbeat unwritable from any lane. Proven in FACTORY-BOOT-1-AG5-report.md §C2 (writeLane+heartbeat 25006 in-window) and §6. Also cures, same root family: F-S117-FOREMAN-BACKLOG-BLIND-1 (poller anchor at table-max; plus the measured sub-defect: strictly-greater comparison steps over a row AT the anchor), F-S117-FOREMAN-DRAINING-RESOLVE-GAP-1 (no boot rule for booting into stale DRAINING), F-S111-RELAY-CONSUMED-NOT-WRITTEN (same fence, relay side).

## THE RULE BEING AMENDED (verified in repo, not remembered)
ADR-006: developing agent is DB read-only, postgres-enforced. PURPOSE: developer cannot mutate product/governed DATA. This phase does NOT weaken that purpose: lanes gain zero table privileges. They gain NAMED VERBS on the coordination plane only.

## INVARIANTS (the card binds these; implementation is the lane's)
- I1 · New DB principal for lanes ("factory_rpc" class): NO privilege on any table, EXECUTE only on the named SECURITY DEFINER verbs. supabase-ro stays untouched as the read path. Repo precedent: user_quotas/user_roles SECURITY DEFINER + EXECUTE-lockdown discipline (revoke PUBLIC/anon/authenticated).
- I2 · Verbs (closed set, each nonce-checked in SQL): factory_claim(addr, nonce_sha) · factory_heartbeat(addr, nonce_sha) · factory_write_lane(addr, state, nonce_sha) · factory_set_mode(mode, nonce_sha) [foreman: succeeds only when nonce matches lane/AG-5 row's stored nonce] · relay_mark_consumed(card_id, addr, nonce_sha) · relay_post_from_lane(addr, artifact_name, body, nonce_sha). The claim walk's git nonce is stored on the lane row at claim; every later verb compares caller-presented nonce to the stored one. This upgrades ADR-012's JS per-lane write POLICY into a DB-enforced INVARIANT.
- I3 · Secrets: never in repo (ADR-007). Exactly ONE owner placement of the new credential into lane env, named as a card line (S102-YASA-1 secret-class exception). Mechanism (dashboard password set for a LOGIN role, or PostgREST JWT for a NOLOGIN role) is the lane's design decision — the card requires only: no secret byte in repo, one placement, transcripted presence-check (never the value).
- I4 · factory_events stays append-only-by-trigger; verbs INSERT transition events like the S116 apply did; mode transitions keep carrying old value.
- I5 · ADR-006 amendment authored WHOLE (governance artifact, no string surgery): named exception class "coordination-plane verbs"; data tables remain fenced exactly as before.
- I6 · Boot cures ride the same single branch: (a) D1 — window birth orders a DIRECT backlog read by created_at before any DONE derivation; anchor semantics documented; permanent cure = anchor on consumed_at once relay_mark_consumed exists; fix the at-anchor strictly-greater step-over. (b) D2 — boot rule for booting into stale DRAINING/SHUTDOWN: foreman completes the §1y remnant with ITS OWN set_mode (now writable) or writes the escalation TO THE BUS via relay_post_from_lane, never only to a terminal.
- I7 · mail-wait/factoryState.mjs write calls switch from "expect 25006" to the verbs; the fenced:true classification stays for the day the channel is down (third value law).
- I8 · Gates: migration compels registries (dbConstants, grantPolicy, verifyGrants probes — compelled-registry clause), landSelfTest gains the new refusal classes both ways, vitest under api/cwf/__tests__.
- I9 · Two-door: lane AUTHORS migration; Operator APPLIES via db push (ADR-005). Operator card cut after the migration is on master; owner relays BOOT to Gemini then.

## DISPATCH PROTOCOL FOR THIS WAVE (interim until D1 cure lands — itself a measured necessity)
A card posted BEFORE a window boots is invisible to that window's poller (D1). Therefore: owner opens ONE producer window (/wr) → producer claims first FREE address (expected AG-1) → Architect WATCHES THE WIRE for the claim ref → THEN posts FACTORY-BOOT-2-<addr>-BUILD-1-v1 to that address (created_at > its boot anchor → visible in ≤~90s tick). Named wait, measured signal, no sleep-hope (S102-YASA-2 compliant). The card will also order an immediate direct backlog read so the double-lens covers the race both ways.

## STATUS LEDGER OF THE S117 OPEN (for the register at close)
- FACTORY-BOOT-1: PROOF card COMPLETE as re-scoped (report on master, PR #378, master 59fa0988). Criterion 1 EVIDENCED; criterion 6 PARTIAL — write half blocked by D3 by construction. FULL intent (foreman writes its own READY) = FACTORY-BOOT-2 exit condition.
- CI-DIET-1: LANDED (#377) by foreman drain-in-turn under READY gate. eval-canary job read success on run 32678330300 (post-landing master run was in_progress at report time — completion to be read).
- budget-fence: yesterday's (23 Aug 07:42Z) run FAILURE = pre-reconciliation, expected; today's 07:10Z run is the green-on-own-cause probe. Do not reopen A3 on yesterday's red.
END-OF-DESIGN PHASE-FACTORY-BOOT-2-design-v1
