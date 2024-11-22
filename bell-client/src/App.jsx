import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    setSocket(ws);

    ws.onopen = () => {
      console.log("Connected to the server");
    };
  }, []);

  const ringBell = () => {
    socket.send("Ding-dong");
  };

  return (
    <div className="app">
      <h1>Welcome to CYF</h1>
      <img
        src="/assets/bell.png"
        width="256"
        height="256"
        alt="bell"
        onClick={ringBell}
      />
    </div>
  );
};

export default App;
