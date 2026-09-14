# F-S138-THE-BUCKET-WAS-NEVER-AT-V54-1

Filed at S138 open, 2026-09-14, before any card was cut.

## THE CLAIM THAT WAS CARRIED

Four consecutive registers state the same row:

- `cwf-open-items-register-v124` — "REGISTER-BUG-BUCKET v54, NOT ADVANCED this session and therefore STALE"
- `cwf-open-items-register-v125` — "v54, NOT ADVANCED in S134, S135 or S136 ... third consecutive session"
- `cwf-open-items-register-v126` — "v54, NOT ADVANCED in S134, S135, S136 or S137. FOURTH consecutive stale session"
- `cwf-open-items-register-v127` — "REGISTER-BUG-BUCKET v54, still not advanced"

`CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v139` then made it S138's third first job: "Repair it or close it;
do not tick it a fifth time."

## THE MEASUREMENT

MEASURED: `find . -iname 'REGISTER-BUG-BUCKET*' -not -path './.git/*'` in the documents repository,
2026-09-14T07:42Z, at archive HEAD `ba9e629c76cca8369d530a3cc555c23eaeb77fe4`.

```evidence:buckets-on-disk
Claude_Duzenli_Arsiv/S117/REGISTER-BUG-BUCKET-v54.md   2918 bytes
Claude_Duzenli_Arsiv/S117/REGISTER-BUG-BUCKET-v55.md  31045 bytes
Claude_Duzenli_Arsiv/S120/REGISTER-BUG-BUCKET-v56.md   8840 bytes
```

**THE BUCKET IS AT v56, AND HAS BEEN SINCE S120 (2026-08-27).** The carried row is not stale. It is
WRONG, and it has been wrong in four carriers.

## THIS WAS ALREADY MEASURED ONCE, AND THE CORRECTION WAS DROPPED

`CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v136`, section 7, written at the close of S135, in its own words:

> REGISTER-BUG-BUCKET v54, stale | the archive holds **v56**; the stale thing is the register's own
> row, not the bucket. `F-S135-REGISTER-BUG-BUCKET-STALE-AT-V54-1` rests on a wrong row and must be
> re-filed in the opposite direction

S135 measured it correctly and ordered the re-filing. The registers cut in S136, S137 and S137's close
each re-asserted the wrong row anyway, and the bootstrap cut after them turned the wrong row into an
order. **A correction that lands in a bootstrap and not in the register is a correction the register
will overwrite.**

## WHY THE BUCKET LOOKED ABSENT — MEASURED, NOT GUESSED

`REGISTER-BUG-BUCKET-v55` names the mechanism in its own header, before any of this happened:

> v54 sits at the project-box path `claude_REGISTER-BUG-BUCKET-v54.md` — ROOT level, UNDERSCORE —
> while every other bucket uses the `claude/` namespace with a slash. ... **A carrier outside its
> namespace is a carrier the next reader will not enumerate.**

MEASURED at S138 open: the project box's document list holds SEVENTY-FIVE documents and **no bucket at
any version**, v54 included. v55 and v56 live only in the documents repository, under
`Claude_Duzenli_Arsiv/S117/` and `Claude_Duzenli_Arsiv/S120/`. The register's row was therefore derived
from a surface on which the true answer cannot appear at all: not a wrong reading of the bucket, but a
reading of the wrong shelf.

## CLASS

`F-S122-STALE-COUNT-CLASS-IS-SUBSTRATE-INDEPENDENT-1`, in its purest measured form: a number crossing
from carrier to carrier without re-derivation, through four carriers, past one correct measurement,
and into an instruction. The Architect authored every one of those four carriers.

## THE MECHANICAL CURE

Not "remember to check" — that rule has already failed four times
(`A-REC-S122-ARCHITECT-PRECISION-DECAY-1`).

**A carrier-version row is written from a FIND over the archive, in the closing turn, or it is written
as NOT-READ.** A version number that no command produced in that turn does not enter the register's
carrier section. `REGISTER-BUG-BUCKET` is the proof case because its home is the archive and not the
box, but the rule binds every row in that section.

## STATUS

CLOSED@ this measurement, and superseded in substance by `REGISTER-BUG-BUCKET-v57` cut in the same
turn. `F-S135-REGISTER-BUG-BUCKET-STALE-AT-V54-1` is re-filed in the opposite direction, as S135
ordered eleven days ago.

END
