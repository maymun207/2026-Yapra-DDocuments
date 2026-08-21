# CWF / EAIP — Açık İş Kaydı (Open-Items Register)
**rev 4 · 2026-07-01 · HEAD `b52faa7` (user-management surface complete, canlı)**

v3'ten farkı: PROV-3 kapandı (ölü fallback silindi); davet/credential sagası (INV-1/2/3 + SPA rewrite + user-list-from-auth) kapandı; tam User-Management yüzeyi (UM-1/2/3) kapandı ve iki audit-migration'ı uygulandı; standing-rule seti account-op→gated-UI / anti-lockout / crossover-guard / temp-pw-secret / login=Supabase-direct ile genişledi. **Yeni borç kalemleri:** dead coverage gate, force-signout SDK gap, audit-or-fail posture.

---

## ✅ AGREED SEQUENCE (kararlaştırılan sıra)
1. **(bitti)** PROV-3 (ölü `shared/llmGateway` fallback **silindi** — konsolide değil).
2. **(bitti — plan-dışı ama zorunlu)** Davet/credential sagası + tam User-Management yüzeyi (INV-1/2/3, SPA rewrite, user-list-from-auth, UM-1/2/3). Owner şikayeti (dashboard-for-user-ops) tetikledi.
3. **(bu adım)** Checkpoint: KB v8 + bootstrap v7 + register v4.
4. **Sıradaki:** **PL-1 F-obs**.

---

## 0. Bu session-line'da KAPATILANLAR (artık açık değil)
- **PROV-3** (merge `29e5dfd`; code `f95be2a`, seal `7c9ea43`) — ölü `shared/llmGateway/{index,providers,rateLimiter}.ts` **silindi** (sıfır production caller; `FALLBACK_PROVIDERS` = ikinci hardcoded model-id listesi = RULE-1 drift mayını). Tek provider yüzeyi = PROV-1 registry (silmeyle). Follow-up (`ba2846c`): dangling `vitest.config.ts` coverage-exclude'ları temizlendi.
- **Davet/credential sagası** (`b4ff3e3`) — INV-1 (Site URL + allowlist) · custom-SMTP port fix (30s hang→504) · **SPA rewrite** `vercel.json` `/((?!api/).*)→/index.html` (accept-invite/admin 404) · INV-2 (accept-invite/set-password, single-sourced `ACCEPT_INVITE_PATH`) · **user-list-from-auth.users** (least-privilege kullanıcılar görünür) · INV-3 (invite temp-pw fallback + admin reset→/accept-invite + **POSITIVE crossover guard** `evaluateInviteGate` + `setPassword` server re-assert). Kök sebep: hesaplarda kullanılabilir şifre yoktu (link oturumu var, set-password persist yok; recovery root'a düşüyor; crossover ksadmin'i bozmuş).
- **User-Management yüzeyi** (`b52faa7`) — UM-1 (audit-CHECK migration + disable/enable/confirm-email/set-temp-pw/audited-reset + anti-lockout genişletildi) · UM-2 (server-computed status + badge/filters/search + user-detail drawer + per-user audit trail) · UM-3 (change-email/name + resend/revoke pending). **Her hesap operasyonu gated/audited/RBAC panelde, sıfır Supabase-dashboard.** İki audit-migration (`20260630190000`, `20260701120000`) **uygulandı**.

---

## 1. PARK EDİLEN — sıradaki adım

