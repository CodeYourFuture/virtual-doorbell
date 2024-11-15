import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [isAtDoor, setIsAtDoor] = useState(false);
  const [bellStatus, setBellStatus] = useState(false);
  const [bell] = useState(new Audio("/src/assets/doorbell.mp3"));

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      console.log("Connected to the server");
    };
    if (bellStatus) {
      ws.onmessage = () => {
        bell.play();
        setIsAtDoor(true);
        setTimeout(() => setIsAtDoor(false), 30000);
      };
    }
  }, [bellStatus, bell]);

  return (
    <div className="app">
      {!bellStatus ? (
        <button className="activate" onClick={() => setBellStatus(true)}>Activate Bell</button>
      ) : (
        <p className="message">
          {isAtDoor ? "Someone is at the door" : "No one is at the door"}
        </p>
      )}
    </div>
  );
};

export default App;
