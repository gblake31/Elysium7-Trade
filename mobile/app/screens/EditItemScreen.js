import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Image, SafeAreaView, ScrollView, RefreshControl, Button } from 'react-native';
import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';

function EditItemScreen(props) {
    const router = useRouter();

    let [itemName, setItemName] = useState("");
    let [itemPrice, setItemPrice] = useState("");
    let [itemImage, setItemImage] = useState("");
    let [itemDesc, setItemDesc] = useState("");
    let [itemCond, setItemCond] = useState("");
    let [message, setMessage] = useState("");
    let [isEditable, setEditable] = useState(false);
    let [itemCategory, setCategory] = useState(0);
    let [storedItem, setStoredItem] = useState({});
    
    let item;

    const UPDATE_ITEM_ENDPOINT = "http://paradise-7.herokuapp.com/api/updateItem";
    const DELETE_ITEM_ENDPOINT = "http://paradise-7.herokuapp.com/api/deleteItem";
    const DELETE_FROM_USER_ENDPOINT = "http://paradise-7.herokuapp.com/api/deleteItemFromUser";
    
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
                await deleteFromUser();
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

    const deleteFromUser = async () =>
    {
        console.log("delete");
		let obj = {userid: storedItem.sellerid, itemid: storedItem._id}
		let js = JSON.stringify(obj);
		try {
			const response = await fetch(DELETE_FROM_USER_ENDPOINT,
			{method: 'POST', body:js, headers:{'Content-Type': 'application/json'}});
			let res = JSON.parse(await response.text());
			if (res.error == '') {
                console.log("removed from inventory");
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

    const uploadPhoto = async () => 
    {
        const options = 
        {
            base64: true,
            quality: 0.1
        };
        let newPic = await ImagePicker.launchImageLibraryAsync(options);
        if (newPic != null) 
        {
            console.log("fileSize: ", newPic.fileSize);
            setItemImage("data:image/jpeg;base64," + newPic.base64);
        }
    }
    const takePhoto = async () => 
    {
        const cameraAccess = await ImagePicker.requestCameraPermissionsAsync();
        if (cameraAccess)
        {
            const options = 
            {
                base64: true,
                quality: 0.1
            };
            let newPic = await ImagePicker.launchCameraAsync(options);
            if (newPic != null) 
            {
                console.log("fileSize: ", newPic.fileSize);
                setItemImage("data:image/jpeg;base64," + newPic.base64);
            }
        }
        else 
        {
            setAlertMessage("Camera Permissions Denied. Check Device Settings.");
        }
    }

    useEffect(() => 
    {
        fetchItem();
    }, [])

    return (
        <View style={styles.home}>
            <Image 
                source={{uri: itemImage}}
                style={styles.profilepic}
            />
            <View style={styles.row}>
                <Button title="Upload Photo" onPress={() => uploadPhoto()}/>
                <Button title="Take Photo" onPress={() => takePhoto()}/>
            </View>
            <View style={styles.row}>
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>Item Name: </Text>
                </View>
                <TextInput 
                    style={styles.input}
                    placeholder='item name'
                    value={itemName}
                    onChangeText={text => setItemName(text)}
                />
            </View>
            <View style={styles.row}>
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>Description:</Text>
                </View>
                <TextInput 
                    style={styles.inputDesc}
                    placeholder='description'
                    value={itemDesc}
                    onChangeText={text => setItemDesc(text)}
                />
            </View>
            <View style={styles.row}>
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>Price ($):</Text>
                </View>
                <TextInput 
                    style={styles.input}
                    placeholder='price'
                    value={itemPrice}
                    onChangeText={text => setItemPrice(text)}
                />
            </View>
            <View style={styles.row}>
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>Condition:</Text>
                </View>
                <TextInput 
                    style={styles.input}
                    placeholder='condition'
                    value={itemCond}
                    onChangeText={text => setItemCond(text)}
                />
            </View>
            <View style={styles.row}>
                <Pressable 
                    style={styles.buttonRed}
                    onPress={() => deleteItem()}
                    
                >
                   <Text style={styles.buttonText}>Delete</Text>
                </Pressable>
                <Pressable 
                    style={styles.button}
                    onPress={() => updateItem()}
                >
                    <Text style={styles.buttonText}>Submit</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    button:
    {
        flex: 4,
        height: 65,
        width: 128,
        padding: 10,
        backgroundColor: '#8c8f4e',
        marginVertical: 3,
        marginLeft: 20,
        marginRight: 5,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonRed:
    {
        flex: 4,
        height: 65,
        width: 128,
        padding: 10,
        backgroundColor: '#aa0000',
        marginVertical: 3,
        marginHorizontal: 5,
        borderRadius: 10,
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
        borderRadius: 15,
        fontSize: 18,
        marginRight: 5
    },
    inputDesc:
    {
        flex: 4,
        height: 200,
        width: 150,
        backgroundColor: '#c8c0b8',
        textAlign: 'left',
        padding: 10,
        borderRadius: 15,
        fontSize: 18,
        alignItems: 'flex-start',
        marginRight: 5
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
        backgroundColor: '#EFBB62',
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
        columnGap: 5
    },
    title:
    {
        fontFamily: 'Abibas',
        fontSize: 24,
        marginBottom: 18
    }
})

export default EditItemScreen;