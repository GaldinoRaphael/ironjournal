import { generateUUID } from "../utils/uuid";
import { WorkoutSet } from "./workoutSet";

export class Exercise {
    id: string;
    done: boolean = false;

    constructor(public name: string, public workoutSets: WorkoutSet[]) {
        this.id = generateUUID().substring(2, 15);
        this.name = name;
        this.workoutSets = workoutSets;
    }

    toggleDone() {
        this.done = !this.done;
    }

    checkExerciseDone() {
        const workoutSetsDone = this.checkAllWorkoutSetDone();
        
        if(workoutSetsDone) {
            this.done = true;
        }
    }

    private checkAllWorkoutSetDone() {
        return this.workoutSets.every((workoutSet) => workoutSet.workoutSetDone());
    }
}