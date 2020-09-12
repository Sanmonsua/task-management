import React from 'react'
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; 

export const Task = ({item, color, onPress, onToggle}) => (
    <TouchableOpacity
        onPress={onPress}
        style={styles.taskContainer}
    >
        <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
            <Text style={styles.taskName}>
                {item.name}
            </Text>
            <TouchableOpacity onPress={onToggle}>
                {item.done 
                    ? <Ionicons name="ios-checkbox" size={24} color={color} />
                    : <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color="#d1d9e4" />
                }
            </TouchableOpacity>
            
            
        </View>
        
        <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
            <Text style={styles.taskDate}>
                {item.date.toUpperCase()}
            </Text>
            {item.done 
                ? <Text style={{... styles.taskDate, color:color}}>
                    COMPLETED !
                </Text>
                : <Text style={styles.taskDate}>TO-DO</Text>
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
        flexShrink:1,
    },
    taskDate: {
        fontFamily : 'kumbhSansBold',
        color : "#d1d9e4",
        marginTop : 5,
    }
})