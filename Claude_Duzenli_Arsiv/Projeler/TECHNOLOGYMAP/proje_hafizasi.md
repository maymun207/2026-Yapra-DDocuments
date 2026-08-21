# 🧠 Proje Hafızası: TECHNOLOGYMAP

**Proje ID:** `019ba8b5-1e98-75b3-a493-1cc9d09d4d67`

---

**Purpose & context**

Maymun works on the **ARDICTECH** platform — an AIoT (Artificial Intelligence of Things) industrial technology stack. The core mission is communicating how the full product stack connects, with a current focus on a scroll-storytelling ("scrollytelling") web experience that narrates the data journey from factory floor to human-readable insight.

The ARDICTECH product stack includes:
- **IoT-Ignite Edge Gateway** — collects and processes machinery/sensor data; PilarOS runs *inside* the gateway (not as a standalone product)
- **PilarOS** — secure industrial OS for edge gateways, digital signage, and factory-floor tablets
- **Modiverse** — remote device management (specifically for edge gateways, digital signage, and factory-floor tablets) within the IoT-Ignite platform; *not* generic fleet management
- **ArMES** — operational execution layer
- **ArAI** — cognitive/AI layer backed by ClickHouse, MinIO, Apache Iceberg, MongoDB, and MariaDB
- **CWF ("Chat With Your Factory")** — conversational UI accessible to all employee levels and owners

Two brand frameworks guide the narrative:
- **Digital Mycelium** — the edge network as interconnected roots beneath everything (reframed from organic to PCB/blueprint aesthetic for white theme)
- **Operational Ensō** — closed-loop continuous-improvement motif where a human question descends to the machine and returns as an answer

The scrollytelling page targets **ardic.ai**, which has a **white/light background** — the aesthetic must reflect a white industrial theme, not the originally proposed dark "night factory" look.

---

**Current state**

The primary active artifact is **`AG_PROMPT_ardictech_scrollytelling_v2.md`** — a revised autonomous-agent brief for a Claude-powered "AntiGravity" (AG) environment. It targets a `feat/scroll-story` branch/PR workflow and includes gated phases, terminal proof-of-work gates, a `BLOCKED` failure protocol, and strict `.env*` file access prohibition.

A session bootstrap file, **`ARDICTECH_ScrollStory_Bootstrap.md`**, was also created to prime future sessions with full project state using shorthand notation, a domain dictionary, critical decisions log, hard constraints, and open blockers.

Three items remain unfilled and **block the AG run**:
1. Repo absolute path
2. Final route for the scroll-story page
3. Existing R3F/Three.js version pins from the digital-twin demo

Maymun has also been managing **custom instruction sets** for the ARDICTECH project within Claude.ai, including archiving and local backup of those instructions.

---

**Key learnings & principles**

- PilarOS must always be positioned as running *inside* the IoT-Ignite Edge Gateway — not as a separate product
- Modiverse's specificity matters: it manages exactly three device types and should not be described generically
- The data journey narrative must be physically grounded — originating *inside* the factory structure and the gateway hardware
- The white/light theme requires a full redesign of visual metaphors (PCB/blueprint aesthetic replaces organic dark imagery)

---

**Approach & patterns**

- Works in Turkish in conversations with Claude; technical artifacts and prompts are written in English
- Uses an **AntiGravity (AG) autonomous Claude environment** for implementation tasks — Claude authors structured agent prompts rather than directly building prototypes
- Uses **`CompressSessionv1`** (a context-compression protocol) to produce dense bootstrap documents for continuity across sessions
- Prefers production-grade, structured prompts with explicit failure modes (`BLOCKED` protocol), phase gating, and proof-of-work checkpoints

---

**Tools & resources**

- **Frontend stack**: React Three Fiber (R3F), Lenis smooth scroll, Framer Motion, Bootstrap
- **Banned aesthetics**: Inter, Roboto, Arial, system-ui, Space Grotesk, purple-gradient-on-white
- **Data layer**: ClickHouse, MinIO, Apache Iceberg, MongoDB, MariaDB
- **Deployment/preview**: Vercel preview deploys or ngrok for sharing local dev environments (localhost not accessible to Claude)
- **Claude.ai project files**: `AG_PROMPT_ardictech_scrollytelling_v2.md`, `ARDICTECH_ScrollStory_Bootstrap.md`
