import Checkbox from "expo-checkbox"
import { View, TextInput, Text } from "react-native"
import { WorkoutSet } from '../../../domain/workoutSet';

type SetItemPropsType = {
    workoutSet: WorkoutSet;
    index: number;
}

const WorkoutSetItem = ({ workoutSet, index }: SetItemPropsType) => {

    const setChecked = (value: boolean) => {
        workoutSet.done = !workoutSet.done;
    }

    return (
        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Text>{index + 1}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>Reps:  </Text>
                <TextInput
                    placeholder="Peso"
                    keyboardType="numeric"
                    value={workoutSet.preDefinedWeight.toString()}
                />
                <Text>Peso: </Text>
                <TextInput
                    placeholder="Repetições"
                    keyboardType="numeric"
                    value={workoutSet.preDefinedReps.toString()}
                />
                <Checkbox
                    value={workoutSet.done}
                    onValueChange={setChecked} />
            </View>
        </View>
    )
}

export default WorkoutSetItem;