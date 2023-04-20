import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView, Pressable } from 'react-native';
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

    const resetItemData = async () => 
    {
        const token = await AsyncStorage.getItem('item_id');
        if (token != null)
        {
            AsyncStorage.removeItem('item_id');
            console.log("clearing item data");
        }
    }

    useEffect(() => 
    {
        fetchUser();
        resetItemData();
    }, [])

    // TODO: <Link>s to inventory and acct mgmt will be replaced by a bottom navigation bar.

    return (
        <SafeAreaView style={styles.home}>
            <ItemList search={search} condition={condition} category={category}/>
            <View style={styles.row}>
                <Pressable
                    style={styles.button}
                    onPress={() => router.push('./Inventory')}
                >
                    <Text style={styles.buttonText}>INVENTORY</Text>
                </Pressable>
                <Pressable 
                    style={styles.button}
                    onPress={() => router.push('./AccountManagement')}
                >
                    <Text style={styles.buttonText}>MANAGE ACCOUNT</Text>
                </Pressable>
            </View>
            <Pressable
                style={styles.buttonRed}
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
            >
                <Text style={styles.buttonText}>Sign Out</Text>
            </Pressable>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create
({
    button:
    {
        height: 65,
        width: 128,
        padding: 10,
        backgroundColor: '#cc8f38',
        borderRadius: 25,
        marginVertical: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonRed:
    {
        height: 65,
        width: 128,
        padding: 10,
        backgroundColor: '#aa0000',
        borderRadius: 25,
        marginVertical: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText:
    {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        alignItems: 'center'
    },
    home:
    {
        flex: 1,
        backgroundColor: '#947354',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold'
    },
    row: 
    {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 3,
        columnGap: 5
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