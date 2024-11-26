import { useEffect, useState } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { useRouter } from 'next/router';

const QuizPage = () => {
  const [quizSets, setQuizSets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchQuizSets = async () => {
      const response = await fetch('/api/quiz');
      const data = await response.json();
      setQuizSets(data.quizSets);
    };

    fetchQuizSets();
  }, []);

  const filteredQuizSets = selectedCategory
    ? quizSets.filter(set => set.category === selectedCategory)
    : quizSets;

  const quizSetsPerPage = 3;
  const totalPages = Math.ceil(filteredQuizSets.length / quizSetsPerPage);
  const currentSets = filteredQuizSets.slice(
    (currentPage - 1) * quizSetsPerPage,
    currentPage * quizSetsPerPage
  );

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); 
  };

  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) => {
      if (direction === 'prev') {
        return Math.max(prevPage - 1, 1);
      } else if (direction === 'next') {
        return Math.min(prevPage + 1, totalPages);
      }
      return prevPage;
    });
  };

  const handleCardClick = (setId) => {
    router.push(`/quiz/${setId}`);  // Chuyen den trang lam quiz
  };

  return (
    <div className="container mx-auto p-6 flex flex-col items-center justify-center h-screen">
      <div className="font-sans p-8">
        {/* Heading */}
        <h1 className="text-6xl font-bold text-center mb-16">QUIZ</h1>

        {/* Cac button chon category */}
        <div className="grid grid-cols-4 gap-10 place-items-center max-w-5xl mx-auto">
        {['General Knowledge', 'Books', 'Science & Nature', 'Sports', 'Film', 'Music', 'Animals', 'Animation'].map((category) => (
            <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className="btn-category w-48"
            >
            {category}
            </button>
        ))}
        </div>

      </div>

      <div className="flex justify-center items-center my-10 max-w-5xl mx-auto">
        {/* left btn */}
        <button
            onClick={() => handlePageChange('prev')}
            disabled={currentPage === 1}
            className={`p-10 rounded-full bg-[#aac7ff] text-white text-5xl shadow-lg ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }active:bg-[#6495ed]`}
            style={{ marginRight: '50px' }}
        >
            <AiOutlineLeft />
        </button>

        <div
            className="grid gap-16" 
            style={{ 
            gridTemplateColumns: `repeat(${quizSetsPerPage}, 1fr)`,
            }}
        >
            {currentSets.map((set) => (
            <div 
                key={set.set_id} 
                onClick={() => handleCardClick(set.set_id)}
                className="bg-white text-black rounded-xl p-6 shadow-lg flex flex-col items-center space-y-6"
                style={{ width: '260px', height: '380px' }}
            >
                <div className="relative w-full h-2/3">
                <img
                    src={set.image_url} 
                    alt={set.category}
                    className="w-full h-full object-cover rounded-lg"
                />
                </div>
                <h2 className="text-center text-xl font-semibold">{set.category}</h2>
                <h2 className="text-center text-xl">{set.set_id}</h2>
            </div>
            ))}
        </div>

        {/* rigth btn */}
        <button
            onClick={() => handlePageChange('next')}
            disabled={currentPage === totalPages}
            className={`p-10 rounded-full bg-[#aac7ff] text-white text-5xl shadow-lg ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }active:bg-[#6495ed]`}
            style={{ marginLeft: '50px' }}
        >
            <AiOutlineRight />
        </button>
      </div>

    </div>
  );
};

export default QuizPage;
