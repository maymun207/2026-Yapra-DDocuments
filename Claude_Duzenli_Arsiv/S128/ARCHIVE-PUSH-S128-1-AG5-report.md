# ARCHIVE-PUSH-S128-1-AG5-report

Lane AG-5 (single worker lane, OWNER-RULING-S125-SINGLE-LANE-1), acting on
`CARD-ARCHIVE-PUSH-S128-1-v2` (created_at 2026-08-30 03:58:46.444717+00, body md5
`17bf15627042b14fc5baa9c5844238b7`, DIGEST-OK over 20010 bytes, card grammar raised no
refusal).

**BOTH REQUIRES PROBES READ PRESENT. The fifteen files are committed and pushed, and the
remote has been read back and agrees.** Nothing was obtained, installed, substituted or
delegated to make either capability true — both were already there.

---

## REQUIRES — both readings, printed

**REACH · PRESENT**

    $ git -C "<the where fence path>" rev-parse HEAD
    a3ef8922dc160caf88057847290ec7aba9e8a3f5

**CREDENTIAL · PRESENT**

    $ git -C "<the where fence path>" push --dry-run origin main
    Everything up-to-date

No username, password or token was asked for. The credential this shell already presents for
this remote is the one used throughout; no setup step of any kind was run, no second remote,
no other clone, no helper installed.

## ORDER A — the fresh box, then the four verifications

**FRESH BOX, read directly, before anything was touched:**

    $ node scripts/mail-wait.mjs AG-5 --once      -> exit 3 (NO-MAIL: a read that WORKED)
    2026-08-30 03:59:38Z poll 1: zero unconsumed rows above the watermark
    2026-08-29 15:14:42.554778+00 (read OK, consumed_at IS NULL, cross-checked: count is 0)

No row addressed to AG-5 newer than this card. The STOP arm did not fire.

**1 · HEAD against CLAIMS — MATCH**

    a3ef8922dc160caf88057847290ec7aba9e8a3f5      (CLAIMS: the same sha)

**2 · the fifteen sha256 digests — ALL FIFTEEN MATCH**

Re-derived here and compared programmatically against the card's `files` fence, because
eyeballing fifteen hex strings is not a comparison:

    MATCH 6bf64b79f68b491f2a1abd2b08ac8e81b8d97f395412b0627fc2084a63ad7a67  S125/CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v126.md
    MATCH 2e9e3f0b522d23c7cf20e76d6c9bba9d1b81b3573b385e7ee30cc4c309483c34  S125/CWF-S125-SESSION-CLOSE-v1.md
    MATCH 1adcfbaef73648e3fc16cc77a23d0a4d09d51fef87e9f46583b09a7087e642af  S125/OWNER-RULING-S125-SINGLE-LANE-1.md
    MATCH 8b4a672dacafd8234bd54e41785a43ad0a9b0d68172c9548325611488a1d14ab  S125/S125-DISPATCH-RECORD-1.md
    MATCH 9e62a06e1130e9b9cfd40d1fa985ff17e4e30d704e50e19b06072cc9f7010459  S125/S125-DISPATCH-RECORD-2.md
    MATCH 219513b0d33e3c61ab1dd9ba48490f6495ccb89108b92e17608c367bd80391e7  S125/S125-EAIP-COLDSTART-PROCESS-v1.md
    MATCH 7a1009cf05da1306c4aacf3be72692587dd5f8d4c0c47ed450e77a8df3d863ae  S125/S125-GATE-TUNING-DOCTRINE-v1.md
    MATCH d1f2d546cd6e931c5a9baec7bf9e81c336f82922de9951b12004e194bbbacb2a  S126/CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v127.md
    MATCH 5d59badce4270ef56873e3a1e22fa9f2632de58bda698d07ef745c8f9b2aa75c  S126/CWF-S126-SESSION-CLOSE-v1.md
    MATCH e12a38ff59204c2f7820d4de0948790d7c5cd2d6e5eb1f0226c2f68a9fca3b29  S126/OWNER-RULING-S126-BUDGET-THRESHOLDS-1.md
    MATCH bc96641b026693be5c0688d5925efeae3a7c223b1cb0721ec52f054ae8b14410  S126/OWNER-RULING-S126-TRUNK-SYNC-LANDING-1.md
    MATCH ef6a10c55fcf22cfcf9f5279415c752976b62798e3acd0f037bc438df4e904ca  S126/OWNER-RULING-S126-VALVES-AND-A-ITEMS-1.md
    MATCH 7d3da33d423cf509413184d4c1a28eedcc3677494abee558ae8ea2a78e4c2508  S127/CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v128.md
    MATCH d1b2e8bef9e9974161f4d20f4337718682e2e60b5b63f67a3795a40dc27a2d2d  S127/CWF-S127-SESSION-CLOSE-v1.md
    MATCH 694eadf712927b6b57900d103cf1e44f966b718cd11d1b4dd96236aaa498dc33  S127/S127-FINDINGS-ADDENDUM-1.md
    files checked: 15
    SHA-VERDICT: ALL FIFTEEN MATCH

**3 · the invariant, BEFORE half — nothing staged**

    $ git diff --cached --name-only      -> (empty)

**4 · status — ONLY `??` lines, and the lens behaved as predicted**

Seventeen lines, every one `??`: the fifteen archive files plus this card's two files in
`S128/` (v1 and v2). **ZERO NFD phantoms**, which is the macOS complement the card predicted;
a Linux lens reads twenty-four for the same tree. Both counts are true and the lens is named
rather than averaged — `empty != zero` applied to a filesystem's normalisation, not to a
count of rows. No non-`??` line and no unexpected archive filename appeared, so the
ON-DISAGREEMENT arm did not fire on any of the four readings.

