import P from 'prop-types'
import './styles.css'

export const Card = ({ flipped = false, back, handleClick }) => {
  const cardContentClassNames = ['card-content']
  flipped && cardContentClassNames.push('card-content--flipped')

  return (
    <div className="card" onClick={handleClick}>
      <div className={cardContentClassNames.join(' ')}>
        <div className="card-face card-face--front"></div>
        <div className="card-face card-face--back">{back}</div>
      </div>
    </div>
  )
}

Card.propTypes = {
  flipped: P.bool,
  back: P.string,
  handleClick: P.func,
}
