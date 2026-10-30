'use client'

import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { deleteGameAction } from 'app/actions'

type Props = {
  game: Game
}

export const RemoveGameDialog = (props: Props) => {
  const { game } = props

  const router = useRouter()
  const [show, setShow] = useState(false)
  const [textValue, setTextValue] = useState(game.title)

  const deleteGame = async () => {
    const formData = new FormData()
    formData.append('id', game._id!)
    const res = await deleteGameAction(formData)
    if (res) {
      toast.success('Deleted successfully 👌')
      setShow(false)
      router.refresh()
    } else {
      toast.error('Delete failed')
    }
  }

  return (
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
