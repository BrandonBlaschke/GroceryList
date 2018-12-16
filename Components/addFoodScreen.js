import React from 'react'; 
import {View, Text, TextInput, StyleSheet, Alert, ToastAndroid} from 'react-native'; 
import axios from 'react-native-axios'; 
import ButtonGL from '../ui/buttonGL'; 
import {connect} from 'react-redux'; 

const link = 'https://grocerylist-e144a.firebaseio.com/lists';

class AddFoodScreen extends React.Component {

    state = {
        foodName: '',
        quantity: 0,
    }

    addFood() {

        const food = {
            name: this.state.foodName,
            value: 1,
            quantity: this.state.quantity,
            addedBy: this.props.userName
            
        }

        axios.post(link + '/' + this.props.listID + '/food.json', food)
        .then(res => {
            ToastAndroid.show(this.state.foodName + " was added to list", ToastAndroid.SHORT); 
        })
        .catch(err => {
            Alert.alert("ERROR", String(err)); 
        })
    }

    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Food Name</Text>
                <TextInput 
                    style={styles.textInput}  
                    underlineColorAndroid={'rgba(255,127,42,255)'} 
                    textAlign={'center'}
                    onChangeText={(text) => this.setState({foodName: text})}/>
                <Text style={styles.title}>Quantity</Text>
                <TextInput 
                    style={styles.textInput} 
                    underlineColorAndroid={'rgba(255,127,42,255)'} 
                    keyboardType="numeric" 
                    textAlign={'center'}
                    onChangeText={(text) => this.setState({quantity: parseInt(text)})}/>
                <ButtonGL title="Add Food" action={() => this.addFood()}/>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        listID: state.listID,
        userName: state.name
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: -120
    },
    text: {
      color: "#ff7f2a",
      fontSize: 20,
    },
    title: {
      color: "#ff7f2a",
      fontSize: 40,
    },
    textInput: {
      width: "60%", 
      color: "#8c8c8c",
      justifyContent: 'center',
      fontSize: 20, 
      padding: 10,
    }
  });

export default connect(mapStateToProps)(AddFoodScreen); 