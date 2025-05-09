import axios from "axios"

axios.defaults.validateStatus = () => true;

describe('Exercícios', () => {
    test('Deve criar um exercício', async () =>{
        const exercise = {
            name: 'Supino'
        }

        const response = await axios.post('http://localhost:3000/exercise', exercise);

        expect(response.status).toBe(200);
    })

    
    test('Não deve criar um exercício duplicado', async () =>{
        const exercise = {
            name: 'Supino'
        }

        const response = await axios.post('http://localhost:3000/exercise', exercise);

        expect(response.status).toBe(422);
        expect(response.data.error).toBe('Exercício já cadastrado');
    })
})