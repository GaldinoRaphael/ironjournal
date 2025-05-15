import axios from "axios"
import RegisterRepository, { RegisterRepositoryDatabase } from "../src/infra/repository/RegisterRepository";
import DatabaseConnection, { PgPromisseAdapter } from './../src/infra/database/DatabaseConnection';
import Register from './../src/application/useCase/Register';
axios.defaults.validateStatus = () => true;

describe('Register', () => {
    let databaseConnection: PgPromisseAdapter; 
    let registerRepository: RegisterRepository;
    let register: Register;

    beforeEach(async ()=> {
        databaseConnection = new PgPromisseAdapter();
        registerRepository = new RegisterRepositoryDatabase(databaseConnection);
        await registerRepository.deleteAllUsers();
        register = new Register(registerRepository);
    })

    test('Deve registrar um usuário', async () => {
        const userData = {
            username: 'Raphael Galdino',
            email: 'rapha123@mail',
            password: '123456'
        }

        const response = await register.execute(userData);

        expect(response).toBeDefined();
    })

    afterEach(() => {
        databaseConnection.close();
    })
})