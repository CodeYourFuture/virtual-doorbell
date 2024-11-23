import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [isAtDoor, setIsAtDoor] = useState(false);
  const [bellStatus, setBellStatus] = useState(false);
  const [bell] = useState(new Audio("/assets/doorbell.mp3"));

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      console.log("Connected to the server");
    };
    if (bellStatus) {
      ws.onmessage = () => {
        bell.play();
        setIsAtDoor(true);
      };
    }
  }, [bellStatus, bell]);

  return (
    <>
      {!bellStatus ? (
        <button className="activate" onClick={() => setBellStatus(true)}>
          Activate Bell
        </button>
      ) : (
        <div
          className={`bell-status`}
          style={{
            backgroundColor: `${isAtDoor ? "#ebb238" : "#74eb34"}`,
          }}
        >
          <p className="message">
            {isAtDoor ? "Someone is at the door" : "No one is at the door"}
          </p>
          {isAtDoor && (
            <button className="clear" onClick={() => setIsAtDoor(false)}>
              Clear
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default App;
