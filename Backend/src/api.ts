import { RegisterRepositoryMemory } from "./RegisterDAO";
import { ExerciseRepositoryDatabase } from "./infra/repository/ExerciseRepository";
import HttpServer, { ExpressHttpServer } from "./infra/http/HttpServer";
import AuthController from "./infra/controller/AuthController";
import ExerciseController from "./infra/controller/ExerciseController";
import CreateExercise from "./application/useCase/CreateExercise";
import Login from "./application/useCase/Login";
import Register from "./application/useCase/Register";
import DatabaseConnection, { PgPromisseAdapter } from './infra/database/DatabaseConnection';

// const exerciseDAO = new ExerciseDAOMemory();
const databaseConnection = new PgPromisseAdapter();
const exerciseDAO = new ExerciseRepositoryDatabase(databaseConnection);
const createExercise = new CreateExercise(exerciseDAO);
const registerDAO = new RegisterRepositoryMemory();
const login = new Login(registerDAO);
const register = new Register(registerDAO);

const httpServer: HttpServer = new ExpressHttpServer();

AuthController.config(httpServer, register, login);
ExerciseController.config(httpServer, createExercise);

httpServer.listen(3000);
