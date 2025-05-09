export class Exercise {
    constructor(
        readonly id: string,
        readonly name: string){
            if(!name) throw new Error("Nome inválido");
        }

    static create(name: string){
        const exerciseId = crypto.randomUUID().slice(0, 4);
        const exerciseName = name.toLowerCase();

        return new Exercise(exerciseId, exerciseName);
    }
}