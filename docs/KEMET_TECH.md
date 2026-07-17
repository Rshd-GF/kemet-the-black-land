# KEMET: THE BLACK LAND
## THE TECHNICAL ARCHITECTURE
### Engineering the Eternal Cycle — A Build Specification for an Awwwards SOTM-Worthy Immersive Experience

> *This document is the body. KEMET_LORE.md is the soul. Read the lore first — every technical decision below is a load-bearing translation of a mythological one. The corridor descends toward the sky; the build must too.*

---

## 0. NORTH STAR PRINCIPLES

1. **The site is the world; the world is the interface.** (Montfort doctrine.) There is no "page with a 3D background." There is a continuous WebGL environment that the DOM occasionally annotates.
2. **Scroll is descent; descent is theology.** Scrolling down moves the camera *through* space — surface → valley → tomb → judgment → stars. The camera never teleports within a realm; it travels.
3. **Every interaction disturbs the desert.** Cursor, scroll velocity, hover, click, idle time — all are inputs to the particle field. The user is a wind.
4. **Two eyes, one world.** Day (Eye of Ra) and Night (Eye of Horus) are not themes. They are two complete render states of the same scene, joined by a 4-second twilight superposition.
5. **The loop is the floor plan.** Completing the Eternal returns the user to a *transformed* Threshold, with state carried forward. No hard reset, ever.
6. **60fps is a sacred obligation.** A dropped frame in a tomb is a crack in a temple. Budgets below are non-negotiable.

---

## 1. STACK

| Layer | Choice | Why |
|---|---|---|
| 3D engine | **Three.js** (r165+) with **WebGL2** | True real-time 3D (per the brief: "I want a true WebGL") |
| Build | **Vite** + ES modules, code-split per realm | Fast HMR; realm-level lazy chunks |
| Animation | **GSAP 3 + ScrollSmoother + ScrollTrigger** | The scroll choreography backbone (see §6) |
| Typography | **MSDF/SDF text** via `troika-three-text` (or custom MSDF pipeline) | Crisp glyph rendering at any scale + shader-driven glyph effects (Igloo doctrine) |
| GPGPU | Ping-pong `WebGLRenderTarget` float textures for particle simulation | Sand/soul/star particles in the millions, zero CPU per-frame cost |
| Post-processing | Custom `EffectComposer` chain: UnrealBloom, DOF (Bokeh), chromatic aberration, film grain, vignette | The "reality fracture" transitions + tomb atmosphere |
| Audio | **Web Audio API** (native): `AudioContext`, `PannerNode` (HRTF), `ConvolverNode`, `GainNode` buses | Full spatial control, generative layers, no heavy libs |
| Assets | **KTX2/Basis** compressed textures, **Draco/meshopt** compressed geometry, glTF 2.0 | Budget-compliant streaming |
| State | Single `KemetStore` (plain object + event emitter; or Zustand if React shell) | Realm, loop count, day/night, user "threshold name", journey log |
| Shell | Vanilla TS or thin React shell — DOM used ONLY for: loading veil, a11y fallbacks, nav glyphs, captions | WebGL UI is primary (Corn Revolution doctrine) |

---

## 2. APPLICATION ARCHITECTURE

### 2.1 Realm State Machine

```
VEIL (loading / click-to-illuminate)
  → THRESHOLD (Akhet)   — free-roam → scroll commit
  → DYNASTY   (Waset)   — pinned chapters
  → CHAMBER   (Djed)    — layered descent, snap-lite
  → WEIGHING  (Ma'at)   — hard snap-block, 4 locks
  → ETERNAL   (Sah)     — free drift, slow scroll
  → LOOP HANDOFF → THRESHOLD (transformed) — cycle++
```

A central `RealmManager` owns transitions. Each realm is a **self-contained module** implementing:

```ts
interface Realm {
  id: RealmId;
  load(): Promise<void>;         // stream assets (KTX2/Draco)
  build(scene: THREE.Scene): void;
  enter(from: RealmId, dir: 1 | -1): GSAPTimeline;  // camera-fly in
  exit(to: RealmId, dir: 1 | -1): GSAPTimeline;     // camera-fly out
  update(dt: number, t: number): void;
  setDayNight(mix: number): void; // 0 = Ra (day), 1 = Horus (night)
  dispose(): void;                // hard GPU cleanup
}
```

