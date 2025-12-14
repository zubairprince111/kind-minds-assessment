import { Button } from "@/components/ui/button";
import { Heart, Shield, Clock, Sparkles } from "lucide-react";
import { motion, type Easing } from "framer-motion";

interface WelcomeScreenProps {
  onStart: () => void;
}

const FloatingOrb = ({ 
  className, 
  size, 
  delay = 0 
}: { 
  className?: string; 
  size: string; 
  delay?: number;
}) => (
  <motion.div
    className={`absolute rounded-full blur-3xl opacity-30 ${className}`}
    style={{ width: size, height: size }}
    animate={{
      y: [0, -30, 10, 0],
      x: [0, 15, -10, 0],
      scale: [1, 1.1, 0.95, 1],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  />
);

const easeOut: Easing = [0.4, 0, 0.2, 1];

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: easeOut },
    },
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-background via-accent/20 to-background">
      {/* Floating Background Orbs */}
      <FloatingOrb 
        className="bg-primary top-20 -left-20" 
        size="300px" 
        delay={0} 
      />
      <FloatingOrb 
        className="bg-primary/60 top-40 right-10" 
        size="200px" 
        delay={2} 
      />
      <FloatingOrb 
        className="bg-accent bottom-20 left-1/3" 
        size="250px" 
        delay={4} 
      />
      <FloatingOrb 
        className="bg-primary/40 bottom-40 right-1/4" 
        size="180px" 
        delay={1} 
      />

      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-8 min-h-screen">
        <motion.div
          className="max-w-2xl w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div className="text-center mb-10" variants={itemVariants}>
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 mb-6 backdrop-blur-sm border border-primary/10"
              whileHover={{ scale: 1.1, rotate: 5 }}
              animate={{ 
                boxShadow: [
                  "0 0 20px rgba(var(--primary), 0.1)",
                  "0 0 40px rgba(var(--primary), 0.2)",
                  "0 0 20px rgba(var(--primary), 0.1)",
                ]
              }}
              transition={{ 
                boxShadow: { duration: 3, repeat: Infinity },
                scale: { duration: 0.2 }
              }}
            >
              <Heart className="w-10 h-10 text-primary animate-breathe" />
            </motion.div>
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight"
              variants={itemVariants}
            >
              Mental Health
              <span className="block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Assessment
              </span>
            </motion.h1>
            <motion.p 
              className="text-lg text-muted-foreground max-w-md mx-auto"
              variants={itemVariants}
            >
              A confidential self-assessment to help you understand your emotional well-being.
            </motion.p>
          </motion.div>

          {/* Feature Cards */}
          <motion.div 
            className="grid gap-4 md:grid-cols-3 mb-10"
            variants={itemVariants}
          >
            {[
              { icon: Shield, title: "Anonymous", desc: "Your responses are completely confidential" },
              { icon: Clock, title: "5-10 Minutes", desc: "Complete at your own pace" },
              { icon: Sparkles, title: "24 Questions", desc: "Comprehensive assessment" },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                className="group bg-card/50 backdrop-blur-md rounded-xl p-5 border border-white/10 shadow-lg hover:shadow-primary/20 hover:border-primary/30 transition-all duration-300 cursor-default"
                variants={cardVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                custom={index}
              >
                <motion.div 
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: 15, scale: 1.2 }}
                >
                  <item.icon className="w-6 h-6 text-primary" />
                </motion.div>
                <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div 
            className="text-center"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                variant="calm" 
                size="xl" 
                onClick={onStart}
                className="relative overflow-hidden group"
              >
                <span className="relative z-10">Begin Assessment</span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </Button>
            </motion.div>
            <p className="text-xs text-muted-foreground mt-4">
              Takes about 5-10 minutes • Completely anonymous
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
