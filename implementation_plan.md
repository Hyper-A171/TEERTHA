# Implementation Plan - Cinematic 3D VR-to-Temple Experience

This plan details how to create and integrate a cinematic 3D WebGL animation for the TEERTHA Digital Spiritual Heritage platform. The animation will start with a VR lens, zoom in to transition to an ancient temple gateway, open the gates to reveal a glowing idol, and ring a resonant temple bell.

## User Review Required

> [!IMPORTANT]
> - We will use the **Stitch MCP server** (`generate_screen_from_text`) to generate a new screen with the base Three.js 3D implementation.
> - We will host this experience on a new page: `experience.php`.
> - The temple bell sound will be dynamically synthesized using the **Web Audio API** (creating a deep, resonant FM synth bell sound). This guarantees instant playback without requiring external audio assets.
> - We will update the main navbar's "Experience Teertha" button and a navigation link to point to this new page.

## Proposed Changes

### Stitch MCP Code Generation
- Call `generate_screen_from_text` on project `5740009570794238277` to generate the cinematic 3D animation screen.
- Download the generated HTML/JS using `get_screen` and `read_url_content`.

---

### Teertha Website Codebase

#### [NEW] [experience.php](file:///c:/xampp/htdocs/teertha-website/experience.php)
- Create a new PHP page integrating the generated Three.js cinematic code.
- Refine the Three.js scenes:
  1. **Scene 1 (VR Lens):** A close-up of a glossy VR lens reflecting a soft divine light.
  2. **Transition:** Camera flies into the lens. We fade/transition the viewport.
  3. **Scene 2 (Temple Gate):** An ancient stone gateway with "TEERTHA" engraved on the lintel.
  4. **Animation:** Massive wooden doors swing open as the camera approaches.
  5. **Scene 3 (Temple Sanctum & Idol):** Divine light rays (volumetric light shafts / particle systems) spilling out, revealing a beautifully decorated idol.
  6. **Audio/Bell Trigger:** When the camera reaches the idol, trigger the Web Audio API bell synthesizer.
- Include floating particle systems (dust/embers) to create a spiritual, immersive atmosphere.

#### [MODIFY] [header.php](file:///c:/xampp/htdocs/teertha-website/includes/header.php)
- Add "Experience" to the navbar links list.
- Point the "Experience Teertha" CTA button to `experience.php` instead of `partner.php`.

#### [MODIFY] [index.php](file:///c:/xampp/htdocs/teertha-website/index.php)
- Update the primary CTA "Explore Temples" or "Experience Teertha" buttons to direct users to the new `experience.php` page.

---

## Verification Plan

### Automated/Local Server Verification
- Launch the PHP server locally using the existing setup or a PHP command.
- Open the page `http://localhost/teertha-website/experience.php` (or equivalent workspace path).

### Manual Verification (Browser Subagent)
- Use `browser_subagent` to navigate to the experience page.
- Capture a video recording of the animation to verify:
  1. Smooth camera movement into the VR lens.
  2. Transition to the temple gate with "TEERTHA" text.
  3. Opening of the doors, spilling of light, and revealing of the idol.
  4. Ambient particle effects and lighting quality.
