import P from 'prop-types'
import { useState } from 'react'
import { levelChoose } from '../../utils/card-utils'
import './styles.css'

export const Start = ({
  setLevelTime,
  setNonGame,
  setCardMatch,
  easyEndGame,
  mediumEndGame,
  hardEndGame,
  setEndGame,
}) => {
  const [flipped, setFlipped] = useState(false)
  const startContentClassesNames = ['start-content']

  flipped && startContentClassesNames.push('card-content--flipped')
  const handleStart = () => {
    setFlipped(true)
  }

  return (
    <div className="start-card">
      <div className={startContentClassesNames.join(' ')}>
        <button className="start-face start-face--front" onClick={handleStart}>
          START
        </button>
        <div className="start-face start-face--back">
          <button
            onClick={() =>
              levelChoose(
                'easy',
                setLevelTime,
                setNonGame,
                setCardMatch,
                easyEndGame,
                setEndGame,
              )
            }
          >
            EASY
          </button>
          <button
            onClick={() =>
              levelChoose(
                'medium',
                setLevelTime,
                setNonGame,
                setCardMatch,
                mediumEndGame,
                setEndGame,
              )
            }
          >
            MEDIUM
          </button>
          <button
            onClick={() =>
              levelChoose(
                'hard',
                setLevelTime,
                setNonGame,
                setCardMatch,
                hardEndGame,
                setEndGame,
              )
            }
          >
            HARD
          </button>
        </div>
      </div>
    </div>
  )
}

Start.propTypes = {
  setNonGame: P.func,
  setLevelTime: P.func,
  isWinner: P.bool,
  easyEndGame: P.any,
  mediumEndGame: P.any,
  hardEndGame: P.any,
  setCardMatch: P.func,
  setEndGame: P.func,
}
