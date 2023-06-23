import { Router } from "express";
import OwnerController from "../../controllers/owner";

import { OwnerTokenValidation } from "../../middlewares/TokenController";

const route = Router();

route.post("/create", OwnerController.createOwner);
route.post("/login", OwnerController.loginOwner);
route.get("/profile", OwnerTokenValidation, OwnerController.getOwner);
route.patch("/updateprofile", OwnerTokenValidation, OwnerController.updateProfileOwner);
route.patch("/changepassword", OwnerTokenValidation, OwnerController.changePasswordOwner);
route.delete("/delete", OwnerTokenValidation, OwnerController.deleteOwner);
route.post("/createstore", OwnerTokenValidation, OwnerController.createStore);
route.get("/getstore", OwnerTokenValidation, OwnerController.getStore);
route.patch("/updatestore", OwnerTokenValidation, OwnerController.updateStore);
route.patch("/updatelogo", OwnerTokenValidation, OwnerController.updateStore);
route.patch("/updatecover", OwnerTokenValidation, OwnerController.updateStore);
route.delete("/deletestore", OwnerTokenValidation, OwnerController.deleteStore);
route.get("/createinternalcategorie", OwnerTokenValidation, OwnerController.createInternalCategorie);
route.get("/getinternalcategorie", OwnerTokenValidation, OwnerController.getInternalCategorie);
route.get("/updateinternalcategorie", OwnerTokenValidation, OwnerController.updateInternalCategorie);
route.get("/create", OwnerTokenValidation, OwnerController.deleteInternalCategorie);
route.get("/create", OwnerTokenValidation, OwnerController.createProduct);
route.get("/create", OwnerTokenValidation, OwnerController.getProduct);
route.get("/create", OwnerTokenValidation, OwnerController.updateProduct);
route.get("/create", OwnerTokenValidation, OwnerController.deleteProduct);
route.get("/create", OwnerTokenValidation, OwnerController.createPaymentMethod);
route.get("/create", OwnerTokenValidation, OwnerController.getPaymentMethod);
route.get("/create", OwnerTokenValidation, OwnerController.updatePaymentMethod);
route.get("/create", OwnerTokenValidation, OwnerController.deletePaymentMethod);

export default route;
