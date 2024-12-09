import { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { motion } from "framer-motion";
import SearchBar from "./SearchBar";
import BookCard from "./bookCard";
import GazeButton from "./gazeButton";
import MainLayout from "./mainLayout";
import RootLayout from "@/layouts/rootLayout";
import Image from "next/image";

const BooksList = ({
  children,
  books,
  currentIndex,
  goToNext,
  goToPrevious,
  message,
}) => {
  const booksPerPage = 4;
  const totalPages = Math.ceil(books.length / booksPerPage);
  const currentPage = Math.floor(currentIndex / booksPerPage) + 1;
  const [isFocus, setIsFocus] = useState(false);

  return (
    <MainLayout>
      <div className="container mx-auto p-6 flex flex-col items-center justify-center h-screen mt-12">
        {isFocus && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center">
            <Image
              className="pt-80"
              src="/images/sound_animation.gif"
              alt="hero image"
              width={200}
              height={200}
              unoptimized={true}
            />
          </div>
        )}
        <div className="relative z-20 w-full">
          <SearchBar
            onFocus={() => {
              setIsFocus(true);
            }}
            onBlur={() => {
              setIsFocus(false);
            }}
            className="shadow-md hover:shadow-lg transition-shadow duration-300"
          />
        </div>

        {message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center text-xl text-[#ffb4ab] mb-8"
          >
            {message}
          </motion.div>
        )}

        {children}

        {books && books.length > 0 && !message && (
          <>
            <motion.div
              className="flex items-center justify-center mb-16 space-x-8 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Navigation Buttons */}
              <GazeButton
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={goToPrevious}
                disabled={currentIndex === 0}
                className={`p-10 rounded-full bg-[#1e1f25] text-white text-5xl shadow-lg transform transition-transform duration-300 hover:scale-110 ${
                  currentIndex === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:shadow-xl"
                } active:scale-95`}
              >
                <AiOutlineLeft />
              </GazeButton>
              <motion.div
                className="grid gap-4 md:gap-8 sm:grid-cols-2 md:grid-cols-4"
                style={{
                  gridTemplateColumns: `repeat(${booksPerPage}, 1fr)`,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {books
                  .slice(currentIndex, currentIndex + booksPerPage)
                  .map((book, index) => (
                    <BookCard key={index} book={book} index={index} />
                  ))}
              </motion.div>
              <GazeButton
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={goToNext}
                disabled={currentIndex + booksPerPage >= books.length}
                className={`p-10 rounded-full bg-[#1e1f25] text-white text-5xl shadow-lg transform transition-transform duration-300 hover:scale-110 ${
                  currentIndex + booksPerPage >= books.length
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:shadow-xl"
                } active:scale-95`}
              >
                <AiOutlineRight />
              </GazeButton>
            </motion.div>
            <div className="w-full max-w-[500px] mx-auto bg-[#44474f] rounded-full h-4 my-4">
              <div
                className="bg-[#adc6ff] h-4 rounded-full transition-width duration-300"
                style={{ width: `${(currentPage / totalPages) * 100}%` }}
              ></div>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default BooksList;
