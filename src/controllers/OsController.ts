import { Request, Response } from 'express';
import OS from '../models/OS';

export const listAllOS = async (_: Request, res: Response): Promise<void> => {
  try {
    const osList = await OS.findAll();
    res.status(200).json(osList);
  } catch (error) {
    console.error('Error fetching OS list:', error);
    res.status(500).json({ message: 'Error fetching OS list' });
  }
};

export const createOS = async (req: Request, res: Response): Promise<void> => {
  const { name } = req.body;

  try {
    const newOS = await OS.create({ name });
    res.status(201).json(newOS);
  } catch (error) {
    console.error('Error creating OS:', error);
    res.status(500).json({ message: 'Error creating OS' });
  }
};

export const deleteOS = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const os = await OS.findByPk(id);
    if (os) {
      await os.destroy();
      res.status(200).json({ message: 'OS deleted successfully' });
    } else {
      res.status(404).json({ message: 'OS not found' });
    }
  } catch (error) {
    console.error('Error deleting OS:', error);
    res.status(500).json({ message: 'Error deleting OS' });
  }
};
