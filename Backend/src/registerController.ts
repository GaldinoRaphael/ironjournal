import { User } from "./model/user";

const usersDB = {
    users: require('../users.json'),
    setUsers: function (data: User[]) { this.users = data; },
}

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

export const handleNewUser = async (req: any, res: any) => {
    const { username, pwd } = req.body;

    if (!username || !pwd) return res.status(400).json({ 'message': 'Usuário e Senha são obrigatórios' });

    const duplicate = usersDB.users.find((person: any) => person.username === username);

    if (duplicate) return res.sendStatus(409);

    try {
        //encripta a senha
        const hashedPwd = await bcrypt.hash(pwd, 10);
        //store the new user
        const newUser: User = { 'username': username, 'password': hashedPwd };
        usersDB.setUsers([...usersDB.users, newUser]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'users.json'),
            JSON.stringify(usersDB.users)
        );
        console.log(usersDB.users);
        res.status(201).json({'success': `Novo usuário ${username} criado!`})
    } catch (err: any) {
        res.status(500).json({ 'message': err.message })
    }
}

