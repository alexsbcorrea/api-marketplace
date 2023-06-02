import { Router } from "express";
import GetSource from "../controllers/SourceController";

const route = Router();

route.get("/", GetSource);

export default route;
