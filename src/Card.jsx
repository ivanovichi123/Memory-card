import "./Card.css";

function Card() {
  const pokemonCards = [
    { id: 1, Name: "A pokemon", image: "Image of a pokemon" },
    { id: 2, Name: "Another pokemon", image: "Image of a pokemon" },
    { id: 3, Name: "A new pokemon", image: "Image of a pokemon" },
    { id: 4, Name: "Thats a pokemon", image: "Image of a pokemon" },
  ];

  return (
    <main id="theContent">
      {pokemonCards.map((individualCard) => {
        return (
          <div key={individualCard.id} className={`Card`}>
            <img src="/Dummy.jpg" alt="Pokemon" />
            <p className="theName">{individualCard.Name}</p>
          </div>
        );
      })}
    </main>
  );
}

export { Card };

//   return (
//     <div className="theContent" style={{ display: props.theDisplay }}>
//       {answers.flatMap((answer) => {
//         if (answer.info === "") {
//           return [];
//         } else if (answer.info !== "" && count === 0) {
//           count += 1;
//           return (
//             <div key={answer.id}>
//               <h2>Practical Experience</h2>
//               <h3>{answer.title}: </h3>
//               <p>{answer.info}</p> <br />
//             </div>
//           );
//         } else {
//           return (
//             <div key={answer.id}>
//               <h3>{answer.title}: </h3>
//               <p>{answer.info}</p> <br />
//             </div>
//           );
//         }
//       })}
//     </div>
//   );

// function Card({state}) {
//     function dummy() {
//         state();
//     }
