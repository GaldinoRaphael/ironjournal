import axios from "axios"
import { PgPromisseAdapter } from "../src/infra/database/DatabaseConnection";
import RegisterRepository, { RegisterRepositoryDatabase } from "../src/infra/repository/RegisterRepository";
import Register from "../src/application/useCase/Register";
import Login from "../src/application/useCase/Login";

axios.defaults.validateStatus = () => true;

describe('Login', () => {

    let databaseConnection: PgPromisseAdapter;
    let registerRepository: RegisterRepository;
    let register: Register;
    let login: Login;

    beforeEach(async () => {
        databaseConnection = new PgPromisseAdapter();
        registerRepository = new RegisterRepositoryDatabase(databaseConnection);
        await registerRepository.deleteAllUsers();
        register = new Register(registerRepository);
        login = new Login(registerRepository);
    })


    test('Deve realizar o login', async () => {
        const userData = {
            username: 'Raphael Galdino',
            email: 'rapha2@mail',
            password: '123456'
        }

        await register.execute(userData);

        const response = await login.execute(userData);

        expect(response).toBeDefined();
    })

    test('Não deve realizar o login com credenciais inválidas', async () => {
        const userData = {
            email: 'afsdasdf@mail',
            password: '123adfadf123',
            username: ''
        }

        expect(login.execute(userData)).rejects.toThrow('Usuário não encontrado');
    })

    
    afterEach(() => {
        databaseConnection.close();
    })
})