import { Router } from "express";
import ColaboratorController from "../../controllers/colaborator";

import { ColabTokenValidation } from "../../middlewares/TokenController";

const route = Router();

route.post("/login", ColaboratorController.loginColaborator);
route.get("/profile", ColabTokenValidation, ColaboratorController.getColaborator);
route.patch("/updateprofile", ColabTokenValidation, ColaboratorController.updateColaboratorProfile);
route.patch("/changepassword", ColabTokenValidation, ColaboratorController.updateColaboratorPassword);

export default route;
