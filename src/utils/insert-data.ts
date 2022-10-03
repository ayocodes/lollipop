import format from "pg-format";
import poolInstance from "../db/index.js";

export default async ({
  config,
  values,
}: {
  values: any[];
  config: Config;
}) => {
  console.log(values);
  const pool = poolInstance(config);
  const client = await pool.connect();
  try {
    await client.query(
      format(
        "INSERT INTO peppermint.operations (originator, command) VALUES %L",
        values
      )
    );
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
};
