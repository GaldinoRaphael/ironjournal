import axios from "axios"
import RegisterRepository, { RegisterRepositoryDatabase } from "../src/infra/repository/RegisterRepository";
import DatabaseConnection, { PgPromisseAdapter } from './../src/infra/database/DatabaseConnection';
import Register from './../src/application/useCase/Register';
axios.defaults.validateStatus = () => true;

describe('Register', () => {
    let databaseConnection: PgPromisseAdapter; 
    let registerRepository: RegisterRepository;
    let register: Register;

    beforeEach(()=> {
        databaseConnection = new PgPromisseAdapter();
        registerRepository = new RegisterRepositoryDatabase(databaseConnection);
        register = new Register(registerRepository);
    })

    test('Deve registrar um usuário', async () => {
        const userData = {
            username: 'Raphael Galdino',
            email: 'rapha@mail',
            password: '123456'
        }

        const response = await register.execute(userData);

        expect(response).toBeDefined();
    })

    afterEach(() => {
        databaseConnection.close();
    })
})