import { LucideIcon } from 'lucide-react';

interface SensorCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

export default function SensorCard({ title, value, icon: Icon, color }: SensorCardProps) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-md">
      <div className="flex items-center gap-2 mb-3">
        <div
          className="p-2 rounded-lg"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <span className="text-sm text-gray-600">{title}</span>
      </div>
      <div className="text-gray-900" style={{ color }}>{value}</div>
    </div>
  );
}
