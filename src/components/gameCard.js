// components/GameCard.js
import React from "react";
import styles from "@/styles/GameCard.module.css";

const GameCard = ({ gameName, publisher, players, action }) => {
  return (
    <div className={styles.card}>
      <h3>{gameName}</h3>
      <p>{publisher}</p>
      <p>{players} players rated this game</p>
      <button>{action}</button>
    </div>
  );
};

export default GameCard;
