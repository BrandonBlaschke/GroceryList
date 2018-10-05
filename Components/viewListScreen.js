import React from 'react';
import { View, Text, StyleSheet, SectionList, Alert, ActivityIndicator } from 'react-native';
import axios from 'react-native-axios';
import ButtonImage from './buttonImage';
import ListItem from '../ui/listItem';
import { connect } from 'react-redux';

const link = 'https://grocerylist-e144a.firebaseio.com/lists';

class ViewListScreen extends React.Component {

    state = {
        foods: [],
        foodsOut: [],
        foodIds: {},
        loading: true
    }

    componentDidMount() {
        this.getItems();
    }

    getItems() {

        this.setState({ loading: true });
        axios.get(link + '/' + this.props.listId + '.json')
            .then(res => {
                // console.log(res); 
                let foodsObj = [];
                let foodsObjOut = [];
                let foodId = {};
                let temp;
                for (let key in res.data.food) {

                    //If teh value of the food is 1, place in the non picked up list
                    temp = { ...res.data.food[key] };
                    if (temp.value) {
                        foodsObj.push(temp);
                    } else {
                        foodsObjOut.push(temp);
                    }
                    foodId[temp.name] = key;
                }

                this.setState({ foods: foodsObj, foodsOut: foodsObjOut, foodIds: foodId, loading: false });
            })
            .catch(err => {
                console.log(String(err));
                this.setState({ loading: false });
                Alert.alert("ERROR", "Can't retrieve foods");
            })
    }

    //Makes a deep copy of ONLY a list of foods
    copyList(list) {
        let temp = [];
        for (let key in list) {
            temp.push({ ...list[key] })
        }
        return temp;
    }

    //Finds index of a food given a list
    findFood(foodName, list) {
        for (let i = 0; i < list.length; i++) {
            if (foodName === list[i].name) {
                return i;
            }
        }
    }

    //Changes the value of the food and in the data base 
    toggleFood(food) {
        let foodsCopy = this.copyList(this.state.foods);
        let foodsOutCopy = this.copyList(this.state.foodsOut);

        if (food.value) {

            foodsCopy.splice(this.findFood(food.name, foodsCopy), 1);
            food.value = 0;
            foodsOutCopy.push(food);
        } else {
            foodsOutCopy.splice(this.findFood(food.name, foodsOutCopy), 1);
            food.value = 1;
            foodsCopy.push(food);
        }

        this.setState({ foods: foodsCopy, foodsOut: foodsOutCopy });

        axios.patch(link + '/' + this.props.listId + '/' + 'food/' + this.state.foodIds[food.name] + '.json', food)
            .then(res => {
                // console.log(res);
            })
            .catch(err => {
                Alert.alert("ERROR", 'Could not update item to data base'); 
                console.log(String(err));
            })
    }

    trash() {
        console.log("trash item");
    }

    render() {

        let lists = <SectionList
            sections={[
                { title: this.props.listView, data: this.state.foods },
                { title: 'Picked Up', data: this.state.foodsOut }
            ]}
            renderItem={({ item }) => (<ListItem name={item.name} value={item.value} quantity={item.quantity + "qt"} trash={this.trash} response={() => this.toggleFood(item)} />)}
            renderSectionHeader={({ section }) =>
                <View style={styles.rowContainer}>
                    <Text style={styles.header}>{section.title}</Text>
                    <ButtonImage src="refresh" bgColor="#ff7f2a" width={50} height={50} action={() => { this.getItems() }} />
                    <ButtonImage src="plus" bgColor="#ff7f2a" width={50} height={50} action={() => { this.props.navigation.navigate("AddFood") }} />
                </View>}
            keyExtractor={(item, index) => index}

            />

        if (this.state.loading) {
            lists = <ActivityIndicator style={{justifyContent: 'center', marginTop: '50%'}} size={10} color="#ff7f2a" />
        }

        return (
            <View style={styles.container}>
                {lists}
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