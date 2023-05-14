import express from "express";
import { connect, model, Schema } from "mongoose";
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || 27017;
const PORT = process.env.PORT || 5000;
const userSchema = new Schema({
  name: { type: String },
});
const userModel = model("User", userSchema, "users");
const app = express();
app.get("/", async (_req, res) => {
  const dbResponse = await userModel.find();
  return res.send(dbResponse);
});
await connect(`mongodb://${DB_HOST}:${DB_PORT}/users`);
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
