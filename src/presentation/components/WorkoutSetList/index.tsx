import Checkbox from "expo-checkbox"
import { FlatList, View, TextInput, Text } from "react-native"
import { WorkoutSet } from '../../../domain/workoutSet';
import WorkoutSetItem from "../WorkoutSetItem";

type SetListPropsType = {
    workoutSets: WorkoutSet[];
}

const WorkoutSetList = ({workoutSets: workoutSets}: SetListPropsType) => {
    return (
        <FlatList
            data={workoutSets}
            renderItem={({ item: workoutSet, index }) =>
                <WorkoutSetItem key={index} workoutSet={workoutSet} index={index} />
            } />
    )
}

export default WorkoutSetList;