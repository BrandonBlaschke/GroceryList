import React from 'react'; 
import {View, Text, TextInput, StyleSheet, Alert} from 'react-native'; 
import ButtonGL from '../ui/buttonGL'; 
import axios from 'react-native-axios'; 
import {connect} from 'react-redux'; 

const link = 'https://grocerylist-e144a.firebaseio.com/lists.json'; 

class NewListScreen extends React.Component {

    state = {
        loading: false,
        listName: '',
    }

    createList() {
        const d = new Date(); 
        const today = d.getMonth() + 1  + "/" + d.getDate() + "/" + d.getFullYear(); 
        this.setState({loading: true}); 

        const listData = {
            id: this.props.email,
            date: today, 
            name: this.state.listName,
            author: this.props.name,
        }

        axios.post(link, listData)
        .then(response => {
            this.setState({loading: false});
            this.props.navigation.goBack(); 
        })
        .catch(error => {
            console.log(String(error)); 
            Alert.alert('ERROR', String(error)); 
        });

    }

    render() {

        let buttonTitle = <ButtonGL title="Create List" action={() => {this.createList()}}/>; 

        if (this.state.loading) {
            buttonTitle = <ButtonGL title="Creating..." action={() => {this.createList()}}/>
        }

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Create a new grocery list</Text>
                <Text style={styles.text}>Name</Text>
                <TextInput style={styles.textInput} onChangeText={(text) => {this.setState({listName: text})}}/>
                {buttonTitle}
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
        marginTop: -200
    },
    text: {
        color: "#ff7f2a",
        fontSize: 20,
    },
    title: {
        color: "#ff7f2a",
        fontSize: 30,
        marginBottom: 60, 
    },
    textInput: {
        width: "60%",
        color: "#000",
        justifyContent: 'center',
        fontSize: 20,
        padding: 10,
        marginBottom: 20,
    },
    rowContainer: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

function mapStateToProps(state) {
    return {
        email: state.email,
        name: state.name, 
    }
}

export default connect(mapStateToProps)(NewListScreen); 