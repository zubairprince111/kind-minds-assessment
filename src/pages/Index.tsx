import { useState } from "react";
import WelcomeScreen from "@/components/WelcomeScreen";
import QuestionCard from "@/components/QuestionCard";
import ResultScreen from "@/components/ResultScreen";
import { questions, calculateResult, AssessmentResult } from "@/data/questions";
import { Helmet } from "react-helmet-async";

type AppState = "welcome" | "assessment" | "result";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("welcome");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null)
  );
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStart = () => {
    setAppState("assessment");
    setCurrentQuestionIndex(0);
    setAnswers(new Array(questions.length).fill(null));
  };

  const handleSelectAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    const validAnswers = answers.filter((a): a is number => a !== null);
    if (validAnswers.length !== questions.length) return;

    setIsSubmitting(true);
    
    // Calculate result
    const assessmentResult = calculateResult(validAnswers);
    
    // TODO: Save to database when Supabase is connected
    // For now, just simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    setResult(assessmentResult);
    setAppState("result");
    setIsSubmitting(false);
  };

  const handleRestart = () => {
    setAppState("welcome");
    setCurrentQuestionIndex(0);
    setAnswers(new Array(questions.length).fill(null));
    setResult(null);
  };

  return (
    <>
      <Helmet>
        <title>Mental Health Assessment - Confidential Self-Assessment</title>
        <meta
          name="description"
          content="Take our confidential 24-question mental health assessment to understand your emotional well-being. Anonymous, secure, and based on clinical screening criteria."
        />
      </Helmet>

      {appState === "welcome" && <WelcomeScreen onStart={handleStart} />}

      {appState === "assessment" && (
        <QuestionCard
          question={questions[currentQuestionIndex]}
          currentIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          selectedAnswer={answers[currentQuestionIndex]}
          onSelectAnswer={handleSelectAnswer}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      )}

      {appState === "result" && result && (
        <ResultScreen result={result} onRestart={handleRestart} />
      )}
    </>
  );
};

export default Index;
