import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, TextInput, Image, ImageBackground } from 'react-native';
import { useRouter, Link } from "expo-router";
import RegisterScreen from './RegisterScreen';

function LoginScreen(props) 
{
    const router = useRouter();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [isErrorVisible, setErrorVisible] = useState(false);

    let bp = 'https://paradise-7.herokuapp.com/';
    var errorMsg = '';

    const handleLogin = async event =>
    {
        event.preventDefault();
        let obj = {login:username, password:password};
        let js = JSON.stringify(obj);
        try
        {
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
                errorMsg = 'User/Password combination incorrect';
                console.log(errorMsg);
                setErrorVisible(true);
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
        <View style={styles.home}>
            <ImageBackground 
                source={require('./images/loginreg-wooden-sign.png')}
                style={styles.sign}
            >
                <Image 
                    source={require('./images/dragonLogo.png')}
                    style={styles.logo}
                />
                <Text style={styles.welcome}>Welcome back!</Text>
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
                    <Text style={styles.buttonText}>Login</Text>
                </Pressable>
                <Text style={isErrorVisible ? styles.error : styles.hidden}>
                    Username/password incorrect
                </Text>
                <Text style={styles.registerText}>
                    Don't have an account?
                </Text>
                <Pressable style={styles.registerButton} >
                    <Text style={styles.buttonTextSmall}>Register</Text>
                </Pressable>
            </ImageBackground>
        </View>
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
    buttonTextSmall:
    {
        color: 'white',
        fontWeight: 'bold',
        alignItems: 'center',
        fontSize: 18
    },
    error:
    {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 18
    },
    hidden:
    {
        height: 0
    },
    home:
    {
        flex: 1,
        backgroundColor: '#51684a',
        alignItems: 'center',
        justifyContent: 'flex-start',
        fontWeight: 'bold'
    },
    input: 
    {
        width: '80%',
        height: 65,
        backgroundColor: 'white',
        textAlign: 'left',
        padding: 10,
        borderWidth: 2,
        borderRadius: 25,
        borderColor: 'darkgray',
        marginVertical: 3,
        fontSize: 18
    },
    loginButton:
    {
        width: '80%',
        height: 65,
        backgroundColor: '#234423',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        marginVertical: 6
    },
    logo:
    {
        width: 100,
        height: 100,
        position: 'absolute'
    },
    registerButton:
    {
        width: '30%',
        height: 55,
        backgroundColor: '#EC6E38',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        position: 'absolute',
        bottom: '24%',
        right: '17%'
    },
    registerText:
    {
        fontStyle: 'italic',
        fontSize: 12,
        position: 'absolute',
        bottom: '27%',
        left: '18%'
    },
    sign:
    {
        resizeMode: 'cover',
        width: '100%',
        height: '80%',
        alignItems: 'center'
    },
    welcome:
    {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Abibas',
        marginTop: '42%'
    }
})

export default LoginScreen;