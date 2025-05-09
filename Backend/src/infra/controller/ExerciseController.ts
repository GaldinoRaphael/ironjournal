import CreateExercise from "../../CreateExercise";
import HttpServer from "../http/HttpServer";

export default class ExerciseController{
    static config(httpServer: HttpServer, createExercise: CreateExercise){
        httpServer.route('post', '/exercise', async (params: any, body: any) => {
            const input = body;
            const output = await createExercise.execute(input);
            return output;
        })
    }
}