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
route.delete(
  "/remove/:id",
  AdminTokenValidation,
  AdminController.deleteColaborator
);
route.get("/mycolabs", AdminTokenValidation, AdminController.getMyColaborators);
route.get(
  "/allcolabs",
  AdminTokenValidation,
  AdminController.getAllColaborators
);
route.post(
  "/addcolabpermission",
  AdminTokenValidation,
  AdminController.addPermissionColaborator
);
route.delete(
  "/removecolabpermission",
  AdminTokenValidation,
  AdminController.removePermissionColaborator
);
route.post(
  "/createtype",
  AdminTokenValidation,
  AdminController.createTypeStore
);
route.get("/gettype/:id", AdminTokenValidation, AdminController.getTypeStore);
route.patch(
  "/updatetypename/:id",
  AdminTokenValidation,
  AdminController.updateTypeStoreName
);
route.patch(
  "/updatetypeimage/:id",
  AdminTokenValidation,
  AdminController.updateTypeStoreImage
);
route.delete(
  "/deletetype/:id",
  AdminTokenValidation,
  AdminController.deleteTypeStore
);
route.get("/alltypes", AdminTokenValidation, AdminController.getAllTypeStore);
route.get("/mytypes", AdminTokenValidation, AdminController.getMyTypeStore);
route.post(
  "/createspec",
  AdminTokenValidation,
  AdminController.createSpecialitieStore
);
route.get(
  "/getspec/:id",
  AdminTokenValidation,
  AdminController.getSpecialitieStore
);
route.patch(
  "/updatenamespec/:id",
  AdminTokenValidation,
  AdminController.updateNameSpecialitieStore
);
route.patch(
  "/updateimagespec/:id",
  AdminTokenValidation,
  AdminController.updateImageSpecialitieStore
);
route.delete(
  "/removespec/:id",
  AdminTokenValidation,
  AdminController.deleteSpecialitieStore
);
route.post("/addpayment", AdminTokenValidation, AdminController.addPayment);
route.get("/getpayment/:id", AdminTokenValidation, AdminController.getPayment);
route.patch(
  "/updatepayment/:id",
  AdminTokenValidation,
  AdminController.updatePayment
);

export default route;
