import { useState } from "react";
import Card from "@/components/card";
import DinoGame from "@/components/dinoGame";
import FlappyBird from "@/components/flappyBirdGame";
import Menja from "@/components/menjaGame";
import styles from "@/styles/game.module.css";
import RootLayout from "@/layouts/rootLayout";

const Game = () => {
  const [selectedGame, setSelectedGame] = useState(null);

  const customButtonProps = {
    left: {
      onClick: () => handleOnClickBack(),
    },
    bottom: {
      className: "hidden",
      icon: null,
    },
    top: {
      className: "hidden",
      icon: null,
    },
    right: {
      className: "hidden",
      icon: null,
    },
  };

  const renderGame = () => {
    if (selectedGame === "Dino")
      return (
        <div className={styles.gameContainer}>
          <DinoGame />
        </div>
      );
    if (selectedGame === "Flappy")
      return (
        <div className={styles.gameContainer}>
          <FlappyBird />
        </div>
      );
    if (selectedGame === "Menja")
      return (
        <div className={styles.gameContainer}>
          <Menja />
        </div>
      );
    return <div>Click a game to play!</div>;
  };

  const renderCard = () => {
    return (
      <div className={styles.listContainer}>
        <Card
          image="./images/dinor_icon.png"
          title="Dinosaur Game (2014)"
          author="Sebastien Gabriel, Alan Bettes, Edward Jung"
          genre="Endless running game"
          action="Play"
          gradient="from-orange-200 via-orange-400 to-orange-600"
          onClick={() => {
            setSelectedGame("Dino");
          }}
        />
        <Card
          image="./images/flappy_bird_icon.jpg"
          title="Flappy Bird (2013)"
          author="Dong Nguyen"
          genre="Arcade"
          action="Play"
          gradient="from-cyan-400 via-cyan-600 to-cyan-800"
          onClick={() => {
            setSelectedGame("Flappy");
          }}
        />
        <Card
          image="./images/menja_icon.png"
          title="Menja (2023)"
          author="Ark Platforms"
          genre="Arcade"
          action="Play"
          gradient="from-gray-300 via-gray-500 to-gray-700"
          onClick={() => {
            setSelectedGame("Menja");
          }}
        />
      </div>
    );
  };

  const handleOnClickBack = () => {
    if (selectedGame) {
      setSelectedGame(null);
    }
  };

  return (
    <RootLayout buttonProps={customButtonProps}>
      <div className={styles.container}>
        {!selectedGame && (
          <div className={styles.titleContainer}>Game World</div>
        )}
        {(selectedGame && renderGame()) || renderCard()}
      </div>
    </RootLayout>
  );
};

export default Game;
