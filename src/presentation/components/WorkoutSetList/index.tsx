import Checkbox from "expo-checkbox"
import { FlatList, View, TextInput, Text } from "react-native"
import { WorkoutSet } from '../../../domain/workoutSet';
import WorkoutSetItem from "../WorkoutSetItem";

type SetListPropsType = {
    workoutSets: WorkoutSet[];
    onUpdate: (workoutSet: WorkoutSet) => void;
}

const WorkoutSetList = ({ workoutSets: workoutSets, onUpdate }: SetListPropsType) => {
    return (
        <FlatList
            style={{ marginBottom: 10 }}
            data={workoutSets}
            renderItem={({ item: workoutSet, index }) =>
                <WorkoutSetItem
                    key={workoutSet.id}
                    workoutSet={workoutSet}
                    index={index}
                    onUpdateItem={(updatedSet) => onUpdate(updatedSet)}
                />
            } />
    )
}

export default WorkoutSetList;