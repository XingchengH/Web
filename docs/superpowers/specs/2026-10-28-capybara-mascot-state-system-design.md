# Capybara Mascot State System

Date: 2026-10-28
Status: Approved visual direction; awaiting written-spec review

## Purpose

Replace the current glossy CSS capybara and undersized repeated mark with one coherent hand-drawn mascot system. The mascot should feel like a small companion on the portfolio: visually charming, naturally animated, and useful for guiding visitors without distracting from the work.

## Visual direction

The production character will follow the approved four-pose mockup derived from the user-provided reference image. It will remain an original character rather than a trace of the reference.

All poses share these traits:

- Warm oatmeal body colour.
- Bold, slightly irregular near-black outline.
- Tiny dot eyes and minimal facial marks.
- Flat hand-drawn illustration with restrained internal shading.
- One lavender accent that connects the mascot to the site's palette.
- No glossy clay effect, realistic fur, drop shadow, phone, bandages, or decorative text.

The four poses and their roles are:

1. **Eating:** upright side view holding and nibbling a green leaf.
2. **Roaming:** long, low side view with tiny walking feet.
3. **Resting:** compact curled pose with gently closed eyes; also used for sleep.
4. **Guiding:** upright front-facing pose with a lavender scarf; used while the interaction panel is open.

## Production asset strategy

Use a hybrid asset system.

- The animated pet uses four separately cropped transparent WebP assets under `public/pet/`. Each asset uses a 224 by 152 transparent canvas so it renders crisply at the 112 by 76 CSS-pixel desktop size.
- The repeated inline mark uses a simplified SVG derived from the roaming or resting silhouette. Its outline and palette match the pet, while its geometry is reduced so it remains readable at 12–30 pixels.
- The original generated character sheet is retained as a source/reference asset, while the website loads only the optimized per-pose files.
- All pose images render inside one fixed-size stage with `object-fit: contain`, so switching states never changes layout.

## Behaviour model

The pet has five named activity states:

- `walking`: the roaming pose travels horizontally across the viewport.
- `resting`: the curled pose uses a slow breathing motion.
- `eating`: the leaf pose uses a short head-and-leaf nibble motion.
- `sleeping`: the curled pose breathes more slowly and shows lightweight floating `Z` marks.
- `guiding`: the scarf pose appears while the interaction panel is open.

Only one state may be active at a time. Entering a new state cancels timers from the previous state.

### Route arrival

On each route change:

1. Close the previous guide panel.
2. Place the pet near the left edge in the roaming pose.
3. After 500 ms, walk it to the right resting point over 3.2 seconds.
4. Enter `resting` and open the page-specific guide once.

Reduced-motion visitors skip the travel animation, see the pet at its resting point, and receive the same guide controls.

### Natural idle sequence

After the initial guide is dismissed, the pet rotates through a quiet deterministic sequence:

1. Rest for 7 seconds.
2. Eat for 3.5 seconds.
3. Rest for 8 seconds.
4. Sleep for 5.5 seconds.
5. Rest for 8 seconds.
6. Roam to the opposite side over 3.2 seconds, then repeat.

The sequence pauses while the guide panel is open. It does not use random timing, which keeps behaviour testable and prevents unexpected repeated motion.

## User controls

Clicking the pet opens a compact interaction panel. It contains:

- A short status line reflecting the current state, such as “Resting nearby” or “Enjoying a snack.”
- The existing route-specific page-guide action as the primary button.
- Three secondary actions:
  - **Snack:** enter `eating` for 3.5 seconds, then rest.
  - **Nap:** enter `sleeping` for 5.5 seconds, then rest.
  - **Roam:** close the panel and walk to the opposite side.
- The existing “Hide pet for this visit” control.

Opening the panel changes the character to `guiding`. Closing the panel returns it to the state it had before opening, unless the visitor starts a new action.

The guide action continues to scroll to, focus, and temporarily highlight the most useful element on the current page. It does not activate that element for the visitor.

## Component boundaries

### `CapybaraPet.tsx`

Owns route awareness, position, activity state, state timers, the guide panel, manual actions, and session-level hiding.

### `CapybaraPose.tsx`

Maps each activity to its optimized visual asset and supplies the fixed artwork stage. It contains pose-level decorative elements such as sleep marks but no routing or timing logic.

### `CapybaraMark.tsx`

Owns the reusable inline SVG mark used by the wordmark, page headings, buttons, cards, and decorative stamps.

This split keeps state logic independent from artwork and removes the current duplicated inline icon definition from `App.tsx`.

## Responsive behaviour

- The desktop pet stage is 112 by 76 CSS pixels.
- At 520 pixels and below, the outer stage is 92 by 64 CSS pixels and the artwork scales to 82 percent.
- The interaction panel stays within 16 pixels of either viewport edge and switches its attachment side based on the pet's current position.
- Controls retain a minimum 40-pixel touch target.
- State changes never alter page flow or move surrounding content.

## Accessibility and motion

- Pose artwork is decorative and uses empty alternative text.
- The pet button announces whether the interaction panel is open.
- The state status uses a polite live region without repeatedly announcing automatic idle changes.
- Manual Snack, Nap, and Roam actions announce their resulting state.
- Keyboard focus remains visible on the pet and every panel control.
- With `prefers-reduced-motion`, the automatic idle sequence, roaming, and looping transforms are disabled. Manual state changes still update the pose immediately.
- Hiding the pet remains stored in `sessionStorage` for the current visit only.

## Failure handling

- If a pose asset cannot load, the fixed stage falls back to the simplified SVG mark so the control remains visible and usable.
- If a route guide target is missing, the guide action remains inert and does not throw.
- Timer cleanup runs on state change, route change, hide, and component unmount.

## Validation

Implementation is complete when all of the following pass:

- TypeScript and production Vite build.
- Desktop checks at 1280 pixels and mobile checks at 390 pixels.
- Every manual action enters the intended pose and returns to rest at the specified time.
- The natural sequence runs through eating, sleeping, and roaming without overlapping states.
- Route changes reset the arrival sequence and select the correct guide target.
- The panel remains on-screen at both viewport edges.
- Reduced-motion mode removes travel and looping motion while preserving controls.
- Missing-asset fallback remains clickable.
- No console warnings or errors.
- No layout shift occurs when the pose changes.

## Out of scope

- Sound effects, hunger meters, health systems, collectibles, achievements, or long-term pet progression.
- Dragging the pet freely around the page.
- Saving behaviour or position across visits.
- Additional character costumes beyond the approved lavender scarf.
