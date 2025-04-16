import { generateUUID } from "../utils/uuid";

export class WorkoutSet {
    public id: string;

    constructor(
        private done: boolean,
        public preDefinedWeight: string,
        public preDefinedReps: string
    ) {
        this.id = generateUUID().substring(2, 15);
    }


    static create(): WorkoutSet {
        return new WorkoutSet(false, '0', '0');
    }

    toggleDone = (): void => {
        this.done = !this.done;
    }

    workoutSetDone = (): boolean => this.done;
}