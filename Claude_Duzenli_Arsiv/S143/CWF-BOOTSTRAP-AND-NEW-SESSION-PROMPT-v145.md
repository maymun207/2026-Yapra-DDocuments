CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v145

Cut LAST, at the close of S143 (2026-09-20T03:30Z), after cwf-open-items-register-v133,
CWF-S143-SESSION-CLOSE-v1, CWF-S143-FINDINGS-v1 and CWF-SESSION-GRAPH-KB-v143. SUPERSEDES v144 entirely.
Every line inherited WITHOUT being re-measured in S143 is marked **CARRIED UNVERIFIED**.

⚠ v143 IS NOT PRESENT IN cwf_yaprak_9. v144 pointed to v143 §3/§5/§6/§7 "re-read it there". Those sections
survive in _9 ONLY as the summary lines v144 wrote about them; they are copied IN FULL below (§3, §5, §6) so
nothing depends on a document this container does not hold. If the fuller v143 text is needed, it is in the
cwf_yaprak_8 box or `Claude_Duzenli_Arsiv/` (§10: search, never recall).

---

## 0 · FIRST MESSAGE OF S144 — SOTA-1, WORD FOR WORD (S66-1 positive control)

SOTA-1 — KABUL KRİTERİ (S80). v1'in tek kabul kriteri cwf-sota-definition'dır. O dosyadaki bir kritere
izlenemeyen her şey v1 kapsamı dışıdır. Architect, bir SOTA kriterini ilerleten hiçbir kalemi "şimdilik gerek
yok / az trafik / bu kadarı yeter / sonra / v1.1'e" gerekçesiyle erteleyemez, küçültemez, sırada aşağı
çekemez. Elinde kalan tek itiraz sınıfı *"bu sıralama SOTA'yı kanıtlanamaz kılar"*dır ve ancak şunları YAZILI
adlandırırsa kabul edilir: (a) hangi kriter kanıtsız kalır, (b) hangi tarihte kanıtlanabilir olur, (c) hangi
ölçüm çözer. Üçü eksik her erteleme önerisi bir SOTA-1 ihlalidir: sahip adıyla iptal eder, Architect ya aynı
mesajda (a)+(b)+(c)'yi verir ya öneriyi geri çeker — üçüncü yol yoktur. Bir kriter YALNIZ kanıtla emekli olur;
kolaylık, maliyet veya kapsam baskısıyla asla.

(The S143 freeze of the bench items is the OWNER's ruling and carries its (a)(b)(c) in
CWF-S143-SESSION-CLOSE-v1 §3 — OWNER-RULING-S143-FREEZE-BENCH-1.)

---

## 1 · THE OPERATING MODEL — OWNER-RULING-S143-OPERATING-MODEL-1 (binding from S143)

- **No 2-minute AG pollers.** Both lane pollers are OFF by owner choice.
- **Delivery:** the Architect writes a card/notice to a lane ON THE BUS; the owner tells that window
  **"kartını oku"**; the Architect sets its OWN 3-minute timer (`send_later`, delay 3) and reads the bus for
  the lane's slip. Lane results are read from the bus, NEVER by asking the owner to paste screens
  (OWNER-RULING-S143-BUS-NOT-OWNER-1).
- **Maximum 10 turns per session**, then close (five carriers) and open a new session.
- **Coordination:** no card is cut and no order dispatched without the owner's named approval of that item
  (OWNER-RULING-S143-COORDINATE-1, "kafana gore is yapma benim ile koordineli gitmek zorundasin").
- **Every document the Architect creates is committed AND pushed to the doc repo**
  `maymun207/2026-Yapra-DDocuments` under `Claude_Duzenli_Arsiv/S<n>/`, and written to the project box
  (OWNER-RULING-S143-DOC-REPO-SART-1, "SART"). The Architect commits on the owner's machine; AG-4 pushes on a
  NOTICE-PUSH-DOC-REPO; after the push the Architect sets `refs/remotes/origin/main` with `git update-ref`
  (the lane cannot lock it).
- **Urgency**, the owner's words: "Gercekten hizli ilerlememiz lazim yoksa sirketimiz cok zor durumda
  kalicak... Ceza yiyecegiz". Finish open work, bugs and gaps fast; the product must run STABLE first.
- Every instant is stamped with `date -u`, never estimated.

---

## 2 · THE ANCHOR

