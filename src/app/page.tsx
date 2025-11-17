"use client";

import { useHorseStore } from "@/features/horse/store/useHorseStore";
import { useRaceStore } from "@/features/race/store/useRaceStore";
import { useRoundStore } from "@/features/round/store/useRoundStore";

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
      </header>
    </div>
  );
}
