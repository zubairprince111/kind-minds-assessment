import { Button } from "@/components/ui/button";
import { AssessmentResult } from "@/data/questions";
import { Heart, RotateCcw, Phone, ExternalLink, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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

  const inspirationalQuotes: { [key: string]: string } = {
    success: "Keep shining! Your mental well-being is radiant. Continue to nurture your mind and soul.",
    mild: "You're in tune with your feelings, and that's a huge strength. Every small step you take is a victory.",
    moderate: "It's brave to face these feelings. Remember, you are stronger than you think, and support is all around you.",
    severe: "You are not alone in this. Reaching out is a sign of immense strength. Be gentle with yourself; healing takes time.",
    profound: "Your courage is profound. Please know that there are people who care deeply and want to help you through this. You are valued.",
  };

  const handleShare = () => {
    const shareText = `I just took a mental well-being assessment and my result is: ${result.category}. Prioritizing mental health is important. #MentalHealth #SelfCare`;
    if (navigator.share) {
      navigator.share({
        title: 'Mental Well-being Assessment',
        text: shareText,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(shareText).then(() => {
        alert("Result copied to clipboard!");
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-blue-50 dark:from-background dark:to-blue-900/20 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl w-full"
        >
          {/* Result Card */}
          <div className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden mb-8">
            <div className={cn("py-8 px-6 text-center", colorClasses[result.color as keyof typeof colorClasses])}>
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-white/20 mb-4">
                  <Heart className="w-16 h-16" />
                </div>
              </motion.div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {result.category}
              </h1>
              <p className="text-sm opacity-80 italic">Based on your answers</p>
            </div>

            <div className="p-6">
              <p className="text-muted-foreground leading-relaxed text-center text-lg">
                {result.description}
              </p>
              <div className="mt-6 text-center">
                <p className="text-lg font-medium text-primary italic">
                  `&ldquo;`{inspirationalQuotes[result.color]}`&rdquo;`
                </p>
              </div>
            </div>
          </div>

          {/* Resources Section */}
          <div className={cn("rounded-xl p-6 border mb-8", bgColorClasses[result.color as keyof typeof bgColorClasses])}>
            <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2 text-xl">
              <Phone className="w-6 h-6 text-primary" />
              Resources & Support
            </h2>
            <ul className="space-y-4 text-base text-muted-foreground">
              <li className="flex items-start gap-3">
                <ExternalLink className="w-5 h-5 mt-1 flex-shrink-0 text-primary" />
                <span>
                  <strong>Bangladeshi Emergency Help:</strong> 999
                </span>
              </li>
              <li className="flex items-start gap-3">
                <ExternalLink className="w-5 h-5 mt-1 flex-shrink-0 text-primary" />
                <span>
                  <strong>Kaan Pete Roi (Bangladesh):</strong> Call 09612-345-678
                </span>
              </li>
              <li className="flex items-start gap-3">
                <ExternalLink className="w-5 h-5 mt-1 flex-shrink-0 text-primary" />
                <span>
                  <strong>Moner Bondhu (Bangladesh):</strong> Call 01776-632-344
                </span>
              </li>
              <li className="flex items-start gap-3">
                <ExternalLink className="w-5 h-5 mt-1 flex-shrink-0 text-primary" />
                <span>
                  <strong>Crisis Text Line:</strong> Text HOME to 741741
                </span>
              </li>
              <li className="flex items-start gap-3">
                <ExternalLink className="w-5 h-5 mt-1 flex-shrink-0 text-primary" />
                <span>
                  <strong>International Crisis Centers:</strong>{" "}
                  <a href="https://www.iasp.info/resources/Crisis_Centres/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                    Find a center near you
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

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg" onClick={onRestart} className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Take Assessment Again
            </Button>
            <Button size="lg" onClick={handleShare} className="gap-2 bg-primary hover:bg-primary/90">
              <Share2 className="w-4 h-4" />
              Share Your Result
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultScreen;
