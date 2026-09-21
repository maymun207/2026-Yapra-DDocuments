OWNER-WITNESS-S153-TOUR-1

Who: the owner used CWF in production at about 01:00-01:06 TSI 2026-09-22 (build 4f6a919fc0fd80f496e4533bfd977f781fd24498, numericMode=stamp). The Architect read the rendered page from the built-in browser pane (document.body.innerText) at about 22:08Z.

Turn A: Soru 3 (see OWNER-WITNESS-S153-Q3-STAMP-1).
- Extra observation: the prose says "IKINCILALT hattının barkodsuz çalışması nedeniyle bu hatta fire verisi ARMES'te yapısal olarak görünmemektedir". No tool this turn returned that; the footer says "3 past interaction(s) recalled", so it came from memory recall. A recalled claim is written as if it were measured this turn. UNMEASURED whether the recall row is itself correct.

Turn B: "30 Eylül 2025 tarihi itibarıyla Kaleseramik bünyesinde istihdam edilen toplam personel sayısı kaçtır ve 2024 sonuna kıyasla değişim nasıl gerçekleşmiştir?"
- Tools: getFactoryList x1, resolve_time_range x2, getEmployeesWorkedBetween x34 (ARMES). Footer: 24 concurrent calls queued (limit 3); per-turn limit 30 reached, 4 calls NOT executed.
- Answer: every executed call returned "Belirtilen tarih aralığında çalışan personel bulunamadı"; the model said it cannot provide the number.
- F-S153-COMPANY-REPORT-QUESTION-ROUTED-TO-ARMES-1 (joins register item 28): the question is about the company's nine-month report (a document question), not the factory time-and-attendance tool. HOW: A24 routing (P1-C hints, P2 hybrid retrieval over backend profiles, conformal backend set) must send it to the document backend; first measure whether the report is in any connected backend's corpus (item 39 M2). WHEN: M2 measured today; routing through P2-0/P2-1 cards cut today, landing before the 2026-09-23 deadline.
- F-S153-PROSE-SAYS-ALL-WHEN-CALLS-WERE-DROPPED-1: the answer says "tüm fabrikalar özelinde ... bulunamadı" while 4 calls were not executed (partial != complete). The footer warns; the prose does not. HOW: when the per-turn call limit drops calls, the answer carries the same kind of appended notice the partial-read path already uses (first check the consumer of that notice, 12.6), naming how many calls of how many ran. WHEN: small card, scout first, after the #591/#592 landings, 2026-09-22.
- F-S153-TOOL-FANOUT-34-CALLS-1: 34 calls of one tool for one question (one per factory per date). HOW: A24 P1-B executor (aggregate over one multi-entity call where the tool allows it) and the P1-C budget; WHEN: P1-B card waits in AG-4's box, next after the landings.

END · OWNER-WITNESS-S153-TOUR-1
