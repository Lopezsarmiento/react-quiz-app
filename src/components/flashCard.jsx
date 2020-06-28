import React, { useState } from "react";

const FlashCard = ({ item }) => {
  const [flip, setFlip] = useState(false);
  const front = (
    <div className="card-body round shadow">
      <h5 className="card-title">{item.question}</h5>
      <p className="card-text card-options">options:</p>
      <ul className="card-option text-muted">
        {item.options.map((opt) => {
          return <li key={opt}>{opt}</li>;
        })}
      </ul>
      <p className="card-text">
        <small className="text-muted">Last updated 3 mins ago</small>
      </p>
    </div>
  );
  const back = (
    <div className="card-body bg-info round shadow">
      <h5 className="card-title">Correct answer:</h5>
      <p className="card-text">{item.answer}</p>
      <p className="card-text">
        <small className="text-muted">Last updated 3 mins ago</small>
      </p>
    </div>
  );
  return (
    <div
      className={`card fcard mt-5 ${flip ? "flip" : ""}`}
      onClick={() => setFlip(!flip)}
    >
      {flip ? back : front}
    </div>
  );
};

export default FlashCard;
