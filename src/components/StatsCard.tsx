import { Icons } from "./icons";

interface StatsCardProps {
  icon: keyof typeof Icons;
  stat: string
  value: string | number;
}

function StatsCard({ icon, stat, value }: StatsCardProps) {
  const Icon = Icons[icon];
  return (
    <div className="p-6 flex gap-2 bg-primary rounded-[12px] w-[48%]">
      <Icon />
      <div className="flex flex-col items-start gap-2">
        <p className="text-xl text-[#7c8797ff] font-semibold uppercase">
          {stat}
        </p>
        <p className="text-[32px] leading-[38px] font-semibold">{value}</p>
      </div>
    </div>
  );
}

export default StatsCard;
