"use client";

import { useHorseStore } from "../store/useHorseStore";
import HorseItem from "./HorseItem";
import TableWrapper from "@/shared/components/TableWrapper";
import Table from "@/shared/components/Table";

const HorseList = () => {
  const horses = useHorseStore((store) => store.horses);

  if (horses.length === 0) return null;

  return (
    <TableWrapper title="Horse List (1-20)">
      <Table headers={["Name", "Condition", "Color"]}>
        {horses.map((horse) => (
          <HorseItem key={horse.id} horse={horse} />
        ))}
      </Table>
    </TableWrapper>
  );
};

export default HorseList;
