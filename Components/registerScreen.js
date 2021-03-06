import React from 'react';
import {Text, TextInput, Alert, KeyboardAvoidingView } from 'react-native';
import axios from 'react-native-axios';
import ButtonGL from '../ui/buttonGL';
import {connect} from 'react-redux'; 
import styles from '../ui/styles'; 

const signUpURL = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAMVYCMXViqpZjt5cQ_GkuKthXTWFzsRAY"

class RegisterSreen extends React.Component {

    state = {
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
            name: this.props.name,
            email: this.props.email,
        }

        const authData = {
            email: this.props.email,
            password: this.state.password,
            returnSecureToken: true
        }

        //Start authentication post first and if that works go into user db post
        if (this.isValidPassword()) {
            axios.post(signUpURL, authData)
                .then(response => {
                    axios.post('https://grocerylist-e144a.firebaseio.com/users.json', newUser)
                        .then(response2 => {
                            (response2.data);
                            Alert.alert('Thank you', 'You\'re now registerd and ready to make a grocery list!');
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

        //Display red/green/ or not box around password 
        if (this.isValidPassword()) {
            reEnterPass = <TextInput
                onChangeText={(text) => { this.setState({ password2: text }) }}
                secureTextEntry={true}
                style={styles.textInputPasswordGreen}
                textAlign={'center'}
                underlineColorAndroid={'rgba(255,127,42,255)'}
            />
        } else if (this.state.password !== '') {
            reEnterPass = <TextInput
                onChangeText={(text) => { this.setState({ password2: text }) }}
                secureTextEntry={true}
                style={styles.textInputPasswordRed}
                textAlign={'center'}
                underlineColorAndroid={'rgba(255,127,42,255)'}
            />
        } else {
            reEnterPass = <TextInput
                onChangeText={(text) => { this.setState({ password2: text }) }}
                secureTextEntry={true}
                style={styles.textInput}
                textAlign={'center'}
                underlineColorAndroid={'rgba(255,127,42,255)'}
            />
        }

        return (
            <KeyboardAvoidingView style={styles.regContainer} behavior="padding" keyboardVerticalOffset={-180}>
                <Text style={styles.text}>Name</Text>
                <TextInput
                    onChangeText={(text) => { this.props.setName(text)}}
                    style={styles.textInput}
                    textAlign={'center'}
                    underlineColorAndroid={'rgba(255,127,42,255)'}
                />

                <Text style={styles.text}>Email</Text>
                <TextInput
                    onChangeText={(text) => { this.props.setEmail(text)}}
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
            </KeyboardAvoidingView >
        );
    }
};

function mapStateToProps(state) {
    return {
        email: state.email,
        name: state.name
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setEmail: (email) => dispatch({type: 'SET_EMAIL', value: email}),
        setName: (name) => dispatch({type: 'SET_NAME', value: name})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(RegisterSreen); 