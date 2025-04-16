import React from "react";
import { ScrollView } from 'react-native';
import ExerciseList from "../../components/ExerciseList";
import { Exercise } from "@/src/domain/exercise";
import { WorkoutSet } from "@/src/domain/workoutSet";

const exercises: Exercise[] = [
    new Exercise('Supino', [
        new WorkoutSet(false, '40', '10'),
        new WorkoutSet(false, '40', '10'),
    ]),
    new Exercise('Agachamento', [
        new WorkoutSet(false, '40', '10'),
        new WorkoutSet(false, '40', '10'),
        new WorkoutSet(false, '40', '10'),
    ]),

]

const WorkOutScreen = () => {
    return (
        <ScrollView>
            <ExerciseList exercises={exercises} />
        </ScrollView>
    )
}

export default WorkOutScreen;