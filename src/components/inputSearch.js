import { useEffect, useState } from "react";

function InputSearch({ data = [] }) {
  const [input, setInput] = useState("");
  const [selectedText, setselectedText] = useState("");

  useEffect(() => {
    setInput(selectedText);
  }, [selectedText]);

  return (
    <div className="dropdown" onBlur={() => setInput(selectedText)}>
      <input
        tabIndex={0}
        value={input}
        onChange={(e) => setInput(e.currentTarget.value)}
        className="input input-bordered input-sm"
      />
      {data.filter((e) => e.search(input) >= 0).length > 0 && (
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          {data
            .filter((e) => e.search(input) >= 0)
            .map((d, k) => (
              <li key={k} onClick={() => setselectedText(d)}>
                <a>{d}</a>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

export default InputSearch;
