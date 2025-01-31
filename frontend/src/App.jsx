import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import dotenv from "dotenv";
import "./App.css";
const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [count, setCount] = useState(0);

  const fetchImage = async (
    text = "A dream where you're flying over a vast, shimmering ocean, feeling weightless and free, with the wind rushing past you, and the sun setting on the horizon, painting the sky in vibrant shades of orange and pink. It’s peaceful, serene, and filled with a sense of boundless possibility."
  ) => {
    console.log("Fetching image...");
    console.log(text);
    try {
      const response = await fetch(`${API_URL}/generateimage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: text }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data.img_url);
    } catch (error) {
      console.error("Error fetching API:", error);
    }
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => fetchImage()}>count is {count}</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
