import React from 'react'; 
import {View, TouchableOpacity, Image, StyleSheet, Alert} from 'react-native'

const buttonImage = () => (
    <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={()=>{Alert.alert("you clicked me")}}>
          <Image source={require("../assets/plus.png")} style={{width: 50, height: 50}}/>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#ff7f2a',
      alignItems: 'center',
      justifyContent: 'center',
      width: 50, 
    },
    button: {
    //   backgroundColor: '#859a9b',
    //   borderRadius: 20,
    //   padding: 10,
    //   marginBottom: 20,
    //   shadowColor: '#303838',
    //   shadowOffset: { width: 0, height: 5 },
    //   shadowRadius: 10,
    //   shadowOpacity: 0.35,
    },
  });

export default buttonImage; 
