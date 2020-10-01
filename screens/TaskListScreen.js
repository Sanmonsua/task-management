import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Constants from 'expo-constants'

import { connect } from 'react-redux'

import { Feather } from '@expo/vector-icons'
import TasksFlatList from '../components/TasksFlatList'
import CategoriesFlatList from '../components/CategoriesFlatList'
import AddCategoryButton from '../components/AddCategoryButton'
import Button from '../components/Button'

class TaskListScreen extends React.Component {
	render() {
		if (!this.props.category) {
			this.props.navigation.push('AddCategoryScreen', { back: false })
			return <View></View>
		} else {
			return (
				<View style={styles.container}>
					<View style={styles.tasks}>
						<Text style={styles.textMuted}>CATEGORY</Text>
						<View
							style={{
								width: '100%',
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							<View style={{ flex: 1 }}>
								<Text
									numberOfLines={1}
									adjustsFontSizeToFit
									style={styles.title}
								>
									{this.props.category.name}
								</Text>
							</View>

							<TouchableOpacity
								style={{ marginHorizontal: 20 }}
								onPress={() => {
									this.props.navigation.push(
										'EditCategoryScreen',
										{
											category: {
												color: this.props.category
													.color,
												name: this.props.category.name,
												id: this.props.category.id,
											},
										}
									)
								}}
							>
								<Feather
									name="edit-3"
									size={24}
									color="black"
								/>
							</TouchableOpacity>
						</View>
						<TasksFlatList
							color={this.props.category.color}
							tasks={this.props.category.tasks.sort(
								function compareTasks(t1, t2) {
									if (t1.done && t2.done) return 0
									else if (t1.done) return 1
									else return -1
								}
							)}
							navigation={this.props.navigation}
						/>
						<Button
							title="+ ADD NEW TASK"
							color={this.props.category.color}
							onPress={() =>
								this.props.navigation.navigate('AddTaskScreen')
							}
						/>
					</View>
					<View style={styles.categories}>
						<CategoriesFlatList
							selectedId={this.props.category.id}
							categories={Object.values(this.props.categories)}
						/>
						<AddCategoryButton
							onPress={() =>
								this.props.navigation.push(
									'AddCategoryScreen',
									{ back: true }
								)
							}
						/>
					</View>
				</View>
			)
		}
	}
}

TaskListScreen.propTypes = {
	categories: PropTypes.array,
	category: PropTypes.object,
	selectedId: PropTypes.string,
	uid: PropTypes.string,
	navigation: PropTypes.object,
}

const mapStateToProps = (state) => ({
	categories: state.categories.byIds,
	category: state.categories.byIds[state.categories.selectedId],
	selectedId: state.categories.selectedId,
	uid: state.user.uid,
})

export default connect(mapStateToProps)(TaskListScreen)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		flexDirection: 'row',
		paddingTop: Constants.statusBarHeight,
	},
	tasks: {
		backgroundColor: 'white',
		width: '80%',
		flex: 1,
		paddingVertical: 40,
		paddingHorizontal: 20,
	},
	categories: {
		backgroundColor: '#222429',
		width: '20%',
		padding: 12,
		justifyContent: 'center',
	},
	textMuted: {
		color: '#d1d9e4',
		fontSize: 18,
		fontFamily: 'kumbhSansBold',
	},
	title: {
		fontSize: 50,
		fontFamily: 'kumbhSansBold',
	},
})
