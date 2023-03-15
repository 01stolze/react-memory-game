/* função para gerar id's (children n podem ter o mesmo keyid) */

const keyGen = () => {
  return (
    Math.random().toString(12).substring(2, 8) +
    Math.random().toString(12).substring(2, 8)
  )
}

const regenarateId = (array) => {
  return array.map((card) => ({ ...card, id: keyGen() }))
}

/* função para duplicar os cards */

export const duplicateArray = (array) => {
  return [...array, ...array]
}

/* função para sortear/embaraçar os cards */

export const sortArray = (array) => {
  return array.sort(() => Math.random() - 0.5)
}

/* função "final" juntando o duplicate e sortArray */

export const duplicateSortArray = (array) => {
  return sortArray(regenarateId(duplicateArray(array)))
}

/* criar função para escolha de dificuldade */

export const levelChoose = (
  level,
  setLevelTime,
  setNonGame,
  setCardMatch,
  levelEndGame,
  setEndGame,
  setIsWinner,
) => {
  switch (level) {
    case 'easy': {
      console.log('Easy level selected!')
      setEndGame(false)
      setCardMatch(0)
      setLevelTime(30)
      setNonGame(false)
      setTimeout(() => {
        console.log(levelEndGame.current)
        if (levelEndGame.current == true) {
          setNonGame(true)
          setIsWinner(false)
          setEndGame(true)
        } else {
          levelEndGame.current = true
        }
      }, 30000)
      break
    }
    case 'medium': {
      console.log('Medium level selected!')
      levelEndGame.current = true
      setEndGame(false)
      setCardMatch(0)
      setLevelTime(60)
      setNonGame(false)
      setTimeout(() => {
        if (levelEndGame.current == true) {
          setNonGame(true)
          setIsWinner(false)
          setEndGame(true)
        } else {
          levelEndGame.current = true
        }
      }, 60000)
      break
    }
    case 'hard': {
      console.log('HARD level selected!')
      levelEndGame.current = true
      setEndGame(false)
      setCardMatch(0)
      setLevelTime(120)
      setNonGame(false)
      setTimeout(() => {
        if (levelEndGame.current == true) {
          setNonGame(true)
          setIsWinner(false)
          setEndGame(true)
        } else {
          levelEndGame.current = true
        }
      }, 120000)
    }
  }
}

/* criar função para acabar o jogo quando acertar todas */

export const endGame = (
  level,
  setNonGame,
  cardMatch,
  setIsWinner,
  easyEndGame,
  mediumEndGame,
  hardEndGame,
  setEndGame,
) => {
  switch (level) {
    case 'easy': {
      if (cardMatch == 3) {
        setTimeout(() => {
          setNonGame(true)
          easyEndGame.current = false
          setIsWinner(true)
          setEndGame(true)
        }, 900)
      }
      break
    }
    case 'medium': {
      if (cardMatch == 7) {
        setTimeout(() => {
          setNonGame(true)
          mediumEndGame.current = false
          setIsWinner(true)
          setEndGame(true)
        }, 900)
      }
      break
    }
    case 'hard': {
      if (cardMatch == 15) {
        setTimeout(() => {
          setNonGame(true)
          hardEndGame.current = false
          setIsWinner(true)
          setEndGame(true)
        }, 900)
      }
      break
    }
  }
}

/* 

    primeira idéia kk

    const handleStart = () => {
    setNonGame(nonGame == false)

    const myInterval = setInterval(() => {
      setCountDown((c) => c + 1)
    }, 1000)

    setTimeout(() => {
      setNonGame(true)
      clearInterval(myInterval)
    }, 30000)

    nonGame && setCountDown(0)
  }
*/
