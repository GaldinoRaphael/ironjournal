import CreateWorkout from "../src/application/useCase/CreateWorkout";
import GetWorkout from "../src/application/useCase/GetWorkout";
import Register from "../src/application/useCase/Register";
import User from "../src/domain/User";
import { Workout } from "../src/domain/Workout";
import RegisterRepository, { RegisterRepositoryDatabase } from "../src/infra/repository/RegisterRepository";
import WorkoutRepository, { WorkoutRepositoryDatabase } from "../src/infra/repository/WorkoutRepository";
import DatabaseConnection, { PgPromisseAdapter } from './../src/infra/database/DatabaseConnection';

describe(('Treino'), () => {

    let createWorkout: CreateWorkout;
    let workoutRepository: WorkoutRepository;
    let databaseConnection: DatabaseConnection;
    let registerRepository: RegisterRepository;
    let register: Register;
    let registerResponse: User;
    let getWorkout: GetWorkout;

    beforeEach(async () => {
        databaseConnection = new PgPromisseAdapter();
        workoutRepository = new WorkoutRepositoryDatabase(databaseConnection);
        await workoutRepository.deleteAllWorkouts();
        createWorkout = new CreateWorkout(workoutRepository);
        registerRepository = new RegisterRepositoryDatabase(databaseConnection);
        await registerRepository.deleteAllUsers();
        register = new Register(registerRepository);
        getWorkout = new GetWorkout(workoutRepository);

        const userData = {
            username: 'Raphael Galdino',
            email: 'rapha@mail',
            password: '123456'
        }

        
        registerResponse = await register.execute(userData);
    
        if(!registerResponse) throw new Error('Usuário não foi cadastrado');

    })

    test('Deve criar de treino', async () => {
        const workout = Workout.create(
            registerResponse.id,
            'Strong lift - A',
            'Com terra',
            []
        )
    
        const response  = await createWorkout.execute(workout);
    
        expect(response.id).toBeDefined();
        expect(response.name).toBe('Strong lift - A');
        expect(response.description).toBe('Com terra')
    })

    test('Deve buscar os treinos do usuário', async () => {
        const workout = Workout.create(
            registerResponse.id,
            'Strong lift - A',
            'Com terra',
            []
        )
    
        await createWorkout.execute(workout);

        const response = await getWorkout.execute(registerResponse.id);
        
        expect(response[0].id).toBeDefined();
        expect(response[0].name).toBe('Strong lift - A');
        expect(response[0].description).toBe('Com terra');
        expect(response[0].workoutSet).toBeDefined();
    })

    
    afterEach(() => {
        databaseConnection.close();
    })
})
