interface AICardProps {
  title: string;
  content: string;
  color: string;
}

export default function AICard({ title, content, color }: AICardProps) {
  return (
    <div
      className="rounded-2xl p-4 shadow-md text-white"
      style={{ background: `linear-gradient(135deg, ${color} 0%, ${color}CC 100%)` }}
    >
      <div className="text-xs opacity-90 mb-2">{title}</div>
      <div className="text-sm">{content}</div>
    </div>
  );
}
