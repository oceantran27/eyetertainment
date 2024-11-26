
import Login from "@/ui/Login";
import { useEffect, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const booksPerPage = 4;

  const books = [
    { title: "Book 1", imageUrl: "/images/book1.jpg" },
    { title: "Book 2", imageUrl: "/images/book1.jpg" },
    { title: "Book 3", imageUrl: "/images/book1.jpg" },
    { title: "Book 4", imageUrl: "/images/book1.jpg" },
    { title: "Book 5", imageUrl: "/images/book1.jpg" },
    { title: "Book 6", imageUrl: "/images/book1.jpg" },
    { title: "Book 7", imageUrl: "/images/book1.jpg" },
    { title: "Book 8", imageUrl: "/images/book1.jpg" },
    { title: "Book 9", imageUrl: "/images/book1.jpg" },
    { title: "Book 10", imageUrl: "/images/book1.jpg" },
    { title: "Book 11", imageUrl: "/images/book1.jpg" },
  ];

  const goToNext = () => {
    if (currentIndex + booksPerPage < books.length) {
      setCurrentIndex(currentIndex + booksPerPage);
    }
  };

  const goToPrevious = () => {
    if (currentIndex - booksPerPage >= 0) {
      setCurrentIndex(currentIndex - booksPerPage);
    }
  };

  const columns = booksPerPage;

  return (
    // <Login />
    <div className="container mx-auto p-6 flex flex-col items-center justify-center h-screen">
      {/* Day la Welcome */}
      <h1
        className="text-6xl font-bold text-center mb-16"
        style={{ marginTop: "-20px" }}
      >
        Welcome to <span className="blue_gradient">Eye Reader</span>
      </h1>

      {/* Thanh tim kiem */}
      <div
        className="flex justify-center mb-12 w-full"
        style={{ marginTop: "-20px" }}
      >
        <input
          type="text"
          placeholder="Search for a book..."
          className="w-2/3 p-4 border rounded-lg text-lg"
        />
      </div>

      <div className="flex items-center justify-center mb-16 space-x-8">
        {/* left btn */}
        <button
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          className={`p-10 rounded-full bg-[#aac7ff] text-white text-5xl shadow-lg ${
            currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
          } active:bg-[#6495ed]`}
        >
          <AiOutlineLeft />
        </button>

        {/* book list */}
        <div
          className="grid gap-8"
          style={{
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
          }}
        >
          {books
            .slice(currentIndex, currentIndex + booksPerPage)
            .map((book, index) => (
              <div
                key={index}
                className="bg-white text-black rounded-xl p-6 shadow-lg flex flex-col items-center space-y-6"
                style={{ width: "260px", height: "380px" }}
              >
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="w-full h-2/3 object-cover rounded-lg"
                />
                <h2 className="text-center text-xl font-semibold">
                  {book.title}
                </h2>
              </div>
            ))}
        </div>

        {/* right btn */}
        <button
          onClick={goToNext}
          disabled={currentIndex + booksPerPage >= books.length}
          className={`p-10 rounded-full bg-[#aac7ff] text-white text-5xl shadow-lg ${
            currentIndex + booksPerPage >= books.length
              ? "opacity-50 cursor-not-allowed"
              : ""
          } active:bg-[#6495ed]`}
        >
          <AiOutlineRight />
        </button>
      </div>
    </div>
  );
}