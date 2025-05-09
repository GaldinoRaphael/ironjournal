import { User } from "./domain/user";


const usersDB = {
    users: require('../users.json'),
}

const bcrypt = require('bcrypt');

export default class Login {

    private userExist(email: string) {
        return usersDB.users.find((user: User) => user.email === email);
    }

    async execute(input: Input) {
        if (!input.email || !input.pwd) throw Error('Usuário e Senha são obrigatórios');

        const foundUser = this.userExist(input.email);

        if (!foundUser) {
            throw Error();
        }

        const match = await bcrypt.compare(input.pwd, foundUser.password);

        if (match) {
            //TO-DO Criar JWT
            return `Usuário ${JSON.stringify(foundUser.username)}! está logado`;
        }
    }

}

type Input = {
    username: string,
    email: string,
    pwd: string,
}