import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import CapybaraPose, { type PetActivity } from './CapybaraPose'

const guides: Record<string, { selector: string; prompt: string; action: string }> = {
  '/': {
    selector: '.hero-actions .button-primary',
    prompt: 'Want the quickest introduction?',
    action: 'Show the experience button',
  },
  '/experience': {
    selector: '.experience-resume',
    prompt: 'The complete story is one click away.',
    action: 'Show the résumé link',
  },
  '/work': {
    selector: '.project-choice:nth-of-type(2)',
    prompt: 'There is another project waiting here.',
    action: 'Show the music project',
  },
  '/about': {
    selector: '.interest-controls button:last-child',
    prompt: 'There is more to Vincent than code.',
    action: 'Show the reading switch',
  },
  '/contact': {
    selector: '.contact-primary',
    prompt: 'Ready to start a conversation?',
    action: 'Show the email button',
  },
}

const idleSequence: Array<{ activity: PetActivity; duration: number }> = [
  { activity: 'resting', duration: 7000 },
  { activity: 'eating', duration: 3500 },
  { activity: 'resting', duration: 8000 },
  { activity: 'sleeping', duration: 5500 },
  { activity: 'resting', duration: 8000 },
  { activity: 'walking', duration: 3200 },
]

const statusText: Record<PetActivity, string> = {
  walking: 'Exploring this page',
  resting: 'Resting nearby',
  eating: 'Enjoying a snack',
  sleeping: 'Taking a tiny nap',
  guiding: 'Ready to help',
}

function wasHiddenThisSession() {
  try {
    return window.sessionStorage.getItem('hide-capybara-pet') === 'true'
  } catch {
    return false
  }
}

function rightRestingPoint() {
  const petWidth = window.innerWidth <= 520 ? 96 : 118
  return Math.max(18, window.innerWidth - petWidth - 18)
}

