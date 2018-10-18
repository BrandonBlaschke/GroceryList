import React from 'react';
import { StyleSheet, Text, View, TextInput, Alert, ToastAndroid } from 'react-native';
import ButtonGL from '../ui/buttonGL';
import axios from 'react-native-axios'; 
import { connect } from 'react-redux';

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

function mapStateToProps(state) {
    return {
        listId: state.listID
    }
};

export default connect(mapStateToProps)(InviteScreen); 