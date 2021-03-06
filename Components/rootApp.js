import React from 'react';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from './homeScreen'; 
import ListScreen from './listScreen';
import RegisterScreen from './registerScreen'; 
import NewListScreen from './newListScreen'; 
import ViewListScreen from './viewListScreen';
import AddFoodScreen from './addFoodScreen'; 
import InviteScreen from './inviteScreen'; 

export default class RootApp extends React.Component {

  render() {

    const RootStack = createStackNavigator(
      {
        Home: HomeScreen,
        Lists: ListScreen, 
        Register: RegisterScreen,
        NewList: NewListScreen,
        ViewList: ViewListScreen,
        AddFood: AddFoodScreen,
        Invite: InviteScreen 
      },
      {
        initialRouteName:'Home',
        headerMode: 'none',
      }
      );
      

    return <RootStack/>
  }
}

