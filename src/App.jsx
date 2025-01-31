import React, { useState } from "react";
import JSEncrypt from "jsencrypt";

const App = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [mode, setMode] = useState("encrypt");

  // Klucze RSA
  const publicKey = `
    -----BEGIN PUBLIC KEY-----
    MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCvKdy1q0yp29iUpk92E3Ub+EzA
    j5h2T3klAk1XrGZmZ29ibJvFscghHoKw5wNNlfuElW8h0yFzzRH3quPSHRHYTW/j
    R3FSYy95IkDoL9Uj4RTQC+fxHAAhAcGpUbGIoBswpCBGAlhRTqO9RCUOdGlQl+vX
    /yTQXppdvlrld+yRAwIDAQAB
    -----END PUBLIC KEY-----
  `;
  const privateKey = `
    -----BEGIN PRIVATE KEY-----
    MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBALZnbVFT8RCiRE2e
    WLRqBZTPFTvAfUjc1DKM6FOQmQzEmv06BhOAB3ZbFstqMvO9c9kFb1Rz68JcO9My
    ...
    -----END PRIVATE KEY-----
  `;

  // Konfiguracja szyfrowania i deszyfrowania
  const encryptor = new JSEncrypt();
  encryptor.setPublicKey(publicKey);

  const decryptor = new JSEncrypt();
  decryptor.setPrivateKey(privateKey);

  const handleEncrypt = () => {
    const encrypted = encryptor.encrypt(text);
    setResult(encrypted || "Błąd szyfrowania");
  };

  const handleDecrypt = () => {
    const decrypted = decryptor.decrypt(text);
    setResult(decrypted || "Błąd deszyfrowania");
  };

  const handleModeSwitch = () => {
    setMode(mode === "encrypt" ? "decrypt" : "encrypt");
    setResult("");
    setText("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Szyfrowanie RSA</h1>
        <textarea
          className="w-full p-2 border rounded mb-4"
          rows={5}
          placeholder={mode === "encrypt" ? "Wpisz tekst do zaszyfrowania" : "Wpisz tekst do odszyfrowania"}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="w-full mb-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={mode === "encrypt" ? handleEncrypt : handleDecrypt}
        >
          {mode === "encrypt" ? "Szyfruj" : "Deszyfruj"}
        </button>
        <button
          className="w-full mb-4 p-2 bg-gray-300 rounded hover:bg-gray-400"
          onClick={handleModeSwitch}
        >
          Przełącz na {mode === "encrypt" ? "Deszyfrowanie" : "Szyfrowanie"}
        </button>
        {result && (
          <div className="bg-gray-200 p-4 rounded">
            <h2 className="font-semibold mb-2">Wynik:</h2>
            <p className="break-words">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
