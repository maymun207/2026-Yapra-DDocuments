# KARAR-QDRANT-HOSTING-1 · v1 — owner ruling, S100 (2026-08-14)

**THE RULING (owner, verbatim intent):** the vector engine goes to **AWS — the
existing Langfuse EC2** (`i-030c2b4fadebfa229`, eu-central-1, t3.xlarge,
4 vCPU / 16 GiB, six-container compose today per RECON-VECTOR-QDRANT-1).

**What lands there (Wave 8 · QDRANT-ENGINE-1):** TWO containers joined to the
existing compose —
1. **Qdrant** (hybrid index: dense + sparse + server-side RRF — the committed
   single-component choice of cwf-ir-pathb-hybrid-logic-v1_3 §C1), and
2. **bge-m3 embedding service** (deterministic encoder, NOT an LLM; ~500MB
   class, no GPU — contract §C2).

**Conditions the ruling carries (priced in, not discovered later):**
- **Container-level health probes are MANDATORY** before the switch: today's
  half-hourly obs-host probe covers the HOST only and knows nothing about a
  container on it (recon finding). OBS-HOST-HEALTH extends to both new
  containers — who-monitors-it is answered by name, in advance.
- **Coupling accepted with eyes open:** one box now carries observability AND
  retrieval. Mitigation is the availability floor (contract invariant 3):
  Qdrant outage only drops the federated/vector lane; the incumbent default
  engine and core capabilities keep living — the switch valve
  (`vector.engine`) publishes back to `incumbent` in one act.
- **Budget-fence lesson applies:** this EC2 was once STOPPED by a budget
  action (Langfuse incident). The monthly fence cycle (~each 20th) must know
  two more containers live here; capacity read before compose-up.
- **Source-derivative invariant:** index loss = re-sync, never data loss;
  Supabase stays source-of-truth. Rollback = remove containers, zero data risk.
- **Marginal cost ~$0** (box already provisioned); EBS/disk growth is the one
  number to watch, read at Wave 8 apply time.

**Sequencing unchanged:** VECTOR-SEAM-1 (in flight, AG-3) births the port +
incumbent default; QDRANT-ENGINE-1 (Wave 8 first item) brings the two
containers + the Qdrant adapter + the PARITY GATE against the incumbent; the
switch is a governed publish after parity, owner-consented.

TAIL-ANCHOR: KARAR-QDRANT-HOSTING-1-v1
