import axios from "axios"

axios.defaults.validateStatus = () => true;

test('Deve realizar o login', async () => {
    const userData = {
        username: 'raphael2',
        pwd: '123456'
    }

    const response = await axios.post('http://localhost:3000/login', userData);

    expect(response.status).toBe(200);
})

test('Não deve realizar o login com credenciais inválidas', async () => {
    const userData = {
        username: 'afsdasdf',
        pwd: '123adfadf123'
    }

    const response = await axios.post('http://localhost:3000/login', userData);

    expect(response.status).toBe(401);
})