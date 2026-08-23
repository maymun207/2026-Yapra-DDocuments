# PHASE-QDRANT-ENGINE-1 · v1
**Lane: AG-3 · S102 · Wave 8-1 (owner-approved order, binding). Basis:
`KARAR-QDRANT-HOSTING-1-v1` (owner ruling, verbatim conditions inherited below).**

**PRECONDITION (S47-1):** base = `origin/master` @
`cdb9f1f9fb67559938e5cf2d84699f9021ab2ee9` (LAW-LEDGER-1 merge). AG-1 runs a
parallel probe lane (`probe/canary-500-f-s102`) that touches ONLY
`.github/workflows/**` + `docs/**` and mints nothing — your fences are disjoint.
If master moved when you start, report the new hash and continue.

**Branch:** `phase/qdrant-engine-1` · push · PR against master (unsharded CI is
the arbiter; `total_count:0` = FAILED — assert the run EXISTS first, S101-L1).
**Report:** `docs/relay/PHASE-QDRANT-ENGINE-1-report.md`

---

## 0 · SCOPE FENCE — read before designing (RULE-23)

The IR-4 contract (`cwf-ir-pathb-hybrid-logic-v1_3`) is a **FUTURE-STATE
CONTRACT, not a build order**. This phase inherits exactly TWO invariants from
it and nothing else:
1. the encoder is **deterministic** (bge-m3, "LLM DEĞİL" — same input, identical
   vector, every time), and
2. the port speaks **hybrid**: dense + sparse from one component, fusion (RRF)
   engine-side.

**NOT in scope, by name:** federated architecture · multi-tenancy · per-tenant
collections · OPA. The port may be tenant-SHAPED; the install is TENANT-ZERO
(`check:tenant-zero` gates this and now guards Turkish owner-law text too —
mind F-S102-TENANT-LENS-SUFFIX-BLIND if any doc you write uses the words). If
this phase starts becoming platform work, STOP and report — that failure mode
was priced in advance.

## 1 · LIVE-READ FIRST (D-1 / S65-1) — what the Architect already read, and what you must

Architect's reads (evidence in this card, do not re-litigate):
- Valves live: `vector.enabled=0` · `vector.engine="incumbent"` · both
  `system`/published (Supabase read, S102). The lane is born OFF and stays OFF
  through this phase.
- Port contract: `api/cwf/_lib/vectorLane/types.ts` — `EmbeddingEncoder` and
  `VectorIndex` are separate KINDS; C1 forbids riding the LLM seam; C2 requires
  one encoder emitting dense+sparse. `resolveVectorLane.ts` `ENGINE_FACTORIES`
  carries `incumbent` only, refusal-on-unknown is mutant-proven, and its own
  comment names THIS phase as the one that adds `qdrant`.
- Infra shape: compose is delivered via SSM parameter
  (`${ssm_param_prefix}/compose`), fetched by cloud-init at runtime
  (`infra/aws/langfuse/ssm.tf`, `compute.tf`). ⚠ **`user_data_replace_on_change
  = true`** — any edit to `cloud-init.sh.tftpl` REPLACES THE INSTANCE. The
  observability host must not be recreated for a compose change.

Your reads (paste findings into the report before writing code):
- The compose content's source of truth and its UPDATE PATH to the running box
  (SSM param edit + what re-applies it: ssm send-command? re-fetch unit? state
  it from the files, never from assumption — and if the answer is "only a
  reboot", say so and STOP for an Architect ruling rather than improvising).
- The current half-hourly obs-host probe: where it lives, what it checks
  (recon finding: HOST only, knows nothing of containers).
- `scripts/vectorSeamBirthProof.ts` — the corpus and assertions the parity gate
  will reuse.
- Host capacity BEFORE compose-up: free memory and EBS headroom on
  `i-030c2b4fadebfa229` (t3.xlarge, 16 GiB, six containers today). bge-m3 is
  ~500MB-class, no GPU. Numbers in the report, not adjectives.

## 2 · REQUIREMENTS (the KARAR's conditions are load-bearing, not advisory)

R1 — **Two containers join the existing compose:** `qdrant` (hybrid index:
dense + sparse + server-side RRF) and `bge-m3` (deterministic encoder service).
`restart: always` like their six siblings. Compose change travels the SSM-param
path — the cloud-init template is untouched (see the instance-replacement trap).

R2 — **Container-level health probes are MANDATORY before anything serves.**
Extend the obs-host probe (or add a sibling with the same cadence) so BOTH new
containers answer "who monitors it" BY NAME, in advance. A probe that reads the
HOST green while a container is dead is the exact blind spot the KARAR refuses.
Probe output must distinguish "container down" from "could not read"
(MEASURE-READ-HONESTY-1).

R3 — **The `qdrant` engine enters `ENGINE_FACTORIES`** behind the existing port:
encoder adapter (bge-m3 HTTP) + index adapter (Qdrant hybrid query, RRF
server-side). No silent fallback anywhere: an unreachable Qdrant with
`vector.engine=qdrant` is a LOUD refusal carrying the engine name — the valve
law already proves this shape for unknown engines; keep it for unreachable ones.

R4 — **Determinism is asserted against the LIVE encoder**, not documented:
same input → byte-identical vector, N repeats, in the birth proof. A sampled or
drifting encoder invalidates every stored vector silently — that is why this is
a test, not a note.

R5 — **PARITY GATE against the incumbent** on the birth-proof corpus: same
queries, both engines, agreement measured and REPORTED as numbers (rank overlap
and any misses named). Parity is the SWITCH precondition, not this phase's
finish line — **this phase does NOT flip `vector.engine`**. The switch is a
separate governed publish, owner-consented, after parity is read.

R6 — **Budget-fence awareness:** the monthly fence cycle (~each 20th — DAYS
away) must know two more containers live on this box; this host was once
STOPPED by a budget action. Record in the report where the fence learns it.
Index loss = re-sync, never data loss (Supabase stays source of truth);
rollback = remove containers, zero data risk. EBS growth is the one number to
watch — record the baseline you measured in §1.

## 3 · TESTS

Adapter unit tests (encoder determinism · hybrid query shape · refusal-on-
unreachable, both directions per D-5) · birth proof extended to run the parity
gate and emit its numbers · existing vectorLane tests stay green untouched.
`api/cwf/_lib/**` is a mapped codeArea: expect a reseal + docVersion mint.
**Wave-seal law (S101-L2):** you hold the seal token this wave (AG-1's probe
mints nothing), but mint PROVISIONALLY anyway — single-file commit, dropped and
re-derived at the merge turn against whatever master then carries.

## 4 · GATES

`npm run test` · `typecheck:api` · `check:doc-drift` (reseal expected — do it
honestly: redraw what changed, `unchanged` is a measurement) ·
`check:tenant-zero` · `relay-audit [OK] kind=phase` · CI on PR head,
`total_count >= 1`.

## 5 · DELIVERABLES

```
branch: phase/qdrant-engine-1
report: docs/relay/PHASE-QDRANT-ENGINE-1-report.md
```

Post-merge proof (S63-1, named now): Architect reads BOTH container probes
green from production telemetry, runs the parity numbers independently, and
only then does the owner see a switch-consent question. Merge is `--no-ff`
after a separate Architect GO with a byte-identical message. If the EC2 apply
step needs a human hand anywhere (SSM console, a command that must run from an
authenticated shell), STOP and report the exact step — that is owner-consent
territory, never improvised.

TAIL-ANCHOR: PHASE-QDRANT-ENGINE-1-v1
