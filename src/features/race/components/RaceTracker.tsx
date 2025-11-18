import { getLapTitle } from "@/shared/utils/getLapTitle";
import { useRaceStore } from "../store/useRaceStore";
import { useHorseStore } from "@/features/horse/store/useHorseStore";
import {
  ROUND_DISTANCES,
  useRoundStore,
} from "@/features/round/store/useRoundStore";

import { motion } from "motion/react";

const RaceTracker = () => {
  const results = useRaceStore((state) => state.results);
  const currentRound = useRaceStore((state) => state.currentRound);
  const horses = useHorseStore((state) => state.horses);
  const rounds = useRoundStore((state) => state.rounds);

  if (results.length === 0) return null;

  const round = rounds[currentRound - 1];
  if (!round) {
    return (
      <div className="h-full flex justify-center items-center flex-col">
        <p className="text-2xl">Race Finished!</p>
        <p className="text-m">Generate Program for a new race.</p>
      </div>
    );
  }

  const currentResult = results.find((r) => r.roundId === currentRound);
  if (!currentResult) return null;

  const scoreMap: Record<string, number> = {};
  currentResult.result.forEach((r) => {
    scoreMap[r.horseId] = r.score;
  });

  const maxScore = Math.max(...currentResult.result.map((r) => r.score));

  const laneHorseIds = round.horses;

  const laneHorses = laneHorseIds.map(
    (horseId) => horses.find((h) => h.id === horseId)!
  );

  return (
    <div>
      <h2 className="font-semibold mb-2">Results</h2>
      <div className="flex border rounded bg-gray-100">
        <div className="flex flex-col justify-between bg-green-700 text-white w-10 text-center">
          {laneHorses.map((_, idx) => (
            <div
              key={idx}
              className="h-10 flex items-center justify-center -rotate-90"
            >
              {idx + 1}
            </div>
          ))}
        </div>

        <div className="flex-1 relative border-l border-r bg-gray-200">
          {laneHorses.map((horse) => {
            const score = scoreMap[horse.id] ?? 0;
            const progress = score / maxScore;

            return (
              <div
                key={horse.id}
                className="relative h-10 border-b border-dashed border-gray-500"
              >
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 text-xl"
                  animate={{ left: `${progress * 100}%` }}
                  transition={{
                    duration: 0.5,
                    type: "tween",
                    ease: [0.0, 0.0, 0.0, 1],
                  }}
                >
                  🐎
                </motion.div>
              </div>
            );
          })}
        </div>

        <div className="w-4 bg-red-600"></div>
      </div>

      <div>
        <h3 className="text-center font-semibold">
          {`${getLapTitle(currentRound)} - ${
            ROUND_DISTANCES[currentRound - 1]
          }m`}
        </h3>
      </div>
    </div>
  );
};

export default RaceTracker;
