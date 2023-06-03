import { Router } from "express";
import ClientController from "../../controllers/client";

const route = Router();

route.get("/create", ClientController.createClient);

export default route;
