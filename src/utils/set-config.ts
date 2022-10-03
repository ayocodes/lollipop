import { writeFile } from "fs/promises";
import path from "path";

export default async (config: Config) => {
  const configData = {
    batchSize: 110,
    confirmations: 1,
    privateKey: config.privateKey,
    rpcUrl: config.rpcUrl || "https://ghostnet.tezos.marigold.dev/",
    pollingDelay: 10000,
    timeout: 300,
    dbConnection: {
      user: config.pgUser,
      password: config.pgPassword || undefined,
      host: config.pgHost || "localhost",
      port: config.pgPort || 5432,
      database: config.pgDatabase || "peppermint",
    },
    handlers: {
      nft: {
        handler: "MultiassetHandler",
        args: {
          contract_address: config.contractAddress,
        },
      },
      tez: {
        handler: "TezHandler",
        args: {},
      },
    },
  };

  await writeFile(
    path.resolve("./") + "/config.json",
    JSON.stringify(configData)
  );
};
