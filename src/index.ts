import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mintNFT from "./features/mint-nft/index.js";
import sendNFT from "./features/send-nft/index.js";
import sendTEZ from "./features/send-tez/index.js";
import { handleError } from "./utils/middleware.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

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

app.listen(port, () => {
  console.log(`🔥 [server]: Server is running at https://localhost:${port}`);
});
