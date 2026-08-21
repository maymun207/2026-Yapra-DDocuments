# OPERATOR — G5+F92 PERSONAL-OVERRIDE CLEANUP · v1

<!-- cwf-operator-G5-F92-personal-cleanup-v1 · rev 1 · 2026-07-14 · Session 43.
     PLATINUM compliance: machine executes the full plan in ONE visit; the owner's single
     Consent = relaying this prompt. Pattern: E3/F73 index-guarded jsonb surgery (the family's
     latest). Scope: DELETE all remaining personal MCP override elements — they hold RAW
     secrets; the global, secret-by-reference connections are the sole survivors (one
     connection per backend, the E-consolidation end state). -->

```
FENCE — OPERATOR LANE.
• DB'ye erişimin TEK yolu Supabase MCP'dir. Başka hiçbir yol kullanma.
• .env, .env.local, .env.* dosyalarını AÇMA, OKUMA, GREP'LEME, ÖZETLEME.
• Servis anahtarıyla (SUPABASE_SECRET_KEY / service_role) elle istemci KURMA.
• Repoya veya diske dosya YAZMA (.agents/operator-inbox/ hariç).
• Bunlardan biri gerekli görünüyorsa DUR ve bildir — kendi başına çözme.
• Rapor = ham çıktı. Yorum yok, düzeltme yok, "yardımcı olmak için" ek adım yok.
```

**Project: `fjbrkimwvtpwoxhziidh`.** A-1 must print the CONNECTED project ref as ONE line —
never the organization's project list. If it differs, STOP.

---

## A · PRE-READS (read-only)

**A-1.** Connected ref, one line → `fjbrkimwvtpwoxhziidh`.
**A-2.** Resolve `ksadmin@ardictech.com` → its `user_id` from `auth.users` (report the uuid).
**A-3.** Read BOTH target rows from `mcp_settings` and paste each `servers` array with the
standard redaction (url host only; any `apiKey`/`Authorization` value → `present`):
- **ROW-K** = the ksadmin row (user_id from A-2). Expected: exactly TWO elements —
  `armesMes` (`enabled=false`) and `supersetArmes` (`enabled=false`).
- **ROW-D** = user_id `d388d5c2-a188-48cf-8c40-a1c716877e0f`. Expected: exactly ONE element —
  `id='mcp-1782478446699-0'`, `name='supersetArmes'`, `enabled=true`, raw `Authorization`
  header present, `backend_id='superset'`.

**A-4 · PREDICATE GATES (machine-checkable; a failed clause SKIPS that row's write only):**
- **GATE-K:** ROW-K has exactly 2 elements, names = {armesMes, supersetArmes}, BOTH
  `enabled=false`, NEITHER referenced anywhere else. All true → K-write authorized.
- **GATE-D:** ROW-D's single element matches every expected field above. All true → D-write
  authorized.

## B · THE WRITES (only the authorized ones; E3 discipline)

**B-K.** Pre-image already pasted (A-3 = rollback reference). ONE update:
`servers = '[]'::jsonb` on ROW-K, WHERE-guarded on user_id AND `jsonb_array_length(servers)=2`.
Nothing else on the row changes.
**B-D.** ONE update removing index of `mcp-1782478446699-0` (`#- '{i}'`), WHERE-guarded on
user_id AND the element at that index having that exact id. Expected result: `servers = []`.
Constraints (both writes): no rewrite/re-serialize of anything untargeted · no other rows ·
no DDL · surgical impossibility ⇒ STOP and report.

## C · POST-READS
- **G-a:** ROW-K `servers` = `[]`. ✅/❌
- **G-b:** ROW-D `servers` = `[]` and the id appears nowhere. ✅/❌
- **G-c:** GLOBAL rows byte-untouched (re-read, host-redacted). ✅/❌
- **G-d · idempotence:** re-run both updates → 0 rows each (guards no longer match). ✅/❌

## D · ONE BONUS READ (G5's spirit, report-only — fix NOTHING)
For every GLOBAL server element: report `name · secret posture` where posture ∈
{`apiKeyEnv:<NAME>` | `inline-secret-present` | `none`}. (An `inline-secret-present` on a
global row mints a follow-up — the Operator only reports.)

## REPORT
A → B → C → D, raw outputs, gates ✅/❌, deviations with the word **STOPPED**.

<!-- END · cwf-operator-G5-F92-personal-cleanup-v1 · rev 1 · 2026-07-14 -->
