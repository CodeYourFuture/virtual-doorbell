import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [socket, setSocket] = useState(null);
  const [ring, setRing] = useState(false);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    setSocket(ws);

    ws.onopen = () => {
      console.log("Connected to the server");
    };
  }, []);

  const ringBell = () => {
    socket.send("Ding-dong");
    setRing(true)
    setTimeout(() => setRing(false), 5000);
  };

  return (
    <div className="app">
      <h1>Welcome to CYF London</h1>
      <img
        src="/assets/bell.png"
        width="256"
        height="256"
        alt="bell"
        onClick={ringBell}
      />
      {ring && <p>Ding Dong</p>}
      <p>Click the bell to ring</p>
    </div>
  );
};

export default App;
