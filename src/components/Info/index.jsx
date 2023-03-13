import P from 'prop-types'
import { useState } from 'react'
import './styles.css'

export const Info = ({ isWinner, cardFlips, cardMatchInfo }) => {
  const [infoFlipped, setInfoFlipped] = useState(false)
  const infoContentClassesNames = ['info-content']
  infoFlipped && infoContentClassesNames.push('info-content--flipped')
  return (
    <div className="info-card">
      <div className={infoContentClassesNames.join(' ')}>
        <div
          className="info-face info-face--front"
          onClick={() => setInfoFlipped(true)}
        >
          INFO
        </div>
        <div
          className="info-face info-face--back"
          onClick={() => setInfoFlipped(false)}
        >
          <p>{isWinner ? 'Parabéns' : 'Que pena!!'}</p>
          -=-
          <p>Cartas giradas: {cardFlips} </p>
          <p>Cartas que acertou: {cardMatchInfo} </p>
          -=-
        </div>
      </div>
    </div>
  )
}

Info.propTypes = {
  isWinner: P.bool.isRequired,
  cardFlips: P.number,
  cardMatchInfo: P.number,
}
