import CreatePlaningSheet from "../src/application/useCase/CreatePlaningSheet";
import TrainingSheet from "../src/domain/TrainingSheet";
import TrainingSheetRepository, { TrainingSheetRepositoryDatabase } from "../src/infra/repository/TrainingSheetRepository";
import DatabaseConnection, { PgPromisseAdapter } from './../src/infra/database/DatabaseConnection';

describe(('Planilha de treino'), () => {

    let createPlaningSheet: CreatePlaningSheet;
    let trainingSheetRepository: TrainingSheetRepository;
    let databaseConnection: DatabaseConnection;

    beforeEach(() => {
        databaseConnection = new PgPromisseAdapter();
        trainingSheetRepository = new TrainingSheetRepositoryDatabase(databaseConnection);
        createPlaningSheet = new CreatePlaningSheet(trainingSheetRepository);
    })

    test('Deve criar planilha de treino', async () => {
        const planilha = TrainingSheet.create('Strong lift');
    
        const response  = await createPlaningSheet.execute(planilha);
    
        expect(response.id).toBeDefined();
        expect(response.name).toBe('Strong lift');
    })
})
