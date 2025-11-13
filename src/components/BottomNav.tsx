import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, Droplet, Sprout, Cloud, Settings } from 'lucide-react';

export default function BottomNav() {
  const location = useLocation();
  const { t } = useTranslation();

  const navItems = [
    { path: '/dashboard', icon: Home, label: t('dashboard') },
    { path: '/irrigation', icon: Droplet, label: t('irrigation') },
    { path: '/crop-soil', icon: Sprout, label: t('cropSoil') },
    { path: '/weather', icon: Cloud, label: t('weather') },
    { path: '/settings', icon: Settings, label: t('settings') }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 safe-area-bottom">
      <div className="flex justify-around items-center max-w-2xl mx-auto">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center px-3 py-1 rounded-lg transition-all ${
                isActive 
                  ? 'text-[#43A047]' 
                  : 'text-gray-500'
              }`}
            >
              <Icon className={`w-6 h-6 mb-1 ${isActive ? 'scale-110' : ''}`} />
              <span className="text-xs">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
