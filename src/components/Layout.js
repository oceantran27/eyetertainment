import { useState } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { motion } from 'framer-motion';
import SearchBar from './SearchBar';

const Layout = ({ children, books, currentIndex, goToNext, goToPrevious, message }) => {
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
        className="text-6xl font-bold text-center mb-16 animate-gradient bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent"
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
          className="text-center text-xl text-red-500 mb-8"
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
              className={`p-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-5xl shadow-lg transform transition-transform duration-300 hover:scale-110 ${currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:shadow-xl"} active:scale-95`}
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
              {books.slice(currentIndex, currentIndex + booksPerPage).map((book, index) => (
                <motion.div
                  key={index}
                  className="bg-white text-black rounded-xl p-6 shadow-lg flex flex-col items-center space-y-6 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                  style={{ width: '260px', height: '380px' }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => {
                    window.location.href = `/book/${book.slug}`;
                  }}
                >
                  <div 
                    className="relative w-full h-2/3"
                    style={{ cursor: 'pointer' }}
                  >
                    <img
                      src={`https://otruyenapi.com/uploads/comics/${book.thumb_url}`}
                      alt={book.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-sm px-2 py-1 rounded">
                      Chap {book.chaptersLatest[0]?.chapter_name}
                    </span>
                  </div>
                  <h2 className="text-center text-xl font-semibold">{book.name}</h2>
                </motion.div>
              ))}
            </motion.div>

            {/* Nút phải */}
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={goToNext}
              disabled={currentIndex + booksPerPage >= books.length}
              className={`p-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-5xl shadow-lg transform transition-transform duration-300 hover:scale-110 ${currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:shadow-xl"} active:scale-95`}
            >
              <AiOutlineRight />
            </motion.button>
          </motion.div>
          
          {/* Thanh tiến trình */}
          <div className="w-full bg-gray-300 rounded-full h-4 my-4">
            <div
              className="bg-blue-500 h-4 rounded-full transition-width duration-300"
              style={{ width: `${(currentPage / totalPages) * 100}%` }}
            ></div>
          </div>
        </>
      )}
    </div>
  );
};

export default Layout;