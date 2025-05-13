import User from "../../domain/User";
import DatabaseConnection from "../database/DatabaseConnection";

// const fsPromises = require('fs').promises;
// const path = require('path');

// const usersDB = {
//     exercises: require('../../../exercises.json'),
//     setUsers: function (data: User[]) { this.users = data; },
// }

export default interface RegisterRepository {
    saveUser(newUser: User): Promise<void>;
    getUsers(): Promise<User[]>;
    findUserByEmail(email: string): Promise<User>;
    deleteAllUsers(): Promise<void>;
}

// export class RegisterRepositoryMemory implements RegisterRepository {
//     async saveUser(newUser: User) {
//         usersDB.setUsers([...usersDB.users, newUser]);
//         await fsPromises.writeFile(
//             path.join(__dirname, '..', 'users.json'),
//             JSON.stringify(usersDB.users)
//         );
//     }

//     async getUsers(): Promise<User[]>{
//         return usersDB.users;
//     }
// }

export class RegisterRepositoryDatabase implements RegisterRepository{
    constructor(readonly databaseConnection: DatabaseConnection){
    }

    async findUserByEmail(email: string): Promise<User> {
        const [userData] = await this.databaseConnection.query("select * FROM ironjournal.user WHERE email = $1", [email]);

        if(!userData){
            throw new Error('Usuário não encontrado');
        }

        return new User(userData.user_id, userData.name, userData.password, userData.email);
    }
    
    async saveUser(newUser: User): Promise<void> {
        await this.databaseConnection.query(
            'INSERT INTO ironjournal."user" (user_id, name, password, email) VALUES ($1, $2, $3, $4)',
            [newUser.id, newUser.username, newUser.password, newUser.email]
          );          
    }

    async getUsers(): Promise<User[]> {
        const usersData = await this.databaseConnection.query("select * FROM ironjournal.user", []);
        let users: User[] = [];

        [...usersData].forEach(userData => users.push(new User(userData.user_id, userData.name, userData.password, userData.email)));

        return users;
    }

    async deleteAllUsers(): Promise<void>{
        return this.databaseConnection.query("delete from ironjournal.user", []);
    }

}