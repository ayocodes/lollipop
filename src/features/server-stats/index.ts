import { Request, Response } from "express";
import insertData from "../../utils/insert-data.js";
import setConfig from "../../utils/set-config.js";

export default async (req: Request, res: Response) => {
  const { config, values } = req.body as {
    config: string;
    values: any[];
  };

  await setConfig(config);

  const array = values.map(() => {});

  insertData(array);
};
