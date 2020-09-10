import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import Constants from 'expo-constants'
import { connect } from 'react-redux'

import TasksFlatList from '../components/TasksFlatList'
import CategoryButton from '../components/CategoryButton'
import AddCategoryButton from '../components/AddCategoryButton'
import AddTaskButton from '../components/AddTaskButton'

class TaskListScreen extends React.Component {

  renderCategory = ({item}) => {
    return (
      <CategoryButton 
        name={item.name} 
        color={item.color}
        selected={item.id === this.props.category.id}
        onPress={() =>console.log('Not working for now')}
      />
    )
  }
  
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
            <AddTaskButton 
              color={this.props.category.color}
              onPress={()=>this.props.navigation.navigate('AddTaskScreen')}
            />
          </View>
          <View style={styles.categories}>
              <FlatList
                data={this.props.categories}
                keyExtractor={(item) => item.id}
                renderItem={this.renderCategory}
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
