import axios from "axios"
import DatabaseConnection, { PgPromisseAdapter } from "../src/infra/database/DatabaseConnection";
import CreateExercise from "../src/application/useCase/CreateExercise";
import ExerciseRepository, { ExerciseRepositoryDatabase } from "../src/infra/repository/ExerciseRepository";

axios.defaults.validateStatus = () => true;

describe('Exercícios', () => {
    let databaseConnection: DatabaseConnection;
    let exerciseRepository: ExerciseRepository;
    let createExercise: CreateExercise;

    beforeEach(async () => {
        databaseConnection = new PgPromisseAdapter();
        exerciseRepository = new ExerciseRepositoryDatabase(databaseConnection);
        await exerciseRepository.deleteAll();
        createExercise = new CreateExercise(exerciseRepository);
    });

    test('Deve criar um exercício', async () =>{
        const response = await createExercise.execute('Remada Curvada');

        expect(response.name).toBeDefined();
        expect(response.id).toBeDefined();
    })

    
    test('Não deve criar um exercício duplicado', async () =>{
        await createExercise.execute('Agachamento');

        expect(createExercise.execute('Agachamento')).rejects.toThrow('Exercício já cadastrado');
    })

    afterEach(async () => {
        databaseConnection.close()
    })
})