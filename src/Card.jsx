import { useRef } from "react";
import { useState } from "react";
import "./Card.css";

function Card(props) { 
  const pokemonCards = [
    { id: 1, Name: "A pokemon", image: "Image of a pokemon" },
    { id: 2, Name: "Another pokemon", image: "Image of a pokemon" },
    { id: 3, Name: "A new pokemon", image: "Image of a pokemon" },
    { id: 4, Name: "Thats a pokemon", image: "Image of a pokemon" },
    { id: 5, Name: "Yep, a pokemon", image: "Image of a pokemon"},
    { id: 6, Name: "OMG, a pokemon", image: "Image of a pokemon"},
    { id: 7, Name: "Pikmin is better", image: "Image of a pokemon"},
    { id: 8, Name: "Hello i am a pokemon", image: "Image of a pokemon"},
    { id: 9, Name: "Pokemon", image: "Image of a pokemon"},
    { id: 10, Name: "A lot of pokemon", image: "Image of a pokemon"},
    { id: 11, Name: "Many pokemon", image: "Image of a pokemon"},
    { id: 12, Name: "You can do it", image: "Image of a pokemon"}
  ];

  let [cards, setCards] = useState(pokemonCards);

  function changeOrder() {
    let copyArray = [...cards];
    let changeArray = [];
    let maxAmount = copyArray.length;
    let index = 0;
    for(let i = maxAmount; i > 0; i--) {
      index = Math.floor(Math.random() * ((i - 1) - 0 + 1)) + 0;
      changeArray.push(copyArray[index]);
      copyArray.splice(index, 1);
    }
    setCards(changeArray);
  }

  let alreadyUse = useRef([]);

  function changeScore(id) {
    const scrollY = window.scrollY; 
    for(let i = 0; i < alreadyUse.current.length; i++) {
      if(id === alreadyUse.current[i]) {
        props.theLoseFunction();
        alreadyUse.current = [];
        return;
      }
    }
    alreadyUse.current.push(id);
    if(alreadyUse.current.length === 12) {
      props.theWinFunction();
      return;
    }
    props.theFunction();
    changeOrder();

    requestAnimationFrame(() => {
      window.scrollTo(0, scrollY);
    });
  }

  return (
    <main id="theContent">
      {cards.map((individualCard) => {
        return (
          <div key={individualCard.id} className={`Card`} onClick={() => changeScore(individualCard.id)}>
            <img src="/Dummy.jpg" alt="Pokemon" />
            <p className="theName">{individualCard.Name}</p>
          </div>
        );
      })}
    </main>
  );
}

export { Card };
