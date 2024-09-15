import { Request, Response } from 'express';
import ProgrammingLang from '../models/ProgrammingLang';

export const listAllProgrammingLang = async (_: Request, res: Response): Promise<void> => {
  try {
    const plList = await ProgrammingLang.findAll();
    res.status(200).json(plList);
  } catch (error) {
    console.error('Error fetching PL list:', error);
    res.status(500).json({ message: 'Error fetching Programming Lang list' });
  }
};

export const createProgrammingLang = async (req: Request, res: Response): Promise<void> => {
  const { name } = req.body;

  try {
    const newPL = await ProgrammingLang.create({ name });
    res.status(201).json(newPL);
  } catch (error) {
    console.error('Error creating PL:', error);
    res.status(500).json({ message: 'Error creating Programming Lang' });
  }
};

export const deleteProgrammingLang = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const pl = await ProgrammingLang.findByPk(id);
    if (pl) {
      await pl.destroy();
      res.status(200).json({ message: 'Programming Lang deleted successfully' });
    } else {
      res.status(404).json({ message: 'Programming Lang not found' });
    }
  } catch (error) {
    console.error('Error deleting OS:', error);
    res.status(500).json({ message: 'Error deleting Programming Lang' });
  }
};
