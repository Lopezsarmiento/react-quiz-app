import React from "react";
import FlashCard from "./flashCard";

const FlashCardList = ({ flashcards }) => {
  console.log("list of cards", flashcards);
  return (
    <div className="card-columns">
      {flashcards.map((card) => {
        return <FlashCard key={Math.random()} item={card}></FlashCard>;
      })}
    </div>
  );
};

export default FlashCardList;
