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
      /* validar selecionar a carta */

      if (card.id != id) return card

      /* virar a carta selecionada * em geral * */

      card.flipped = true

      /* tratar erro de selecionar uma carta já ganha */

      if (card.matched) {
        console.log('ERRO: carta já ganha selecionada: selecione outra!')
        return card
      }

      /* tratar cartas não iguais */

      if (unflip.current && first.current && second.current) {
        if (card == first.current) {
          first.current == card
        } else {
          first.current.flipped = false
        }
        if (card == second.current) {
          second.current == card
        } else {
          second.current.flipped = false
        }
        /* resetando valores */
        first.current = null
        second.current = null
        unflip.current = false
      }

      /* atribuindo valor ao first.current */

      if (first.current == null) {
        first.current = card
        console.log('first', first.current)

        /* atribuindo valor ao second.current */
      } else if (second.current == null) {
        second.current = card
        console.log('second', second.current)

        /* não deixar a pessoa selecionar
        exatamente a mesma carta */

        if (first.current.id == second.current.id) {
          second.current = null
          console.log(
            'selecionado a mesma carta, reinciando o second.current...',
          )

          /* uma vez que os devidos valores do
            first.current e second.current foram
            validados, o código abaixo será lido */

          /* codando o acerto */
        } else if (first.current.back == second.current.back) {
          console.log('ACERTOU')

          /* tratar bug de selecionar a carta já acertada;
          adicionando um novo valor 'matched'
          para tratar o erro e deixar as cartas
          com matched true, indisponíveis */

          first.current.matched = true
          second.current.matched = true

          /* reiniciando os valores first e 
          second.current */
          first.current = null
          second.current = null
          /* setando estados para informações na tela
          e para conferência ao fim do jogo */
          setCardMatchInfo((c) => c + 1)
          setCardMatch((c) => c + 1)
          console.log(cardMatch)
          /* chamando a função localizada no card.utils
          que irá acabar o jogo se a pessoa acertar todas
          as cartas */
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
          /* mudando a o ref(true) do unflip
          para assim a o if lá encima ser lido
          para tratar o erro de cartas */
          console.log('ERROU')
          unflip.current = true
        }
        /* setando cartas viradas ao total
        para informações ao usuário */
        setCardFlips((c) => c + 1)
      }

      return card
    })

    /* fim do handleclick */

    /* setando as cartas pela dificuldade */

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
  setCardMatchInfo: P.func,
  setNonGame: P.func,
  cardMatch: P.number,
  setIsWinner: P.func,
  easyEndGame: P.any,
  mediumEndGame: P.any,
  hardEndGame: P.any,
  setEndGame: P.func,
}
