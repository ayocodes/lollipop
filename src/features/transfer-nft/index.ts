import { Request, Response } from "express";
import insertData from "../../utils/insert-data.js";
import setConfig from "../../utils/set-config.js";

export default async (req: Request, res: Response) => {
  const { config, values } = req.body as {
    config: Config;
    values: any[];
  };

  await setConfig(config);

  const transform = values.map((e) => {
    return [
      config.privateKey,
      {
        handler: "nft",
        name: "transfer",
        args: e,
      },
    ];
  });

  insertData({ values: transform, config });

  res.status(200).send({
    status: "success",
  });
};
