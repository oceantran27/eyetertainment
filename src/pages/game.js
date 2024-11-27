import DinoGame from "@/components/dinoGame";
import FlappyBird from "@/components/flappyBirdGame";
import Menja from "@/components/menjaGame";
import { useEffect } from "react";

export const metadata = {
  title: 'Game | Eyetertainment',
};


const Game = () => {
  useEffect(() => {
    document.title = metadata.title;
  }, []);


  return (
    <div>
      {/* <NinjaFruitGame /> */}
      <Menja />
    </div>
  );
};

export default Game;
