import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Upload, CheckCircle, Sprout } from 'lucide-react';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function CropSoil() {
  const { t } = useTranslation();
  const [cropType, setCropType] = useState('');
  const [acreSize, setAcreSize] = useState('');
  const [soilType, setSoilType] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [detectedSoil, setDetectedSoil] = useState<{ type: string; confidence: number } | null>(null);
  const [saved, setSaved] = useState(false);

  const crops = ['Wheat', 'Rice', 'Groundnut', 'Cotton', 'Maize', 'Sugarcane'];
  const soilTypes = [
    { value: 'loamy', label: t('loamy') },
    { value: 'clay', label: t('clay') },
    { value: 'sandy', label: t('sandy') }
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        
        // Simulate AI soil detection
        setTimeout(() => {
          const types = ['loamy', 'clay', 'sandy'];
          const randomType = types[Math.floor(Math.random() * types.length)];
          const confidence = 75 + Math.random() * 20;
          
          setDetectedSoil({
            type: randomType,
            confidence: Math.round(confidence)
          });
          setSoilType(randomType);
        }, 1500);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Save to localStorage
    const data = {
      cropType,
      acreSize,
      soilType,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('cropSoilData', JSON.stringify(data));
    setSaved(true);
    
    setTimeout(() => setSaved(false), 3000);
  };

  const getRecommendedCrop = () => {
    if (soilType === 'loamy') return { name: 'Wheat', emoji: '🌾' };
    if (soilType === 'clay') return { name: 'Rice', emoji: '🌾' };
    return { name: 'Groundnut', emoji: '🥜' };
  };

  const recommended = getRecommendedCrop();

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-6 pb-24">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-green-700 mb-2">🌾 {t('cropSoil')}</h1>
      </div>

      {/* Input Form */}
      <section className="bg-white rounded-2xl p-6 shadow-md space-y-4">
        {/* Crop Type */}
        <div>
          <label className="block text-sm text-gray-700 mb-2">{t('cropType')}</label>
          <select
            value={cropType}
            onChange={(e) => setCropType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">{t('selectCrop')}</option>
            {crops.map(crop => (
              <option key={crop} value={crop}>{crop}</option>
            ))}
          </select>
        </div>

        {/* Acre Size */}
        <div>
          <label className="block text-sm text-gray-700 mb-2">{t('acreSize')}</label>
          <input
            type="number"
            value={acreSize}
            onChange={(e) => setAcreSize(e.target.value)}
            placeholder={t('enterAcres')}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Soil Type - Manual Selection */}
        <div>
          <label className="block text-sm text-gray-700 mb-2">{t('soilType')}</label>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {soilTypes.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => {
                  setSoilType(value);
                  setDetectedSoil(null);
                }}
                className={`p-3 rounded-lg border-2 transition-all ${
                  soilType === value && !detectedSoil
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300 hover:border-green-300'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Soil Photo Upload */}
        <div>
          <label className="block text-sm text-gray-700 mb-2">{t('uploadPhoto')}</label>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="soil-upload"
            />
            <label
              htmlFor="soil-upload"
              className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-500 transition-colors"
            >
              <Upload className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-600">{t('detectSoil')}</span>
            </label>
          </div>
          
          {uploadedImage && (
            <div className="mt-3">
              <ImageWithFallback
                src={uploadedImage}
                alt="Uploaded soil"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          )}
        </div>
      </section>

      {/* Soil Detection Result */}
      {detectedSoil && (
        <section className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 shadow-lg text-white">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6" />
            <h3>{t('soilDetectionResult')}</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span>{t('soilType')}:</span>
              <span className="capitalize">{detectedSoil.type}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>{t('confidence')}:</span>
              <span>{detectedSoil.confidence}%</span>
            </div>
          </div>
        </section>
      )}

      {/* AI Crop Recommendation */}
      {soilType && (
        <section className="bg-white rounded-2xl p-6 shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <Sprout className="w-6 h-6 text-green-600" />
            <h3 className="text-gray-700">{t('aiCropRecommendation')}</h3>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-4xl mb-2">{recommended.emoji}</div>
            <div className="text-gray-700">{t('bestCrop')}</div>
            <div className="text-green-700">{recommended.name}</div>
          </div>
        </section>
      )}

      {/* Save Button */}
      <Button
        onClick={handleSave}
        disabled={!cropType || !acreSize || !soilType}
        className="w-full bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {saved ? (
          <span className="flex items-center justify-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Saved Successfully!
          </span>
        ) : (
          t('saveData')
        )}
      </Button>
    </div>
  );
}
