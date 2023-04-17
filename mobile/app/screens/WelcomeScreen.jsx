import React, { useEffect } from 'react';
import { ImageBackground, StyleSheet, Text, View, Image } from 'react-native';
import { Link, useRouter } from "expo-router";
import { loadAsync, useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';

const bg = require('./images/map.jpg');

function WelcomeScreen() {
    const router = useRouter();
    
    const fetchUser = async () => 
    {
        const token = await AsyncStorage.getItem('user_data');
        if (token != null) 
        {
            console.log(token);
            console.log('Logging in ' + JSON.parse(token).login);
            router.replace('screens/Home');
        }
    }

    useEffect(() => 
    {
        fetchUser();
    }, [])

    const [fontsLoaded] = useFonts({
        'Abibas': require('../assets/fonts/Abibas.otf'),
        'Habibi': require('../assets/fonts/Habibi-Regular.ttf')
    });

    console.log("welcome");

    if(!fontsLoaded) return null;


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
                <Link href="screens/RegisterScreen">
                    <Text style={styles.buttonText}>REGISTER</Text>
                </Link>
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
        justifyContent: 'center',
        fontWeight: 'bold'
    },
    loginButton:
    {
        width: '80%',
        height: 80,
        backgroundColor: '#f8a313',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        marginVertical: 10
    },
    mapBg:
    {

    },
    registerButton:
    {
        width: '80%',
        height: 80,
        backgroundColor: '#852827',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        marginVertical: 10
    },
    title:
    {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24,
        position: 'absolute',
        top: '33%',
        alignItems: 'center',
        fontFamily: 'Abibas'
    }
})

export default WelcomeScreen;