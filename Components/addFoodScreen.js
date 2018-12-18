import React from 'react'; 
import {View, Text, TextInput, StyleSheet, Alert, ToastAndroid} from 'react-native'; 
import axios from 'react-native-axios'; 
import ButtonGL from '../ui/buttonGL'; 
import {connect} from 'react-redux'; 
import styles from '../ui/styles';

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


export default connect(mapStateToProps)(AddFoodScreen); 