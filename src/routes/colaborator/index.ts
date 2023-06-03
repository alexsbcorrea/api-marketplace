import { Router } from "express";
import ColaboratorController from "../../controllers/colaborator";

const route = Router();

route.get("/create", ColaboratorController.getColaborator);
route.get("/create", ColaboratorController.updateColaborator);

export default route;
