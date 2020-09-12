import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

export default function Button (props) {
    
    return (
        <TouchableOpacity
            style={{
                ... styles.addButton, 
                backgroundColor: props.color
            }}
            onPress={props.onPress}
        >
            <Text style={styles.addButtonLabel}>
                {props.title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    addButton : {
        alignSelf: "center",
        padding : 20,
        borderRadius : 15,
        width : '100%',
    }, 
    addButtonLabel : {
        alignSelf : 'center',
        color : 'white',
        fontSize : 17,
        fontFamily : 'kumbhSansBold',
    },
})