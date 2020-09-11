import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Constants from 'expo-constants'
import { connect } from 'react-redux'

import TasksFlatList from '../components/TasksFlatList'
import CategoriesFlatList from '../components/CategoriesFlatList'
import AddCategoryButton from '../components/AddCategoryButton'
import Button from '../components/Button'

class TaskListScreen extends React.Component {
  
  render(){
    
    return (
        <View style={styles.container}>
          <View style={styles.tasks}>
            <Text style={styles.textMuted}>CATEGORY</Text>
            <View style={{width:"100%"}}>
              <Text numberOfLines={1} adjustsFontSizeToFit style={styles.title}>
                {this.props.category.name}
              </Text>
            </View>
            <TasksFlatList 
              color={this.props.category.color}
              tasks={this.props.category.tasks}
            />
            <Button
              title="+ ADD NEW TASK" 
              color={this.props.category.color}
              onPress={()=>this.props.navigation.navigate('AddTaskScreen')}
            />
          </View>
          <View style={styles.categories}>
              <CategoriesFlatList 
                selectedId={this.props.category.id}
                categories={this.props.categories}
              />
              <AddCategoryButton/>
          </View>
        </View>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories.allIds.map(categoryId => state.categories.byIds[categoryId]),
  category : state.categories.byIds[state.categories.selectedId],
})

export default connect(mapStateToProps)(TaskListScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    paddingTop: Constants.statusBarHeight,
  },
  tasks: {
    backgroundColor: "white",
    width: "80%",
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  categories: {
    backgroundColor: "#222429",
    width: "20%",
    padding : 12,
    justifyContent : 'center',
  },
  textMuted: { 
    color: "#d1d9e4", 
    fontSize: 18,
    fontFamily : 'kumbhSansBold',
  },
  title : {
    fontSize: 50,
    fontFamily : 'kumbhSansBold',
  },
});
