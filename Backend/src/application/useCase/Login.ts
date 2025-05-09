
import User from "../../domain/User";
import RegisterRepository from "../../RegisterDAO";

const bcrypt = require('bcrypt');

export default class Login {

    constructor(readonly registerDAO: RegisterRepository){}

    private async userExist(email: string) {
        const users = await this.registerDAO.getUsers();
        return users.find((user: User) => user.email === email);
    }

    async execute(input: Input) {
        if (!input.email || !input.pwd) throw Error('Usuário e Senha são obrigatórios');

        const foundUser = await this.userExist(input.email);

        if (!foundUser) throw Error();

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