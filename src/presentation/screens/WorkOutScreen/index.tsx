import React, { useState } from "react";
import { FlatList, ScrollView, Text, TextInput, View } from 'react-native';
import Checkbox from 'expo-checkbox';
import WorkoutSetList from "../../components/WorkoutSetList";
import ExerciseList from "../../components/ExerciseList";

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
    {
        name: 'Agachamento',
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
            <ExerciseList exercises={exercises} />
        </ScrollView>
    )
}

export default WorkOutScreen;