import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, TextInput, StyleSheet, Button, Pressable } from 'react-native';
import { useState, useEffect } from 'react';

function AccountManagement(props) {
    const router = useRouter();

    let [userMessage, setUserMessage] = useState("");
    let [passMessage, setPasswordMessage] = useState("");

    let [login, setLogin] = useState("");
    let [oldPassword, setOldPassword] = useState("");
    let [userID, setUserID] = useState("");
    let [curPassword, setCurPassword] = useState("");
    let [newPassword, setNewPassword] = useState("");
    let [confirmNewPass, setConfirmNewPass] = useState("");
    let [email, setEmail] = useState("");
    let [profilepic, setProfilePic] = useState(0);

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
               console.log("retrieved: " + JSON.stringify(userInfo))
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
            alert(e.toString());
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
            obj.password = newPassword.value;
        }
        else {
            obj.password = oldPassword;
        }

        console.log("updating w/ data: " + JSON.stringify(obj));
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
                console.log(user);
                await AsyncStorage.setItem('user_data', JSON.stringify(user));
                alert("PROFILE UPDATED");
            }
        }
        catch (e) {
            alert(e.toString());
            return;
        }
    }

    return (
        <View style={styles.home}>
            <View style={styles.flexL}>
                <Text style={styles.label}>Username:</Text>
                <Text>{userMessage}</Text>
                <Text style={styles.label}>Current Password:</Text>
                <Text style={styles.label}>New Password:</Text>
                <Text>{passMessage}</Text>
                <Text style={styles.label}>Email:</Text>
            </View>
            <View style={styles.flexR}>
                <TextInput
                    style={styles.input}
                    autocorrect={false}
                    placeholder='Username'
                    value={login}
                    onChangeText={text => setLogin(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='current password'
                    value={curPassword}
                    onChangeText={text => setCurPassword(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='new password'
                    value={newPassword}
                    onChangeText={text => setNewPassword(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='confirm new password'
                    value={confirmNewPass}
                    onChangeText={text => setConfirmNewPass(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='email'
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
            </View>
            <Button title='UPDATE' onPress={update}/>
            <Text>OLD PASSWORD ={oldPassword} !!!!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    flexL:
    {
        flex: 2
    },
    flexR:
    {
        flex: 4
    },
    home:
    {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#51684a',
        alignItems: 'center',
        justifyContent: 'flex-start',
        fontWeight: 'bold'
    },
    input:
    {
        height: 65,
        backgroundColor: 'white',
        textAlign: 'left',
        padding: 10,
        borderWidth: 2,
        borderRadius: 25,
        borderColor: 'darkgray',
        marginVertical: 3,
        fontSize: 18
    },
    label:
    {
        height: 65,
        backgroundColor: '#89964C',
        textAlign: 'center',
        padding: 10,
        borderRadius: 25,
        marginVertical: 3,
        fontSize: 18
    }
})

export default AccountManagement;