import React, { useState } from "react";

const PlayfairCipher = () => {
  const [text, setText] = useState("");
  const [key, setKey] = useState("");
  const [resultText, setResultText] = useState("");
  const [mode, setMode] = useState("encrypt");

  const generateMatrix = (key) => {
    const alphabet = "abcdefghiklmnopqrstuvwxyz"; // Bez 'j'
    const sanitizedKey = key.replace(/j/g, "i").toLowerCase();
    const uniqueKey = Array.from(new Set(sanitizedKey + alphabet));
    const matrix = [];

    for (let i = 0; i < 5; i++) {
      matrix.push(uniqueKey.slice(i * 5, i * 5 + 5));
    }

    return matrix;
  };

  const prepareText = (text) => {
    const sanitizedText = text.replace(/j/g, "i").toLowerCase().replace(/[^a-z]/g, "");
    let preparedText = "";

    for (let i = 0; i < sanitizedText.length; i += 2) {
      const first = sanitizedText[i];
      const second = sanitizedText[i + 1] || "x";

      if (first === second) {
        preparedText += first + "x";
        i--; // Sprawdzenie tej samej litery w następnym kroku
      } else {
        preparedText += first + second;
      }
    }

    return preparedText;
  };

  const findPosition = (matrix, letter) => {
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        if (matrix[row][col] === letter) {
          return { row, col };
        }
      }
    }
    return null;
  };

  const encryptPair = (matrix, pair) => {
    const pos1 = findPosition(matrix, pair[0]);
    const pos2 = findPosition(matrix, pair[1]);

    if (pos1.row === pos2.row) {
      return (
        matrix[pos1.row][(pos1.col + 1) % 5] +
        matrix[pos2.row][(pos2.col + 1) % 5]
      );
    } else if (pos1.col === pos2.col) {
      return (
        matrix[(pos1.row + 1) % 5][pos1.col] +
        matrix[(pos2.row + 1) % 5][pos2.col]
      );
    } else {
      return (
        matrix[pos1.row][pos2.col] +
        matrix[pos2.row][pos1.col]
      );
    }
  };

  const decryptPair = (matrix, pair) => {
    const pos1 = findPosition(matrix, pair[0]);
    const pos2 = findPosition(matrix, pair[1]);

    if (pos1.row === pos2.row) {
      return (
        matrix[pos1.row][(pos1.col + 4) % 5] +
        matrix[pos2.row][(pos2.col + 4) % 5]
      );
    } else if (pos1.col === pos2.col) {
      return (
        matrix[(pos1.row + 4) % 5][pos1.col] +
        matrix[(pos2.row + 4) % 5][pos2.col]
      );
    } else {
      return (
        matrix[pos1.row][pos2.col] +
        matrix[pos2.row][pos1.col]
      );
    }
  };

  const processText = (text, key, mode) => {
    const matrix = generateMatrix(key);
    const preparedText = prepareText(text);
    let result = "";

    for (let i = 0; i < preparedText.length; i += 2) {
      const pair = preparedText.slice(i, i + 2);
      result += mode === "encrypt" ? encryptPair(matrix, pair) : decryptPair(matrix, pair);
    }

    return result;
  };

  const handleProcess = () => {
    if (text && key) {
      setResultText(processText(text, key, mode));
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4 p-2">Szyfr Playfair</h1>
      <h2 className="font-medium mb-4 p-2">Litera J będzie zastąpiona na I oraz program niestety nie uwzgłędnia polskich liter 😔</h2>
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-2">Tekst:</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-2">Klucz:</label>
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-2">Tryb:</label>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="encrypt">Szyfrowanie</option>
          <option value="decrypt">Deszyfrowanie</option>
        </select>
      </div>
      <button
        onClick={handleProcess}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Przetwórz
      </button>
      {resultText && (
        <div className="mt-4 p-4 bg-gray-100 border rounded">
          <h2 className="font-semibold">Wynik:</h2>
          <p>{resultText}</p>
        </div>
      )}
    </div>
  );
};

export default PlayfairCipher;
