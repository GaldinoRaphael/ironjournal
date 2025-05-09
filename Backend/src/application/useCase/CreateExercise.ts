import { Exercise } from "../../domain/Exercise";
import ExerciseRepository from "../../infra/repository/ExerciseRepository";


export default class CreateExercise {
    constructor(readonly exerciseRepository: ExerciseRepository){};

    private exerciseExist(exercises: Exercise[], input: any) {
        return exercises.find(exercise => exercise.name == input.name.toLowerCase());
    }

    async execute(input: any): Promise<Exercise>{;
        const exercises = await this.exerciseRepository.getExercises();
    
        if(this.exerciseExist(exercises, input)) throw new Error("Exercício já cadastrado");

        const exercise = Exercise.create(
            input.name,
        )
    
        await this.exerciseRepository.createExercise(exercise);

        return exercise;
    }
}
