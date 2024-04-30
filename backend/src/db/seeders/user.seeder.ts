import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { SeederEntity } from '../seeders.entity';
import { Languages } from '../../lang/lang.entity';
import { User } from '../../users/users.entitiy';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    console.log('holaaaa');

    const seederRepository = dataSource.getRepository(SeederEntity);
    const languageRepository = dataSource.getRepository(Languages);
    const seederName = 'UserSeeder';

    const seeder = await seederRepository.findOne({
      where: { name: seederName },
    });

    if (seeder && seeder.executed) {
      console.log(`Seeder "${seederName}" already executed. Skipping...`);
      return;
    }

    // get the language id for english
    const english = await languageRepository.findOne({ where: { code: 'en' } });
    const englishId = english ? english.id : null;
    const repository = dataSource.getRepository(User);
    await repository.insert([
      {
        fullName: 'luiggy macias',
        email: 'ferrinluiggy@gmail.com',
        password: '123456',
        phone: '123456789',
        createdAt: new Date(),
        updatedAt: new Date(),
        username: 'macluiggy',
        preferredLanguageId: englishId,
      },
    ]);

    // ---------------------------------------------------

    const userFactory = factoryManager.get(User);
    userFactory.setMeta({
      preferredLanguageId: englishId,
    });
    // save 1 factory generated entity, to the database
    await userFactory.save({
      preferredLanguageId: englishId,
    });

    // save 5 factory generated entities, to the database
    await userFactory.saveMany(5, {
      preferredLanguageId: englishId,
    });

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
