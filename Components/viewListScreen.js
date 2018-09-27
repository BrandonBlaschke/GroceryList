import React from 'react';
import { View, Text, StyleSheet, SectionList, TouchableOpacity } from 'react-native';
import axios from 'react-native-axios';
import ButtonImage from './buttonImage';
import { connect } from 'react-redux';

class ViewListScreen extends React.Component {

    state = {

    }

    getItems() {
        console.log("get items");
    }

    trash() {
        console.log("trash item");
    }

    render() {

        list = [{ name: 'Item 1', value: 1 }, { name: 'Item 2', value: 1 }, { name: 'Item 3', value: 1 }, { name: 'Item 4', value: 1 }, { name: 'Item 5', value: 1 }];
        list2 = [{ name: 'Item 6', value: 0 }, { name: 'Item 7', value: 8 }, { name: 'Item 8', value: 0 }, { name: 'Item 9', value: 0 }, { name: 'Item 10', value: 0 }];

        return (
            <View style={styles.container}>
                <SectionList
                    sections={[
                        { title: this.props.listView, data: list },
                        { title: 'Picked Up', data: list2 }
                    ]}
                    renderItem={({ item }) => {

                        if (item.value === 1) {
                            return (
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={styles.rowContainerItem}>
                                        <TouchableOpacity style={{ flex: 3, flexDirection: 'row', justifyContent: 'space-between', marginRight: 10 }} onPress={() => { this.getItems() }}>
                                            <Text style={styles.text}>{item.name}</Text>
                                            <Text style={styles.text}>2 qt</Text>
                                        </TouchableOpacity>
                                        <ButtonImage src="trash" bgColor="#fff" width={40} height={40} action={() => { this.trash() }} />
                                    </View>
                                </View>
                            );
                        } else {
                            return (
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={styles.rowContainerItem}>
                                        <TouchableOpacity style={{ flex: 3, flexDirection: 'row', justifyContent: 'space-between', marginRight: 10 }} onPress={() => { this.getItems() }}>
                                            <Text style={styles.itemDoneText}>{item.name}</Text>
                                            <Text style={styles.text}>2 qt</Text>
                                        </TouchableOpacity>
                                        <ButtonImage src="trash" bgColor="#fff" width={40} height={40} action={() => { this.trash() }} />
                                    </View>
                                </View>
                            );
                        }
                    }
                    }
                    renderSectionHeader={({ section }) =>
                        <View style={styles.rowContainer}>
                            <Text style={styles.header}>{section.title}</Text>
                            <ButtonImage src="refresh" bgColor="#ff7f2a" width={50} height={50} action={() => { this.getItems() }} />
                            <ButtonImage src="plus" bgColor="#ff7f2a" width={50} height={50} action={() => { this.props.navigation.navigate("AddFood")  }} />
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
    rowContainerItem: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#ff7f2a',
        padding: 10,
        borderWidth: 2,
        marginTop: 5,
        marginBottom: 5,
        width: "90%",
        borderRadius: 20,

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
    itemDoneText: {
        color: "#ff7f2a",
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 6,
        marginBottom: 6,
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid'
    },
    title: {
        color: "#ff7f2a",
        fontSize: 40,
    },
});

export default connect(mapStateToProps)(ViewListScreen); 