import ProgrammingLang from '../models/ProgrammingLang';
import plRepository from '../repositories/plRepository';

class ProgrammingLangService {
  public async getAll() {
    return plRepository.findAll();
  }

  public async create(plData: Partial<ProgrammingLang>) {
    return plRepository.create(plData);
  }

  public async findById(id: number) {
    return plRepository.findById(id);
  }

  public async delete(id: number) {
    return plRepository.delete(id);
  }
}

export default new ProgrammingLangService();
