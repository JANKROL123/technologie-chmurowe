import express from "express";
import mongoose from "mongoose";
const app = express();
const { model, Schema } = mongoose;
const userSchema = new Schema({
  name: { type: String },
  last_name: { type: String },
});
const userModel = model("User", userSchema, "users");
app.use(express.json());
app.get("/users", async (_req, res) => {
  try {
    const response = await userModel.find();
    return res.send(response);
  } catch (err) {
    console.error(err);
  }
});
app.post("/users", async (_req, res) => {
  const user = {
    name: "Jan",
    last_name: "Krol",
  };
  try {
    await userModel.create(user);
    return res.status(200).send("Added");
  } catch (err) {
    console.error(err);
  }
});
try {
  await mongoose.connect("mongodb://db:27019/users");
  app.listen(3003, () => console.log("Server started on port 3003"));
} catch (err) {
  console.error(err);
}
