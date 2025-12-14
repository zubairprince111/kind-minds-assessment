import { Button } from "@/components/ui/button";
import { Question } from "@/data/questions";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  onSelectAnswer: (value: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

const QuestionCard = ({
  question,
  currentIndex,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  onNext,
  onPrevious,
  onSubmit,
  isSubmitting = false,
}: QuestionCardProps) => {
  const progress = ((currentIndex + 1) / totalQuestions) * 100;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  return (
    <div className="min-h-screen gradient-soft flex flex-col">
      {/* Progress Bar */}
      <div className="w-full bg-muted h-1.5">
        <div
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-2xl w-full animate-fade-in" key={question.id}>
          {/* Question Header */}
          <div className="text-center mb-8">
            <span className="text-sm font-medium text-muted-foreground">
              Question {currentIndex + 1} of {totalQuestions}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-2">
              {question.title}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {question.options.map((option) => (
              <Button
                key={option.value}
                variant={selectedAnswer === option.value ? "optionSelected" : "option"}
                className="w-full"
                onClick={() => onSelectAnswer(option.value)}
              >
                <span className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-xs font-semibold">
                    {option.value}
                  </span>
                  <span className="text-left">{option.label}</span>
                </span>
              </Button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="ghost"
              onClick={onPrevious}
              disabled={currentIndex === 0}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            {isLastQuestion ? (
              <Button
                variant="calm"
                size="lg"
                onClick={onSubmit}
                disabled={selectedAnswer === null || isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Assessment"}
              </Button>
            ) : (
              <Button
                variant="calm"
                onClick={onNext}
                disabled={selectedAnswer === null}
                className="gap-2"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
