import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Image, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import { useState, useEffect } from 'react';

function EditItemScreen(props) {
    const router = useRouter();

    let [itemName, setItemName] = useState("");
    let [itemPrice, setItemPrice] = useState("");
    let [itemImage, setItemImage] = useState("");
    let [itemDesc, setItemDesc] = useState("");
    let [itemCond, setItemCond] = useState("");
    let [message, setMessage] = useState("");
    let [isEditable, setEditable] = useState(false);
    let [itemCategory, setCategory] = useState(0)
    let [storedItem, setStoredItem] = useState({});
    
    let item;

    const UPDATE_ITEM_ENDPOINT = "http://paradise-7.herokuapp.com/api/updateItem";
    const DELETE_ITEM_ENDPOINT = "http://paradise-7.herokuapp.com/api/deleteItem";
    
    const [refreshing, setRefreshing] = React.useState(false);
    
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
        setRefreshing(false);
        }, 2000);
    }, []);


    const updateItem = async () =>
    {
        console.log("update");
        let obj = {
            itemid: storedItem._id,
            sellerid: storedItem.sellerid,
            itemname: itemName, 
            price: itemPrice, 
            description: itemDesc,  
            condition: itemCond, 
            image: itemImage, 
            category: itemCategory, 
            listedtime: "0"
        }

        try {
            let js = JSON.stringify(obj);
			const response = await fetch(UPDATE_ITEM_ENDPOINT,
			{method: 'POST', body:js, headers:{'Content-Type': 'application/json'}});
			let res = JSON.parse(await response.text());
			if (res.error == '') {
				console.log("updated item successfully!");
                router.back();
			}
			else {
				console.error(res.error);
			}
		}
		catch(e) {
			console.error(e.toString());
			return;
		}
    }

    const deleteItem = async () =>
    {
        console.log("delete");
		let obj = {itemid: storedItem._id, sellerid: storedItem.sellerid}
		let js = JSON.stringify(obj);
		try {
			const response = await fetch(DELETE_ITEM_ENDPOINT,
			{method: 'POST', body:js, headers:{'Content-Type': 'application/json'}});
			let res = JSON.parse(await response.text());
			if (res.error == '') {
                console.log("deleted successfully");
                router.push('./Inventory');
			}
			else {
				console.error(res.error);
			}
		}
		catch(e) {
			console.error(e.toString());
			return;
		}
    }

    const fetchItem = async () => 
    {
        item = await AsyncStorage.getItem('item_data');
        item = JSON.parse(item);

        await setItemName(item.itemname);
        await setItemPrice(item.price);
        await setItemDesc(item.description);
        await setItemCond(item.condition);
        await setItemImage(item.image);

        await setStoredItem(item);
    }

    useEffect(() => 
    {
        fetchItem();
    }, [])

    return (
        <SafeAreaView style={styles.home}>
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <Text style={styles.title}>Name: </Text>
                <TextInput 
                    style={styles.input}
                    placeholder='item name'
                    value={itemName}
                    onChangeText={text => setItemName(text)}
                />
                <Image 
                    source={{uri: itemImage}}
                    style={styles.profilepic}
                />
                <Text>Price:</Text>
                <TextInput 
                    style={styles.input}
                    placeholder='price'
                    value={itemPrice}
                    onChangeText={text => setItemPrice(text)}
                />
                <Text>Condition:</Text>
                <TextInput 
                    style={styles.input}
                    placeholder='condition'
                    value={itemCond}
                    onChangeText={text => setItemCond(text)}
                />
                <Text>Description:</Text>
                <TextInput 
                    style={styles.input}
                    placeholder='description'
                    value={itemDesc}
                    onChangeText={text => setItemDesc(text)}
                />
                <Pressable 
                    style={styles.button}
                    onPress={() => updateItem()}
                >
                    <Text>Submit</Text>
                </Pressable>
                <Pressable 
                    style={styles.button}
                    onPress={() => deleteItem()}
                >
                    <Text>Delete</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
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
        height: 'auto',
        width: 150,
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

export default EditItemScreen;