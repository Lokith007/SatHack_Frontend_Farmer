import { useEffect, useState } from 'react';

interface WaterTankProps {
  level: number;
}

export default function WaterTank({ level }: WaterTankProps) {
  const [animatedLevel, setAnimatedLevel] = useState(0);

  useEffect(() => {
    setTimeout(() => setAnimatedLevel(level), 100);
  }, [level]);

  const getColor = () => {
    if (level >= 70) return '#0288D1';
    if (level >= 40) return '#FB8C00';
    return '#E53935';
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <div className="relative w-48 h-64 mx-auto bg-gray-100 rounded-2xl overflow-hidden border-4 border-gray-300">
        {/* Water level */}
        <div
          className="absolute bottom-0 left-0 right-0 transition-all duration-1000 ease-out"
          style={{
            height: `${animatedLevel}%`,
            backgroundColor: getColor(),
            opacity: 0.7
          }}
        >
          {/* Water wave animation */}
          <div className="absolute top-0 left-0 right-0 h-8 opacity-30">
            <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
              <path
                d="M0,10 Q25,5 50,10 T100,10 V20 H0 Z"
                fill="white"
                className="animate-wave"
              />
            </svg>
          </div>
        </div>

        {/* Level text */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center">
            <div className="text-gray-900" style={{ color: getColor() }}>
              {level.toFixed(0)}%
            </div>
            <div className="text-sm text-gray-600">Groundwater</div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes wave {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-25%); }
        }
        .animate-wave {
          animation: wave 3s linear infinite;
        }
      `}</style>
    </div>
  );
}
