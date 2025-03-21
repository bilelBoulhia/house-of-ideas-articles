import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"


interface StepperProps {
  pages: React.ReactNode[];
  finishSentnce: string;
  onFinish: () => void;
  isDisabled?: boolean;
}

export default function Stepper({isDisabled, pages, finishSentnce, onFinish }: StepperProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const goToNextStep = () => {
    if (currentStep < pages.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onFinish();
    }
  }

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }





  return (
    <div  className="w-full  overflow-hidden">

      <div>
        {pages[currentStep]}
      </div>
      <div className="p-1 flex flex-col gap-3 medium-phone:flex-row justify-between">
        <Button
          variant="outline"
          onClick={goToPreviousStep}
          aria-label='previous step'
          disabled={currentStep === 0 }
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <Button
            disabled={isDisabled}
            aria-label='next step'
            onClick={() => goToNextStep()}>
          {currentStep === pages.length - 1 ? finishSentnce :  (isDisabled ? 'unavailabe' : 'Next')} <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}