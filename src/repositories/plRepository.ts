import ProgrammingLang from '../models/ProgrammingLang';

class ProgrammingLangRepository {
  public async findAll() {
    return ProgrammingLang.findAll();
  }

  public async findById(id: number) {
    return ProgrammingLang.findByPk(id);
  }

  public async create(plData: Partial<ProgrammingLang>) {
    return ProgrammingLang.create(plData);
  }

  public async update(id: number, plData: Partial<ProgrammingLang>) {
    const pl = await ProgrammingLang.findByPk(id);
    if (!pl) throw new Error('OS not found');
    return pl.update(plData);
  }

  public async delete(id: number) {
    const pl = await ProgrammingLang.findByPk(id);
    if (!pl) throw new Error('OS not found');
    return pl.destroy();
  }
}

export default new ProgrammingLangRepository();
