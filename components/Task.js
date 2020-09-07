import React from 'react'
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native'

export const Task = ({item}) => (
    <TouchableOpacity style={styles.taskContainer}>
        <Text style={styles.taskName}>
            {item.name}
        </Text>
        <Text style={styles.taskDate}>
            {item.date.toUpperCase()}
        </Text>
    </TouchableOpacity>
)

export const TaskCompleted = ({item, color}) => (
    <TouchableOpacity style={{... styles.taskContainer}}>
        <Text style={{... styles.taskName}}>
            {item.name}
        </Text>
        
        <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
            <Text style={styles.taskDate}>
                {item.date.toUpperCase()}
            </Text>
            <Text style={{... styles.taskDate, color:color}}>
                COMPLETED !
            </Text>
        </View>
        
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    taskContainer : {
        borderWidth : 1,
        borderRadius : 15,
        borderColor : "#d1d9e4",
        padding : 20,
        marginTop : 20,
    },
    taskName : {
        fontSize : 17,
        fontFamily : 'kumbhSans',
    },
    taskDate: {
        fontFamily : 'kumbhSansBold',
        color : "#d1d9e4",
        marginTop : 5,
    }
})