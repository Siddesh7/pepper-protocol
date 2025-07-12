import express from "express";
import type { Request, Response } from "express";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Bun + Express + TypeScript!");
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
