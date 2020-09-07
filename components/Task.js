import React from 'react'
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native'

export const Task = ({item, color}) => (
    <TouchableOpacity style={styles.taskContainer}>
        <Text style={styles.taskName}>
            {item.name}
        </Text>
        <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
            <Text style={styles.taskDate}>
                {item.date.toUpperCase()}
            </Text>
            {item.done && 
                <Text style={{... styles.taskDate, color:color}}>
                    COMPLETED !
                </Text>
            }
            
        </View>

    </TouchableOpacity>
)

export default Task

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