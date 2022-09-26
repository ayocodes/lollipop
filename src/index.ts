import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { URL } from "url";

import main from "../peppermint/app.mjs";
import mintNFT from "./features/mint-nft/index.js";
import sendNFT from "./features/send-nft/index.js";
import sendTEZ from "./features/send-tez/index.js";
import customLogger from "./utils/costumLogger.js";
import { handleError } from "./utils/middleware.js";
import streamLogs from "./features/stream-logs";

console.log = customLogger;

dotenv.config();

const app = express();
const port = process.env.PORT;

main()
  .then(() => {
    console.log("bye!");
  })
  .catch((err) => {
    console.log("An error has ocurred outside the main event loop.\n", err);
  });

app.use(cors({ origin: true }));

app.use((req, res, next) => {
  handleError(express.json(), req, res, next);
});

app.get("/", (_, res) => {
  res.sendStatus(400);
});

app.post("/mint-nft", async (req, res) => {
  await mintNFT(req, res);
});

app.post("/send-nft", async (req, res) => {
  await sendNFT(req, res);
});

app.post("/send-tez", async (req, res) => {
  await sendTEZ(req, res);
});

/// Returns relevant server stats and logs.
app.get("/server-stats", (_, res) => {
  res.sendStatus(400);
});

const httpServer = app.listen(port, () => {
  console.log(`🔥 [server]: Server is running at https://localhost:${port}`);
});

// Websocket.
httpServer.on("upgrade", (request, socket, head) => {
  const url = request?.url;
  const urlParams = url ? new URL(url) : null;

  if (urlParams?.pathname === "/stream-logs") {
    streamLogs.handleUpgrade(request, socket, head, function done(ws) {
      streamLogs.emit("connection", ws, request);
    });
  } else {
    socket.destroy();
  }
});
