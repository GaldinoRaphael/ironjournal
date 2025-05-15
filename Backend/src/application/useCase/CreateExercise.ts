import { Exercise } from "../../domain/Exercise";
import ExerciseRepository from "../../infra/repository/ExerciseRepository";


export default class CreateExercise {
    constructor(readonly exerciseRepository: ExerciseRepository){};

    private exerciseExist(exercises: Exercise[], name: string) {
        return exercises.find(exercise => exercise.name.toLowerCase() == name.toLowerCase());
    }

    async execute(name: string): Promise<Exercise>{;
        const exercises = await this.exerciseRepository.getExercises();
    
        if(this.exerciseExist(exercises, name)) throw new Error("Exercício já cadastrado");

        const exercise = Exercise.create(name);
    
        await this.exerciseRepository.createExercise(exercise);

        return exercise;
    }
}
