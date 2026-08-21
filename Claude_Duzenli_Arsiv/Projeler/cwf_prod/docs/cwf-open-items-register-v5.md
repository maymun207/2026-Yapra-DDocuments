# CWF / EAIP — Açık İş Kaydı (Open-Items Register)
**rev 5 · 2026-07-01 · HEAD `b52faa7` (user-management surface complete, canlı)**

v4'ten farkı: **PL-1 F-obs artık "sıradaki" değil — BLOKE** (self-hosted Langfuse host ayakta değil); park-but-not-forget'e alındı, unpark temiz olsun diye tasarım kararları KİLİTLENDİ. **Yeni bulgu (kod SSOT denetimi):** `telemetry_events.session_id` per-turn random uuid — `traceId`'den ayrı, ikinci korelasyonsuz per-turn id ve `conversationId` DEĞİL → **TD-10**, F-obs2'ye katlanıyor (standalone patch YOK). **Harita-sapması düzeltildi:** proje-tarafı KB'de "Tracer (no-op)" + "per-turn trace id yok" notları KODA AYKIRIYDI; in-repo KB zaten doğru — sadece proje-tarafı map düzeltildi.

---

## ✅ AGREED SEQUENCE (kararlaştırılan sıra)
1. **(bitti)** PROV-3 (ölü `shared/llmGateway` fallback **silindi** — konsolide değil).
2. **(bitti — plan-dışı ama zorunlu)** Davet/credential sagası + tam User-Management yüzeyi (INV-1/2/3, SPA rewrite, user-list-from-auth, UM-1/2/3).
3. **(bitti)** Checkpoint: KB v8 + bootstrap v7 + register v4.
4. **(bu turda)** Resume-doğrulama (repo klonu, HEAD/tests/docVersion teyit) + harita-sapması düzeltmesi + kod SSOT denetimi (TD-10 bulundu).
5. **Sıradaki AMA BLOKE:** **PL-1 F-obs** — Langfuse host ayağa kalkınca unpark.

---

## 0. Bu session-line'da KAPATILANLAR (artık açık değil)
- **PROV-3** (merge `29e5dfd`; code `f95be2a`, seal `7c9ea43`) — ölü `shared/llmGateway/{index,providers,rateLimiter}.ts` **silindi** (sıfır production caller; `FALLBACK_PROVIDERS` = ikinci hardcoded model-id listesi = RULE-1 drift mayını). Tek provider yüzeyi = PROV-1 registry (silmeyle). Follow-up (`ba2846c`): dangling `vitest.config.ts` coverage-exclude'ları temizlendi.
- **Davet/credential sagası** (`b4ff3e3`) — INV-1 (Site URL + allowlist) · custom-SMTP port fix · **SPA rewrite** `vercel.json` `/((?!api/).*)→/index.html` · INV-2 (accept-invite/set-password, single-sourced `ACCEPT_INVITE_PATH`) · **user-list-from-auth.users** · INV-3 (invite temp-pw fallback + admin reset→/accept-invite + **POSITIVE crossover guard** `evaluateInviteGate` + `setPassword` server re-assert).
- **User-Management yüzeyi** (`b52faa7`) — UM-1 (audit-CHECK migration + disable/enable/confirm-email/set-temp-pw/audited-reset + anti-lockout) · UM-2 (server-computed status + badge/filters/search + user-detail drawer + per-user audit trail) · UM-3 (change-email/name + resend/revoke pending). **Her hesap operasyonu gated/audited/RBAC panelde.** İki audit-migration (`20260630190000`, `20260701120000`) **uygulandı**.

