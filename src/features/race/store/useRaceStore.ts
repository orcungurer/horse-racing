import { create } from "zustand";
import { useRoundStore } from "@/features/round/store/useRoundStore";
import { useHorseStore } from "@/features/horse/store/useHorseStore";
import { calculateRoundWinner } from "../utils/calculateRoundWinner";

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
  startRace: () => void;
  runNextRound: () => void;
  resetRace: () => void;
}

export const useRaceStore = create<RaceState>((set, get) => ({
  currentRound: 0,
  raceStatus: "idle",
  results: [],

  startRace: () => {
    set({ raceStatus: "running", currentRound: 1 });
    get().runNextRound();
  },

  runNextRound: () => {
    const { currentRound } = get();
    const { rounds } = useRoundStore.getState();
    const { horses } = useHorseStore.getState();

    if (currentRound > rounds.length) {
      set({ raceStatus: "finished" });
      return;
    }

    const round = rounds[currentRound - 1];

    const result = calculateRoundWinner(round, horses);

    console.log(`Results for Round ${round.id}:`, result);

    set((state) => ({
      results: [...state.results, { roundId: round.id, result }],
    }));

    set({ currentRound: currentRound + 1 });

    if (currentRound < rounds.length) {
      get().runNextRound();
    } else {
      set({ raceStatus: "finished" });
    }
  },


  resetRace: () =>
    set({
      currentRound: 0,
      raceStatus: "idle",
      results: [],
    }),
}));
