import React from 'react';
import { StyleSheet, Text, View, axios, TextInput, Button, Alert, SectionList } from 'react-native';
import ButtonImage from '../Components/buttonImage';

class ListScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <SectionList
                    sections={[
                        { title: 'Your Lists', data: ['List 1', 'List 2', 'List 5', 'List 6', 'List 1', 'List 2', 'List 5', 'List 6', 'List 1', 'List 2', 'List 5', 'List 6'] },
                        { title: 'Joined Lists', data: ['List 3', 'List 4'] }
                    ]}
                    renderItem={({ item }) => 
                    <View style={styles.rowContainer}>
                        <Text style={styles.text}>{item}</Text>
                        <Text style={styles.text}>----------------------</Text>
                        <Text style={styles.text}>01/01/2018</Text>
                    </View>}
                    renderSectionHeader={({ section }) => 
                    <View style={styles.rowContainer}>
                        <Text style={styles.header}>{section.title}</Text>
                        <ButtonImage width={50} height={50} src="../assets/plus.png" action={() => this.props.navigation.navigate("NewList")}/>
                    </View>}
                    keyExtractor={(item, index) => index}
                />
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


export default ListScreen; 