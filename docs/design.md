# KEMET: THE BLACK LAND — Global Design Document

> *A museum placard that has started to dream.*
> Vertical slice: **The Veil → The Threshold (Akhet) → The Sealed Descent**, plus two support surfaces (The Carved Wall, The Colophon). One continuous WebGL world that the DOM occasionally annotates — never "a page with a 3D background."

---

## 0. DESIGN THESIS

KEMET is not a website about Egypt. It is a **place** — a threshold held open between two times. The design translates five load-bearing mythological ideas into interface law:

| Mythological idea | Design law |
|---|---|
| **Akhet 𓈌** — the horizon as a *place*: the sun seated between two peaks, the busiest door in the cosmos | Every key composition frames a disk (or disk-equivalent) between two masses. The wordmark, the favicon, the hero frame, the sealed door — all are the akhet. It is the site's master composition and its logo. |
| **Neheh & Djet** — two times: the time of cycles (breath, flood, return) and the time of stone (fixed, finished, forever) | Every moving thing in the experience either **breathes** (slow cycles: 24s dune breath, 8s UI breath, 60bpm pulse) or is **stone-still**. Nothing jitters, nothing flashes. Motion is geology or respiration — never decoration. |
| **The Two Eyes** — Eye of Ra (day: being regarded by the sun) / Eye of Horus (night: being regarded by the healed eye) | Not themes. Two complete render states joined by a **4-second twilight superposition** — the sun dies in four heartbeats. Every text exists twice: Day = declarations carved black; Night = confidences raised gold. |
| **The desert narrates** | No mascot, no character, no guide. The environment speaks: placards, mirages, wind, and the two registers of text. Copy voice = archaeological authority + poetic mysticism, quoted from the lore. |
| **Withhold, then reveal** | Darkness first; gold discovered by light. The user's first gesture literally illuminates the world. Interactive light = the user's candle (~50 lux finding gold in the dark). |

**The anti-goal:** postcard Egypt. If any frame could be a Vegas casino, a travel-agency poster, or an emoji — it is cut. The canon of the ethereal is restraint: silence, slow time, one warm light, one glyph, one horizon.

---

## 1. EXPERIENCE MODEL & PAGE LIST

KEMET is a single-route WebGL world (`/`) with two minimal support surfaces. "Pages" below are the design-doc units; routes are noted per unit.

| Design doc | Route | What it is |
|---|---|---|
| `veil.md` | `/` (state 0) | **THE VEIL** — black arrival screen, the click-to-illuminate ritual, the Final Invocation read in 4-second twilight, dawn breaking over the dunes. Loading IS the first scene. |
| `threshold.md` | `/` (states 1–4) | **THE THRESHOLD (Akhet)** — the fully-built realm: golden-hour dune field, GPGPU sand, free-roam camera, the blank Obelisk and the naming ritual (both paths), hieroglyph flow, mirage shimmer, desert plants, scroll-commit descent to **The Sealed Door** (Realms II–V teaser). |
| `carved-wall.md` | `/wall` | **THE CARVED WALL** — no-WebGL / reduced-motion fallback: the full lore read by candlelight (cursor-tracked illumination), the two registers as a manual toggle. Must feel *found*, not failed. |
| `colophon.md` | `/colophon` | **THE COLOPHON** — the scribe's seal, credits, scholarship acknowledgments, the Sirius countdown, and the locked Archive teaser (0/36 eyes). |

**Global systems living across the world** (specified in this document): the five light-state palettes and day/night duality; chrome (Meridian bar, Cartouche Rail, Placard, Wedjat hold-toggle, sound mark); cursor; motion doctrine; audio architecture; device tiers.

**State machine within `/`:**

```
VEIL (loading → touch-to-awaken → invocation/twilight → dawn)
  → THRESHOLD (free-roam, obelisk, naming ritual)
  → THE COMMIT (scroll descent)
  → THE SEALED DOOR (teaser) → soft return to THRESHOLD
  ↺ day/night twilight available everywhere after the Veil
```

---

## 2. COLOR SYSTEM

### 2.1 The five light-state palettes (BINDING — the world grades from these only)

Legend: SKY-Z zenith · SKY-H horizon · LIGHT key light · SAND-L lit sand · SAND-S shadow sand · ACC accent/emissive · HAZE fog.

**A. DAWN AKHET** *(arrival state; the Veil dissolves into this)*
SKY-Z `#2E3A5C` · SKY-H `#F0C297` · LIGHT `#F5D9A8` · SAND-L `#D9A878` · SAND-S `#5E6B8C` · ACC `#F2E3B3` · HAZE `#C4B49E` · rose band `#D9A0A8`

