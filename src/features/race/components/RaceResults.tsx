"use client";

import { useRaceStore } from "@/features/race/store/useRaceStore";
import { useHorseStore } from "@/features/horse/store/useHorseStore";
import { ROUND_DISTANCES } from "@/features/round/store/useRoundStore";
import { getLapTitle } from "@/shared/utils/getLapTitle";
import TableWrapper from "@/shared/components/TableWrapper";
import Table from "@/shared/components/Table";

const RaceResults = () => {
  const results = useRaceStore((state) => state.results);
  const horses = useHorseStore((state) => state.horses);

  if (results.length === 0) return null;

  return (
    <TableWrapper title="Results">
      {results.map((roundResult) => (
        <div key={roundResult.roundId}>
          <h3 className="text-center bg-red-200 border-b border-gray-300">
            {`${getLapTitle(roundResult.roundId)} - ${
              ROUND_DISTANCES[roundResult.roundId - 1]
            }m`}
          </h3>
          <Table headers={["Position", "Name"]}>
            {roundResult.result.map((item, idx) => {
              const horseMap = Object.fromEntries(horses.map((h) => [h.id, h]));
              const horse = horseMap[item.horseId];

              const position = idx + 1;

              return (
                <tr
                  key={`${roundResult.roundId}-${item.horseId}`}
                  className="border-b border-gray-300 hover:bg-gray-100 bg-white"
                >
                  <td className="p-2 text-sm">{position}</td>
                  <td className="p-2 text-sm">{horse?.name ?? "Unknown"}</td>
                </tr>
              );
            })}
          </Table>
        </div>
      ))}
    </TableWrapper>
  );
};

export default RaceResults;
