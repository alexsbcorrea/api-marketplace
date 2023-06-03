import { Router } from "express";
import AdminController from "../../controllers/admin";

const route = Router();

route.get("/create", AdminController.createAdmin);
route.get("/profile", AdminController.getAdmin);
route.get("/update", AdminController.updateAdmin);
route.get("/remove", AdminController.deleteAdmin);
route.get("/newpermission", AdminController.createPermission);
route.get("/permission/:id", AdminController.getPermission);
route.get("/update/:id", AdminController.updatePermission);
route.get("/delete/:id", AdminController.deletePermission);
route.get("/newcolab", AdminController.createColaborator);
route.get("/colab/:id", AdminController.getColaborator);
route.get("/update/:id", AdminController.updateColaborator);
route.get("/remove/:id", AdminController.deleteColaborator);
route.get("/configpermission/:id", AdminController.configPermissionColaborator);
route.get("/configpermission/:id", AdminController.createTypeStore);
route.get("/configpermission/:id", AdminController.createSpecialitieStore);

export default route;
