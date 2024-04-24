import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from 'src/users/users.entitiy';
import { SeederEntity } from '../seeders.entity';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    console.log('holaaaa');

    const seederRepository = dataSource.getRepository(SeederEntity);
    const seederName = 'UserSeeder';

    const seeder = await seederRepository.findOne({
      where: { name: seederName },
    });

    if (seeder && seeder.executed) {
      console.log(`Seeder "${seederName}" already executed. Skipping...`);
      return;
    }

    const repository = dataSource.getRepository(User);
    await repository.insert([
      {
        fullName: 'luiggy macias',
        email: 'ferrinluiggy@gmail.com',
        password: '123456',
        phone: '123456789',
        idNumber: '1234567890',
      },
    ]);

    // ---------------------------------------------------

    const userFactory = await factoryManager.get(User);
    // save 1 factory generated entity, to the database
    await userFactory.save();

    // save 5 factory generated entities, to the database
    await userFactory.saveMany(5);

    if (seeder) {
      seeder.executed = true;
    } else {
      const newSeeder = new SeederEntity();
      newSeeder.name = seederName;
      newSeeder.executed = true;
      await seederRepository.save(newSeeder);
    }

    console.log(`Seeder "${seederName}" executed successfully.`);
  }
}
