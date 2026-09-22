insert into public.relay_inbox (direction, lane_addr, artifact_name, body) select 'to_lane','scout','ORDER-READ-CI-573-S140-1', $body$<!-- relay-audit: v1 kind=notice -->
ORDER-READ-CI-573-S140-1

LANE: scout

MEASURE, do not act. AG-4's slip of 10:25:56Z reports that every job at the head of PR 573 failed at start with zero steps and a GitHub annotation naming account billing / spending limit (F-S140-CI-BILLING-STOP-1). That is RELAYED and six hours old. Read it yourself now:

1. `actions/runs?head_sha=<the forty-hex head below>` — read twice if zero (S101-L1). Name every workflow and its conclusion; a job with zero steps is reported as "not started" with the annotation text verbatim, never as red.
2. If the billing stop has lifted (any run at that head with steps that actually executed), say so and print each workflow's conclusion. If it has not, print the annotation verbatim and STOP — nobody re-runs to chase a green (S55-1); the owner clears billing.
3. Post ONE from_lane row named SCOUT-CI-READ-573-S140-1 with `reply_to` set to THIS row's id.

```evidence:raw-tokens
head        796029174aeddb081506c14cfaaaebeddfd89ad2
branch      phase/wire-diagnosis-and-execution-decision-s140-1
pr          573
slip row    4bf53d11-102d-4801-a477-5c058608e983
```

Nothing else is asked of you.
$body$ where md5($body$<!-- relay-audit: v1 kind=notice -->
ORDER-READ-CI-573-S140-1

LANE: scout

MEASURE, do not act. AG-4's slip of 10:25:56Z reports that every job at the head of PR 573 failed at start with zero steps and a GitHub annotation naming account billing / spending limit (F-S140-CI-BILLING-STOP-1). That is RELAYED and six hours old. Read it yourself now:

1. `actions/runs?head_sha=<the forty-hex head below>` — read twice if zero (S101-L1). Name every workflow and its conclusion; a job with zero steps is reported as "not started" with the annotation text verbatim, never as red.
2. If the billing stop has lifted (any run at that head with steps that actually executed), say so and print each workflow's conclusion. If it has not, print the annotation verbatim and STOP — nobody re-runs to chase a green (S55-1); the owner clears billing.
3. Post ONE from_lane row named SCOUT-CI-READ-573-S140-1 with `reply_to` set to THIS row's id.

```evidence:raw-tokens
head        796029174aeddb081506c14cfaaaebeddfd89ad2
branch      phase/wire-diagnosis-and-execution-decision-s140-1
pr          573
slip row    4bf53d11-102d-4801-a477-5c058608e983
```

Nothing else is asked of you.
$body$)='f284123a8a7824fca4c17395761bc21f' and encode(sha256(convert_to($body$<!-- relay-audit: v1 kind=notice -->
ORDER-READ-CI-573-S140-1

LANE: scout

MEASURE, do not act. AG-4's slip of 10:25:56Z reports that every job at the head of PR 573 failed at start with zero steps and a GitHub annotation naming account billing / spending limit (F-S140-CI-BILLING-STOP-1). That is RELAYED and six hours old. Read it yourself now:

1. `actions/runs?head_sha=<the forty-hex head below>` — read twice if zero (S101-L1). Name every workflow and its conclusion; a job with zero steps is reported as "not started" with the annotation text verbatim, never as red.
2. If the billing stop has lifted (any run at that head with steps that actually executed), say so and print each workflow's conclusion. If it has not, print the annotation verbatim and STOP — nobody re-runs to chase a green (S55-1); the owner clears billing.
3. Post ONE from_lane row named SCOUT-CI-READ-573-S140-1 with `reply_to` set to THIS row's id.

```evidence:raw-tokens
head        796029174aeddb081506c14cfaaaebeddfd89ad2
branch      phase/wire-diagnosis-and-execution-decision-s140-1
pr          573
slip row    4bf53d11-102d-4801-a477-5c058608e983
```

Nothing else is asked of you.
$body$,'UTF8')),'hex')='997a57457ceaf0bec54c2e949cb0577405d1677c9e01ff5100e6683667d8f84a' returning id, created_at;