import { Router } from 'express';
import { createProgrammingLang, deleteProgrammingLang, listAllProgrammingLang } from '../controllers/ProgrammingLangController';
import tokenChecker from '../middlewares/tokenChecker';

const router = Router();
// All PL routes require token
router.use(tokenChecker);

router.get('/programmingLang', listAllProgrammingLang);
router.post('/programmingLang', createProgrammingLang);
router.delete('/programmingLang/:id', deleteProgrammingLang);

export default router;
