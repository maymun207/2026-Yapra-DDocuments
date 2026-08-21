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

**Aesthetic:** industrial-precise, dark, cinematic. The factory at night. This is a security-grade, engineering-credible brand — restraint and precision, not maximalist clutter. Elegance comes from execution: spacing, timing, and one unforgettable mechanic (the rising particle).

- **Do NOT use** Inter, Roboto, Arial, system-ui, Space Grotesk, or purple-gradient-on-white. Those are banned.
- **Typography:** pair a distinctive technical/grotesque display face for headlines with a clean, legible body face. Use a true monospace for data labels, sensor values, and the layer index (e.g. `L01 / PILAROS`). Define all three as CSS variables.
- **Color:** near-black base. Each of the 5 layers gets ONE accent that the particle adopts as it enters that layer, so color itself narrates altitude. Suggested progression cool→warm as you rise (deep slate → cyan/teal at the edge → electric blue at execution → violet-white at cognition → warm signal-amber at the human layer). Sharp accents on a dominant dark field — no timid evenly-spread palette.
- **Texture/atmosphere:** subtle film grain overlay, faint engineered grid, volumetric glow around the particle. Depth, not flat fills.
- **Motion philosophy:** high-impact, choreographed, restrained. Scroll drives everything. Honor the two framework concepts: the **Digital Mycelium** (glowing root-network beneath the edge layer) and the **Operational Ensō** (the circle that closes at the end when the human's question reaches the machine and returns).

---

## NARRATIVE — 6 ACTS (the particle's ascent)

Build these as sequential pinned/sticky scenes. The particle visual persists across all of them and transforms; narrative text scrolls past it.

| Act | Layer | The beat | Particle state |
|---|---|---|---|
| 0 | **Hero** | "From a machine's first signal to the words in your hand." Scroll cue. | A single dim pulse on a dark machine |
| 1 | **PilarOS** — bedrock | Secure industrial OS on gateways, signage, tablets. Nothing runs without trustworthy ground. | Particle sits on a forming "floor"; trust/shield motif |
| 2 | **IoT-Ignite + Modiverse** — roots / mycelium | Edge gateway collects from sensors & machinery; Modiverse manages the fleet remotely. | Particle is BORN at a sensor, travels glowing mycelium lines to the gateway; fleet view above |
| 3 | **ArMES** — nervous system | Processed data drives real operational execution on the floor. | Particle becomes an action / work order; the line responds |
| 4 | **ArAI** — the brain | Cognitive layer analyzes everything; patterns emerge; insight crystallizes. | Particle joins a constellation/neural field; an insight forms |
| 5 | **CWF — Chat With Your Factory** — the voice | Operator to owner asks in plain language; the answer is drawn from every layer below. | A chat bubble; visible threads pull down through all layers — **Ensō closes** |
| 6 | **Close / CTA** | Full stack revealed at once; the complete circle. Call to action. | All layers lit; ring completes |

A persistent **stack spine** (thin vertical rail on the screen edge) shows current layer with the mono index, lighting up segment-by-segment as the user ascends.

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
- Add the grain/grid background layer and CSS variables for the 3 fonts + 5 layer accents.
- **Verify:** route resolves (paste dev-server log line), `cat` the provider + tokens files, build passes. Show `prefers-reduced-motion` path renders (note how you tested).

### Phase 2 — Stack spine + global scroll progress
- Build the persistent vertical spine with mono layer indices and a `useScroll` progress driver; segments light per scroll range.
- **Verify:** `cat` the component; describe the scroll ranges mapped to each act. Build passes.

### Phase 3 — Hero (Act 0)
- Full-bleed dark scene, single particle pulse, headline + scroll cue with a staggered load reveal.
- **Verify:** `cat` hero; build passes; reduced-motion fallback shown.

### Phase 4 — The R3F particle + Acts 1–2
- Stand up the persistent R3F canvas (lazy-loaded, `Suspense`, low-power friendly). Implement the particle and the PilarOS "floor" + the IoT-Ignite/Modiverse mycelium birth-and-travel. Particle adopts the layer accent on entry.
- **Verify:** `cat` the canvas + both act components; confirm canvas is dynamically imported (`ssr:false`); build passes. Report bundle impact.

### Phase 5 — Acts 3–5 (ArMES, ArAI, CWF + Ensō)
- Execution beat, cognition constellation, then CWF chat bubble with the threads pulling down through prior layers and the Ensō ring closing.
- **Verify:** `cat` all three act components; build passes; confirm the Ensō close triggers at the correct scroll range.

### Phase 6 — Act 6 close, mobile scrollytelling, a11y
- CTA scene. Re-author the mobile experience separately: full-bleed visual with scroll-triggered text cards (do not just shrink the desktop split layout). Full keyboard focus order, alt/aria for the canvas (decorative + a text summary of each layer), color-contrast pass.
- **Verify:** describe mobile breakpoint behavior; paste a11y checks; build passes.

### Phase 7 — Performance + final gate
- Lazy-load WebGL, ensure fast first paint, cap particle count, pause R3F render loop when canvas off-screen, respect reduced-motion everywhere.
- **Verify:** production `build` output (paste), route bundle size, and a short manual QA checklist (scroll up/down, resize, reduced-motion, mobile cards, no console errors).
- Open a PR on `feat/scroll-story` with a description summarizing each act. Do **not** deploy.

---

## DEFINITION OF DONE
- One continuous scroll, 6 acts, persistent transforming particle, lit stack spine.
- Distinct desktop (sticky split) and mobile (stacked cards) experiences.
- `prefers-reduced-motion` yields a complete static narrative.
- Clean production build, no console errors, PR opened. No `.env*` touched. No raw secrets anywhere.
