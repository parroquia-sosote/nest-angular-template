import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';
import entities from './src/db/entities';
// import { SeederOptions } from 'typeorm-extension';

const migrationsPath = path.join(process.cwd(), 'src/db/migrations/*{.ts}');

const typeOrmConfig: TypeOrmModuleOptions =
  // & SeederOptions
  {
    type: 'postgres',
    host: process.env.DB_HOST || 'db', // docker-compose service name, in this case, the name of the service is db
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'postgres',
    username: process.env.DB_USER || 'postgres',
    migrations: [migrationsPath],
    entities,
    // synchronize: true,
    // seeds: ['serc/db/seeds/**/*{.ts}'],
    // factories: ['src/db/factories/**/*{.ts}'],
  };

export default typeOrmConfig;
