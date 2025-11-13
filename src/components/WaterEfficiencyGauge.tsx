interface WaterEfficiencyGaugeProps {
  score: number;
}

export default function WaterEfficiencyGauge({ score }: WaterEfficiencyGaugeProps) {
  const getColor = () => {
    if (score >= 70) return '#43A047';
    if (score >= 40) return '#FB8C00';
    return '#E53935';
  };

  const getLabel = () => {
    if (score >= 70) return 'Excellent';
    if (score >= 40) return 'Good';
    return 'Needs Attention';
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <div className="relative w-48 h-48 mx-auto">
        {/* Background circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="80"
            fill="none"
            stroke="#f0f0f0"
            strokeWidth="16"
          />
          <circle
            cx="96"
            cy="96"
            r="80"
            fill="none"
            stroke={getColor()}
            strokeWidth="16"
            strokeDasharray={`${(score / 100) * 502} 502`}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
        </svg>
        
        {/* Score text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-gray-900" style={{ color: getColor() }}>{score}</div>
          <div className="text-sm text-gray-600">{getLabel()}</div>
        </div>
      </div>
    </div>
  );
}
