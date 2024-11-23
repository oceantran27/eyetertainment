import { useState } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import SearchBar from './SearchBar';

const Layout = ({ children, books, currentIndex, goToNext, goToPrevious, message }) => {
  const booksPerPage = 4; 

  const totalPages = Math.ceil(books.length / booksPerPage);
  const currentPage = Math.floor(currentIndex / booksPerPage) + 1;

  return (
    <div className="container mx-auto p-6 flex flex-col items-center justify-center h-screen">
      {/* Header */}
      <h1 className="text-6xl font-bold text-center mb-16" style={{ marginTop: "-20px" }}>
        Welcome to <span className="blue_gradient">Eye Reader</span>
      </h1>

      <SearchBar></SearchBar>

      {/* Khong co ket qua */}
      {message && <div className="text-center text-xl text-red-500 mb-8">{message}</div>}

      {children}

      {books && books.length > 0 && !message && (
        <>
          <div className="flex items-center justify-center mb-16 space-x-8">
            {/* left btn */}
            <button
              onClick={goToPrevious}
              disabled={currentIndex === 0}
              className={`p-10 rounded-full bg-[#aac7ff] text-white text-5xl shadow-lg ${currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
              }active:bg-[#6495ed]`}
            >
              <AiOutlineLeft />
            </button>

            {/* book list */}
            <div 
              className="grid gap-8" 
              style={{ 
                gridTemplateColumns: `repeat(${booksPerPage}, 1fr)`
              }}
            >
              {books.slice(currentIndex, currentIndex + booksPerPage).map((book, index) => (
                <div 
                  key={index} 
                  className="bg-white text-black rounded-xl p-6 shadow-lg flex flex-col items-center space-y-6" 
                  style={{ width: '260px', height: '380px' }}
                >
                  <div className="relative w-full h-2/3">
                    <img
                      src={`https://otruyenapi.com/uploads/comics/${book.thumb_url}`} // Duong dan anh cua truyen
                      alt={book.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-sm px-2 py-1 rounded">
                      Chap {book.chaptersLatest[0]?.chapter_name}
                    </span>
                  </div>
                  <h2 className="text-center text-xl font-semibold">{book.name}</h2>
                </div>
              ))}
            </div>

            {/* rigth btn */}
            <button
              onClick={goToNext}
              disabled={currentIndex + booksPerPage >= books.length}
              className={`p-10 rounded-full bg-[#aac7ff] text-white text-5xl shadow-lg ${currentIndex + booksPerPage >= books.length ? "opacity-50 cursor-not-allowed" : ""
              }active:bg-[#6495ed]`}
            >
              <AiOutlineRight />
            </button>
          </div>
          
          <div className="text-lg font-semibold text-gray-700 mt-4">
            Page {currentPage} / {totalPages}
          </div>
        </> 
      
      )}
    </div>
  );
};

export default Layout;

  