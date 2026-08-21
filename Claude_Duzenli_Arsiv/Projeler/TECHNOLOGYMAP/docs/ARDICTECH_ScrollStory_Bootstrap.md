# CONTEXT BOOTSTRAP — ARDICTECH Scroll-Story Page

`→` leads to | `⇒` results in | `↔` bidirectional | `vs` comparison | `w/` with | `w/o` without | `>>` much greater | `≈` approx | `[A]:[B]` path | `{x,y}` set | `*` critical/blocker

---

### 0. NEXT-SESSION LOADER PRIMER
Assume role: senior frontend designer + motion engineer for ARDICTECH. This doc is compressed project state for a scroll-storytelling marketing page; read top-to-bottom, treat §5 as hard rules, resume at §7. Do not re-expand unless asked.

### 1. CORE SEED & STATE
- **Objective:** Single scroll-storytelling web page explaining the ARDICTECH AIoT stack as one narrative ("signal → sentence").
- **Current State:** Design direction locked; AntiGravity (AG) implementation prompt authored + delivered. No code written yet. Page not built.
- **Operational Env:** Next.js 15 App Router, TypeScript, Tailwind; deploy target Vercel. AG = autonomous coding agent, run w/ Claude Opus 4.6 extended-thinking.
- **Identifiers (verbatim):**
  - AG prompt file: `AG_PROMPT_ardictech_scrollytelling.md`
  - Bootstrap (this doc): `ARDICTECH_ScrollStory_Bootstrap.md`
  - Branch: `feat/scroll-story` (off current default)
  - Route: `<<UNFILLED — /platform/story or /stack>>` *
  - Repo path: `<<UNFILLED>>` *

### 2. TECH STACK & ARCHITECTURAL MAPPING
**Page build stack (do not substitute):**
| Concern | Choice | Note |
|---|---|---|
| Framework | Next.js 15 App Router + TS + Tailwind | existing repo |
| Smooth scroll | Lenis | `lenis` / `@studio-freight/lenis` |
| Motion | Framer Motion | `useScroll`/`useTransform`/`useSpring` |
| Heavy timeline | GSAP ScrollTrigger | only if needed, else skip |
| 3D particle | React Three Fiber + drei | *reuse digital-twin demo setup; pin to existing React/Three versions, NO upgrade |
| Deploy | Vercel | build only this session, no deploy |

**Product data flow (the narrative spine):**
sensors/machinery → IoT-Ignite (edge gateway, runs on PilarOS devices; Modiverse = fleet mgmt) → ArMES (execution) ↔ Kale ERP → ArAI (cognition/lakehouse) → CWF (conversational answer). Ensō closes: CWF question descends to machine ⇒ returns as answer.

**ArAI backing (lakehouse, for accuracy of cognition layer):** ClickHouse (hot OLAP) + MinIO + Apache Iceberg (warm/cold) + MongoDB (docs/embeddings) + MariaDB (OLTP/master).

### 3. DOMAIN DICTIONARY
- `PilarOS`: secure industrial OS for edge gateways, digital signage, factory-floor tablets. = bedrock layer.
- `Modiverse`: remote device/fleet management; part of IoT-Ignite platform.
- `IoT-Ignite`: edge gateway; collects + processes machinery/sensor data → ArMES.
- `ArMES`: MES/MOM; operational execution on factory floor.
- `ArAI`: cognitive/AI layer ("the brain"); analyzes data, patterns, prediction.
- `CWF`: "Chat With your Factory" — conversational UI for all employee levels + owners.
- `Operational Ensō`: closed-loop / continuous-improvement brand framework → "circle closes" motif at end.
- `Digital Mycelium`: "network beneath" brand framework → maps to edge/IoT glowing root-network visual.

### 4. CRITICAL DECISIONS & RATIONALES
- Narrative = single data-particle ascent through 6 acts, "signal → sentence" → gives protagonist + destination (rejected: feature grid — no narrative pull).
- Deliverable = AG implementation prompt (rejected: Claude builds prototype artifact directly — user chose AG handoff to team).
- Motion default = Lenis + Framer Motion; GSAP only for heavy choreography → stays React-idiomatic.
- R3F reused from existing digital-twin demo → consistency + avoid version churn.
- Desktop = sticky split (visual one side, narrative scrolls past); mobile = re-authored full-bleed visual + scroll-trigger text cards (rejected: shrinking desktop split — breaks on mobile).
- Aesthetic = dark, industrial-precise, cinematic, restraint > maximalism. Per-layer accent narrates altitude: deep slate → cyan/teal → electric blue → violet-white → signal-amber.

### 5. CONSTRAINTS & INVARIANTS *
- NEVER read/edit/print any `.env*`. Secrets referenced only as `$VAR_NAME`. Raw secret surfaced ⇒ label `SECURITY INCIDENT` + instruct rotation.
- Gated phases: each phase ends w/ literal terminal output (`cat`, build logs) as proof-of-work, no summarizing. Re-verify prior phase at start of next. Failure ⇒ word `BLOCKED` + exact error.
- Exact identifiers only; never invent repo paths/routes/versions/project refs.
- `prefers-reduced-motion` ⇒ disable Lenis + heavy motion, render full static narrative fallback (a11y non-negotiable).
- Branch off default; PR only; NO deploy this session. No new heavy deps w/o flagging.
- Banned aesthetics: Inter, Roboto, Arial, system-ui, Space Grotesk, purple-gradient-on-white. Use distinctive display + clean body + true monospace (3 CSS vars).

### 6. BLOCKED POINTS / TECH DEBT
- *3 unfilled placeholders block AG run: repo path, route, digital-twin R3F/Three version pins.
- Brand typeface unresolved: if ARDICTECH brand system mandates a face, must override banned-font line.
- Bilingual EN/TR: ARDICTECH ships TR+EN elsewhere; unconfirmed whether this page needs i18n in v1.

### 7. IMMEDIATE NEXT STEPS (SEQUENTIAL)
1. Fill `<<repo path>>` + `<<route>>` + confirm digital-twin R3F/Three versions → AG prompt runnable.
2. Run `AG_PROMPT_ardictech_scrollytelling.md` (Opus 4.6, extended-thinking, autonomous) → success = PR on `feat/scroll-story`, clean prod build, no console errors.
3. Review PR: verify 6 acts, persistent transforming particle, lit stack spine, reduced-motion static path, mobile cards.
4. (optional) Supply locked brand typeface → override font ban before run.

### 8. OPEN QUESTIONS FOR USER
- Final route path: `/platform/story`, `/stack`, other?
- Locked brand display / body / mono typefaces?
- EN/TR bilingual required in v1, or English-first then localize?

### 9. NOTE
Do not expand or re-explain this compressed doc unless asked.
