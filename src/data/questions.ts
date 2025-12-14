export interface Question {
  id: number;
  title: string;
  options: {
    value: number;
    label: string;
  }[];
}

export const questions: Question[] = [
  {
    id: 1,
    title: "Sadness / Low Mood",
    options: [
      { value: 0, label: "I do not feel very sad." },
      { value: 1, label: "Feeling sad is a problem for me." },
      { value: 2, label: "I feel sad for most of the day." },
      { value: 3, label: "I feel so sad all day that it is unbearable." }
    ]
  },
  {
    id: 2,
    title: "Lack of Joy",
    options: [
      { value: 0, label: "I have as much joy in my mind as before." },
      { value: 1, label: "I do not find joy like before anymore." },
      { value: 2, label: "The lack of joy causes me quite a bit of suffering." },
      { value: 3, label: "Life has become completely joyless." }
    ]
  },
  {
    id: 3,
    title: "Crying / Tearfulness",
    options: [
      { value: 0, label: "The feeling of crying is normal within me." },
      { value: 1, label: "Lately, I feel like crying quite a bit." },
      { value: 2, label: "I feel like crying much more than before." },
      { value: 3, label: "Crying wells up from inside me with or without reason." }
    ]
  },
  {
    id: 4,
    title: "Restlessness / Unease",
    options: [
      { value: 0, label: "I do not feel restless." },
      { value: 1, label: "I feel restless." },
      { value: 2, label: "I feel restless for most of the time." },
      { value: 3, label: "I feel so restless that it is unbearable." }
    ]
  },
  {
    id: 5,
    title: "Lack of Interest",
    options: [
      { value: 0, label: "I have no lack of interest." },
      { value: 1, label: "My interest has decreased compared to before." },
      { value: 2, label: "I do not find interest in anything anymore." },
      { value: 3, label: "My interest has decreased so much that I cannot maintain interest even if I force myself." }
    ]
  },
  {
    id: 6,
    title: "Thoughts of Insignificance or Worthlessness",
    options: [
      { value: 0, label: "I can see my importance or worth." },
      { value: 1, label: "Nowadays, doubts have arisen within me about my own importance or worth." },
      { value: 2, label: "I feel insignificant or worthless most of the time." },
      { value: 3, label: "It seems my life has no value anymore." }
    ]
  },
  {
    id: 7,
    title: "Hopelessness",
    options: [
      { value: 0, label: "I am not hopeless about the future." },
      { value: 1, label: "I feel hopeless." },
      { value: 2, label: "I have no hope of anything good happening anymore." },
      { value: 3, label: "I feel so hopeless that I cannot think of anything regarding the future." }
    ]
  },
  {
    id: 8,
    title: "Desire to Die",
    options: [
      { value: 0, label: "I have no desire to die." },
      { value: 1, label: "I feel it would be better if I died." },
      { value: 2, label: "Sometimes I have a desire to die." },
      { value: 3, label: "Often, the urge to commit suicide works within me." }
    ]
  },
  {
    id: 9,
    title: "Suicide Plan",
    options: [
      { value: 0, label: "I have no plan for suicide." },
      { value: 1, label: "I have a suicide plan." },
      { value: 2, label: "I have made a detailed plan to commit suicide." },
      { value: 3, label: "Recently, I attempted suicide (not on impulse)." }
    ]
  },
  {
    id: 10,
    title: "Sense of Loss",
    options: [
      { value: 0, label: "I don't really have a sense of loss." },
      { value: 1, label: "I feel like I am gradually losing whatever I had." },
      { value: 2, label: "Whatever I have lost keeps coming to my mind all the time." },
      { value: 3, label: "The thought that \"everything of mine is finished\" pains me all the time." }
    ]
  },
  {
    id: 11,
    title: "Pain of Deprivation",
    options: [
      { value: 0, label: "I don't think much about wants and needs in life." },
      { value: 1, label: "Sometimes regret for not getting things comes to mind." },
      { value: 2, label: "Often it feels like I received nothing in life." },
      { value: 3, label: "The pain of what I didn't get in life constantly revolves in my mind." }
    ]
  },
  {
    id: 12,
    title: "Incompetence and Failure",
    options: [
      { value: 0, label: "I have confidence in my competence/ability." },
      { value: 1, label: "I feel I am an incompetent person." },
      { value: 2, label: "Often I feel that I won't be able to achieve anything." },
      { value: 3, label: "I am certain that I am an incompetent and failed person." }
    ]
  },
  {
    id: 13,
    title: "Guilt",
    options: [
      { value: 0, label: "I don't really have any feelings of guilt." },
      { value: 1, label: "Sometimes guilt works within me." },
      { value: 2, label: "I suffer from guilt almost all the time and blame myself." },
      { value: 3, label: "It seems I am responsible for everything and am being punished for it." }
    ]
  },
  {
    id: 14,
    title: "Lack of Self-Confidence",
    options: [
      { value: 0, label: "My self-confidence is the same as always." },
      { value: 1, label: "My self-confidence has decreased compared to before." },
      { value: 2, label: "I feel a lack of self-confidence in everything." },
      { value: 3, label: "My self-confidence has decreased so much that I don't find the courage to do anything anymore." }
    ]
  },
  {
    id: 15,
    title: "Feeling of Emptiness",
    options: [
      { value: 0, label: "I do not feel empty or hollow inside." },
      { value: 1, label: "Sometimes I feel empty or hollow inside." },
      { value: 2, label: "A feeling of emptiness works inside me all the time." },
      { value: 3, label: "An unbearable emptiness works inside me that is impossible to explain to anyone." }
    ]
  },
  {
    id: 16,
    title: "Lack of Concentration",
    options: [
      { value: 0, label: "I don't really have any problem with my concentration." },
      { value: 1, label: "Recently, I am having trouble with concentration." },
      { value: 2, label: "Nowadays, I cannot concentrate on many things." },
      { value: 3, label: "Lack of concentration is creating difficulties in almost every area of my life." }
    ]
  },
  {
    id: 17,
    title: "Thinking and Decision Making Problems",
    options: [
      { value: 0, label: "My ability to think or make decisions is normal." },
      { value: 1, label: "Recently, it seems I cannot think or make decisions like before." },
      { value: 2, label: "I am facing many problems regarding thinking or making decisions." },
      { value: 3, label: "I have completely lost the ability to think or make decisions." }
    ]
  },
  {
    id: 18,
    title: "Slowed Activity/Work Speed",
    options: [
      { value: 0, label: "I can carry on my activities normally." },
      { value: 1, label: "The speed of my activities has decreased." },
      { value: 2, label: "Others are also talking about how I cannot work like before." },
      { value: 3, label: "Recently, doing any work has become impossible for me." }
    ]
  },
  {
    id: 19,
    title: "Lack of Interest in Social Interaction",
    options: [
      { value: 0, label: "I don't feel bad mixing with or talking to people." },
      { value: 1, label: "I don't like mixing with or talking to people much anymore." },
      { value: 2, label: "Nowadays I don't like mixing with or talking to people at all." },
      { value: 3, label: "Mixing or talking with people is so painful/difficult for me that I have almost stopped doing it." }
    ]
  },
  {
    id: 20,
    title: "Weakness and Fatigue",
    options: [
      { value: 0, label: "I have no problem with weakness or fatigue." },
      { value: 1, label: "I get weak or tired easily." },
      { value: 2, label: "I am having quite a bit of difficulty doing my work due to weakness or fatigue." },
      { value: 3, label: "I stay so weak or tired that I cannot do anything." }
    ]
  },
  {
    id: 21,
    title: "Change in Appetite",
    options: [
      { value: 0, label: "My interest in eating is normal." },
      { value: 1, label: "My appetite has decreased or increased somewhat compared to before." },
      { value: 2, label: "My appetite has decreased or increased a lot compared to before." },
      { value: 3, label: "My appetite has decreased or increased so much that I (or others) have become worried about it." }
    ]
  },
  {
    id: 22,
    title: "Change in Weight",
    options: [
      { value: 0, label: "My weight is the same as before." },
      { value: 1, label: "My weight has decreased or increased somewhat compared to before." },
      { value: 2, label: "My weight has decreased or increased so much that others are also noticing or mentioning it." },
      { value: 3, label: "My weight has decreased or increased so much that it has created a health risk for me." }
    ]
  },
  {
    id: 23,
    title: "Change in Sleep",
    options: [
      { value: 0, label: "I have no problem with my sleep." },
      { value: 1, label: "My sleep has decreased or increased somewhat compared to before." },
      { value: 2, label: "My sleep has decreased or increased a lot compared to before." },
      { value: 3, label: "My sleep has decreased or increased so much that it is severely damaging my daily lifestyle." }
    ]
  },
  {
    id: 24,
    title: "Loss of Sexual Interest",
    options: [
      { value: 0, label: "My interest in sexual matters is at a normal level." },
      { value: 1, label: "My interest in sexual matters has decreased compared to before." },
      { value: 2, label: "I have become worried about the decrease in sexual interest." },
      { value: 3, label: "Nowadays I don't feel any interest in sexual matters at all." }
    ]
  }
];

