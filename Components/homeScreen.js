import React from 'react';
import {StyleSheet, Text, View, TextInput, Alert, Image } from 'react-native';
import axios from 'react-native-axios'; 
import ButtonGL from '../ui/buttonGL'; 
import {connect} from 'react-redux'; 
import styles from '../ui/styles';

const signInURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAMVYCMXViqpZjt5cQ_GkuKthXTWFzsRAY'
const usersLink = 'https://grocerylist-e144a.firebaseio.com/users.json';


class HomeScreen extends React.Component {

    state = {
        password: '',
        loading: false, 
        success: false 
    }

    signIn() {
        const authData = {
            email: this.props.email,
            password: this.state.password, 
            returnSecureToken: true 
        }

        this.setState({loading: true});

        axios.post(signInURL, authData)
        .then(res => {
            //Get user name from db 
            axios.get(usersLink + '?orderBy="email"&equalTo="' + this.props.email + '"')
            .then(response => {

                let name; 
                for (let key in response.data) {
                    obj = {...response.data[key]}
                    name = obj.name;
                }
                this.setState({loading: false});
                this.props.setName(name); 
                this.props.navigation.navigate("Lists"); 
            })
            .catch(error => {
                Alert.alert("ERROR", String(error)); 
                this.setState({loading: false});
            })

        })
        .catch(err => {
            this.setState({loading: false});
            Alert.alert("ERROR", String(err)); 
        })
    }

    register() {
        this.props.navigation.navigate("Register"); 
    }

    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Grocery Lists</Text>
                <Image source={require('../assets/logo.png')} style={{width: 150, height: 150}}/>
                <Text style={styles.text}>Email</Text>
                <TextInput
                    onChangeText={(text) => {this.props.setEmail(text)}} 
                    keyboardType="email-address" 
                    style={styles.textInput}
                    textAlign={'center'}
                    selectionColor={'#8c8c8c'}
                    underlineColorAndroid={'rgba(255,127,42,255)'}
                />
                <Text style={styles.text}>Password</Text>
                <TextInput
                    onChangeText={(text) => {this.setState({password: text})}} 
                    secureTextEntry={true} 
                    selectionColor={'#8c8c8c'}
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

  function mapStateToProps(state) {
      return {
          email: state.email
      }
  }

  function mapDispatchToProps(dispatch) {
      return {
          setEmail: (email) => dispatch({type: 'SET_EMAIL', value: email}),
          setName: (name) => dispatch({type: 'SET_NAME', value: name})
      }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen); 