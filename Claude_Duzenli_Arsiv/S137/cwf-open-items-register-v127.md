# cwf-open-items-register-v127

APPEND-ONLY. Items leave only by `CLOSED@evidence`, `SUPERSEDED-BY <name>`, or `MERGED-INTO <name>`.

**THIS DOCUMENT DOES NOT RESTATE `cwf-open-items-register-v126`, `v125`, `v124` OR ITS ADDENDUM.** Those
stand in full, by name. Every item in them not closed below is CARRIED UNCHANGED.

Cut at 2026-09-14T00:20Z, after `#546` landed. v126 was cut hours earlier with `#546` as its blocking item;
this version closes it and records what the closing cost.

ANCHOR AT CUT: master `88d7a11cd4667ac0b6cb37b6779f6308ad54abc9`.

---

## §1 · CLOSED, BY EVIDENCE

**`#546 · ASK-RENDERED-TWICE-S137-1`** — CLOSED@ master `88d7a11cd4667ac0b6cb37b6779f6308ad54abc9`,
merged 2026-09-13T20:59:02Z by AG-4 with the repository's land script, and LIVE: Vercel production
deployment `dpl_8yrT2wip8j84bdX8N7Tt5AHEmuzR`, state READY, target production, commit `88d7a11c`, at
20:59:06Z. Verified at master: `bilingualText` is gone; `renderAskText(message, lang)` returns
`lang === 'en' ? message.en : message.tr`. The hint builder in `computeClarification.ts` was correctly left
untouched.

Landed **fifty-eight seconds** after AG-4 consumed the notice that the permission wall had come down. The
thirty-minute standard of section 12.8 is met with room to spare, for the second time in this session.

**`F-S137-THE-ONLY-LANDER-IS-ALSO-A-PRODUCER-1`** — CLOSED@ the landing above plus
`OWNER-RULING-S137-AG5-DOES-NOT-AUTHOR-PRODUCT-CODE-1`. The standing half of that ruling — AG-5 lands, it
does not author — removes the seam going forward; the single-use merge-key exemption cleared the legacy
branch. **The exemption is spent and its residue is gone:** `.claude/settings.local.json` is byte-identical
to its pre-exemption state, md5 `5bdbb35bfd6f365092fef4a0f1422357`, verified 2026-09-14T00:18:46Z.

**`ARCHITECT-RULING-S136-THE-MERGE-FORM-1`, its open half** — CLOSED@ `npm run land:selftest` PASS,
`reds=21 defects=0 control=green`, measured by AG-4 on 2026-09-13, the FIRST reading since S136. The land
script is the designed route and is now proven. See `F-S137-THE-HARNESS-IS-A-GATE-NO-LAW-NAMES-1`.

**`A-REC-S137-I-LEFT-A-LOCK-IN-THE-SHARED-CLONE-1`** — CLOSED@ the lock moved aside at 2026-09-13T20:30Z.
Found by AG-4, not by its author.

---

## §2 · OPEN, ADDED SINCE v126

- **`F-S137-THE-HARNESS-IS-A-GATE-NO-LAW-NAMES-1`** — archive commit `cee098b`. The fourth thing that can
  stop a landing, and no law names it: the window's own permission classifier. Cured for this instance, NOT
  cured as a class. Nothing in the law corpus tells a future Architect that an authority the harness cannot
  see is not an authority the harness will honour.
- **`A-REC-S137-I-FABRICATED-A-RED-FROM-THREE-ABSENCES-1`** — at 21:27Z the Architect told the owner the
  machine had probably slept and AG-4 had probably not reached the command. The landing had happened at
  20:59:02Z, twenty-eight minutes earlier. Three absent signals (bridge down, two silent heartbeats) were
  turned into a positive negative claim. This is section 12.10 and section 12.11(b) together, committed by
  the author of the finding that restates them. **The mechanical lesson: when the bridge is down, the
  correct report is "I cannot measure master", never a story about why.**
- **`PR 547`** — AG-4's landing report for `#546`, on branch `phase/ask-rendered-twice-s137-1-land-report`,
  OPEN. The landed branch was deleted by the forge on merge, so the report rides a fresh branch off the new
  master; AG-4 named that departure from its card's scope fence rather than making it silently. Needs a
  lander that is not AG-4.
- **THE ARCHIVE PUSH, STILL PENDING** — six commits ahead of `origin/main` at cut. It needs a card, the card
  needs an adversary seal, and the scout is CLOSED. The Architect declined to dress the order as an exempt
  kind to get past the gate; that would be the laundering section 12.2 forbids. It rides with the next
  scout-sealed card.

---

## §3 · CARRIED FROM v126, UNCHANGED

`TWO-PREFLIGHTS-DISAGREE` · `CALLER-ABSENT` (two readings still disagree, neither re-measured) ·
`scout_reply` migration and nonce, unbuilt · the API-Bank plan shape for the cost organ, prerequisite of an
item whose criterion expires 2026-11-03 · `cwf-sota-definition` ABSENT from the tree · the sixteen external
SOTA criteria, v122's `0/16` CARRIED UNVERIFIED · `REGISTER-BUG-BUCKET` v54, **fourth** consecutive stale
session · panel item 7's parked prerequisites, unanswered · the graft's three settings, open by the owner's
informed choice · `PLATINUM-BREACH-S137-1` · `F-S122-STALE-COUNT-CLASS-IS-SUBSTRATE-INDEPENDENT-1`.

---

## §4 · CARRIERS AT CUT

- CLAUDE-PROJECT-INSTRUCTIONS — **v5_10**
- CWF-S137-SESSION-CLOSE — **v1** · CWF-S137-FINDINGS — **v1**
- CWF-SESSION-GRAPH-KB — **v137**
- cwf-open-items-register — **v127** (this document)
- CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT — **v139**, cut LAST, anchor `88d7a11c`. **v138 is SUPERSEDED and
  was stale within hours of being cut:** it carried anchor `e95b0fdf` and named the `#546` route lock as
  S138's first job. Both were true when written and neither survived the night. A bootstrap cut before the
  session's last landing is a bootstrap that lies to the next session.
- REGISTER-BUG-BUCKET — **v54**, still not advanced.

END · cwf-open-items-register-v127
