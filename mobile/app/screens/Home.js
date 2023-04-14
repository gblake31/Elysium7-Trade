import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Product from '../components/Product';
import { Link, useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

function Home(props) {
    const router = useRouter();
    const [username, setUsername] = useState();
    let userData;

    const fetchUser = async () => 
    {
        const token = await AsyncStorage.getItem('user_data');
        if (token != null) 
        {
            userData = JSON.parse(token);
            setUsername(userData.username);
        }
    }

    useEffect(() => 
    {
        fetchUser();
    }, [])

    return (
        <View style={styles.home}>
            <Text style={styles.title}>Welcome {username}!</Text>
            <Product itemName={'Keyboard'} price={5} />
            <Product itemName={'Mouse'} price={10} />
            <Link href='./AccountManagement'>
                <Text>MANAGE ACCOUNT</Text>
            </Link>
            <Button 
                title='SIGN OUT'
                onPress={async () => 
                    {
                        const token = await AsyncStorage.getItem('user_data');
                        if (token != null)
                        {
                            await AsyncStorage.removeItem('user_data');
                            console.log("sign out success");
                            router.replace('./WelcomeScreen');
                            return true;
                        }
                        else
                        {
                            console.log("sign out error");
                        }
                    }} 
            />
        </View>
    );
}

const styles = StyleSheet.create
({
    home:
    {
        flex: 1,
        backgroundColor: '#c2a583',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold'
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

export default Home;