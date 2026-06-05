// frontend/src/app/dashboard/components/FilterSidebar.tsx

import { useState } from "react";
import { Filter, X, ChevronDown, Check } from "lucide-react";
import { STATUS_GROUPS } from "../lib/constants";

interface FilterSidebarProps {
  selectedStatuses: string[];
  onToggleStatus: (status: string) => void;
  onToggleCategory: (items: string[]) => void;
  onClear: () => void;
}

export default function FilterSidebar({ selectedStatuses, onToggleStatus, onToggleCategory, onClear }: FilterSidebarProps) {
  const [openCategories, setOpenCategories] = useState<string[]>(STATUS_GROUPS.map(g => g.title));
  
  const toggleCategoryCollapse = (title: string) => {
    setOpenCategories(prev => prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]);
  };

  const isCategoryFullySelected = (items: string[]) => items.every(item => selectedStatuses.includes(item));
  const isCategoryPartiallySelected = (items: string[]) => items.some(item => selectedStatuses.includes(item)) && !isCategoryFullySelected(items);

  return (
    <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 hidden lg:block">
      <div className="flex items-center justify-between mb-5">
        {/* Updated to match Update Milestone and Metrics headers */}
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Filter className="h-5 w-5 text-blue-400" /> Filters
        </h2>
        {selectedStatuses.length > 0 && (
          <button onClick={onClear} className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
            <X className="h-3 w-3" /> Clear
          </button>
        )}
      </div>
      
      <div className="space-y-1">
        {STATUS_GROUPS.map((group) => {
          const isFull = isCategoryFullySelected(group.items);
          const isPartial = isCategoryPartiallySelected(group.items);
          const isOpen = openCategories.includes(group.title);

          return (
            <div key={group.title} className="mb-1">
              <div className="flex items-center gap-1 w-full">
                <button onClick={() => toggleCategoryCollapse(group.title)} className="p-1 text-gray-500 hover:text-gray-300 transition-colors">
                  <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? '' : '-rotate-90'}`} />
                </button>
                <button
                  onClick={() => onToggleCategory(group.items)}
                  className={`flex-1 flex items-center gap-2 px-2 py-1.5 text-sm rounded-md transition-all ${
                    isFull ? 'bg-blue-500/20 text-blue-300 font-semibold' : 
                    isPartial ? 'bg-gray-800 text-white font-medium' : 
                    'text-gray-400 hover:bg-gray-800/50 hover:text-gray-300'
                  }`}
                >
                  <group.icon className={`h-4 w-4 ${isFull ? 'text-blue-400' : 'text-gray-600'}`} />
                  {group.title}
                </button>
              </div>

              {isOpen && (
                <div className="ml-3 mt-1 space-y-0.5 border-l border-gray-800 pl-3">
                  {group.items.map((item) => {
                    const isSelected = selectedStatuses.includes(item);
                    return (
                      <button
                        key={item}
                        onClick={() => onToggleStatus(item)}
                        className={`w-full text-left px-2 py-1.5 text-xs rounded-md transition-all flex items-center gap-2 ${
                          isSelected ? 'text-white bg-blue-500/10 font-medium' : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/50'
                        }`}
                      >
                        <span className={`h-4 w-4 rounded-sm border flex items-center justify-center flex-shrink-0 transition-colors ${isSelected ? 'bg-blue-500 border-blue-500' : 'border-gray-700'}`}>
                          {isSelected && <Check className="h-3 w-3 text-white" />}
                        </span>
                        {item}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}