import { Router } from 'express';
import * as controller from '../controllers/userControllers';

const router = Router();

// !! login route
router.post('/login', controller.loginUser);

// !! signup route
router.post('/signup', controller.signupUser);

export default router;
