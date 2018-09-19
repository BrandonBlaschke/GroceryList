import React from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import axios from 'react-native-axios';
import ButtonGL from '../ui/buttonGL';

const signUpURL = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAMVYCMXViqpZjt5cQ_GkuKthXTWFzsRAY"

class registerSreen extends React.Component {

    state = {
        name: '',
        email: '',
        password: '',
        password2: '',
        match: false,
        loading: false,
    }

    isValidPassword() {
        return this.state.password !== '' && this.state.password === this.state.password2; 
    }

    //Registers a new user in both the authentication and user DB in firebase 
    register() {

        const newUser = {
            name: this.state.name,
            email: this.state.email,
        }

        const authData = {
            email: this.state.email,
            password: this.state.password,
            returnSecureToken: true
        }

        //Start authentication post first and if that works go into user db post
        if (this.isValidPassword()) {
            axios.post(signUpURL, authData)
                .then(response => {
                    console.log(response.data);
                    axios.post('https://grocerylist-e144a.firebaseio.com/users.json', newUser)
                        .then(response2 => {
                            console.log(response2.data);
                            Alert.alert('Thank you', 'You\'r now registerd and ready to make a grocery list!');
                            this.props.navigation.navigate('Lists');
                        })
                        .catch(error => {
                            console.log(String(error));
                            Alert.alert('ERROR', String(errror));
                        });
                })
                .catch(error => {
                    console.log(String(error));
                    Alert.alert('ERROR', String(error));
                });
        } else {
            Alert.alert('Mismatch', 'Passwords must be the same')
        }
    }

    render() {

        let reEnterPass; 

        if (this.isValidPassword()) {
            reEnterPass = <TextInput
            onChangeText={(text) => { this.setState({ password2: text }) }}
            secureTextEntry={true}
            style={styles.textInputPasswordGreen}
            textAlign={'center'}
            underlineColorAndroid={'rgba(255,127,42,255)'}
            />
        } else {
            reEnterPass = <TextInput
            onChangeText={(text) => { this.setState({ password2: text }) }}
            secureTextEntry={true}
            style={styles.textInputPasswordRed}
            textAlign={'center'}
            underlineColorAndroid={'rgba(255,127,42,255)'}
        />
        }

        return (
            <View style={styles.container}>
                <Text style={styles.text}>Name</Text>
                <TextInput
                    onChangeText={(text) => { this.setState({ name: text }) }}
                    style={styles.textInput}
                    textAlign={'center'}
                    underlineColorAndroid={'rgba(255,127,42,255)'}
                />

                <Text style={styles.text}>Email</Text>
                <TextInput
                    onChangeText={(text) => { this.setState({ email: text }) }}
                    keyboardType="email-address"
                    style={styles.textInput}
                    textAlign={'center'}
                    underlineColorAndroid={'rgba(255,127,42,255)'}
                />

                <Text style={styles.text}>Password</Text>
                <TextInput
                    onChangeText={(text) => { this.setState({ password: text }) }}
                    secureTextEntry={true}
                    style={styles.textInput}
                    textAlign={'center'}
                    underlineColorAndroid={'rgba(255,127,42,255)'}
                />

                <Text style={styles.text}>Renter Password</Text>
                {reEnterPass}

                <ButtonGL title="Register"
                    action={() => {
                        this.register();
                    }} />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -80
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
        marginBottom: 20,
    },
    textInputPasswordRed: {
        width: "60%",
        color: "#8c8c8c",
        justifyContent: 'center',
        fontSize: 20,
        padding: 10,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#e02918'
    },
    textInputPasswordGreen: {
        width: "60%",
        color: "#8c8c8c",
        justifyContent: 'center',
        fontSize: 20,
        padding: 10,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#17e046'
    },
    rowContainer: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});


export default registerSreen; 