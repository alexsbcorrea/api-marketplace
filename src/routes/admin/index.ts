import { Router } from "express";
import AdminController from "../../controllers/admin";
import { AdminTokenValidation } from "../../middlewares/TokenController";

const route = Router();

route.post("/create", AdminController.createAdmin);
route.post("/login", AdminController.loginAdmin);
route.get("/profile", AdminTokenValidation, AdminController.getAdmin);
route.post(
  "/updateprofile",
  AdminTokenValidation,
  AdminController.updateAdminProfile
);
route.post(
  "/changepassword",
  AdminTokenValidation,
  AdminController.updateAdminPassword
);
route.post("/removeaccount", AdminTokenValidation, AdminController.deleteAdmin);
route.post(
  "/newpermission",
  AdminTokenValidation,
  AdminController.createPermission
);
route.get(
  "/permission/:id",
  AdminTokenValidation,
  AdminController.getPermission
);
route.post(
  "/update/:id",
  AdminTokenValidation,
  AdminController.updatePermission
);
route.post(
  "/delete/:id",
  AdminTokenValidation,
  AdminController.deletePermission
);
route.post(
  "/newcolab",
  AdminTokenValidation,
  AdminController.createColaborator
);
route.get("/colab/:id", AdminTokenValidation, AdminController.getColaborator);
route.post(
  "/update/:id",
  AdminTokenValidation,
  AdminController.updateColaborator
);
route.post(
  "/remove/:id",
  AdminTokenValidation,
  AdminController.deleteColaborator
);
route.post(
  "/configpermission/:id",
  AdminTokenValidation,
  AdminController.configPermissionColaborator
);
route.post(
  "/createtype/:id",
  AdminTokenValidation,
  AdminController.createTypeStore
);
route.post(
  "/createspec/:id",
  AdminTokenValidation,
  AdminController.createSpecialitieStore
);

export default route;
