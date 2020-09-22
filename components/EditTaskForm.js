import React from 'react'
import {
	View,
	TextInput,
	StyleSheet,
	Text,
	TouchableOpacity,
} from 'react-native'
import { showMessage } from 'react-native-flash-message'
import DateTimePicker from '@react-native-community/datetimepicker'
import { MaterialIcons } from '@expo/vector-icons'
import Button from './Button'

import { connect } from 'react-redux'
import { editTask } from '../redux/actions'

const dateFormat = require('dateformat')

class EditTaskForm extends React.Component {
	state = {
		name: this.props.task.name,
		date: new Date(`${this.props.task.date}T06:00:00.000`),
		showDatePicker: false,
	}

	onChangeName = (text) => {
		this.setState({
			name: text,
		})
	}

	onChangeDate = (event, selectedDate) => {
		if (selectedDate !== undefined) {
			this.setState({
				date: selectedDate,
				showDatePicker: false,
			})
		}
	}

	showDatePicker = () => {
		this.setState({
			showDatePicker: true,
		})
	}

	onEdit = () => {
		if (this.state.name.length > 0) {
			this.props.editTask({
				id: this.props.task.id,
				name: this.state.name,
				date: dateFormat(this.state.date, 'yyyy-mm-dd'),
				categoryId: this.props.task.categoryId,
			})
			this.props.onSubmit()
		} else {
			showMessage({
				message: 'Opps!',
				description: 'You need to input a task name',
				type: 'danger',
			})
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<TextInput
					style={styles.textField}
					placeholder="Task name"
					value={this.state.name}
					placeholderTextColor="#c5c9d6"
					onChangeText={this.onChangeName}
				/>
				<View style={styles.row}>
					<MaterialIcons
						style={styles.dateIcon}
						name="date-range"
						size={30}
						color="#eda826"
					/>
					<TouchableOpacity
						style={styles.datePickerButton}
						onPress={this.showDatePicker}
					>
						<Text
							numberOfLines={1}
							adjustsFontSizeToFit
							style={styles.date}
						>
							{dateFormat(this.state.date, 'dd/mm/yy')}
						</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.createButtonHolder}>
					<Button
						title="SAVE"
						color="#222429"
						onPress={this.onEdit}
					/>
				</View>

				{this.state.showDatePicker && (
					<DateTimePicker
						onChange={this.onChangeDate}
						value={this.state.date}
						minimumDate={new Date()}
					/>
				)}
			</View>
		)
	}
}

export default connect(null, { editTask })(EditTaskForm)

const styles = StyleSheet.create({
	textField: {
		borderBottomWidth: 1,
		borderBottomColor: '#e0e6ee',
		fontSize: 24,
		paddingHorizontal: 5,
		paddingVertical: 10,
		fontFamily: 'kumbhSans',
	},
	date: {
		fontFamily: 'kumbhSans',
		fontSize: 17,
	},
	datePickerButton: {
		justifyContent: 'center',
		marginHorizontal: 20,
		flex: 1,
	},
	row: {
		marginTop: 10,
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	dateIcon: {
		backgroundColor: '#fef5e6',
		borderRadius: 20,
		padding: 10,
		flexWrap: 'wrap',
	},
	categoryIcon: {
		borderRadius: 20,
		padding: 10,
		flexWrap: 'wrap',
	},
	createButtonHolder: {
		justifyContent: 'flex-end',
		flex: 1,
	},
	container: {
		paddingVertical: 20,
		flex: 1,
	},
})