**B. NOON (Ra zenith)** *(reached only by drifting time in day state; exposure register)*
SKY-Z `#7FA8D9` · SKY-H `#E3DCC8` · LIGHT `#FFF7E0` · SAND-L `#EFE3C8` · SAND-S `#9A8F7E` · ACC `#FFFFFF` · HAZE `#D9D2BE`

**C. DUSK AKHET** *(the warmest day state; embers and violets)*
SKY-Z `#3B3F66` · SKY-H `#C96F4A` · LIGHT `#E89B5F` · SAND-L `#C98A5E` · SAND-S `#4E5578` · ACC `#E8B96A` · HAZE `#A8816B`

**D. TWILIGHT** *(the 4 sacred seconds; both states superposed)*
SKY-Z `#26304D` · SKY-H `#8C6B8F` · residual ember `#B76E5E` · SAND-L `#6E748C` · SAND-S `#333A52` · temple uplight `#D9A05B` · first stars `#E8E4D8`

**E. MOONLIT NIGHT (Eye of Horus)**
SKY-Z `#0E1424` · MOON `#E8E9EC` · SAND-L `#B8BCC8` · SAND-S `#2A3040` · stars `#C8D4E8` · single ember `#C77B3F` *(the ONLY warm pixels allowed at night)* · HAZE `#3A4257`

### 2.2 Grading rules (acceptance criteria)

1. Warm highlights / cool shadows split-tone in **every** state; shadows carry the sky's color (blue-violet day, indigo night) — never neutral gray.
2. Black floor = `#0E1424`. Pure `#000000` is forbidden anywhere in the build (renderer clear color, CSS, video).
3. Haze/fog color always equals the active state's SKY-H so terrain dissolves into sky.
4. No magenta bias; vibrance logic, never raw saturation pushes. Saturation caps as given — do not exceed.
5. Day↔night transitions MUST pass through the twilight palette. No direct jumps, no crossfades that skip superposition.
6. Gold is a **material**, never a color: PBR metal (roughness 0.15–0.35, env reflections) sitting in darkness, discovered by light. In DOM/chrome, "gold" appears only as `#D9A05B`-family accents on near-black — never as large flat fills.

### 2.3 Chrome palette (DOM/UI layer — derived from the world palettes)

The interface is candlelight on night stone. It uses the Night palette as its ground at all times (chrome floats over both eyes; day content lives in the world beneath it).

| Token | Hex | Use |
|---|---|---|
| `--kemet-ink` | `#0E1424` | Chrome ground, scrims, fallback page base. Never `#000`. |
| `--kemet-ink-2` | `#161D31` | Raised surfaces (ritual card, drawer) — ink lifted one step toward haze. |
| `--kemet-bone` | `#EFE3C8` | Primary text — the color of first light on stone (Dawn ACC/Noon sand). |
| `--kemet-bone-dim` | `#C4B49E` | Secondary text, captions (Dawn HAZE). |
| `--kemet-taupe` | `#8C7E68` | Tertiary/metadata text, disabled states. |
| `--kemet-gold` | `#D9A05B` | Interactive accent, emissive moments, active states (Twilight temple uplight). |
| `--kemet-gold-hi` | `#F2E3B3` | Highlight gold — first-strike electrum; small doses only (focus rings, cartouche rim). |
| `--kemet-ember` | `#C77B3F` | The single warm accent at night; ritual ember, recording states. |
| `--kemet-moon` | `#E8E9EC` | Night-register text when displayed on ink (moonlit silver). |
| `--kemet-star` | `#C8D4E8` | Cool informational accents (links to lore, coordinates). |
| `--kemet-line` | `rgba(242,227,179,0.14)` | Hairlines, dividers, rails. |
| `--kemet-line-soft` | `rgba(242,227,179,0.07)` | Ground lines, quiet separators. |

**Register pairing for text (the Two Texts in CSS terms):**
- **Day register** (declarations): `--kemet-bone` text, treated *carved* (recessed) — see §3.5.
- **Night register** (confidences): `--kemet-gold-hi` → `--kemet-gold` text, treated *raised* (soft outer glow at ≤0.35 alpha). Never pure-yellow `#FFD700`-family.
- WCAG (measured): `--kemet-bone` on `--kemet-ink` = 14.4:1; `--kemet-gold` on `--kemet-ink` = 8.0:1; `--kemet-moon` on `--kemet-ink` = 15.1:1; `--kemet-taupe` on `--kemet-ink` = 4.6:1 (AA for normal text; reserved for ≥11px non-essential metadata). Body text always bone or gold — AA pass in both registers.

---

