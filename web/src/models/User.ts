import { Attributes } from './Attributes';
import { Collection } from './Collection';
import { Eventing } from './Eventing';
import { Model } from './Model';
import { Sync } from './Sync';

export interface UserProps {
  name?: string;
  age?: number;
  id?: number;
}

export class User extends Model<UserProps> {
  static buildUser(attrs: UserProps): User {
    return new User(
      new Attributes(attrs),
      new Eventing(),
      new Sync('http://localhost:3000/users')
    );
  }

  static buildUserCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(
      'http://localhost:3000/users',
      User.buildUser
    );
  }

  setRandomAge(): void {
    const age = Math.round(Math.random() * 100);
    this.set({ age });
  }
}
