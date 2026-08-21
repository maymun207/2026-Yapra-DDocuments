# PHASE-LAW-LEDGER-1-FIX-1 · v1
**Lane: AG-1 · S102 · same branch `phase/law-ledger-1`, same PR #248. SC-A class
(docs + one test-affecting file only; NO migration, NO mapped codeArea, NO
turn-pipeline contact). Still does not block Wave 8.**

**PRECONDITION (S47-1):** base = `phase/law-ledger-1` @ `155b637b1b7e6974f5c8b7472d4e63fe6f0c4b46`,
which is a descendant of `origin/master` @ `e7939c93dab14fdd29e4d5ddc6ea6b8a3142d28d`
(ancestry PROVEN by the Architect in a fresh clone; no rebase owed). If either
hash moved, report the new one and continue — this fix sits on any tip.

**Report:** append `## FIX-1` to `docs/relay/PHASE-LAW-LEDGER-1-report.md`.
**PR:** #248 stays open; unsharded CI must re-run green on the new head
(`total_count:0` = FAILED — assert the run EXISTS before reading any bucket, S101-L1).

---

## 0 · WHY THIS FIX EXISTS (Architect's own defect first)

**A-REC-S102-3 — recorded, mine.** The card that produced this phase named
`CLAUDE-PROJECT-INSTRUCTIONS-v5_3` as the source for R2's constitutional texts.
That document is **SUPERSEDED by v5_4** and carries a line that was **known-false at
seal time** (it claimed RULE-26/27/28 had no carried text while the same version
wrote them) — a RULE-20 defect whose own root cause is recorded as A-REC-S101-7.
So the merged file would have declared a canonical home whose provenance points at
a superseded, defective document. The lane could not have known this: v5_4 is not
on the repo filesystem.

Second, the card's DELIVERABLES block would have failed this repo's own
`relayAudit.ts` grammar (`pr:`/`proof:` are unknown keys; multi-word values are
illegal). The lane caught that and worked around it correctly. Both are Architect
errors, named here so they leave the ledger by evidence rather than silence.

## 1 · WHAT IS ACCEPTED AS-IS (do not touch)

Verified independently in a fresh clone, so nothing below needs re-proving:
`docs/laws/RULES.md` 36 records, ids contiguous RULE-0…RULE-35, matching the 36
rule headings in `.agents/AGENTS.md` · the gate is WIRED (`vitest.config` includes
`api/**/__tests__/**/*.test.ts`; `build-test.yml` runs `npm run test`) · the gate
is REAL in three independent directions (dangling ref in a real file → RED;
emptied `canonical` → RED; enforcement pointing at a nonexistent CI job → RED;
tree restored byte-identical; 32/32 green again) · `check:doc-drift` `[OK] 7/7` on
the branch, **no reseal owed** · test-file count 625 = 624 (master) + 1 · 
`package.json` and `package-lock.json` byte-identical to master.

## 2 · REQUIREMENTS

### R1 — Fill the six `text: OWNER-HELD` values, verbatim, from **v5_4**

The Architect holds the source and writes the text; the lane persists it
(KARAR-LAW-HOME-1 §2 division of labour). Below is the exact value for each
record's `text:` key. Rules for applying them:

- Each value is **ONE physical line** — the grammar makes a continuation line a
  parse error, and that is the feature. Do not re-wrap.
- Copy **character for character**, including `**` emphasis and `*"…"*` quoting.
  Source-language text stays in its source language: these are owner-held canonical
  sentences, and translating them is paraphrase, which is the loss the `OWNER-HELD`
  marker existed to prevent.
- In every one of the six records also change
  `source: owner-held:CLAUDE-PROJECT-INSTRUCTIONS-v5_3`
  → `source: owner-held:CLAUDE-PROJECT-INSTRUCTIONS-v5_4`
  and nothing else on that key.

**SOTA-1**
`text: **SOTA-1 — KABUL KRİTERİ (S80).** v1'in tek kabul kriteri `cwf-sota-definition`'dır. O dosyadaki bir kritere izlenemeyen her şey v1 kapsamı dışıdır. Architect, bir SOTA kriterini ilerleten hiçbir kalemi *"şimdilik gerek yok / az trafik / bu kadarı yeter / sonra / v1.1'e"* gerekçesiyle **erteleyemez, küçültemez, sırada aşağı çekemez.** Elinde kalan **tek** itiraz sınıfı *"bu sıralama SOTA'yı kanıtlanamaz kılar"*dır ve ancak şunları YAZILI adlandırırsa kabul edilir: **(a)** hangi kriter kanıtsız kalır, **(b)** hangi tarihte kanıtlanabilir olur, **(c)** hangi ölçüm çözer. Üçü eksik her erteleme önerisi bir **SOTA-1 ihlalidir**: sahip adıyla iptal eder, Architect ya aynı mesajda (a)+(b)+(c)'yi verir ya öneriyi geri çeker — üçüncü yol yoktur. Bir kriter YALNIZ kanıtla emekli olur.`

