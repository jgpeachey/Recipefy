import { Button } from '@mui/material'
import React, {useState} from 'react'

function Modal({closeModal}) {

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button onClick={() => closeModal(false)}>X</button>
                </div>
                <div className="title">
                    <h1>Zpagetti</h1>
                </div>
                <div className="body">
                    <p>This recipe is fire. LFG</p>
                </div>
                <div className="footer">
                    <Button>Continue</Button>
                    <Button>Cancel</Button>
                </div>
            </div>
        </div>
    )
}

export default Modal