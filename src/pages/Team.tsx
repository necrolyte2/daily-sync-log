
import { useState, useEffect } from "react";
import { Standup } from "@/types";
import { getStandups, formatDate } from "@/utils/standupUtils";
import NavBar from "@/components/NavBar";
import StandupItem from "@/components/StandupItem";
import FadeIn from "@/components/FadeIn";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const Team = () => {
  const [standups, setStandups] = useState<Standup[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [uniqueDates, setUniqueDates] = useState<string[]>([]);
  
  // Load standups from localStorage on component mount
  useEffect(() => {
    const loadedStandups = getStandups();
    setStandups(loadedStandups);
    
    // Extract unique dates from standups
    const dates = [...new Set(loadedStandups.map(standup => standup.date))];
    // Sort dates in descending order (newest first)
    dates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
    setUniqueDates(dates);
    
    // Set the most recent date as the selected date by default
    if (dates.length > 0) {
      setSelectedDate(dates[0]);
    }
  }, []);
  
  // Filter standups by selected date
  const filteredStandups = standups.filter(
    standup => standup.date === selectedDate
  );
  
  return (
    <>
      <NavBar />
      <main className="min-h-screen pt-20 pb-16 px-4 md:px-0">
        <div className="container max-w-4xl mx-auto">
          <FadeIn>
            <section className="text-center mb-10 pt-8">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary mb-4">
                <span className="text-xs font-medium">Team History</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
                Previous Standups
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Review past standups organized by date to see what your team has been working on.
              </p>
            </section>
          </FadeIn>
          
          <FadeIn delay={200}>
            <section className="glass rounded-2xl p-6 md:p-8 mb-8">
              <h2 className="text-2xl font-semibold tracking-tight mb-6 flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                <span>Select Date</span>
              </h2>
              
              <div className="flex flex-wrap gap-2">
                {uniqueDates.map(date => (
                  <Button
                    key={date}
                    variant={selectedDate === date ? "default" : "outline"}
                    className="mb-2"
                    onClick={() => setSelectedDate(date)}
                  >
                    {formatDate(date, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </Button>
                ))}
              </div>
            </section>
          </FadeIn>
          
          <FadeIn delay={400}>
            {selectedDate && (
              <section>
                <h2 className="text-2xl font-semibold tracking-tight mb-6">
                  Standups for {formatDate(selectedDate)}
                </h2>
                
                {filteredStandups.length > 0 ? (
                  <div className="space-y-4">
                    {filteredStandups.map((standup, index) => (
                      <FadeIn key={standup.id} delay={index * 100} className="standup-transition">
                        <StandupItem standup={standup} onDelete={() => {}} />
                      </FadeIn>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <h3 className="text-lg font-medium text-muted-foreground">No standups for this date</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Select a different date or have team members submit their standups.
                    </p>
                  </div>
                )}
              </section>
            )}
          </FadeIn>
        </div>
      </main>
    </>
  );
};

export default Team;
