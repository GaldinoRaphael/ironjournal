export class Exercise {
    constructor(
        readonly id: string,
        readonly name: string){
            if(!name) throw new Error("Nome inválido");
        }

    static create(name: string){
        const exerciseId = crypto.randomUUID();
        const exerciseName = name;

        return new Exercise(exerciseId, exerciseName);
    }
}