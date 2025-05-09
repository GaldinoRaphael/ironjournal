import { User } from "./domain/user";
import RegisterDAO from "./RegisterDAO";


const bcrypt = require('bcrypt');

export default class Register {
    constructor(readonly registerDAO: RegisterDAO){}

    private async isDuplicatedUser(input: any) {
        const users = await this.registerDAO.getUsers();
        return users.find((person: any) => person.email === input.email);
    }

    async execute(input: any) {
        const duplicated = await this.isDuplicatedUser(input);

        if (duplicated) return Error();

        const hashedPwd = await bcrypt.hash(input.pwd, 10);

        const newUser = User.create(input.username, hashedPwd, input.email);
        
        await this.registerDAO.saveUser(newUser);
        
        return `Novo usuário ${input.username} criado!`;
    }

}


