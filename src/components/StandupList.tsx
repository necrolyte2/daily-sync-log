
import { Standup } from "@/types";
import StandupItem from "./StandupItem";
import FadeIn from "./FadeIn";

interface StandupListProps {
  standups: Standup[];
  onDelete: (id: string) => void;
}

const StandupList = ({ standups, onDelete }: StandupListProps) => {
  if (standups.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium text-muted-foreground">No standups yet</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Start tracking your daily progress by submitting a standup.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">Previous Standups</h2>
      <div className="space-y-3">
        {standups.map((standup, index) => (
          <FadeIn key={standup.id} delay={index * 100} className="standup-transition">
            <StandupItem standup={standup} onDelete={onDelete} />
          </FadeIn>
        ))}
      </div>
    </div>
  );
};

export default StandupList;
