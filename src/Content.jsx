import { useState } from 'react'
import './Content.css'

function Content() {
  return (
    <header> 
      <div id='theHeader'>
        <h1 className='theTitle'>Memory card of pokemon</h1>
        <p className='theSubtitle'>In this game you need to click the cards to earn points without clicking on the same character twice</p>
        <p id='theScore'>Score: </p>
        <p id='theBestScore'>Best score: </p>
      </div>
    </header>
  )
}

export { Content } 
