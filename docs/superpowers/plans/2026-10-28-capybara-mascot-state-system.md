# Capybara Mascot State System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current CSS-built capybara with the approved four-pose hand-drawn mascot, add natural automatic states and visitor controls, and unify every repeated capybara mark.

**Architecture:** A single transparent character sheet supplies four pose-specific SVG crop wrappers. `CapybaraPose` owns artwork selection and fallback, `CapybaraMark` owns the small inline vector, and `CapybaraPet` owns the route-aware state machine and interaction panel. A fixed pose stage and transform-only animations prevent layout shift.

**Tech Stack:** React 19, TypeScript 5.9, Motion 14, CSS, Vite, GitHub Pages

---

## File structure

- Create `public/pet/capybara-character-sheet.png`: approved source character sheet.
- Create `public/pet/capybara-eating.svg`: crop wrapper for the upright leaf pose.
- Create `public/pet/capybara-walking.svg`: crop wrapper for the low roaming pose.
- Create `public/pet/capybara-resting.svg`: crop wrapper for the curled pose.
- Create `public/pet/capybara-guiding.svg`: crop wrapper for the scarf pose.
- Create `src/CapybaraMark.tsx`: reusable simplified inline mark and fallback artwork.
- Create `src/CapybaraPose.tsx`: activity-to-artwork mapping and image failure handling.
- Modify `src/CapybaraPet.tsx`: state machine, automatic sequence, manual actions, and accessible announcements.
- Modify `src/App.tsx`: import the shared mark and remove the local mark function.
- Modify `src/styles.css`: mark styling, fixed pet stage, pose animations, sleep marks, and action panel.

### Task 1: Add the four-pose artwork assets

**Files:**
- Create: `public/pet/capybara-character-sheet.png`
- Create: `public/pet/capybara-eating.svg`
- Create: `public/pet/capybara-walking.svg`
- Create: `public/pet/capybara-resting.svg`
- Create: `public/pet/capybara-guiding.svg`

- [ ] **Step 1: Copy the approved source sheet into the project**

Run:

```bash
mkdir -p public/pet
cp /Users/vincenthuang/.codex/generated_images/01a18490-61ab-7cb1-8bea-ccff7258f5e5/exec-e2665a32-6ec5-447e-a950-a5eaf5f2165d.png public/pet/capybara-character-sheet.png
```

Expected: `file public/pet/capybara-character-sheet.png` reports a 2172 by 724 RGBA PNG.

- [ ] **Step 2: Add pose-specific SVG crop wrappers**

Each wrapper uses the same cached source image and a pose-specific viewBox. Example for walking:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="475 175 670 400">
  <image href="capybara-character-sheet.png" width="2172" height="724" />
</svg>
```

Use these viewBoxes:

```text
eating:  45 105 455 515
walking: 475 175 670 400
resting: 1090 175 610 405
guiding: 1650 90 455 535
```

- [ ] **Step 3: Verify all assets load**

Run:

```bash
npm run build
```

Expected: Vite build succeeds and copies `public/pet/` into `dist/pet/`.

- [ ] **Step 4: Commit the asset set**

```bash
git add public/pet
git commit -m "Add hand-drawn capybara pose assets"
```

### Task 2: Create shared artwork components

**Files:**
- Create: `src/CapybaraMark.tsx`
- Create: `src/CapybaraPose.tsx`
- Modify: `src/App.tsx:20-35`
- Modify: `src/styles.css:39-48`

- [ ] **Step 1: Create the shared inline mark**

`CapybaraMark.tsx` exports a component with an optional `className`. Its SVG uses a low hand-drawn side silhouette, oatmeal fill, near-black 2.2-pixel outline, a dot eye, tiny ear, nose, and two short leg strokes. It must keep `aria-hidden="true"` because every occurrence is decorative.

```tsx
export default function CapybaraMark({ className = '' }: { className?: string }) {
  return (
    <span className={`capybara-mark ${className}`} aria-hidden="true">
      <svg viewBox="0 0 70 42" focusable="false">
        <path className="capybara-mark-body" d="M4 27C4 17 12 10 23 10c8 0 14 3 20 3 4 0 6-4 11-4 8 0 13 7 13 15 0 8-7 12-16 12H17C9 36 4 33 4 27Z" />
        <circle className="capybara-mark-ear" cx="54" cy="10" r="4" />
        <circle className="capybara-mark-eye" cx="59" cy="17" r="1.6" />
        <circle className="capybara-mark-nose" cx="66" cy="24" r="1.8" />
        <path className="capybara-mark-line" d="M15 33v6m24-6v6m25-10c-3 1-6 1-9 0" />
      </svg>
    </span>
  )
}
```

- [ ] **Step 2: Create the pose selector and fallback**

`CapybaraPose.tsx` defines the shared activity type and maps states to assets:

```tsx
import { useState } from 'react'
import CapybaraMark from './CapybaraMark'

