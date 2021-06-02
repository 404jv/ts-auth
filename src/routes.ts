import { Router } from "express";
import AuthController from "./app/controllers/AuthController";
import UserController from "./app/controllers/UserController";

const routes = Router();

routes.post('/users', UserController.store);
routes.post('/auth', AuthController.authenticate);

export default routes;
