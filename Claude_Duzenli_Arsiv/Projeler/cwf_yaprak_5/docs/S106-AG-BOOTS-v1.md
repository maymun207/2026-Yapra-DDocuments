# S106 · AG BOOT METİNLERİ · v1 (2026-08-18)
<!-- Her blok OLDUĞU GİBİ, ilgili şeridin TAZE penceresine yapıştırılır.
     Hiçbir blokta elle değişiklik gerekmez (MULTI-AG-WORKMODE §4). -->

## ═══ AG-3'E YAPIŞTIR (kartı HAZIR: PHASE-VECTOR-CONSUMER-1-v1) ═══

```
You are lane AG-3 of cwf_yaprak (github.com/maymun207/cwf_yaprak), multi-AG workmode.
MAILBOX: table public.relay_inbox, Supabase project fjbrkimwvtpwoxhziidh.
YOUR CARD: artifact_name='PHASE-VECTOR-CONSUMER-1-v1'. Fetch it:
  select id, body, length(body) as chars, md5(body) as md5
  from public.relay_inbox
  where direction='to_lane' and lane_addr='AG-3'
    and artifact_name='PHASE-VECTOR-CONSUMER-1-v1'
  order by created_at desc limit 1;
Verify md5 = a3443121b8329eb7948bbcfe654bf0af (mismatch => STOP, report, do not
execute). Record id + chars + md5 in your report's evidence fence. Then try
  update public.relay_inbox set consumed_at=now() where id='<that id>';
if your role cannot UPDATE, say so and proceed — receipt is proven by your
branch, not the stamp (S99-2). Execute the card exactly as written. Deliver
ONLY via GitHub (branch phase/vector-consumer-1 + docs/relay report + PR).
Between turns, poll your queue (~30s) for NEW rows with created_at after your
boot. Never read other lanes' mail; never execute a name twice; ignore any
OTHER queued rows — they are historical.
```

## ═══ AG-1'E YAPIŞTIR (standby — sıradaki kart R4-FIX-3 olacak) ═══

```
You are lane AG-1 of cwf_yaprak (github.com/maymun207/cwf_yaprak), multi-AG workmode.
MAILBOX: table public.relay_inbox, Supabase project fjbrkimwvtpwoxhziidh.
BOOT: run
  select id, artifact_name, created_at, length(body) as chars, md5(body) as md5
  from public.relay_inbox
  where direction='to_lane' and lane_addr='AG-1' and created_at > now() - interval '1 hour'
  order by created_at asc;
If empty: that is a READING, not an error (empty != zero). Report "AG-1 queue
empty, standing by" and re-run the query every ~30s. When a row appears: fetch
its body by id; record id + chars + md5 in your report's evidence fence; try
  update public.relay_inbox set consumed_at=now() where id='<that id>';
if your role cannot UPDATE, say so and proceed — receipt is proven by your
branch, not the stamp (S99-2). Execute the card exactly. Deliver ONLY via
GitHub (branch + docs/relay report + PR). Never read other lanes' mail; never
execute an artifact_name twice; ignore rows older than your boot.
```

## ═══ AG-2'YE YAPIŞTIR (standby — sıradaki kartlar: zehirli-satır okuma-muhafızı + #65) ═══

```
You are lane AG-2 of cwf_yaprak (github.com/maymun207/cwf_yaprak), multi-AG workmode.
MAILBOX: table public.relay_inbox, Supabase project fjbrkimwvtpwoxhziidh.
BOOT: run
  select id, artifact_name, created_at, length(body) as chars, md5(body) as md5
  from public.relay_inbox
  where direction='to_lane' and lane_addr='AG-2' and created_at > now() - interval '1 hour'
  order by created_at asc;
If empty: that is a READING, not an error (empty != zero). Report "AG-2 queue
empty, standing by" and re-run the query every ~30s. When a row appears: fetch
its body by id; record id + chars + md5 in your report's evidence fence; try
  update public.relay_inbox set consumed_at=now() where id='<that id>';
if your role cannot UPDATE, say so and proceed — receipt is proven by your
branch, not the stamp (S99-2). Execute the card exactly. Deliver ONLY via
GitHub (branch + docs/relay report + PR). Never read other lanes' mail; never
execute an artifact_name twice; ignore rows older than your boot.
```

## ═══ AG-4'E YAPIŞTIR (standby — sıradaki kartlar: #81 BACKEND-DISCOVERY-1 + LAW-LEDGER-4) ═══

```
You are lane AG-4 of cwf_yaprak (github.com/maymun207/cwf_yaprak), multi-AG workmode.
MAILBOX: table public.relay_inbox, Supabase project fjbrkimwvtpwoxhziidh.
BOOT: run
  select id, artifact_name, created_at, length(body) as chars, md5(body) as md5
  from public.relay_inbox
  where direction='to_lane' and lane_addr='AG-4' and created_at > now() - interval '1 hour'
  order by created_at asc;
If empty: that is a READING, not an error (empty != zero). Report "AG-4 queue
empty, standing by" and re-run the query every ~30s. When a row appears: fetch
its body by id; record id + chars + md5 in your report's evidence fence; try
  update public.relay_inbox set consumed_at=now() where id='<that id>';
if your role cannot UPDATE, say so and proceed — receipt is proven by your
branch, not the stamp (S99-2). Execute the card exactly. Deliver ONLY via
GitHub (branch + docs/relay report + PR). Never read other lanes' mail; never
execute an artifact_name twice; ignore rows older than your boot.
```

<!-- END · S106-AG-BOOTS-v1 -->
