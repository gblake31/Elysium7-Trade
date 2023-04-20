import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Image, SafeAreaView, ScrollView, RefreshControl, Button, KeyboardAvoidingView } from 'react-native';
import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';

function CreateItemScreen(props) {
    const router = useRouter();

    let [itemName, setItemName] = useState("");
    let [itemPrice, setItemPrice] = useState("");
    let [itemImage, setItemImage] = useState("");
    let [itemDesc, setItemDesc] = useState("");
    let [itemCond, setItemCond] = useState("");
    let [message, setMessage] = useState("");
    let [itemCategory, setCategory] = useState(0);
    let [userId, setUserId] = useState();
    
    let item;

    const CREATE_ITEM_ENDPOINT = "http://paradise-7.herokuapp.com/api/createItem";
    const ADD_TO_USER_ENDPOINT = "http://paradise-7.herokuapp.com/api/addItemToUser";

    const fetchUser = async () => 
    {
        let token = await AsyncStorage.getItem('user_data');
        let temp = JSON.parse(token);
        setUserId(temp.id);
    }

    const createItem = async () =>
    {
        // incoming: sellerid, itemname, price, description, condition, image, category, listedtime
        console.log("create");
        let obj = {
            sellerid: userId,
            itemname: itemName, 
            price: itemPrice, 
            description: itemDesc,  
            condition: itemCond, 
            image: itemImage, 
            category: 0, 
            listedtime: "0"
        }

        try {
            let js = JSON.stringify(obj);
			const response = await fetch(CREATE_ITEM_ENDPOINT,
			{method: 'POST', body:js, headers:{'Content-Type': 'application/json'}});
			let res = JSON.parse(await response.text());
			if (res.error == '') {
				console.log("created item successfully!");
                console.log(res);
                await addToUser(res.itemid);
                router.replace('screens/Home');
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

    const addToUser = async (itemId) =>
    {
		let obj = {userid: userId, itemid: itemId}
		let js = JSON.stringify(obj);
		try {
			const response = await fetch(ADD_TO_USER_ENDPOINT,
			{method: 'POST', body:js, headers:{'Content-Type': 'application/json'}});
			let res = JSON.parse(await response.text());
			if (res.error == '') {
                console.log("added to inventory");
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
        fetchUser();
    }, [])

    return (
        <SafeAreaView style={styles.home}>
            <KeyboardAvoidingView>
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
                <View style={styles.row}>
                    <Button title="Upload Photo" onPress={() => uploadPhoto()}/>
                    <Button title="Take Photo" onPress={() => takePhoto()}/>
                </View>
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
                    onPress={() => createItem()}
                >
                    <Text>Submit</Text>
                </Pressable>
            </KeyboardAvoidingView>
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

export default CreateItemScreen;