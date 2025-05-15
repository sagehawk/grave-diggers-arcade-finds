
import React from 'react';
import { ChevronDown, ChevronUp, LucideIcon } from 'lucide-react';

interface FilterSectionHeaderProps {
  icon: LucideIcon;
  title: string;
  isExpanded: boolean;
}

const FilterSectionHeader: React.FC<FilterSectionHeaderProps> = ({ 
  icon: Icon, 
  title, 
  isExpanded 
}) => {
  return (
    <div className="flex justify-between items-center w-full">
      <h4 className="text-white text-sm font-medium flex items-center">
        <Icon size={16} className="mr-2" />
        {title}
      </h4>
      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
    </div>
  );
};

export default FilterSectionHeader;
