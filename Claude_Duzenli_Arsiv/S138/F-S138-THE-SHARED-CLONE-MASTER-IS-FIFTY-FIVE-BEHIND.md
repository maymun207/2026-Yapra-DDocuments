# F-S138-THE-SHARED-CLONE-MASTER-IS-FIFTY-FIVE-BEHIND-1

Filed at S138 open, 2026-09-14T07:42Z, before any card was cut. This is a TRAP for the next lane, not a
defect in anything that landed.

## MEASURED

The shared clone at the owner's machine, the one every lane works in and the one the Architect reads
the anchor from:

```evidence:clone-state
branch                       master
HEAD                         0cae062c130b99a94df825f3481537b8251d23b2
refs/remotes/origin/master   88d7a11cd4667ac0b6cb37b6779f6308ad54abc9
git rev-list --left-right --count master...refs/remotes/origin/master
                             0    55
untracked                    "Claude outputs/"   graft/
```

Zero commits ahead. **FIFTY-FIVE commits behind.** A pure fast-forward that nobody has taken.
`0cae062c130b99a94df825f3481537b8251d23b2` is PR 537, the BUS-REPLY-PATH landing — the FIRST of S137's
seven. The checked-out branch has not moved since, while `origin/master` took six more landings.

## WHY IT MATTERS AND WHY IT IS INVISIBLE

The anchor read is CORRECT and this finding does not disturb it: the anchor is read from
`refs/remotes/origin/master`, which the lanes refresh, and it verified byte-for-byte against
`CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v139`. The trap is one layer below it.

A lane that opens this clone and cuts a branch WITHOUT pulling first branches from a base
fifty-five commits old. Its diff against master will show six landings of other people's work as
deletions. Its gates may pass locally and its PR will be a mess, and the lane will have obeyed its card
exactly. **The clone's working tree and the ref the anchor is read from are two different objects, and
only one of them is checked at session open.**

## THE MECHANICAL CURE

Every landing and producer card already names a branch. It must also name its BASE, and the base is
`origin/master` at a full forty-hex, never "master" and never "the current checkout". A card whose
ORDER 0 is not "fast-forward the local master to the named base, or stop and report the divergence" is
a card that gambles on the state of a shared machine.

## STATUS

OPEN. It closes when a lane fast-forwards the clone and a card in the same session carries the base
line. The Architect cannot fix it: the bridge VM holds no GitHub credential and `git fetch` fails there
(`F-S133-BRIDGE-VM-HAS-NO-GITHUB-CREDENTIAL-1`, re-measured live this morning), so the fast-forward
itself is lane work.

END
