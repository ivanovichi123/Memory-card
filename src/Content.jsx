import { useRef } from "react";
import { useState } from "react";
import "./Content.css";
import { Card } from "./Card.jsx";

function Content() {
  const [score, setScore] = useState(0);
  const [gameText, setGameText] = useState("You can do it..");
  const [bestScore, setBestScore] = useState(0);

  function scoreChanges() {
    setScore(score + 1);
    if(score >= bestScore) {
      setBestScore(bestScore + 1);
    }
    setGameText("You can do it..");
  }

  function scoreLose() {
    setScore(0);
    setGameText("You lose..");
  }

  function wonGame() {
    setScore(score + 1);
    if(score >= bestScore) {
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
      <Card theFunction={scoreChanges} theLoseFunction={scoreLose} theWinFunction={wonGame}/>
    </>
  );
}

export { Content };
