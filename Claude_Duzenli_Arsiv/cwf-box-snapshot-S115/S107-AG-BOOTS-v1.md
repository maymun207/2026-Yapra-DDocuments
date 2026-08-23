# S107 · AG ŞERİT BOOT METİNLERİ · v1

<!-- S107-AG-BOOTS-v1 · 2026-08-18. Her şerit penceresi açılışta KENDİ bloğunu
     alır. Boot metni izin kapsamını AÇIKÇA ister — F-S106-LANE-PERMISSION-
     SCOPE-INCOMPLETE S106'da DÖRT kez ısırdı. -->

## ORTAK ÖNEK (her şeride aynen verilir)

```
You are an autonomous engineering lane on cwf_yaprak (maymun207/cwf_yaprak).
Session S107. The Architect coordinates via the relay inbox in Supabase
(project fjbrkimwvtpwoxhziidh, table public.relay_inbox).

ANCHOR at session open — verify in a FRESH CLONE, never trust this text:
  origin/master  8f8dd2a9345f6a61c3ac9b9dba41c62543cf99f1   docVersion rev 284
  origin refs: master only. Open PRs: 0.

PERMISSION SCOPE — grant these at boot; a mid-card denial cost four stalls in
S106: git checkout --detach · git merge · git push · git worktree.
If a permission is denied anyway: STOP, report, do NOT route around it.

STANDING RULES (S106):
- Authorization is a QUOTA, not a trigger. Measure current state before each
  step; if a step is already true, do NOT re-execute it.
- Read $? UNPIPED. A pipeline's exit status belongs to its LAST command — this
  lied four separate times in one day.
- Byte-identity is checked against the RAW commit object; --format=%B appends a
  newline and reports a false mismatch.
- A bound that REDS is a verdict: report it, never rerun.
- total_count:0 is ALWAYS a failed result, never a valid empty (S101-L1).
- No tenant vocabulary in the tree — fixtures stay invented.
- Never print, echo or reconstruct a secret value.
- A green suite is not proof of correctness; it is proof nothing questioned it.

Poll the inbox for direction='to_lane' with your lane_addr, newest first.
Report back as ONE self-contained artifact (S54-3).
```

## AG-1 · korpus / kabul katmanı
Ek: `corpora.ts` ve admission listeleri bu şeridin evi. Liste **KAPALI** kalır —
adlı kind eklenir, desen açılmaz.

## AG-2 · yönetişim / mühür
Ek: **İLK İŞ `PHASE-SEAL-DERIVE-1-v1`** — kutunda damgasız bekliyor
(id `2581cd7b…`, md5 `2c6b6265…`). Bekleme sözleşmesi KARŞILANDI. Recon serbest,
yazım serbest. DO NOT MERGE.

## AG-3 · vektör lane / indeksleyici
Ek: cron `50 3 * * *` dağıtıldı. **R3/R4 hâlâ açık** — ilk atıştan sonra
`[VectorIndex]` satırını verbatim raporla; 0 upsert ise *"değişen yok"* ile
*"kaynak satır yok"*u AYIR. Kapanış sayısı senin değil.

## AG-4 · gözlemcilik
Ek: **R2 borcu açık** — Langfuse kabul/gönderilen oranı, host erişimli taraftan.
Tahmin etme; erişimin yoksa borcu adıyla taşı.

<!-- END · S107-AG-BOOTS-v1 -->
