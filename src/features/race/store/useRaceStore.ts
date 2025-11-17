import { create } from "zustand";

interface RoundResult {
  roundId: number;
  result: {
    horseId: string;
    score: number;
  }[];
}

interface RaceState {
  currentRound: number;
  raceStatus: "idle" | "running" | "finished";
  results: RoundResult[];
  resetRace: () => void;
}

export const useRaceStore = create<RaceState>((set) => ({
  currentRound: 0,
  raceStatus: "idle",
  results: [],

  resetRace: () =>
    set({
      currentRound: 0,
      raceStatus: "idle",
      results: [],
    }),
}));
