import User from "../../domain/User";
import RegisterRepository from "../../infra/repository/RegisterRepository";

const bcrypt = require('bcrypt');

export default class Register {
    constructor(private readonly registerRepository: RegisterRepository){}

    private async isDuplicatedUser(input: any) {
        const users = await this.registerRepository.getUsers();
        return users.find((person: any) => person.email === input.email);
    }

    async execute(input: Input): Promise<User> {
        const duplicated = await this.isDuplicatedUser(input);

        if (duplicated) throw new Error();

        const hashedPwd = await bcrypt.hash(input.password, 10);

        const newUser = User.create(input.username, hashedPwd, input.email);
        
        await this.registerRepository.saveUser(newUser);
        
        return newUser;
    }

}

type Input = {
    username: string,
    password: string,
    email: string
}