# 🌾 Farmer Assistant App

A mobile-responsive web application designed to help farmers make AI-based irrigation and crop decisions using sensor data and weather information.

## ✨ Features

### 📱 5 Main Screens

1. **Dashboard** - Real-time sensor readings, AI recommendations, 7-day trends, and water efficiency score
2. **Irrigation** - Animated water tank, irrigation plan, leak detection, and water-saving tips
3. **Crop & Soil** - Input forms, soil type detection via photo upload, and AI crop recommendations
4. **Weather** - Live weather data, 3-day forecast, rainfall probability, and AI weather advice
5. **Settings** - Language toggle (English/Hindi), offline mode, and sync status

### 🚀 Key Capabilities

- **Auto-updating Sensor Data** - Simulates real-time updates every 10 seconds
- **Bilingual Support** - Full English and Hindi translations using i18next
- **Interactive Charts** - 7-day trend analysis using Recharts
- **AI Recommendations** - Smart suggestions for irrigation, timing, and crop selection
- **Offline Support** - Data caching with localStorage
- **Mobile-First Design** - Optimized for mobile browsers with bottom tab navigation
- **Photo Upload** - Soil type detection through image analysis (simulated AI)

## 🎨 Design

- **Colors:** Green (#43A047), Blue (#0288D1), Cream background (#FFF8E7)
- **Style:** Rounded cards, soft shadows, smooth animations
- **Mobile-Optimized:** Bottom navigation, touch-friendly interface

## 🛠️ Tech Stack

- React + TypeScript
- Tailwind CSS
- React Router (client-side routing)
- i18next (internationalization)
- Recharts (data visualization)
- Lucide React (icons)
- LocalStorage (offline caching)

## 📂 Project Structure

```
/
├── App.tsx                      # Main app with routing
├── screens/
│   ├── Dashboard.tsx            # Sensor data & AI recommendations
│   ├── Irrigation.tsx           # Water management
│   ├── CropSoil.tsx            # Crop & soil inputs
│   ├── Weather.tsx             # Weather forecast
│   └── Settings.tsx            # App settings
├── components/
│   ├── BottomNav.tsx           # Bottom tab navigation
│   ├── SensorCard.tsx          # Sensor display card
│   ├── AICard.tsx              # AI recommendation card
│   ├── ChartCard.tsx           # Chart wrapper
│   ├── WaterEfficiencyGauge.tsx # Circular gauge
│   └── WaterTank.tsx           # Animated water tank
├── context/
│   ├── SensorContext.tsx       # Sensor data state
│   └── SettingsContext.tsx     # Settings state
└── i18n/
    └── config.ts               # Translation configuration
```

## 🌐 Usage

The app is designed to be used on mobile devices (or desktop browsers in mobile view). All features work with mock data - perfect for demonstration and development.

### Mock Data Features

- Sensor readings update automatically
- Weather data simulates real API responses
- Soil detection uses random AI simulation
- All data is cached locally for offline access

## 📱 Mobile Features

- Bottom tab navigation for easy one-handed use
- Touch-optimized controls
- Responsive layouts
- Safe area support for notched devices
- PWA-ready architecture

---

**Built for farmers, by developers who care about agriculture technology.** 🌾
