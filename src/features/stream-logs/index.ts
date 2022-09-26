import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ noServer: true });

wss.on("connection", (ws) => {
  console.log("Client connected!");
  ws.on("close", () => console.log("Client has disconnected!"));
});

const cl = console.log;

export async function customLogger(...args: any[]) {
  JSON.stringify(args);

  if (wss.clients.size > 0) {
    wss.clients.forEach((client) => {
      client.send(args);
    });
  }

  cl.apply(console, args);
}

export default wss;
