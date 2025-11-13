import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Cloud, CloudRain, Sun, Wind, Droplets, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface WeatherData {
  current: {
    temp: number;
    humidity: number;
    condition: string;
    windSpeed: number;
  };
  forecast: Array<{
    day: string;
    temp: number;
    condition: string;
    rainfall: number;
  }>;
}

export default function Weather() {
  const { t } = useTranslation();
  const [weather, setWeather] = useState<WeatherData>({
    current: {
      temp: 28,
      humidity: 65,
      condition: 'Partly Cloudy',
      windSpeed: 12
    },
    forecast: [
      { day: 'Today', temp: 28, condition: 'Partly Cloudy', rainfall: 20 },
      { day: 'Tomorrow', temp: 30, condition: 'Sunny', rainfall: 10 },
      { day: 'Day 3', temp: 26, condition: 'Rainy', rainfall: 80 }
    ]
  });

  // Simulate weather data fetch
  useEffect(() => {
    const interval = setInterval(() => {
      setWeather(prev => ({
        ...prev,
        current: {
          ...prev.current,
          temp: 25 + Math.random() * 10,
          humidity: 50 + Math.random() * 30,
          windSpeed: 8 + Math.random() * 10
        }
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (condition: string) => {
    if (condition.includes('Rain')) return <CloudRain className="w-12 h-12 text-blue-500" />;
    if (condition.includes('Cloud')) return <Cloud className="w-12 h-12 text-gray-500" />;
    return <Sun className="w-12 h-12 text-yellow-500" />;
  };

  const getAIAdvice = () => {
    const maxRainfall = Math.max(...weather.forecast.map(f => f.rainfall));
    if (maxRainfall > 60) {
      return {
        text: "Heavy rain expected in next 3 days. Skip irrigation and check drainage systems.",
        color: 'blue'
      };
    }
    if (maxRainfall > 30) {
      return {
        text: "Moderate rain expected. Reduce irrigation by 50% and monitor soil moisture.",
        color: 'green'
      };
    }
    return {
        text: "Low rainfall expected. Continue regular irrigation schedule as planned.",
        color: 'orange'
    };
  };

  const advice = getAIAdvice();

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-blue-700 mb-2">🌦️ {t('weather')}</h1>
      </div>

      {/* Live Weather */}
      <section>
        <h2 className="mb-3 text-gray-700">{t('liveWeather')}</h2>
        <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-6 shadow-lg text-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-5xl mb-2">{weather.current.temp.toFixed(1)}°C</div>
              <div className="text-lg opacity-90">{weather.current.condition}</div>
            </div>
            {getWeatherIcon(weather.current.condition)}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Droplets className="w-5 h-5" />
              <div>
                <div className="text-xs opacity-75">{t('humidity')}</div>
                <div>{weather.current.humidity.toFixed(0)}%</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="w-5 h-5" />
              <div>
                <div className="text-xs opacity-75">Wind Speed</div>
                <div>{weather.current.windSpeed.toFixed(1)} km/h</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Day Forecast */}
      <section>
        <h2 className="mb-3 text-gray-700">{t('forecast3Day')}</h2>
        <div className="grid gap-3">
          {weather.forecast.map((day, index) => (
            <div key={index} className="bg-white rounded-2xl p-4 shadow-md flex items-center justify-between">
              <div className="flex items-center gap-4">
                {getWeatherIcon(day.condition)}
                <div>
                  <div className="text-gray-900">{day.day}</div>
                  <div className="text-sm text-gray-600">{day.condition}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-gray-900">{day.temp}°C</div>
                <div className="text-sm text-blue-600">{day.rainfall}% rain</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rainfall Probability Chart */}
      <section>
        <h2 className="mb-3 text-gray-700">{t('rainfallProbability')}</h2>
        <div className="bg-white rounded-2xl p-4 shadow-md">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weather.forecast}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                formatter={(value: number) => [`${value}%`, 'Rainfall Chance']}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="rainfall" fill="#0288D1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* AI Weather Advice */}
      <section>
        <h2 className="mb-3 text-gray-700">{t('aiWeatherAdvice')}</h2>
        <div className={`rounded-lg p-4 flex items-start gap-3 ${
          advice.color === 'blue' 
            ? 'bg-blue-50 border-l-4 border-blue-500' 
            : advice.color === 'green' 
            ? 'bg-green-50 border-l-4 border-green-500' 
            : 'bg-orange-50 border-l-4 border-orange-500'
        }`}>
          <AlertCircle className={`w-6 h-6 flex-shrink-0 mt-1 ${
            advice.color === 'blue' 
              ? 'text-blue-600' 
              : advice.color === 'green' 
              ? 'text-green-600' 
              : 'text-orange-600'
          }`} />
          <p className={
            advice.color === 'blue' 
              ? 'text-blue-900' 
              : advice.color === 'green' 
              ? 'text-green-900' 
              : 'text-orange-900'
          }>{advice.text}</p>
        </div>
      </section>
    </div>
  );
}