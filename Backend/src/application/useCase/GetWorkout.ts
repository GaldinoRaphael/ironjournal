import { Workout } from "../../domain/Workout";
import WorkoutRepository from "../../infra/repository/WorkoutRepository";

export default class GetWorkout{
    constructor(readonly workoutRepository: WorkoutRepository){}

    async execute(userId: string): Promise<Workout[]>{
        return this.workoutRepository.getAllWorkouts(userId);
    }
}