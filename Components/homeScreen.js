import React from 'react';
import { StyleSheet, Text, View, TextInput, Alert, Image } from 'react-native';
import axios from 'react-native-axios'; 
import ButtonGL from '../ui/buttonGL'; 

const signUpURL = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAMVYCMXViqpZjt5cQ_GkuKthXTWFzsRAY"
const signInURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAMVYCMXViqpZjt5cQ_GkuKthXTWFzsRAY'

class HomeScreen extends React.Component {

    state = {
        email: "", 
        password: '',
        loading: false, 
        success: false 
    }

    signIn() {
        const authData = {
            email: this.state.email,
            password: this.state.password, 
            returnSecureToken: true
        }

        this.setState({loading: true});

        axios.post(signInURL, authData)
        .then(response => {
            this.setState({loading: false});
            console.log(response.data); 
            Alert.alert("Success", "You Signed In");
            
        })
        .catch(err => {
            this.setState({loading: false});
            Alert.alert("ERROR", String(err)); 
        })
    }

    register() {

        const authData = {
            email: this.state.email,
            password: this.state.password, 
            returnSecureToken: true
        }

        axios.post(signUpURL, authData)
        .then(response => {
            console.log(response.data);
            Alert.alert("Thank You", "You are now registered and ready to make a grocery list!") ;
        })
        .catch(err => {
            Alert.alert("ERROR", String(err)); 
        })
    }

    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Grocery Lists</Text>
                <Image source={require('../assets/logo.png')} style={{width: 150, height: 150}}/>
                <Text style={styles.text}>Email</Text>
                <TextInput
                    onChangeText={(text) => {this.setState({email: text})}} 
                    keyboardType="email-address" 
                    style={styles.textInput}
                    textAlign={'center'}
                    underlineColorAndroid={'rgba(255,127,42,255)'}
                />
                <Text style={styles.text}>Password</Text>
                <TextInput
                    onChangeText={(text) => {this.setState({password: text})}} 
                    secureTextEntry={true} 
                    style={styles.textInput}
                    textAlign={'center'}
                    underlineColorAndroid={'rgba(255,127,42,255)'}
                />
                
                <ButtonGL title={this.state.loading? "Authenticating" : "Sign In"} 
                action={() => {
                    this.signIn(); 
                  }}/>

                <ButtonGL title="Register"
                action={() => {
                    this.register(); 
                  }}/>

            </View>
        );
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

  export default HomeScreen; 