Only **three realms are resident at once**: current, previous (exiting), next (pre-loading). Everything else is disposed. This is how GPU memory stays inside budget on mobile.

### 2.2 Scene Graph (persistent root)

```
SceneRoot
├── GlobalRig (camera + ScrollSmoother-driven dolly)
│   └── TorchRig (spotlight parented to camera in Chamber)
├── SkyDome (single shared shader: day/night/twilight uniform)
├── ParticleField_Global (dust motes; realm fields attach beneath)
├── GlyphLayer (MSDF text, world-space)
├── PostFX (composer)
└── [Realm containers attach/detach here]
```

One `WebGLRenderer`, one canvas, one `requestAnimationFrame` loop with fixed-timestep simulation and decoupled render. Never more than one canvas — multiple canvases kill mobile GPUs.

### 2.3 The Journey Log

Every meaningful user action is appended to `store.journey`: timestamps, dwell time per chamber, scroll velocity profile, day/night toggles, hover-discovered glyphs, idle moments. This log is **not analytics** — it is *lore input*. It feeds:
- the **threshold name** generated for the obelisk (§9.2),
- the **mirage content** on loop return (§9.3),
- audio intensity (dwell = reverence = sparser sound).

---

## 3. THE 11-SITE COMPONENT LIBRARY → REALM MAP

Sources: **MF**=Montfort, **HT**=Hubtown, **US**=Unseen Studio 2025, **SH**=Shopify Winter '26, **CS**=Convex Seascape, **AT**=Active Theory, **II**=Igloo Inc, **A7**=Aten7, **CR**=Corn Revolution (RESN), **GA**=The Game Awards (Dreamwave), **AI**=Artisans d'Idées.

### 3.1 REALM I — THE THRESHOLD (Akhet) — *"Before you descend, the desert must know your name."*

| Component | Src | Implementation |
|---|---|---|
| Click-to-illuminate loading | AI | The VEIL: black screen, single line — *"The desert is dark. Touch to awaken."* Pointer event triggers the 4-second twilight shader (first taste of it) → dawn breaks over dunes. This *is* the Invocation from Layer IX. |
| Real-time intro animation | II | Prologue rendered in-engine (no video): camera rises from under the sand through grains to the surface while *"The desert remembers all"* decodes from hieroglyph scramble. |
| Game-world free-roam navigation | AT | On arrival: pointer-look (mouse-move parallax on desktop, gyro on mobile), camera drifts over a 4km² tiled dune field. Scroll wheel = "commit to descent" — first scroll triggers the naming ritual. |
| Photorealistic biome per realm | MF | Threshold biome: golden-hour desert. Terrain: 512² heightmap tiles, triplanar sand shader, heat-shimmer refraction pass near the horizon. |
| Particle depth field | HT | 250k (desktop) / 60k (mobile) sand motes, GPGPU, cursor repulsion + scroll-velocity wind. |
| ASCII/hieroglyph flow background | US | During the VEIL and at realm edges: a full-screen field of flowing hieroglyphs (custom MSDF glyph-stream shader), density driven by audio amplitude. |
| Interactive plant response | CR | Sparse desert plants (instanced, ~40) bend toward cursor via vertex shader `uCursorWorld`; they are the only living things in the realm. |
| Dynamic time-of-day | A7 | The Threshold's sun position drifts with real elapsed time — but on loop return it flips dawn↔dusk (§9). |
| Naming ritual (original) | — | The obelisk: raycast-targeted monolith. On first approach, MSDF text prompts the naming. Input is optional; declining yields a desert-assigned threshold name derived from journey data. |

**Signature shader — "Dune Breath":** vertex displacement of the terrain by a low-frequency simplex field so the dunes *breathe* on a 24-second cycle (the desert inhaling heat, per the lore). Amplitude 0.4m — visible only in peripheral vision.

### 3.2 REALM II — THE DYNASTY (Waset) — *"Power was carved in stone. So was the fear of losing it."*

