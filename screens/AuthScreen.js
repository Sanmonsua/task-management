import React from 'react'

import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import * as GoogleSignIn from 'expo-google-sign-in'
import { signIn } from '../redux/actions'
import { connect } from 'react-redux'

class AuthScreen extends React.Component {
  state = { 
    user: null,
  }

  componentDidMount() {
    this.initAsync()
  }

  initAsync = async () => {
    await GoogleSignIn.initAsync()
    this._syncUserWithStateAsync()
  }

  _syncUserWithStateAsync = async () => {
    const user = await GoogleSignIn.signInSilentlyAsync()
    if (user){
      this.props.signIn({ user })
      this.props.navigation.navigate('LoadingScreen')
    }
  }

  signOutAsync = async () => {
    await GoogleSignIn.signOutAsync();
    this.setState({ user: null })
  }

  signInAsync = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync()
      const { type, user } = await GoogleSignIn.signInAsync()
      if (type === 'success') {
        this._syncUserWithStateAsync()
      }
    } catch ({ message }) {
      alert('login: Error:' + message)
    }
  }

  onPress = () => {
    if (this.state.user) {
      this.signOutAsync()
    } else {
      this.signInAsync(this.state)
    }
  }

  render() {
    return (
        <View style={styles.container}>
          <View style={{flex:1}}>
            <Image
              style={{width:'100%', height:'100%', resizeMode:'contain'}} 
              source={require('../assets/img/logo.png')} 
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>
              Sign In
            </Text>
            <TouchableOpacity style={styles.button} onPress={this.onPress}>
              <Ionicons name="ios-arrow-round-forward" size={40} color="black" />
            </TouchableOpacity>
          </View>
          
        </View>
      )
  }
}

export default connect(null, { signIn })(AuthScreen)

const styles = StyleSheet.create({
  container: {
    backgroundColor : 'white',
    flex : 1,
    paddingHorizontal : 40,
    paddingVertical : 60,
  },
  title: {
    fontFamily: 'kumbhSansBold',
    fontSize :38
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button:{
    paddingVertical:5,
    paddingHorizontal:15,
    borderRadius:10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1,
    backgroundColor:'white',
  }
})