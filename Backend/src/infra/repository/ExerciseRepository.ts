import pgp from 'pg-promise';
import { Exercise } from '../../domain/Exercise';
import DatabaseConnection from '../database/DatabaseConnection';

const fsPromises = require('fs').promises;
const path = require('path');

const exercisesDB = {
    exercises: require('../../../exercises.json'),
    setExercises: function (data: Exercise[]) { this.exercises = data; },
}

export default interface ExerciseRepository {
    createExercise(exercise: Exercise) : Promise<void>;
    getExercises() : Promise <Exercise[]>;
    deleteAll(): Promise<void>;
}

export class ExerciseDAOMemory implements ExerciseRepository  {

    deleteAll(): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
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

export class ExerciseRepositoryDatabase implements ExerciseRepository {
    constructor(private databaseConnection: DatabaseConnection){}
    
    async createExercise(exercise: Exercise): Promise<void> {
        this.databaseConnection.query("insert into ironjournal.exercise (exercise_id, name) values ($1, $2)", [exercise.id, exercise.name]);
    }

    async getExercises(): Promise<Exercise[]> {
        const exercisesData = await this.databaseConnection.query("select * from ironjournal.exercise", []);
        const exercises: Exercise[] = [];

        [...exercisesData].forEach((exercise) => {
            exercises.push(new Exercise(exercise.exercise_id, exercise.name))
        })

        return exercises;
    }

    async deleteAll(): Promise<void> {
        this.databaseConnection.query("delete from ironjournal.exercise", []);
    }

}