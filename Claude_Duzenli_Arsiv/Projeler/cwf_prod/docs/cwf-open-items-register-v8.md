# CWF / EAIP — Açık İş Kaydı (Open-Items Register)
**rev 8 · 2026-07-01 · HEAD `f4bd4e0` (FIX-2 merged; invite = reset-parity magic-link; docVersion rev 14)**

v7'den farkı: **FIX-2 KAPANDI** (PR #16 → master `f4bd4e0`) — invite/credential akış bug'ı. Kök sebep: invite, magic-link üstüne INV-3A **temp-password fallback**'i bindiriyordu → unconfirmed email'de non-functional + "enter this password" UX'i → "email not confirmed" zinciri; ayrıca crossover guard dead-end'i. Fix: **2A** invite+resendInvite saf magic-link (temp-pw kaldırıldı = artık işlevsiz INV-3A band-aid'i emekliye ayrıldı; resend `resetPasswordForEmail` kullanıyor çünkü `inviteUserByEmail` mevcut user'da fail eder), **2B** crossover'a "Sign out & continue" kurtarma (setSession, snapshot token). Guard `evaluateInviteGate` **byte-unchanged** (0 deletion). Invite artık reset ile aynı tek-temiz-path. **Kritik yol değişmedi:** F-obs BLOKE (OA-8).

---

