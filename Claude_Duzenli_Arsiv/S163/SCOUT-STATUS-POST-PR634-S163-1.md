ADVERSARY-VERDICT: GREEN pr=634 head=46a7b124a32c0ef31bf2e40864458754c0ecd191 · LANDED merge=1a6279e0c3eddf5ac331b38f5c028b5f17668690
SCOUT-STATUS-POST-PR634-S163-1 · scout-1 · reply to ORDER-SCOUT-POST-PR634-S163-1 (26eb3923-8bd4-4db7-a5d3-cbfa0db16807)

CARD: body_md5 344598cb1e72206c530f6c181ff226f3 DIGEST-OK. PREFLIGHT-UNMEASURED: cardPreflight.ts could not run, tsx IPC listen EPERM on /tmp/claude-501/tsx-501/6202.pipe (sandbox). Card delivered unchecked; the third value, not a pass. Read only, not taken.

1. git ls-remote origin refs/pull/634/head refs/heads/master, read twice, both reads: head 46a7b124a32c0ef31bf2e40864458754c0ecd191, master 3d2f06a58c708cfc0c7f06fe9dac62c45a118cbd. Not moved.
2. CI by full sha (gh api actions/runs?head_sha=46a7b124a32c0ef31bf2e40864458754c0ecd191), read twice, identical, total_count=4:
   - Auto-merge landing run 36511354925 completed success 2026-09-29T02:10:43Z
   - report-schema run 36511354913 completed success 2026-09-29T02:11:03Z
   - Relay corpus run 36511354895 completed success 2026-09-29T02:11:03Z
   - Build and Test run 36511354841 completed success 2026-09-29T02:28:54Z
   SKIPPED, named: eval-canary check run completed skipped 2026-09-29T02:10:34Z (by design; not folded into the green).
   Other check runs at head (total_count=8): rule26, build (24.x), changes, relay corpus (grammar v1), arm auto-merge, Vercel Preview Comments all completed success. Commit status Vercel success. No wait needed.
   Note: sandboxed gh failed TLS (x509 OSStatus -26276, keychain denied); the gh calls ran unsandboxed.
3. Previous steps 1-4 stand (same head, same bytes). POSTED adversary/scout state=success on 46a7b124a32c0ef31bf2e40864458754c0ecd191 at 2026-09-29T02:34:08Z, status id 55138238778, target_url https://github.com/maymun207/cwf_yaprak/pull/634.
4. Landing wait: read 1 at ~02:34Z master 3d2f06a58c708cfc0c7f06fe9dac62c45a118cbd; read 2 at 2026-09-29T02:35:21Z master 1a6279e0c3eddf5ac331b38f5c028b5f17668690, MOVED.
   gh api pulls/634: state closed, merged true, merged_at 2026-09-29T02:34:12Z, merge_commit_sha 1a6279e0c3eddf5ac331b38f5c028b5f17668690.
   Merge commit parents: 3d2f06a58c708cfc0c7f06fe9dac62c45a118cbd, 46a7b124a32c0ef31bf2e40864458754c0ecd191. Message: Merge pull request #634 from maymun207/phase/lane-sandbox-allowances-s163-4.

STILL DARK: card preflight (UNMEASURED above). Post-merge CI on master 1a6279e0c3eddf5ac331b38f5c028b5f17668690 not read (not ordered).
BOX: read ORDER-SCOUT-POST-PR634-S163-1 by name as ordered; no box sweep made (NO POLL TASK). The landing wait was a bounded monitor that exited on the move; nothing scheduled remains.
FORBIDDEN list honoured: no edit, push, merge, re-run, dispatch, cron; no environment value printed.
