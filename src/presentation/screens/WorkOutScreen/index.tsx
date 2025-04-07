import React from "react";
import { FlatList, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

const exercises = [
    {
        name: 'Supino',
        series: [
            {
                done: false,
                preDefinedWeight: 40,
                preDefinedReps: 10,
            },
            {
                done: false,
                preDefinedWeight: 40,
                preDefinedReps: 10,
            },
        ]
    },
]

const WorkOutScreen = () => {
    return (
        <ScrollView>
            <FlatList data={exercises} renderItem={({ item: exercise, index }) =>
                <View key={index}>
                    <Text>{exercise.name}</Text>
                    <FlatList
                        data={exercise.series}
                        renderItem={({ item: serie, index }) =>
                            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <Text>{index + 1}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text>Reps:  </Text>
                                    <TextInput
                                        placeholder="Peso"
                                        keyboardType="numeric"
                                        value={serie.preDefinedWeight.toString()}
                                    />
                                    <Text>Peso: </Text>
                                    <TextInput
                                        placeholder="Repetições"
                                        keyboardType="numeric"
                                        value={serie.preDefinedReps.toString()}
                                    />
                                    <TouchableOpacity style={{width: 2, height: 2}}/>
                                </View>
                            </View>
                        } />
                </View>
            } />
        </ScrollView>
    )
}

export default WorkOutScreen;