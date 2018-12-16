import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ButtonImage from '../Components/buttonImage';

const ListItem = (props) => {

    let nameTitle = <Text style={styles.itemDoneText}>{props.name}</Text>;

    if (props.value) {
        nameTitle = <Text style={styles.text}>{props.name}</Text>;
    }

    //If the username and item that was added is the same person, don't dispaly the "Added By" text
    if (props.userName === props.addedBy) {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <View style={styles.rowContainerItem}>
                    <View style={styles.columns}>
                        <View style={styles.row}>
                            <TouchableOpacity style={{ flex: 3, flexDirection: 'row', justifyContent: 'space-between', marginRight: 10 }} onPress={() => { props.response() }}>
                                {nameTitle}
                                <Text style={styles.text}>{props.quantity}</Text>
                            </TouchableOpacity>
                            <ButtonImage src="trash" bgColor="#fff" width={40} height={40} action={() => { props.trash() }} />
                        </View> 
                    </View>
                </View>
            </View>
        );
    } else {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <View style={styles.rowContainerItem}>
                    <View style={styles.columns}>
                        <View style={styles.row}>
                            <TouchableOpacity style={{ flex: 3, flexDirection: 'row', justifyContent: 'space-between', marginRight: 10 }} onPress={() => { props.response() }}>
                                {nameTitle}
                                <Text style={styles.text}>{props.quantity}</Text>
                            </TouchableOpacity>
                            <ButtonImage src="trash" bgColor="#fff" width={40} height={40} action={() => { props.trash() }} />
                        </View> 
                        <Text style={styles.textSmall}>Added by {props.addedBy}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    rowContainerItem: {
        borderColor: '#ff7f2a',
        padding: 10,
        borderWidth: 2,
        marginTop: 5,
        marginBottom: 5,
        width: "90%",
        borderRadius: 20,
    },
    row: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    columns: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: -5, 
        width: "90%"
    },
    text: {
        color: "#ff7f2a",
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 6,
        marginBottom: 6,
    },
    textSmall: {
        color: "#b34700",
        fontSize: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 16
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