import React from "react";

export default function InputForm({
  result,
  text,
  setText,
  keyProp,
  setKeyProp,
  mode,
  setMode,
  handleEncrypt,
  animationInProgress,
}) {
  return (
    <div className="mb-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Wiadomość"
        className="border p-2 mr-2"
        disabled={animationInProgress}
      />
      <input
        type="text"
        value={keyProp}
        onChange={(e) => setKeyProp(e.target.value)}
        placeholder="Klucz"
        className="border p-2 mr-2"
        disabled={animationInProgress}
      />
      <div className="inline-flex items-center mr-4">
        <label>
          <input
            type="radio"
            value="encrypt"
            checked={mode === "encrypt"}
            onChange={() => setMode("encrypt")}
            className="mr-2"
            disabled={animationInProgress}
          />
          Szyfruj
        </label>
        <label className="ml-4">
          <input
            type="radio"
            value="decrypt"
            checked={mode === "decrypt"}
            onChange={() => setMode("decrypt")}
            className="mr-2"
            disabled={animationInProgress}
          />
          Deszyfruj
        </label>
      </div>
      <button
        onClick={handleEncrypt}
        className="bg-blue-500 text-white p-2"
        disabled={animationInProgress || !text || !keyProp}
      >
        Szyfruj / Deszyfruj
      </button>
      <div>
        <p>Result: {result}</p>
      </div>
    </div>
  );
}
