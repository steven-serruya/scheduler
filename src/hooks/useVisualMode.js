import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);

  const [history, setHistory] = useState([initial]);

  function transition(newMode) {
    setHistory((prev) => [...prev, newMode]);
  }
  function transition(newMode, replace = false) {
    if (replace) {
      setHistory((prevHistory) => {
        const newHistory = [...prevHistory];
        newHistory[newHistory.length - 1] = newMode; // replace the current mode
        return newHistory;
      });
    } else {
      setHistory((prevHistory) => [...prevHistory, newMode]);
    }
    setMode(newMode);
  }

  function back() {
    if (history.length > 1) {
      setHistory((prev) => [...prev.slice(0, prev.length - 1)]);
    }
  }

  return { mode: history[history.length - 1], transition, back };
}