export default function CapybaraPet() {
  const { pathname } = useLocation()
  const reduced = Boolean(useReducedMotion())
  const guide = guides[pathname] ?? guides['/']
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth)
  const [x, setX] = useState(18)
  const [facing, setFacing] = useState<'left' | 'right'>('right')
  const [activity, setActivity] = useState<PetActivity>('resting')
  const [idleEnabled, setIdleEnabled] = useState(false)
  const [idleStep, setIdleStep] = useState(0)
  const [guideOpen, setGuideOpen] = useState(false)
  const [announcement, setAnnouncement] = useState('')
  const [hidden, setHidden] = useState(wasHiddenThisSession)
  const positionRef = useRef(18)
  const manualTimerRef = useRef<number | undefined>(undefined)

  function clearManualTimer() {
    if (manualTimerRef.current !== undefined) {
      window.clearTimeout(manualTimerRef.current)
      manualTimerRef.current = undefined
    }
  }

  function movePet(destination: number) {
    setFacing(destination < positionRef.current ? 'left' : 'right')
    positionRef.current = destination
    setX(destination)
  }

  function resumeIdle() {
    setActivity('resting')
    setIdleStep(0)
    setIdleEnabled(!reduced)
  }

  function startManualActivity(next: PetActivity, duration: number, message: string) {
    clearManualTimer()
    setGuideOpen(false)
    setIdleEnabled(false)
    setActivity(next)
    setAnnouncement(message)
    manualTimerRef.current = window.setTimeout(() => {
      manualTimerRef.current = undefined
      resumeIdle()
      setAnnouncement('Capybara is resting again')
    }, duration)
  }

  function roam() {
    clearManualTimer()
    setGuideOpen(false)
    setIdleEnabled(false)
    setActivity('walking')
    setAnnouncement('Capybara is roaming')
    const destination = positionRef.current > viewportWidth / 2 ? 18 : rightRestingPoint()
    movePet(destination)
    manualTimerRef.current = window.setTimeout(() => {
      manualTimerRef.current = undefined
      resumeIdle()
      setAnnouncement('Capybara finished roaming')
    }, 3200)
  }

  useEffect(() => {
    if (hidden) return

    clearManualTimer()
    setGuideOpen(false)
    setIdleEnabled(false)
    setIdleStep(0)
    setActivity('resting')
    positionRef.current = 18
    setX(18)
    setFacing('right')
    setAnnouncement('')

    if (reduced) {
      const destination = rightRestingPoint()
      positionRef.current = destination
      setX(destination)
      setGuideOpen(true)
      return
    }

    const start = window.setTimeout(() => {
      setActivity('walking')
      movePet(rightRestingPoint())
    }, 500)
    const stop = window.setTimeout(() => {
      setActivity('resting')
      setGuideOpen(true)
    }, 3750)

    return () => {
      window.clearTimeout(start)
      window.clearTimeout(stop)
    }
  }, [hidden, pathname, reduced])

  useEffect(() => {
    if (!idleEnabled || reduced || hidden || guideOpen) return

    const step = idleSequence[idleStep]
    setActivity(step.activity)
    if (step.activity === 'walking') {
      const destination = positionRef.current > window.innerWidth / 2 ? 18 : rightRestingPoint()
      movePet(destination)
    }

    const timer = window.setTimeout(() => {
      setIdleStep(current => (current + 1) % idleSequence.length)
    }, step.duration)
    return () => window.clearTimeout(timer)
  }, [guideOpen, hidden, idleEnabled, idleStep, reduced])

  useEffect(() => {
    const keepOnScreen = () => {
      const maxX = rightRestingPoint()
      setViewportWidth(window.innerWidth)
      if (positionRef.current > maxX) {
        positionRef.current = maxX
        setX(maxX)
      }
    }
    window.addEventListener('resize', keepOnScreen)
    return () => window.removeEventListener('resize', keepOnScreen)
  }, [])

  useEffect(() => () => clearManualTimer(), [])

  function closeGuide() {
    setGuideOpen(false)
    setIdleEnabled(!reduced)
  }

  function guideToTarget() {
    const target = document.querySelector<HTMLElement>(guide.selector)
    if (!target) return

    target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' })
    const focusDelay = reduced ? 0 : 550
    window.setTimeout(() => {
      target.focus({ preventScroll: true })
      target.classList.add('pet-guided-target')
      window.setTimeout(() => target.classList.remove('pet-guided-target'), 1800)
    }, focusDelay)
    closeGuide()
  }

  function hidePet() {
    clearManualTimer()
    setHidden(true)
    try {
      window.sessionStorage.setItem('hide-capybara-pet', 'true')
    } catch {
      // The pet can still be hidden when session storage is unavailable.
    }
  }

  if (hidden) return null

  const onRight = x > viewportWidth / 2
  const displayedActivity: PetActivity = guideOpen ? 'guiding' : activity
  const walking = activity === 'walking' && !guideOpen

  return (
    <motion.aside
      className={`page-pet${onRight ? ' is-on-right' : ''}`}
      aria-label="Capybara page guide"
      initial={{ opacity: 0, y: 12, x }}
      animate={{ opacity: 1, y: 0, x }}
      transition={{
        x: { duration: walking && !reduced ? 3.2 : 0, ease: [0.45, 0, 0.2, 1] },
        opacity: { duration: .25 },
        y: { duration: .35 },
      }}
    >
      <span className="sr-only" aria-live="polite">{announcement}</span>
      <AnimatePresence>
        {guideOpen && (
          <motion.div className="pet-guide"
            initial={{ opacity: 0, y: 8, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 5, scale: .98 }}
            transition={{ duration: .24, ease: 'easeOut' }}>
            <button className="pet-guide-close" type="button" onClick={closeGuide} aria-label="Close capybara suggestion">×</button>
            <div className="pet-guide-status"><span aria-hidden="true" />{statusText[displayedActivity]}</div>
            <p>{guide.prompt}</p>
            <button className="pet-guide-action" type="button" onClick={guideToTarget}>{guide.action}<span aria-hidden="true">↗</span></button>
            <div className="pet-actions" aria-label="Capybara actions">
              <button type="button" onClick={() => startManualActivity('eating', 3500, 'Snack time')}>Snack</button>
              <button type="button" onClick={() => startManualActivity('sleeping', 5500, 'Nap time')}>Nap</button>
              <button type="button" onClick={roam}>Roam</button>
            </div>
            <button className="pet-hide" type="button" onClick={hidePet}>Hide pet for this visit</button>
          </motion.div>
        )}
      </AnimatePresence>

      <button className="pet-character-button" type="button"
        onClick={() => guideOpen ? closeGuide() : setGuideOpen(true)}
        aria-label={guideOpen ? 'Close capybara page guide' : `Open capybara page guide. ${statusText[activity]}`}
        aria-expanded={guideOpen}>
        <span className={`pet-model is-facing-${facing} is-${displayedActivity}`} aria-hidden="true">
          <CapybaraPose activity={displayedActivity} />
        </span>
      </button>
    </motion.aside>
  )
}
