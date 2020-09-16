import React from 'react'

import { View, TextInput, StyleSheet } from 'react-native'
import { showMessage } from  'react-native-flash-message'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-community/picker'
import colors from '../colors'
import Button from './Button'

import { connect } from 'react-redux'
import { addCategory } from '../redux/actions'


class AddCategoryForm extends React.Component{
    
    state = {
        name : "",
        color : colors[0].code,
    }

    onChangeName = (text) => {
        this.setState({
            name : text,
        })
    }

    onAdd = () => {
        if (this.state.name.length > 0){
            this.props.addCategory(this.state)
            this.props.onSubmit()
        } else{
            showMessage({
                message: "Opps!",
                description : "You need to input a category name",
                type: "danger",
            })
        }
        
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.textField}
                    placeholder="Category name"
                    value={this.state.name}
                    placeholderTextColor="#c5c9d6"
                    onChangeText={this.onChangeName}
                />
                <View style={styles.row}>
                    <Ionicons 
                        style={{
                            ... styles.iconHolder, 
                            backgroundColor:`${this.state.color}30`
                            }} 
                        name="ios-color-fill" 
                        size={30} 
                        color={this.state.color} 
                    />
                    <View style={styles.pickerButton}>
                        <Picker
                            selectedValue={this.state.color}
                            style={{width:"100%", justifyContent:'center'}}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({color: itemValue})
                            }
                        >
                            {colors.map(color =>(
                                <Picker.Item label={color.name} value={color.code}/>
                            ))}
                        </Picker>
                    </View> 
                </View>
                <View style={styles.createButtonHolder}>
                    <Button 
                        title="CREATE CATEGORY"
                        color="#222429" 
                        onPress={this.onAdd}
                    />
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

export default connect(null, { addCategory })(AddCategoryForm)

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
    pickerButton : {
        justifyContent :'center',
        marginHorizontal : 20,
        flex:1,
    },
    row :{
        marginTop:10,
        padding : 10,
        flexDirection:'row',
        justifyContent : 'space-around',
    },
    iconHolder : {
        borderRadius : 20,
        padding : 15,
        flexWrap : 'wrap',
    },
    createButtonHolder : {
        justifyContent :  'flex-end', 
        flex : 1
    },
    container : {
        paddingVertical : 20,
        flex:1,
    }
})