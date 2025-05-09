export default class User {
    constructor(
        public id: string,
        public username: string,
        public password: string,
        public email: string,
    ) {
        if (!this.isValidInput(username, email, password)) throw ('Nome, Email e Senha são obrigatórios');
        if (!this.isValidEmail(email)) throw ('E-mail inválido');
     }

    static create(
        username: string,
        password: string,
        email: string,
    ){
        const userId = crypto.randomUUID();
        return new User(userId, username, password, email)
    }

    
    isValidInput(username: string, email: string, pwd: string) {
        return username && email && pwd;
    }

    isValidEmail(email: string) {
        return email.match(/^(.+)\@(.+)$/);
    }
}