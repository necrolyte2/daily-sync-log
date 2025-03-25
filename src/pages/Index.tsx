
import { useState, useEffect } from "react";
import { Standup } from "@/types";
import { getStandups, saveStandups } from "@/utils/standupUtils";
import NavBar from "@/components/NavBar";
import StandupForm from "@/components/StandupForm";
import StandupList from "@/components/StandupList";
import FadeIn from "@/components/FadeIn";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [standups, setStandups] = useState<Standup[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Load standups from localStorage on component mount
    const loadedStandups = getStandups();
    // Sort by date (newest first)
    loadedStandups.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setStandups(loadedStandups);
  }, []);

  const handleAddStandup = (newStandup: Standup) => {
    const updatedStandups = [newStandup, ...standups];
    setStandups(updatedStandups);
    saveStandups(updatedStandups);
  };

  const handleDeleteStandup = (id: string) => {
    const updatedStandups = standups.filter((standup) => standup.id !== id);
    setStandups(updatedStandups);
    saveStandups(updatedStandups);
    
    toast({
      title: "Standup deleted",
      description: "The standup has been removed successfully.",
    });
  };

  return (
    <>
      <NavBar />
      <main className="min-h-screen pt-20 pb-16 px-4 md:px-0">
        <div className="container max-w-4xl mx-auto">
          <FadeIn>
            <section className="text-center mb-10 pt-8">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary mb-4">
                <span className="text-xs font-medium">Daily Engineering Updates</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
                Daily Sync Log
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Track your daily standups, share progress with your team, and stay on top of blockers.
              </p>
            </section>
          </FadeIn>

          <FadeIn delay={200}>
            <section className="glass rounded-2xl p-6 md:p-8 mb-12">
              <h2 className="text-2xl font-semibold tracking-tight mb-6">Submit Today's Standup</h2>
              <StandupForm onSubmit={handleAddStandup} />
            </section>
          </FadeIn>

          <FadeIn delay={400}>
            <section>
              <StandupList standups={standups} onDelete={handleDeleteStandup} />
            </section>
          </FadeIn>
        </div>
      </main>
    </>
  );
};

export default Index;
