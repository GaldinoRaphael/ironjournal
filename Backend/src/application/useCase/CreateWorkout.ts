
import { Workout } from "../../domain/Workout";
import WorkoutRepository from "../../infra/repository/WorkoutRepository";

export default class CreateWorkout{
    constructor(readonly workoutRepository: WorkoutRepository){}

    async execute(input: any){
        const workout = Workout.create(input.userId, input.name, input.description, input.workoutSets);
        await this.workoutRepository.createWorkout(workout);
        return workout;
    }
}