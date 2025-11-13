import { useTranslation } from 'react-i18next';
import { useSensor } from '../context/SensorContext';
import SensorCard from '../components/SensorCard';
import AICard from '../components/AICard';
import ChartCard from '../components/ChartCard';
import WaterEfficiencyGauge from '../components/WaterEfficiencyGauge';
import { Droplets, Thermometer, Wind, Sprout, Clock } from 'lucide-react';

export default function Dashboard() {
  const { t } = useTranslation();
  const { sensorData, historicalData } = useSensor();

  // Calculate water efficiency based on soil moisture and groundwater
  const waterEfficiency = Math.round(
    (sensorData.soilMoisture * 0.6 + sensorData.groundwater * 0.4)
  );

  const getIrrigationNeed = () => {
    if (sensorData.soilMoisture < 30) return { level: t('highIrrigation'), color: '#E53935' };
    if (sensorData.soilMoisture < 50) return { level: t('moderateIrrigation'), color: '#FB8C00' };
    return { level: t('lowIrrigation'), color: '#43A047' };
  };

  const getBestTime = () => {
    if (sensorData.temperature > 32) return t('earlyMorning');
    if (sensorData.temperature > 25) return t('evening');
    return t('afternoon');
  };

  const getCropSuggestion = () => {
    if (sensorData.soilMoisture > 60) return { text: t('idealForRice'), emoji: '🌾' };
    if (sensorData.soilMoisture > 40) return { text: t('goodForWheat'), emoji: '🌾' };
    return { text: t('suitableForGroundnut'), emoji: '🥜' };
  };

  const irrigationNeed = getIrrigationNeed();
  const cropSuggestion = getCropSuggestion();

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-green-700 mb-2">🌾 {t('dashboard')}</h1>
        <div className="flex items-center justify-center gap-2 text-gray-600">
          <Clock className="w-4 h-4" />
          <span className="text-sm">
            {t('lastUpdated')}: {sensorData.timestamp.toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* Sensor Readings */}
      <section>
        <h2 className="mb-3 text-gray-700">{t('sensorReadings')}</h2>
        <div className="grid grid-cols-2 gap-3">
          <SensorCard
            title={t('groundwater')}
            value={`${sensorData.groundwater.toFixed(1)}%`}
            icon={Droplets}
            color="#0288D1"
          />
          <SensorCard
            title={t('temperature')}
            value={`${sensorData.temperature.toFixed(1)}°C`}
            icon={Thermometer}
            color="#E53935"
          />
          <SensorCard
            title={t('humidity')}
            value={`${sensorData.humidity.toFixed(1)}%`}
            icon={Wind}
            color="#43A047"
          />
          <SensorCard
            title={t('soilMoisture')}
            value={`${sensorData.soilMoisture.toFixed(1)}%`}
            icon={Sprout}
            color="#8D6E63"
          />
        </div>
      </section>

      {/* AI Recommendations */}
      <section>
        <h2 className="mb-3 text-gray-700">{t('aiRecommendations')}</h2>
        <div className="grid grid-cols-2 gap-3">
          <AICard
            title={t('irrigationNeed')}
            content={irrigationNeed.level}
            color={irrigationNeed.color}
          />
          <AICard
            title={t('waterVolume')}
            content={`${Math.round(500 - sensorData.soilMoisture * 4)} L`}
            color="#0288D1"
          />
          <AICard
            title={t('bestTime')}
            content={getBestTime()}
            color="#FB8C00"
          />
          <AICard
            title={t('cropSuggestion')}
            content={`${cropSuggestion.emoji} ${cropSuggestion.text}`}
            color="#43A047"
          />
        </div>
      </section>

      {/* 7-Day Trend Charts */}
      <section>
        <h2 className="mb-3 text-gray-700">{t('weekTrend')}</h2>
        <div className="space-y-4">
          <ChartCard
            title={t('groundwater')}
            data={historicalData}
            dataKey="groundwater"
            color="#0288D1"
            unit="%"
          />
          <ChartCard
            title={t('temperature')}
            data={historicalData}
            dataKey="temperature"
            color="#E53935"
            unit="°C"
          />
          <ChartCard
            title={t('soilMoisture')}
            data={historicalData}
            dataKey="soilMoisture"
            color="#8D6E63"
            unit="%"
          />
        </div>
      </section>

      {/* Water Efficiency Gauge */}
      <section>
        <h2 className="mb-3 text-gray-700">{t('waterEfficiency')}</h2>
        <WaterEfficiencyGauge score={waterEfficiency} />
      </section>
    </div>
  );
}
