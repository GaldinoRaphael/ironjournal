import express from "express"
import { createExercise } from "./exerciseController";
const router = express.Router();

router.post('/', createExercise);

export default router;