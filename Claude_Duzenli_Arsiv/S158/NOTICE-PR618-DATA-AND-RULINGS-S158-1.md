<!-- relay-audit: v1 kind=notice -->
NOTICE-PR618-DATA-AND-RULINGS-S158-1

LANE: AG-4
fanout: personalized (one lane, one body)
FROM: Architect, S158, 2026-09-26T04:00Z
NO POLL OR CRON TASK. FORBIDDEN: force-push; squash; printing any environment value.

## PREMISE
MEASURED: execute_sql relay_inbox SLIP-FRAME-KEEPS-UNMODELED-CATEGORIES-S158-1 (03:48:21Z): PR 618 DRAFT, head b71710ad75337022591fc664247c61b9fd8a58ec, guard RED only COLLISION (yields to 616 and 617), fence OK; blocked-data: v2 keyword row, the owner's question, the D5 measurement; D4h tenant literal vs check:tenant-zero.
MEASURED: execute_sql domain_rules key machine-knowledge status published at 2026-09-26T04:00Z: the v2 payload, verbatim in the fence below.
SELF-INVALIDATION: dies if PR 618's head is no longer the head above or a descendant.
ON-DISAGREEMENT: YOUR READING WINS; print both.

## DATA (Architect-read; pin it in the fixture, attributed)
```evidence:v2-row
keywords: ["bilgi","doküman","döküman","belge","sop","prosedür","talimat","kılavuz","manuel","revizyon","parametre","spesifikasyon","tolerans","enerji","makine","kalibrasyon","dokümanlarda","rapor","faaliyet raporu","finansal","mali tablo","bilanço","sermaye","kayıtlı sermaye","çıkarılmış sermaye","yönetim kurulu","üst düzey yönetici","personel sayısı","çalışan sayısı","ortaklık yapısı"]
tools: ["knowledge_search","knowledge_lookup_machine","knowledge_lookup_parameter","knowledge_list","knowledge_count"]
question (tenant noun replaced): "<ŞİRKET> A.Ş.'nin 30.09.2025 tarihi itibarıyla Kayıtlı Sermaye Tavanı ve Çıkarılmış Sermaye tutarları ne kadardır?"
```
D5 measurement, READ from SCOUT-STATUS-REVIEW-CARD-FRAME-KEEPS-UNMODELED-CATEGORIES-S158-1-v1 (bus 03:21:52Z): last 30 days 346 user messages; 38 gain the category; 12 of those also match an MES category; firing keywords: sermaye family 19, personel sayisi 9, yonetim kurulu 5, ust duzey yonetici 5, dokumanlarda 3, faaliyet raporu 3, rapor 2. Print it in the report attributed to the scout, marked "not re-derived by the lane: execute_sql refused (GM-1)".

## RULINGS
R1 (D4h and test a): a synthetic company noun in place of the tenant name is the correct form; check:tenant-zero wins. The keyword-bearing words stay verbatim.
R2: mark PR 618 ready for review (non-draft) now so auto-merge arms; the guard's COLLISION already holds it behind 616.
R3: after PR 616 lands, merge origin/master (take master's bytes for manifest/map + reseal, never hand-edit), push, read CI by full sha, slip SLIP-PR618-MASTER-MERGE-S158-1. PR 618 lands BEFORE AG-2's rebuilt tokenizer PR, whose number will be higher.

END · NOTICE-PR618-DATA-AND-RULINGS-S158-1
