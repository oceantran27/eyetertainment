import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

const BookCard = ({ book, index }) => {
  const router = useRouter();

  return (
    <motion.div
      key={index}
      className="bg-[#f9f9ff] text-[#1a1b20] rounded-xl p-6 shadow-lg flex flex-col items-center space-y-6 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
      style={{ width: '260px', height: '380px' }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.1 }}
      onClick={() => router.push(`/book/${book.slug}`)}
    >
      <div className="relative w-full h-2/3" style={{ cursor: 'pointer' }}>
        <img
          src={`https://otruyenapi.com/uploads/comics/${book.thumb_url}`}
          alt={book.name}
          className="w-full h-full object-cover rounded-lg"
        />
        <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-sm px-2 py-1 rounded">
          Chap {book.chaptersLatest[0]?.chapter_name || 'N/A'}
        </span>
      </div>
      <h2 className="text-center text-xl font-semibold">{book.name}</h2>
    </motion.div>
  );
};

export default BookCard;

