import express from "express";
import { createClient } from "redis";

const app = express();

const client = createClient({
  url: "redis://db:6379",
});

await client.connect();

app.use(express.json());

app.get("/:key", async (req, res) => {
  const key = req.params.key;
  const response = await client.get(key);
  return res.send(response);
});

app.post("/", async (req, res) => {
  const body = req.body;
  const key = Object.keys(body)[0];
  const value = Object.values(body)[0];
  client.setEx(key, 3600, value);
  return res.status(200).send("Added");
});

app.listen(3000, () => console.log("Server started on port 3000"));
