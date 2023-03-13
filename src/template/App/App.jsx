import './styles.css'
import { useRef, useState } from 'react'
import { Info } from '../../components/Info'
import { Start } from '../../components/Start'
import { Grid } from '../../components/Grid'
import {
  cardsDataEasy,
  cardsDataHard,
  cardsDataMedium,
} from '../../data/cards/data'

function App() {
  const [nonGame, setNonGame] = useState(true)
  const [levelTime, setLevelTime] = useState(0)
  const [cardFlips, setCardFlips] = useState(0)
  const [cardMatch, setCardMatch] = useState(0)
  const [isWinner, setIsWinner] = useState(false)
  const easyEndGame = useRef(true)
  const mediumEndGame = useRef(true)
  const hardEndGame = useRef(true)

  return (
    <div className="App">
      {nonGame ? (
        <>
          <div className="lobby">
            <Start
              nonGame={nonGame}
              setNonGame={setNonGame}
              isWinner={isWinner}
              setIsWinner={setIsWinner}
              setLevelTime={setLevelTime}
              easyEndGame={easyEndGame}
              mediumEndGame={mediumEndGame}
              hardEndGame={hardEndGame}
            />
            <Info
              isWinner={isWinner}
              cardFlips={cardFlips}
              cardMatch={cardMatch}
            />
          </div>
        </>
      ) : (
        <Grid
          setIsWinner={setIsWinner}
          cardsEasy={cardsDataEasy}
          cardsMedium={cardsDataMedium}
          cardsHard={cardsDataHard}
          setNonGame={setNonGame}
          nonGame={nonGame}
          levelTime={levelTime}
          cardMatch={cardMatch}
          setCardFlips={setCardFlips}
          setCardMatch={setCardMatch}
          easyEndGame={easyEndGame}
          mediumEndGame={mediumEndGame}
          hardEndGame={hardEndGame}
        />
      )}
    </div>
  )
}

export default App