### 0.1 Bu turda DÜZELTİLEN harita-sapması (kod ground-truth; sadece proje-tarafı map değişti — repo/AG değişikliği YOK)
Repo `.agents/skills/cwf-project-kb/SKILL.md` (OBS-1 kaydı) + CHANGELOG `[2026-06-29] OBS-1` ZATEN doğru: `chat.ts` per-turn `traceId` mint ediyor + `[trace=…] [ToolRoute]` emit ediyor; **repoda "Tracer (no-op)" iddiası YOK**. Sapma yalnızca benim (architect) yönettiğim proje-tarafı artefaktlardaydı. İki cerrahi düzeltme (bootstrap/KB regen'inde de baked-in):
- **`CLAUDE-PROJECT-INSTRUCTIONS.md` §4** — "Observability = `Tracer` (no-op) + `telemetry_events`" → **`telemetry_events` (best-effort ledger, `TelemetryRepository`) + OBS-1 per-turn log-correlation `traceId` (`chat.ts:409`, 8-char, Vercel-greppable). `Tracer` class YOK — OTel/span katmanı greenfield (PL-1 F-obs).**
- **Observability constraint notu (bootstrap/memory)** — "per-turn trace ID … does not exist today" → **per-turn id ZATEN VAR (OBS-1D `traceId`); F-obs ikinci id mint ETMEZ — OTel trace id SSOT olur, 8-char log id ondan TÜRETİLİR.**
- Memory #8 = bu düzeltmeyi kalıcılaştırdı (memory #5'in stale alt-noktalarını supersede eder).

---

## 1. PARK EDİLEN — sıradaki adım (BLOKE)

**PL-1 · F-obs gözlemlenebilirlik backbone** — **⛔ BLOKE (park-but-not-forget)**
**Blocked-on:** self-hosted Langfuse host **ayakta değil**. Gereken karar/girdi: (i) host nereye kurulacak (Docker Compose + Postgres + ClickHouse), (ii) **Vercel serverless egress'ten erişilebilir mi** (force-flush export'un hedefi). Bu bir mimari/altyapı girdisi — icat edilemez, offload-chore değil.