export interface AssessmentResult {
  score: number;
  category: string;
  description: string;
  color: string;
}

export function calculateResult(answers: number[]): AssessmentResult {
  const score = answers.reduce((sum, val) => sum + val, 0);
  
  if (score < 25) {
    return {
      score,
      category: "Below Clinical Threshold",
      description: "Your responses indicate that you are likely not experiencing clinical depression. Continue to take care of your mental health and reach out if things change.",
      color: "success"
    };
  } else if (score <= 34) {
    return {
      score,
      category: "Mild Depression",
      description: "Your responses suggest mild depressive symptoms. Consider speaking with a mental health professional for guidance and support.",
      color: "mild"
    };
  } else if (score <= 43) {
    return {
      score,
      category: "Moderate Depression",
      description: "Your responses indicate moderate depressive symptoms. We recommend consulting with a mental health professional for a proper evaluation.",
      color: "moderate"
    };
  } else if (score <= 50) {
    return {
      score,
      category: "Severe Depression",
      description: "Your responses suggest severe depressive symptoms. Please seek professional help as soon as possible. You don't have to face this alone.",
      color: "severe"
    };
  } else {
    return {
      score,
      category: "Profound Depression",
      description: "Your responses indicate profound depressive symptoms. Please reach out to a mental health professional or crisis helpline immediately.",
      color: "profound"
    };
  }
}
