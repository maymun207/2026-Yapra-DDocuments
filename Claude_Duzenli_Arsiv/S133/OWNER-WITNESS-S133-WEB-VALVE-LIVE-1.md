# OWNER-WITNESS-S133-WEB-VALVE-LIVE-1

kind: owner artefact · real-world witness (S102-YASA-1's second surface)
session: S133
witnessed: 2026-09-08, minutes after the landing, by the owner at his own screen

## WHAT HE WITNESSED

The owner reported the Vercel build live and shared the admin config screen. Read from the
screenshot, and this is a HUMAN-EYE reading no machine in this factory took:

- the build badge reads `021669f` — the merge commit of pull request 517, the landing itself
- scope `GLOBAL · prod`, signed in as a super_admin
- three agent params exist and are PUBLISHED, each `running v1`:
  `web.enabled` · `web.timeoutMs` · `web.maxBytes`
- `web.enabled` is `eval-gate governed`, `shape locked`, used at `Stage 07 (Araç Seçimi)`
- its published payload: `"value": 0`, `"min": 0`, `"max": 1`, `"sessionTweakable": false`

## WHY THIS IS A WITNESS AND NOT A MEASUREMENT

Every reading the Architect took was of the repository: a file exists on master, a gate is
green, a declaration says zero. None of them says the feature ARRIVED — that the deploy
carried it, that the admin surface renders it, that the valve is visible and adjustable to the
person who owns it. A human at the screen is the only instrument that reads that, which is
exactly why S102-YASA-1 reserves this surface to him.

It also closes the promise made when the approval was asked for. The Architect said: land it
with the valve CLOSED, production behaviour unchanged. The screen shows `value: 0` running in
prod, and `sessionTweakable: false` — so no session can flip it. The promise held, and it held
where it counts rather than in a report.

## THE ONE THING THIS WITNESS DOES NOT SAY

It does not say the valve WORKS when opened. Nothing has opened it, no fetch has been made,
and the citation contract has never been exercised against a fixture corpus. Opening it is a
separate, governed decision and it is the owner's. The witness proves the switch is there,
labelled, bounded and off.

Recorded by name under S112-YASA-1: the reading is his, the screen is his, and a hundred
sessions from now this line is the only thing that says a human — not the Architect — confirmed
the feature reached production.
