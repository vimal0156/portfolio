"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ArrowLeft, Mail, Sparkles, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { QuizProgress } from "./components/quiz-progress"
import { QuizOption } from "./components/quiz-option"
import { QuizSlider } from "./components/quiz-slider"
import { supabase, type QuizResponse } from "@/lib/supabase"
import { toast } from "sonner"
import { calculatePersona, type Persona } from "./utils/calculate-persona"
import { PersonaResult } from "./components/persona-results"


export default function LearnQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)
  const [assignedPersona, setAssignedPersona] = useState<Persona | null>(null)

  // Quiz answers
  const [answers, setAnswers] = useState({
    background_level: "",
    main_goal: "",
    topics_interest: [] as string[],
    math_confidence: 2,
    coding_confidence: 2,
    time_investment: "",
    learning_preference: "",
    payment_willingness: "",
    start_timeline: "",
    additional_info: "",
    name: "",
    email: "",
  })

  const totalQuestions = 11

  // Handle option selection
  const handleSelect = (field: keyof typeof answers, value: string) => {
    setAnswers((prev) => ({ ...prev, [field]: value }))
  }

  // Handle multi-select
  const handleMultiSelect = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      topics_interest: prev.topics_interest.includes(value)
        ? prev.topics_interest.filter((t) => t !== value)
        : [...prev.topics_interest, value],
    }))
  }

  // Handle slider change
  const handleSliderChange = (field: "math_confidence" | "coding_confidence", value: number) => {
    setAnswers((prev) => ({ ...prev, [field]: value }))
  }

  // Navigate questions
  const goNext = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const goBack = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  // Validate email
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  // Check if current question is answered
  const isCurrentQuestionAnswered = () => {
    switch (currentQuestion) {
      case 1:
        return answers.background_level !== ""
      case 2:
        return answers.main_goal !== ""
      case 3:
        return answers.topics_interest.length > 0
      case 4:
      case 5:
        return true // Sliders always have a value
      case 6:
        return answers.time_investment !== ""
      case 7:
        return answers.learning_preference !== ""
      case 8:
        return answers.payment_willingness !== ""
      case 9:
        return answers.start_timeline !== ""
      case 10:
        return true // Additional info is optional
      case 11:
        return answers.name.trim() !== "" && isValidEmail(answers.email)
      default:
        return false
    }
  }

  // Submit to Supabase
  const handleSubmit = async () => {
    if (!isValidEmail(answers.email)) {
      toast.error("Please enter a valid email address")
      return
    }

    if (answers.name.trim() === "") {
      toast.error("Please enter your name")
      return
    }

    setIsSubmitting(true)

    try {
      // Calculate persona
      const persona = calculatePersona(answers)
      
      const response: QuizResponse = {
        ...answers,
        assigned_persona: persona.id,
        user_agent: typeof window !== "undefined" ? navigator.userAgent : "",
        referrer: typeof window !== "undefined" ? document.referrer : "",
      }

      const { error } = await supabase.from("quiz_responses").insert([response])

      if (error) throw error

      toast.success("Thank you! Your response has been saved.")
      setAssignedPersona(persona)
      setShowThankYou(true)
    } catch (error) {
      console.error("Error submitting quiz:", error)
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Question configurations
  const questions = [
    {
      id: 1,
      title: "Where are you starting from?",
      subtitle: "Help me understand your current background",
      type: "single",
      options: [
        { label: "I'm completely new, no math or coding experience", emoji: "🌱", value: "complete_beginner" },
        { label: "I'm strong in math, but new to coding", emoji: "🧮", value: "math_strong_code_weak" },
        { label: "I'm good at coding, but weak in math", emoji: "💻", value: "code_strong_math_weak" },
        { label: "I'm confident in both math and coding, just new to finance", emoji: "⚙️", value: "math_code_strong_finance_weak" },
        { label: "I already study or work in a related field (quant, CS, finance, etc.)", emoji: "🚀", value: "advanced_background" },
      ],
    },
    {
      id: 2,
      title: "What's your main goal right now?",
      subtitle: "What best describes why you're learning this?",
      type: "single",
      options: [
        { label: "I want to become a quant or land a finance tech role", emoji: "📈", value: "quant_career" },
        { label: "I'm preparing for quant or technical interviews", emoji: "🎯", value: "interview_prep" },
        { label: "I want to strengthen my math and problem-solving skills", emoji: "🧮", value: "math_improvement" },
        { label: "I want to build trading algorithms and backtest strategies", emoji: "💹", value: "algo_trading" },
        { label: "I'm exploring AI/ML applications in quantitative fields", emoji: "🤖", value: "ai_ml_interest" },
        { label: "Just exploring and seeing what fits me best", emoji: "🧭", value: "exploring" },
      ],
    },
    {
      id: 3,
      title: "What topics excite you most?",
      subtitle: "Select all that apply",
      type: "multi",
      options: [
        { label: "Machine Learning", emoji: "🤖", value: "ml" },
        { label: "Probability & Statistics", emoji: "📊", value: "stats" },
        { label: "Quantitative Finance", emoji: "💰", value: "quant_finance" },
        { label: "Optimization & Algorithms", emoji: "⚡", value: "optimization" },
        { label: "Python & Data Science", emoji: "🐍", value: "python" },
        { label: "Mathematics", emoji: "📈", value: "math" },
      ],
    },
    {
      id: 4,
      title: "How confident are you with math?",
      subtitle: "Be honest, this helps me personalize your path",
      type: "slider",
      emoji: "📊",
      labels: [
        "Barely remember high school math",
        "Comfortable with basic calculus & algebra",
        "Can handle linear algebra, probability & stats",
        "Confident with advanced math (optimization, analysis, etc.)",
      ],
    },
    {
      id: 5,
      title: "How confident are you with coding?",
      subtitle: "Your programming experience level",
      type: "slider",
      emoji: "💻",
      labels: [
        "Beginner (just starting Python)",
        "Intermediate (loops, functions, some projects)",
        "Advanced (OOP, algorithms, frameworks)",
        "Professional / researcher level",
      ],
    },
    {
      id: 6,
      title: "How much time can you invest weekly?",
      subtitle: "Realistic commitment is better than overestimating",
      type: "single",
      options: [
        { label: "Less than 3 hours", emoji: "⏰", value: "less_3" },
        { label: "3–6 hours", emoji: "⚡", value: "3_6" },
        { label: "6–10 hours", emoji: "🔥", value: "6_10" },
        { label: "10+ hours", emoji: "🚀", value: "10_plus" },
      ],
    },
    {
      id: 7,
      title: "How do you prefer to learn?",
      subtitle: "Everyone learns differently",
      type: "single",
      options: [
        { label: "Watching short video lessons", emoji: "🎥", value: "videos" },
        { label: "Reading and practicing problems", emoji: "📘", value: "reading" },
        { label: "Working on real projects", emoji: "🧠", value: "projects" },
        { label: "Live group sessions or mentoring", emoji: "💬", value: "live" },
      ],
    },
    {
      id: 8,
      title: "Would you pay for structured guidance?",
      subtitle: "If it got you results faster",
      type: "single",
      options: [
        { label: "Yes, if under $30/month", emoji: "💰", value: "under_30" },
        { label: "Yes, for personalized mentoring", emoji: "💸", value: "mentoring" },
        { label: "Maybe later", emoji: "🤔", value: "maybe" },
        { label: "Not right now", emoji: "🙅‍♂️", value: "not_now" },
      ],
    },
    {
      id: 9,
      title: "When do you want to start?",
      subtitle: "Your timeline matters",
      type: "single",
      options: [
        { label: "Just exploring for now", emoji: "⏳", value: "exploring" },
        { label: "Within a month", emoji: "⚡", value: "month" },
        { label: "Right now, ready to start learning!", emoji: "🚀", value: "now" },
      ],
    },
    {
      id: 10,
      title: "Anything else I should know?",
      subtitle: "Share any additional context, goals, or questions (optional)",
      type: "textarea",
    },
    {
      id: 11,
      title: "Where should I reach you?",
      subtitle: "Leave your name and email, and I'll notify you when I release new courses or open 1-on-1 mentoring spots.",
      type: "contact",
    },
  ]

  const currentQ = questions[currentQuestion - 1]

  if (showThankYou && assignedPersona) {
    return <PersonaResult persona={assignedPersona} name={answers.name} email={answers.email} />
  }

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-white">
      {/* Animated background blobs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-phthalo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-phthalo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-phthalo-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 py-20 sm:py-20">
        <div className="w-full max-w-3xl space-y-8">
          {/* Progress bar */}
          <QuizProgress currentStep={currentQuestion} totalSteps={totalQuestions} />

          {/* Question card */}
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6 sm:p-10 shadow-2xl"
          >
            {/* Question header */}
            <div className="space-y-3 mb-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                {currentQ.title}
              </h2>
              <p className="text-zinc-400 text-base sm:text-lg">{currentQ.subtitle}</p>
            </div>

            {/* Question content */}
            <AnimatePresence mode="wait">
              {currentQ.type === "single" && (
                <div className="space-y-3">
                  {currentQ.options?.map((option, idx) => {
                    // Map question number to field name
                    const fieldMap: Record<number, keyof typeof answers> = {
                      1: "background_level",
                      2: "main_goal",
                      6: "time_investment",
                      7: "learning_preference",
                      8: "payment_willingness",
                      9: "start_timeline",
                    }
                    const field = fieldMap[currentQuestion]
                    
                    return (
                      <QuizOption
                        key={option.value}
                        label={option.label}
                        emoji={option.emoji}
                        selected={answers[field] === option.value}
                        onClick={() => handleSelect(field, option.value)}
                        index={idx}
                      />
                    )
                  })}
                </div>
              )}

              {currentQ.type === "multi" && (
                <div className="space-y-3">
                  {currentQ.options?.map((option, idx) => (
                    <QuizOption
                      key={option.value}
                      label={option.label}
                      emoji={option.emoji}
                      selected={answers.topics_interest.includes(option.value)}
                      onClick={() => handleMultiSelect(option.value)}
                      index={idx}
                    />
                  ))}
                </div>
              )}

              {currentQ.type === "slider" && (
                <QuizSlider
                  value={
                    currentQuestion === 4 ? answers.math_confidence : answers.coding_confidence
                  }
                  onChange={(val) =>
                    handleSliderChange(
                      currentQuestion === 4 ? "math_confidence" : "coding_confidence",
                      val
                    )
                  }
                  labels={currentQ.labels!}
                  emoji={currentQ.emoji!}
                />
              )}

              {currentQ.type === "contact" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  {/* Name input */}
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Your name"
                      value={answers.name}
                      onChange={(e) => setAnswers((prev) => ({ ...prev, name: e.target.value }))}
                      className="pl-12 h-14 text-lg bg-zinc-900/50 border-zinc-800 focus:border-phthalo-500"
                    />
                  </div>

                  {/* Email input */}
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={answers.email}
                      onChange={(e) => setAnswers((prev) => ({ ...prev, email: e.target.value }))}
                      className="pl-12 h-14 text-lg bg-zinc-900/50 border-zinc-800 focus:border-phthalo-500"
                    />
                  </div>
                  {answers.email && !isValidEmail(answers.email) && (
                    <p className="text-sm text-red-400">Please enter a valid email address</p>
                  )}
                </motion.div>
              )}

              {currentQ.type === "textarea" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <textarea
                    placeholder="Tell me anything else that would help me understand your background or goals..."
                    value={answers.additional_info}
                    onChange={(e) => setAnswers((prev) => ({ ...prev, additional_info: e.target.value }))}
                    rows={6}
                    className="w-full p-4 text-base sm:text-lg bg-zinc-900/50 border-2 border-zinc-800 rounded-xl focus:border-phthalo-500 focus:outline-none text-white placeholder:text-zinc-500 resize-none"
                  />
                  <p className="text-xs text-zinc-500">This is optional — skip if you have nothing to add</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="flex gap-4 mt-8 pt-6 border-t border-zinc-800">
              <Button
                onClick={goBack}
                disabled={currentQuestion === 1}
                variant="outline"
                className="border-zinc-700 bg-zinc-900 text-zinc-300 hover:text-white hover:border-zinc-600 hover:bg-zinc-800 disabled:opacity-30"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              {currentQuestion < totalQuestions ? (
                <Button
                  onClick={goNext}
                  disabled={!isCurrentQuestionAnswered()}
                  className="ml-auto bg-gradient-to-r from-phthalo-600 to-phthalo-800 hover:from-phthalo-700 hover:to-phthalo-900 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!isCurrentQuestionAnswered() || isSubmitting}
                  className="ml-auto bg-gradient-to-r from-phthalo-600 to-phthalo-800 hover:from-phthalo-700 hover:to-phthalo-900 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                  <ArrowRight className="w-4 h-4 ml-2" /> 
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}