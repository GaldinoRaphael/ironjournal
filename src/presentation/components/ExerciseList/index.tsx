import { FlatList, View, Text } from "react-native";
import WorkoutSetList from "../WorkoutSetList";
import { Exercise } from "@/src/domain/exercise";

type ExerciseListPropsType = {
    exercises: Exercise[];
}

const ExerciseList = ({exercises}: ExerciseListPropsType) => {
    return (
        <FlatList data={exercises} renderItem={({ item: exercise, index }) =>
            <View key={index}>
                <Text>{exercise.name}</Text>
                <WorkoutSetList workoutSets={exercise.series} />
            </View>
        } />
    )
}

export default ExerciseList;