import React from 'react';
import {View} from 'react-native'; 
import RootApp from './Components/rootApp'; 
import {createStore} from 'redux'; 
import {Provider} from 'react-redux'; 
import reducer from './store/reducer'; 

const store = createStore(reducer); 

export default class App extends React.Component {

  render() {

    return (
     <Provider store={store}>
        <RootApp/>
     </Provider>
    );
  }
}

