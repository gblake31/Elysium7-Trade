import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImageManipulator } from 'expo';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Image, KeyboardAvoidingView, Button, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';

function AccountManagement(props) {
    const router = useRouter();

    let [userMessage, setUserMessage] = useState("");
    let [passMessage, setPasswordMessage] = useState("");
    let [alertMessage, setAlertMessage] = useState("");

    let [login, setLogin] = useState("");
    let [oldPassword, setOldPassword] = useState("");
    let [userID, setUserID] = useState("");
    let [curPassword, setCurPassword] = useState("");
    let [newPassword, setNewPassword] = useState("");
    let [confirmNewPass, setConfirmNewPass] = useState("");
    let [email, setEmail] = useState("");
    let [profilepic, setProfilePic] = useState("");

    let bp = 'https://paradise-7.herokuapp.com/';

    // incoming: userid
    // outgoing: result, error
    // Get userID
    useEffect(() => {
        getUserInfo();
    }, []);
    
    const getUserInfo = async () => {
        try {
            let token = await AsyncStorage.getItem('user_data');
            let temp = JSON.parse(token);
            let obj = { userid: temp.id };
            let js = JSON.stringify(obj);

            const response = await fetch(bp + 'api/retrieveUserInfo',
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });
            let res = JSON.parse(await response.text());
            let userInfo = res.result;
            try {
                if (res.error.length > 0) {
                    console.log(res.error);
                    return;
                }
                /* result format: 
                id, login, password, firstname, lastname, email, ordered, favorited, listings, profilepicture, verified
                */
                await setUserID(userInfo._id);
                await setLogin(userInfo.login);
                await setOldPassword(userInfo.password);
                await setEmail(userInfo.email);
                await setProfilePic(userInfo.profilepicture);
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

    const update = async (event) => {
        let obj = {
            userid: userID,
            login: login,
            password: oldPassword,
            email: email,
            profilepicture: profilepic,
            verified: true
        };
        if (newPassword != "") {
            if (curPassword != oldPassword) {
                setPasswordMessage("Your current password is incorrect!");
                return;
            }
            if (newPassword.value !== confirmNewPass.value) {
                setPasswordMessage("Your passwords don't match!");
                return;
            }
            else {
                setPasswordMessage("");
            }
            obj.password = newPassword;
        }
        else {
            obj.password = oldPassword;
        }
        event.preventDefault();
        // incoming: userid, login, password, firstname, lastname, email, profilepicture, verified
        // outgoing: result, error

        let js = JSON.stringify(obj);
        try {
            const response = await fetch(bp + 'api/updateAccount',
                { 
                    method: 'POST', 
                    body: js, 
                    headers: { 'Content-Type': 'application/json' } 
                });
            let res = JSON.parse(await response.text());
            if (res.error.length > 0) {
                console.log(res.error);
                setUserMessage('Something Went Wrong');
            }
            else {
                var user = { id: userID, username: login, email: email };
                await AsyncStorage.setItem('user_data', JSON.stringify(user));
                setAlertMessage("PROFILE UPDATED");
            }
        }
        catch (e) {
            alert(e.toString());
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
            setProfilePic("data:image/jpeg;base64," + newPic.base64);
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
                setProfilePic("data:image/jpeg;base64," + newPic.base64);
            }
        }
        else 
        {
            setAlertMessage("Camera Permissions Denied. Check Device Settings.");
        }
    }

    

    return (
        <KeyboardAvoidingView style={styles.home}>
            <Image 
                    source={{uri: profilepic}}
                    style={styles.profilepic}
            />
            <Text>{alertMessage}</Text>
            <View style={styles.row}>
                <Button title="Upload Photo" onPress={() => uploadPhoto()}/>
                <Button title="Take Photo" onPress={() => takePhoto()}/>
            </View>
            <Text style={styles.title}>change profile</Text>
            <View style={styles.row}>
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>Username:</Text>
                </View>
                <Text>{userMessage}</Text>
                <TextInput
                    style={styles.input}
                    autocorrect={false}
                    placeholder='Username'
                    value={login}
                    onChangeText={text => setLogin(text)}
                />
            </View>
            <View style={styles.row}>
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>Current Password:</Text>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder='current password'
                    value={curPassword}
                    onChangeText={text => setCurPassword(text)}
                />
            </View>
            <View style={styles.row}>
                <View style={styles.labelContainer}>
                    <Text style={styles.labelNewPassword}>New Password:</Text>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder='new password'
                    value={newPassword}
                    onChangeText={text => setNewPassword(text)}
                />
            </View>
            <View style={styles.row}>
                <View style={styles.labelContainer}>
                    <Text style={styles.labelRepeatPassword}>Confirm New Password:</Text>
                </View>
                <Text>{passMessage}</Text>
                <TextInput
                    style={styles.input}
                    placeholder='confirm new password'
                    value={confirmNewPass}
                    onChangeText={text => setConfirmNewPass(text)}
                />
            </View>
            <View style={styles.row}>
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>Email:</Text>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder='email'
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
            </View>
            <View style={styles.row}>
                <Pressable title='UPDATE' onPress={update} style={styles.button}>
                    <Text style={styles.buttonText}>update</Text>
                </Pressable>
                <Pressable 
                    title='SIGN OUT'
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
                    <Text style={styles.buttonText}>sign out</Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
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
    labelNewPassword:
    {
        textAlign: 'center',
        padding: 10,
        borderRadius: 25,
        fontSize: 15,
        fontFamily: 'Habibi'
    },
    labelRepeatPassword:
    {
        textAlign: 'center',
        padding: 10,
        borderRadius: 25,
        fontSize: 12,
        fontFamily: 'Habibi'
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
        fontFamily: 'Habibi',
        fontSize: 24,
        marginBottom: 18
    }
})

export default AccountManagement;