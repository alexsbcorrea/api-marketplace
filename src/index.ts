import express from "express";
import "dotenv/config";

import SourceRoute from "./routes/SourceRoute";
import AdminRoutes from "./routes/admin";
import ColaboratorRoutes from "./routes/colaborator";
import OwnerRoutes from "./routes/owner";
import ClientRoutes from "./routes/client";

const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", SourceRoute);
app.use("/admin", AdminRoutes);
app.use("/colab", ColaboratorRoutes);
app.use("/owner", OwnerRoutes);
app.use("/client", ClientRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
