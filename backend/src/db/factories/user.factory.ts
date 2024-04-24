import { setSeederFactory } from 'typeorm-extension';
import { entitiesObject } from '../entities';
const { User } = entitiesObject;

export default setSeederFactory(User, (faker) => {
  const user = new User();
  user.fullName = faker.person.fullName();
  user.email = faker.internet.email(user.fullName);
  user.password = faker.internet.password();
  user.phone = faker.phone.number();
  user.idNumber = faker.string.numeric(10);

  return user;
});
