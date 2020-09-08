import React from 'react'
import {TouchableOpacity, Text, StyleSheet} from 'react-native'
import { Octicons } from '@expo/vector-icons'; 

export default function AddCategoryButton () {

    return (
        <TouchableOpacity style={styles.button}>
            <Octicons name="plus" style={styles.text} />
        </TouchableOpacity>
    )
    
}

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
        backgroundColor : "#353943",
    },
    text : {
        fontSize : 24,
        fontFamily : 'kumbhSansBold',
        alignSelf : 'center',
        color : 'white',
    },
})