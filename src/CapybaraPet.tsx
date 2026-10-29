import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

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
  const [walking, setWalking] = useState(false)
  const [guideOpen, setGuideOpen] = useState(false)
  const [hidden, setHidden] = useState(wasHiddenThisSession)

  useEffect(() => {
    if (hidden) return

    setGuideOpen(false)
    setWalking(false)
    setX(18)
    setFacing('right')

    if (reduced) {
      setGuideOpen(true)
      return
    }

    const start = window.setTimeout(() => {
      setWalking(true)
      setX(rightRestingPoint())
    }, 500)
    const stop = window.setTimeout(() => {
      setWalking(false)
      setGuideOpen(true)
    }, 3750)

    return () => {
      window.clearTimeout(start)
      window.clearTimeout(stop)
    }
  }, [hidden, pathname, reduced])

  useEffect(() => {
    const keepOnScreen = () => {
      setViewportWidth(window.innerWidth)
      setX(current => Math.min(current, rightRestingPoint()))
    }
    window.addEventListener('resize', keepOnScreen)
    return () => window.removeEventListener('resize', keepOnScreen)
  }, [])

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
    setGuideOpen(false)
  }

  function hidePet() {
    setHidden(true)
    try {
      window.sessionStorage.setItem('hide-capybara-pet', 'true')
    } catch {
      // The pet can still be hidden when session storage is unavailable.
    }
  }

  if (hidden) return null

  const onRight = x > viewportWidth / 2

  return (
    <motion.aside
      className={`page-pet${onRight ? ' is-on-right' : ''}`}
      aria-label="Capybara page guide"
      initial={{ opacity: 0, y: 12, x }}
      animate={{ opacity: 1, y: 0, x }}
      transition={{
        x: { duration: walking ? 3.2 : .35, ease: [0.45, 0, 0.2, 1] },
        opacity: { duration: .25 },
        y: { duration: .35 },
      }}
    >
      <AnimatePresence>
        {guideOpen && (
          <motion.div className="pet-guide" role="status"
            initial={{ opacity: 0, y: 8, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 5, scale: .98 }}
            transition={{ duration: .24, ease: 'easeOut' }}>
            <button className="pet-guide-close" type="button" onClick={() => setGuideOpen(false)} aria-label="Close capybara suggestion">×</button>
            <p>{guide.prompt}</p>
            <button className="pet-guide-action" type="button" onClick={guideToTarget}>{guide.action}<span aria-hidden="true">↗</span></button>
            <button className="pet-hide" type="button" onClick={hidePet}>Hide pet for this visit</button>
          </motion.div>
        )}
      </AnimatePresence>

      <button className="pet-character-button" type="button" onClick={() => setGuideOpen(current => !current)}
        aria-label={guideOpen ? 'Close capybara page guide' : 'Open capybara page guide'} aria-expanded={guideOpen}>
        <span className={`pet-model is-facing-${facing}${walking ? ' is-walking' : ' is-resting'}`} aria-hidden="true">
          <span className="pet-ground-shadow" />
          <span className="pet-body"><span className="pet-body-highlight" /></span>
          <span className="pet-leg pet-leg-back" />
          <span className="pet-leg pet-leg-front" />
          <span className="pet-head">
            <span className="pet-ear"><span /></span>
            <span className="pet-eye"><span /></span>
            <span className="pet-muzzle"><span className="pet-nose" /></span>
          </span>
        </span>
      </button>
    </motion.aside>
  )
}
