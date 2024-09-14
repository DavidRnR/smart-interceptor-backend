import { Router } from "express";
import { createOS, deleteOS, listAllOS } from "../controllers/os.controller";

const router = Router();

router.get('/app/os', listAllOS);
router.post('/app/os', createOS);
router.delete('/app/os/:osId', deleteOS);

export default router;