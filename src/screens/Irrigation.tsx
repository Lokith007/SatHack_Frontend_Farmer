import { useTranslation } from 'react-i18next';
import { useSensor } from '../context/SensorContext';
import WaterTank from '../components/WaterTank';
import { AlertTriangle, Droplets, Clock, Info, Lightbulb } from 'lucide-react';

export default function Irrigation() {
  const { t } = useTranslation();
  const { sensorData } = useSensor();

  const volume = Math.round(500 - sensorData.soilMoisture * 4);
  const timing = sensorData.temperature > 30 ? t('earlyMorning') : t('evening');
  const hasLeak = sensorData.groundwater < 50; // Simulate leak detection

  const waterSavingTips = [
    "Use drip irrigation to reduce water waste by 60%",
    "Irrigate during early morning to minimize evaporation",
    "Monitor soil moisture before watering",
    "Mulch around plants to retain moisture",
    "Fix pipeline leaks immediately to save water"
  ];

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-blue-700 mb-2">💧 {t('irrigation')}</h1>
      </div>

      {/* Water Tank Animation */}
      <section>
        <h2 className="mb-3 text-gray-700">{t('waterTankLevel')}</h2>
        <WaterTank level={sensorData.groundwater} />
      </section>

      {/* Today's Irrigation Plan */}
      <section>
        <h2 className="mb-3 text-gray-700">{t('todaysPlan')}</h2>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 shadow-lg text-white">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Droplets className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm opacity-90">{t('volume')}</div>
                <div>{volume} Liters</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm opacity-90">{t('timing')}</div>
                <div>{timing}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Info className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm opacity-90">{t('context')}</div>
                <div className="text-sm">
                  {sensorData.soilMoisture < 30 
                    ? 'Soil is dry - increase irrigation' 
                    : 'Soil moisture is adequate'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leak Detection Banner */}
      {hasLeak && (
        <section>
          <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <div className="text-red-900">{t('leakDetected')}</div>
              <div className="text-sm text-red-700 mt-1">{t('checkPipeline')}</div>
            </div>
          </div>
        </section>
      )}

      {/* Water-Saving Tips */}
      <section>
        <h2 className="mb-3 text-gray-700 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-600" />
          {t('waterSavingTips')}
        </h2>
        <div className="bg-white rounded-2xl p-4 shadow-md space-y-3">
          {waterSavingTips.map((tip, index) => (
            <div key={index} className="flex items-start gap-3 text-sm text-gray-700">
              <div className="w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center flex-shrink-0 text-xs">
                {index + 1}
              </div>
              <p>{tip}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
