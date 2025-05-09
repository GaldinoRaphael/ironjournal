import axios from "axios"

axios.defaults.validateStatus = () => true;

describe('Login', () => {
    test('Deve realizar o login', async () => {
        const userData = {
            username: 'Raphael Galdino',
            email: 'rapha@mail',
            pwd: '123456'
        }

        await axios.post('http://localhost:3000/register', userData);

        const response = await axios.post('http://localhost:3000/login', userData);

        expect(response.status).toBe(200);
    })

    test('Não deve realizar o login com credenciais inválidas', async () => {
        const userData = {
            email: 'afsdasdf@mail',
            pwd: '123adfadf123'
        }

        const response = await axios.post('http://localhost:3000/login', userData);

        expect(response.status).toBe(422);
    })
})