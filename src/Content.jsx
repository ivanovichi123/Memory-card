import { useState } from 'react'
import './Content.css'
import { Card } from './Card.jsx'

function Content() {
  // const [example, setExample] = useState(0);

  // function theSuperDummy() {
  //   setExample(example + 1);
  // }

  return (
    <>
      <header> 
        <div id='theHeader'>
          <h1 className='theTitle'>Memory card of pokemon</h1>
          <p className='theSubtitle'>In this game you need to click the cards to earn points without clicking on the same character twice</p>
          <p id='theScore'>Score: </p>
          <p id='theBestScore'>Best score: </p>
        </div>
      </header>
      <Card />
    </>
  )
}

export { Content } 
