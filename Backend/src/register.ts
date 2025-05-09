import { User } from "./model/user";
import RegisterDAO from "./RegisterDAO";


const bcrypt = require('bcrypt');

export default class Register {
    constructor(readonly registerDAO: RegisterDAO){}

    private isValidInput(username: string, email: string, pwd: string) {
        return username && email && pwd;
    }

    private isValidEmail(email: string) {
        return email.match(/^(.+)\@(.+)$/);
    }

    private async isDuplicatedUser(input: any) {
        const users = await this.registerDAO.getUsers();
        return users.find((person: any) => person.email === input.email);
    }

    async execute(input: any) {
        if (!this.isValidInput(input.username, input.email, input.pwd)) throw ('Nome, Email e Senha são obrigatórios');
        if (!this.isValidEmail(input.email)) throw ('E-mail inválido');

        const duplicated = await this.isDuplicatedUser(input);

        if (duplicated) return Error();

        const hashedPwd = await bcrypt.hash(input.pwd, 10);

        const newUser: User = { 'username': input.username, 'email': input.email, 'password': hashedPwd };
        
        await this.registerDAO.saveUser(newUser);
        
        return `Novo usuário ${input.username} criado!`;
    }

}