export type PetActivity = 'walking' | 'resting' | 'eating' | 'sleeping' | 'guiding'

const artwork: Record<PetActivity, string> = {
  walking: 'capybara-walking.svg',
  resting: 'capybara-resting.svg',
  eating: 'capybara-eating.svg',
  sleeping: 'capybara-resting.svg',
  guiding: 'capybara-guiding.svg',
}

export default function CapybaraPose({ activity }: { activity: PetActivity }) {
  const [failed, setFailed] = useState(false)
  const src = `${import.meta.env.BASE_URL}pet/${artwork[activity]}`
  return (
    <span className={`pet-pose is-${activity}`}>
      {failed ? <CapybaraMark className="pet-pose-fallback" /> : <img src={src} alt="" onError={() => setFailed(true)} />}
      {activity === 'sleeping' && <span className="pet-sleep-marks" aria-hidden="true"><i>Z</i><i>Z</i></span>}
    </span>
  )
}
```

- [ ] **Step 3: Replace the local mark in `App.tsx`**

Import `CapybaraMark`, remove the local `Capybara` function, and replace all `<Capybara />` calls with `<CapybaraMark />`.

- [ ] **Step 4: Add mark and fixed-stage CSS**

Replace the existing `.capybara-*` selectors with selectors for `.capybara-mark-body`, `.capybara-mark-ear`, `.capybara-mark-eye`, `.capybara-mark-nose`, and `.capybara-mark-line`. Add `.pet-pose` as a fixed absolute stage and set its image to `width:100%; height:100%; object-fit:contain`.

- [ ] **Step 5: Verify and commit**

Run `npm run build`. Expected: TypeScript and Vite succeed.

```bash
git add src/App.tsx src/CapybaraMark.tsx src/CapybaraPose.tsx src/styles.css
git commit -m "Unify capybara artwork components"
```

### Task 3: Implement the pet activity state machine

**Files:**
- Modify: `src/CapybaraPet.tsx`

- [ ] **Step 1: Replace the walking boolean with `PetActivity`**

Import `CapybaraPose` and `PetActivity`. Add these state values and refs:

```tsx
const [activity, setActivity] = useState<PetActivity>('resting')
const [idleEnabled, setIdleEnabled] = useState(false)
const [idleStep, setIdleStep] = useState(0)
const [announcement, setAnnouncement] = useState('')
const positionRef = useRef(18)
const manualTimerRef = useRef<number | undefined>(undefined)
```

Define the deterministic idle sequence:

```tsx
const idleSequence: Array<{ activity: PetActivity; duration: number }> = [
  { activity: 'resting', duration: 7000 },
  { activity: 'eating', duration: 3500 },
  { activity: 'resting', duration: 8000 },
  { activity: 'sleeping', duration: 5500 },
  { activity: 'resting', duration: 8000 },
  { activity: 'walking', duration: 3200 },
]
```

- [ ] **Step 2: Add timer-safe state helpers**

Implement `movePet`, `startManualActivity`, and `roam`. Every helper clears `manualTimerRef.current` before starting a new timer. `roam` chooses `18` or `rightRestingPoint()` based on `positionRef.current`, updates `facing`, moves the pet, and returns to `resting` after 3.2 seconds.

Add an unmount cleanup for the manual timer:

```tsx
useEffect(() => () => window.clearTimeout(manualTimerRef.current), [])
```

- [ ] **Step 3: Implement route arrival**

On route change, disable idle behaviour, reset the pet to the left, start walking after 500 ms, then rest and open the guide after 3.75 seconds. Reduced-motion users move directly to the right resting point without travel.

- [ ] **Step 4: Implement the automatic idle effect**

When `idleEnabled`, not reduced, not hidden, and the guide is closed, apply `idleSequence[idleStep]`. Advance to the next step after its duration. For the walking step, call `movePet` toward the opposite edge. Clean up its timer on every dependency change.

- [ ] **Step 5: Render pose artwork instead of CSS body parts**

Use:

```tsx
const displayedActivity: PetActivity = guideOpen ? 'guiding' : activity

