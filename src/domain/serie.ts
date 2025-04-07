export class Serie {
    constructor(
        public done: boolean,
        public preDefinedWeight: number,
        public preDefinedReps: number
    ) {}
    
    static create(): Serie {
        return new Serie(false, 0, 0);
    }
}