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
route.delete("/delete", AdminTokenValidation, AdminController.deleteAdmin);
route.post(
  "/createpermission",
  AdminTokenValidation,
  AdminController.createPermission
);
route.get(
  "/getpermission/:id",
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
  "/createcolab",
  AdminTokenValidation,
  AdminController.createColaborator
);
route.get(
  "/getcolab/:id",
  AdminTokenValidation,
  AdminController.getColaborator
);
route.patch(
  "/updatecolab/:id",
  AdminTokenValidation,
  AdminController.updateColaboratorProfile
);
route.patch(
  "/changepasswordcolab/:id",
  AdminTokenValidation,
  AdminController.updateColaboratorPassword
);
route.delete(
  "/deletecolab/:id",
  AdminTokenValidation,
  AdminController.deleteColaborator
);
route.get(
  "/allcolabs",
  AdminTokenValidation,
  AdminController.getAllColaborators
);
route.get("/mycolabs", AdminTokenValidation, AdminController.getMyColaborators);
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
  AdminController.updateSpecialitieStoreName
);
route.patch(
  "/updateimagespec/:id",
  AdminTokenValidation,
  AdminController.updateSpecialitieStoreImage
);
route.delete(
  "/deletespec/:id",
  AdminTokenValidation,
  AdminController.deleteSpecialitieStore
);
route.get(
  "/getallspecs",
  AdminTokenValidation,
  AdminController.getAllSpecialitieStore
);
route.get(
  "/getmyspecs",
  AdminTokenValidation,
  AdminController.getMySpecialitieStore
);
route.post(
  "/createpayment",
  AdminTokenValidation,
  AdminController.createPayment
);
route.get("/getpayment/:id", AdminTokenValidation, AdminController.getPayment);
route.patch(
  "/updatepayment/:id",
  AdminTokenValidation,
  AdminController.updatePayment
);
route.delete(
  "/deletepayment/:id",
  AdminTokenValidation,
  AdminController.deletePayment
);
route.get(
  "/getpaymentsstore/:id",
  AdminTokenValidation,
  AdminController.getPaymentsforStore
);

export default route;
