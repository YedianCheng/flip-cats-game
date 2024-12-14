import React, { useState, useEffect } from "react";
import shuffle from "lodash.shuffle";
import "./App.css";
import cakey from './images/004.jpg';
import dj_catnip from './images/010.jpg';
import catrat from './images/077.jpg';
import babybox from './images/108.jpg';
import pillowcat from './images/132.jpg';
import kittyfairy from './images/133.jpg';


export const cats = [
  { id: "004", name: "cakey", image: cakey },
  { id: "010", name: "dj_catnip", image: dj_catnip },
  { id: "077", name: "catrat", image: catrat },
  { id: "108", name: "babybox", image: babybox },
  { id: "132", name: "pillowcat", image: pillowcat },
  { id: "133", name: "kittyfairy", image: kittyfairy },
];

const doubleCats = shuffle([...cats, ...cats]);

export default function App() {
  const [opened, setOpened] = useState([]); // using index | this state only have 2 items max with the selection from user
  const [moves, setMoves] = useState(0);
  const [matched, setMatched] = useState([]);

  useEffect(() => {
    if (matched.length === cats.length) {
      alert("You won!");
    }
  }, [matched, cats.length]);

  function flipCard(index) {
    if (opened.includes(index) || opened.length === 2) return;

    setOpened((opened) => [...opened, index]);
    setMoves((moves) => moves + 1);
  }

  useEffect(() => {
    if (opened.length === 2) {
      const [first, second] = opened;
      if (doubleCats[first].id === doubleCats[second].id) {
        setMatched((matched) => [...matched, doubleCats[first].id]);
      }
      setTimeout(() => {
        setOpened([]);
      }, 1000);
    }
  }, [opened, doubleCats]);

  return (
    <div className="app">
      <p data-testid="moves-count">
        {moves} <strong>moves</strong>
      </p>

      <div className="cards">
        {doubleCats.map((cats, index) => {
          let isFlipped = false;

          if (opened.includes(index) || matched.includes(cats.id)) {
            isFlipped = true;
          }

          return (
            <CatsCard
              key={index}
              index={index}
              cats={cats}
              isFlipped={isFlipped}
              flipCard={flipCard}
            />
          );
        })}
      </div>
    </div>
  );
}

export function CatsCard({index, cats, isFlipped, flipCard }) {
  return (
    <button
      className={`cats-card ${isFlipped ? "flipped" : ""}`}
      onClick={() => flipCard(index)}
      aria-label={`cats-card-${cats.name}`}
    >
      <div className="inner">
        <div className="front">
          <img
            src={cats.image}
            alt={cats.name}
            width="100"
          />
        </div>
        <div className="back">?</div>
      </div>
    </button>
  );
}


