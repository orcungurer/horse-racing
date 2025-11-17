import { create } from "zustand";
import { faker } from "@faker-js/faker";

export interface Horse {
  id: string;
  name: string;
  color: string;
  condition: number;
}

interface HorseStore {
  horses: Horse[];
  generateHorsePool: () => void;
  reset: () => void;
}

export const useHorseStore = create<HorseStore>((set) => ({
  horses: [],

  generateHorsePool: () =>
    set(() => {
      const horses: Horse[] = [];

      for (let i = 0; i < 20; i++) {
        horses.push({
          id: faker.string.uuid(),
          name: faker.animal.horse(),
          color: faker.color.rgb(),
          condition: Math.floor(Math.random() * 100) + 1,
        });
      }

      return { horses };
    }),

  reset: () => set({ horses: [] }),
}));
