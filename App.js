import React from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import { category, categories } from "./mockData"
import Constants from 'expo-constants'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import Task from './components/Task'
import CategoryButton from './components/CategoryButton'
import AddCategoryButton from './components/AddCategoryButton'

export default class App extends React.Component {

  state = {
    isReady : false,
    selectedCategoryId : 1,
  }

  loadAssetsAsync = async () => {
    const fonts = await Font.loadAsync({
      kumbhSans : require('./assets/fonts/KumbhSans-Regular.ttf'),
      kumbhSansBold : require('./assets/fonts/KumbhSans-Bold.ttf'),
    })

    return Promise.all(fonts)
  } 

  renderTask = ({item}) => {
    return (
      <Task 
        item={item} 
        color={category.color} 
        done={item.done}
      />
    )
  }

  renderCategory = ({item}) => {
    return (
      <CategoryButton 
        name={item.name} 
        color={item.color}
        selected={item.id === this.state.selectedCategoryId}
        onPress={async() => {
          await this.setState({selectedCategoryId : item.id})
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
          <Text style={{... styles.title, fontFamily : 'kumbhSansBold',}}>
            {category.name}
          </Text>
          <FlatList
            data={category.tasks}
            keyExtractor={(item) => item.id}
            renderItem={this.renderTask}
          />
          <TouchableOpacity style={{... styles.addButton, backgroundColor: category.color}}>
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
