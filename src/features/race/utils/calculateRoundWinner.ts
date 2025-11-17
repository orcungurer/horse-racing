import { Horse } from "@/features/horse/store/useHorseStore";
import { Round } from "@/features/round/store/useRoundStore";

export const calculateRoundWinner = (round: Round, horses: Horse[]) => {
  const CONDITION_WEIGHT = 1.2;
  const RANDOM_WEIGHT = 0.8;
  const DISTANCE_PENALTY_FACTOR = 0.01;

  const results = round.horses.map((horseId) => {
    const horse = horses.find((h) => h.id === horseId)!;

    const randomFactor = Math.floor(Math.random() * 100) + 1;

    const score =
      horse.condition * CONDITION_WEIGHT +
      randomFactor * RANDOM_WEIGHT -
      round.distance * DISTANCE_PENALTY_FACTOR;

    return {
      horseId,
      score,
    };
  });

  console.log("Round Results:", results);

  return results.sort((a, b) => b.score - a.score);
};