## 3. TYPOGRAPHY SYSTEM

### 3.1 Families (max 3 per view — locked)

| Role | Family | Weights | License/Source |
|---|---|---|---|
| **Titles / wordmark / placard names** | **Cinzel** | 400, 700 | Google Fonts (OFL). First-century inscriptional caps; 400 reads more lapidary than 900. |
| **Lore / poetic register / ritual text** | **Cormorant Garamond** | 400, 500 + 400 italic | Google Fonts (OFL). Hairline old-style; the dreaming voice. Display-to-large-text only (≥17px). |
| **UI / metadata / transliteration** | **Archivo** | 400, 500, 600 | Google Fonts (OFL). The contemporary museum-label voice. |
| **Hieroglyphs (linear runs)** | **Noto Sans Egyptian Hieroglyphs** | 400 | Google Fonts (OFL/Apache). Linear sign sequences only (no quadrat stacking). |
| **Key glyphs (hero use)** | Custom SVG redraws | — | 𓈌 𓊽 𓂀 𓆣 𓇼 𓆓 𓌀 redrawn from New Kingdom exemplars (see Assets). |

Never mix a second inscriptional face (Marcellus etc.) into any Cinzel composition. Never set long paragraphs in caps faces. Chinese/CJK not in scope; if ever added, append a scoped CJK serif to the stack.

### 3.2 Type scale (fluid; `clamp(min, preferred, max)`)

| Token | Spec |
|---|---|
| `--type-wordmark` | Cinzel 400 · `clamp(1.35rem, 0.95rem + 2vw, 2.6rem)` · caps · tracking `+0.30em` (offset right-pad by same to stay centered) |
| `--type-display` | Cinzel 400 · `clamp(2.2rem, 1.2rem + 5vw, 5.5rem)` · caps · tracking `+0.18em` · line-height 1.04 |
| `--type-realm-title` | Cinzel 400 · `clamp(1.6rem, 1.1rem + 2.4vw, 3.2rem)` · caps · tracking `+0.16em` |
| `--type-placard-name` | Cinzel 400 · `clamp(1.05rem, 0.95rem + 0.5vw, 1.4rem)` · caps · tracking `+0.16em` |
| `--type-translit` | Archivo 500 · `0.6875rem` (11px) · caps · tracking `+0.14em` · color taupe |
| `--type-lore` | Cormorant Garamond 400 · `clamp(1.125rem, 1.02rem + 0.5vw, 1.45rem)` · sentence case · line-height 1.75 · tracking `+0.005em` |
| `--type-lore-sm` | Cormorant Garamond 400 · `1.0625rem` · line-height 1.7 |
| `--type-ui` | Archivo 500 · `0.75rem` · caps · tracking `+0.10em` |
| `--type-ui-xs` | Archivo 500 · `0.6875rem` · caps · tracking `+0.12em` |
| `--type-glyph-line` | Noto Sans Egyptian Hieroglyphs · `1.2–1.6×` adjacent cap height · own ground line |

Tracking widens with size (up to +0.22em at display sizes). Numerals in metadata: tabular (`font-feature-settings: "tnum"`). Lore passages may enable old-style numerals (`"onum"`).

### 3.3 The Placard Hierarchy (governs ALL copy blocks)

Every text block reads like a museum object label that learned to dream:

```
[ 1 ] NAME — Cinzel caps, bone                        (the object)
[ 2 ] transliteration — Archivo 11px tracked, taupe   (the scholarship)
[ 3 ] poetic register — Cormorant, sentence case      (the dream)
```

Example (The Threshold):
> **THE THRESHOLD**
> *ꜢḪT — AKHET, "THE HORIZON; THE PLACE OF BECOMING"*
> The door that opens both ways. The desert reads what walks upon it.

### 3.4 Hieroglyphs as architecture

- Signs always **face the reading direction** (read into their faces); vertical columns on monument surfaces; mirrored compositions mirror the glyphs too (Latin never mirrors).
- Set at 1.2–1.6× adjacent cap height, on their own ground line (a `--kemet-line-soft` rule beneath register runs).
- Colored as **material** — stone (taupe/bone), faint gold-leaf (`--kemet-gold` at 60–80%), or recessed shadow — never emoji-color.
- One glyph = one meaning: every glyph cluster gets a transliteration caption in the UI layer (e.g., *nfr — nefer, "beautiful"*). No random glyph texture, ever.
- In-world text is MSDF (custom `Kemet Glyph` atlas); DOM text is reserved for chrome, the fallback, and a11y mirrors.

### 3.5 The Two Registers in DOM/CSS (carve & raise)

