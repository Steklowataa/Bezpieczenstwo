import React from "react";

export default function TableCell({ value, isHighlighted, isSelected }) {
  let bgColor = "";
  if (isSelected) bgColor = "bg-yellow-300";
  else if (isHighlighted) bgColor = "bg-red-300";

  return (
    <td
      className={`border border-gray-500 p-2 text-center ${bgColor}`}
    >
      {value}
    </td>
  );
}
