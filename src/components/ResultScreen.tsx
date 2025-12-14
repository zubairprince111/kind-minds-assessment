import { Button } from "@/components/ui/button";
import { AssessmentResult } from "@/data/questions";
import { Heart, RotateCcw, Phone, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResultScreenProps {
  result: AssessmentResult;
  onRestart: () => void;
}

const ResultScreen = ({ result, onRestart }: ResultScreenProps) => {
  const colorClasses = {
    success: "bg-success text-success-foreground",
    mild: "bg-mild text-mild-foreground",
    moderate: "bg-moderate text-moderate-foreground",
    severe: "bg-severe text-severe-foreground",
    profound: "bg-profound text-profound-foreground",
  };

  const bgColorClasses = {
    success: "bg-success/10 border-success/30",
    mild: "bg-mild/10 border-mild/30",
    moderate: "bg-moderate/10 border-moderate/30",
    severe: "bg-severe/10 border-severe/30",
    profound: "bg-profound/10 border-profound/30",
  };

  return (
    <div className="min-h-screen gradient-soft flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-2xl w-full animate-fade-in">
          {/* Result Card */}
          <div className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden mb-8">
            <div className={cn("py-8 px-6 text-center", colorClasses[result.color as keyof typeof colorClasses])}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4">
                <Heart className="w-8 h-8" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                {result.category}
              </h1>
              <p className="text-lg opacity-90">
                Score: {result.score} / 72
              </p>
            </div>

            <div className="p-6">
              <p className="text-muted-foreground leading-relaxed text-center">
                {result.description}
              </p>
            </div>
          </div>

          {/* Resources Section */}
          <div className={cn("rounded-xl p-6 border mb-8", bgColorClasses[result.color as keyof typeof bgColorClasses])}>
            <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5 text-primary" />
              Resources & Support
            </h2>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <ExternalLink className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                <span>
                  <strong>National Suicide Prevention Lifeline:</strong> 988 (US)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <ExternalLink className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                <span>
                  <strong>Crisis Text Line:</strong> Text HOME to 741741
                </span>
              </li>
              <li className="flex items-start gap-2">
                <ExternalLink className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                <span>
                  <strong>International Association for Suicide Prevention:</strong>{" "}
                  <a href="https://www.iasp.info/resources/Crisis_Centres/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Find a crisis center
                  </a>
                </span>
              </li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="bg-card rounded-xl p-6 border border-border shadow-sm mb-8">
            <p className="text-sm text-muted-foreground text-center">
              <strong>Important:</strong> This assessment is a screening tool and does not replace 
              a professional diagnosis. If you're experiencing distress, please consult with a 
              qualified mental health professional.
            </p>
          </div>

          {/* Restart Button */}
          <div className="text-center">
            <Button variant="outline" size="lg" onClick={onRestart} className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Take Assessment Again
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
