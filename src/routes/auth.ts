import { Router } from 'express';
import { singUp, singIn, refresh } from '../controllers/AuthController';

const router = Router();

router.post('/auth/signup', singUp);
router.post('/auth/signin', singIn);
router.post('/auth/refresh', refresh);

export default router;
