import express from "express";
const app = express();
app.get("/health", (_req, res) => {
  return res.send({ success: true, message: "It is working" });
});
app.get("/", (_req, res) => {
  return res.send("Lab9 zad1");
});
app.listen(5000, () => console.log("Server started on port 5000"));
