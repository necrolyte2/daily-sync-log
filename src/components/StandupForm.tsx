
import { useState, useEffect } from "react";
import { Standup, TeamMember } from "@/types";
import { generateId, getTodayDate } from "@/utils/standupUtils";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StandupFormProps {
  onSubmit: (standup: Standup) => void;
  standups: Standup[]; // Add standups prop to check for existing submissions
}

// Initial list of team members
const INITIAL_TEAM_MEMBERS: TeamMember[] = [
  { name: "Alex Johnson", hasSubmittedToday: false },
  { name: "Jamie Smith", hasSubmittedToday: false },
  { name: "Taylor Brown", hasSubmittedToday: false },
  { name: "Jordan Wilson", hasSubmittedToday: false },
  { name: "Casey Miller", hasSubmittedToday: false }
];

const StandupForm = ({ onSubmit, standups }: StandupFormProps) => {
  const { toast } = useToast();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    yesterday: "",
    today: "",
    blocked: "",
  });

  // Initialize team members and check for today's submissions
  useEffect(() => {
    const today = getTodayDate();
    
    // Mark team members who have already submitted today
    const updatedTeamMembers = INITIAL_TEAM_MEMBERS.map(member => {
      const hasSubmitted = standups.some(
        standup => standup.name === member.name && standup.date === today
      );
      return { ...member, hasSubmittedToday: hasSubmitted };
    });
    
    setTeamMembers(updatedTeamMembers);
  }, [standups]);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNameChange = (name: string) => {
    setFormData((prev) => ({
      ...prev,
      name,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.yesterday.trim() || !formData.today.trim()) {
      toast({
        title: "Missing information",
        description: "Please select a name and fill in what you did yesterday and what you plan to do today.",
        variant: "destructive",
      });
      return;
    }
    
    const newStandup: Standup = {
      id: generateId(),
      date: getTodayDate(),
      name: formData.name,
      yesterday: formData.yesterday,
      today: formData.today,
      blocked: formData.blocked,
    };
    
    onSubmit(newStandup);
    
    // Reset form
    setFormData({
      name: "",
      yesterday: "",
      today: "",
      blocked: "",
    });
    
    toast({
      title: "Standup submitted",
      description: "Your daily standup has been saved successfully.",
    });
  };

  // Get available team members (those who haven't submitted today)
  const availableTeamMembers = teamMembers.filter(member => !member.hasSubmittedToday);

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900">
          <span className="text-xs font-medium text-purple-800 dark:text-purple-300">Team Member</span>
        </div>
        <Select value={formData.name} onValueChange={handleNameChange}>
          <SelectTrigger className="w-full p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent transition-all">
            <SelectValue placeholder="Select team member" />
          </SelectTrigger>
          <SelectContent>
            {availableTeamMembers.length > 0 ? (
              availableTeamMembers.map((member) => (
                <SelectItem key={member.name} value={member.name}>
                  {member.name}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="no-members" disabled>
                All team members have submitted today
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900">
          <span className="text-xs font-medium text-blue-800 dark:text-blue-300">Yesterday</span>
        </div>
        <textarea
          name="yesterday"
          value={formData.yesterday}
          onChange={handleChange}
          placeholder="What did you accomplish yesterday?"
          className="w-full min-h-[120px] p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
        />
      </div>
      
      <div className="space-y-2">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 dark:bg-green-900">
          <span className="text-xs font-medium text-green-800 dark:text-green-300">Today</span>
        </div>
        <textarea
          name="today"
          value={formData.today}
          onChange={handleChange}
          placeholder="What do you plan to do today?"
          className="w-full min-h-[120px] p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
        />
      </div>
      
      <div className="space-y-2">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900">
          <span className="text-xs font-medium text-amber-800 dark:text-amber-300">Blocked</span>
        </div>
        <textarea
          name="blocked"
          value={formData.blocked}
          onChange={handleChange}
          placeholder="Is anything blocking your progress? (Optional)"
          className="w-full min-h-[100px] p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
        />
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
        >
          Submit Standup
        </button>
      </div>
    </form>
  );
};

export default StandupForm;
