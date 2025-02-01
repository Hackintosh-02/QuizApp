import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const QuizContext = createContext();
export const useQuiz = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timer, setTimer] = useState(10);
  const [quizEnded, setQuizEnded] = useState(false);
  const [quizState, setQuizState] = useState("start");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Fetching quiz data...");
    const fetchData = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL);
        console.log("Fetched Questions:", response.data.questions);
        setQuestions(response.data.questions || []);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log("Quiz State Changed:", quizState);
  }, [quizState]);

  useEffect(() => {
    if (quizState === "quiz" && timer > 0 && !quizEnded) {
      console.log("Starting Timer...");
      const interval = setInterval(() => {
        setTimer((prev) => {
          console.log("Timer Tick:", prev);
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    } else if (timer === 0) {
      console.log("Timer Ended, Ending Quiz...");
      endQuiz();
    }
  }, [timer, quizState, quizEnded]);

  const startQuiz = () => {
    console.log("startQuiz function called");
    setQuizState("quiz");
    setTimer(120);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setScore(0);
    setQuizEnded(false);
  };

  const endQuiz = () => {
    console.log("End Quiz Triggered");
    setQuizEnded(true);
    setQuizState("result");
    let finalScore = 0;
    questions.forEach((question, index) => {
      const correctOption = question.options.find((opt) => opt.is_correct);
      if (selectedAnswers[index] === correctOption?.id) {
        finalScore += 4;
      } else if (selectedAnswers[index]) {
        finalScore -= 1;
      }
    });
    setScore(finalScore);
  };

  return (
    <QuizContext.Provider
      value={{
        questions,
        currentQuestion,
        setCurrentQuestion,
        score,
        selectedAnswers,
        handleAnswer: (optionId) => setSelectedAnswers({ ...selectedAnswers, [currentQuestion]: optionId }),
        nextQuestion: () => setCurrentQuestion((prev) => Math.min(prev + 1, questions.length - 1)),
        prevQuestion: () => setCurrentQuestion((prev) => Math.max(prev - 1, 0)),
        timer,
        quizEnded,
        quizState,
        startQuiz,
        endQuiz,
        loading,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
