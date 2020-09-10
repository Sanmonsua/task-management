import React from 'react'
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { MaterialIcons } from '@expo/vector-icons'; 

const dateFormat = require('dateformat')

export default class AddTaskForm extends React.Component{
    
    state = {
        name : "",
        date : new Date(),
        showDatePicker : false,
    }

    onChangeDate = (event, selectedDate) =>{
        if (selectedDate !== undefined){
            this.setState({
                date : selectedDate,
                showDatePicker : false,
            })
        }
    }

    showDatePicker = () => {
        this.setState({
            showDatePicker : true,
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.textField}
                    placeholder="Task name"
                    value={this.state.name}
                    placeholderTextColor="#c5c9d6"
                />
                <View style={styles.row}>
                    <MaterialIcons style={styles.dateIcon} name="date-range" size={26} color="#eda826" />
                    <TouchableOpacity style={styles.datePickerButton} onPress={this.showDatePicker}>
                        <Text numberOfLines={1} adjustsFontSizeToFit style={styles.date}>
                            {dateFormat(this.state.date, 'dddd d, mmmm')}
                        </Text>
                    </TouchableOpacity>
                    
                </View>
                
                {this.state.showDatePicker &&
                    <DateTimePicker
                        onChange={this.onChangeDate}
                        value={this.state.date}
                        minimumDate={new Date()}
                    />
                }
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textField: {
        borderBottomWidth : 1,
        borderBottomColor : "#e0e6ee",
        fontSize : 24,
        paddingHorizontal : 5,
        paddingVertical : 10,
        fontFamily : "kumbhSans",
    },
    date : {
        fontFamily : "kumbhSans",
        fontSize : 17,
    },
    datePickerButton : {
        justifyContent :'center',
    },
    row :{
        padding : 40,
        flexDirection:'row',
        justifyContent : 'space-between',
    },
    dateIcon : {
        backgroundColor : "#fef5e6",
        borderRadius : 15,
        padding : 15,
        flexWrap : 'wrap',
        margin :5,
    },
    container : {
        paddingVertical : 20,
    }
})