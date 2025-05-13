import { Exercise } from "./Exercise"

export class WorkoutSet {
    constructor(
        readonly id: string,
        readonly exercise: Exercise,
        readonly weight: number,
        readonly reps: number,
        readonly type: string,
    ) { }

    static create(
        exercise: Exercise,
        weight: number,
        reps: number,
        type: string
    ) {
        const workoutSetId = crypto.randomUUID();
        return new WorkoutSet(workoutSetId, exercise, weight, reps, type);
    }
}

export class Workout {
    constructor(
        readonly id: string,
        readonly userId: string,
        readonly name: string,
        readonly description: string,
        readonly workoutSet: WorkoutSet[],
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