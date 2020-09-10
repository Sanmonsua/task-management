import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import Constants from 'expo-constants'
import { connect } from 'react-redux'

import TasksFlatList from '../components/TasksFlatList'
import Task from '../components/Task'
import CategoryButton from '../components/CategoryButton'
import AddCategoryButton from '../components/AddCategoryButton'
import EmptyCategory from '../components/EmptyCategory'
import AddTaskButton from '../components/AddTaskButton'

class TaskListScreen extends React.Component {

  state = {
    selectedCategoryId : 1,
    category : this.props.categories.byIds["1"]
  }


  

  renderCategory = ({item}) => {
    return (
      <CategoryButton 
        name={this.props.categories.byIds[item].name} 
        color={this.props.categories.byIds[item].color}
        selected={item === this.state.selectedCategoryId}
        onPress={() => {
          this.setState({
            selectedCategoryId: item,
            category: this.props.categories.byIds[item],
          })
        }}
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
                {this.state.category.name}
              </Text>
            </View>
            
            <TasksFlatList 
              color={this.state.category.color}
              tasks={this.state.category.tasks}
            />
            
            <AddTaskButton 
              color={this.state.category.color}
              onPress={()=>this.props.navigation.navigate('AddTaskScreen')}
            />
          </View>
          <View style={styles.categories}>
              <FlatList
                data={this.props.categories.allIds}
                keyExtractor={(item) => ""+this.props.categories.byIds[item].id}
                renderItem={this.renderCategory}
                extraData = {this.state.selectedCategoryId}
              />
              <AddCategoryButton/>
          </View>
        </View>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
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
