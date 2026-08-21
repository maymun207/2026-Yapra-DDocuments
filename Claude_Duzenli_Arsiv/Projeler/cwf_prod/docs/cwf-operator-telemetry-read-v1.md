# OPERATOR · read telemetry_events ledger (last turns) — value-safe

<!-- cwf-operator-telemetry-read-v1 · rev 1 · 2026-07-18 · Architect-authored, owner-endorsed.
     Relay to Gemini (Operator lane) verbatim. READ-ONLY. Aggregate/shape only — no PII,
     no message text, no secret values. -->

```
READ-ONLY DIAGNOSTIC on the telemetry ledger. Run the labelled SELECTs, paste each
result verbatim. DISCIPLINE:
  RULE A — NEVER `SELECT *`. Name exact columns.
  RULE B — NEVER output raw message text, user content, or any secret. Where a
           payload column exists, select only its KEYS or a boolean/count, never the
           free-text value. If unsure whether a column holds user text, DO NOT select
           it — select its presence (IS NOT NULL) instead.
  RULE C — READ-ONLY. No writes. If a query would write, STOP.
  RULE D — Paste each query's output verbatim under its label; on error paste the error.

STEP 0 — confirm connected project_ref == fjbrkimwvtpwoxhziidh EXACTLY. If not
(e.g. rsiyilsgclghplpoadlf), STOP and report. Run nothing.

── Q1 · ledger schema (discover columns, don't assume) ──────────────
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_schema='public' AND table_name='telemetry_events'
ORDER BY ordinal_position;

── Q2 · event-type distribution, last 24h ───────────────────────────
(Use the event-type/kind column Q1 revealed — likely `event_type` or `kind`.)
SELECT <event_type_col> AS event_type, count(*) AS n
FROM public.telemetry_events
WHERE created_at > now() - interval '24 hours'
GROUP BY <event_type_col>
ORDER BY n DESC;

── Q3 · governance/safety catches, last 24h (the whole point) ───────
Count the safety-relevant event types — grounding violations, empty-completion
guard fires, scope-authority catches, retries. Adapt the WHERE to whatever Q2's
event_type values show (e.g. ILIKE '%grounding%', '%empty%', '%violation%',
'%scope%', '%retry%', '%guard%').
SELECT <event_type_col> AS event_type, count(*) AS n,
       min(created_at) AS first_seen, max(created_at) AS last_seen
FROM public.telemetry_events
WHERE created_at > now() - interval '24 hours'
  AND ( <event_type_col> ILIKE '%grounding%'
     OR <event_type_col> ILIKE '%empty%'
     OR <event_type_col> ILIKE '%violation%'
     OR <event_type_col> ILIKE '%scope%'
     OR <event_type_col> ILIKE '%retry%'
     OR <event_type_col> ILIKE '%guard%' )
GROUP BY <event_type_col>
ORDER BY n DESC;

── Q4 · last 10 turns' shape (session/trace + counts, NO content) ───
(If there is a session/trace id column, group by it. Select ONLY: the id, event
count, distinct event types, first/last time. NO message text.)
SELECT <session_or_trace_col> AS turn_id,
       count(*) AS events,
       count(DISTINCT <event_type_col>) AS distinct_event_types,
       min(created_at) AS started, max(created_at) AS ended
FROM public.telemetry_events
WHERE created_at > now() - interval '6 hours'
GROUP BY <session_or_trace_col>
ORDER BY max(created_at) DESC
LIMIT 10;

── Q5 · payload keys only (what's recorded, never the values) ──────
For the safety event types from Q3, show the JSON KEYS present in the payload
column (NOT the values) so we see what's captured without reading content.
(Use the jsonb payload column Q1 revealed — likely `data` or `payload`.)
SELECT DISTINCT jsonb_object_keys(<payload_col>) AS payload_key
FROM public.telemetry_events
WHERE created_at > now() - interval '24 hours'
  AND <event_type_col> ILIKE ANY (ARRAY['%grounding%','%empty%','%violation%','%retry%'])
ORDER BY payload_key;

END. Paste Q1–Q5 verbatim. Read-only, value-safe. No other action.
```

<!-- END · cwf-operator-telemetry-read-v1 · rev 1 · 2026-07-18 -->
