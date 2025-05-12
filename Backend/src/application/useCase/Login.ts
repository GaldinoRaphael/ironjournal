
import User from "../../domain/User";
import RegisterRepository from "../../infra/repository/RegisterRepository";

const bcrypt = require('bcrypt');

export default class Login {

    constructor(readonly registerRepository: RegisterRepository){}

    private async userExist(email: string) {
        const user = await this.registerRepository.findUserByEmail(email);
        return user;
    }

    async execute(input: Input) {
        if (!input.email || !input.password) throw Error('Usuário e Senha são obrigatórios');

        const foundUser = await this.userExist(input.email);

        if (!foundUser) throw Error();

        const match = await bcrypt.compare(input.password, foundUser.password);

        if (match) {
            //TO-DO Criar JWT
            return `Usuário ${JSON.stringify(foundUser.username)}! está logado`;
        }
    }

}

type Input = {
    username: string,
    email: string,
    password: string,
}