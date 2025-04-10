import { WorkoutSet } from "./workoutSet";

export class Exercise {
    name: string;
    series: WorkoutSet[];

    constructor(name: string, series: WorkoutSet[]) {
        this.name = name;
        this.series = series;
    }
}