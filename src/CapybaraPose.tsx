import { useEffect, useState } from 'react'
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

  useEffect(() => setFailed(false), [src])

  return (
    <span className={`pet-pose is-${activity}`}>
      {failed
        ? <CapybaraMark className="pet-pose-fallback" />
        : <img src={src} alt="" onError={() => setFailed(true)} />}
      {activity === 'sleeping' && <span className="pet-sleep-marks" aria-hidden="true"><i>Z</i><i>Z</i></span>}
    </span>
  )
}
