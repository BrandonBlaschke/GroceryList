import React from 'react'; 
import {View, Text, StyleSheet} from 'react-native'; 
import axios from 'react-native-axios'; 
import {connect} from 'react-redux'; 

class ViewListScreen extends React.Component {

    state = {

    }

    render() {

        return (
            <View style={styles.container}>
                <Text>View List Screen </Text>
                <Text>Viewing {this.props.listView}</Text>
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
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: -120
    },
    text: {
      color: "#ff7f2a",
      fontSize: 20,
    },
    title: {
      color: "#ff7f2a",
      fontSize: 40,
    },
  });

export default connect(mapStateToProps)(ViewListScreen); 