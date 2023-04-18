import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, ScrollView, RefreshControl } from 'react-native';
import { useState, useEffect } from 'react';

function ItemScreen(props) {
    const router = useRouter();

    let [seller, setSeller] = useState("unknown");
    let [sellerPic, setSellerPic] = useState("");
    let [sellerEmail, setSellerEmail] = useState("");
    let [itemName, setItemName] = useState("");
    let [itemPrice, setItemPrice] = useState("");
    let [itemImage, setItemImage] = useState("");
    let [itemDesc, setItemDesc] = useState("");
    let [itemCond, setItemCond] = useState("");
    let [message, setMessage] = useState("");
    let [isEditable, setEditable] = useState(false);
    let [storedItem, setStoredItem] = useState({});
    
    let item;
    
    const RETRIEVE_ITEM_INFO_ENDPOINT = "http://paradise-7.herokuapp.com/api/retrieveItemInfo";
    const RETRIEVE_USER_INFO_ENDPOINT = "http://paradise-7.herokuapp.com/api/retrieveUserInfo";
    
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
        setRefreshing(false);
        }, 2000);
    }, []);

    const fetchItem = async () => 
    {
        const token = await AsyncStorage.getItem('item_id');
        if (token != null) 
        {
            await loadItem(token);
        }
        // await AsyncStorage.removeItem('item_id');
    }

    const loadItem = async (id) => {
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
                console.log(res.error);
            }
            else
            {
                item = res.result;
                setItemName(item.itemname);
                
                await setItemPrice(item.price);
                await setItemDesc(item.description);
                await setItemCond(item.condition);
                await setItemImage(item.image);

                await fetchSeller(item.sellerid);
                await setStoredItem(item);
            }
        } catch (e) 
        {
            console.error(e);
        }

        let user = await AsyncStorage.getItem('user_data');
        user = JSON.parse(user);
        if (user.id == item.sellerid) 
        {
            setEditable(true);
            console.log("editable");
        }
        else
        {
            console.log("NOT, " + user.id + " != " + item.sellerid);
        }
    }

    const fetchSeller = async (id) => {
        if (id == null || id == "") 
        {
            return;
        }
        try {
            let obj = { userid: id };
            let js = JSON.stringify(obj);

            const response = await fetch(RETRIEVE_USER_INFO_ENDPOINT,
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });
            let res = JSON.parse(await response.text());
            let userInfo = res.result;
            try {
                if (res.error.length > 0) {
                    console.log(res.error);
                    return;
                }
                // set seller info
                await setSeller(userInfo.login);
                await setSellerPic(userInfo.profilepicture);
                await setSellerEmail(userInfo.email);
            }
            catch (e) {
                console.log('Something Went Wrong Trying to get UserInfo');
            }

        }
        catch (e) {
            console.error(e.toString());
            return;
        }
    }

    const editItem = async (item_data) => 
    {
        if (item_data == null) {
            return;
        }
        try {
            let item_data_str = JSON.stringify(item_data);
            await AsyncStorage.setItem('item_data', item_data_str);
            router.push('./EditItemScreen');
        } catch (e) {
            console.error(e);
        }
    }

    const eItem = (item_data) => 
    {
        console.log(item_data.itemname);
    }

    useEffect(() => 
    {
        fetchItem();
    }, [])

    return (
        <View style={styles.home}>
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <Text style={styles.title}>Name: {itemName}</Text>
                <Image 
                    source={{uri: itemImage}}
                    style={styles.profilepic}
                />
                <Text>Price: {itemPrice}</Text>
                <Text>Description: {itemDesc}</Text>
                <Image 
                    source={{uri: sellerPic}}
                    style={styles.profilepic}
                />
                <Text>Seller:</Text>
                <Text>{seller}</Text>
                <Text>{sellerEmail}</Text>
                <Pressable 
                    style={isEditable ? styles.button : styles.hidden}
                    // prevents the function from triggering on page load
                    onPress={() => editItem(storedItem)}
                >
                    <Text>Edit</Text>
                </Pressable>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
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
    hidden:
    {
        width: 0
    },
    home:
    {
        flex: 1,
        backgroundColor: '#947354',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'flex-start',
        fontWeight: 'bold'
    },
    input:
    {
        flex: 4,
        height: 65,
        backgroundColor: '#c8c0b8',
        textAlign: 'left',
        padding: 10,
        borderRadius: 25,
        fontSize: 18
    },
    label:
    {
        textAlign: 'center',
        padding: 10,
        borderRadius: 25,
        fontSize: 18,
        fontFamily: 'Habibi'
    },
    labelContainer:
    {
        flex: 2,
        height: 65,
        backgroundColor: '#8c8f4e',
        textAlign: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 25
    },
    profilepic:
    {
        width: 200,
        height: 200,
        borderRadius: 25,
        margin: 18
    },
    row: 
    {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 3,
    },
    title:
    {
        fontFamily: 'Abibas',
        fontSize: 24,
        marginBottom: 18
    }
})

export default ItemScreen;