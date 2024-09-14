import { Router } from "express";
import { singUp, singIn, getToken } from "../controllers/auth.controller";

const router = Router();

router.post("/auth/signup", singUp);
router.post("/auth/signin", singIn);
router.post("/auth/token", getToken);

export default router;
