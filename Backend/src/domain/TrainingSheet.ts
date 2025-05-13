export default class TrainingSheet{
    constructor(readonly id: string, readonly name: string){
        if(!name) throw new Error('Nome inválido');
    }

    static create(name: string){
        const trainingSheetID = crypto.randomUUID();
        return new TrainingSheet(trainingSheetID, name);
    }
}