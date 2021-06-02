import { Request, Response } from "express";
import { getRepository } from "typeorm";
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class AuthController {
  async authenticate(req: Request, res: Response) {
    try {
      const repository = getRepository(User);
      const { email, password } = req.body;

      const user = await repository.findOne({ where: { email }});
      
      if (!user) return res.status(401);

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) return res.status(401);

      const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1d' });

      delete user.password;

      return res.json({
        user,
        token
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new AuthController();
