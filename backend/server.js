import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, everything is working fine");
});

app.listen(3000, () => {
  console.log("Server is working correctly");
});
