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
        // fetch stored item token. taken from the link used to acces this page
        const token = await AsyncStorage.getItem('item_id');
        if (token != null) 
        {
            await loadItem(token);
        }
    }

    const loadItem = async (id) => {
        // API Call - retrieve data by item id
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


                await setItemName(item.itemname);
                await setItemPrice(item.price);
                await setItemDesc(item.description);
                await setItemCond(item.condition);
                await setItemImage(item.image);

                // db listing only stores seller id.
                // fetch more data on the user to fill out the page.
                await fetchSeller(item.sellerid);
                // stow item data to send to the edit page if requested.
                await setStoredItem(item);
            }
        } catch (e) 
        {
            console.error(e);
        }
        
        // fetch user data from saved token
        let user = await AsyncStorage.getItem('user_data');
        user = JSON.parse(user);
        // show edit button if user id matches the item's seller
        if (user.id == item.sellerid) 
        {
            setEditable(true);
            console.log("editable");
        }
        else
        {
            // console.log("NOT, " + user.id + " != " + item.sellerid);
        }
    }

    const fetchSeller = async (id) => {
        // server crashes if ObjectId gets an empty input. 
        // catch and return null and empty inputs.
        if (id == null || id == "") 
        {
            console.error("seller id empty, returning...");
            return;
        }
        // API Call - retrieve user (seller) by user id
        try {
            let obj = { userid: id };
            let js = JSON.stringify(obj);

            const response = await fetch(RETRIEVE_USER_INFO_ENDPOINT,{ 
                method: 'POST', 
                body: js, 
                headers: { 'Content-Type': 'application/json' } 
            });

            let res = JSON.parse(await response.text());
            
            try {
                if (res.error.length > 0) {
                    console.log(res.error);
                    return;
                }
                let userInfo = res.result;

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
            console.error("error getting item data");
            return;
        }
        try {
            let item_data_str = JSON.stringify(item_data);
            // stores item token. retrieved on edit page.
            await AsyncStorage.setItem('item_data', item_data_str);
            // redirect to edit page
            router.push('./EditItemScreen');
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => 
    {
        // get and display item data when screen is loaded
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
                
                <Text style={styles.label}>Price: ${itemPrice}</Text>
                <Text style={styles.label}>Condition: {itemCond}</Text>
                <Text style={styles.label}>Description: {itemDesc}</Text>
                <Image 
                    source={{uri: sellerPic}}
                    style={styles.profilepic}
                />
                <Text style={styles.label}>Seller:</Text>
                <Text style={styles.label}>{seller}</Text>
                <Text style={styles.label}>{sellerEmail}</Text>
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
    fieldText:
    {
        flex: 4,
        height: 65,
        textAlign: 'left',
        alignItems: 'center',
        padding: 10,
        borderRadius: 25,
        fontSize: 18
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
    label:
    {
        textAlign: 'left',
        padding: 10,
        borderRadius: 25,
        fontSize: 18,
        fontFamily: 'Habibi'
    },
    labelContainer:
    {
        flex: 2,
        height: 65,
        textAlign: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 15,
        marginLeft: 5
    },
    profilepic:
    {
        width: 200,
        height: 200,
        borderRadius: 25,
        margin: 18,
        backgroundColor: '#c8c0b8'
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