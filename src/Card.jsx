import { useRef } from "react";
import { useState, useEffect } from "react";
import "./Card.css";

function Card(props) {
  let fetchDone = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      if(fetchDone.current === false) {
        fetchDone.current = true;
      } else {
        return;
      }
      let pokemonInformation = [
        "pikachu", "ditto", "charmander", "sandshrew", "jigglypuff", "paras",
        "psyduck", "slowpoke", "porygon", "natu", "quagsire", "ludicolo"
      ];
      let ultimateInfo = [];

      try {
        let information = pokemonInformation.map((pokemonIndividual) => {
          return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIndividual}/`).then(res => res.json());

      });

        console.log("The info " + information);

        let answers = await Promise.all(information);

        for (let i = 0; i < answers.length; i++) {
          ultimateInfo.push(answers[i].sprites.other.dream_world.front_default);
        }

        setCards(() => {
          let update = [...pokemonCardsDefault];
          for (let i = 0; i < ultimateInfo.length; i++) {
            update[i] = {...update[i], image: ultimateInfo[i]};
          }
          console.log(typeof(update));
          return changeOrder(update);
        })
        console.log(answers);

      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);



  const pokemonCardsDefault = [
    { id: 1, Name: "Pikachu", image: "Image of a pokemon" },
    { id: 2, Name: "Ditto", image: "Image of a pokemon" },
    { id: 3, Name: "Charmander", image: "Image of a pokemon" },
    { id: 4, Name: "Sandshrew", image: "Image of a pokemon" },
    { id: 5, Name: "Jigglypuff", image: "Image of a pokemon"},
    { id: 6, Name: "Paras", image: "Image of a pokemon"},
    { id: 7, Name: "Psyduck", image: "Image of a pokemon"},
    { id: 8, Name: "Slowpoke", image: "Image of a pokemon"},
    { id: 9, Name: "Porygon", image: "Image of a pokemon"},
    { id: 10, Name: "Natu", image: "Image of a pokemon"},
    { id: 11, Name: "Quagsire", image: "Image of a pokemon"},
    { id: 12, Name: "Ludicolo", image: "Image of a pokemon"}
  ];

  let [cards, setCards] = useState(pokemonCardsDefault);

  function changeOrder(array) {
    let copyArray = [...array];
    let changeArray = [];
    let maxAmount = copyArray.length;
    let index = 0;
    for(let i = maxAmount; i > 0; i--) {
      index = Math.floor(Math.random() * ((i - 1) - 0 + 1)) + 0;
      changeArray.push(copyArray[index]);
      copyArray.splice(index, 1);
    }
    return changeArray;
  }

  useEffect(() => {
    setCards(current => {
      return changeOrder(current);
    });
  }, []);

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
    setCards(current => {
      return changeOrder(current);
    });

    requestAnimationFrame(() => {
      window.scrollTo(0, scrollY);
    });
  }

  return (
    <main id="theContent">
      {cards.map((individualCard) => {
        return (
          <div key={individualCard.id} className={`Card`} onClick={() => changeScore(individualCard.id)}>
            <img src={individualCard.image} alt="Pokemon" />
            <p className="theName">{individualCard.Name}</p>
          </div>
        );
      })}
    </main>
  );
}

export { Card };
