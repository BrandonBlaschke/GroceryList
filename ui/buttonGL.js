import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

const ButtonGL = (props) => (
    <View style={styles.ButtonStyle}>
        <Button style={styles.Button}
            title={props.title}
            onPress={props.action}
            color="#ff7f2a"
        />
    </View>
);

const styles = StyleSheet.create({
    Button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        width: '80%',
    },
    ButtonStyle: {
        backgroundColor: "#ff7f2a",
        marginTop: 20, 
        borderRadius: 20,
        width: "60%", 
        borderWidth: 0, 
        overflow: 'hidden',
    }
});


export default ButtonGL; 