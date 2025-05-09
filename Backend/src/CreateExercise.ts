
import { ExerciseDAO } from "./ExerciseDAO";
import { Exercise } from "./model/Exercise";

export default class CreateExercise {
    constructor(readonly exerciseDAO: ExerciseDAO){};

    private exerciseExist(exercises: Exercise[], input: any) {
        return exercises.find(exercise => exercise.name == input.name.toLowerCase());
    }

    async execute(input: any): Promise<any>{;
        if(!input.name) throw new Error("Nome inválido");
    
        const exercises = await this.exerciseDAO.getExercises();
    
        if(this.exerciseExist(exercises, input)) throw new Error("Exercício já cadastrado");
        
    
        const id = crypto.randomUUID().slice(0, 4);
    
        const exercise: Exercise = {
            id: id,
            name : input.name.toLowerCase()
        };
    
        await this.exerciseDAO.createExercise(exercise);

        return exercise;
    }
}
