# PHASE-CHART-CANDIDATE-1-FIX-1 · v1 — LANE: AG-2

<!-- 2026-08-07 · S83 · Architect: Claude (Opus 5). Opens+closes BUG-034
     ("rule-induced draw inconsistency + false existence claims").
     Base: origin/master ce2e244 or newer — PROVE it (S82-4). Branch:
     phase/chart-candidate-1-fix-1, own worktree, absolute paths (S80-1).
     Migrations/Operator/publishes: ZERO (reconciler self-seeds rule updates,
     proven live: [Gate] publish ×3 on first post-merge turn).
     NOTE: rules changed in code get a NEW rule hash; verify the reconciler
     treats changed text as a re-publish, and quote the [Gate] expectation. -->

## §EVIDENCE (production, ce2e244, N=3, all read by the Architect)
- `910675a7` NO DRAW — root-research COMPLETE, chart 85 found, data fetched
  (5 rows), model still declined to emit the viz macro. No rule says "draw".
- `d94bcfc3` DREW — root "doğalgaz" → 5 charts → 85 → drawn. The good path.
- `74597fcc` NO DRAW + FALSE CLAIM — searches "Granit Glazür"→0 and
  "sarfiyatı"→94(big_number_total) only; NEVER tried the root; never fetched
  data; answered "grafik bulunmamaktadır / BI sistemimizde mevcut değildir" —
  the exact outcome rule-1's forbidden clause bans, stated as fact, in the
  SAME conversation where 85 was drawn three minutes earlier with memory
  offering that episode (conv=2).
Severity note: turn 3 is INVISIBLE to the outcome predicate (no server
failure signal, no viz macro → no parity mismatch) — it writes `unproven`,
recallable, a poison seed SUCCESS-ONLY cannot catch. The remedy below is
prose-rule strengthening; a deterministic backstop is NAMED (§FOLLOW-UP), not
built here.

## §G1 · TWO RULE TEXTS STRENGTHENED — no new rules, roster stays 17
In `gatewayProtocol.ts`, amend IN PLACE (house voice, Turkish, keep ids):

**`chart-shape-filter` — append a TERMINAL (landing) clause to `rule`:**
"Kök araştırması şekil-uygun (çok-satırlı/seri taşıyan) TEK aday bıraktıysa
ONU ÇİZ — viz makrosunu yayınla. Kullanıcının istediği kırılım (ör. günlük)
kaynak grafikte yoksa, mevcut şekli YİNE DE çiz ve sınırı TEK cümleyle söyle
(ör. 'kaynak grafik hat bazında toplam veriyor; günlük kırılım bu grafikte
yok'). Veri elde ve çizilebilirken çizmemek kendi başına bir başarısızlıktır."
**And extend `forbidden`:** "Çizilebilir veri ELDEYKEN tabloya düşüp grafiği
atlamak yasaktır. 'Grafik bulunmamaktadır / sistemde mevcut değildir' türü bir
YOKLUK İDDİASI, ancak kök-araştırma TAMAMLANMIŞ ve şekil-uygun hiçbir aday
kalmamışken kurulabilir; bu sohbette daha önce bulunmuş veya çizilmiş bir
grafik bağlamda dururken yokluk iddiası kurmak yasaktır."

**`root-research` — define the root and make the step non-skippable:**
append to `rule`: "KÖK = AYNI kelimenin eksiz/daha kısa hali ('sarfiyatı' →
'sarfiyat', 'tüketimi' → 'tüketim'). FARKLI bir kelime ya da varlık adı
denemek ('Granit Glazür' gibi) kök denemesi SAYILMAZ. Tek arama kelimesi TEK
aday (özellikle tek-değer şekil) ya da SIFIR sonuç döndürdüyse kök denemesi
ATLANAMAZ bir sonraki adımdır."

## §G2 · TESTS
- Pin file updated: roster EXACTLY 17 (no rule added/lost) · both amended
  texts pinned on their key phrases ("ONU ÇİZ", "YOKLUK İDDİASI", "ATLANAMAZ")
  · BUG-034 evidence comment present with the three trace ids.
- Compose-seam test still proves both texts arrive in compose output.
- Mutation both directions: revert ONE amendment → pin reds alone; restore →
  green. Quote both runs.
- Eval-gate suite green THROUGH the gate; touched fixtures listed or "ZERO".

## §CI · §REPORT · §RELAY — identical to CHART-CANDIDATE-1's contract
Five gates green (local CI-equivalent runs acceptable while BUG-033/Actions is
down — state which was used) · report to
`docs/relay/PHASE-CHART-CANDIDATE-1-FIX-1-report.md` · push BEFORE final line
· STOP for GO (--no-ff, squash banned; last-to-merge reseal law stands).

## §POST-DEPLOY PROOF (Architect reads; DONE = this, not the merge)
NEW N=3 of the same ask-class on the merged deployment: target 3/3 = chart
drawn OR by-name question; ZERO existence-denials. The [Gate] re-publish lines
for both amended rules are the arming proof (S66-1) before the N=3 starts.

## §FOLLOW-UP (named, not built — enters the register by name)
W-item: deterministic backstop for false existence claims — the turn's own
tool ledger knows a timeseries candidate WAS returned this conversation; a
render-layer or prompt-side check could contradict a "yok" sentence the way
prose-render-parity contradicts a phantom chart. Design belongs to a later
phase; named here so the gap is never silent.

<!-- END · PHASE-CHART-CANDIDATE-1-FIX-1 · v1 -->