**Kapsam (değişmez):** F-obs1 (OTel SDK + LangfuseSpanProcessor bootstrap + AI SDK `experimental_telemetry` + serverless force-flush) · F-obs2 (manuel span'lar `executeMCPTool`/DB-read + per-turn trace SSOT + session=`conversationId`) · F-obs3 (redaction boundary span-processor seviyesinde + `telemetry_events` ledger vs tracing ADR).

**3 adlı tuzak:** (1) full-I/O redaction (deterministik scrubber, span-processor'da, export ÖNCESİ — bolt-on regex değil), (2) serverless force-flush (stream fn donar → response'tan önce `flush()`/`shutdown()` yoksa span'lar hiç gitmez), (3) OTLP/**HTTP-only** (gRPC desteklenmez — exporter default gRPC → protokol zorlanmalı yoksa span'lar sessizce gitmez).

**KİLİTLİ TASARIM KARARLARI (unpark'ta re-litigate YOK):**
- **Per-turn kimlik SSOT:** OTel trace id = kaynak. 8-char log `traceId` ondan **türetilir** (ilk 8 hex) → log↔trace tek id'de join. **İKİNCİ per-turn id mint EDİLMEZ.**
- **Session binding + TD-10 reconciliation:** telemetry ledger'ın per-turn grouping'i **aynı** trace id'yi kullanır; `telemetry_events.session_id` → `conversationId`'ye bağlanır (session=conversationId modeli). **Standalone patch YOK — F-obs2'de tek seferde, canlı `TelemetryTab` tüketicisiyle koherent şekilde.**
- **Unpark posture:** F-obs1 **code-complete** iner (SDK+processor+`experimental_telemetry`+force-flush, OTLP/HTTP zorlanmış) — `LANGFUSE_HOST`/keys **env**. "Span'lar Langfuse'a gerçekten düştü" kanıt-gate'i host ayağa kalkınca tetiklenir (Operator lane host'u getirir; architect host-yerleşim kararını ister).
- **Sıralama:** F-obs, parked F (ARMES-on OEE reliability) ÖNCESİ kalır — F'in 3-provider parity self-verify'ı trace-tree yan-yana ile kanıtlanır.

---

## 2. PLANLANAN — gelecek fazlar
- **PL-2 · Eval golden harness** (Langfuse'la aynı çatı).
- **PL-3 · `docs/ARCHITECTURE.md` + formal ADR'lar.**
- **PL-4 · Tam Tool Routing tab** (per-category edit).
- **PL-5 · Deny/quarantine UI** (Phase D-core'dan deferred).
- **PL-6 · Cross-source reconciliation (Phase E)** — forged-label DETECTION.
- **PL-7 · LangGraph bridge (Shape B)** — `runAgent` extraction first.
- **PL-8 · Self-improving KB (Phase 7+ vizyon).**

---

## 3. TEKNİK BORÇ
- **TD-10 · `telemetry_events.session_id` SSOT sapması** *(YENİ — bu turda kod-denetiminde bulundu)* — `chat.ts:468 const sessionId = randomUUID()` her emit'te `session_id` olarak yazılıyor. İKİ problem: (a) `traceId`'den ayrı, **korelasyonsuz ikinci per-turn id** (ledger satırı kendi log satırlarına join edilemez), (b) "session" etiketli ama per-turn ve `conversationId` **değil** (`resolvedConversationId` `chat.ts:423` telemetriye hiç ulaşmıyor) → session=conversationId modeliyle çelişir. Correctness/safety bug DEĞİL (telemetri advisory). **Committed:** F-obs2'ye katlanır (OTel trace id'de birleştir + `session_id`→`conversationId` bağla) — standalone patch YOK, `TelemetryTab`'ı iki kez ellememek için.
- **TD-7 · Dead coverage gate** *(PROV-3'te keşfedildi)* — `vitest.config.ts` eşikleri (90/85) **hiçbir otomatik yolda koşulmuyor** (`--coverage` yalnız `test:coverage`'da; build/test/CI plain `vitest run`). Gerçek ~%60. Guard gibi görünüp guard olmayan. **Committed:** ya gerçek yap (CI'ya bağla + gerçekçi floor + yukarı ratchet) ya da advisory'e indir.
- **TD-8 · Force-signout / instant session-revoke** *(UM-1)* — `supabase-js`'te id-ile-revoke yok. `disable`(ban) yenilemeyi engelliyor ama access token TTL'i (~1s) dolana kadar geçerli — anında değil. Gerçek revoke: GoTrue capability / `auth.refresh_tokens` service-role SQL / Edge Function. `force_signout` CHECK'te forward-compat (butonsuz).
- **TD-9 · Audit-or-fail posture** *(UM-1)* — governance-critical admin mutation'ları best-effort (audit reddedilse bile op başarılı). Migration'lar uygulandı → pencere kapalı ama posture standing. Karar: audit-critical mutation'lar için audit-or-fail (ya da loud alarm)?
- **TD-1 · Superset runtime empty≠zero validator (P7)** — facts-ledger hâlâ ARMES-zone-specific. Kırılgan regex YOK.
- **TD-2 · Phase D forged-label limit** — single-source self-consistent in-scope forged-label; contained, not detected (PL-6 = detection).
- **TD-5 · DOC-1 drift-guard WARN→FAIL** — bilinçli ertelendi (build-FAIL iki-commit seal'i kırar; doğru yer PR/merge katmanı).
- **TD-4/6 · küçük nit'ler:** `/api/admin/rules/[id]` `url.parse()` DEP0169 · `index.html` statik docVersion span (kozmetik) · OBS-1 clearAll match-all · Phase F pozisyonel `BACKEND_IDS[1]`.

---

## 4. OWNER-ACTION
- **OA-8 · Langfuse host yerleşimi** *(YENİ — F-obs'u unblock eder)* — self-hosted Langfuse nereye kurulacak + Vercel egress'ten erişilebilir mi? Bu karar gelmeden F-obs'un kanıt-gate'i tatmin edilemez (kod yine de code-complete inebilir).
- **OA-1 · viz live acid test** *(carry-over)* — gerçek ARMES tool → sortable grid + chart → reload → boş-liste; running app + ARMES MCP + Supabase auth gerekir.
- **OA-5 · Stricter email-change (opsiyon)** — admin-authoritative immediate-apply yerine end-user re-verification? (regulated posture)
- **OA-6 · User-facing forgot-password** — LoginPage'e `resetPasswordForEmail(...,{redirectTo:/accept-invite})` linki.
- **OA-7 · `APP_BASE_URL`** Vercel Production env (opsiyonel — origin fallback prod'da çalışıyor).
- **OA-2/3/4 · `seedRules.ts` (Superset publish) · `backend_id:'superset'` backfill · real-ARMES confidence pass** — durum teyit.

---

## Architect-önerisi öncelik
**F-obs BLOKE** (Langfuse host, OA-8). Kod-tarafı hazır ama kanıt-gate host'a bağlı. Host beklenirken **F-obs'u bekletmeyen** iki hardening batch'lenebilir: **TD-7 (dead coverage gate)** + **TD-9 (audit-or-fail)** — ikisi de küçük, gated, F-obs'tan bağımsız ve register'daki "guard gibi görünüp guard olmayan" borcu kapatır. OA-1 (viz live) app bir sonraki açıldığında batch'lenir. TD-10 **kasıtlı olarak** F-obs2'ye park — tek seferde koherent reconcile. Öneri: OA-8 kararını iste; gelene kadar TD-7/TD-9 mini-hardening fazı yaz.
