import React from 'react'
import {TouchableOpacity, Text, StyleSheet} from 'react-native'

const CategoryButton = (props) =>{
    
    const backgroundColor = props.selected ? props.color : "#353943"
    const textColor = props.selected ? 'white' : props.color

    return (
        <TouchableOpacity 
            onPress={props.onPress} 
            style={{
                ... styles.button, 
                backgroundColor
            }}
        >
            <Text 
                style={{
                    ... styles.text, 
                    color : textColor
                }}
            >
                {props.name.charAt()}
            </Text>
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