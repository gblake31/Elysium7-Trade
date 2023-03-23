import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

function WelcomeScreen(props) {
    return (
        <View style={styles.home}>
            <View style={styles.title}>
                <Text>Welcome to Elysium7 Trade!</Text>
            </View>
            <View style={styles.loginButton}>
                <Button title="Login" onClick={() => console.log("login button")}/>
            </View>
            <View style={styles.registerButton}>
                <Button title="Register" onClick={() => console.log("register button")}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    home:
    {
        flex: 1,
        backgroundColor: '#c5825b',
        alignItems: 'center',
        justifyContent: 'flex-end',
        fontWeight: 'bold'
    },
    loginButton:
    {
        width: '100%',
        height: 80,
        color: 'white',
        backgroundColor: '#374c37',
        justifyContent: 'center'
    },
    registerButton:
    {
        width: '100%',
        height: 80,
        color: 'white',
        backgroundColor: '#852827',
        justifyContent: 'center'
    },
    title: 
    {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 200,
        position: 'absolute',
        top: '45%'
    }
})

export default WelcomeScreen;