import { Router } from "express";
import OwnerController from "../../controllers/owner";

const route = Router();

route.post("/create", OwnerController.createOwner);
route.get("/profile", OwnerController.getOwner);
route.patch("/updateprofile", OwnerController.updateOwner);
route.patch("/changepassword", OwnerController.updateOwner);
route.delete("/delete", OwnerController.deleteOwner);
route.post("/createstore", OwnerController.createStore);
route.get("/getstore", OwnerController.getStore);
route.patch("/updatestore", OwnerController.updateStore);
route.patch("/updatelogo", OwnerController.updateStore);
route.patch("/updatecover", OwnerController.updateStore);
route.delete("/deletestore", OwnerController.deleteStore);
route.get("/createinternalcategorie", OwnerController.createInternalCategorie);
route.get("/getinternalcategorie", OwnerController.getInternalCategorie);
route.get("/updateinternalcategorie", OwnerController.updateInternalCategorie);
route.get("/create", OwnerController.deleteInternalCategorie);
route.get("/create", OwnerController.createProduct);
route.get("/create", OwnerController.getProduct);
route.get("/create", OwnerController.updateProduct);
route.get("/create", OwnerController.deleteProduct);
route.get("/create", OwnerController.createPaymentMethod);
route.get("/create", OwnerController.getPaymentMethod);
route.get("/create", OwnerController.updatePaymentMethod);
route.get("/create", OwnerController.deletePaymentMethod);

export default route;
