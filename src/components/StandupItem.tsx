
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Standup } from "@/types";
import { formatDate } from "@/utils/standupUtils";

interface StandupItemProps {
  standup: Standup;
  onDelete: (id: string) => void;
}

const StandupItem = ({ standup, onDelete }: StandupItemProps) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-800 rounded-xl overflow-hidden standup-transition card-shadow border border-gray-100 dark:border-gray-700",
        expanded ? "max-h-[800px]" : "max-h-32"
      )}
    >
      <div
        onClick={toggleExpand}
        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 cursor-pointer standup-transition"
      >
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">
            {formatDate(standup.date)}
          </span>
          <h3 className="font-medium text-lg mt-1 line-clamp-1">
            {standup.today}
          </h3>
        </div>
        
        <div className="flex items-center space-x-2 mt-2 sm:mt-0">
          {standup.blocked && (
            <span className="px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-xs rounded-md">
              Blocked
            </span>
          )}
          <span
            className={cn(
              "transition-transform duration-300",
              expanded ? "rotate-180" : ""
            )}
          >
            ↓
          </span>
        </div>
      </div>
      
      {expanded && (
        <div className="px-4 pb-4 space-y-4 animate-fade-in">
          <div className="space-y-1">
            <div className="inline-flex items-center px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30">
              <span className="text-xs font-medium text-blue-800 dark:text-blue-300">Yesterday</span>
            </div>
            <p className="text-sm whitespace-pre-line">{standup.yesterday}</p>
          </div>
          
          <div className="space-y-1">
            <div className="inline-flex items-center px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30">
              <span className="text-xs font-medium text-green-800 dark:text-green-300">Today</span>
            </div>
            <p className="text-sm whitespace-pre-line">{standup.today}</p>
          </div>
          
          {standup.blocked && (
            <div className="space-y-1">
              <div className="inline-flex items-center px-2 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30">
                <span className="text-xs font-medium text-amber-800 dark:text-amber-300">Blocked</span>
              </div>
              <p className="text-sm whitespace-pre-line">{standup.blocked}</p>
            </div>
          )}
          
          <div className="flex justify-end pt-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(standup.id);
              }}
              className="text-sm text-red-500 hover:text-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StandupItem;
