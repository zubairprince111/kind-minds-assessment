import { Button } from "@/components/ui/button";
import { Heart, Shield, Clock } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen gradient-soft flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-2xl w-full animate-fade-in">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Heart className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Mental Health Assessment
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              A confidential self-assessment to help you understand your emotional well-being.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3 mb-10">
            <div className="bg-card rounded-xl p-5 border border-border shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center mb-3">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Anonymous</h3>
              <p className="text-sm text-muted-foreground">
                Your responses are completely confidential
              </p>
            </div>
            <div className="bg-card rounded-xl p-5 border border-border shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center mb-3">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">5-10 Minutes</h3>
              <p className="text-sm text-muted-foreground">
                Complete at your own pace
              </p>
            </div>
            <div className="bg-card rounded-xl p-5 border border-border shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center mb-3">
                <Heart className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">24 Questions</h3>
              <p className="text-sm text-muted-foreground">
                Comprehensive assessment
              </p>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border shadow-sm mb-8">
            <h2 className="font-semibold text-foreground mb-3">Important Disclaimer</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This assessment is a screening tool and is <strong>not a medical diagnosis</strong>. 
              It is designed to help identify potential symptoms that may warrant professional attention. 
              If you are experiencing thoughts of self-harm or suicide, please seek immediate help by 
              contacting a mental health professional or emergency services. Always consult with a 
              qualified healthcare provider for proper diagnosis and treatment.
            </p>
          </div>

          <div className="text-center">
            <Button variant="calm" size="xl" onClick={onStart}>
              Begin Assessment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
