import axios from "axios"

axios.defaults.validateStatus = () => true;

describe('Register', () => {
    test('Deve registrar um usuário', async () => {
        const userData = {
            username: 'Raphael Galdino',
            email: 'rapha@mail',
            pwd: '123456'
        }

        const response = await axios.post('http://localhost:3000/register', userData);

        expect(response.status).toBe(200);
    })
})