import { pauseWebGazer, resumeWebGazer } from "@/components/webGazerWrapper";
import { useEffect, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import axios from "axios";
import Layout from "@/components/Layout";

export default function BooksList() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const booksPerPage = 4; 
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // resumeWebGazer();
    fetchBooks();
    // return () => pauseWebGazer();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('https://otruyenapi.com/v1/api/danh-sach/hoan-thanh?page=1', {
        headers: { 'Accept': 'application/json' }
      });
      setBooks(response.data?.data?.items || []); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

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

  return (
    <Layout books={books} currentIndex={currentIndex} goToNext={goToNext} goToPrevious={goToPrevious}>
      {/* Nội dung sẽ được hiển thị ở Layout */}
    </Layout>
  );
}
