"use client"

interface QuizProgressProps {
  currentStep: number
  totalSteps: number
}

export function QuizProgress({ currentStep, totalSteps }: QuizProgressProps) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="w-full space-y-2">
      {/* Progress Bar */}
      <div className="h-2 bg-zinc-800/50 rounded-full overflow-hidden backdrop-blur-sm">
        <div
          className="h-full bg-gradient-to-r from-phthalo-500 to-phthalo-600 transition-all duration-500 ease-out relative overflow-hidden"
          style={{ width: `${progress}%` }}
        >
          {/* Shimmer effect - continuous loop */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            style={{
              animation: 'shimmer-continuous 2s ease-in-out infinite',
              width: '100%'
            }}
          />
        </div>
      </div>
      
      {/* Step counter */}
      <div className="flex justify-between items-center text-sm">
        <span className="text-zinc-400">
          Question {currentStep} of {totalSteps}
        </span>
        <span className="text-phthalo-400 font-medium">
          {Math.round(progress)}% Complete
        </span>
      </div>
    </div>
  )
}