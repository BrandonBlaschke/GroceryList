import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -120
    },
    regContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -80
    },
    text: {
        color: "#ff7f2a",
        fontSize: 20
    },
    titleNewList: {
        color: "#ff7f2a",
        fontSize: 30,
        marginBottom: 60
    },
    title: {
        color: "#ff7f2a",
        fontSize: 40
    },
    textInput: {
        width: "65%",
        color: "#8c8c8c",
        justifyContent: 'center',
        fontSize: 20,
        height: 50,
        padding: 10
    },
    listContainer: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 0
    },
    rowContainer: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15
    },
    header: {
        flex: 1,
        backgroundColor: '#ff7f2a',
        color: '#fff',
        fontSize: 40,
        width: '100%'
    },
    textList: {
        color: "#ff7f2a",
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 6,
        marginBottom: 6
    },
    textInputPasswordRed: {
        width: "60%",
        color: "#8c8c8c",
        justifyContent: 'center',
        fontSize: 20,
        padding: 10,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#e02918'
    },
    textInputPasswordGreen: {
        width: "60%",
        color: "#8c8c8c",
        justifyContent: 'center',
        fontSize: 20,
        padding: 10,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#17e046'
    }
});

export default styles; 