import { useState } from 'preact/hooks'
import './app.css'

export function App() {
  const [text, setText] = useState("");
  const [shift, setShift] = useState(3);
  const [result, setResult] = useState("");

  const caesarCipher = (str, shiftAmount, decrypt = false) => {
    if (decrypt) shiftAmount = -shiftAmount;
    return str
      .split("")
      .map((char) => {
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt(0);
          const offset = code >= 65 && code <= 90 ? 65 : 97;
          return String.fromCharCode(((code - offset + shiftAmount + 26) % 26) + offset);
        }
        return char;
      })
      .join("");
  };

  return (
    <>
    <div className="flex flex-col items-center p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Szyfr Cezara</h1>
      <textarea
        className="border p-2 w-full max-w-lg mb-4 rounded-[16px]"
        rows="3"
        placeholder="Wpisz tekst..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type="text"
        className="border p-2 mb-4 rounded-[10px]"
        value={shift}
        placeholder='Wpisz klucz'
        onChange={(e) => setShift(Number(e.target.value))}
      />
      <div className="flex gap-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setResult(caesarCipher(text, shift))}
        >
          Szyfruj
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => setResult(caesarCipher(text, shift, true))}
        >
          Deszyfruj
        </button>
      </div>
      {result && (
        <div className="mt-4 p-4 bg-white border rounded shadow">
          <p className="font-semibold">Wynik:</p>
          <p className="text-lg">{result}</p>
        </div>
      )}
    </div>

    </>
  )
}
