import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, SafeAreaView, TextInput, Alert } from 'react-native';
import { useRouter, Link } from "expo-router";

function LoginScreen(props) 
{
    const router = useRouter();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    let bp = 'https://paradise-7.herokuapp.com/';
    
    const handleLogin = async event =>
    {
        event.preventDefault();
        let obj = {login:username, password:password};
        let js = JSON.stringify(obj);
        try
        {
            console.log(bp + 'api/login');
            console.log(username + ' ' + password + '\n');
            const response = await fetch(bp + 'api/login',
            {
                method:'POST', 
                body:js, 
                headers:{'Content-Type':'application/json'}
            }
            );
            let res = JSON.parse(await response.text());
            if (res.id <= 0)
            {
                console.log('User/Password combination incorrect');
                // TODO: post message to UI
            }
            else
            {
                var user = {firstName:res.firstName, lastName:res.lastName, id:res.id}
                console.log('Login Successful');
                console.log(user.firstName);
                router.replace('./Home');
            }
        }
        catch(e)
        {
            alert(e.toString());
            console.log(e);
            return;
        }
    }

    return (
        <SafeAreaView style={styles.home}>
            <TextInput 
                placeholder='Username'
                autoComplete='username' 
                autoCorrect={false}
                style={styles.input}
                value={username}
                onChangeText={text => setUsername(text)}
            />
            <TextInput 
                placeholder='Password'
                autoComplete='current-password' 
                autoCorrect={false}
                secureTextEntry={true}
                style={styles.input}
                onChangeText={text => setPassword(text)}
                value={password}
            />
            <Pressable style={styles.loginButton} onPress={handleLogin}>
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