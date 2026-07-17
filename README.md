# KEMET: THE BLACK LAND

*The desert remembers all.*

An immersive Egyptian-mythology WebGL experience — built to Awwwards Site-of-the-Month standards. A fictional pharaoh, **Nefer-Ka** — the convergence of three forbidden bloodlines (Tutankhamun's curse-blood, Akhenaten's heresy-veins, Hatshepsut's erased-heart) — buried in a valley that moves. The desert is the narrator. Scroll is descent. Time is the material.

## The Vertical Slice (this delivery)

- **THE VEIL** — arrival in darkness. "The desert is dark. Touch to awaken." The click-to-illuminate ritual fires the first 4-second twilight, speaks the Invocation, and breaks dawn over the dunes.
- **THE THRESHOLD (Akhet)** — the first realm, fully realized: breathing dune field under a five-state sky (Dawn / Noon / Dusk / Twilight / Moonlit Night), GPGPU sand (250k particles), the blank granite Obelisk with its electrum pyramidion, and the **Naming Ritual** — *"Speak your name, or let the desert name you."* First scroll commits you toward the Sealed Door: *the descent opens soon* (live Sirius heliacal-rising countdown).
- **DAY/NIGHT DUALITY** — Eye of Ra (day: carved black declarations) / Eye of Horus (night: raised gold confidences). Every text exists twice. The toggle is a held wedjat glyph; the transition is a 4-second superposition — *the sun dies in four heartbeats.*
- **THE CARVED WALL** (`/wall`) — the no-WebGL / reduced-motion fallback: a candle-lit museum wall carrying the lore verbatim. Also the accessibility mirror of the world.
- **THE COLOPHON** (`/colophon`) — the scribe's seal, the Sothic countdown, the locked Archive teaser (36 hidden eyes), the blessing: 𓋹𓍑𓋴.

## Stack

Vite 7 · React 19 + TypeScript (thin shell — the world is WebGL) · Three.js WebGL2 (GPGPU particles, custom sky/terrain shaders, FBO transitions) · GSAP 3 + ScrollSmoother/ScrollTrigger · raw Web Audio API (procedural wind, 42/60Hz Hum, convolution space) · Tailwind CSS v3 · device tiers 0–3 with adaptive resolution.

## Docs

- `docs/lore/` — the complete mythology (9 layers, ~144k chars), in five parts:
  - `01-prologue-time-bloodlines.md` — Prologue · Neheh/Djet · the three wounds
  - `02-conception-construction.md` — the Sothic birth · the Valley That Moves · the five chambers
  - `03-prophecy-realms-threshold-dynasty.md` — the Threefold Return · Realm I (Threshold) · Realm II (Dynasty)
  - `04-realms-chamber-weighing-eternal.md` — Realm III (Chamber) · Realm IV (Weighing) · Realm V (Eternal)
  - `05-loop-two-eyes-invocation.md` — the Infinite Loop · the Two Eyes · the Invocation
- `docs/KEMET_TECH.md` — the full technical architecture (all 5 realms, build specs, budgets).
- `docs/design.md` — the global design document (palettes, type, motion, chrome, restraint pass).

## Asset note

Raster/audio assets in `public/` (textures, ambience) were AI-generated during the build and are excluded from this mirror; their generation prompts live in the asset manifest of `docs/design.md` (§15). The site renders procedurally without them at reduced fidelity.

## Source note

The full `src/` tree (engine + world + chrome + pages) is maintained in the delivery workspace and will be mirrored here once git credentials are available to the build environment; this mirror carries the project's documents and configuration.

## Run

```bash
npm install
npm run dev    # develop
npm run build  # production build (dist/)
```

Tier 0 devices (no WebGL2 / reduced-motion) are routed to The Carved Wall automatically.

---

*Ankh, wedja, seneb.* 𓋹𓍑𓋴
