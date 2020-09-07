import React from 'react'
import {TouchableOpacity, Text, StyleSheet} from 'react-native'

const CategoryButton = ({name, color, onPress, selected}) =>{
    
    const backgroundColor = selected ? color : "#353943"
    const textColor = selected ? 'white' : color

    return (
        <TouchableOpacity onPress={onPress} style={{... styles.button, backgroundColor}}>
            <Text style={{... styles.text, color : textColor}}>{name[0]}</Text>
        </TouchableOpacity>
    )
    
}

export default CategoryButton

const styles = StyleSheet.create({
    button : {
        borderRadius : 15,
        paddingHorizontal : 5,
        paddingVertical : 12,
        justifyContent : 'center',
        alignContent: 'center',
        elevation:10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        marginVertical : 10,
    },
    text : {
        fontSize : 20,
        fontFamily : 'kumbhSansBold',
        alignSelf : 'center',
        color : 'white',
    },
})