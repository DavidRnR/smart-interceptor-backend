import { Router } from 'express';
import { createOS, deleteOS, listAllOS } from '../controllers/OsController';
import tokenChecker from '../middlewares/tokenChecker';

const router = Router();
// All OS routes require token
router.use(tokenChecker);

router.get('/os', listAllOS);
router.post('/os', createOS);
router.delete('/os/:id', deleteOS);

export default router;
