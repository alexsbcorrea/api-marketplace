import { Router } from "express";
import AdminController from "../../controllers/admin";
import { AdminTokenValidation } from "../../middlewares/TokenController";

const route = Router();

route.post("/create", AdminController.createAdmin);
route.post("/login", AdminController.loginAdmin);
route.get("/profile", AdminTokenValidation, AdminController.getAdmin);
route.post("/update", AdminController.updateAdmin);
route.post("/remove", AdminController.deleteAdmin);
route.post("/newpermission", AdminController.createPermission);
route.get("/permission/:id", AdminController.getPermission);
route.post("/update/:id", AdminController.updatePermission);
route.post("/delete/:id", AdminController.deletePermission);
route.post("/newcolab", AdminController.createColaborator);
route.get("/colab/:id", AdminController.getColaborator);
route.post("/update/:id", AdminController.updateColaborator);
route.post("/remove/:id", AdminController.deleteColaborator);
route.post(
  "/configpermission/:id",
  AdminController.configPermissionColaborator
);
route.post("/createtype/:id", AdminController.createTypeStore);
route.post("/createspec/:id", AdminController.createSpecialitieStore);

export default route;