| Component | Src | Implementation |
|---|---|---|
| Camera-fly realm transition | MF | Threshold→Dynasty: camera dives over the canyon rim, follows a spline through the wadi, banking turns; GSAP timeline scrubs spline `u` with scroll. |
| Pinned chapter sections | US | The 19 years → 7 pinned "season-chambers" (Akhet/Peret/Shemu ×2 + the eternal Nineteenth). Each pins for 150vh of scroll while its scene plays. |
| Metamorphic temple | A7 | The temple **builds itself** as you scroll: columns extrude from bedrock (vertex shader growth mask driven by scroll progress), unfinished reliefs fade in mid-carve — and *stay* unfinished (lore: incompletion by design). |
| Scroll-triggered growth | CR | Hieroglyphs carve themselves: MSDF glyphs appear with a chisel-spark particle burst + stone-chip sound per glyph. |
| 3D characters / scene warmth | SH | Stylized monumental figures (workers, name-keepers) as low-poly baked-lit statues; one animated: the hands holding the mask, looping a 12s hold-release-hold. |
| Artifact encasement | II | 6 artifacts encased in amber blocks; hover rotates them (orbit-lite), glyph decodes on approach. |
| Snap-block beats | AT | Three hard-lock beats: Coronation-that-never-lands / The liturgy of names / The mask set down. Scroll is captured; a short timeline plays; scroll releases. |
| Video interlude | US | One authentic-feel break: scanned papyrus / excavation-photo textures projected as light through a doorway, scrubbed by scroll. Pre-rendered mp4 (≤4MB, 1080p, H.265 w/ H.264 fallback) with alpha-blended edges so it reads as *light*, not screen. |

**Signature moment — The Liturgy:** in the Nineteenth chamber, thousands of MSDF names (procedurally generated ancient Egyptian names) rise up the walls like water rising in a flood, stopping at a crest line — and holding. Audio: layered whispered names (see §8).

### 3.3 REALM III — THE CHAMBER (Djed) — *"In the dark, time stops pretending to move forward."*

| Component | Src | Implementation |
|---|---|---|
| Void + monolith | HT | Absolute black environment; the beam-lit sarcophagus and the djed pillar as the only lit geometry. Ambient light = 0. No environment map. |
| Depth of field | MF | Bokeh DOF with focus distance tied to the torch beam: only what the beam touches is sharp. Focus pull animated on scroll. |
| Torch-as-cursor | MF/AT | The cursor *is* the light: a spotlight + point light parented to a smoothed cursor world-position; on mobile, touch-drag moves it, gyro adds sway. Beam cone 24°, flicker via noise on intensity (±6%). |
| Layered descent ecosystems | CS | The descent passes 4 geological strata (Dunes → Bedrock → Limestone → Granite), each a 25vh pinned layer with its own particle type (sand → dust → stone chips → gold flecks) and color temperature. |
| Baked lighting | CR | Wall reliefs use baked lightmaps (torch-shadowed) + one realtime spotlight. Photoreal shadows at zero per-frame shadow cost. |
| Procedural generation | II | The chamber's stalactites, wall cracks, and chip debris are procedurally seeded **per session** (seed = journey hash) — the lore's "unique tomb every visit" made literal. Deterministic per user so their tomb is *theirs*. |
| Custom glyph decode | A7 | Wall hieroglyphs glow as the beam nears (emissive ramp by light distance); hovering a glyph for 1.2s decodes it into English (MSDF crossfade + scramble). |
| Video/papyrus interlude | US | A single interlude: Carter's 1922 diary pages as illuminated parchment textures — but the words are *hers*, per the lore ("altered voice"). |
| The warm granite (original) | — | The djed pillar's material has a subtle emissive pulse synced to the audio heartbeat (§8.4); proximity raises the pulse rate. The beam comes from *below* (the well) — an uplight, breaking every lighting convention, on purpose. |

**Signature silence:** the Chamber is the quietest realm. Audio floor drops to near-nothing; the hum ("sound of the kept") is felt more than heard (40–60Hz). See §8.4.

### 3.4 REALM IV — THE WEIGHING (Ma'at) — *"The heart against the feather."*

