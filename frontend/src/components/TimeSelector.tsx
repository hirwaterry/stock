import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface TimeSelectorProps {
  defaultValue: string;
  options: string[];
}

const TimeSelector = ({ defaultValue, options }: TimeSelectorProps) => {
  const [value, setValue] = useState(defaultValue);
  
  return (
    <div className="relative">
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="w-[150px] bg-gray-100 border-none rounded-md text-gray-600">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TimeSelector;