import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import axios from "axios";
import FlashCardList from "./components/flashCardList";

function App() {
  const url = "https://opentdb.com/api.php";
  const catUrl = "https://opentdb.com/api_category.php";

  const [cards, setCards] = useState([]);
  const [categories, setCategories] = useState([]);

  const categoryEl = useRef();
  const amountEl = useRef();

  useEffect(() => {
    async function fetchCat() {
      try {
        const { data } = await axios.get(catUrl);
        console.log("categories", data);
        setCategories(data.trivia_categories);
      } catch (error) {
        console.log("error when calling api: ", error);
      }
    }

    fetchCat();
  }, []);

  useEffect(() => {}, []);

  function handleSubmit(e) {
    e.preventDefault();
    console.log("submitting form");
    const params = {
      amount: amountEl.current.value,
      category: categoryEl.current.value,
    };

    async function fetchData() {
      try {
        const { data } = await axios.get(url, { params });
        const list = data.results.map((item, index) => {
          const id = `${index}-${Date.now()}`;
          const answer = decode(item.correct_answer);
          const opts = [
            ...item.incorrect_answers.map((a) => decode(a)),
            answer,
          ];

          return {
            id: id,
            question: decode(item.question),
            answer: answer,
            options: opts,
          };
        });

        setCards(list);
      } catch (error) {
        console.log("error when calling api");
      }
    }

    fetchData();
  }

  return (
    <React.Fragment>
      <div className="Container m-5">
        <form onSubmit={handleSubmit} className="round">
          <div className="form-group">
            <label htmlFor="category">category</label>
            <select className="form-control" id="category" ref={categoryEl}>
              {categories.map((cat) => (
                <option value={cat.id} key={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="amount">number of questions</label>
            <input
              className="form-control"
              type="number"
              id="amount"
              min="1"
              step="1"
              defaultValue="4"
              ref={amountEl}
            ></input>
          </div>
          <div className="form-group">
            <button className="btn btn-small btn-warning btn-block">
              Get Questions
            </button>
          </div>
        </form>
        <FlashCardList flashcards={cards}></FlashCardList>
      </div>
    </React.Fragment>
  );
}

function decode(str) {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = str;
  return textArea.value;
}

const sample = [
  {
    id: 1,
    question: "what is 2+2",
    answer: "4",
    options: [
      {
        id: "opt1",
        value: 7,
      },
      {
        id: "opt2",
        value: 3,
      },
      {
        id: "opt3",
        value: 4,
      },
    ],
  },
  {
    id: 2,
    question: "what is 2+1",
    answer: "4",
    options: [
      {
        id: "opt1",
        value: 78,
      },
      {
        id: "opt2",
        value: 3,
      },
      {
        id: "opt3",
        value: 677,
      },
    ],
  },
  {
    id: 3,
    question: "what is 22+22",
    answer: "4",
    options: [
      {
        id: "opt1",
        value: 33,
      },
      {
        id: "opt2",
        value: 0,
      },
      {
        id: "opt3",
        value: 44,
      },
    ],
  },
];

export default App;
