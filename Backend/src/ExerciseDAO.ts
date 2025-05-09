import { Exercise } from "./model/Exercise";

const fsPromises = require('fs').promises;
const path = require('path');


const exercisesDB = {
    exercises: require('../exercises.json'),
    setExercises: function (data: Exercise[]) { this.exercises = data; },
}

export class ExerciseDAO {
    async createExercise(exercise: Exercise){
        exercisesDB.setExercises( [...exercisesDB.exercises, exercise])
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'exercises.json'),
            JSON.stringify(exercisesDB.exercises)
        );
    }

    async getExercises(): Promise<Exercise[]>{
        return exercisesDB.exercises;
    }
}