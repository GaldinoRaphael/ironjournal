import { FlatList, View, Text } from "react-native";
import WorkoutSetList from "../WorkoutSetList";
import { Exercise } from "@/src/domain/exercise";
import { useState } from "react";
import { WorkoutSet } from "@/src/domain/workoutSet";

type ExerciseListPropsType = {
    exercises: Exercise[];
}

const ExerciseList = ({ exercises }: ExerciseListPropsType) => {

    const [exerciseList, setExerciseList] = useState(exercises);

    const handleUpdateExercise = (workoutSet: WorkoutSet, index: number) => {

        const newExerciseList = [...exerciseList];

        newExerciseList.map((ex: Exercise) => {
            if (ex.workoutSets[index].id === workoutSet.id) {
                ex.workoutSets[index] = workoutSet;
            }

            // ex.checkExerciseDone();
            return ex;
        });

        setExerciseList(newExerciseList);
    }

    console.log(exercises);

    return (
        <FlatList data={exerciseList} renderItem={({ item: exercise, index }) =>
            <View key={exercise.id}>
                <Text>{exercise.name}</Text>
                <WorkoutSetList
                    workoutSets={exercise.workoutSets}
                    onUpdate={(workoutSet: WorkoutSet) => {
                        handleUpdateExercise(workoutSet, index);
                    }}
                />
            </View>
        } />
    )
}

export default ExerciseList;