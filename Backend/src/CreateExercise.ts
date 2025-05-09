
import ExerciseDAO from "./ExerciseDAO";
import { Exercise } from "./domain/Exercise";

export default class CreateExercise {
    constructor(readonly exerciseDAO: ExerciseDAO){};

    private exerciseExist(exercises: Exercise[], input: any) {
        return exercises.find(exercise => exercise.name == input.name.toLowerCase());
    }

    async execute(input: any): Promise<any>{;
        const exercises = await this.exerciseDAO.getExercises();
    
        if(this.exerciseExist(exercises, input)) throw new Error("Exercício já cadastrado");

        const exercise = Exercise.create(
            input.name,
        )
    
        await this.exerciseDAO.createExercise(exercise);

        return exercise;
    }
}
