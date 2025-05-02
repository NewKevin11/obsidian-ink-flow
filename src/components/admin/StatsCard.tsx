
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
}

const StatsCard = ({
  title,
  value,
  icon: Icon,
  iconColor,
  iconBgColor,
}: StatsCardProps) => {
  return (
    <Card className="p-6 bg-gray-800 border-gray-700">
      <div className="flex items-center space-x-4">
        <div className={`rounded-full ${iconBgColor} p-3`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <h3 className="text-2xl font-bold text-white">{value}</h3>
        </div>
      </div>
    </Card>
  );
};

export default StatsCard;