## ORDER B — the locks

`.git/` was enumerated before anything was deleted, and it held exactly the eleven
lock-shaped remnants the `locks` fence names — no more, no fewer. **There was no bare
`.git/index.lock`**, so no live lock existed and the inherited `lsof` discipline did not fire.

REMOVED, one `rm` per file, each named:

    index.lock.STALE-S121-085137
    index.lock.STALE-moved-by-S121-2026-08-27T0851Z
    index.lock.stale-S128
    index.lock.stale-S128-2

DELIBERATELY UNTOUCHED, and re-verified present afterwards:

    HEAD.lock.STALE-S121
    HEAD.lock.STALE-S121-091033
    HEAD.lock.STALE-S121-093144
    HEAD.lock.STALE-S121-094642
    HEAD.lock.STALE-S121-100611
    HEAD.lock.STALE-S121-101651
    HEAD.lock.STALE-S121-104354

A second `ls .git/` after the removals confirms the four are gone and all seven HEAD.lock
remnants remain. Nothing else in `.git/` was touched.

## ORDER C — staged by name, committed once

Staged with ONE `git add` carrying fifteen explicit paths. No `git add -A`, no `git add .`,
no pathless form at any point in this card.

**The staged-list check — EXACTLY the fifteen**, no sixteenth line, none missing. The two
S128 card files sitting beside this report were correctly NOT staged here; they belong to the
second commit below.

    $ git diff --cached --name-only
    Claude_Duzenli_Arsiv/S125/CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v126.md
    Claude_Duzenli_Arsiv/S125/CWF-S125-SESSION-CLOSE-v1.md
    Claude_Duzenli_Arsiv/S125/OWNER-RULING-S125-SINGLE-LANE-1.md
    Claude_Duzenli_Arsiv/S125/S125-DISPATCH-RECORD-1.md
    Claude_Duzenli_Arsiv/S125/S125-DISPATCH-RECORD-2.md
    Claude_Duzenli_Arsiv/S125/S125-EAIP-COLDSTART-PROCESS-v1.md
    Claude_Duzenli_Arsiv/S125/S125-GATE-TUNING-DOCTRINE-v1.md
    Claude_Duzenli_Arsiv/S126/CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v127.md
    Claude_Duzenli_Arsiv/S126/CWF-S126-SESSION-CLOSE-v1.md
    Claude_Duzenli_Arsiv/S126/OWNER-RULING-S126-BUDGET-THRESHOLDS-1.md
    Claude_Duzenli_Arsiv/S126/OWNER-RULING-S126-TRUNK-SYNC-LANDING-1.md
    Claude_Duzenli_Arsiv/S126/OWNER-RULING-S126-VALVES-AND-A-ITEMS-1.md
    Claude_Duzenli_Arsiv/S127/CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v128.md
    Claude_Duzenli_Arsiv/S127/CWF-S127-SESSION-CLOSE-v1.md
    Claude_Duzenli_Arsiv/S127/S127-FINDINGS-ADDENDUM-1.md

The commit message was written with an editor tool to a file OUTSIDE this working copy and
passed with `git commit -F <path>`; `-m` was not used.

    [main 4d4cc4f] CARD-ARCHIVE-PUSH-S128-1: land the S125, S126 and S127 session archives
     15 files changed, 1127 insertions(+)
     ... 15 x create mode 100644 ...

Every one of the fifteen is a `create mode` line — confirming none had ever been tracked,
which is the claim the whole card rests on.

**COMMIT SHA, FULL 40-HEX: `4d4cc4feec0af7701ff9e3aff049b4a26f5de986`**

## ORDER D — what the remote says

**THE PUSH'S OWN OUTPUT:**

    To https://github.com/maymun207/2026-Yapra-DDocuments.git
       a3ef892..4d4cc4f  main -> main

**THE REMOTE, READ BACK — this is the report (S63-1):**

    $ git ls-remote origin refs/heads/main
    4d4cc4feec0af7701ff9e3aff049b4a26f5de986      refs/heads/main

    commit sha : 4d4cc4feec0af7701ff9e3aff049b4a26f5de986
    remote main: 4d4cc4feec0af7701ff9e3aff049b4a26f5de986
    EQUAL — the fifteen files are on the remote, and this line rather than the exit
    code is the evidence.

The previous remote value was `a3ef8922dc160caf88057847290ec7aba9e8a3f5`, the `where`
fence's sha, so the trunk moved by exactly this one commit.

## ORDER E — this report and the card files

Staged BY NAME, exactly three paths: this report and the card's two files (v1 and v2, both
kept under S37-1). The second commit's sha, its push output, and the second `ls-remote`
reading are appended to the bus row that closes this card
(`ARCHIVE-PUSH-S128-1-AG5-report`, from_lane) — they cannot appear in this file, because
this file is part of the commit they describe.

## WHAT THIS LANE DECIDED, AND WHAT IT DID NOT

Nothing about the content. Every one of the fifteen files is the Architect's, byte-verified
against a project-box original, and this lane re-derived the digests rather than trusting
them. What this lane decided is the only thing the card gave it: whether the world matched
the card well enough to push. It did, on four readings, and the push happened.

No file outside the fifteen, this report and the two card files was touched. No file in
`cwf_yaprak`. No gate, no governed row, no migration, no git configuration anywhere. The
four index.lock remnants are the only deletions. Nothing was spent — no CI run, no
deployment.