Used on the carved-wall fallback and ritual surfaces; the in-world equivalent is shader-based (carve = edge-darkening + inner shadow along light vector; raise = gold rim + dilated glow band).

```css
.text-carve {  /* Day register — cut into stone */
  color: var(--kemet-bone);
  text-shadow: 0 .035em 0 rgba(0,0,0,.55), 0 -.03em 0 rgba(242,227,179,.10);
}
.text-raise {  /* Night register — lifted in gold */
  color: var(--kemet-gold-hi);
  text-shadow: 0 -.03em .01em rgba(0,0,0,.5), 0 0 .6em rgba(217,160,91,.28);
}
```

---

## 4. MOTION SYSTEM

### 4.1 Doctrine

1. **Two clocks only.** *Neheh* (cycles): everything alive breathes — dunes 24s, UI breath 8s, pulse 60bpm (1s), star wheel ~40s/rev drift. *Djet* (stone): everything monumental is perfectly still. No third category. No bounce, no elastic, no wobble on UI.
2. **Dark adaptation pacing.** State changes and scene fades ≥ 2s. Hard cuts are forbidden everywhere — all scene handoffs are FBO-to-FBO dissolves (glyph-shaped mask) with a chromatic-aberration "seam healer" spike (0 → 0.012 → 0).
3. **The 4-Second Twilight is the signature.** The sun visibly crosses the horizon in four heartbeats; both light rigs live; every object casts two shadows; both text registers legible at once (50% blend, distance-field morph per glyph, staggered per character); wind and hum sound together; aberration ramps and heals. One GSAP `TwilightTimeline` tweens a single 0→1 progress value; every system subscribes.
4. **Ritual gestures have weight.** The wedjat toggle requires a **1.2s hold** (consent to the crossing); buttons fill from center over **0.735s**; the awaken touch blooms for 1.6s. Haptic pulses mirror beats on mobile (8ms glyph, 20ms threshold, 4s ramp twilight).
5. **Ambient motion carries stillness.** Long static compositions stay alive through audio and micro-drift: camera idle drift ≤ 0.5°/s; text never idles with transform jitter — only opacity/tracking breath ±2–4% on 8–12s cycles.
6. **Velocity is wind.** Scroll velocity feeds the shared fluid field → sand particles, glyph flow, heat shimmer, audio filter cutoff. Fast scroll literally raises weather; stillness settles the world and raises the hum.

### 4.2 Easing vocabulary

| Token | Curve | Use |
|---|---|---|
| `--ease-sacred` | `cubic-bezier(0.22, 1, 0.36, 1)` | Reveals, placard entrances, dawn light ramps |
| `--ease-ritual` | `cubic-bezier(0.625, 0.05, 0, 1)` | Hold-to-fill buttons, ring fills, the awaken bloom (0.735s family) |
| `--ease-tomb` | `cubic-bezier(0.16, 1, 0.3, 1)` | Drawers, overlays, rail/tooltips |
| `--ease-stone` | `cubic-bezier(0.7, 0, 0.2, 1)` | Camera commits, descent splines |
| camera pursuit | critically damped spring (scrub `1`) | All camera-follow; cursor look-at clamp ±6° |

### 4.3 Named choreographies (reused across pages)

- **`decode-in`** — glyph-scramble decode: each character cycles random hieroglyph atlas cells (12–40ms staggered lock) before settling; used for every title/placard first-appearance. DOM fallback: opacity + tracking settle from `+0.4em → target`, 1.4s `--ease-sacred`.
- **`line-rise`** — line-by-line reveal: `translateY(110%) → 0` inside `overflow:hidden` masks, stagger 90–120ms, 1.2s `--ease-sacred`; placard bodies, invocation lines.
- **`trace-fill`** — stroke-draw then fill: SVG `stroke-dashoffset` traces the outline (1.8–2.4s, `--ease-ritual`), then fill opacity 0→1 (0.8s); wordmark, cartouche ring, key glyphs.
- **`bloom-touch`** — touch/click bloom: radial ember gradient scales 0→120vmax, 1.6s `--ease-ritual`, alpha 0.9→0; the awaken gesture.
- **`hold-ring`** — hold interactions: concentric ring stroke fills over 1.2s `--ease-ritual`; release early → ring drains 0.3s; complete → fires ritual.
- **`bubble-fill`** — button hover/active: gold disc scales from center `scale(0)→1`, 0.735s `--ease-ritual`, text inverts bone→ink.
- **`candle-drift`** — cursor light: smoothed lerp 0.08–0.12 behind pointer; DOM version = fixed radial-gradient layer `mix-blend-mode: screen` (gold, 34vmax radius) + a second `mix-blend-mode: multiply` shadow-lift; WebGL version = spotlight rig.
- **`breath`** — `opacity ±4%` / `letter-spacing ±0.01em` / scale `1→1.004`, 8s or 24s sine, `prefers-reduced-motion` off.
- **`stone-wake`** — barely-perceptible "living stone" micro-motion for fallback glyphs: 10-step keyframe wobble (≤0.5px translate, ≤0.15deg rotate) on a 6s loop, paused under reduced-motion.
- **`rail-hide`** — chrome auto-hides after 4s input-idle (`translateY` ±8px + opacity → 0, 0.6s `--ease-tomb`); returns on pointer approach / scroll-up. The Meridian also hides on scroll-down, returns on scroll-up.

