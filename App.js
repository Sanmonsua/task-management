import React from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import { category, categories } from "./mockData"
import Constants from 'expo-constants'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import Task from './components/Task'
import CategoryButton from './components/CategoryButton'
import AddCategoryButton from './components/AddCategoryButton'
import EmptyCategory from './components/EmptyCategory'

export default class App extends React.Component {

  state = {
    isReady : false,
    selectedCategoryId : 1,
    category : categories[0],
    categories: categories,
  }

  loadAssetsAsync = async () => {
    const fonts = await Font.loadAsync({
      kumbhSans : require('./assets/fonts/KumbhSans-Regular.ttf'),
      kumbhSansBold : require('./assets/fonts/KumbhSans-Bold.ttf'),
    })

    return Promise.all(fonts)
  } 

  renderTask = ({item, index}) => {
    return (
      <Task 
        item={item} 
        color={category.color} 
        onPress={() => {
          let tasks = this.state.category.tasks
          tasks[index].done = !this.state.category.tasks[index].done
          this.setState({
            category : {... this.state.category, tasks} 
          })
        }}
      />
    )
  }

  renderCategory = ({item}) => {
    return (
      <CategoryButton 
        name={item.name} 
        color={item.color}
        selected={item.id === this.state.selectedCategoryId}
        onPress={() => {
          this.setState({
            selectedCategoryId: item.id,
            category: item,
          })
        }}
      />
    )
  }
  
  render(){

    if (!this.state.isReady) {
      return ( 
        <AppLoading
          startAsync = {this.loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      )
    }

    return (
      <View style={styles.container}>
        <View style={styles.tasks}>
          <Text style={{... styles.textMuted, fontFamily : 'kumbhSansBold',}}>TASKS LIST</Text>
          <View style={{width:"100%"}}>
            <Text numberOfLines={1} adjustsFontSizeToFit style={{... styles.title, fontFamily : 'kumbhSansBold',}}>
              {this.state.category.name}
            </Text>
          </View>
          
          <FlatList
            data={this.state.category.tasks}
            keyExtractor={(item) => item.id}
            renderItem={this.renderTask}
            ListEmptyComponent={EmptyCategory}
          />
          
          <TouchableOpacity style={{... styles.addButton, backgroundColor: this.state.category.color}}>
            <Text style={{... styles.addButtonLabel, fontFamily : 'kumbhSansBold',}}>+ ADD NEW TASK</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.categories}>
            <FlatList
              data={categories}
              keyExtractor={(item) => item.id}
              renderItem={this.renderCategory}
              extraData = {this.state.selectedCategoryId}
            />
            <AddCategoryButton/>
        </View>
      </View>
    );
  }
}

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
  },
  title : {
    fontSize: 50, 
  },
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
  },
});
