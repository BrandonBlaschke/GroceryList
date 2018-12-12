import React from 'react';
import { StyleSheet, Text, View, Alert, SectionList, TouchableOpacity } from 'react-native';
import ButtonImage from '../Components/buttonImage';
import axios from 'react-native-axios';
import * as actionTypes from '../store/actions';
import { connect } from 'react-redux';

const link = 'https://grocerylist-e144a.firebaseio.com/lists.json';

class ListScreen extends React.Component {

    state = {
        lists: [],
        dates: {}, 
        keys: {},
        joinedLists: [],
        loading: true,
    }

    getAllLists() {
        let temp = link + '?orderBy="id"';
        axios.get(temp)
            .then(res => {
                
                let listNames = [];
                let listDates = [];
                let listKeys = []; 
                let joinedList = []; 
                for (let key in res.data) {
                    temp = {...res.data[key]};
                    if (temp.id === this.props.email) {
                        listNames.push(temp.name);
                    }
                    listDates[temp.name] = temp.date;
                    listKeys[temp.name] = key; 

                    // Joined lists are lists that have the users email in the memebers list and 
                    // the its not the author's list. 
                    for (let i in temp.members) {
                        if (temp.members[i] === this.props.email && temp.members[i] !== temp.id) {
                            joinedList.push(temp.name);
                        }
                    }
                }
            this.setState({ lists: listNames, joinedLists: joinedList, loading: false, dates: listDates, keys: listKeys });
            
        })
        .catch(error => {
            console.log(String(error));
            Alert.alert("ERROR", String(error));
            this.setState({ loading: false });
        });
    }


    goToList(listName) {
        this.props.setListView(listName); 
        this.props.setListID(this.state.keys[listName]);
        this.props.navigation.navigate("ViewList");
    }

    componentDidMount() {
        this.getAllLists();
    }

    render() {

        let lists = <Text>LOADING...</Text>
        
        if (!this.state.loading) {
            listNames = this.state.lists;
            listJoined = this.state.joinedLists;
            lists = 
            <SectionList
                sections={[
                    { title: 'Your Lists', data: listNames},
                    { title: 'Joined Lists', data: listJoined}
                ]}
                renderItem={({ item }) =>
                    <TouchableOpacity style={styles.rowContainer} onPress={() => {this.goToList(item)}}>
                        <Text style={styles.text}>{item}</Text>
                        <Text style={styles.text}>----------------------</Text>
                        <Text style={styles.text}>{this.state.dates[item]}</Text>
                    </TouchableOpacity>}
                renderSectionHeader={({ section }) =>
                    <View style={styles.rowContainer}>
                        <Text style={styles.header}>{section.title}</Text>
                        <ButtonImage src="refresh" bgColor="#ff7f2a" width={50} height={50} action={() => {this.getAllLists()}}/>
                        <ButtonImage src="plus" bgColor="#ff7f2a" width={50} height={50} action={() => this.props.navigation.navigate("NewList")} />
                    </View>}
                keyExtractor={(item, index) => index}
            />
        }

        return (
            <View style={styles.container}>
                {lists}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 0
    },
    rowContainer: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    header: {
        flex: 1,
        backgroundColor: '#ff7f2a',
        color: '#fff',
        fontSize: 40,
        width: '100%',
    },
    text: {
        color: "#ff7f2a",
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 6,
        marginBottom: 6,
    }
});

function mapStateToProps(state) {
    return {
        name: state.name,
        email: state.email,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setListView: (listView) => dispatch({type: actionTypes.SET_LIST_VIEW, value: listView}),
        setListID: (id) => dispatch({type: actionTypes.SET_LIST_ID, value: id})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListScreen); 