"use client";

import { useHorseStore } from "@/features/horse/store/useHorseStore";
import { useRaceStore } from "@/features/race/store/useRaceStore";
import { useRoundStore } from "@/features/round/store/useRoundStore";
import HorseList from "@/features/horse/components/HorseList";
import Program from "@/features/round/components/Program";
import RaceResults from "@/features/race/components/RaceResults";
// import RaceTracker from "@/features/race/components/RaceTracker";

export default function Home() {
  const generateHorsePool = useHorseStore((state) => state.generateHorsePool);
  const generateRounds = useRoundStore((state) => state.generateRounds);
  const resetRace = useRaceStore((state) => state.resetRace);
  const startRace = useRaceStore((state) => state.startRace);

  const handleGenerateProgram = () => {
    resetRace();
    generateHorsePool();
    console.log("horses", useHorseStore.getState().horses);
    generateRounds();
    console.log("rounds", useRoundStore.getState().rounds);
  };

  return (
    <div>
      <header className="header bg-white shadow-sm text-xl text-black p-4 flex justify-between items-center">
        <h1>Horse Racing</h1>

        <div className="flex gap-2">
          <button
            className="px-4 py-2 rounded bg-blue-600 text-sm text-white hover:bg-blue-700 cursor-pointer"
            onClick={handleGenerateProgram}
          >
            Generate Program
          </button>
          <button
            onClick={startRace}
            className="px-4 py-2 rounded bg-blue-600 text-sm text-white hover:bg-blue-700 cursor-pointer"
          >
            Start Race
          </button>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-6 py-6 px-2">
        <div className="col-span-1">
          <HorseList />
        </div>

        <div className="col-span-1">
          {/* <RaceTracker /> */}
        </div>

        <div className="col-span-1 flex">
          <Program />
          <RaceResults />
        </div>
      </div>
    </div>
  );
}
