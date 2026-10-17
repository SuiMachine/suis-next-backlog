import React from 'react'

import styles from '../styles/ScoreIndicator.module.css'

const options = [
  { value: 1, color: '#ff0000' },
  { value: 2, color: '#ff6600' },
  { value: 3, color: '#ff9933' },
  { value: 4, color: '#ffff00' },
  { value: 5, color: '#ccff66' },
  { value: 6, color: '#99ff66' },
  { value: 7, color: '#66ff66' },
  { value: 8, color: '#00ff00' },
  { value: 9, color: '#00ff99' },
  { value: 10, color: '#00ffcc' },
]

const defaultBackgroundColor = 'transparent'

type Props = {
  rating: number | null
}

export const ScoreIndicator = (props: Props) => {
  const { rating } = props

  if (!rating) return null

  return (
    <div className={`${styles.wrapper}`}>
      {Array.from({ length: 20 }, (_, k) => (
        <div
          key={k}
          className={`${styles.sector}`}
          style={{
            transform: `rotate(${(108 + 18 * k) % 360}deg) skew(72deg)`,
            backgroundColor:
              rating >= (k + 1) / 2 ? options[Math.floor(k / 2)].color : defaultBackgroundColor,
          }}
        ></div>
      ))}

      <div className={`${styles.innerCircle}`}>{rating}</div>
    </div>
  )
}
