import OS from '../models/OS';

class OsRepository {
  public async findAll() {
    return OS.findAll();
  }

  public async findById(id: number) {
    return OS.findByPk(id);
  }

  public async create(osData: Partial<OS>) {
    return OS.create(osData);
  }

  public async update(id: number, osData: Partial<OS>) {
    const os = await OS.findByPk(id);
    if (!os) throw new Error('OS not found');
    return os.update(osData);
  }

  public async delete(id: number) {
    const os = await OS.findByPk(id);
    if (!os) throw new Error('OS not found');
    return os.destroy();
  }
}

export default new OsRepository();
