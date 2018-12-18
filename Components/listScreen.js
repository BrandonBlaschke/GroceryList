import React from 'react';
import { StyleSheet, Text, View, Alert, SectionList, TouchableOpacity, ToastAndroid } from 'react-native';
import ButtonImage from '../Components/buttonImage';
import axios from 'react-native-axios';
import * as actionTypes from '../store/actions';
import { connect } from 'react-redux';
import styles from '../ui/styles'; 

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
                    temp = { ...res.data[key] };
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
                this.setState({
                    lists: listNames,
                    joinedLists: joinedList,
                    loading: false,
                    dates: listDates,
                    keys: listKeys
                });

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

    deleteList(listName) {
        let namesCopy;
        let joinedCopy;

        // Update the state to show list was deleted 
        if (this.state.lists.indexOf(listName) > -1) {
            namesCopy = [...this.state.lists];
            namesCopy.splice(this.state.lists.indexOf(listName), 1);
        } else {
            joinedCopy = [...this.state.joinedLists];
            joinedCopy.splice(this.state.joinedLists.indexOf(listName), 1);
        }

        let baseLink = 'https://grocerylist-e144a.firebaseio.com/lists';

        // Delete from DB 
        axios.delete(baseLink + '/' + this.state.keys[listName] + '.json', { name: listName })
            .then(response => {
                ToastAndroid.show(listName + " was deleted from", ToastAndroid.SHORT);
                this.setState({ lists: namesCopy, joinedList: joinedCopy });
            })
            .catch(error => {
                Alert.alert("ERROR", "Could not delete list");
                console.log(String(error));
            });
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
                        { title: 'Your Lists', data: listNames },
                        { title: 'Joined Lists', data: listJoined }
                    ]}
                    renderItem={({ item }) => {
                         
                        // If the list is a joined list then don't show the delete button so 
                        // they can't delete it 
                        if (this.state.lists.indexOf(item) > -1) {
                            return (
                                <View stlye={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                    <TouchableOpacity style={styles.rowContainer} onPress={() => { this.goToList(item) }}>
                                        <Text style={styles.textList}>{item}</Text>
                                        <Text style={styles.textList}>-------</Text>
                                        <Text style={styles.textList}>{this.state.dates[item]}</Text>
                                        <Text style={styles.textList}>-------</Text>
                                        <ButtonImage src="trash" bgColor="#fff" width={50} height={50} action={() => this.deleteList(item)} />
                                    </TouchableOpacity>
                                </View>);
                        } else {
                            return (
                            <View stlye={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <TouchableOpacity style={styles.rowContainer} onPress={() => { this.goToList(item) }}>
                                    <Text style={styles.textList}>{item}</Text>
                                    <Text style={styles.textList}>------------------</Text>
                                    <Text style={styles.textList}>{this.state.dates[item]}</Text>
                                </TouchableOpacity>
                            </View>);
                        }
                    }
                    }
                    renderSectionHeader={({ section }) => {

                        // Only display button options at the top 
                        if (section.title === "Your Lists") {
                            return (<View style={styles.rowContainer}>
                                <Text style={styles.header}>{section.title}</Text>
                                <ButtonImage src="refresh" bgColor="#ff7f2a" width={50} height={50} action={() => { this.getAllLists() }} />
                                <ButtonImage src="plus" bgColor="#ff7f2a" width={50} height={50} action={() => this.props.navigation.navigate("NewList")} />
                            </View>)
                        } else {
                            return (<View style={styles.rowContainer}>
                                <Text style={styles.header}>{section.title}</Text>
                            </View>)
                        }
                    }
                    }
                    keyExtractor={(item, index) => index}
                />
        }
        return (
            <View style={styles.listContainer}>
                {lists}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        name: state.name,
        email: state.email,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setListView: (listView) => dispatch({ type: actionTypes.SET_LIST_VIEW, value: listView }),
        setListID: (id) => dispatch({ type: actionTypes.SET_LIST_ID, value: id })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListScreen); 