import { useEffect, useState } from 'react'
import CapybaraMark from './CapybaraMark'

export type PetActivity = 'walking' | 'resting' | 'eating' | 'sleeping' | 'guiding'

const artwork: Record<PetActivity, [number, number, number, number]> = {
  eating: [45, 105, 455, 515],
  walking: [475, 175, 670, 400],
  resting: [1150, 175, 550, 405],
  sleeping: [1150, 175, 550, 405],
  guiding: [1700, 90, 405, 535],
}

export default function CapybaraPose({ activity }: { activity: PetActivity }) {
  const [failed, setFailed] = useState(false)
  const src = `${import.meta.env.BASE_URL}pet/capybara-character-sheet.png`
  const [x, y, width, height] = artwork[activity]
  const clipId = `capybara-${activity}-crop`

  useEffect(() => setFailed(false), [activity])

  return (
    <span className={`pet-pose is-${activity}`}>
      {failed
        ? <CapybaraMark className="pet-pose-fallback" />
        : <svg viewBox={`${x} ${y} ${width} ${height}`} focusable="false" aria-hidden="true">
            <defs><clipPath id={clipId}><rect x={x} y={y} width={width} height={height} /></clipPath></defs>
            <image href={src} width="2172" height="724" clipPath={`url(#${clipId})`} onError={() => setFailed(true)} />
          </svg>}
      {activity === 'sleeping' && <span className="pet-sleep-marks" aria-hidden="true"><i>Z</i><i>Z</i></span>}
    </span>
  )
}
