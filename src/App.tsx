import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/config';
import { SensorProvider } from './context/SensorContext';
import { SettingsProvider } from './context/SettingsContext';
import BottomNav from './components/BottomNav';
import Dashboard from './screens/Dashboard';
import Irrigation from './screens/Irrigation';
import CropSoil from './screens/CropSoil';
import Weather from './screens/Weather';
import Settings from './screens/Settings';

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <SettingsProvider>
        <SensorProvider>
          <Router>
            <div className="min-h-screen bg-[#FFF8E7] pb-20">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/irrigation" element={<Irrigation />} />
                <Route path="/crop-soil" element={<CropSoil />} />
                <Route path="/weather" element={<Weather />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
              <BottomNav />
            </div>
          </Router>
        </SensorProvider>
      </SettingsProvider>
    </I18nextProvider>
  );
}
