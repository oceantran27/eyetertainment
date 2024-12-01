import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const imageMap = {
  quiz: "/images/quiz.png",
  reading: "/images/reading.png",
  game: "/images/game.png",
};

const targetUrl = {
  quiz: "/quiz",
  reading: "/booksPage",
  game: "/game",
};

export default function CardWrapper() {
  return (
    <>
      <Card title="Quiz" type="quiz" />
      <Card title="Reading" type="reading" />
      <Card title="Game" type="game" />
    </>
  );
}

export function Card({ title, type }) {
  const imgSrc = imageMap[type];
  const url = targetUrl[type];
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    let timer;
    if (isHovered) {
      let elapsedTime = 0;
      timer = setInterval(() => {
        elapsedTime += 50;
        setProgress((elapsedTime / 1500) * 100);

        if (elapsedTime >= 1500) {
          clearInterval(timer);
          handleHoverActivate();
        }
      }, 50);
    } else {
      clearInterval(timer);
      setProgress(0);
    }

    return () => clearInterval(timer);
  }, [isHovered]);

  const handleHoverActivate = () => {
    router.push(url);
  };

  return (
    <Link
      href={url}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="rounded-xl bg-[#583e5b] p-2 text-[#fcd7fb]">
        <div className="flex p-3">
          <h3 className="ml-2 text-xl">{title}</h3>
        </div>
        <Image
          className="mx-auto rounded-lg"
          src={imgSrc}
          alt={title}
          width={175}
          height={175}
        />
        <div
          style={{
            position: "relative",
            bottom: 0,
            left: 0,
            width: `${progress}%`,
            height: "5px",
            backgroundColor: "#FF9800",
            transition: "width 0.05s ease-out",
            zIndex: 10,
          }}
        />
      </div>
    </Link>
  );
}
