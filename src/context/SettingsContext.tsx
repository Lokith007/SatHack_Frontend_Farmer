import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface SettingsContextType {
  language: string;
  setLanguage: (lang: string) => void;
  offlineMode: boolean;
  setOfflineMode: (mode: boolean) => void;
  lastSync: Date;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();
  const [language, setLanguageState] = useState(localStorage.getItem('language') || 'en');
  const [offlineMode, setOfflineModeState] = useState(
    localStorage.getItem('offlineMode') === 'true'
  );
  const [lastSync, setLastSync] = useState(new Date());

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    i18n.changeLanguage(lang);
  };

  const setOfflineMode = (mode: boolean) => {
    setOfflineModeState(mode);
    localStorage.setItem('offlineMode', mode.toString());
  };

  // Update last sync time
  useEffect(() => {
    const interval = setInterval(() => {
      const stored = localStorage.getItem('lastSync');
      if (stored) {
        setLastSync(new Date(stored));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SettingsContext.Provider value={{ language, setLanguage, offlineMode, setOfflineMode, lastSync }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within SettingsProvider');
  return context;
}