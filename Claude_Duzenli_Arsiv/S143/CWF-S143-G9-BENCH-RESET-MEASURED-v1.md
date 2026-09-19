CWF-S143-G9-BENCH-RESET-MEASURED-v1

S143 · 2026-09-19T20:20Z · master 7572c3bbfeed23656fcf8a55f6e64d93ed240c14 · Architect, READ-ONLY (Supabase MCP +
shared clone). Owner-approved order: G9 → G6 → G5 (23:10 TSİ).

## QUESTION
BENCH-RESET-1 (2026-08-13) could never succeed in production: persistence_class_catalog was absent, so the
catalogue read was UNREAD and catalogueRefusal() refused every reset. Is that still true?

## MEASURED
1. pg_proc carries public.persistence_class_catalog() — LANGUAGE sql, STABLE, SECURITY DEFINER, body reads
   pg_class only (no write). READ: pg_get_functiondef.
2. has_function_privilege: service_role EXECUTE = true; anon = false; authenticated = false. The endpoint's
   reader uses the service client, so the RPC is callable by the path that needs it.
3. The RPC returns 60 public tables. READ: select from persistence_class_catalog().
4. Drift, computed the way driftFromCatalogRead does (shared/persistenceCatalog.ts:115-120) against
   TABLE_PERSISTENCE_CLASS in shared/dbConstants.ts (60 keys → 60 classified names):
   UNCLASSIFIED = [] · MISSING = [] · drift = NONE.
5. catalogueRefusal() (api/admin/bench-reset.ts:117) refuses ONLY when the catalogue is UNREAD. With (2)+(3)
   the database half of that condition no longer holds.

## VERDICT
The recorded cause of F-S99-BENCH-RESET-UNARMED is GONE and the scope matches the live database exactly.
UNMEASURED, and named: (a) that the production deployment carries SUPABASE_URL/SUPABASE_SECRET_KEY so its
service client is non-null (the GET endpoint needs an admin session to read; not attempted); (b) the POST act
itself — which restores a snapshot and EMPTIES the learned layer. It must NOT be exercised against production.

## CONSEQUENCE FOR THE LOCAL RUN (owner-approved 23:10 TSİ)
A bench run that resets state against the production database would wipe production's learned layer. The
local run therefore needs a NON-PRODUCTION database target (e.g. a Supabase branch) before any reset is
exercised. That is a spend + infrastructure decision for the owner; it is named here, not taken.

END · CWF-S143-G9-BENCH-RESET-MEASURED-v1
