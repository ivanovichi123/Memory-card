import { useRef } from "react";
import { useState, useEffect } from "react";
import "../styles/Card.css";

function Card(props) {
  //Variable to avoid fetching from the API two times in strict mode
  let fetchDone = useRef(false);

  //Use effect to fetch the images from an API
  useEffect(() => {
    //Declare an async function
    const fetchData = async () => {
      //Check if the fetch has already been done
      if (fetchDone.current === false) {
        fetchDone.current = true;
      } else {
        return;
      }

      //Variable that contain all the pokemon that will be used
      let pokemonInformation = [
        "pikachu",
        "ditto",
        "charmander",
        "sandshrew",
        "jigglypuff",
        "paras",
        "psyduck",
        "slowpoke",
        "porygon",
        "natu",
        "quagsire",
        "ludicolo",
      ];
      //Variable that will store the json from the API
      let ultimateInfo = [];

      try {
        //Create an array with all the fetches links that will be use
        let information = pokemonInformation.map((pokemonIndividual) => {
          return fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemonIndividual}/`,
          ).then((res) => res.json());
        });

        //Promise.all to wait for all the fetches to finish
        let answers = await Promise.all(information);

        //For cycle to get the images from the json and store them in an array
        for (let i = 0; i < answers.length; i++) {
          ultimateInfo.push(answers[i].sprites.other.dream_world.front_default);
        }

        //Change the cards
        setCards(() => {
          //Copy the default array of pokemon cards
          let update = [...pokemonCardsDefault];
          //For cycle to change the placeholder text to the actual images
          for (let i = 0; i < ultimateInfo.length; i++) {
            update[i] = { ...update[i], image: ultimateInfo[i] };
          }
          //Return the value form the function that changes the order of the cards
          return changeOrder(update);
        });
      } catch (error) {
        //Message if there is an error
        console.error("Error fetching data: ", error);
      }
    };

    //Call the async function
    fetchData();
  }, []);

  //Default values of the pokemon cards
  const pokemonCardsDefault = [
    { id: 1, Name: "Pikachu", image: "Image of a pokemon" },
    { id: 2, Name: "Ditto", image: "Image of a pokemon" },
    { id: 3, Name: "Charmander", image: "Image of a pokemon" },
    { id: 4, Name: "Sandshrew", image: "Image of a pokemon" },
    { id: 5, Name: "Jigglypuff", image: "Image of a pokemon" },
    { id: 6, Name: "Paras", image: "Image of a pokemon" },
    { id: 7, Name: "Psyduck", image: "Image of a pokemon" },
    { id: 8, Name: "Slowpoke", image: "Image of a pokemon" },
    { id: 9, Name: "Porygon", image: "Image of a pokemon" },
    { id: 10, Name: "Natu", image: "Image of a pokemon" },
    { id: 11, Name: "Quagsire", image: "Image of a pokemon" },
    { id: 12, Name: "Ludicolo", image: "Image of a pokemon" },
  ];

  //Variable to store the values of the cards
  let [cards, setCards] = useState(pokemonCardsDefault);

  //Function tha changes the order of the cards
  function changeOrder(array) {
    //Copy the array
    let copyArray = [...array];
    //Create new array that stores the new order
    let changeArray = [];
    //Variables to control the changes in the array
    let maxAmount = copyArray.length;
    let index = 0;
    //For cycle that changes the order of the array
    for (let i = maxAmount; i > 0; i--) {
      //Create a random index base on the length of the array
      index = Math.floor(Math.random() * (i - 1 - 0 + 1)) + 0;
      //Push the corresponding random index
      changeArray.push(copyArray[index]);
      //Erase the old index
      copyArray.splice(index, 1);
    }
    //Return the new array with changes in the order
    return changeArray;
  }

  //Use effect to change the order when first entering the page
  useEffect(() => {
    //Change the order of the cards based on its current value
    setCards((current) => {
      return changeOrder(current);
    });
  }, []);

  //Variable to check which cards have already been click
  let alreadyUse = useRef([]);

  //Function that changes the score
  function changeScore(id) {
    //Store the value of the scroll to to prevent it from going up after each click
    const scrollY = window.scrollY;
    //For cycle to check if the clicked card has not already been clicked
    for (let i = 0; i < alreadyUse.current.length; i++) {
      if (id === alreadyUse.current[i]) {
        //If the card was already clicked lose the points
        props.theLoseFunction();
        //Reset the array of already clicked cards
        alreadyUse.current = [];
        return;
      }
    }
    //Push the id as an already use card
    alreadyUse.current.push(id);
    //Check if the already use array is the total length of the total cards
    if (alreadyUse.current.length === 12) {
      //Win the game
      props.theWinFunction();
      return;
    }
    //Increment one score
    props.theFunction();
    //Change the order of the cards
    setCards((current) => {
      return changeOrder(current);
    });

    //Make the scroll stay in its place without going up
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollY);
    });
  }

  return (
    <main id="theContent">
      {cards.map((individualCard) => {
        return (
          <div
            key={individualCard.id}
            className={`Card`}
            onClick={() => changeScore(individualCard.id)}
          >
            <img src={individualCard.image} alt="Pokemon" />
            <p className="theName">{individualCard.Name}</p>
          </div>
        );
      })}
    </main>
  );
}

export { Card };
