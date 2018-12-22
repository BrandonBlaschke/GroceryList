import React from 'react';
import {Text, View, TextInput, Alert, ToastAndroid } from 'react-native';
import ButtonGL from '../ui/buttonGL';
import axios from 'react-native-axios'; 
import { connect } from 'react-redux';
import styles from '../ui/styles';

const link = 'https://grocerylist-e144a.firebaseio.com/lists';

class InviteScreen extends React.Component {

    state = {
        loading: false,
        userEmail: '',
    }

    invite() {

        this.setState({loading: true}); 

        axios.get(link + '/' + this.props.listId + '.json')
        .then(res => {
            newList = res.data.members; 
            newList.push(this.state.userEmail); 
            res.data.members = newList; 

            axios.patch(link + '/' + this.props.listId + '.json', res.data)
            .then(res => {
                this.setState({loading: false}); 
                ToastAndroid.show(this.state.userEmail + " was added to list", ToastAndroid.SHORT); 
            })
            .catch(err => {
                console.log(String(err));
                this.setState({ loading: false });
                Alert.alert("ERROR", "Can't invite user right now.");
            })
            
        })
        .catch(err => {
            console.log(String(err));
            this.setState({ loading: false });
            Alert.alert("ERROR", "Can't invite user right now");
        })
        
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Type in user's email to invite</Text>
                <TextInput style={styles.textInput}
                    onChangeText={(text) => { this.setState({ userEmail: text }) }}
                    style={styles.textInput}
                    textAlign={'center'}
                    underlineColorAndroid={'rgba(255,127,42,255)'} />
                <ButtonGL
                    title={this.state.loading ? "Working" : "Add User"}
                    action={() => {
                        this.invite()
                    }} />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        listId: state.listID
    }
};

export default connect(mapStateToProps)(InviteScreen); 