import OS from '../models/OS';
import osRepository from '../repositories/osRepository';

class OsService {
  public async getAll() {
    return osRepository.findAll();
  }

  public async create(osData: Partial<OS>) {
    return osRepository.create(osData);
  }

  public async findById(id: number) {
    return osRepository.findById(id);
  }

  public async delete(id: number) {
    return osRepository.delete(id);
  }
}

export default new OsService();
