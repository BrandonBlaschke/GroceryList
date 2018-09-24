import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, SectionList } from 'react-native';
import ButtonImage from '../Components/buttonImage';
import axios from 'react-native-axios';
import { connect } from 'react-redux';

const link = 'https://grocerylist-e144a.firebaseio.com/lists.json';

class ListScreen extends React.Component {

    state = {
        lists: [],
        dates: {}, 
        loading: true,
    }

    componentDidMount() {

        let temp = link + '?orderBy="id"&equalTo="' + this.props.email + '"' 
        axios.get(temp)
            .then(res => {
                // console.log("-----LISTS-------");
                // console.log(res.data);

                let listNames = [];
                let listDates = {}; 
                let temp;
                for (let key in res.data) {
                    temp = { ...res.data[key] }
                    listNames.push(temp.name);
                    listDates[temp.name] = temp.date;  
                }

                this.setState({ lists: listNames, loading: false, dates: listDates });
            })
            .catch(error => {
                console.log(String(error)); 
                Alert.alert("ERROR", String(error));
                this.setState({ loading: false });
            });
    }

    render() {

        let lists = <Text>LOADING...</Text>
        
        if (!this.state.loading) {
            listNames = this.state.lists
            lists =
            <SectionList
                sections={[
                    { title: 'Your Lists', data: listNames},
                    { title: 'Joined Lists', data: ['List 3', 'List 4'] }
                ]}
                renderItem={({ item }) =>
                    <View style={styles.rowContainer}>
                        <Text style={styles.text}>{item}</Text>
                        <Text style={styles.text}>----------------------</Text>
                        <Text style={styles.text}>{this.state.dates[item]}</Text>
                    </View>}
                renderSectionHeader={({ section }) =>
                    <View style={styles.rowContainer}>
                        <Text style={styles.header}>{section.title}</Text>
                        <ButtonImage width={50} height={50} src="../assets/plus.png" action={() => this.props.navigation.navigate("NewList")} />
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

export default connect(mapStateToProps)(ListScreen); 