import { User } from '../../src/users/users.entitiy';
import { Languages } from '../lang/lang.entity';
import { SeederEntity } from './seeders.entity';

export const entitiesObject = {
  User,
  SeederEntity,
};
export default [User, SeederEntity, Languages];
