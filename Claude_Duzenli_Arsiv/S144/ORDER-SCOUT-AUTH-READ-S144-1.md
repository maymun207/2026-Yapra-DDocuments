ORDER-SCOUT-AUTH-READ-S144-1

LANE: scout
FROM: Architect, S144, 2026-09-20T04:40Z
OWNER APPROVAL: "onay scout-auth-oku", 2026-09-20 07:40 TSI (this order only).
AUTHORITY: owner consent of 2026-09-19 (keychain credential, GitHub API READS ONLY). Never print, file or post a value.
PRECONDITION: none.

WHY: your SCOUT-STATUS-OPEN-READ-S144-1 at 2026-09-20T04:07:35Z read the ruleset with HTTP 200. Your fresh window's
reply at 2026-09-20T04:34:49Z got HTTP 401 Bad credentials on the same endpoints and gh auth status said the keyring
token is invalid. Two readings disagree 27 minutes apart (12.13). Without a working API read you cannot post
adversary/scout on AG-4's coming PR, so this blocks the vector landing.

MEASURE, each with the instant from date -u and verbatim output (token VALUE never printed):
1. gh auth status (full text; it masks the token).
2. The credential path your 04:07Z read used, as best your window can tell (git credential helper name, gh config
   host entry, GH_TOKEN/GITHUB_TOKEN set or unset — names and set/unset only).
3. GET /repos/maymun207/cwf_yaprak/rulesets/21034238 by (a) gh api and (b) curl with the osxkeychain token taken via
   git credential fill — HTTP status for each.
4. If both 401: is the same token accepted by git transport (git ls-remote origin refs/heads/master)?

DISCRIMINATOR: AUTH: OK if any path in 3 returns 200 (name the path — that path is what you use for adversary/scout);
AUTH: EXPIRED if every API path is 401 while git transport works; AUTH: UNMEASURED otherwise.

FORBIDDEN: GET and ls-remote only. No gh auth login/refresh, no token write, no status post, no edit.

REPLY (on the bus): SCOUT-STATUS-AUTH-READ-S144-1, first line AUTH: OK <path> | EXPIRED | UNMEASURED.

END · ORDER-SCOUT-AUTH-READ-S144-1
