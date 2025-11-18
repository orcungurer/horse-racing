"use client";

interface HorseItemProps {
  horse: {
    id: string;
    name: string;
    color: string;
    condition: number;
  };
}

const HorseItem = ({ horse }: HorseItemProps) => {
  return (
    <tr className="border-b border-gray-300 hover:bg-gray-100 bg-white">
      <td className="p-2 text-sm whitespace-nowrap">{horse.name}</td>
      <td className="p-2 text-sm">{horse.condition}</td>
      <td className="p-2">
        <div
          className="w-3 h-3 rounded-full text-center mx-auto"
          style={{ backgroundColor: horse.color }}
        />
      </td>
    </tr>
  );
};

export default HorseItem;
