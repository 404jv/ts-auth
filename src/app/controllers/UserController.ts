import { Request, Response } from "express";

class UserController {
  store(req: Request, res: Response) {
    return res.send('OK');  
  }
}

export default new UserController();
