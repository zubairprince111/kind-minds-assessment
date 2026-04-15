import { useState } from "react";
import WelcomeScreen from "@/components/WelcomeScreen";
import QuestionCard from "@/components/QuestionCard";
import ResultScreen from "@/components/ResultScreen";
import { questions, calculateResult, AssessmentResult } from "@/data/questions";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type AppState = "welcome" | "assessment" | "result";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("welcome");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null)
  );
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

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

    const assessmentResult = calculateResult(validAnswers);
    setResult(assessmentResult);
    setAppState("result");

    const { error } = await supabase.from("assessments").insert({
      score: assessmentResult.score,
      category: assessmentResult.category,
      answers: validAnswers,
    });

    if (error) {
      console.error("Error saving assessment:", error);
      toast({
        title: "Note",
        description: "Your results were displayed, but there was an issue saving your submission.",
        variant: "destructive",
      });
    }

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
