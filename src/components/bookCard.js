import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const BookCard = ({ book, index }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

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
    router.push(`/book/${book.slug}`);
  };

  return (
    <motion.div
      key={index}
      className="bg-[#f9f9ff] text-[#1a1b20] rounded-xl p-6 shadow-lg flex flex-col items-center space-y-6 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
      style={{ width: "260px", height: "380px" }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.1 }}
      onClick={() => router.push(`/book/${book.slug}`)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-2/3" style={{ cursor: "pointer" }}>
        <img
          src={`https://otruyenapi.com/uploads/comics/${book.thumb_url}`}
          alt={book.name}
          className="w-full h-full object-cover rounded-lg"
        />
        <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-sm px-2 py-1 rounded">
          Chap {book.chaptersLatest[0]?.chapter_name || "N/A"}
        </span>
      </div>
      <h2 className="text-center text-xl font-semibold">{book.name}</h2>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: `${progress}%`,
          height: "5px",
          backgroundColor: "#adc6ff",
          transition: "width 0.05s ease-out",
          zIndex: 1,
        }}
      />
    </motion.div>
  );
};

export default BookCard;