<span className={`pet-model is-facing-${facing} is-${displayedActivity}`} aria-hidden="true">
  <CapybaraPose activity={displayedActivity} />
</span>
```

The Motion `x` duration is 3.2 seconds only while `activity === 'walking'`.

- [ ] **Step 6: Build and commit**

Run `npm run build`. Expected: no TypeScript errors.

```bash
git add src/CapybaraPet.tsx
git commit -m "Add natural capybara activity states"
```

### Task 4: Add functional pet controls

**Files:**
- Modify: `src/CapybaraPet.tsx`
- Modify: `src/styles.css:333-380`

- [ ] **Step 1: Add status text and accessible announcements**

Map activities to visible status text. Render a non-live visible status and a separate `.sr-only` polite live region for manual actions.

```tsx
const statusText: Record<PetActivity, string> = {
  walking: 'Exploring this page',
  resting: 'Resting nearby',
  eating: 'Enjoying a snack',
  sleeping: 'Taking a tiny nap',
  guiding: 'Ready to help',
}
```

- [ ] **Step 2: Add Snack, Nap, and Roam buttons**

Below the primary page-guide button, render:

```tsx
<div className="pet-actions" aria-label="Capybara actions">
  <button type="button" onClick={() => startManualActivity('eating', 3500, 'Snack time')}>Snack</button>
  <button type="button" onClick={() => startManualActivity('sleeping', 5500, 'Nap time')}>Nap</button>
  <button type="button" onClick={roam}>Roam</button>
</div>
```

Each action closes the panel. Closing the panel or completing a page-guide action enables the idle sequence.

- [ ] **Step 3: Replace old model CSS with pose animations**

Delete `.pet-body`, `.pet-head`, `.pet-ear`, `.pet-eye`, `.pet-muzzle`, `.pet-nose`, and `.pet-leg` rules. Add transform-only keyframes:

```css
.pet-model.is-resting .pet-pose img { animation: pet-rest 3.2s ease-in-out infinite; }
.pet-model.is-eating .pet-pose img { animation: pet-nibble .5s ease-in-out infinite alternate; }
.pet-model.is-sleeping .pet-pose img { animation: pet-sleep 4s ease-in-out infinite; }
.pet-model.is-guiding .pet-pose img { animation: pet-guide-sway 2.4s ease-in-out infinite; }
.pet-sleep-marks i { animation: pet-dream 2.3s ease-out infinite; }
```

- [ ] **Step 4: Style the action controls responsively**

Use a three-column `.pet-actions` grid. Each button has a 40-pixel minimum height, 8-pixel radius, and a visible focus state. Keep the existing panel within 16 pixels of viewport edges.

- [ ] **Step 5: Verify reduced motion and commit**

Add `.pet-pose img, .pet-sleep-marks i { animation:none !important; }` inside the existing reduced-motion query.

Run `npm run build`, then commit:

```bash
git add src/CapybaraPet.tsx src/styles.css
git commit -m "Add interactive capybara controls"
```

### Task 5: Browser verification and production deployment

**Files:**
- Modify only if verification reveals a defect.

- [ ] **Step 1: Verify desktop behaviour**

Run `npm run dev -- --host 127.0.0.1`. At a 1280 by 900 viewport verify arrival walk, guide pose, Snack, Nap, Roam, guide targeting, hide, and panel attachment on both sides.

- [ ] **Step 2: Verify mobile behaviour**

At 390 by 844 verify the 92 by 64 stage, all 40-pixel controls, panel containment, pose changes without layout shift, and no horizontal overflow.

- [ ] **Step 3: Verify automatic states and console output**

Close the guide and observe one full idle cycle. Verify the sequence is rest → eat → rest → sleep → rest → roam, with one active state at a time and no console warnings or errors.

- [ ] **Step 4: Verify the missing-asset fallback**

Temporarily rename one local pose wrapper, reload, confirm the inline mark remains clickable, then restore the wrapper before committing.

- [ ] **Step 5: Run final checks**

```bash
npm run build
git diff --check
```

Expected: successful build and no whitespace errors.

- [ ] **Step 6: Integrate and deploy**

Push `dev`, fast-forward `main`, run a fresh production build on `main`, push `main`, wait for the GitHub Pages action to succeed, verify the cache-busted live URL, and return the workspace to `dev`.
