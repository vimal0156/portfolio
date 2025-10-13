interface QuizAnswers {
  background_level: string
  main_goal: string
  topics_interest: string[]
  math_confidence: number
  coding_confidence: number
  time_investment: string
  learning_preference: string
  payment_willingness: string
  start_timeline: string
}

export interface Persona {
  id: string
  name: string
  emoji: string
  description: string
}

export function calculatePersona(answers: QuizAnswers): Persona {
  const {
    background_level,
    main_goal,
    topics_interest,
    math_confidence,
    coding_confidence,
    time_investment,
    learning_preference,
    payment_willingness,
    start_timeline,
  } = answers

  // Check for The Hustler (most specific, highest priority)
  if (
    start_timeline === "now" &&
    (time_investment === "10_plus" || time_investment === "6_10") &&
    (payment_willingness === "mentoring" || payment_willingness === "under_30") &&
    math_confidence >= 3 &&
    coding_confidence >= 3
  ) {
    return {
      id: "hustler",
      name: "The Hustler",
      emoji: "🚀",
      description: "You're all in. Maximum commitment, strong fundamentals, and ready to grind right now. You understand that mastery requires intensity, and you're willing to invest both time and money to accelerate your learning. You're not here to explore, you're here to execute."
    }
  }

  // Check for The Career Switcher
  if (
    (main_goal === "quant_career" || main_goal === "interview_prep") &&
    (start_timeline === "month" || start_timeline === "now") &&
    (time_investment === "6_10" || time_investment === "10_plus")
  ) {
    return {
      id: "career_switcher",
      name: "The Career Switcher",
      emoji: "📈",
      description: "You're serious about breaking into quantitative finance. You need structured learning, interview preparation, and a clear path to landing your target role. You're committed to putting in the hours and willing to invest in your transition. This isn't a hobby, it's a career move."
    }
  }

  // Check for The Trading System Builder
  if (
    main_goal === "algo_trading" &&
    learning_preference === "projects" &&
    (topics_interest.includes("optimization") || 
     topics_interest.includes("python") || 
     topics_interest.includes("quant_finance"))
  ) {
    return {
      id: "trading_builder",
      name: "The Trading System Builder",
      emoji: "💹",
      description: "You want to build real trading systems that work. Theory is useful, but you're focused on implementation, backtesting frameworks, order execution, risk management, and live deployment. You learn best by building, and you're ready to turn strategies into profitable code."
    }
  }

  // Check for The AI Quant
  if (
    (main_goal === "ai_ml_interest" || topics_interest.includes("ml")) &&
    (topics_interest.includes("python") || topics_interest.includes("stats"))
  ) {
    return {
      id: "ai_quant",
      name: "The AI Quant",
      emoji: "🤖",
      description: "You're fascinated by the intersection of machine learning and quantitative finance. Modern quant work involves deep learning, reinforcement learning, and advanced statistical models. You want to apply cutting-edge AI techniques to financial markets and stay ahead of the curve."
    }
  }

  // Check for The Math Specialist
  if (
    (background_level === "math_strong_code_weak" || 
     (math_confidence >= 3 && coding_confidence <= 2)) &&
    (main_goal === "math_improvement" || main_goal === "quant_career")
  ) {
    return {
      id: "math_specialist",
      name: "The Math Specialist",
      emoji: "🧮",
      description: "You have strong mathematical foundations and want to apply them to quantitative finance. Your challenge is learning to implement your theoretical knowledge through code. You understand the models deeply, now you need to translate that into working systems."
    }
  }

  // Check for The Code Builder
  if (
    background_level === "code_strong_math_weak" ||
    (coding_confidence >= 3 && math_confidence <= 2)
  ) {
    return {
      id: "code_builder",
      name: "The Code Builder",
      emoji: "💻",
      description: "You're a strong programmer looking to level up your quantitative and mathematical skills. You can build anything once you understand it, but you need to strengthen your foundation in probability, statistics, and financial mathematics. Your coding skills give you a huge advantage, you just need the theory."
    }
  }

  // Check for The Foundation Builder
  if (
    background_level === "complete_beginner" ||
    (math_confidence <= 2 && coding_confidence <= 2)
  ) {
    return {
      id: "foundation_builder",
      name: "The Foundation Builder",
      emoji: "🌱",
      description: "You're starting from the ground up, and that's perfectly fine. Everyone starts somewhere. You need a structured path that builds both your mathematical and programming foundations simultaneously. With consistent effort and the right guidance, you can absolutely reach your goals."
    }
  }

  // Check for The Curious Explorer
  if (
    main_goal === "exploring" ||
    start_timeline === "exploring" ||
    payment_willingness === "not_now"
  ) {
    return {
      id: "explorer",
      name: "The Curious Explorer",
      emoji: "🧭",
      description: "You're in discovery mode, exploring what quantitative finance has to offer. You're not rushing into anything, you want to understand the landscape first. That's smart. Take your time to explore different topics, see what resonates, and figure out where your interests truly lie."
    }
  }

  // Default fallback - should rarely hit this
  return {
    id: "explorer",
    name: "The Curious Explorer",
    emoji: "🧭",
    description: "You're in discovery mode, exploring what quantitative finance has to offer. You're not rushing into anything, you want to understand the landscape first. That's smart. Take your time to explore different topics, see what resonates, and figure out where your interests truly lie."
  }
}