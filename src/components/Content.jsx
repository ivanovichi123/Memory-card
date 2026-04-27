import { useState } from "react";
import "../styles/Content.css";
import { Card } from "./Card.jsx";

function Content() {
  //Variables for the score
  const [score, setScore] = useState(0);
  const [gameText, setGameText] = useState("You can do it..");
  const [bestScore, setBestScore] = useState(0);

  //Function that changes the score
  function scoreChanges() {
    setScore(score + 1);
    //If score is bigger than the best score
    if (score >= bestScore) {
      //Increment best score
      setBestScore(bestScore + 1);
    }
    setGameText("You can do it..");
  }

  //Function that changes score when you lose
  function scoreLose() {
    //Set score to zero
    setScore(0);
    setGameText("You lose..");
  }

  //Function that handles winning the game
  function wonGame() {
    setScore(score + 1);
    //If score is bigger than the best score
    if (score >= bestScore) {
      //Increment best score
      setBestScore(bestScore + 1);
    }
    setGameText("You won!!");
  }

  return (
    <>
      <header>
        <div id="theHeader">
          <h1 className="theTitle">Memory card of pokemon</h1>
          <p className="theSubtitle">
            In this game you need to click the cards to earn points without
            clicking on the same character twice
          </p>
          <p id="gameText">{gameText}</p>
          <p id="theScore">Score: {score}</p>
          <p id="theBestScore">Best score: {bestScore}</p>
        </div>
      </header>
      <Card
        theFunction={scoreChanges}
        theLoseFunction={scoreLose}
        theWinFunction={wonGame}
      />
    </>
  );
}

export { Content };
