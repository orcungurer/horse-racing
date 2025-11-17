"use client";

import { useRoundStore } from "@/features/round/store/useRoundStore";
import { useHorseStore } from "@/features/horse/store/useHorseStore";
import { getLapTitle } from "@/shared/utils/getLapTitle";

const Program = () => {
  const rounds = useRoundStore((state) => state.rounds);
  const horses = useHorseStore((state) => state.horses);

  return (
    <>
      {rounds.length > 0 && (
        <div>
          <h2 className="font-semibold mb-2">Program</h2>

          <div className="overflow-x-auto max-h-[600px] overflow-y-auto border border-gray-300 rounded">
            {rounds.map((round) => (
              <div key={round.id}>
                <h3 className="text-center bg-red-200 border-b border-gray-300">
                  {`${getLapTitle(round.id)} - ${round.distance}m`}
                </h3>
                <table className="table-auto w-full text-center">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="px-4 py-2">Position</th>
                      <th className="px-4 py-2">Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {round.horses.map((horseId, idx) => {
                      const horseMap = Object.fromEntries(
                        horses.map((h) => [h.id, h])
                      );
                      const horse = horseMap[horseId];

                      return (
                        <tr
                          key={`${round.id}-${horseId}`}
                          className="border-b border-gray-300 hover:bg-gray-100 bg-white"
                        >
                          <td className="py-2 px-4 text-sm">{idx + 1}</td>

                          <td className="py-2 px-4 text-sm flex items-center justify-center gap-2">
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

export default Program;