| Component | Src | Implementation |
|---|---|---|
| Interactive particle volumes | II | The scale pans, feather, and heart are **formed from particles** — 400k soul-particles that swirl and coalesce into each shape as its moment arrives. |
| DNA particle systems | CR | Particle DOF: near particles large and soft, far particles small and sharp; gold-vs-silver coloring by day/night state. |
| Snap-block scroll | AT | Four hard locks: **Heart → Scale → Feather → Verdict.** Scroll captured at each; scene must complete its timeline before release. Forced contemplation, by design. |
| Dramatic award-style reveal | GA | The Verdict beat: full particle burst + bloom flash + chromatic aberration spike, then *stillness*. The most cinematic 3 seconds of the site. |
| Massive typographic statement | HT | At the Heart lock: **"YOUR HEART"** fills the viewport in brutalist condensed sans (Unseen contrast: brutalist for sentence, script for mercy). At Verdict: the threshold name, in ornate script. |
| Typographic contrast | US | Day: black carved verdict text. Night: gold raised. Twilight (if toggled mid-lock): both overlaid — the superposition legible, per lore §VIII. |
| 42 assessors (original) | — | A ring of 42 low-poly seated figures at the star-field's edge, revealed one-by-one as the camera orbits during the Heart lock. Instanced single mesh, 42 transforms. |
| The 43rd confession (original) | — | Hidden interaction: hovering each assessor whispers its name + its sin (audio + MSDF caption). Finding all 42 unlocks the 43rd inscription: *"I have not erased a name."* (The lore's unique confession, hidden where only the curious go.) |

**Signature mechanic — The Live Scale:** the pans respond to *real* input: cursor position on the heart side adds "weight" (particles drift down), stillness lets the feather side settle. The scale always settles level — but *how long it takes* is the user's own behavior, mirrored. Dwell-time from the journey log is literally rendered as mass. The lore's verdict — *witnessed, therefore level* — executed as physics.

### 3.5 REALM V — THE ETERNAL (Sah) — *"The desert was never the end."*

| Component | Src | Implementation |
|---|---|---|
| Cosmos biome | MF | Infinite starfield: 3 parallax star layers (billboards + point sprites), a golden particle river (souls) flowing *against* the scroll direction — the night-barque rowing backward toward dawn. |
| Cosmic ecosystem layers | CS | Nebula volumes (raymarched, 4 fbm octaves, low-res offscreen pass upscaled), constellation line fields, the wheeling circumpolar disc around a fixed pole. |
| Gradient rebirth palette | SH | Realm palette travels Gold → Indigo → Void → Gold across the scroll, ending exactly at the Threshold's dawn gold — the loop made chromatic. |
| The Scribe reveal / final message | A7 | No character model — the desert's voice, as text: the lore's closing lines decode glyph-by-glyph across the star-field as the camera drifts to the Seat. |
| Chromatic aberration fracture-then-heal | II | Entering the Seat: aberration ramps to max (reality fractures) then heals to zero as the user sits — the fracture resolving into light. |
| Infinite loop mechanism | CR | Final scroll past the Seat triggers the Loop Handoff (§9). No dead end anywhere. |
| The Seat (original) | — | Raycast interaction: approaching the empty seat slows scroll to drift; clicking (or 6s of stillness) *sits* — camera lowers into the chair, FOV widens 55°→75°, and the sky wheels one full accelerated revolution (~40s) while the verdict-name is spoken. |

**Signature reversal:** in the Eternal, scroll direction inverts its meaning — scrolling *down* now moves the camera *up* (the corridor descends toward the sky). Implemented as a camera-path inversion inside the Realm module, invisible to ScrollTrigger.

### 3.6 GLOBAL SYSTEMS (all realms)

| System | Components | Src |
|---|---|---|
| Navigation | Vertical hieroglyph sidebar (5 realm glyphs + English on hover); selecting one = camera-fly transition, never a page load | MF + HT |
| Typography | MSDF everywhere; brutalist condensed display + ornate script + wide-track body; hieroglyph scramble/decode reveals | US + II + CR |
| Particles | Realm-specific fields: sand / stone-chips / gold dust / soul-particles / stars — one shared GPGPU framework, per-realm parameter sets | HT + II + CR |
| Audio | Spatial wind, stone, chant, heartbeat, cosmic drone (§8) | MF + CS |
| Cursor | Golden scarab cursor (custom SVG/WebGL sprite) leaving a fading gold particle trail; disturbs all particle fields | SH + AT |
| Loading | Click-to-illuminate → hieroglyph flow → realm reveal | AI + US |
| Transitions | Camera-fly + chromatic aberration spike at realm boundaries | II + MF |
| Scroll behavior | Free-roam (Threshold) → pinned chapters (Dynasty) → layered descent (Chamber) → hard snap (Weighing) → drift + inverted (Eternal) | AT + US |
| Easter eggs | 36 Eye-of-Horus glyph variants hidden across realms (US's winged-eye grid, translated); finding them all unlocks the "Desert Copy" — a hidden archive page of the full lore | US |
| Countdown (optional) | *"The stars align in…"* — real-time countdown to the next computed Sirius heliacal-rising date | GA |

---

## 4. WEBGL / THREE.JS SPECIFICATIONS

### 4.1 Renderer

```ts
renderer = new THREE.WebGLRenderer({
  antialias: false,            // AA via post FXAA — cheaper with composer
  powerPreference: 'high-performance',
  stencil: false,
  alpha: false,
});
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping; // gold without clipping
renderer.setPixelRatio(Math.min(devicePixelRatio, DPR_CAP)); // 2 desktop, 1.5 mobile
```

- **Shadows:** OFF globally. Dynasty uses baked lightmaps; the Chamber torch uses one `SpotLight` with a 512px shadow map (the *only* realtime shadow in the project); everything else fakes shadowing in-shader (AO + radial falloff).
- **Culling:** manual per-chunk frustum culling; terrain tiles use `THREE.LOD` with 3 levels.

### 4.2 Terrain (Threshold / Dynasty / Eternal floor)

- 8×8 tiled heightmap grid, tiles streamed around camera.
- Vertex shader: simplex FBM displacement + **Dune Breath** low-frequency layer + cursor-ripple displacement (a decaying ripple ring where the cursor touches ground, raycast-projected).
- Fragment: triplanar sand albedo/normal (KTX2), slope-based color ramp (lit crests / shadowed lees), sparkle glints (screen-space derivative glitter), heat-shimmer applied in post via a refraction mask near the horizon line.

### 4.3 Particle Framework (GPGPU)

One framework, five parameter sets:

```ts
class GPUParticles {
  simMat: THREE.ShaderMaterial;       // position/velocity update in fragment shader
  rtA: THREE.WebGLRenderTarget;       // ping
  rtB: THREE.WebGLRenderTarget;       // pong (float type)
  renderMesh: THREE.InstancedBufferGeometry; // point sprites, per-particle attributes
}
```

- **Forces:** curl-noise flow field (per realm), cursor repulsion (radius 1.2m), scroll-velocity wind vector (scroll delta → impulse; fast scroll = sandstorm, per the brief), realm gravity (sand falls, souls rise, stars orbit).
- **Counts:** Threshold 250k / Dynasty 120k / Chamber 80k / Weighing 400k / Eternal 300k + 3 star layers. Mobile: ×0.4 with sprite-size compensation (fewer, larger, softer — visually equivalent at arm's length).
- **The Scale (Weighing):** particles carry a `target` attribute; morphing between formations = GPU lerp of position→target with per-particle easing offsets. No CPU morphing, ever.

### 4.4 Lighting Model

| Realm | Model |
|---|---|
| Threshold | HDRI sky (custom 2k exr, day + night variants) + directional sun + hemisphere; dune shader handles the rest |
| Dynasty | Baked lightmaps (Blender Cycles bakes, KTX2) + 1 directional key light for figures |
| Chamber | **Zero ambient.** 1 spotlight (torch, cursor-driven) + 1 uplight (the well) + emissive glyph ramps |
| Weighing | Self-lit particle forms + star-field dome; the scale beam emissive |
| Eternal | Emissive everything; sky shader is the light |

### 4.5 Post-Processing Chain (in order)

1. Render pass (HDR, HalfFloat)
2. Heat-shimmer refraction (Threshold only, masked)
3. Bokeh DOF (Chamber heavy, Dynasty light, others subtle)
4. UnrealBloom (threshold 0.85, strength per-realm: Eternal 1.2, Chamber 0.35)
5. Chromatic aberration (base 0; spike to 0.012 on transitions/twilight/verdict)
6. Day/Night grade LUT (see §7)
7. Film grain (2–4%, animated — the "time texture")
8. Vignette (realm-tuned)
9. FXAA

---

## 5. TYPOGRAPHY SYSTEM (MSDF)

- **Faces:** `Kemet Display` (ultra-condensed brutalist sans, Egyptian proportions), `Kemet Script` (ornate calligraphic), `Kemet Body` (wide-tracking humanist sans) — plus `Kemet Glyph`, a custom hieroglyphic MSDF font (~240 signs, drawn as vector masters).
- All world-space text rendered via MSDF with custom shaders on top:
  - **Decode:** glyph scramble — each character cycles through N random hieroglyphs before locking to its final glyph, staggered 12–40ms, triggered by ScrollTrigger or proximity.
  - **Carve (Day):** chisel-depth fake via normal-perturbed MSDF edge darkening + spark burst per glyph.
  - **Raise (Night):** emissive gold rim + soft outer glow (the same glyph, second register — per the lore's two-text system).
- **The Two Texts:** every string in the experience is a tuple `{day, night}`. The day/night mix uniform crossfades glyph *content*, not just color — a content morph, staggered per character during the 4-second twilight. This is the signature text effect no competitor will have.
- DOM text is reserved for a11y and the Archive; visually, text lives in WebGL (CR doctrine).

---

## 6. GSAP SCROLLSMOOTHER ARCHITECTURE

```ts
ScrollSmoother.create({
  wrapper: '#smooth-wrapper',
  content: '#smooth-content',
  smooth: 1.6,               // buttery, tomb-weighted
  effects: true,
  smoothTouch: 0.1,          // near-native on touch — mobile stays honest
  normalizeScroll: true,
});
```

- **Master timeline:** one ScrollTrigger per realm segment; realm enter/exit timelines built by the Realm modules and handed to the RealmManager.
- **Pins:** Dynasty season-chambers pin at `end: '+=150%'`; Chamber strata pin at `+=25%` each; Weighing uses hard locks with `onEnter` scroll-capture (ScrollTrigger temporarily disabled while the beat's timeline plays, then re-enabled).
- **Scrub policy:** camera movement timelines `scrub: 1` (1s catch-up smoothing); reveal/decode timelines `scrub: true`.
- **Velocity → wind:** `ScrollTrigger.getVelocity()` normalized into the particle uniform `uWind` every frame — fast scroll literally raises a sandstorm.
- **Direction → mood:** scroll-up (ascent) shifts the global grade 8% warmer and raises audio 2dB — resurrection direction, per the brief's yin/yang mechanic. The site remembers where you've been: revisited sections restore their completed states from the journey log instead of replaying naively.

---

## 7. DAY/NIGHT DUALITY SYSTEM

### 7.1 State

`store.eye: 0 (Ra/day) | 1 (Horus/night)` + one reusable `TwilightTimeline`.

### 7.2 What actually changes (every realm)

| Layer | Day (Eye of Ra) | Night (Eye of Horus) |
|---|---|---|
| Sky | White-gold HDR sun, hard light | Silver-blue moon, star dome up |
| Grade LUT | Hot, high-contrast, crushed shadows | Cool, lifted blacks, silver mids |
| Glyphs | Black, carved, shadow-filled | Gold, raised, emissive |
| Particles | Sand-colored, dense, fast | Star-silver, sparse, slow |
| Text content | Day register (declarations) | Night register (confidences) |
| Audio | Wind-forward, bright, stone | Hum-forward, star-music, sparse |
| Shadows | Hard, short | Soft, long |

### 7.3 The 4-Second Twilight (the sacred transition)

Not a crossfade — a **superposition**, per the lore:

```
t = 0.0s  hold-trigger → chromatic aberration ramps to 0.012; both LUTs active
t = 0–4s  sky shader renders sun AND moon (the akhet — sun in the horizon's lap);
          every glyph holds BOTH registers legible (dual-render pass, 50% blend);
          wind and hum crossfade; dual light rig gives every object two shadows
t = 4.0s  aberration heals to 0; new state locked
```

- The sun visibly crosses the horizon during the transition — timed to the metaphor: *the sun dies in four heartbeats.*
- The toggle is not a button: it is a **ritual glyph** (wedjat eye) the user presses and holds for 1.2s. Hold = consent to the crossing. Haptic pulse on mobile during the 4s.
- The same `TwilightTimeline` is reused at the VEIL (arrival) and scaled ×2 for the LOOP handoff.

---

## 8. SPATIAL AUDIO ARCHITECTURE

### 8.1 Bus Structure

```
Master
├── Ambience (wind / roomtone per realm)
├── Material (sand, stone, chisel, torch crackle — interaction one-shots)
├── Voice (whispered names, confessions, the desert's lines)
├── Sacred (the hum, star-music, heartbeat, cosmic drone)
└── UI (glyph decode ticks, scale creaks)
```

### 8.2 Spatialization

- `PannerNode` (HRTF) for point sources: torch, obelisk, assessors, the Seat.
- `ConvolverNode` per realm with custom impulse responses: open-air (Threshold), stone hall (Dynasty), near-anechoic + 6s tail (Chamber), cathedral (Weighing), infinite (Eternal — 12s generated IR).
- IR crossfades are baked into the realm transition timelines.

### 8.3 Reactive Layers

- **Wind:** looped stems; playback rate + filter cutoff driven by scroll velocity and the particle `uWind` uniform. Sandstorm at high velocity.
- **Glyph chisel:** granular one-shots pitched to glyph position.
- **Names liturgy:** ~200 whispered-name fragments, randomized round-robin, density tied to the rising text in the Nineteenth chamber.

### 8.4 The Sacred Layer

- **The hum (sound of the kept):** 42Hz sine + 60Hz fifth, sub-bass, always present from the Chamber onward; volume mapped to user stillness (idle detection) — the quieter *you* are, the louder it gets.
- **Heartbeat (Weighing):** default 60bpm synthesized kick; on mobile, optional tap-rhythm capture personalizes it (per the brief's mobile table). The scale's settling rate syncs to it.
- **Star-music (Eternal):** generative — each constellation assigned a chord from a just-intonation set; slow LFO-triggered swells; the Imperishables = continuous drone in D. Constellation hovers trigger harmonic arpeggios.
- **The Verdict moment:** full audio silence for 0.8s before the burst. Silence is the loudest thing in the build.

### 8.5 Delivery

- All audio streamed (Web Audio decode of .opus/.m4a), initial payload ≤ 1.2MB; layers load per realm.
- Sound-off toggle in chrome (HT doctrine); the AudioContext is unlocked by the click-to-illuminate ritual itself — the ritual *is* the autoplay-policy gesture.

---

## 9. INFINITE LOOP MECHANICS

### 9.1 The Handoff

Final scroll past the Seat → `RealmManager.loop()`:

1. Twilight timeline ×2 duration (8s — the long crossing).
2. Camera rises from the Seat through the star-field; the stars *thin into sand* (particle parameter morph: stars→grains, silver→gold).
3. Scroll position is **invisibly re-anchored** to the top (ScrollTrigger refresh during the twilight while the screen is 100% superposed — the user never sees the jump).
4. `store.cycle++`. Threshold re-enters — transformed.

### 9.2 The Transformed Threshold

- **The obelisk bears the threshold name** — generated from the journey log: deterministic hash of (dwell pattern, velocity signature, day/night choices, hover discoveries) mapped onto a curated syllabary of ancient Egyptian name-elements (*Nefer-, Mer-, Ankh-, Sekh-…*), rendered as an MSDF cartouche held in the electrum tip's light. Purely procedural; no PII; the name is *theirs* because their behavior made it.
- **Mirages show the user's own journey:** the heat-shimmer layer replays 3–5 captured "moments" (camera-state thumbnails recorded at key beats) refracted through the mirage shader — *the desert reading you back to yourself.*
- **Dawn has become dusk** (or vice-versa): the sun's phase flips 180° per cycle. *The cycle is half-complete. It is always half-complete.*
- **Depth-weight increases:** with each cycle, dwell thresholds drop slightly (the desert recognizes you), the hum arrives one realm earlier, and on cycle ≥3 the mirages begin showing *forward* — glimpses of realms in states not yet visited this cycle (the lore's third-crossing prophecy, implemented as seeded "pre-haunting" clips).
- **Scroll-up truths:** ascending from any realm in cycle ≥2 reveals hidden night-register inscriptions not present in descent (direction-conditional content — *the door opens both ways, and the two ways are not the same*).

### 9.3 State Persistence

`localStorage`: `{ cycle, thresholdName, journeySeeds, eyesFound[36], confessionsFound[42] }`. A returning visitor days later finds *their* obelisk still named. *The desert does not forget.*

---

## 10. MOBILE ADAPTATION — MINIMUM VIABLE AWE

Principle: **jaw-dropping, honestly scaled.** No fake desktop port.

| System | Mobile spec |
|---|---|
| Renderer | DPR cap 1.5; same renderer, reduced buffer sizes |
| Particles | ×0.4 counts, sprite scale ×1.6, softer falloff |
| Geometry | LOD +1 tier everywhere; terrain tiles 4×4 |
| PostFX | Bloom + vignette + grade only (DOF, aberration reserved for twilight/verdict) |
| Navigation | Swipe = scroll; gyroscope parallax replaces mouse-look (clamped ±6°) |
| Torch (Chamber) | Touch-drag; torch auto-centers on nearest glyph when idle 3s |
| Illuminate | Touch ritual identical to desktop click |
| Haptics | `navigator.vibrate` micro-pulses: glyph decode (8ms), realm threshold (20ms), twilight (4s ramp), verdict (double 40/80ms) |
| Heartbeat | Optional tap-rhythm capture; otherwise synth default |
| Ambient light | Where permitted, ambient-light sensor nudges initial day/night state |
| Audio | Same bus architecture; fewer simultaneous voices (24 vs 64) |
| Performance | 60fps target on A14+/Snapdragon 888+; 30fps floor with dynamic resolution scaling (100%→70% under sustained frame-time pressure, invisible during motion) |

---

## 11. PERFORMANCE TARGETS & BUDGETS

| Metric | Target |
|---|---|
| First paint (veil interactive) | **< 1.5s** on 4G (veil + glyph-flow ≤ 600KB) |
| Threshold fully interactive | **< 3.5s** on 4G |
| Frame rate | 60fps desktop / 60 target, 30 floor mobile |
| Draw calls | ≤ 90 per realm (instancing everywhere: columns, assessors, plants, stars) |
| Triangles | ≤ 1.2M visible per realm |
| Texture memory | ≤ 350MB GPU resident (KTX2 mandatory) |
| JS bundle (initial) | ≤ 220KB gzip (engine + veil + Threshold); realms code-split ≤ 180KB each |
| Audio (initial) | ≤ 1.2MB; realm layers ≤ 800KB each |
| Memory discipline | Only 3 realms resident; hard `dispose()` on exit; zero leaks across 5 consecutive loops (soak-tested) |
| Illusion integrity | No layout shift, no scrollbar flash, no texture pop-in > 1 frame |

**Loading strategy:** the veil needs almost nothing; the Threshold streams behind the twilight; each realm pre-loads during the *previous* realm's second half (`requestIdleCallback` + fetch priority hints). The user should never wait on anything except their own courage.

---

## 12. ACCESSIBILITY & FALLBACKS (the invisible craft)

- `prefers-reduced-motion`: disables dune-breath, particle density ×0.3, snap locks become simple reveals, twilight reduced to a 1s fade (the lore survives; the motion sickness doesn't).
- Full **DOM mirror** of all narrative text (screen-reader navigable, aria-described realms).
- Keyboard-only path: Tab through realm beats; Enter = scroll-commit; all interactions have key equivalents.
- Contrast: both day and night registers pass WCAG AA for body text.
- WebGL-fail fallback: a static-but-stunning "carved wall" version — CSS gradients, the full lore text, the two registers as a manual toggle. Even the fallback must feel found, not failed.

---

## 13. THE AWWWARDS PITCH (why this wins)

1. **It has a soul.** Not an Egyptian *skin* — an original mythology with archaeological roots (Neheh/Djet, the five-part soul, the 42 confessions, the Sothic cycle) deep enough that judges who google it find real scholarship underneath.
2. **Two sites in one.** The Day/Night system with content-morphing dual registers has never been done at this depth — the 4-second twilight superposition is a signature moment judges will screen-record.
3. **The loop that means something.** Infinite loops exist (CR); a loop with *narrative justification* (Neheh) that transforms content per cycle and names the user into the monument — that's new.
4. **The live scale.** A judgment scene whose outcome is rendered from the user's own behavior. Interaction as theology.
5. **The desert narrates.** No character, no mascot — the environment itself is the protagonist, fulfilling the brief exactly: *somewhere between a spectral scribe and pure environment; the desert is the primary narrator.*

---

*The corridor descends toward the sky. Build it that way.*

**— END OF THE TECHNICAL ARCHITECTURE —**
