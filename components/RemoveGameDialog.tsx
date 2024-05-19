import axios from 'axios'
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'

type Props = {
  game: Game
}

export const RemoveGameDialog = (props: Props) => {
  const { game } = props

  const [show, setShow] = useState(false)
  const [textValue, setTextValue] = useState(game.title)

  const deleteGame = () => {
     axios
     .delete('api/games/', { data: game._id })
     .then((_res) => {
       toast.success('Deleted successfully 👌')
       setTimeout(() => {
        //An original table should be updated :-/
        setShow(false)
       }, 2000)
     })
     .catch((err) => {
       toast.error('Delete failed')
       console.log('ERROR: ', err)
     })
  }

  return (
    //This should probably be secured so you don't double click it - but then, I can only blamy myself
    <>
      <a href='#' onClick={() => setShow(true)}>
        Remove
      </a>
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to remove following item:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea cols={45} rows={5} value={textValue} onChange={(e) => setTextValue(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-light' onClick={() => deleteGame()}>
            Delete
          </button>
          <button className='btn btn-light' onClick={() => setShow(false)}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
