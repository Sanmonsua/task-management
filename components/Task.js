import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

export const Task = ({item}) => (
    <View style={styles.taskContainer}>
        <Text style={styles.taskName}>
            {item.name}
        </Text>
        <Text style={styles.taskDate}>
            {item.date.toUpperCase()}
        </Text>
    </View>
)

export const TaskCompleted = ({item, color}) => (
    <View style={{... styles.taskContainer}}>
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
        
    </View>
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
        fontFamily : 'kumbhSansBold',
    },
    taskDate: {
        fontFamily : 'kumbhSansBold',
        color : "#d1d9e4",
        marginTop : 5,
    }
})