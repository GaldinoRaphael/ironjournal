import { User } from "./model/user";

const usersDB = {
    users: require('../users.json'),
}

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

export const handleLogin = async (req: any, res: any) => {
    const { username, pwd } = req.body;

    if (!username || !pwd) return res.status(400).json({ 'message': 'Usuário e Senha são obrigatórios' });

    try {
        const foundUser: User = usersDB.users.find((user: User) => user.username === username);
        console.log('found user', foundUser)
        console.log('__________')
        if(!foundUser){
            return res.sendStatus(401);
        }
        const match = await bcrypt.compare(pwd, foundUser.password);

        if(match){
            //TO-DO Criar JWT
            return res.json({'success': `Usurário ${JSON.stringify(username)}! está logado`})
        }

        return res.sendStatus(401);
        
    } catch (err: any) {
        res.sendStatus(500).json({ 'message': err.message })
    }
}

