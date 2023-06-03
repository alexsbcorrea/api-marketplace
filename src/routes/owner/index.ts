import { Router } from "express";
import OwnerController from "../../controllers/owner";

const route = Router();

route.get("/create", OwnerController.createOwner);
route.get("/create", OwnerController.getOwner);
route.get("/create", OwnerController.updateOwner);
route.get("/create", OwnerController.deleteOwner);
route.get("/create", OwnerController.createStore);
route.get("/create", OwnerController.getStore);
route.get("/create", OwnerController.updateStore);
route.get("/create", OwnerController.deleteStore);
route.get("/create", OwnerController.createInternalCategorie);
route.get("/create", OwnerController.getInternalCategorie);
route.get("/create", OwnerController.updateInternalCategorie);
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
