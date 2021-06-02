import { Router } from "express";
import AuthController from "./app/controllers/AuthController";
import UserController from "./app/controllers/UserController";
import AuthMiddleware from "./app/middleware/authMiddleware";

const routes = Router();

routes.get('/users', AuthMiddleware, UserController.index);
routes.post('/users', UserController.store);
routes.post('/auth', AuthController.authenticate);

export default routes;
