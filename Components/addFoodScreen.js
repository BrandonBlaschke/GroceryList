import React from 'react'; 
import {View, Text, TextInput, StyleSheet} from 'react-native'; 
import axios from 'react-native-axios'; 
import ButtonGL from '../ui/buttonGL'; 
import {connect} from 'react-redux'; 

const link = 'https://grocerylist-e144a.firebaseio.com/lists';

class AddFoodScreen extends React.Component {

    state = {
        foodName: ''
    }

    addFood() {

        //User enter quantity 

        const food = {
            name: this.state.foodName,
            value: 1,
            quantity: 1,
        }

        axios.post(link + '/' + this.props.listID + '/food.json', food)
        .then(res => {
            console.log(String(res)); 
        })
        .catch(err => {
            console.log(String(err)); 
        })
    }

    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Add A food</Text>
                <TextInput style={styles.textInput} onChangeText={(text) => this.setState({foodName: text})}/>
                <ButtonGL title="Add Food" action={() => this.addFood()}/>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        listID: state.listID
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