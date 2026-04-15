import { useRef } from "react";
import "./Card.css";

function Card(props) { 
  const pokemonCards = [
    { id: 1, Name: "A pokemon", image: "Image of a pokemon" },
    { id: 2, Name: "Another pokemon", image: "Image of a pokemon" },
    { id: 3, Name: "A new pokemon", image: "Image of a pokemon" },
    { id: 4, Name: "Thats a pokemon", image: "Image of a pokemon" },
  ];

  let newArray = [];

  function changeOrder() {
    let copyArray = [...pokemonCards];
    let maxAmount = copyArray.length;
    let index = 0;
    for(let i = maxAmount; i > 0; i--) {
      index = Math.floor(Math.random() * ((i - 1) - 0 + 1)) + 0;
      newArray.push(copyArray[index]);
      copyArray.splice(index, 1);
    }
  }

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

  changeOrder();

  return (
    <main id="theContent">
      {newArray.map((individualCard) => {
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
