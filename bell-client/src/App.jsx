import { useEffect, useState } from "react";

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
    <>
      <h1>Welcome to CYF</h1>
      <img
        src="/src/assets/bell.png"
        width="128"
        height="128"
        alt="bell"
        onClick={ringBell}
      />
    </>
  );
};

export default App;
