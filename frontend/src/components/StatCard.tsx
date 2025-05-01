import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  period: string;
  change: number;
  increasing: boolean;
}

const StatCard = ({ icon, title, value, period, change, increasing }: StatCardProps) => {
  return (
    <div className="bg-white rounded-xl border p-6 relative">
      <div className="flex flex-col">
        <div className="mb-2">{icon}</div>
        <h3 className=" font-medium">{title}</h3>
        <p className="text-3xl font-bold  mt-1">{value}</p>
        <div className="flex items-center mt-3">
          <span className=" text-sm">{period}</span>
          <div 
            className={cn(
              "flex items-center ml-2 px-2 py-0.5 rounded-full text-xs",
              increasing ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
            )}
          >
            {increasing ? (
              <ArrowUp className="w-3 h-3 mr-1" />
            ) : (
              <ArrowDown className="w-3 h-3 mr-1" />
            )}
            {change}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;