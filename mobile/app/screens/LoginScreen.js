import React from 'react';
import { Pressable, StyleSheet, Text, SafeAreaView, TextInput } from 'react-native';
import { useRouter, Link } from "expo-router";

function LoginScreen(props) 
{
    const router = useRouter();
    return (
        <SafeAreaView style={styles.home}>
            <TextInput 
                placeholder='Username'
                autoComplete='username' 
                autoCorrect={false}
                style={styles.input}
            />
            <TextInput 
                placeholder='Password'
                autoComplete='current-password' 
                autoCorrect={false}
                secureTextEntry={true}
                style={styles.input}
            />
            <Pressable style={styles.loginButton}>
                <Text style={styles.buttonText}>LOGIN</Text>
            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create
({
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
        justifyContent: 'center',
        fontWeight: 'bold'
    },
    input: 
    {
        width: '60%',
        height: 50,
        backgroundColor: 'white',
        textAlign: 'center',
        padding: 10,
        borderWidth: 2,
        borderRadius: 30,
        borderColor: 'darkgray'
    },
    loginButton:
    {
        width: '60%',
        height: 60,
        backgroundColor: '#f8a313',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 35,
        borderColor: '#cc8f38'
    }
})

export default LoginScreen;