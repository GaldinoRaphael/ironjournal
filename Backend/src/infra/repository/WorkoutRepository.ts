import { Exercise } from "../../domain/Exercise";
import { Workout, WorkoutSet } from "../../domain/Workout";
import { WorkoutsResponse } from "../../interfaces/dtos/WorkoutsResponse";
import DatabaseConnection from "../database/DatabaseConnection";

export default interface WorkoutRepository {
  createWorkout(newWorkout: Workout): Promise<void>
  deleteAllWorkouts(): Promise<void>
  getAllWorkouts(userId: string): Promise<Workout[]> 
  getWorkoutById(userId: string, workoutId: string): Promise<Workout>
}

export class WorkoutRepositoryDatabase implements WorkoutRepository {
  constructor(readonly databaseConnection: DatabaseConnection) { }

  async createWorkout(newWorkout: Workout): Promise<void> {
    await this.databaseConnection.query(
      `
          INSERT INTO ironjournal.workout (workout_id, user_id, name, description)
          VALUES ($1, $2, $3, $4)
          `,
      [newWorkout.id, newWorkout.userId, newWorkout.name, newWorkout.description]
    );

    await Promise.all(
      newWorkout.workoutSets.map(workoutSet =>
        this.createWorkoutSet(workoutSet, newWorkout.id)
      )
    );
  }


  private createWorkoutSet(workoutSet: WorkoutSet, workoutId: string): Promise<WorkoutSet> {
    return this.databaseConnection.query(
      `
              INSERT INTO ironjournal.workout_set
              (workout_set_id, workout_id, exercise_id, load, reps, type)
              VALUES ($1, $2, $3, $4, $5, $6)
              `,
      [
        workoutSet.id,
        workoutId,
        workoutSet.exercise.id,
        workoutSet.load,
        workoutSet.reps,
        workoutSet.type,
      ]
    );
  }

  async getWorkoutById(userId: string, workoutId: string): Promise<Workout> {
    const workoutsData = await this.databaseConnection.query(
      `
              SELECT
                  w.workout_id,
                  w.user_id,
                  w.name AS workout_name,
                  w.description,
                  ws.workout_set_id,
                  ws.reps,
                  ws.load,
                  ws.type,
                  e.exercise_id,
                  e.name AS exercise_name 
              FROM ironjournal.workout w
              JOIN ironjournal.workout_set ws
                ON ws.workout_id = w.workout_id
              JOIN ironjournal.exercise e
                ON e.exercise_id = ws.exercise_id
              WHERE w.user_id = $1 AND w.workout_id = $2
            `,
      [userId, workoutId]
    );

    if (!workoutsData.length) throw new Error('Não foi encontrado um treino para esse ID');
    
    const firstWorkoutData = workoutsData[0];
    const workout = new Workout(firstWorkoutData.workout_id, firstWorkoutData.user_id, firstWorkoutData.workout_name, firstWorkoutData.description, []);

    for (const workoutData of workoutsData) {
      const exercise = new Exercise(workoutData.exercise_id, workoutData.exercise_name);
      const workoutSet = new WorkoutSet(
        workoutData.id,
        exercise,
        workoutData.load,
        workoutData.reps,
        workoutData.type,
      )

      workout.workoutSets.push(workoutSet);
    }

    return workout;
  }

  async getAllWorkouts(userId: string): Promise<Workout[]> {
    const workoutsData = await this.databaseConnection.query("SELECT * FROM ironjournal.workout WHERE user_id = $1", [userId]);
    const workout: Workout[] = [];

    for(const workoutData of workoutsData){
      workout.push(new Workout(workoutData.workout_id, workoutData.user_id, workoutData.name, workoutData.description, []));
    }

    return workout;
  }


  async deleteAllWorkouts(): Promise<void> {
    return this.databaseConnection.query("DELETE FROM ironjournal.workout", []);
  }
}