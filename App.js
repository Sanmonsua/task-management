import React from "react";
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider } from 'react-redux'
import store from './redux/store'

import { AppLoading } from 'expo'
import * as Font from 'expo-font'

import TaskListScreen from './screens/TaskListScreen'
import AddTaskScreen from './screens/AddTaskScreen'

const Stack = createStackNavigator()

export default class App extends React.Component {
  state = {
    isReady : false,
  }

  loadAssetsAsync = async () => {
    const fonts = await Font.loadAsync({
      kumbhSans : require('./assets/fonts/KumbhSans-Regular.ttf'),
      kumbhSansBold : require('./assets/fonts/KumbhSans-Bold.ttf'),
    })

    return Promise.all(fonts)
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
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen 
              component={TaskListScreen} 
              name="TasksListScreen"
              options={{headerShown:false}}
            />
            <Stack.Screen 
              component={AddTaskScreen}
              name="AddTaskScreen"
            />
          </Stack.Navigator>
        </NavigationContainer>
        
      </Provider>
      
    );
  }
}