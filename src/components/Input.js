import React, { useState } from "react";
import Vigenere from "./vigenere";
import Table from "./table";

export default function Visualizer() {
  const alphabet = "AĄBCĆDEĘFGHIJKLŁMNŃOÓPRSŚTUWYZŹŻ";
  const table = Array.from({ length: alphabet.length }, (_, i) =>
    alphabet.slice(i) + alphabet.slice(0, i)
  );

  const [text, setText] = useState("");
  const [keyProp, setKeyProp] = useState("");
  const [mode, setMode] = useState("encrypt");
  const [currentStep, setCurrentStep] = useState({ row: -1, col: -1 });
  const [animationInProgress, setAnimationInProgress] = useState(false);
  const [result, setResult] = useState("");

  const handleEncrypt = () => {
    if (!text || !keyProp) return;
  
    setAnimationInProgress(true);
    let tempResult = "";
    let step = 0;
  
    const animate = () => {
      if (step >= text.length) {
        setResult(tempResult.toUpperCase());
        setAnimationInProgress(false);
        setCurrentStep({ row: -1, col: -1 });
        return;
      }
  
      const textChar = text[step].toUpperCase();
      const keyChar = keyProp[step % keyProp.length].toUpperCase();
  
      const textIndex = alphabet.indexOf(textChar);
      const keyIndex = alphabet.indexOf(keyChar);
  
      if (textIndex === -1 || keyIndex === -1) {
        tempResult += text[step];
      } else {
        if (mode === "encrypt") {
          tempResult += table[keyIndex][textIndex];
          setCurrentStep({ row: keyIndex, col: textIndex });
        } else {
          const row = table[keyIndex];
          tempResult += alphabet[row.indexOf(textChar)];
          setCurrentStep({ row: keyIndex, col: row.indexOf(textChar) });
        }
      }
  
      step++;
      setTimeout(animate, 500); // 500ms odstęp między krokami
    };
  
    animate();
  };
  
  return (
    <>
    <div className="p-4">
      <Vigenere
        text={text}
        setText={setText}
        keyProp={keyProp}
        setKeyProp={setKeyProp}
        mode={mode}
        setMode={setMode}
        handleEncrypt={handleEncrypt}
        animationInProgress={animationInProgress}
        result={result}
      />
      <Table
        alphabet={alphabet}
        table={table}
        currentStep={currentStep}
      />
      </div>
    </>

  );
}
