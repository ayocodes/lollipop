import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ noServer: true });

wss.on("connection", (ws) => {
  console.log("Client connected!");

  const c = setInterval(() => {
    ws.send("this will be the logs");
  }, 1000);

  ws.on("close", () => clearInterval(c));
});

export default wss;
