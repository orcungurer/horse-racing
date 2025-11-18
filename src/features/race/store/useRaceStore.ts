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
  raceStatus: "idle" | "running" | "paused" | "finished";
  results: RoundResult[];
  startRace: () => void;
  resetRace: () => void;
}

const ROUND_DELAY = 1200;

export const useRaceStore = create<RaceState>((set, get) => ({
  currentRound: 0,
  raceStatus: "idle",
  results: [],

  startRace: async () => {
    const { raceStatus } = get();
    const rounds = useRoundStore.getState().rounds;
    const horses = useHorseStore.getState().horses;

    if (raceStatus === "idle" || raceStatus === "finished") {
      set({ raceStatus: "running", currentRound: 1, results: [] });
    } else if (raceStatus === "running") {
      set({ raceStatus: "paused" });
      return;
    } else if (raceStatus === "paused") {
      set({ raceStatus: "running" });
    }

    const doRound = async () => {
      const { raceStatus, currentRound } = get();
      if (raceStatus !== "running") return;
      if (currentRound > rounds.length) {
        set({ raceStatus: "finished" });
        return;
      }

      const round = rounds[currentRound - 1];

      const result = calculateRoundWinner(round, horses);

      console.log(`Results for Round ${round.id}:`, result);

      set((state) => ({
        results: [
          ...state.results.filter((r) => r.roundId !== round.id),
          { roundId: round.id, result },
        ],
      }));

      setTimeout(() => {
        const { raceStatus } = get();
        if (raceStatus !== "running") return;

        set((state) => ({ currentRound: state.currentRound + 1 }));
        doRound();
      }, ROUND_DELAY);
    };

    doRound();
  },

  resetRace: () =>
    set({
      currentRound: 0,
      raceStatus: "idle",
      results: [],
    }),
}));
