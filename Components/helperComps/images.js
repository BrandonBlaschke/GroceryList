import React from 'react';
import {Image} from 'react-native'; 

//This is a stateless component that can return different images based on the title name of the image.
//Had to do this because require needs a string literal to work. 
const images = (props) => {

    switch(props.src) {
        case 'plus':
            return <Image source={require("../../assets/plus.png")} style={{width: props.width, height: props.height}}/>
        case 'refresh':
            return <Image source={require("../../assets/refresh.png")} style={{width: props.width, height: props.height}}/>
        default:
            src = '';
            break; 
    }
};

export default images; 