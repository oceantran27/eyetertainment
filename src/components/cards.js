import Image from 'next/image'
import Link from 'next/link';

  const imageMap = {
    quiz: "/images/quiz.png",
    reading: "/images/reading.png",
    game: "/images/game.png",
  };

  const targetUrl = {
    quiz: "/quiz",
    reading: "/reading",
    game: "/game",
  }
  
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
  
    return (
      <Link href={url}>
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
        </div>
      </Link>
    );
  }
  