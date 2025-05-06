import { User } from "./model/user";

const usersDB = {
    users: require('../users.json'),
}

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

export const handleLogin = async (req: any, res: any) => {
    const { email, pwd } = req.body;

    if (!email || !pwd) return res.status(400).json({ 'message': 'Usuário e Senha são obrigatórios' });

    try {
        const foundUser: User = usersDB.users.find((user: User) => user.email === email);

        if(!foundUser){
            return res.sendStatus(401);
        }
        const match = await bcrypt.compare(pwd, foundUser.password);

        if(match){
            //TO-DO Criar JWT
            return res.json({'success': `Usurário ${JSON.stringify(foundUser.username)}! está logado`})
        }

        return res.sendStatus(401);
        
    } catch (err: any) {
        res.sendStatus(500).json({ 'message': err.message })
    }
}

