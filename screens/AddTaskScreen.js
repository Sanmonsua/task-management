import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Constants from 'expo-constants'

import AddTaskForm from '../components/AddTaskForm'

export default class AddTaskScreen extends React.Component {
    
    render (){
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    Create{'\n'}New Task
                </Text>
                <AddTaskForm />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingVertical: Constants.statusBarHeight,
        paddingHorizontal: 30,
    },
    title : {
        fontSize: 45,
        fontFamily : 'kumbhSansBold',
    },
})