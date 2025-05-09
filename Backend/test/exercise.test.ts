import axios from "axios"
import DatabaseConnection, { PgPromisseAdapter } from "../src/infra/database/DatabaseConnection";
import CreateExercise from "../src/application/useCase/CreateExercise";
import ExerciseRepository, { ExerciseRepositoryDatabase } from "../src/infra/repository/ExerciseRepository";

axios.defaults.validateStatus = () => true;

describe('Exercícios', () => {
    let databaseConnection: DatabaseConnection;
    let exerciseRepository: ExerciseRepository;
    let createExercise: CreateExercise;

    beforeEach(() => {
        databaseConnection = new PgPromisseAdapter();
        exerciseRepository = new ExerciseRepositoryDatabase(databaseConnection);
        exerciseRepository.deleteAll();
        createExercise = new CreateExercise(exerciseRepository);
    });

    test('Deve criar um exercício', async () =>{
        const exercise = {
            name: 'Supino'
        }

        const response = await createExercise.execute(exercise);

        expect(response.name).toBeDefined();
        expect(response.id).toBeDefined();
    })

    
    test('Não deve criar um exercício duplicado', async () =>{
        const exercise = {
            name: 'Agachamento'
        }

        await createExercise.execute(exercise);

        expect(createExercise.execute(exercise)).rejects.toThrow('Exercício já cadastrado');
    })

    afterEach(async () => {
        databaseConnection.close()
    })
})