card: CARD-SHARED-CLONE-FF-S163-1
branch: master (shared clone; nothing committed)
head: ee12161ecad43b338489e85fcb73df1e08aa8ac0
clone-head: 2a6f6781 (unchanged, 31 behind)
report: none (no repo write ordered); fallback S163/SLIP-SHARED-CLONE-FF-S163-1.md
ci: UNMEASURED (no push by order)
status: BLOCKED
step1: branch master, oid 2a6f6781, ab +0 -31, one modified file .claude/settings.json; no .git/*.lock
step2: patch sha256 e6b0125805074674ae51689854d0fe0780a0778070327de4279ddeecd11bf954 (copy in S163/settings-local-S163.patch)
dry-run: patch onto origin/master ee12161e settings.json applies CLEANLY (2 hunks, offset 6); JSON valid; keeps upstream sandbox block + arxiv permission
block: steps 3-4 write the clone's .claude/settings.json, which this window's sandbox denies BY NAME (harness permission file); not routed around
owner runs in the clone: git checkout -- .claude/settings.json ; git merge --ff-only origin/master ; git apply --3way <S163 patch>
new head: not reached
graft: not used
