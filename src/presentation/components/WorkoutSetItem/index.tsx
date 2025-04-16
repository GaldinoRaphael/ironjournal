import Checkbox from "expo-checkbox"
import { View, TextInput, Text } from "react-native"
import { WorkoutSet } from '../../../domain/workoutSet';

type SetItemPropsType = {
    workoutSet: WorkoutSet;
    index: number;
    onUpdateItem: (workoutSet: WorkoutSet) => void;
}

const WorkoutSetItem = ({ workoutSet, index, onUpdateItem }: SetItemPropsType) => {

    const setChecked = () => {
        workoutSet.toggleDone();
        onUpdateItem(workoutSet);
    }

    const changeWeight = (value: string) => {
        workoutSet.preDefinedWeight = value;
        onUpdateItem(workoutSet);
    }

    const changeReps = (value: string) => {
        workoutSet.preDefinedWeight = value;
        onUpdateItem(workoutSet);
    }


    return (
        <View key={workoutSet.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Text>{index + 1}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>Reps:  </Text>
                <TextInput
                    placeholder="Repetições"
                    keyboardType="numeric"
                    value={workoutSet.preDefinedReps.toString()}
                    onChangeText={changeReps}
                />
                <Text>Peso: </Text>
                <TextInput
                    placeholder="Peso"
                    keyboardType="numeric"
                    value={workoutSet.preDefinedWeight.toString()}
                    onChangeText={changeWeight}
                />
                <Checkbox
                    value={workoutSet.workoutSetDone()}
                    onValueChange={setChecked} />
            </View>
        </View>
    )
}

export default WorkoutSetItem;