import { User } from './user.interface';

export class UserModel implements User {
  id: string;
  title: "mr" | "ms" | "mrs" | "miss" | "dr" | "";
  firstName: string;
  lastName: string;
  picture: string;

  constructor(user: User) {
    this.id = user.id;
    this.title = user.title;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.picture = user.picture;
  }
}
