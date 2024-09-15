import fs from 'fs';
import path from 'path';
import sequelize from '../src/config/db';

const runMigration = async (file: string) => {
  const sql = fs.readFileSync(path.join(__dirname, 'scripts', 'migrations', file), 'utf8');
  await sequelize.query(sql);
};

const runSeeder = async (file: string) => {
  const sql = fs.readFileSync(path.join(__dirname, 'scripts', 'seeders', file), 'utf8');
  await sequelize.query(sql);
};

const setupDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to the database.');

    // Run migrations
    await runMigration('001-create-user-table.sql');
    await runMigration('002-create-os-table.sql');
    await runMigration('003-create-pl-table.sql');
    console.log('Migration complete.');

    // Run seeders
    await runSeeder('001-insert-user.sql');
    await runSeeder('002-insert-os.sql');
    await runSeeder('003-insert-pl.sql');
    console.log('Seeding complete.');

    process.exit(0);
  } catch (error) {
    console.error('Failed to set up the database:', error);
    process.exit(1);
  }
};

setupDb();
