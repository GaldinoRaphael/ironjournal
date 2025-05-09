import { User } from "./domain/user";

const fsPromises = require('fs').promises;
const path = require('path');

const usersDB = {
    users: require('../users.json'),
    setUsers: function (data: User[]) { this.users = data; },
}

export default interface RegisterDAO {
    saveUser(newUser: User): Promise<void>;
    getUsers(): Promise<User[]>;
}

export class RegisterDAODatabase implements RegisterDAO {
    async saveUser(newUser: User) {
        usersDB.setUsers([...usersDB.users, newUser]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'users.json'),
            JSON.stringify(usersDB.users)
        );
    }

    async getUsers(): Promise<User[]>{
        return usersDB.users;
    }
}