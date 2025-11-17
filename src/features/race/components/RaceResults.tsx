"use client";

import { useRaceStore } from "@/features/race/store/useRaceStore";
import { useHorseStore } from "@/features/horse/store/useHorseStore";
import { ROUND_DISTANCES } from "@/features/round/store/useRoundStore";
import { getLapTitle } from "@/shared/utils/getLapTitle";

const RaceResults = () => {
  const results = useRaceStore((state) => state.results);
  const horses = useHorseStore((state) => state.horses);

  return (
    <>
      {results.length > 0 && (
        <div>
          <h2 className="font-semibold mb-2">Results</h2>

          <div className="overflow-x-auto max-h-[600px] overflow-y-auto border border-gray-300 rounded">
            {results.map((roundResult) => (
              <div key={roundResult.roundId}>
                <h3 className="text-center bg-red-200 border-b border-gray-300">
                  {`${getLapTitle(roundResult.roundId)} - ${
                    ROUND_DISTANCES[roundResult.roundId - 1]
                  }m`}
                </h3>
                <table className="table-auto w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-300 bg-gray-50">
                      <th className="px-4 py-2">Position</th>
                      <th className="px-4 py-2">Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roundResult.result.map((item, idx) => {
                      const horseMap = Object.fromEntries(
                        horses.map((h) => [h.id, h])
                      );
                      const horse = horseMap[item.horseId];

                      const position = idx + 1;

                      return (
                        <tr
                          key={`${roundResult.roundId}-${item.horseId}`}
                          className="border-b border-gray-200 hover:bg-gray-50 bg-white"
                        >
                          <td className="py-2 px-4 text-sm">{position}</td>
                          <td className="py-2 px-4 text-sm flex items-center gap-2">
                            {horse?.name ?? "Unknown"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default RaceResults;