### 4.4 Reduced motion

`prefers-reduced-motion` (or Tier 0/1): dune-breath off, particle density ×0.3, snap-locks become simple reveals, twilight collapses to a 1s fade, `decode-in`/`line-rise` become 0.6s opacity fades, `candle-drift`/`stone-wake` off. The lore survives; the sickness doesn't.

---

## 5. SCROLL BEHAVIOR

- **ScrollSmoother**: `smooth: 1.6`, `effects: true`, `smoothTouch: 0.1`, `normalizeScroll: true`. One `gsap.ticker` clock for everything.
- **Scroll = descent.** On `/`, scroll does not move a page — it commits the camera. The Threshold is free-roam; the first intentional scroll gesture (after the naming ritual) triggers **The Commit**: camera dives toward the obelisk base (scrub `1`, `--ease-stone`) into the Sealed Door vignette. The door teaser is a ~150vh pinned beat; scroll then re-anchors invisibly (aberration seam-healer) back to the Threshold surface.
- **Velocity → wind:** `ScrollTrigger.getVelocity()` clamps into the shared fluid field every frame.
- **Direction → mood:** scrolling up (ascent) shifts grade 8% warmer and lifts audio 2dB — the resurrection direction.
- **On `/wall` and `/colophon`** scroll is normal document flow with `line-rise` reveals triggered at 20% viewport entry; no pinning except the carved-wall's opening register band (100vh sticky candle-lit hero).

---

## 6. CURSOR SYSTEM

- **Form:** the **Sopdet star** — a restrained five-pointed star (8–10px) with a fine 1px gold ring (28px) around it. The ring expands to 44px + gold brightens on interactive hover (`--ease-ritual`, 0.35s); on hold-targets the ring becomes the `hold-ring` progress indicator. At night the star renders `--kemet-moon`; by day `--kemet-gold`.
- **Trail:** 3–5 fading gold grains (world-space particles in the 3D scene; none in DOM) — the cursor is a wind: it disturbs sand, glyph-flow, and plants.
- **On the Veil (pre-awaken):** the cursor is the only light — a faint warm glow (`candle-drift`) at ~50-lux feel against ink.
- **Touch:** cursor hidden; equivalents are touch-glow at contact point + gyro parallax.

---

## 7. SPATIAL AUDIO (design-level spec)

The audio context unlocks **on the awaken touch** — the ritual is the autoplay gesture. Parameters follow **camera state, not time**: what the camera illuminates is what sounds.

| Bus | Content | Behavior |
|---|---|---|
| Ambience | Procedural desert wind (two decorrelated noise voices, LP cutoff LFO 0.1–0.5Hz + bandpass whistle) | Cutoff/gusts follow scroll velocity + fluid field; settles on dwell. Day-forward. |
| Sacred | The Hum (42Hz + 60Hz sines, sub-bass) — "the sound of the kept" | Mapped to user **stillness**: idle 8s → fades in over 5–10s. Night-forward. Never sent to reverb. |
| Material | Sand hiss, stone ticks, chisel one-shots (granular, pitched by glyph x-position) | Fired by interactions: naming carve, plant contact, door proximity. |
| Voice | The Invocation lines + whispered threshold-name fragments | Spoken-register synth/granular fragments, HRTF-panned to the obelisk. |
| UI | Glyph decode ticks (8ms), ring-fill rise, twilight motif | Twilight motif = the state-change marker (distinct per direction: dying sun vs. rising). |
| Space | Convolver per state: open-air (Threshold) → near-anechoic + 6s tail (behind the Sealed Door) | Crossfaded in transitions via dual convolvers. |

**The Verdict silence doctrine:** before the dawn break at the Veil's climax, 0.5s of total silence — silence is the loudest thing in the build. Sound-off toggle lives in the Meridian (a minimal breathing-bars mark).

---

## 8. SHARED CHROME (global components)

