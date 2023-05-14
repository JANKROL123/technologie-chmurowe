import express from "express";
import { createClient } from "redis";
import Pg from "pg";
import * as Uuid from "uuid";
const app = express();
const redisClient = createClient({
  url: "redis://redis:6379",
});
const postgresClient = new Pg.Client({
  host: "postgres",
  port: 5432,
  user: "postgres",
  password: "postgres",
  database: "postgres",
});

await Promise.all([postgresClient.connect(), redisClient.connect()]);
await postgresClient.query(`
CREATE TABLE IF NOT EXISTS users (
	  id UUID PRIMARY KEY
	)
`);

app.get("/redis/:key", async (req, res) => {
  const key = req.params.key;
  const response = await redisClient.get(key);
  return res.send(response);
});
app.put("/redis/:key", express.text(), async (req, res) => {
  const key = req.params.key;
  const value = req.body;

  await redisClient.setEx(key, 3600, value);
  return res.status(200).send("Added");
});
app.get("/postgres", async (_req, res) => {
  const response = await postgresClient.query(`SELECT * FROM users`);
  return res.send(response.rows);
});
app.post("/postgres", async (req, res) => {
  const user = { id: Uuid.v4() };
  await postgresClient.query(`INSERT INTO users VALUES ('${user.id}')`);
  return res.status(200).send(user);
});
app.listen(5000, () => console.log(`Listening on port 5000`));
