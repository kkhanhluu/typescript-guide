import { Collection } from './models/Collection';
import { User } from './models/User';
import { UserList } from './views/UserList';

const users = new Collection('http://localhost:3000/users', User.buildUser);

users.on('change', () => {
  console.log(users);
  const rootElement = document.getElementById('root');

  if (rootElement) {
    new UserList(rootElement, users).render();
  }
});
users.fetch();