Chrome is **zero-weight**: five elements max, auto-hiding, never occluding the akhet composition. All chrome is DOM above one fullscreen canvas.

### 8.1 The Meridian (top bar)
- Left: wordmark lockup — akhet glyph (SVG, 20px) + `KEMET` (`--type-wordmark` scaled to 0.85rem equivalent, bone) with `THE BLACK LAND` in `--type-ui-xs` taupe beneath.
- Center: current-beat placard line (name only, `--type-ui` bone-dim) — e.g. `THE THRESHOLD`.
- Right: sound mark + `COLOPHON` link (`--type-ui-xs`).
- Hairline `--kemet-line` bottom border; height 56px; auto-hide per `rail-hide`.

### 8.2 The Cartouche Rail (right edge, vertical)
- Five realm glyphs stacked vertically (32px box each, 72vh max column): 𓈌 Threshold (active: gold, `text-raise` glow), then 𓌀 Dynasty · 𓊽 Chamber · 𓆓 Weighing · 𓇼 Eternal — sealed (taupe, carved, non-interactive).
- Hover on a sealed glyph: tooltip left — placard micro-format: name + *"the descent opens soon"* (night register). Active glyph hover: `AKHET — YOU ARE HERE`.
- On mobile: collapses to a 4-glyph bottom strip (active + sealed), 44px targets.

### 8.3 The Placard (bottom-left)
- The museum label for the current beat: placard hierarchy (§3.3), max-width 34ch, `--kemet-ink` at 55% + blur(18px) scrim behind text only, hairline top rule with a 12px gold tick.
- Holds the Two Texts: content morphs on twilight (Day↔Night register swap, staggered per character).
- Appears per-beat via `line-rise`; hides with chrome on idle.

### 8.4 The Wedjat Toggle (bottom-right)
- The Eye 𓂀 as custom SVG (six canonical parts). Hold 1.2s → `hold-ring` fills → 4s Twilight → eye inverts (Ra: sun-disk center; Horus: moon-silver).
- First-run tooltip (once, after naming): *"hold to cross"* (`--type-ui-xs`, fades after first use).
- 64px target; on hold, haptic ramp on mobile.

### 8.5 The Sound Mark (in Meridian, right)
- Two-state minimal mark: three vertical bars breathing at 8s cycle (sound on, gold) / flat line (muted, taupe). Tap toggles; tooltip `SOUND — THE DESERT SPEAKS / THE DESERT IS SILENT`.

---

## 9. DAY/NIGHT DUALITY — GLOBAL SYSTEM SUMMARY

| Layer | Day (Eye of Ra) | Night (Eye of Horus) |
|---|---|---|
| Palette | Dawn → Noon → Dusk drift (real elapsed time within day state) | Moonlit Night (E) only |
| Sky | HDR sun, breathing gradients | Silver moon, Imperishable star wheel around a fixed pole |
| Glyphs/text | Carved black, declarations (ALL CAPS Cinzel feel) | Raised gold, confidences (lowercase Cormorant intimacy) |
| Particles | Sand-gold, dense, fast | Star-silver, sparse, slow |
| Audio | Wind-forward | Hum + star-music forward |
| Shadows | Hard, short | Soft, long |
| The one warmth | Everything | The single ember `#C77B3F` (obelisk brazier/cursor touch) |

The toggle is a **ritual**, not a switch: hold-to-cross, 4-second superposition, both registers legible at once. Full choreography in `threshold.md` §6.

---

## 10. LAYOUT, SPACING & GRID

- **World (`/`):** composition is cinematic, not columnar. The akhet sits on the upper-third horizon line; the obelisk on the vertical centerline; placard/chromes on the outer margins (`--site-margin: clamp(1rem, 0.43rem + 2.86vw, 3rem)`). Nothing crosses the sun.
- **Support surfaces:** single column measure **62ch** centered (`--ease` on eyes), register bands full-bleed. 12-col grid available but used only for the colophon credit table (2-col on ≥768px).
- **Spacing scale (4px base):** 4 · 8 · 12 · 16 · 24 · 40 · 64 · 104 · 168. Vertical rhythm on support pages: 104px between register bands, 40px inside placards.
- **Z-order:** canvas (0) → world DOM scrims (10) → ritual overlays (20) → chrome (30) → tooltips/cursor (40). One stacking context; no nested panel-in-panel chrome.

---

## 11. RESPONSIVE & DEVICE TIERS

