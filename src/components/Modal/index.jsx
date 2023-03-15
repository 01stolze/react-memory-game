import './styles.css'
import P from 'prop-types'
import Modal from 'react-modal'

export const ModalPop = ({ setEndGame, isWinner }) => {
  Modal.setAppElement('#root')

  //   const openModal = () => {
  //     setIsOpen(true)
  //   }

  const closeModal = () => {
    setEndGame(false)
  }

  return (
    <div className="modal-container">
      <Modal
        isOpen={true}
        onRequestClose={closeModal}
        contentLabel="Example modal"
        overlayClassName="modal-overlay"
        className="modal-content"
      >
        {isWinner ? (
          <>
            <h1>PARABÉNS!</h1> <p>Você ganhou!</p>
          </>
        ) : (
          <>
            <h1>Que pena!</h1> <p>Acabou seu tempo!</p>
          </>
        )}
        <button onClick={closeModal}>OK</button>
      </Modal>
    </div>
  )
}

ModalPop.propTypes = {
  isWinner: P.bool,
  endGame: P.bool,
  setEndGame: P.func,
}
