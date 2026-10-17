import React, { useState } from 'react'

import styles from '../styles/Rating.module.css'

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

type Props = {
  rating: number | null
  setRating: (r: number) => void
}

export const Rating = (props: Props) => {
  const { rating, setRating } = props
  const [hoveredRating, setHoveredRating] = useState<number | null>(null)
  const shownRating = hoveredRating ?? rating

  return (
    <div className={styles.ratings} onMouseLeave={() => setHoveredRating(null)}>
      {options.map((x) => {
        const isHalfShown = shownRating === x.value - 0.5 && x.value > 1
        let selectStatus
        switch (true) {
          case x.value === shownRating || isHalfShown:
            selectStatus = `selectedRating ${styles.selected}`
            break
          case shownRating && x.value > shownRating:
            selectStatus = styles.tooBig
            break
          case shownRating === null:
            selectStatus = ''
            break

          default:
            selectStatus = styles.notSelected
            break
        }
        return (
          <div
            key={x.value}
            className={`ratingBox ${styles.ratingBox} ${selectStatus}`}
            style={{ backgroundColor: x.color }}
            onClick={() => setRating(x.value)}
            onMouseEnter={() => setHoveredRating(x.value)}
          >
            {isHalfShown ? x.value - 0.5 : x.value}
            {isHalfShown && <div className={styles.dimmedHalf} />}
            {x.value > 1 && (
              <div
                className={styles.half}
                onMouseEnter={() => setHoveredRating(x.value - 0.5)}
                onMouseLeave={() => setHoveredRating(x.value)}
                onClick={(e) => {
                  e.stopPropagation()
                  setRating(x.value - 0.5)
                }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
