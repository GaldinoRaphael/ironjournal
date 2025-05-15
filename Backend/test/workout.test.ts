import CreateExercise from "../src/application/useCase/CreateExercise";
import CreateWorkout from "../src/application/useCase/CreateWorkout";
import GetAllWorkouts from "../src/application/useCase/GetAllWorkouts";
import GetWorkout from "../src/application/useCase/GetWorkout";
import Register from "../src/application/useCase/Register";
import { Exercise } from "../src/domain/Exercise";
import User from "../src/domain/User";
import { Workout, WorkoutSet } from "../src/domain/Workout";
import ExerciseRepository, { ExerciseRepositoryDatabase } from "../src/infra/repository/ExerciseRepository";
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
    let exerciseRepository: ExerciseRepository;
    let createExercise: CreateExercise;
    let getAllWorkouts: GetAllWorkouts;

    beforeEach(async () => {
        databaseConnection = new PgPromisseAdapter();
        workoutRepository = new WorkoutRepositoryDatabase(databaseConnection);
        registerRepository = new RegisterRepositoryDatabase(databaseConnection);
        exerciseRepository = new ExerciseRepositoryDatabase(databaseConnection);

        await workoutRepository.deleteAllWorkouts();
        await registerRepository.deleteAllUsers();
        await exerciseRepository.deleteAll();

        createWorkout = new CreateWorkout(workoutRepository);
        register = new Register(registerRepository);
        getWorkout = new GetWorkout(workoutRepository);
        createExercise = new CreateExercise(exerciseRepository);
        getAllWorkouts = new GetAllWorkouts(workoutRepository);

        const userData = {
            username: 'Raphael Galdino',
            email: 'rapha@mail',
            password: '123456'
        }

        
        registerResponse = await register.execute(userData);
    
        if(!registerResponse) throw new Error('Usuário não foi cadastrado');

    })
    test('Deve criar um treino contendo multiplos exercícios', async () => {
        const exercisesNames = ['Supino', 'Agachamento', 'Levantamento Terra'];

        const exercises = await Promise.all(
            exercisesNames.map(name => createExercise.execute(name))
        );
        

        const workout = Workout.create(
            registerResponse.id,
            'Strong lift - A',
            'Com terra',
            [
                WorkoutSet.create(exercises[0], 10, 8, 'Superiores'),
                WorkoutSet.create(exercises[1], 10, 8, 'Superiores'),
                WorkoutSet.create(exercises[2], 10, 8, 'Superiores'),
            ]
        )

        const newWorkout = await createWorkout.execute(workout);

        const response = await getWorkout.execute(registerResponse.id, newWorkout.id);
        
        expect(response.id).toBeDefined();
        expect(response.name).toBe('Strong lift - A');
        expect(response.description).toBe('Com terra');
        expect(response.workoutSets).toBeDefined();
        const exerciseNames = response.workoutSets.map(set => set.exercise.name);

        expect(exerciseNames).toEqual(
          expect.arrayContaining(['Supino', 'Agachamento', 'Levantamento Terra'])
        );
    })

    test('Deve retornar todos os treinos de um usuário', async () => {

        const workout1 = Workout.create(
            registerResponse.id,
            'Strong lift - A',
            '',
            []
        )
        const workout2 = Workout.create(
            registerResponse.id,
            'Strong lift - B',
            '',
            []
        )
        const workout3 = Workout.create(
            registerResponse.id,
            'Strong lift - C',
            '',
            []
        )


        await createWorkout.execute(workout1);
        await createWorkout.execute(workout2);
        await createWorkout.execute(workout3);

        const response = await getAllWorkouts.execute(registerResponse.id);

        const workoutNames = response.workouts.map((workout) => workout.name);

        expect(workoutNames).toEqual(
            expect.arrayContaining(['Strong lift - A', 'Strong lift - B', 'Strong lift - C'])
        )
        
        expect(response.workouts[0].id).toBeDefined();
        expect(response.workouts[1].id).toBeDefined();
        expect(response.workouts[2].id).toBeDefined();
    })

    afterEach(() => {
        databaseConnection.close();
    })
})
