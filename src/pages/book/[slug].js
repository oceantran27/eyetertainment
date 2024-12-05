import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { motion } from "framer-motion";
import GazeButton from "@/components/gazeButton";

export const metadata = {
  title: "Book | Reading | Eyetertainment",
};

export default function BookDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const [book, setBook] = useState(null);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const chaptersPerPage = 4;

  useEffect(() => {
    document.title = metadata.title;
  }, []);

  useEffect(() => {
    if (slug) {
      fetchBookDetail(slug);
    }
  }, [slug]);

  const fetchBookDetail = async (bookSlug) => {
    try {
      const response = await axios.get(
        `https://otruyenapi.com/v1/api/truyen-tranh/${bookSlug}`,
        {
          headers: { Accept: "application/json" },
        }
      );
      const bookData = response.data?.data?.item || {};
      setBook(bookData);
    } catch (error) {
      console.error("Error fetching book detail:", error.message);
    }
  };

  const cleanContent = (rawContent) => {
    if (!rawContent) return "";
    let cleanedContent = rawContent.replace(/<\/?p>/g, "");
    cleanedContent = cleanedContent.replace(/^19\s*/, "");
    return cleanedContent.length > 500
      ? cleanedContent.slice(0, 500) + "..."
      : cleanedContent.trim();
  };

  const handleNext = () => {
    if (
      currentChapterIndex + chaptersPerPage <
      book.chapters[0].server_data.length
    ) {
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
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
        ></motion.div>
      </div>
    );
  }

  const chapters = book?.chapters?.[0]?.server_data || [];
  const totalPages = Math.ceil(chapters.length / chaptersPerPage);
  const currentPage = Math.floor(currentChapterIndex / chaptersPerPage) + 1;

  return (
    <div className="container mx-auto p-6 flex flex-col items-center justify-center h-screen">
      <div className="flex items-start space-x-8 mb-16">
        <img
          src={`https://otruyenapi.com/uploads/comics/${book.thumb_url}`}
          alt={book.name}
          className="w-1/4 h-auto object-cover rounded-lg shadow-lg"
          style={{ maxWidth: "300px" }}
        />

        <div className="flex-1 max-w-2xl">
          <h1 className="text-3xl font-bold mb-4 text-[#e2e2e9]">
            {book.name}
          </h1>
          <p className="text-lg text-[#adc6ff] mb-6">
            {cleanContent(book.content) || "Không có mô tả."}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center mb-16 space-x-8">
        {/* Nút Previous */}
        <GazeButton
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={handlePrevious}
          disabled={currentChapterIndex === 0}
          className={`p-10 rounded-full bg-[#1e1f25] text-white text-5xl shadow-lg transform transition-transform duration-300 hover:scale-110 ${
            currentChapterIndex === 0
              ? "opacity-50 cursor-not-allowed"
              : "hover:shadow-xl"
          }active:scale-95`}
        >
          <AiOutlineLeft/>
        </GazeButton>

        {/* Lưới chương */}
        <motion.div
          className="grid gap-4 md:gap-8 sm:grid-cols-2 md:grid-cols-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            gridTemplateColumns: `repeat(${chaptersPerPage}, 1fr)`
          }}
        >
          {chapters
            .slice(currentChapterIndex, currentChapterIndex + chaptersPerPage)
            .map((chapter, index) => (
              <GazeButton
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#debcdf] text-[#402843] rounded-lg hover:bg-[#583e5b] hover:text-[#fcd7fb] text-2xl flex items-center justify-center shadow-lg "
                style={{
                  width: "200px",
                  height: "100px"
                }}
                onClick={() => {
                  const chapterId = chapter.chapter_api_data.split("/").pop();
                  router.push(`/book/chapter/${chapterId}`);
                }}
              >
                Chap {chapter.chapter_name}
              </GazeButton>
            ))}
        </motion.div>

        {/* Nút Next */}
        <GazeButton
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleNext}
          disabled={currentChapterIndex + chaptersPerPage >= chapters.length}
          className={`p-10 rounded-full bg-[#1e1f25] text-white text-5xl shadow-lg transform transition-transform duration-300 hover:scale-110 ${
            currentChapterIndex + chaptersPerPage >= chapters.length
              ? "opacity-50 cursor-not-allowed"
              : "hover:shadow-xl"
          }active:scale-95`}
        >
          <AiOutlineRight/>
        </GazeButton>
      </div>

      {/* Nút quay lại */}
      <div className="flex mt-8">
        <GazeButton
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.back()}
          className="bg-[#bfc6dc] text-[#293041] px-6 py-2 rounded-lg hover:bg-[#3f4759] hover:text-[#dbe2f9] shadow-lg"
          style={{ width: "200px", height: "60px" }}
        >
          Back
        </GazeButton>
      </div>
    </div>
  );
}
