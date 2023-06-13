import { Router } from "express";
import AdminController from "../../controllers/admin";
import { AdminTokenValidation } from "../../middlewares/TokenController";

const route = Router();

route.post("/create", AdminController.createAdmin);
route.post("/login", AdminController.loginAdmin);
route.get("/profile", AdminTokenValidation, AdminController.getAdmin);
route.patch(
  "/updateprofile",
  AdminTokenValidation,
  AdminController.updateAdminProfile
);
route.patch(
  "/changepassword",
  AdminTokenValidation,
  AdminController.updateAdminPassword
);
route.delete(
  "/removeaccount",
  AdminTokenValidation,
  AdminController.deleteAdmin
);
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
route.patch(
  "/updatepermission/:id",
  AdminTokenValidation,
  AdminController.updatePermission
);
route.delete(
  "/deletepermission/:id",
  AdminTokenValidation,
  AdminController.deletePermission
);
route.get(
  "/allpermissions",
  AdminTokenValidation,
  AdminController.getAllPermissions
);
route.get(
  "/mypermissions",
  AdminTokenValidation,
  AdminController.getMyPermission
);
route.post(
  "/newcolab",
  AdminTokenValidation,
  AdminController.createColaborator
);
route.get(
  "/getcolab/:id",
  AdminTokenValidation,
  AdminController.getColaborator
);
route.patch(
  "/updateprofilecolab/:id",
  AdminTokenValidation,
  AdminController.updateColaborator
);
route.patch(
  "/changepasswordcolab/:id",
  AdminTokenValidation,
  AdminController.updateColaboratorPassword
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
