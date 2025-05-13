import TrainingSheet from "../../domain/TrainingSheet";
import TrainingSheetRepository from "../../infra/repository/TrainingSheetRepository";

export default class CreatePlaningSheet{
    constructor(readonly trainingSheetRepository: TrainingSheetRepository){}
    
    async execute(input: any){
        const trainingSheet = TrainingSheet.create(input.name);
        await this.trainingSheetRepository.createTrainingSheet(trainingSheet);
        return await this.trainingSheetRepository.selectTrainingSheetByID(trainingSheet.id);
    }
}