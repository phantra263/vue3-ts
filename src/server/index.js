import express from "express";
import cors from "cors";
import { today, thisMonth, thisWeek } from "../postMock.js";

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.json([today, thisWeek, thisMonth]);
});
app.get("/posts", (req, res) => {
  res.json([today, thisWeek, thisMonth]);
});

app.listen(8000, () => {
  console.log("listening on port 8000");
});
