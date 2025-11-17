"use client";

import { useHorseStore } from "../store/useHorseStore";
import HorseItem from "./HorseItem";

const HorseList = () => {
  const horses = useHorseStore((store) => store.horses);

  return (
    <>
      {horses.length > 0 && (
        <>
          <h2 className="font-semibold mb-2">Horse List (1-20)</h2>
          <div className="overflow-x-auto max-h-[600px] overflow-y-auto border border-gray-300 rounded">
            <table className="table-auto w-full text-center">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Condition</th>
                  <th className="px-4 py-2">Color</th>
                </tr>
              </thead>
              <tbody>
                {horses.map((horse) => (
                  <HorseItem key={horse.id} horse={horse} />
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default HorseList;
