import React from "react";
import { useQuiz } from "./context/QuizContext";
import Navbar from "./components/Navbar";
import StartScreen from "./components/StartScreen";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import Result from "./components/Result";

const App = () => {
  const { quizState } = useQuiz();

  console.log("App Rendered, quizState:", quizState); // Debugging log

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar />
      {quizState === "start" && <StartScreen />}
      {quizState === "quiz" && (
        <div className="flex flex-col md:flex-row flex-grow min-h-[calc(100vh-4rem)]">
          <Sidebar />
          <MainContent />
        </div>
      )}
      {quizState === "result" && (
        <div className="flex flex-grow items-center justify-center w-full min-h-[calc(100vh-4rem)]">
          <Result />
        </div>
      )}
    </div>
  );
};

export default App;
