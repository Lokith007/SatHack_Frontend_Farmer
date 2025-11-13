import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SensorData {
  groundwater: number;
  temperature: number;
  humidity: number;
  soilMoisture: number;
  timestamp: Date;
}

interface SensorContextType {
  sensorData: SensorData;
  historicalData: SensorData[];
  isOnline: boolean;
}

const SensorContext = createContext<SensorContextType | undefined>(undefined);

export function SensorProvider({ children }: { children: ReactNode }) {
  const [sensorData, setSensorData] = useState<SensorData>({
    groundwater: 65,
    temperature: 28,
    humidity: 55,
    soilMoisture: 42,
    timestamp: new Date()
  });

  const [historicalData, setHistoricalData] = useState<SensorData[]>([]);
  const [isOnline, setIsOnline] = useState(true);

  // Simulate sensor data updates every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prev => ({
        groundwater: Math.max(20, Math.min(100, prev.groundwater + (Math.random() - 0.5) * 5)),
        temperature: Math.max(15, Math.min(45, prev.temperature + (Math.random() - 0.5) * 2)),
        humidity: Math.max(30, Math.min(90, prev.humidity + (Math.random() - 0.5) * 3)),
        soilMoisture: Math.max(10, Math.min(100, prev.soilMoisture + (Math.random() - 0.5) * 4)),
        timestamp: new Date()
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Generate 7 days of historical data
  useEffect(() => {
    const data: SensorData[] = [];
    const now = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      data.push({
        groundwater: 60 + Math.random() * 20,
        temperature: 25 + Math.random() * 8,
        humidity: 50 + Math.random() * 20,
        soilMoisture: 35 + Math.random() * 25,
        timestamp: date
      });
    }
    
    setHistoricalData(data);
  }, []);

  // Cache to localStorage
  useEffect(() => {
    localStorage.setItem('sensorData', JSON.stringify(sensorData));
    localStorage.setItem('lastSync', new Date().toISOString());
  }, [sensorData]);

  // Online/Offline detection
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <SensorContext.Provider value={{ sensorData, historicalData, isOnline }}>
      {children}
    </SensorContext.Provider>
  );
}

export function useSensor() {
  const context = useContext(SensorContext);
  if (!context) throw new Error('useSensor must be used within SensorProvider');
  return context;
}
