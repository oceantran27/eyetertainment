import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const QuizDetailPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const { query } = useRouter();
  const { setId } = query;
  const router = useRouter();

  useEffect(() => {
    if (setId) {
      const fetchQuestions = async () => {
        const response = await fetch(`/api/quiz/${setId}`);
        const data = await response.json();
        setQuestions(data.questions);
      };

      fetchQuestions();
    }
  }, [setId]);

  const handleAnswerClick = (answer) => {
    if (answer === questions[currentQuestionIndex].correct_answer) {
      setScore(prevScore => prevScore + 1); // Tinh diem
    }

    setSelectedAnswer(answer);
    setTimeout(() => {
      setSelectedAnswer(null);
      setCurrentQuestionIndex(prevIndex => prevIndex + 1); // chuyen cau hoi
    }, 0); 
  };

  // kiem tra xem het cau hoi chua
  if (currentQuestionIndex >= questions.length) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white w-[1000px] h-[600px] p-6 rounded-xl flex flex-col justify-between">
          <h1 className="text-2xl font-bold mb-8 text-black text-center mt-10">Quiz Completed</h1>
          <p className="text-3xl font-semibold text-lg mb-6 text-black text-center">Your score: {score} / {questions.length}</p>
          <button 
            onClick={() => router.push('/quiz')} 
            className="bg-[#aac7ff] font-bold text-white w-[300px] h-[100px] py-3 rounded-lg text-xl hover:bg-[#6495ed] transition mb-10 mx-auto">
            Try Another Quiz
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  // shuffle answers
  const allAnswers = [
    ...JSON.parse(currentQuestion.incorrect_answers), 
    currentQuestion.correct_answer
  ];
  const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white w-[1000px] h-[600px] p-6 rounded-xl flex flex-col justify-between">
        <h1 className="text-2xl font-bold mb-8 text-black text-center mt-10">CÂU HỎI {currentQuestionIndex + 1}: {currentQuestion.question}</h1>

        <div className="grid grid-cols-2 gap-10 justify-items-center">
          {shuffledAnswers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(answer)}
              className={`w-[300px] h-[100px] py-4 rounded-lg text-white font-semibold bg-[#aac7ff] hover:bg-[#6495ed] transition 
                ${selectedAnswer === answer ? 'bg-[#6495ed]' : ''} text-2xl`}
            >
              {answer}
            </button>
          ))}
        </div>

        <div className="mt-6 text-black text-lg font-bold text-center">Score: {score}</div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { setId } = context.params;
  return {
    props: {
      setId, 
    },
  };
}

export default QuizDetailPage;
