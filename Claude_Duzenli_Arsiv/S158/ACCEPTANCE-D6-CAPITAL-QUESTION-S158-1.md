# ACCEPTANCE-D6-CAPITAL-QUESTION-S158-1

Architect, S158, 2026-09-26T13:52Z. Read from production DB (project fjbrkimwvtpwoxhziidh), not from a screen.

## What landed
master 6e385480d0aecce6a3e8d65ae732b4049c75a1a8 = Merge PR #620 (FRAME-KEEPS-UNMODELED-CATEGORIES-S158-1), Vercel production READY.

## The owner's question, asked twice after landing (13:42:31Z and 13:48:10Z)
"Kaleseramik A.Ş.'nin 30.09.2025 tarihi itibarıyla Kayıtlı Sermaye Tavanı ve Çıkarılmış Sermaye tutarları ne kadardır?"

## Trace (turn_trace_digest 8e835445ffe7e3ff51931641f7f868b3, stage 07 register-tools)
- path semantic, basis frame, irFrame QUERY_MASTER/SYSTEM, confidence HIGH
- matchedCategories [admin, machine-knowledge]; unmodeledKept [machine-knowledge] (the fix fired)
- knowledge_search, knowledge_list, knowledge_lookup_* offered
- stage 10: toolLoop [knowledge_search], toolCalls 1, failures 0, finishReason stop

## Answer (messages, both turns)
Kayıtlı Sermaye Tavanı 1.000.000.000 TL; Çıkarılmış Sermaye 514.778.660,51 TL; source "Kaleseramik Faaliyet Raporu - 2025", GENEL BİLGİLER.

## Verified against the tool result bytes (raw_tool_results)
"Hesap Dönemi : 01.01.2025 – 30.09.2025 ... Kayıtlı Sermaye : 1.000.000.000 TL / Çıkarılmış Sermaye : 514.778.660,51 TL". Answer = source. D6: ACCEPTED.

## Finding carried to S159
F-S158-GROUNDING-BLIND-TO-TR-NUMBERS-1: stage 10 cwf.grounding printed numericValues [] and numericClaimsUnsourced 0 for an answer carrying two Turkish-formatted numbers. The grounding check did not see them; had they been wrong it would not have caught it. Fix: S159 card, grounding numeric extractor must parse tr-TR grouping (dot thousands, comma decimal) with a falsifier test on this exact answer.
