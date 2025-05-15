import { Workout } from "../../domain/Workout";
import WorkoutRepository from "../../infra/repository/WorkoutRepository";
import { WorkoutsResponse } from "../../interfaces/dtos/WorkoutsResponse";

export default class GetAllWorkouts {
    constructor(readonly workoutRepository: WorkoutRepository) { }

    async execute(userId: string): Promise<WorkoutsResponse> {
        const workoutsResponse: WorkoutsResponse = {
            workouts: (await this.workoutRepository.getAllWorkouts(userId)).map(workout => ({
                id: workout.id,
                name: workout.name
            }))
        };
        
        return workoutsResponse;
    }
}