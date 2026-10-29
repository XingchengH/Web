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

function PoseDetails({ activity, x, y, width, height }: {
  activity: PetActivity
  x: number
  y: number
  width: number
  height: number
}) {
  const normalized = `translate(${x} ${y}) scale(${width / 100} ${height / 100})`

  return (
    <g className={`pet-pose-details is-${activity}`} transform={normalized}>
      {activity === 'eating' && (
        <g className="pet-eating-lines">
          <path d="M82 30l4-3M86 36l5-1M81 41l4 3" />
          <circle cx="76" cy="35" r="1.2" />
        </g>
      )}
      {activity === 'walking' && (
        <g className="pet-walking-dust">
          <circle cx="12" cy="79" r="2.2" />
          <circle cx="19" cy="75" r="1.5" />
          <circle cx="26" cy="80" r="1" />
        </g>
      )}
      {activity === 'resting' && (
        <g className="pet-resting-breath">
          <path d="M21 41c4-3 8-3 12 0" />
          <path d="M25 35c3-2 6-2 9 0" />
        </g>
      )}
      {activity === 'guiding' && (
        <g className="pet-guiding-lines">
          <path d="M83 19l5-4M87 26l7-1M84 33l5 4" />
          <circle cx="78" cy="25" r="1.2" />
        </g>
      )}
    </g>
  )
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
            <g transform={`translate(${x} ${y}) scale(${width / 100} ${height / 100})`}>
              <ellipse className="pet-pose-shadow" cx="50" cy="89" rx="29" ry="3" />
            </g>
            <g clipPath={`url(#${clipId})`}>
              <g className="pet-artwork-layer">
                <image href={src} width="2172" height="724" onError={() => setFailed(true)} />
              </g>
            </g>
            <PoseDetails activity={activity} x={x} y={y} width={width} height={height} />
          </svg>}
      {activity === 'sleeping' && <span className="pet-sleep-marks" aria-hidden="true"><i>Z</i><i>Z</i></span>}
    </span>
  )
}
