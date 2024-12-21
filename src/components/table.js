import React from "react";
import TableCell from "./tablecell";

export default function Table({ alphabet, table, currentStep }) {
  return (
    <table className="border-collapse border border-gray-500">
      <thead>
        <tr>
          <th className="border border-gray-500 p-2">-</th>
          {alphabet.split("").map((letter, index) => (
            <th key={index} className="border border-gray-500 p-2">
              {letter}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {table.map((row, rowIndex) => (
          <tr key={rowIndex}>
            <td className="border border-gray-500 p-2">{alphabet[rowIndex]}</td>
            {row.split("").map((cell, cellIndex) => (
              <TableCell
                key={cellIndex}
                value={cell}
                isHighlighted={
                  rowIndex === currentStep.row || cellIndex === currentStep.col
                }
                isSelected={
                  rowIndex === currentStep.row && cellIndex === currentStep.col
                }
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
