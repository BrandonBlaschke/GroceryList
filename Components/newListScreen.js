import React from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import ButtonGL from '../ui/buttonGL';
import axios from 'react-native-axios';
import { connect } from 'react-redux';
import styles from '../ui/styles'; 

const link = 'https://grocerylist-e144a.firebaseio.com/lists.json';

class NewListScreen extends React.Component {

    state = {
        loading: false,
        listName: '',
    }

    createList() {

        if (this.state.listName === '') {
            Alert.alert("Invalid Length", "List name can't be empty");
        } else {
            const d = new Date();
            const today = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
            this.setState({ loading: true });

            const listData = {
                id: this.props.email,
                date: today,
                name: this.state.listName,
                author: this.props.name,
                members: [this.props.email] 
            }

            axios.post(link, listData)
                .then(response => {
                    this.setState({ loading: false });
                    this.props.navigation.goBack();
                })
                .catch(error => {
                    console.log(String(error));
                    Alert.alert('ERROR', String(error));
                });
        }

    }

    render() {

        let buttonTitle = <ButtonGL title="Create List" action={() => { this.createList() }} />;

        if (this.state.loading) {
            buttonTitle = <ButtonGL title="Creating..." action={() => { this.createList() }} />
        }

        return (
            <View style={styles.container}>
                <Text style={styles.titleNewList}>Create a new grocery list</Text>
                <Text style={styles.text}>Name</Text>
                <TextInput 
                    style={styles.textInput} 
                    onChangeText={(text) => { this.setState({ listName: text }) }} />
                {buttonTitle}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        email: state.email,
        name: state.name,
    }
}

export default connect(mapStateToProps)(NewListScreen); 