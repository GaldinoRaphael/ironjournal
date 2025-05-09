import express, {Request, Response} from "express";
import cors from "cors";
import CreateExercise from "./CreateExercise";
import Login from "./Login";
import Register from "./Register";
import { RegisterDAODatabase } from "./RegisterDAO";
import { ExerciseDAODatabase } from "./ExerciseDAO";

const app = express();
app.use(express.json());
app.use(cors())

const exerciseDAO = new ExerciseDAODatabase();
const createExercise = new CreateExercise(exerciseDAO);

const login = new Login();

const registerDAO = new RegisterDAODatabase();
const register = new Register(registerDAO);

app.post('/register', async (req: Request, res: Response) => {
    try {
        const input = req.body;
        const output = await register.execute(input);
        res.json(output);
    } catch (e: any) {
        console.log(e)
        console.log(e.message)
        res.status(422).json({
            error: e.message
        })
    }
});

app.post('/login', async (req: Request, res: Response) => {
    try {
        const input = req.body;
        const output = await login.execute(input);
        res.json(output);
    } catch (e: any) {
        console.log(e)
        console.log(e.message)
        res.status(422).json({
            error: e.message
        })
    }
});

app.post('/exercise', async (req: Request, res: Response) => {
    try {
        const input = req.body;
        const output = await createExercise.execute(input);
        res.json(output);
    } catch (e: any) {
        console.log(e)
        console.log(e.message)
        res.status(422).json({
            error: e.message
        })
    }
});

app.listen(3000);
