import { Router } from "express";
import OwnerController from "../../controllers/owner";

const route = Router();

route.get("/create", OwnerController.createOwner);

export default route;
