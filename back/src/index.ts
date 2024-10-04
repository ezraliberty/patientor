import express from "express";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/ping", (_req, res) => {
  res.send("Pong");
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server is running on: ${PORT}`);
});