**PLATINUM**
`text: **PLATINUM KURALI** — her şey kendi kendini yapılandırır, tek tıkla operasyoneldir. Manuel iş GEREKİYORSA tasarım YANLIŞTIR → dur ve yeniden tasarla. İhlal = kendiliğinden beyan + numaralı **PLATINUM-BREACH** kaydı + sıra atlayan yeniden tasarım. Sahibe aksiyon maddesi yazmadan önce sor: bu madde insan YARGISI içeriyor mu (karar, harcama onayı, gerçek-dünya testi)? Hayırsa → o iş MAKİNE işidir.`

**ALTIN DEFTER · GOLDEN LEDGER**
`text: **ALTIN DEFTER / GOLDEN LEDGER** — taşıyıcılar append-only; kalemler yalnız `CLOSED@evidence` / `SUPERSEDED-BY` / `MERGED-INTO` ile çıkar; her kapanış carry-diff'ini yapıştırır; **özetin özeti yasak**; her kalem **ADIYLA** yaşar.`

**FULL-TRACE MANDATE**
`text: **FULL-TRACE MANDATE** — her stage, DB okuması ve araç çağrısı hem Langfuse'ta hem panelde INPUT+OUTPUT gösterir; yalnız ham sırlar temizlenir. **İnşa yoluyla** dayatılır (CI'daki tamlık muhafızı).`

**TOTAL-45 · S59-2**
`text: **TOTAL-45 / S59-2** — logdaki/telemetrideki/göstergedeki sayı ya da ad bir **İDDİADIR**, dünya değil. Öncül olmadan önce yayan satırı grep'le ya da bağımsız doğrula. **Architect'in kendi düzyazısı ve faz promptları dahil.**`

**S61-2**
`text: **S61-2 · ARKADA BORÇ BIRAKMA** — bir fazı doğrularken çıkan bulgular sonraki blok açılmadan temizlenir; uyarı etiketi düzeltme DEĞİLDİR. Erteleme yalnız ADLANDIRILMIŞ ve kayıtlıysa meşrudur.`

### R2 — Retire the S59-2 "unresolved" note, with the reason

The report records that `S59-2` occurs nowhere in the repo and calls the card's
`TOTAL-45/S59-2` pairing unresolved. **It is resolved: that is expected, not a
defect.** S59-2 is a session law of the owner corpus, paired with TOTAL-45 as one
constitutional record; it has no repo code surface, which is exactly why its
`enforcement` is `ADVISORY`. Replace the "unresolved" wording with that statement.
Do **not** invent a code enforcement site for it.

### R3 — Reconcile the PLATINUM "observed in use" note against the canonical text

⚠ **This is the load-bearing item of the fix, and it is a real finding.** The file's
`Observed in use` note reads PLATINUM as a *backend/data-agnosticism standard*
proven by a synthetic-backend test. The owner's canonical sentence says something
else entirely: *everything self-configures; if manual work is required the design
is wrong*. Those are two different rules wearing one name.

File it by name — **`F-S102-PLATINUM-NAME-COLLISION`** — in the report and in the
RULES.md open-questions section, and rewrite the note so it states the collision
rather than asserting the repo reading as PLATINUM's meaning. **Do not resolve it
by guessing which one is "really" PLATINUM**; a canonical sentence is the owner's.
The same treatment applies to any other `Observed in use` note whose reading is
not entailed by the newly-landed canonical text — check all six and report which
ones you checked, including the ones that came back consistent (a note saying
"checked, consistent" is a measurement; silence is not).

### R4 — Q1 (RULE-26 posture) stands OPEN, by Architect ruling, with the reason

Do **not** edit `api/admin/latest-turn-trace.ts`. That path is a mapped `codeArea`;
touching it would move a tab hash, drag a reseal and a `docVersion` mint into an
SC-A phase, and put this lane back into contention for the seal token. Record in
RULES.md: *"Architect ruling S102 — deferred by name to the next phase that already
touches `api/admin/**`; the ledger gate is satisfied either way because the
reference resolves."* Q2 (RULE-0) and Q3 (RULE-22) stay open pending owner ruling;
if a ruling arrives in the same turn, apply it and say so.

## 3 · TESTS

The existing 32 assertions must stay green with real text in place — in particular
the CONSTITUTION parse test, which is now exercised against long single-line values
containing colons, backticks, `→`, `·` and quotes. If the parser splits on the wrong
colon, that is a **grammar defect this fix has just discovered**: fix the parser and
say so, do not reshape the owner's sentence to fit it. Re-run the four-way self-test
so the gate's own proof travels on the new head.

## 4 · GATES

`npm run test` (full suite) · `typecheck:api` · `check:doc-drift` (expect `[OK]`,
**no reseal, no docVersion mint** — `docs/**` is not a mapped surface; if drift
goes red, STOP and report rather than resealing) · `check:tenant-zero` ·
`relay-audit [OK] kind=phase` · CI on PR #248 head with `total_count >= 1`.

## 5 · DELIVERABLES

```
branch: phase/law-ledger-1
report: docs/relay/PHASE-LAW-LEDGER-1-report.md
```

Merge is `--no-ff` and happens only after a separate Architect GO carrying a
byte-identical merge message. This relay is not that GO.

TAIL-ANCHOR: PHASE-LAW-LEDGER-1-FIX-1-v1