| Tier | Detection | Experience |
|---|---|---|
| **0 — The Carved Wall** | No WebGL2, `prefers-reduced-motion` opt, or user choice | `/wall` static masterpiece (candle-lit lore). |
| **1 — Minimum Viable Awe** | Weak GPU / small viewport + low memory | DPR ≤1.5, particles ×0.25, no aberration/DOF (twilight keeps aberration), simplified transitions, terrain 4×4 tiles. |
| **2 — Standard** | Mid GPUs, most phones | Reduced texture sizes, bloom ×0.75 internal, bicubic-mip DOF only. |
| **3 — Full** | Desktop discrete/strong integrated | 250k particles, full post chain, adaptive resolution 1→0.7 under pressure. |

- **Mobile:** gyro parallax replaces mouse-look (±6°); swipe = scroll; haptics at ritual beats (8ms glyph / 20ms threshold / 4s twilight ramp / double-pulse at door); sound layers capped at 24 voices.
- **Breakpoints:** `<640px` rail→bottom strip, placard full-width bottom sheet; `640–1024px` placard max-width 30ch; `>1024px` full chrome.
- Budgets (binding): first paint (Veil interactive) <1.5s on 4G; Threshold interactive <3.5s; ≤90 draw calls; ≤1.2M tris; initial JS ≤220KB gzip; audio ≤1.2MB initial.

---

## 12. ACCESSIBILITY

- Full **DOM mirror** of all narrative text (screen-reader navigable, `aria-describedby` per beat; the canvas is `role="img"` with beat descriptions).
- Keyboard path: `Tab` cycles beats/interactives; `Enter` = touch-to-awaken / commit; `Hold Space` 1.2s = wedjat crossing; `M` mute; `Esc` closes ritual overlay.
- Focus: 1px `--kemet-gold-hi` outline, offset 3px, always visible on chrome.
- Contrast: both registers pass WCAG AA (see §2.3).
- The fallback is a feature, not an apology: `/wall` is linked from the Veil footnote (*"the carved wall — for those who travel without light"*).

---

## 13. RESTRAINT PASS (pre-merge acceptance audit)

Every frame audited against: (1) graded strictly from the five palettes; (2) gold as metal in darkness; (3) fog = SKY-H; (4) glyphs real, oriented, captioned; (5) obelisk spec (9–12:1 red granite, electrum pyramidion, first-light event); (6) type lock (3 families, placard hierarchy); (7) symbol canon (djed 4 bars, wedjat six parts, true scarab silhouette, five-pointed Sopdet, slim high-prowed barque); (8) museum lighting (3 layers, 30° accents, ≥2s fades); (9) real material textures; (10) ONE verb per scene + ONE iconic anchor surrounded by dark — the Threshold stages **Khepri becomes / the naming**. If a frame reads Vegas, postcard, or emoji — cut it.

---

## 14. DEPENDENCIES (implementation-facing)

Three.js (WebGL2) · GSAP 3 + ScrollSmoother + ScrollTrigger + SplitText · three-msdf-text-utils (+ msdf-bmfont bake) · GPUComputationRenderer · raw Web Audio API · Tailwind CSS v3.4.19 · React 19 + TS thin shell (BrowserRouter, routes `/`, `/wall`, `/colophon`) · KTX2/Draco asset pipeline · Google Fonts: Cinzel, Cormorant Garamond, Archivo, Noto Sans Egyptian Hieroglyphs. No UI kit; all chrome is bespoke.

---

## 15. ASSETS MANIFEST

> Design manifest only — generation handled by the implementation/scaffold agent. Prefer procedural/WebGL for everything not listed. All raster textures → KTX2; all audio → .opus.

### 15.1 Vector marks (SVG, hand-drawn from New Kingdom exemplars)

| Filename | Description | Location | Type |
|---|---|---|---|
| `glyph-akhet.svg` | The master mark: **full solar disk seated in the valley between two rounded peaks** (rounded, never triangular; disk a complete circle). 1.5px stroke, geometric, balanced. | Wordmark, favicon base, Veil dissolve mask, Sealed Door, OG image | SVG |
| `glyph-wedjat.svg` | Eye of Horus, six canonical parts (brow, pupil, right side, left side, spiral tail, teardrop) with extended cosmetic line; falcon markings. | Wedjat toggle, eye-counter, veil micro-mark | SVG |
| `glyph-djed.svg` | Djed pillar: broad flared base + **four** crisp crossbars. | Cartouche Rail (sealed), carved-wall divider | SVG |
| `glyph-was.svg` | Was-scepter: straight shaft, forked base, animal head. | Cartouche Rail (sealed Dynasty) | SVG |
| `glyph-scarab.svg` | True *Scarabaeus sacer* silhouette (oval, clubbed antennae, notched legs) carrying a **full disk** — never a generic winged bug. | Naming ritual moment, colophon | SVG |
| `glyph-sopdet.svg` | Five-pointed star (restrained, thin stroke) — the cursor star source art. | Cursor, night sky accents, countdown | SVG |
| `glyph-feather.svg` | Ma'at ostrich feather: single slim bilaterally-symmetric feather, clean central shaft. | Cartouche Rail (sealed Weighing), carved-wall divider | SVG |
| `cartouche-ring.svg` | Vertical oval rope ring with horizontal end-bar at base (length ≈ 2.2× height), `trace-fill` ready (single continuous path + bar). | Naming ritual, threshold-name display | SVG |

