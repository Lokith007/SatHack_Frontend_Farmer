import { useTranslation } from 'react-i18next';
import { Globe, Wifi, WifiOff, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Settings() {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');
  const [offlineMode, setOfflineMode] = useState(localStorage.getItem('offlineMode') === 'true');
  const [lastSync, setLastSync] = useState<Date>(new Date());

  useEffect(() => {
    const stored = localStorage.getItem('lastSync');
    if (stored) {
      setLastSync(new Date(stored));
    }
  }, []);

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    i18n.changeLanguage(lang);
  };

  const handleOfflineModeToggle = () => {
    const newMode = !offlineMode;
    setOfflineMode(newMode);
    localStorage.setItem('offlineMode', newMode.toString());
  };

  const formatLastSync = () => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - lastSync.getTime()) / 1000);
    
    if (diff < 60) return `${diff} seconds ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return lastSync.toLocaleDateString();
  };

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-gray-700 mb-2">⚙️ {t('settings')}</h1>
      </div>

      {/* Language Setting */}
      <section className="bg-white rounded-2xl p-6 shadow-md">
        <div className="flex items-center gap-3 mb-4">
          <Globe className="w-6 h-6 text-gray-600" />
          <h3 className="text-gray-700">{t('language')}</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleLanguageChange('en')}
            className={`p-4 rounded-lg border-2 transition-all ${
              language === 'en'
                ? 'border-green-500 bg-green-50'
                : 'border-gray-300 hover:border-green-300'
            }`}
          >
            <div className="text-2xl mb-2">🇬🇧</div>
            <div className="text-sm">{t('english')}</div>
          </button>
          
          <button
            onClick={() => handleLanguageChange('hi')}
            className={`p-4 rounded-lg border-2 transition-all ${
              language === 'hi'
                ? 'border-green-500 bg-green-50'
                : 'border-gray-300 hover:border-green-300'
            }`}
          >
            <div className="text-2xl mb-2">🇮🇳</div>
            <div className="text-sm">{t('hindi')}</div>
          </button>
        </div>
      </section>

      {/* Offline Mode */}
      

      {/* Last Sync */}
      <section className="bg-white rounded-2xl p-6 shadow-md">
        <div className="flex items-center gap-3">
          <Clock className="w-6 h-6 text-gray-600" />
          <div>
            <h3 className="text-gray-700">{t('lastSync')}</h3>
            <p className="text-sm text-gray-500">{formatLastSync()}</p>
          </div>
        </div>
      </section>

      {/* Developer Credit */}
     
    </div>
  );
}
