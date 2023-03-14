import P from 'prop-types'
import { useRef, useState } from 'react'
import { duplicateSortArray, endGame } from '../../utils/card-utils'
import { Card } from '../Card'
import { GridDiv } from './styles.js'
import { TimerLine } from './TimerLine/styles'

export const Grid = ({
  cardsEasy,
  cardsMedium,
  cardsHard,
  levelTime,
  setCardFlips,
  setCardMatch,
  setCardMatchInfo,
  setNonGame,
  cardMatch,
  setIsWinner,
  easyEndGame,
  mediumEndGame,
  hardEndGame,
  cardMatchInfo,
  setEndGame,
}) => {
  const first = useRef()
  const second = useRef()
  const unflip = useRef(false)
  const [levelEndGame, setLevelEndGame] = useState('')
  const [stateCards, setStateCards] = useState(() => {
    switch (levelTime) {
      case 30: {
        setLevelEndGame('easy')
        return duplicateSortArray(cardsEasy)
      }
      case 60: {
        setLevelEndGame('medium')
        return duplicateSortArray(cardsMedium)
      }
      case 120: {
        setLevelEndGame('hard')
        return duplicateSortArray(cardsHard)
      }
    }
  })

  const handleClick = (id) => {
    const newStateCards = stateCards.map((card) => {
      if (card.id != id) return card

      if (card.flipped) {
        if (first.current || second.current) {
          return card
        }
      }

      card.flipped = true

      if (unflip.current && first.current && second.current) {
        first.current.flipped = false
        second.current.flipped = false
        first.current = null
        second.current = null
        unflip.current = false
      }

      if (first.current == null) {
        first.current = card
        console.log('first', first.current)
      } else if (second.current == null) {
        second.current = card
        console.log('second', second.current)
        if (first.current.back == second.current.back) {
          setCardMatchInfo((c) => c + 1)
          console.log(cardMatchInfo)
          console.log('ACERTOU')
          console.log('statecards', stateCards)
          first.current = null
          second.current = null
          setCardMatch((c) => c + 1)
          console.log(cardMatch)
          endGame(
            levelEndGame,
            setNonGame,
            cardMatch,
            setIsWinner,
            easyEndGame,
            mediumEndGame,
            hardEndGame,
            setEndGame,
          )
        } else {
          console.log('ERROU')
          unflip.current = true
        }
        setCardFlips((c) => c + 1)
      }

      return card
    })

    setStateCards(newStateCards)
  }

  return (
    <>
      <TimerLine levelTime={levelTime} />
      <GridDiv level={levelEndGame}>
        {stateCards.map((card) => {
          return (
            <Card
              {...card}
              key={card.id}
              handleClick={() => handleClick(card.id)}
            />
          )
        })}
      </GridDiv>
    </>
  )
}

Grid.propTypes = {
  map: P.func,
  cardsEasy: P.array,
  cardsMedium: P.array,
  cardsHard: P.array,
  countDown: P.number,
  levelTime: P.number,
  setCardFlips: P.func,
  setCardMatch: P.func,
  setNonGame: P.func,
  cardMatch: P.number,
  setIsWinner: P.func,
  easyEndGame: P.any,
  mediumEndGame: P.any,
  hardEndGame: P.any,
  setCardMatchInfo: P.func,
  cardMatchInfo: P.number,
  setEndGame: P.func,
}
