import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { motion } from 'framer-motion';

export default function BookDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const [book, setBook] = useState(null);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const chaptersPerPage = 5;

  useEffect(() => {
    if (slug) {
      fetchBookDetail(slug);
    }
  }, [slug]);

  const fetchBookDetail = async (bookSlug) => {
    try {
      const response = await axios.get(`https://otruyenapi.com/v1/api/truyen-tranh/${bookSlug}`, {
        headers: { Accept: 'application/json' },
      });
      const bookData = response.data?.data?.item || {};
      setBook(bookData);
    } catch (error) {
      console.error('Error fetching book detail:', error.message);
    }
  };

  const cleanContent = (rawContent) => {
    if (!rawContent) return '';
    let cleanedContent = rawContent.replace(/<\/?p>/g, '');
    cleanedContent = cleanedContent.replace(/^19\s*/, '');
    return cleanedContent.length > 500 ? cleanedContent.slice(0, 500) + '...' : cleanedContent.trim();
  };

  const handleNext = () => {
    if (currentChapterIndex + chaptersPerPage < book.chapters[0].server_data.length) {
      setCurrentChapterIndex(currentChapterIndex + chaptersPerPage);
    }
  };

  const handlePrevious = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(currentChapterIndex - chaptersPerPage);
    }
  };

  if (!book) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
        ></motion.div>
      </div>
    );
  }

  const chapters = book?.chapters?.[0]?.server_data || [];
  const totalPages = Math.ceil(chapters.length / chaptersPerPage);
  const currentPage = Math.floor(currentChapterIndex / chaptersPerPage) + 1;

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-start space-x-6 mb-6">
        <img
          src={`https://otruyenapi.com/uploads/comics/${book.thumb_url}`}
          alt={book.name}
          className="w-1/6 h-auto object-cover rounded-lg shadow-lg"
        />

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{book.name}</h1>
          <p className="text-lg text-gray-600 mb-6" style={{ fontSize: '30px', lineHeight: '1.5' }}>
            {cleanContent(book.content) || 'Không có mô tả.'}
          </p>
        </div>
      </div>

      <div className="relative">
        {/* Nút Previous */}
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={handlePrevious}
          disabled={currentChapterIndex === 0}
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 text-white p-4 rounded-full shadow-lg ${
            currentChapterIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'
          }`}
          style={{ width: '60px', height: '60px' }}
        >
          <AiOutlineLeft size={30} />
        </motion.button>

        {/* Lưới chương */}
        <motion.div
          className="grid mx-20 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            gridTemplateColumns: `repeat(${chaptersPerPage}, 1fr)`,
            gridAutoRows: '1fr',
          }}
        >
          {chapters.slice(currentChapterIndex, currentChapterIndex + chaptersPerPage).map((chapter, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm flex items-center justify-center shadow-lg"
              style={{
                aspectRatio: '1',
              }}
              onClick={() => {
                const chapterId = chapter.chapter_api_data.split('/').pop();
                router.push(`/book/chapter/${chapterId}`);
              }}
            >
              {chapter.chapter_name}
            </motion.button>
          ))}
        </motion.div>

        {/* Nút Next */}
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleNext}
          disabled={currentChapterIndex + chaptersPerPage >= chapters.length}
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 text-white p-4 rounded-full shadow-lg ${
            currentChapterIndex + chaptersPerPage >= chapters.length
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-gray-400'
          }`}
          style={{ width: '60px', height: '60px' }}
        >
          <AiOutlineRight size={30} />
        </motion.button>
      </div>

      {/* Nút quay lại */}
      <div className="flex mt-8">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.back()}
          className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 shadow-lg"
          style={{ width: '200px', height: '60px' }}
        >
          Quay lại
        </motion.button>
      </div>
    </div>
  );
}
