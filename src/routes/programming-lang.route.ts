import { Router } from "express";
import { createProgrammingLang, deleteProgrammingLang, listAllProgrammingLang } from "../controllers/programming-lang.controller";

const router = Router();

router.get('/api/app/programmingLang', listAllProgrammingLang);
router.post('/api/app/programmingLang', createProgrammingLang);
router.delete('/api/app/programmingLang/:programmingLangId', deleteProgrammingLang);

export default router;