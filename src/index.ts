import express from "express";
import "dotenv/config";

import SourceRoute from "./routes/SourceRoute";

const app = express();
const port = process.env.PORT || 3002;

app.use("/", SourceRoute);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