master **`7572c3bbfeed23656fcf8a55f6e64d93ed240c14`** — merge of PR 586, 2026-09-18T07:17:02Z. Unmoved through
S143 (scout `git ls-remote`, last read 2026-09-19T20:45Z) — **CARRIED UNVERIFIED** into S144; re-measure first.
That landing passed through the broken S142 gate; the diff is correct work.

Gate at S143: **BACK and ENFORCING** (scout 2026-09-19T19:24:39Z): ruleset 21034238 `master-merge-gate`,
enforcement=active, contexts changes · rule26 · build (24.x) · relay corpus (grammar v1) · adversary/scout,
bypass_actors=0, can_bypass=never. `branches/master/protection` answers 404 "Branch not protected" — normal
for a ruleset gate. auto-merge.yml **active** (19:43:16Z). Both CARRIED UNVERIFIED into S144.

Carriers: bootstrap `v145` · register `v133` · findings `CWF-S143-FINDINGS-v1` · graph KB `v143` · session
close `CWF-S143-SESSION-CLOSE-v1` · bug bucket `v57` (not advanced since S141; CARRIED UNVERIFIED) ·
`cwf-sota-definition-v1_5` in the box. The two SOTA scoreboards are uncounted; v122's `0/16` is CARRIED
UNVERIFIED.

---

## 3 · THE LANDING ROUTE (from v143 §3 via v144; CARRIED UNVERIFIED except the gate, measured S143)

AG-4 pushes a branch and opens ONE PR; `auto-merge.yml` arms itself; the ruleset requires the five contexts;
the scout writes `adversary/scout` after reading the DIFF; GitHub merges. The Architect's job is to DISPATCH
THE SCOUT to the head (§12.9). Measured semantics: `gh pr merge --auto` merges AT ONCE when mergeable (gate
BEFORE workflow); success ≡ skipped ≡ neutral; a required context nobody posts freezes master; PUT not PATCH;
a github.token merge starts no master run but Vercel still deploys; a workflow_dispatch on a branch ref needs
no spend approval. GB-5 (the gate cannot be edited by the credential it gates) is on master. The route's
SAFETY depends on the gate ENFORCING — existence is not enforcement.

---

## 4 · STANDING RULINGS

- OWNER-RULING-S141-PRO-NOT-PUBLIC-1 — the repo stays PRIVATE; GitHub Pro is subscribed
  (OWNER-WITNESS-S143-GITHUB-PRO-SUBSCRIBED-1, $48/yr).
- OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1 — NARROW (§12.1): the adversary gate lifts ONLY for a card repeating a
  superseded subject. A NEW subject goes to the scout. cardPreflight GREEN is a grammar gate, not a review.
- MASTER IS GATED FOR THE OWNER TOO: bypass empty; disabling enforcement is the same switch as the
  merge-on-open trap.
- PLATINUM-BREACH-S122-1 · S137-1 · S142-1 stand in the record.
- S143 rulings (text in CWF-S143-SESSION-CLOSE-v1 §3): COORDINATE-1 · CLOSE-ALL-1 · DOC-REPO-SART-1 ·
  BUS-NOT-OWNER-1 · OPERATING-MODEL-1 · PENALTY-SCOPE-1 · FREEZE-BENCH-1 · APPROVAL-G10 (frozen) · CLOSE-1.
- Security constraints in force: the owner's keychain GitHub credential is for API READS only and its value is
  never printed, filed or posted · no force-push · no direct table write to factory_state (use the reclaim
  verb) · the bench-reset POST never runs against production.

---

## 5 · THE TRAPS (v143 §5 via v144, S142 additions, S143 additions — all standing)

- CP-8's band catches 11-digit run/status ids: name a run by workflow+head, a status by context+instant.
- CP-1 basis vocabulary is MEASURED/READ/NOT-READ; CP-3 premise uses UNMEASURED; CP-9 a moving value carries
  an ISO instant; a card needs `## DECISION RIGHTS`; a bare 40-hex belongs in CLAIMS or an evidence fence.
- The Architect's local cardPreflight is a DERIVED view — send the card to the scout to run the REPOSITORY'S
  gate on the exact bytes. The repo gate can itself false-positive (CP-4, S143).
