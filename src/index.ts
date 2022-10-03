import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import main from "../peppermint/app.mjs";
import createMintNFT from "./features/create-mint-nft/index.js";
import createNFT from "./features/create-nft/index.js";
import mintNFT from "./features/mint-nft/index.js";
import sendTEZ from "./features/send-tez/index.js";
import streamLogs, { customLogger } from "./features/stream-logs/index.js";
import transferNFT from "./features/transfer-nft/index.js";
import { handleError } from "./utils/middleware.js";

console.log = customLogger;

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const WS_PORT = process.env.WS_PORT;

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

app.use("/", express.static("public"));

app.post("/api/send-tez", async (req, res) => {
  await sendTEZ(req, res);
});

app.post("/api/transfer-nft", async (req, res) => {
  await transferNFT(req, res);
});

app.post("/api/create-nft", async (req, res) => {
  await createNFT(req, res);
});

app.post("/api/mint-nft", async (req, res) => {
  await mintNFT(req, res);
});

app.post("/api/create-mint-nft", async (req, res) => {
  await createMintNFT(req, res);
});

/// Returns relevant server stats and logs.
app.get("/api/server-stats", (_, res) => {
  res.sendStatus(400);
});

app.listen(PORT, () => {
  console.log(`🔥 [server]: Server running at https://localhost:${PORT}`);
});

// Websocket.
const httpServer = app.listen(WS_PORT, () => {
  console.log(`🔥 [ws server]: Websocket running at ws://localhost:${WS_PORT}`);
});

httpServer.on("upgrade", (request, socket, head) => {
  console.log(request.url);

  if (request.url == "/stream-logs") {
    streamLogs.handleUpgrade(request, socket, head, function done(ws) {
      streamLogs.emit("connection", ws, request);
    });
  } else {
    socket.destroy();
  }
});
