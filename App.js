import React from 'react';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from './Components/homeScreen'; 
import ListScreen from './Components/listScreen';
import RegisterScreen from './Components/registerScreen'; 

export default class App extends React.Component {

  render() {

    const RootStack = createStackNavigator(
      {
        Home: HomeScreen,
        Lists: ListScreen, 
        Register: RegisterScreen
      },
      {
        initialRouteName:'Home',
        headerMode: 'none',
      }
      );
      

    return <RootStack/>
  }
}

