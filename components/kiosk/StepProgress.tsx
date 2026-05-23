interface Props {
  currentStep: number
  totalSteps?: number
  label: string
}

export function StepProgress({ currentStep, totalSteps = 7, label }: Props) {
  return (
    <div className="px-5 pt-3 pb-0">
      <div className="flex gap-1 mb-2">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            className={`h-[3px] flex-1 rounded-sm transition-all duration-300 ${
              i < currentStep - 1
                ? 'bg-green-700'
                : i === currentStep - 1
                ? 'bg-blue-600'
                : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
      <p className="text-[9px] tracking-[2px] text-gray-400 uppercase">{label}</p>
    </div>
  )
}
