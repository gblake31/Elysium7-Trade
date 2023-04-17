import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView } from 'react-native';
import Item from '../components/Item';
import ItemList from '../components/ItemList';
import { Link, useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

function Home(props) {
    const router = useRouter();
    const [username, setUsername] = useState();
    const [search, setSearch] = useState("");
    const [condition, setCondition] = useState("");
    const [category, setCategory] = useState("");
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

    // TODO: <Link>s to inventory and acct mgmt will be replaced by a bottom navigation bar.

    return (
        <SafeAreaView style={styles.home}>
            <Text style={styles.title}>Welcome {username}!</Text>
            <ItemList search={search} condition={condition} category={category}/>
            <Link href='./Inventory'>
                <Text>INVENTORY</Text>
            </Link>
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
        </SafeAreaView>
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