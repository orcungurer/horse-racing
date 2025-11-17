import { create } from "zustand";
import { useHorseStore } from "@/features/horse/store/useHorseStore";

export interface Round {
  id: number;
  distance: number;
  horses: string[];
}

interface RoundState {
  rounds: Round[];
  generateRounds: () => void;
}

export const ROUND_DISTANCES = [1200, 1400, 1600, 1800, 2000, 2200];

export const useRoundStore = create<RoundState>((set) => ({
  rounds: [],

  generateRounds: () =>
    set(() => {
      const horsePool = useHorseStore.getState().horses;

      const rounds: Round[] = ROUND_DISTANCES.map((dist, index) => {
        const selected = [...horsePool]
          .sort(() => Math.random() - 0.5)
          .slice(0, 10)
          .map((horse) => horse.id);

        return {
          id: index + 1,
          distance: dist,
          horses: selected,
        };
      });

      return { rounds };
    }),
}));
