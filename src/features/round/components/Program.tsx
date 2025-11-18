"use client";

import { useRoundStore } from "@/features/round/store/useRoundStore";
import { useHorseStore } from "@/features/horse/store/useHorseStore";
import { getLapTitle } from "@/shared/utils/getLapTitle";
import TableWrapper from "@/shared/components/TableWrapper";
import Table from "@/shared/components/Table";

const Program = () => {
  const rounds = useRoundStore((state) => state.rounds);
  const horses = useHorseStore((state) => state.horses);

  if (rounds.length === 0) return null;

  return (
    <TableWrapper title="Program">
      {rounds.map((round) => (
        <div key={round.id}>
          <h3 className="text-center bg-red-200 border-b border-gray-300">
            {`${getLapTitle(round.id)} - ${round.distance}m`}
          </h3>
          <Table headers={["Position", "Name"]}>
            {round.horses.map((horseId, idx) => {
              const horseMap = Object.fromEntries(horses.map((h) => [h.id, h]));
              const horse = horseMap[horseId];

              return (
                <tr
                  key={`${round.id}-${horseId}`}
                  className="border-b border-gray-300 hover:bg-gray-100 bg-white"
                >
                  <td className="p-2 text-sm">{idx + 1}</td>
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

export default Program;
