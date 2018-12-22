import React from 'react'; 
import {View, TouchableOpacity} from 'react-native'
import Images from './helperComps/images';

const buttonImage = (props) => (
    <View style={{
      backgroundColor: props.bgColor,
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
