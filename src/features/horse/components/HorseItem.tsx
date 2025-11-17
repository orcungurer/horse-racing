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
      <td className="py-2 text-sm text-gray-800 whitespace-nowrap">{horse.name}</td>
      <td className="py-2 text-sm">{horse.condition}</td>
      <td className="py-2">
        <div
          className="w-3 h-3 rounded-full text-center mx-auto"
          style={{ backgroundColor: horse.color }}
        />
      </td>
    </tr>
  );
};

export default HorseItem;
