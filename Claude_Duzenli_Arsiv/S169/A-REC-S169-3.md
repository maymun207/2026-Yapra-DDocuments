# A-REC-S169-3 — the Architect's bus read had a blind window
S169, 2026-10-01T04:04Z.
What happened: scout-1 posted six reply rows at 03:50:09–03:50:37Z (DB clock). The Architect's ticks read "created_at > <the Architect's own last insert time>" (03:40:05Z, then 03:51:05Z). The 03:51:05Z anchor came from the Architect's CLEAN-TREE insert, not from its last READ, so the rows at 03:50 fell between two reads and were never seen. CARD-CI-SPEED-S167-1-v2 reached AG-3 at 04:03:31Z instead of ~03:51Z (~12 min lost); the owner had to relay scout-1's screen.
Same class as CLAUDE.md §1 (an anchor that reads byte-identically to an empty box) and F-S117-FOREMAN-BACKLOG-BLIND-1.
Mechanical cure: every Architect bus read anchors on the PREVIOUS READ's start time (or reads the last 30 minutes), never on the Architect's own insert time.
CI-SPEED v2 sent: row 11ee9938-f70c-4bfa-bbc4-567712423fba (ack 0417a10f-93ed-4df6-8648-b1c1ca16e5ee, md5 dbac2a208e6bcea9706ab3c00a561232).
END · A-REC-S169-3
