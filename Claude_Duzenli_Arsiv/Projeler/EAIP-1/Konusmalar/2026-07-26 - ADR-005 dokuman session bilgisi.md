# ADR-005 dokuman session bilgisi

**Sohbet ID (UUID):** `0100c162-62ca-49d0-bf8e-88919603b677`

**Oluşturulma Tarihi:** 2026-07-26T05:40:54.422598Z

**Güncellenme Tarihi:** 2026-07-26T05:41:24.517703Z

**Özet:** **Conversation Overview**

The person asked a specific lookup question in Turkish: which session was ADR-005 created in. Claude searched the project knowledge base and provided a detailed answer. ADR-005 (titled "Supabase apply authority") was created and accepted in Session 27 (S27, dated 2026-07-08), as confirmed by the Bootstrap v27 header which notes it was sealed alongside ADR-006. The document's content was recorded in KB v27 §2, and its creation was triggered by an event in which AG gained direct read+write access to Supabase and applied migrations autonomously.

Claude also surfaced an important status note: ADR-005 is currently "repo-absent" — the docs/adr directory holds ADR-001 through 004, 006, and 007, but ADR-005 was skipped when ADR-006 was committed via E-DOC-1 and remains uncommitted to the repository as of register v40. The core rule encoded in ADR-005 is that `supabase db push` via Operator/CI is the only permitted apply method, AG's live DB access is read-only, and the deterministic closing gate uses `verifyGrants` and `get_advisors` with a `private`-schema authorization invariant.

The conversation reflects work on a structured multi-session AI agent project with a formal ADR (Architecture Decision Record) governance system, session-based knowledge bases, and Supabase as a core infrastructure component.

---

## 👤 Kullanıcı (2026-07-26T05:40:58.056047Z)

ADR-005 dokumani hangi session icinde olusturuldu?

## 🤖 Claude (2026-07-26T05:41:24.517703Z)


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```

ADR-005 **Session 27'de** (S27, 2026-07-08) oluşturuldu ve kabul edildi.

Bootstrap v27 header'ı bunu açıkça söylüyor: "sealed ADR-005 (Supabase apply authority) + ADR-006 (agent operating modes)." KB v27 §2'de tam içeriği belgelenmiş. Doğuş bağlamı, AG'nin Supabase'e direkt read+write erişim kazanıp kendi kendine migration apply etmesi (SEC-ADVISOR / BUGFIX-AUDIT-1 / ledger reconcile) — bu olay apply authority'nin formalize edilmesini tetikledi.

ADR-005'in özü: apply = Operator/CI `supabase db push` only (asla `apply_migration`), AG'nin live DB erişimi read-only, deterministic closing gate = `verifyGrants` + `get_advisors`, `private`-schema authz invariantı.

Bir not: ADR-005 proje dosyaları arasında bir `ADR-005-*.md` olarak mevcut ama repoda hâlâ **repo-absent** (register v40'ta kaydedilmiş: "ADR-005 is repo-absent — docs/adr now holds 001-004, 006, 007"). ADR-006 E-DOC-1 ile repoya commit edilirken ADR-005 o adımda atlandı ve hâlâ commit edilmemiş durumda.

