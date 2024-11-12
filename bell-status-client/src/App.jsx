import { useEffect, useState } from "react";

const App = () => {
  const [isAtDoor, setIsAtDoor] = useState(false);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      console.log("Connected to the server");
    };

    ws.onmessage = () => {
      setIsAtDoor(true);
      setTimeout(() => setIsAtDoor(false), 30000);
    };
  }, []);

  return (
    <>
      <p>{isAtDoor ? "Someone is at the door" : "No one is at the door"}</p>
    </>
  );
};

export default App;
