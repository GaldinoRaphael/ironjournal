import { ExerciseDAO } from "./ExerciseDao";
import { Exercise } from "./model/Exercise";

export const createExercise = async (req: any, res: any) => {
    const exerciseDAO = new ExerciseDAO();

    const { name } = req.body;

    if(!name) return res.status(400).json({'message': 'Nome inválido'});;

    const exercises = await exerciseDAO.getExercises();

    if(exercises.find(exercise => exercise.name == name.toLowerCase())) return res.status(422).json({'message': 'Exercício já cadastrado'});

    const id = crypto.randomUUID().slice(0, 4);

    const exercise: Exercise = {
        id: id,
        name : name.toLowerCase()
    };

    try{
        await exerciseDAO.createExercise(exercise);
        res.status(200).json(exercise);
    } catch (e){
        res.status(500);
    }
}
