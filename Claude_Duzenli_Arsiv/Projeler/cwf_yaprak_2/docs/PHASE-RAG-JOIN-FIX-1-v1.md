# PHASE-RAG-JOIN-FINISH-1 · FIX-1 · v1
<!-- PHASE-RAG-JOIN-FINISH-1-FIX-1-v1 · 2026-08-01 · S75 · Architect → AG.
     Closes RAG-PACK-IDSHAPE-1: the pack's ID-shape lesson (UUID-only, banked
     from the B4-lite probe walk) is contradicted by the LIVE schema (yesterday's
     RAG-team session changed the surface: name-based required selectors).
     The preamble is live on every turn since G3 — fix BEFORE the G4.4 witness. -->

## SCOPE — exactly one behavior change
File: `api/cwf/_lib/prompt/backends/machine-knowledge-base/pack.ts`.
Replace the KİMLİK ŞEKLİ bullet of `PROTOCOL_PREAMBLE` with:

```
- KİMLİK ŞEKLİ: bilgi tabanı sorgu araçları kayıtları AD alanlarıyla seçer (ör. machine_name, parameter_name) — bu alanlara insan-okunur adı olduğu gibi ver. Şemalarda görülen opsiyonel id alanları ise her zaman UUID bekler: bir id alanı kullanacaksan UUID'yi önce listeleme/arama araçlarıyla (knowledge_list, knowledge_search) bul; ASLA tahmin etme, kısa addan türetme. Addan emin değilsen önce knowledge_list ile doğrula.
```

The attribution bullet and everything else stays byte-identical. Update the
header comment's one stale sentence (UUID-only claim) to reflect the live
surface; adjust the pack test if it pins the old wording (genericity test +
positive control stay). VERIFY the new text against the live mirror schema
bytes you already hold — it must not contradict any of the 5 schemas.

## RITUAL (compressed, single round)
Branch `phase/rag-join-fix-1` off master `6e3dea43` → PR → CI → report:
diff + new preamble bytes + test result + CI link. Architect reviews from
fresh clone and returns GO+merge message in one turn. After merge: Vercel
prod build must be READY (Architect reads it) BEFORE the owner's G4.4 witness
— the fix only exists in the turn path once deployed.

Report tail anchor: `END-OF-RAGFIX1-REPORT-v1`.

<!-- END · PHASE-RAG-JOIN-FINISH-1-FIX-1-v1 -->
