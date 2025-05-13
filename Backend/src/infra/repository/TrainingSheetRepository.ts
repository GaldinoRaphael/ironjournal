import TrainingSheet from "../../domain/TrainingSheet";
import DatabaseConnection from "../database/DatabaseConnection";

export default interface TrainingSheetRepository{
    createTrainingSheet(trainingSheet: TrainingSheet): Promise<void>;
    selectTrainingSheetByID(id: string): Promise<TrainingSheet>;
}

export class TrainingSheetRepositoryDatabase{
    constructor(readonly databaseConection: DatabaseConnection){}

    async createTrainingSheet(trainingSheet: TrainingSheet){
        this.databaseConection.query("insert into ironjournal.training_sheet (training_sheet_id, name) VALUES ($1, $2)", [trainingSheet.id, trainingSheet.name]);
    }

    async selectTrainingSheetByID(id: string){
        const data = await this.databaseConection.query("select * from ironjournal.training_sheet", [])
        const [ trainingSheetData ] = await this.databaseConection.query("select * from ironjournal.training_sheet WHERE training_sheet_id = $1", id);
        const trainingSheet = new TrainingSheet(trainingSheetData.training_sheet_id, trainingSheetData.name);
        return trainingSheet;
    }

}