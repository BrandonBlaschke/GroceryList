import React from 'react';
import { View, Text, StyleSheet, SectionList, TouchableOpacity } from 'react-native';
import axios from 'react-native-axios';
import ButtonImage from './buttonImage';
import ListItem from '../ui/listItem';
import { connect } from 'react-redux';

const link = 'https://grocerylist-e144a.firebaseio.com/lists';

class ViewListScreen extends React.Component {

    state = {
        foods: [],
        foodIds: {}
    }

    componentDidMount() {
        this.getItems();
    }

    getItems() {

        axios.get(link + '/' + this.props.listId + '.json')
        .then(res => {
            console.log(res); 
            let foodsObj = []; 
            let foodId = {}; 
            let temp; 
            for (let key in res.data.food) {
                temp = {...res.data.food[key]};
                foodsObj.push(temp); 
                foodId[temp.name] = key; 
            }

            this.setState({foods: foodsObj, foodIds: foodId}); 
        })
        .catch(err => {
            console.log(String(err)); 
        })
    }

    trash() {
        console.log("trash item");
    }

    render() {

        list2 = [{ name: 'Item 6', value: 0 }, { name: 'Item 7', value: 8 }, { name: 'Item 8', value: 0 }, { name: 'Item 9', value: 0 }, { name: 'Item 10', value: 0 }];

        return (
            <View style={styles.container}>
                <SectionList
                    sections={[
                        { title: this.props.listView, data: this.state.foods },
                        { title: 'Picked Up', data: list2 }
                    ]}
                    renderItem={({ item }) => (<ListItem name={item.name} value={item.value} quantity={item.quantity + "qt"} trash={this.trash} response={this.getItems} />)}
                    renderSectionHeader={({ section }) =>
                        <View style={styles.rowContainer}>
                            <Text style={styles.header}>{section.title}</Text>
                            <ButtonImage src="refresh" bgColor="#ff7f2a" width={50} height={50} action={() => { this.getItems() }} />
                            <ButtonImage src="plus" bgColor="#ff7f2a" width={50} height={50} action={() => { this.props.navigation.navigate("AddFood") }} />
                        </View>}
                    keyExtractor={(item, index) => index}

                />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        name: state.name,
        email: state.email,
        listView: state.listView,
        listId: state.listID
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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

    },
    title: {
        color: "#ff7f2a",
        fontSize: 40,
    },
});

export default connect(mapStateToProps)(ViewListScreen); 