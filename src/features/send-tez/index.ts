import { Request, Response } from "express";
import insertData from "../../utils/insert-data.js";
import setConfig from "../../utils/set-config.js";

export default async (req: Request, res: Response) => {
  const { config, values } = req.body as {
    config: Config;
    values: any[];
  };

  console.log(1);

  await setConfig(config);

  console.log(2);

  const transform = values.map((e) => {
    return [
      config.publicKey,
      {
        handler: "tez",
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
