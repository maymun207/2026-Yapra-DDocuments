# AntiGravity Implementation Prompt — ARDICTECH "Signal to Sentence" Scroll Story

> **Run with:** Claude Opus 4.6 (Extended Thinking ON) in AntiGravity, autonomous mode.
> **Paste everything below the line into AG as a single mission.** Fill the three `<<FILL>>` placeholders first.

---

## MISSION

You are a senior frontend engineer + motion designer. Build a single, production-grade scroll-storytelling page that explains the ARDICTECH AIoT stack as one continuous vertical ascent: a single data particle is born at a machine on the factory floor and rises through every layer until it becomes a sentence a human reads in CWF. This is **not** a feature grid. It is one narrative with a protagonist (the particle) and a destination (a human answer).

**Repo:** `<<FILL: absolute path to the ardic.ai Next.js repo>>`
**Route to create:** `<<FILL: e.g. /platform/story or /stack>>`
**Branch:** create `feat/scroll-story` off the current default branch. Never commit to default directly.

## STACK (use exactly — do not substitute)

- Next.js 15 (App Router) + TypeScript + Tailwind
- Smooth scroll: **Lenis** (`lenis` / `@studio-freight/lenis`)
- Motion: **Framer Motion** (`useScroll`, `useTransform`, `useSpring`) for layer transitions
- 3D particle visual: **React Three Fiber + drei** (reuse the same R3F setup as the digital-twin demo — match versions in package.json, do not upgrade React/Three)
- Deploy target: Vercel (do not run deploy in this session; build only)

## HARD RULES (violating any = BLOCKED, stop and report)

1. **Never** create, read, edit, or print the contents of any `.env*` file. If a value is needed, reference it as `$VAR_NAME` and assume it exists in the environment.
2. If any real secret/token/key appears in your output or in a file, STOP, label it `SECURITY INCIDENT`, and instruct rotation. Never paste a raw secret into shell or code.
3. Use the exact resource identifiers given above. Never invent repo paths, routes, project refs, or package versions. If something is missing, STOP and ask.
4. **Gated phases.** Do each phase in order. At the end of every phase, run the listed verification and paste the **literal terminal output** (`cat`, build logs, etc.) as proof-of-work. No summarizing — show the real output.
5. **Cross-phase verification.** At the start of each phase, independently re-verify the prior phase's claims (file exists, builds, route resolves) before relying on them. If a prior claim is false, mark `BLOCKED — prior phase regressed` and stop.
6. On any failure use the word **`BLOCKED`** plus the exact error. Do not improvise workarounds that change scope. Do not mark a phase complete on a failing build.
7. No new heavy dependencies beyond those listed without flagging first.

---

## DESIGN DIRECTION (commit to this — avoid generic AI aesthetics)

**Aesthetic:** industrial-precise, white, architectural. The smart factory in precision daylight. This page lives inside a white-background website — it must feel native to that context, not like a dark insert. Engineering credibility comes from restraint, geometric precision, and one unforgettable mechanic (the rising particle). Think Keyshot product render meets industrial blueprint.

