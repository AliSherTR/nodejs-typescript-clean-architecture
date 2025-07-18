import express from 'express';
import { AuthController } from '../controllers/auth.controller';
import { PrismaUserRepository } from '../../infrastructure/database/prismaUserRepository';

const router = express.Router();
const userRepository = new PrismaUserRepository();
const authController = new AuthController(userRepository);

router.post('/login', authController.login);

export default router;
