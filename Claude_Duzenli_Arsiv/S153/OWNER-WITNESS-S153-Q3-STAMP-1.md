OWNER-WITNESS-S153-Q3-STAMP-1

Who: the owner asked Soru 3 verbatim in production (cwfyaprak.vercel.app, footer "Gemini Flash") at about 00:58 TSI 2026-09-22, after flipping grounding.numericMode from measure to stamp (agent.param, v2 published by the owner in the admin UI). The Architect read the rendered answer from the built-in browser pane (document.body.innerText) at about 22:05Z.
Build: Vercel production READY on 4f6a919fc0fd80f496e4533bfd977f781fd24498 (merge of PR 590, P1-A numeric guard).

MEASURED (rendered answer):
- Stamp line present, verbatim: "Şu sayılar bağlı araç verisinde bulunamadı — model hesabı, kaynakta yok: 5"
- Tools (footer): resolve_time_range x1, getFactoryLines x1, getLineStopsReportForZones x1, getOeeValuesForZones x1 (4). No scrap tool: the answer says fire could not be reported. Expected until PR 591 (P1-C1 metric hints) lands.
- The S149 invented averages (%95.84, %82.06 ...) are gone; the prose gives ranges ("%70 ile %86", "%79 ile %91", "%99-100", "%79-98") that the ledger did NOT flag, so each matched a value in tool output.
- Three lines resolved: Glazur3 (36 stop rows), FIRINALT (1), IKINCILALT (18, reason codes empty).
- Output is still a generic sectioned report, not an A3 frame (A24 P3, R-20).

FINDING F-S153-STAMP-FLAGS-METHOD-NAME-NUMERAL-1: the only flagged value, "5", is the numeral in "5 Neden Analizi" (the 5 Whys method) inside the advisory recommendations, not a data claim. A false positive of the stamp mode.
HOW: the numeric claim check gets one more named exemption class, proven by a planted test: a numeral that is part of a method or term name the model wrote in advisory prose, not a quantity. The exact rule is for the scout to attack (it must not open a hole for real unsourced quantities). Measure-only data stays as it is.
WHEN: a small card, scout first, cut in S153 after the #591/#592 landings; target land 2026-09-22.

END · OWNER-WITNESS-S153-Q3-STAMP-1
