import React, { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setnumAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const copyPass = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const passwordGenerator = useCallback(() => {
    let charSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numAllowed) {
      charSet += "1234567890";
    }
    if (charAllowed) {
      charSet += "`~!@#$%^&*()-_=+[{]}|;:',<.>/?";
    }
    let pass = "";
    for (let i = 1; i <= length; i++) {
      let char = charSet.charAt(Math.floor(Math.random() * charSet.length));
      pass += char;
    }
    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <div className=" bg-slate-300 p-5 rounded-2xl flex-col flex gap-5">
        <div className=" flex justify-center items-center">
          <input
            type="text"
            readOnly
            value={password}
            placeholder="Password"
            className=" text-gray-600 px-5 rounded-l-lg w-[80%] h-10 text-black"
            ref={passwordRef}
          ></input>
          <button
            onClick={copyPass}
            className=" px-4 bg-black text-white rounded-r-lg h-10"
          >
            Copy
          </button>
        </div>

        <div className="flex items-center">
          <input
            type="range"
            min={8}
            max={24}
            id="passLength"
            value={length}
            className=" cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          ></input>
          <label htmlFor="passLength" className=" pr-3 pl-1">
            Length ({length})
          </label>
          <input
            type="checkbox"
            id="num"
            value={numAllowed}
            onChange={(e) => {
              setnumAllowed(!numAllowed);
            }}
          ></input>
          <label htmlFor="num" className=" pr-3 pl-1">
            Numbers
          </label>
          <input
            type="checkbox"
            id="char"
            value={charAllowed}
            onChange={(e) => {
              setcharAllowed(!charAllowed);
            }}
          ></input>
          <label htmlFor="char" className=" pr-3 pl-1">
            Characters
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
