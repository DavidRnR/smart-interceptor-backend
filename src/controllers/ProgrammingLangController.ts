import { Request, Response } from 'express';
import plService from '../services/plService';
import { ProgrammingLangCreateRequestDTO, ProgrammingLangListResponseDTO } from '../dto/ProgrammingLangDTO';
import { ApiResponseErrorDTO } from '../dto/ApiDTO';

export const listAllProgrammingLang = async (_: Request, res: Response<ProgrammingLangListResponseDTO | ApiResponseErrorDTO>): Promise<void> => {
  try {
    const plList = await plService.getAll();
    res.status(200).json(plList);
  } catch (error) {
    console.error('Error fetching PL list:', error);
    res.status(500).json({ message: 'Error fetching Programming Lang list' });
  }
};

export const createProgrammingLang = async (req: Request<object, object, ProgrammingLangCreateRequestDTO>, res: Response): Promise<void> => {
  const { name } = req.body;

  try {
    const newPL = await plService.create({ name });
    res.status(201).json(newPL);
  } catch (error) {
    console.error('Error creating PL:', error);
    res.status(500).json({ message: 'Error creating Programming Lang' });
  }
};

export const deleteProgrammingLang = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const pl = await plService.findById(Number(id));
    if (pl) {
      await plService.delete(Number(id));
      res.status(200).json({ message: 'Programming Lang deleted successfully' });
    } else {
      res.status(404).json({ message: 'Programming Lang not found' });
    }
  } catch (error) {
    console.error('Error deleting OS:', error);
    res.status(500).json({ message: 'Error deleting Programming Lang' });
  }
};
