import { Request, Response } from "express";

import CreateExercise from "./CreateExercise";
import Login from "./Login";
import Register from "./Register";
import { RegisterDAODatabase } from "./RegisterDAO";
import { ExerciseDAODatabase } from "./ExerciseDAO";
import HttpServer, { ExpressHttpServer } from "./infra/http/HttpServer";
import AuthController from "./infra/controller/AuthController";
import ExerciseController from "./infra/controller/ExerciseController";

const exerciseDAO = new ExerciseDAODatabase();
const createExercise = new CreateExercise(exerciseDAO);

const login = new Login();

const registerDAO = new RegisterDAODatabase();
const register = new Register(registerDAO);

const httpServer: HttpServer = new ExpressHttpServer();

AuthController.config(httpServer, register, login);
ExerciseController.config(httpServer, createExercise);

httpServer.listen(3000);