- **Do NOT use** Inter, Roboto, Arial, system-ui, Space Grotesk, or purple-gradient-on-white. Those are banned.
- **Typography:** pair a distinctive technical/grotesque display face for headlines with a clean, legible body face. Use a true monospace for data labels, sensor values, and the layer index (e.g. `L01 / PILAROS`). Define all three as CSS variables.
- **Color:** white/off-white base (`#F8F8F6`). Each of the 5 layers gets ONE accent — more saturated than a dark-theme palette because they must pop against white, not glow out of darkness. Progression cool→warm as you rise: steel gray (structural bedrock) → cyan/teal (edge data) → electric blue (execution) → violet (cognition) → warm signal-amber (human). The particle adopts the active layer's accent as it enters, so color itself narrates altitude.
- **Texture/atmosphere:** very subtle blueprint grid overlay (0.03 opacity, 24px cell, the accent color of the active layer). Crisp elevation shadows for depth layering — no flat fills, but no dark fields either. Precision data-trace highlights around the particle (thin colored ring, not volumetric glow). Depth through shadow and layering, not darkness.
- **Motion philosophy:** high-impact, choreographed, restrained. Scroll drives everything. Honor the two framework concepts: the **Digital Mycelium** (reframed for white theme — precision circuit-board/PCB blueprint lines connecting sensors to gateways, geometric not organic) and the **Operational Ensō** (the circle that closes at the end when the human's question reaches the machine and returns).

---

## NARRATIVE — 6 ACTS (the particle's ascent)

Build these as sequential pinned/sticky scenes. The particle visual persists across all of them and transforms; narrative text scrolls past it.

> **Spatial logic:** The data's origin lives physically inside the factory structure. The R3F scene begins as a 3D factory floor and the camera rises through metaphorical layers as the user scrolls. The particle never floats in an abstract void — it always starts anchored to a real industrial object.

| Act | Layer | The beat | Particle state | Visual |
|---|---|---|---|---|
| 0 | **Hero** | "From a machine's first signal to the words in your hand." Scroll cue. | A sensor pulse begins on a machine | R3F: 3D white industrial factory floor, isometric camera. Clean steel-gray geometry: CNC machines, press lines, welding stations. A wall-mounted IoT-Ignite Edge Gateway visible on the factory wall. One sensor blinks on a CNC. |
| 1 | **PilarOS inside IoT-Ignite Edge Gateway** — bedrock | Secure industrial OS running inside every gateway, digital signage, and tablet on the floor. Nothing runs without trustworthy ground. | Particle travels from sensor to the gateway device; rests on the secure OS layer inside | Camera moves to the wall-mounted IoT-Ignite Edge Gateway. A **technical cutaway (X-ray reveal)** opens the device: PilarOS is the OS layer running at its core — visualized as a trust foundation (shield/lock motif, steel-gray accent). Particle settles here. Text: "The bedrock: a hardened industrial OS, invisible until the moment it matters." |
| 2 | **IoT-Ignite + Modiverse** — the network | Edge gateway collects from all sensors and machinery. Modiverse remotely manages every gateway, digital signage, and factory-floor tablet from a single interface. | Particle is BORN at the sensor, travels precision circuit lines to the gateway | Camera pulls back to the full factory floor. **PCB-blueprint overlay:** precise cyan/teal geometric lines connect every sensor node and machine to the central gateway — engineering diagram aesthetic, not organic. Modiverse management panel appears: three device columns — Edge Gateways, Digital Signages, Factory Tablets — all reporting live status from a single remote interface. |
| 3 | **ArMES** — nervous system | Processed data drives real operational execution on the floor. | Particle becomes a work order; the production line responds | Camera rises from floor level. Gantt charts, shift schedules, quality checkpoints materialize. The particle is now a work order card (`#WO-2241`). A production line indicator shifts state. Electric blue accent. |
| 4 | **ArAI** — the brain | Cognitive layer analyzes everything; patterns emerge; insight crystallizes. Backed by: ClickHouse (hot OLAP) + Apache Iceberg + MinIO (warm/cold) + MongoDB (embeddings) + MariaDB (OLTP). | Particle joins a constellation; an anomaly crystallizes | Camera clears the factory ceiling — data space. Neural constellation on white: connected nodes, weighted lines. Data lake architecture node labels appear (ClickHouse, Iceberg, MinIO). The particle joins; a pattern ignites. Violet accent. |
| 5 | **CWF — Chat With Your Factory** — the voice | Operator to owner asks in plain language; the answer is drawn from every layer below. | Chat bubble; visible amber threads pull down through all layers — **Ensō closes** | Chat interface at top. A question: "Why did production drop 15% today?" Answer assembles. Amber thread-lines visibly descend through all prior layer zones. The Ensō ring closes — the signal that left a sensor floor is now a sentence in a human's hand. |
| 6 | **Close / CTA** | Full stack revealed at once; the complete circle. Call to action. | All 5 layer accents lit simultaneously; ring complete | Stack diagram: all layers shown as a clean white architecture card. Ensō complete. CTA button. |

A persistent **stack spine** (thin vertical rail on the left screen edge) shows the current layer with the mono index (`L00`–`L05`), lighting up segment-by-segment as the user ascends. Spine color transitions with the active accent.

---

## PHASES

### Phase 0 — Recon & setup
- `cat package.json` (show framework + R3F/Framer/Lenis presence). Print Node version.
- Confirm the route directory does not already exist.
- Install only missing deps from the stack list (pin to versions compatible with the existing React/Three).
- **Verify:** `cat package.json` (deps section) + clean `npm run build` (or pnpm) baseline before any new code.
- Proof-of-work: paste literal outputs. If build is already red, `BLOCKED`.

### Phase 1 — Scaffold + scroll engine
- Create the route, a page-level layout, a `<SmoothScroll>` Lenis provider, and a `useReducedMotion` guard that disables Lenis + heavy motion and renders a static stacked narrative fallback.
- Add the **blueprint grid** background layer (CSS `background-image: repeating-linear-gradient`, 24px cell, dynamically colored to the active layer accent at 0.03 opacity — transition on layer change).
- Define CSS variables:
  - 3 fonts: `--font-display`, `--font-body`, `--font-mono`
  - Base: `--color-base: #F8F8F6`
  - 5 layer accents: `--accent-l01` (steel gray `#6B7280`) / `--accent-l02` (cyan-teal `#0D9488`) / `--accent-l03` (electric blue `#2563EB`) / `--accent-l04` (violet `#7C3AED`) / `--accent-l05` (amber `#D97706`)
  - Active accent: `--accent-active` (updated per scroll position)
- **Verify:** route resolves (paste dev-server log line), `cat` the provider + tokens files, build passes. Show `prefers-reduced-motion` path renders (note how you tested).

### Phase 2 — Stack spine + global scroll progress
- Build the persistent vertical spine with mono layer indices (`L00`–`L05`) and a `useScroll` progress driver; segments light up per scroll range using `--accent-active`.
- **Verify:** `cat` the component; describe the scroll ranges mapped to each act. Build passes.

### Phase 3 — Hero (Act 0)
- Full-bleed **white** scene. R3F factory floor at rest: isometric-ish camera, white/steel-gray geometry, machines and one blinking sensor. Headline + scroll cue with staggered load reveal. The wall-mounted IoT Gateway device is visible in the scene — it will be the camera target in Act 1.
- **Verify:** `cat` hero; build passes; reduced-motion fallback shown.

### Phase 4 — The R3F particle + Acts 1–2
- Stand up the persistent R3F canvas (lazy-loaded, `Suspense`, low-power friendly).
- **Act 1:** Camera animates from factory floor overview to the wall-mounted gateway. A cutaway shader or animated reveal exposes PilarOS as an inner layer inside the device. Particle travels from sensor and rests on the PilarOS foundation. Steel-gray accent. Trust/shield motif (simple geometric: hexagon or clean shield shape — no illustrative icons).
- **Act 2:** Camera pulls back to the full floor. PCB-blueprint lines animate in between all sensor nodes and the gateway — geometric, straight or right-angle routed, not organic curves. Cyan/teal accent. Modiverse panel slides in (2D overlay on the 3D scene): three columns — Edge Gateways / Digital Signages / Factory Tablets — each showing connected device count and live status. Particle travels the blueprint line from sensor to gateway.
- Particle adopts the layer accent on entry.
- **Verify:** `cat` the canvas + both act components; confirm canvas is dynamically imported (`ssr:false`); build passes. Report bundle impact.

### Phase 5 — Acts 3–5 (ArMES, ArAI, CWF + Ensō)
- Execution beat (work order card, Gantt, production line state change), cognition constellation (neural field on white, data lake node labels), then CWF chat bubble with amber threads pulling down through prior layer zones and the Ensō ring closing.
- **Verify:** `cat` all three act components; build passes; confirm the Ensō close triggers at the correct scroll range.

### Phase 6 — Act 6 close, mobile scrollytelling, a11y
- CTA scene. Re-author the mobile experience separately: full-bleed visual with scroll-triggered text cards (do not just shrink the desktop split layout). Full keyboard focus order, alt/aria for the canvas (decorative + a text summary of each layer), color-contrast pass (all text against `#F8F8F6` base must meet WCAG AA).
- **Verify:** describe mobile breakpoint behavior; paste a11y checks; build passes.

### Phase 7 — Performance + final gate
- Lazy-load WebGL, ensure fast first paint, cap particle count, pause R3F render loop when canvas off-screen, respect reduced-motion everywhere.
- **Verify:** production `build` output (paste), route bundle size, and a short manual QA checklist (scroll up/down, resize, reduced-motion, mobile cards, no console errors).
- Open a PR on `feat/scroll-story` with a description summarizing each act. Do **not** deploy.

---

## DEFINITION OF DONE
- One continuous scroll, 6 acts, persistent transforming particle, lit stack spine.
- White/off-white base throughout — no dark-mode sections, no black inserts. The page must feel native to a white-background site.
- Act 1 cutaway makes clear that PilarOS is the OS *inside* the IoT-Ignite Edge Gateway device — not a separate product.
- Act 2 Modiverse panel shows all three managed device types: Edge Gateways, Digital Signages, Factory-floor Tablets.
- Distinct desktop (sticky split) and mobile (stacked cards) experiences.
- `prefers-reduced-motion` yields a complete static narrative.
- Clean production build, no console errors, PR opened. No `.env*` touched. No raw secrets anywhere.
