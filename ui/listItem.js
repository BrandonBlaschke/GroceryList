import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ButtonImage from '../Components/buttonImage';

const ListItem = (props) => {

    let nameTitle = <Text style={styles.itemDoneText}>{props.name}</Text>;

    if (props.value) {
        nameTitle = <Text style={styles.text}>{props.name}</Text>;
    }


    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <View style={styles.rowContainerItem}>
                <TouchableOpacity style={{ flex: 3, flexDirection: 'row', justifyContent: 'space-between', marginRight: 10 }} onPress={() => { props.response() }}>
                    {nameTitle}
                    <Text style={styles.text}>{props.quantity}</Text>
                </TouchableOpacity>
                <ButtonImage src="trash" bgColor="#fff" width={40} height={40} action={() => { props.trash() }} />
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
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
    }
});

export default ListItem; 