## ✅ AGREED SEQUENCE (kararlaştırılan sıra)
1. **(bitti)** PROV-3 (ölü `shared/llmGateway` fallback **silindi** — konsolide değil).
2. **(bitti — plan-dışı ama zorunlu)** Davet/credential sagası + tam User-Management yüzeyi (INV-1/2/3, SPA rewrite, user-list-from-auth, UM-1/2/3).
3. **(bitti)** Checkpoint: KB v8 + bootstrap v7 + register v4.
4. **(bitti)** Resume-doğrulama + harita-sapması düzeltmesi + kod SSOT denetimi (TD-10 bulundu).
5. **(bitti)** **HARDEN-1** (PR #14 `3408c61`) — TD-7 + TD-9 + dormant-CI trigger fix. CI canlı + yeşil.
6. **(bitti — plan-dışı bug fix)** **FIX-1** (PR #15 `bd6a992`) — power_user panel-giriş görünürlüğü (capability-gate + adaptive label + regresyon testi).
7. **(bitti — plan-dışı bug fix)** **FIX-2** (PR #16 `f4bd4e0`) — invite/credential akış: invite'ı reset ile birleştir (temp-pw kaldır) + crossover kurtarma.
8. **Sıradaki AMA BLOKE:** **PL-1 F-obs** — Langfuse host ayağa kalkınca (OA-8) unpark.

---

## 0. Bu session-line'da KAPATILANLAR (artık açık değil)
- **PROV-3** (merge `29e5dfd`; code `f95be2a`, seal `7c9ea43`) — ölü `shared/llmGateway/{index,providers,rateLimiter}.ts` **silindi** (sıfır production caller; `FALLBACK_PROVIDERS` = ikinci hardcoded model-id listesi = RULE-1 drift mayını). Tek provider yüzeyi = PROV-1 registry (silmeyle). Follow-up (`ba2846c`): dangling `vitest.config.ts` coverage-exclude'ları temizlendi.
- **Davet/credential sagası** (`b4ff3e3`) — INV-1 (Site URL + allowlist) · custom-SMTP port fix · **SPA rewrite** `vercel.json` `/((?!api/).*)→/index.html` · INV-2 (accept-invite/set-password, single-sourced `ACCEPT_INVITE_PATH`) · **user-list-from-auth.users** · INV-3 (invite temp-pw fallback + admin reset→/accept-invite + **POSITIVE crossover guard** `evaluateInviteGate` + `setPassword` server re-assert).
- **User-Management yüzeyi** (`b52faa7`) — UM-1 (audit-CHECK migration + disable/enable/confirm-email/set-temp-pw/audited-reset + anti-lockout) · UM-2 (server-computed status + badge/filters/search + user-detail drawer + per-user audit trail) · UM-3 (change-email/name + resend/revoke pending). **Her hesap operasyonu gated/audited/RBAC panelde.** İki audit-migration (`20260630190000`, `20260701120000`) **uygulandı**.
- **HARDEN-1** (PR #14 → `3408c61`; 4 commit + merge, 474 test) — **TD-7 + TD-9 + dormant-CI fix.**
  - **`747623d` fix(ci):** workflow yok olan `main`'de tetikleniyordu → hiç koşmamıştı (pre-flight'ta AG yakaladı, senin Option-3 kararın: ayrı commit). `push`+`pull_request` → `["master"]`, default-branch coupling comment'i. **CI ilk kez canlı koştu, YEŞİL.**
  - **`82db855` test(coverage) (TD-7):** 90/85 born-fail ornament → honest ratchet floor **55/58/50/58** (ölçülen 57.4/61.4/54.2/61.7'nin birkaç puan altı), `coverage.include` değişmedi (`src`+`shared`; `api/**` ayrı follow-up). Node-22 `coverage` CI job = `npm run test:coverage` (floor'u enforce eder). **RULE 22** = ratchet standing rule. Gate PR'da gerçekten enforce etti (SUCCESS = coverage ≥ floor).
  - **`41392c5` feat(admin) (TD-9):** silent swallow öldü. `UserAuditRepository.insertReporting():boolean` (non-throwing) + `auditOrAlarm` helper. 13 mutation case → `{ ok:true, audited }`; audit fail'de **secret-free** `[AUDIT-FAILURE] action=… actor=… target=…` (RULE 0 — payload/secret YOK, testte döngüyle assert ediliyor). Mutation truthful (rollback yok; iki secret op `tempPassword` döndürmeye devam). UI = kalıcı/dismissible governance banner (toast değil). **audit-or-alarm, audit-or-fail-response DEĞİL** (secret kaybı + zararlı retry riski).
  - **`c7438a7` seal (RULE 20):** Governance Model kartı redraw ("Audit every change **— or alarm**", guarantee altitude = best-effort→fail-loud), Architecture Map + Runtime Topology reseal (repo method altitude-altı), `docVersion rev 12 → rev 13`, `check:doc-drift [OK]`. 1A dosyaları (vitest.config/workflow/AGENTS) manifest'te unmapped → seal gerekmedi (glob'ları elle doğruladım).
  - **Runtime/agent path'e dokunulmadı** (`chat.ts`/gateway/knowledge/eval-gate/composers/MCP empty-diff — dosya footprint'i doğrulandı).
- **FIX-1** (PR #15 → `bd6a992`; 1 commit + merge, 474→478 test) — **power_user panel-giriş görünürlüğü bug'ı.** Sidebar `Sidebar.tsx:61` panel-link'i **stale role-literal**'da gate'liydi (`role===super_admin || role===domain_editor`); `domain_editor→power_user` rename'i güncellenmemiş → power_user (PANEL_ACCESS'i olan maker) link'i göremiyordu, oysa `/admin` route + AdminPanel onu zaten yetkilendiriyordu (tek bozuk nokta = sidebar). Fix: gate → `hasPermission(role, PANEL_ACCESS)` (AdminPanel:49 ile tek kaynak, RULE 1). Adaptive label (super_admin→"Admin" / diğer panel-holder→"Settings", display-only branch). Erişim genişlemedi (plain `user` yine göremez). **4-rol regresyon testi** `sidebar.test.tsx` (role-literal geri sızarsa kırılır — bug'ın var olma sebebi = bu testin yokluğuydu). vitest `include` `.tsx` kapsayacak şekilde genişletildi (önceden `.ts`-only; hiç .tsx test yoktu, dormant test gizlenmedi). UI-only; server/route/panel ellenmedi.

- **FIX-2** (PR #16 → `f4bd4e0`; 2 sub-fix + seal, 478→485 test, docVersion 13→14) — **invite/credential akış bug'ı.** Kök: invite `inviteUserByEmail` (magic-link, email'i link-tıklamada confirm eder) üstüne **INV-3A temp-password**'ü bindiriyordu → (a) unconfirmed email'de password-login "email not confirmed" duvarına toslar (fallback non-functional), (b) admin temp-pw'yi paylaşır → "bu şifreyi gir" UX'i → çelişen iki path, (c) crossover guard dead-end'i (buton yok). Reset (`resetPasswordForEmail`) tek temiz path olduğu için çalışıyordu. **2A** (`6b0ea20`): invite + resendInvite saf magic-link — invite `inviteUserByEmail` only, resendInvite `resetPasswordForEmail` (çünkü `inviteUserByEmail` mevcut user'da fail eder), ikisinden de temp-pw + response'tan `tempPassword` düştü; UI invite reveal modal'ı kalktı. **INV-3A band-aid'i emekli**: INV-2 set-password'ü düzeltince credential path zaten link'ti; temp-pw hem gereksiz hem non-functional hem zararlıydı. `setTempPassword` ayrı action olarak **untouched** (hâlâ mint+reveal). `email_confirm` invite'a **eklenmedi** (link confirm eder). **2B** (`e3bbd88`): crossover state'ine "Sign out & continue" (signOut → snapshot token'dan `setSession` → link user'ın oturumu → allow; token tüketilmişse honest `no-session` degrade). Guard `evaluateInviteGate` **byte-unchanged** (inviteGuard.ts = 14 insert / 0 delete; sadece additive `linkTokensFromHash`). Invite artık reset-parity. **Doğrulandı:** guard invariant korunmuş, invite pure-link, no compensating email_confirm, setTempPassword intact.

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
- **TD-8 · Force-signout / instant session-revoke** *(UM-1)* — `supabase-js`'te id-ile-revoke yok. `disable`(ban) yenilemeyi engelliyor ama access token TTL'i (~1s) dolana kadar geçerli — anında değil. Gerçek revoke: GoTrue capability / `auth.refresh_tokens` service-role SQL / Edge Function. `force_signout` CHECK'te forward-compat (butonsuz).
- **TD-11 · `deleteUser` audit-FIRST ordering** *(YENİ — HARDEN-1'de bilinçli unbundled)* — audit-or-alarm altında irreversible `deleteUser` audit'i fail ederse kullanıcı silinir + `audited:false` alarm (kayıtsız silme). Diğer op'lar için kabul edilebilir; ama silme için audit-FIRST (intent'i destructive GoTrue çağrısından ÖNCE yaz) daha güçlü. intent/outcome nüansı gerektirir → ayrı küçük hardening.
- **TD-12 · `api/**` coverage kapsamı** *(YENİ — HARDEN-1'de bilinçli kapsam-dışı)* — coverage `include`'ı `src`+`shared`; backend (governance/safety core) ölçülmüyor. Kapsamı `api/**`'a genişletmek gerçek bir coverage artışı + floor'u düşürür → ayrı, kasıtlı bir faz (TD-7'nin "ölü gate'i canlandır" işiyle karıştırılmadı).
- **TD-1 · Superset runtime empty≠zero validator (P7)** — facts-ledger hâlâ ARMES-zone-specific. Kırılgan regex YOK.
- **TD-2 · Phase D forged-label limit** — single-source self-consistent in-scope forged-label; contained, not detected (PL-6 = detection).
- **TD-5 · DOC-1 drift-guard WARN→FAIL** — bilinçli ertelendi (build-FAIL iki-commit seal'i kırar; doğru yer PR/merge katmanı).
- **TD-4/6 · küçük nit'ler:** `/api/admin/rules/[id]` `url.parse()` DEP0169 · `index.html` statik docVersion span (kozmetik) · OBS-1 clearAll match-all · Phase F pozisyonel `BACKEND_IDS[1]` · **`shell.admin` i18n çifti uyumsuz** (`tr:"Yönetişim"` / `en:"Admin"` — FIX-1'de AG flag'ledi, kapsam-dışı bırakıldı; öneri: `tr:"Yönetim" / en:"Admin"` hizala).

---

## 4. OWNER-ACTION
- **OA-9 · FIX-2B crossover live-verify** *(YENİ)* — "Sign out & continue" happy-path'i, snapshot access token'ın tıklama anında hâlâ geçerli olmasına bağlı; tüketilmiş/expired ise honest `no-session` ("admin resend etsin") degrade eder. Unit/render testleri branch-seçimi + guard-bypass-yok'u kanıtlıyor, **canlı token exchange'i değil** — gerçek Supabase oturumuyla bir kez teyit (invite → aynı tarayıcıda admin oturumu açıkken aç → Sign out & continue → set-password). Defect değil, canlı-doğrulama kalemi.
- **OA-8 · Langfuse host yerleşimi** *(YENİ — F-obs'u unblock eder)* — self-hosted Langfuse nereye kurulacak + Vercel egress'ten erişilebilir mi? Bu karar gelmeden F-obs'un kanıt-gate'i tatmin edilemez (kod yine de code-complete inebilir).
- **OA-1 · viz live acid test** *(carry-over)* — gerçek ARMES tool → sortable grid + chart → reload → boş-liste; running app + ARMES MCP + Supabase auth gerekir.
- **OA-5 · Stricter email-change (opsiyon)** — admin-authoritative immediate-apply yerine end-user re-verification? (regulated posture)
- **OA-6 · User-facing forgot-password** — LoginPage'e `resetPasswordForEmail(...,{redirectTo:/accept-invite})` linki.
- **OA-7 · `APP_BASE_URL`** Vercel Production env (opsiyonel — origin fallback prod'da çalışıyor).
- **OA-2/3/4 · `seedRules.ts` (Superset publish) · `backend_id:'superset'` backfill · real-ARMES confidence pass** — durum teyit.

---

## Architect-önerisi öncelik
**HARDEN-1 kapandı** — "guard gibi görünüp guard olmayan" iki borç (TD-7 dead coverage gate, TD-9 silent audit swallow) + bonus dormant-CI fix gitti; CI artık canlı ve yeşil. F-obs'u bekletmeyen ara-hardening tükendi. **Kritik yol artık tek şeye bağlı: OA-8 (Langfuse host yerleşimi + Vercel egress erişilebilirliği).** O karar gelene kadar F-obs kanıt-gate'i tatmin edilemez. Host beklenirken batch'lenebilecek F-obs-bağımsız işler: OA-1 (viz live acid test, app açılınca), TD-8 (force-signout — ama SDK/Edge-Function yolu netleşince ayrı faz). TD-10 **kasıtlı** F-obs2'de; TD-11/TD-12 tracked follow-up. **Öneri:** OA-8 kararını netleştir → gelince F-obs1 (code-complete, host env) yaz.
