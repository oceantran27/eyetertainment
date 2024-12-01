import { useState } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { motion } from 'framer-motion';
import SearchBar from './SearchBar';
import BookCard from './bookCard';

const BooksList = ({ children, books, currentIndex, goToNext, goToPrevious, message }) => {
  const booksPerPage = 4; 
  const totalPages = Math.ceil(books.length / booksPerPage);
  const currentPage = Math.floor(currentIndex / booksPerPage) + 1;

  return (
    <div className="container mx-auto p-6 flex flex-col items-center justify-center h-screen">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-6xl font-bold text-center mb-16 animate-gradient bg-gradient-to-r from-[#d9d9e0] via-[#f9f9ff] to-[#f9f9ff] bg-clip-text text-transparent"
      >
        Welcome to <span className="blue_gradient">Eye Reader</span>
      </motion.h1>

      <SearchBar className="shadow-md hover:shadow-lg transition-shadow duration-300 hover:ring-2 hover:ring-blue-500 focus:ring-4 focus:ring-blue-300" />

      {/* Thông báo không có kết quả */}
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

      {/* Danh sách sách */}
      {books && books.length > 0 && !message && (
        <>
          <motion.div
            className="flex items-center justify-center mb-16 space-x-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Nút trái */}
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={goToPrevious}
              disabled={currentIndex === 0}
              className={`p-10 rounded-full bg-[#1e1f25] text-white text-5xl shadow-lg transform transition-transform duration-300 hover:scale-110 ${currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:shadow-xl"} active:scale-95`}
            >
              <AiOutlineLeft />
            </motion.button>

            {/* Danh sách sách */}
            <motion.div
              className="grid gap-4 md:gap-8 sm:grid-cols-2 md:grid-cols-4"
              style={{
                gridTemplateColumns: `repeat(${booksPerPage}, 1fr)`
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Cai nay la component bookcard */}
              {books.slice(currentIndex, currentIndex + booksPerPage).map((book, index) => (
                <BookCard key={index} book={book} index={index} />
              ))} 
            </motion.div>

            {/* Nút phải */}
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={goToNext}
              disabled={currentIndex + booksPerPage >= books.length}
              className={`p-10 rounded-full bg-[#1e1f25] text-white text-5xl shadow-lg transform transition-transform duration-300 hover:scale-110 ${currentIndex + booksPerPage >= books.length ? "opacity-50 cursor-not-allowed" : "hover:shadow-xl"} active:scale-95`}
            >
              <AiOutlineRight />
            </motion.button>
          </motion.div>
          
          {/* Thanh tiến trình */}
          <div className="w-full bg-[#44474f] rounded-full h-4 my-4">
            <div
              className="bg-[#adc6ff] h-4 rounded-full transition-width duration-300"
              style={{ width: `${(currentPage / totalPages) * 100}%` }}
            ></div>
          </div>
        </>
      )}
    </div>
  );
};

export default BooksList;