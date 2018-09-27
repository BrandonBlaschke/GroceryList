import React from 'react';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from './homeScreen'; 
import ListScreen from './listScreen';
import RegisterScreen from './registerScreen'; 
import NewListScreen from './newListScreen'; 
import ViewListScreen from './viewListScreen';
import AddFoodScreen from './addFoodScreen'; 

export default class RootApp extends React.Component {

  render() {

    const RootStack = createStackNavigator(
      {
        Home: HomeScreen,
        Lists: ListScreen, 
        Register: RegisterScreen,
        NewList: NewListScreen,
        ViewList: ViewListScreen,
        AddFood: AddFoodScreen
      },
      {
        initialRouteName:'Home',
        headerMode: 'none',
      }
      );
      

    return <RootStack/>
  }
}

