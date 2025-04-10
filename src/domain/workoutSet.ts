export class WorkoutSet {
    constructor(
        public done: boolean,
        public preDefinedWeight: number,
        public preDefinedReps: number
    ) {}
    
    static create(): WorkoutSet {
        return new WorkoutSet(false, 0, 0);
    }
}