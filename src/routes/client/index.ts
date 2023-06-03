import { Router } from "express";
import ClientController from "../../controllers/client";

const route = Router();

route.get("/create", ClientController.createClient);
route.get("/create", ClientController.getClient);
route.get("/create", ClientController.updateClient);
route.get("/create", ClientController.removeClient);
route.get("/create", ClientController.createOrder);
route.get("/create", ClientController.createAvaliation);
route.get("/create", ClientController.addFavoriteStore);

export default route;
