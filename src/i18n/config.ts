import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      dashboard: "Dashboard",
      irrigation: "Irrigation",
      cropSoil: "Crop & Soil",
      weather: "Weather",
      settings: "Settings",
      
      // Dashboard
      sensorReadings: "Sensor Readings",
      groundwater: "Groundwater",
      temperature: "Temperature",
      humidity: "Humidity",
      soilMoisture: "Soil Moisture",
      aiRecommendations: "AI Recommendations",
      irrigationNeed: "Irrigation Need",
      waterVolume: "Water Volume",
      bestTime: "Best Time",
      cropSuggestion: "Crop Suggestion",
      weekTrend: "7-Day Trend",
      rainfall: "Rainfall",
      waterEfficiency: "Water Efficiency Score",
      lastUpdated: "Last Updated",
      
      // Irrigation
      waterTankLevel: "Water Tank Level",
      todaysPlan: "Today's Irrigation Plan",
      volume: "Volume",
      timing: "Timing",
      context: "Context",
      leakDetected: "Leak Detected",
      checkPipeline: "Please check your pipeline near sector B",
      waterSavingTips: "Water-Saving Tips",
      
      // Crop & Soil
      cropType: "Crop Type",
      selectCrop: "Select crop type",
      acreSize: "Acre Size",
      enterAcres: "Enter acres",
      soilType: "Soil Type",
      selectManually: "Select Manually",
      uploadPhoto: "Upload Soil Photo",
      loamy: "Loamy",
      clay: "Clay",
      sandy: "Sandy",
      detectSoil: "AI will detect soil type",
      soilDetectionResult: "Soil Type Detected",
      confidence: "Confidence",
      aiCropRecommendation: "AI Crop Recommendation",
      bestCrop: "Best Crop",
      saveData: "Save & Sync Data",
      
      // Weather
      liveWeather: "Live Weather",
      forecast3Day: "3-Day Forecast",
      rainfallProbability: "Rainfall Probability",
      aiWeatherAdvice: "AI Weather Advice",
      
      // Settings
      language: "Language",
      english: "English",
      hindi: "Hindi",
      offlineMode: "Offline Mode",
      lastSync: "Last Sync",
      developerCredit: "Developed with ❤️ for Farmers",
      
      // AI Messages
      highIrrigation: "High - Soil is dry",
      moderateIrrigation: "Moderate - Adequate moisture",
      lowIrrigation: "Low - Good moisture level",
      earlyMorning: "Early Morning (5-7 AM)",
      evening: "Evening (6-8 PM)",
      afternoon: "Afternoon (2-4 PM)",
      goodForWheat: "Good conditions for Wheat",
      idealForRice: "Ideal for Rice cultivation",
      suitableForGroundnut: "Suitable for Groundnut",
      
      // Days
      mon: "Mon",
      tue: "Tue",
      wed: "Wed",
      thu: "Thu",
      fri: "Fri",
      sat: "Sat",
      sun: "Sun",
    }
  },
  hi: {
    translation: {
      // Navigation
      dashboard: "डैशबोर्ड",
      irrigation: "सिंचाई",
      cropSoil: "फसल और मिट्टी",
      weather: "मौसम",
      settings: "सेटिंग्स",
      
      // Dashboard
      sensorReadings: "सेंसर रीडिंग्स",
      groundwater: "भूजल",
      temperature: "तापमान",
      humidity: "नमी",
      soilMoisture: "मिट्टी की नमी",
      aiRecommendations: "AI सुझाव",
      irrigationNeed: "सिंचाई की जरूरत",
      waterVolume: "पानी की मात्रा",
      bestTime: "सबसे अच्छा समय",
      cropSuggestion: "फसल सुझाव",
      weekTrend: "7-दिन का रुझान",
      rainfall: "वर्षा",
      waterEfficiency: "पानी दक्षता स्कोर",
      lastUpdated: "आखिरी अपडेट",
      
      // Irrigation
      waterTankLevel: "पानी की टंकी का स्तर",
      todaysPlan: "आज की सिंचाई योजना",
      volume: "मात्रा",
      timing: "समय",
      context: "संदर्भ",
      leakDetected: "रिसाव का पता चला",
      checkPipeline: "कृपया सेक्टर B के पास पाइपलाइन जांचें",
      waterSavingTips: "पानी बचाने के टिप्स",
      
      // Crop & Soil
      cropType: "फसल का प्रकार",
      selectCrop: "फसल का प्रकार चुनें",
      acreSize: "एकड़ का आकार",
      enterAcres: "एकड़ दर्ज करें",
      soilType: "मिट्टी का प्रकार",
      selectManually: "मैन्युअल रूप से चुनें",
      uploadPhoto: "मिट्टी की फोटो अपलोड करें",
      loamy: "दोमट",
      clay: "चिकनी",
      sandy: "रेतीली",
      detectSoil: "AI मिट्टी का प्रकार पहचानेगा",
      soilDetectionResult: "मिट्टी का प्रकार पहचाना गया",
      confidence: "विश्वास",
      aiCropRecommendation: "AI फसल सिफारिश",
      bestCrop: "सबसे अच्छी फसल",
      saveData: "सहेजें और सिंक करें",
      
      // Weather
      liveWeather: "लाइव मौसम",
      forecast3Day: "3-दिन का पूर्वानुमान",
      rainfallProbability: "वर्षा की संभावना",
      aiWeatherAdvice: "AI मौसम सलाह",
      
      // Settings
      language: "भाषा",
      english: "अंग्रेज़ी",
      hindi: "हिंदी",
      offlineMode: "ऑफलाइन मोड",
      lastSync: "आखिरी सिंक",
      developerCredit: "किसानों के लिए ❤️ से विकसित",
      
      // AI Messages
      highIrrigation: "उच्च - मिट्टी सूखी है",
      moderateIrrigation: "मध्यम - पर्याप्त नमी",
      lowIrrigation: "कम - अच्छी नमी स्तर",
      earlyMorning: "सुबह जल्दी (5-7 AM)",
      evening: "शाम (6-8 PM)",
      afternoon: "दोपहर (2-4 PM)",
      goodForWheat: "गेहूं के लिए अच्छी स्थिति",
      idealForRice: "धान की खेती के लिए आदर्श",
      suitableForGroundnut: "मूंगफली के लिए उपयुक्त",
      
      // Days
      mon: "सोम",
      tue: "मंगल",
      wed: "बुध",
      thu: "गुरु",
      fri: "शुक्र",
      sat: "शनि",
      sun: "रवि",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
