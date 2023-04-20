import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import ItemList from '../components/ItemList';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InventoryList from '../components/InventoryList';

function Inventory(props) {
    const router = useRouter();
    const [inventoryList, setInventoryList] = useState([]);

    const RETRIEVE_ITEM_INFO_ENDPOINT = "http://paradise-7.herokuapp.com/api/retrieveItemInfo";
    const GET_USER_INFO_ENDPOINT = "http://paradise-7.herokuapp.com/api/retrieveUserInfo";

    const getUserInfo = async () => {
        try {
            let token = await AsyncStorage.getItem('user_data');
            let temp = JSON.parse(token);
            let obj = { userid: temp.id };
            let js = JSON.stringify(obj);

            const response = await fetch(GET_USER_INFO_ENDPOINT,
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });
            let res = JSON.parse(await response.text());
            let userInfo = res.result;
            try {
                if (res.error.length > 0) {
                    console.error(res.error);
                    return;
                }
                await loadInventory(userInfo.listings);
            }
            catch (e) {
                console.error(e);
                console.log('Something Went Wrong Trying to get UserInfo');
            }

        }
        catch (e) {
            alert(e.toString());
            return;
        }
    }

    async function loadInventory(idArray) {
        for (i = 0; i < idArray.length; i++) 
        {
            await loadItem(idArray[i]);
        };
    }

    async function loadItem(id) {
        let js = JSON.stringify({ itemid: id });
        try 
        {
            const response = await fetch(RETRIEVE_ITEM_INFO_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: js
            });

            const res = JSON.parse(await response.text());

            if (res.error) 
            {
                console.error(res.error);
            }
            else
            {
                setInventoryList(inventoryList.push(res.result));
            }
        } catch (e) 
        {
            console.error(e);
        }
    }

    useEffect(() => 
    {
        getUserInfo();
    }, [])


    return (
        <View style={styles.home}>
            <Text style={styles.title}>Inventory</Text>
            <Pressable style={styles.button} onPress={() => {router.push("./CreateItemScreen")}}>
                <Text style={styles.buttonText}>Create New Listing</Text>
            </Pressable>
            <InventoryList itemList={inventoryList} />
        </View>
    );
}

const styles = StyleSheet.create({
    button:
    {
        height: 50,
        width: 300, 
        borderRadius: 10,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    buttonText:
    {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    home:
    {
        flex: 1,
        backgroundColor: '#947354',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold'
    },
    title: 
    {
        fontSize: 36,
        fontFamily: 'Aladin',
        marginVertical: 10
    }
})

export default Inventory;