**PL-1 · F-obs gözlemlenebilirlik backbone** *(sıradaki, load-bearing)*
OTel → self-hosted Langfuse. F-obs1 (OTel SDK + LangfuseSpanProcessor bootstrap + AI SDK `experimental_telemetry` + serverless force-flush) · F-obs2 (manuel span'lar `executeMCPTool`/DB-read + per-turn trace id + session=`conversationId`) · F-obs3 (redaction boundary span-processor seviyesinde + `telemetry_events` ledger vs tracing ADR). 3 adlı tuzak: full-I/O redaction, serverless force-flush (stream fonksiyonu donar), OTLP/HTTP-only (gRPC desteklenmez).

---

## 2. PLANLANAN — gelecek fazlar
- **PL-2 · Eval golden harness.**
- **PL-3 · `docs/ARCHITECTURE.md` + formal ADR'lar.**
- **PL-4 · Tam Tool Routing tab** (per-category edit).
- **PL-5 · Deny/quarantine UI** (Phase D-core'dan deferred).
- **PL-6 · Cross-source reconciliation (Phase E)** — forged-label DETECTION.
- **PL-7 · LangGraph bridge (Shape B)** — `runAgent` extraction first.
- **PL-8 · Self-improving KB (Phase 7+ vizyon).**

---

## 3. TEKNİK BORÇ
- **TD-7 · Dead coverage gate** *(YENİ, PROV-3'te keşfedildi)* — `vitest.config.ts` eşikleri (statements/functions/lines 90, branches 85) yapılandırılmış ama **hiçbir otomatik yolda koşulmuyor** (`--coverage` yalnız `test:coverage` script'inde; `build`/`test`/CI plain `vitest run`). Gerçek ~%60. Guard gibi görünüp guard olmayan = false-assurance. **Committed yön:** ya gerçek yap (`test:coverage`'ı CI'ya bağla + gerçekçi floor ~%60 + yukarı ratchet) ya da açıkça advisory'e indir.
- **TD-8 · Force-signout / instant session-revoke** *(YENİ, UM-1)* — `supabase-js@2.95.3`'te id-ile-revoke primitifi yok. `disable`(ban) yenilemeyi engelliyor ama mevcut access token TTL'i (~1 saat) dolana kadar geçerli — **anında değil**. Aktif ele geçirilmiş hesap için gerçek revoke: GoTrue capability / `auth.refresh_tokens` service-role SQL / Edge Function. `force_signout` CHECK'te forward-compat olarak duruyor (butonsuz).
- **TD-9 · Audit-or-fail posture** *(YENİ, UM-1)* — governance-critical admin mutation'ları şu an **best-effort** (audit insert reddedilse bile op başarılı, logs-and-continues). Migration'dan önce denetimsiz-mutasyon penceresi açar (migration'lar uygulandı → pencere kapalı, ama posture standing). Karar: audit-critical mutation'lar için audit-or-fail (ya da loud alarm) mı?
- **TD-1 · Superset runtime empty≠zero validator (P7)** — facts-ledger hâlâ ARMES-zone-specific. Kırılgan regex YOK.
- **TD-2 · Phase D forged-label limit** — single-source self-consistent in-scope forged-label; contained, not detected (PL-6 = detection).
- **TD-5 · DOC-1 drift-guard WARN→FAIL** — bilinçli ertelendi (build-FAIL iki-commit seal'i kırar; doğru yer PR/merge katmanı).
- **TD-4/6 · küçük nit'ler** (taşınıyor): `/api/admin/rules/[id]` `url.parse()` DEP0169 · `index.html` statik docVersion span (kozmetik, runtime JSON overwrite ediyor) · OBS-1 clearAll match-all · Phase F pozisyonel `BACKEND_IDS[1]`.

---

## 4. OWNER-ACTION
- **OA-1 · viz live acid test** *(açık, carry-over)* — gerçek ARMES tool → sortable grid + chart → reload → boş-liste; running app + ARMES MCP + Supabase auth gerekir.
- **OA-5 · Stricter email-change (opsiyon)** — admin-authoritative immediate-apply yerine end-user re-verification isteniyor mu? (regulated posture)
- **OA-6 · User-facing forgot-password** — LoginPage'e `resetPasswordForEmail(...,{redirectTo:/accept-invite})` linki (admin-tetiklemeli reset zaten var).
- **OA-7 · `APP_BASE_URL`** Vercel Production env (opsiyonel — origin fallback prod'da çalışıyor).
- **OA-2/3/4 · `seedRules.ts` (Superset publish) · `backend_id:'superset'` backfill · real-ARMES confidence pass** — durum teyit.
- *(İki UM audit-migration → ✅ uygulandı.)*

---

## Architect-önerisi öncelik
**PL-1 F-obs** sıradaki — tüm gelecek test/optimizasyon altyapısı. Erken bir küçük faza **TD-7 (dead coverage gate)** + **TD-9 (audit-or-fail)** hardening'ini iliştirmek makul ama F-obs'u bloklamaz. OA-1 (viz live) app bir sonraki açıldığında batch'lenir. Force-signout (TD-8) gerçek bir güvenlik boşluğu ama SDK/altyapı bağımlı — Edge-Function/SQL yolu netleşince ayrı faz.
