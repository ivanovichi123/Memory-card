import { useRef } from "react";
import "./Card.css";

function Card(props) { 
  const pokemonCards = [
    { id: 1, Name: "A pokemon", image: "Image of a pokemon" },
    { id: 2, Name: "Another pokemon", image: "Image of a pokemon" },
    { id: 3, Name: "A new pokemon", image: "Image of a pokemon" },
    { id: 4, Name: "Thats a pokemon", image: "Image of a pokemon" },
  ];

  let alreadyUse = useRef([]);

  function changeScore(target) {
    console.log(alreadyUse.current);
    for(let i = 0; i < alreadyUse.current.length; i++) {
      if(target.id === alreadyUse.current[i]) {
        props.theLoseFunction();
        alreadyUse.current = [];
        return;
      }
    }
    alreadyUse.current.push(target.id);
    if(alreadyUse.current.length === 4) {
      props.theWinFunction();
      return;
    }
    props.theFunction();
  }

  return (
    <main id="theContent">
      {pokemonCards.map((individualCard) => {
        return (
          <div key={individualCard.id} id={individualCard.id} className={`Card`} onClick={(e) => changeScore(e.currentTarget)}>
            <img src="/Dummy.jpg" alt="Pokemon" />
            <p className="theName">{individualCard.Name}</p>
          </div>
        );
      })}
    </main>
  );
}

export { Card };
