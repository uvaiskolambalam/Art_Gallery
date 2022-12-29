import React from 'react'
import './Popup.css'

const Popup = () => {
  return (
    <div className="popup" id='popup'>
            <div className="overlay"></div>
            <div className="popup-content">
                <h2>poppu title</h2>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio, aspernatur.</p>
                <div className="controls">
                    <button className='close-btn'>closs</button>
                    <button className='submit-btn'>Submit</button>
                </div>
            </div>
        </div>
  )
}

export default Popup