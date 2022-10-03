import pkg from "pg";
const { Pool } = pkg;

export default (config: Config) => {
  const pool = new Pool({
    user: config.pgUser,
    password: config.pgPassword || undefined,
    host: config.pgHost || "localhost",
    port: config.pgPort || 5432,
    database: config.pgDatabase || "peppermint",
  });

  return pool;
};
