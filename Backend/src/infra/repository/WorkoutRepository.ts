import { Workout } from "../../domain/Workout";
import DatabaseConnection from "../database/DatabaseConnection";

export default interface WorkoutRepository{
    createWorkout(newWorkout: Workout): Promise<void>
    deleteAllWorkouts(): Promise<void>
    getAllWorkouts(userId: string): Promise<Workout[]>
}

export class WorkoutRepositoryDatabase implements WorkoutRepository{
    constructor(readonly databaseConnection: DatabaseConnection){}

    async createWorkout(newWorkout: Workout): Promise<void> {
        await this.databaseConnection.query(
            "INSERT INTO ironjournal.workout (workout_id, user_id, name, description) VALUES ($1, $2, $3, $4)",
            [newWorkout.id, newWorkout.userId, newWorkout.name, newWorkout.description]
        );
    }
    

    async getAllWorkouts(userId: string): Promise<Workout[]> {
        const workoutsData = await this.databaseConnection.query("select * from ironjournal.workout WHERE user_id = $1", [userId]);
        const workouts: Workout[] = [];
        workoutsData.forEach((workoutData: any) => {
            workouts.push(new Workout(workoutData.workout_id, workoutData.user_id, workoutData.name, workoutData.description, []))
        });
        return workouts;
    }


    async deleteAllWorkouts(): Promise<void>{
        return this.databaseConnection.query("delete from ironjournal.workout", []);
    }
}