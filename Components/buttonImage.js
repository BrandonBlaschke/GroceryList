import React from 'react'; 
import {View, TouchableOpacity, Alert} from 'react-native'
import Images from './helperComps/images';

const buttonImage = (props) => (
    <View style={{
      backgroundColor: '#ff7f2a',
      alignItems: 'center',
      justifyContent: 'center',
      width: props.width
    }}>
        <TouchableOpacity onPress={() => props.action()}>
          <Images src={props.src} width={props.width} height={props.height}/>
        </TouchableOpacity>
    </View>
);

export default buttonImage; 