### 15.2 Generated raster textures (AI image generation, 2K, tile where noted)

| Filename | Description (generation prompt basis) | Location | Dimensions | Type |
|---|---|---|---|---|
| `tex-granite-aswan-2k.jpg` | Polished Aswan red granite surface: deep rose-red feldspar with black/white quartz speckle, subtle tooling marks, museum-raking-light photograph, desaturated, no objects, flat even framing, tileable. | Obelisk material (albedo) | 2048×2048 1:1 | Image |
| `tex-limestone-2k.jpg` | Warm Egyptian limestone wall: granular sandy texture, faint soot-and-salt weathering, chisel ghosts, warm buff tone, raking light, tileable, no carvings. | Sealed Door pylon, carved-wall panels | 2048×2048 1:1 | Image |
| `tex-sand-detail-2k.jpg` | Fine desert sand close-up: uniform rippled grains, warm neutral tone, soft directional light, seamless tile, no footprints/debris. | Terrain triplanar detail layer | 2048×2048 1:1 | Image |
| `tex-papyrus-2k.jpg` | Ancient papyrus sheet: visible cross-fiber grid (horizontal + vertical laminate), warm cream-buff (NOT brown kraft), subtle sheen, deckled edges, blank — no writing. | Ritual input strip, colophon background, carved-wall accents | 2048×1536 4:3 | Image |
| `tex-noise-util-1k.png` | Grayscale fractal value-noise field, seamless tile, full 0–255 range, no banding (RGB channels = 3 independent octaves). | Shader utility (shimmer, dissolve, grain) | 1024×1024 1:1 | Image |

### 15.3 Brand & meta images

| Filename | Description | Location | Dimensions | Type |
|---|---|---|---|---|
| `favicon.svg` | Akhet mark in `--kemet-gold` on transparent; 32px-safe simplification (disk + two peaks, 2px strokes). | Browser chrome | 64×64 viewBox | SVG |
| `og-akhet-dawn.jpg` | The master composition at dawn: low golden sun seated between two dark dune peaks, thin rose band above horizon, obelisk silhouette at right third, deep `#2E3A5C` zenith, haze `#C4B49E`; cinematic, desaturated, ethereal; wordmark "KEMET — THE BLACK LAND" small in lower-left in tracked caps. | Social/OG cards | 1200×630 1.91:1 | Image |

### 15.4 Audio beds (AI audio generation; procedural layers remain primary in-engine)

| Filename | Description | Location | Spec | Type |
|---|---|---|---|---|
| `amb-desert-wind-20s.opus` | Dry desert wind over sand dunes at golden hour: soft continuous grain-hiss, distant air movement, no birds/insects/traffic, gentle slow swells, seamless loop. | Ambience bus (fallback/base layer under procedural wind) | ≤22s seamless loop, 48kHz | Audio |
| `amb-night-hum-30s.opus` | Deep sub-bass temple hum: 40–60Hz fundamental with faint fifth, stone-room stillness, almost subliminal, no melody, seamless loop. | Sacred bus (night fallback layer) | ≤32s seamless loop, 48kHz | Audio |

### 15.5 Optional video (only if it beats in-engine rendering)

| Filename | Description | Location | Dimensions | Type |
|---|---|---|---|---|
| `mirage-her-12s.mp4` *(optional)* | Heat-shimmer mirage: a distant small figure walking out of dunes at golden hour, extreme telephoto, heavy atmospheric haze, backlit silhouette only (no face, no detail), desaturated apricot/blue-violet grade, slow 12s loop. Used **refracted through the mirage shader** as a barely-legible vision ("the desert reading aloud") — never shown as a literal video frame. If it reads as film footage rather than mirage, cut it and keep the procedural mirage. | Threshold mirage layer | 1280×720, ≤4MB, H.264 | Video |

**Explicitly NOT generated:** sandstorm footage, pyramid stock, mummy/sarcophagus imagery, "Egyptian" decorative borders, lens-flare suns, any anthropomorphic character art. The world is rendered, not illustrated.
