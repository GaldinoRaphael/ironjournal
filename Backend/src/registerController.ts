import { User } from "./model/user";

const usersDB = {
    users: require('../users.json'),
    setUsers: function (data: User[]) { this.users = data; },
}

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');


export const handleNewUser = async (req: any, res: any) => {
    const { username, email, pwd } = req.body;

    if (!isValidInput(username, email, pwd)) return res.status(400).json({ 'message': 'Usuário, Email e Senha são obrigatórios' });
    if(!isValidEmail(email)) return res.status(422).json({ 'message': 'Usuário e Senha são obrigatórios' });
    
    const duplicate = usersDB.users.find((person: any) => person.email === email);

    if (duplicate) return res.sendStatus(409);

    try {
        const hashedPwd = await bcrypt.hash(pwd, 10);

        const newUser: User = { 'username': username, 'email': email, 'password': hashedPwd };
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

function isValidInput(username: string, email: string, pwd: string) {
    return username && email && pwd;
}

function isValidEmail(email: string) {  
    return email.match(/^(.+)\@(.+)$/);
}
