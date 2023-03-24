import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Link } from "expo-router";

function WelcomeScreen(props) {
    return (
        <View style={styles.home}>
            <View style={styles.title}>
                <Text style={styles.title}>Welcome to Elysium7 Trade!</Text>
            </View>
            <View style={styles.loginButton}>
                <Link href="screens/LoginScreen">
                    <Text style={styles.buttonText}>LOGIN</Text>
                </Link>
            </View>
            <View style={styles.registerButton}>
                <Pressable onPress={() => console.log("register button")}>
                    <Text style={styles.buttonText}>REGISTER</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonText:
    {
        color: 'white',
        fontWeight: 'bold',
        alignItems: 'center',
        fontSize: 24
    },
    home:
    {
        flex: 1,
        backgroundColor: '#51684a',
        alignItems: 'center',
        justifyContent: 'flex-end',
        fontWeight: 'bold'
    },
    loginButton:
    {
        width: '100%',
        height: 80,
        backgroundColor: '#f8a313',
        justifyContent: 'center',
        alignItems: 'center'
    },
    registerButton:
    {
        width: '100%',
        height: 80,
        backgroundColor: '#852827',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: 
    {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24,
        position: 'absolute',
        top: '33%',
        alignItems: 'center'
    }
})

export default WelcomeScreen;