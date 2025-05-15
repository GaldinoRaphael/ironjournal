import { Exercise } from "./Exercise"

export class WorkoutSet {
    constructor(
        readonly id: string,
        readonly exercise: Exercise,
        readonly load: number,
        readonly reps: number,
        readonly type: string,
    ) { }

    static create(
        exercise: Exercise,
        load: number,
        reps: number,
        type: string
    ) {
        const workoutSetId = crypto.randomUUID();
        return new WorkoutSet(workoutSetId, exercise, load, reps, type);
    }
}

export class Workout {
    constructor(
        readonly id: string,
        readonly userId: string,
        readonly name: string,
        readonly description: string,
        readonly workoutSets: WorkoutSet[],
    ) { }

    static create(
        userId: string,
        name: string,
        description: string,
        workoutSets: WorkoutSet[]) {
        const workoutId = crypto.randomUUID();
        return new Workout(workoutId, userId, name, description, workoutSets)
    }
}