- A card edited after drafting is two objects. device_commit_files serves stale bytes on a reused path.
- A watcher's stop test must match the data shape, not an error prefix.
- empty≠zero applies to your OWN query windows; a truncated query is not an absence (S142 tick 30; S143 G6 v1).
- A head named in a scout order is stale the moment a lane pushes again.
- SSM RunShellScript mangles `{{ }}` in single-quoted arrays; write the host script as a file.
- `docker ps -a --no-trunc` prints the redis password; name explicit non-secret columns.
- S143: a message to AG-n needs first line `<!-- relay-audit: v1 kind=<card|notice|…> -->`; a non-card sent
  as a card fails AG001. Exempt kinds stay ≤8192 chars with no `## ORDERS`. Cards need an
  `evidence:adversary` seal: `ADVERSARY: GREEN` + `verdict: <scout row uuid>`, first line printing
  sha256(relay_adversary_seal_strip(body)).
- S143: every hand insert carries md5 + sha256 + octet_length preconditions.
- S143: FW001 after a takeover → `reclaim(self, lane, deadNonceSha)` in scripts/factoryState.mjs.
- S143: a plan/gate reading older than this turn is re-read before it is a premise.
- S143: adding ids to SEGMENT_IDS rotates every chat promptRev/configFingerprint/guardrail baseline.

---

## 6 · LIVENESS (v143 §6 via v144, unchanged)

Liveness is read from OUTPUT only (landed commit, pushed branch); a heartbeat is not work;
`factory_state.state` fossilises (AG-1..3 read WORKING from 2026-09-10). The pooler log is positive-only with
a blind spot (file/tsc/vitest work is invisible); read a zero TWICE. Lane-refreshed refs: an unmoved ref is
not evidence master did not move. Producers, bridge and lanes' DB path terminate on ONE LAPTOP; three
silences are one fact; waking the machine is one of the few legitimate owner items. The landing route
survives the machine going away, and is endangered by an account-plan lapse.

(The v143 §7 TICK LOOP is SUPERSEDED by §1's operating model: no standing tick; one 3-minute timer per
dispatched card.)

---

## 7 · THE FIRST THINGS S144 DOES, IN ORDER

① Read the seed, this document, then register v133. First measurement: register §5 carrier versions.
② Re-measure the anchor (master), the ruleset enforcement and auto-merge state (via the scout if the
   Architect cannot read GitHub — §12.9).
③ Confirm the doc repo push of NOTICE-PUSH-DOC-REPO-S143-5 landed (ls-remote via the lane slip); if not,
   re-issue.
④ Ask the owner ONE line: the penalty date — he wrote "22 Agustos", which is before 2026-09-20.
⑤ Then the owner's priority order (OWNER-RULING-S143-PENALTY-SCOPE-1):
   1. **Item 11 · vector origin repair** — owner origin-write approval; point `vector-index` and
      `vector-encoder` at the instance's CURRENT DNS (measure live, do not carry the S142 value); then item 12,
      stable address.
   2. **Entity resolution** — item 5 (channel-2 BM25+RRF into the turn), item 7 (G graph into the child layer,
      F-S117 — a WIRING card, §12.6), item 6 (τ/β rows, after 5 and 9). "en buyuk cezayi buradan yiyecegiz".
      Search the archive by seam name before cutting any card (§12.5; the A23 ask-shape design exists).
   3. **Item 21 · the two S141 product bugs** — re-measure against the carried-option card first.
   4. **Item 28 · MKB questions routed to ARMES** — owner-reported, unmeasured. First act: one known MKB
      question, which tool the turn selects and why (Path A table, Path B valve, vector reachability).
   5. The rest in register v133 §4 order.
   6. FROZEN at the end: items 2, 3, 4, 27 (bench) — "mutlaka yapacagiz ama once urun stabil calissin".
      Scout order 041d97d6 (card G10 v3 review) stays unconsumed until the owner unfreezes it.

---

## 8 · THE ONE THING TO UNDERSTAND

v144 §9 stands: a well-built loop with no exit runs for ever; rigour on the wrong object looks like progress;
when two hypotheses compete, first ask "is the thing even happening?"; before trusting a gate, ask whether it
ENFORCES. S143 adds: **the product did not move in S143.** The gate came back, a lane was repaired, the record
got honest — and the customer still sees a factory assistant that cannot reach its vector engine, mis-resolves
entities and sends machine-knowledge questions to the wrong backend. Open S144 by asking what moves in the
PRODUCT this session, and write that first in every report (§4 rule ③).

END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v145
