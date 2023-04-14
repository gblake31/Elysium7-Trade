import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImageManipulator } from 'expo';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Image } from 'react-native';
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

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

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
            console.log(profilepic[0]);
            if (profilepic == 0) 
            {
                await setProfilePic('https://cdn.discordapp.com/attachments/301091812120985601/1096258949755457556/test100px.png');
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
            <Image 
                    source={{uri: profilepic}}
                    style={styles.profilepic}
            />
            <Text style={styles.title}>change profile</Text>
            <View style={styles.row}>
                <Text style={styles.label}>Username:</Text>
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
                <Text style={styles.label}>Current Password:</Text>
                <TextInput
                    style={styles.input}
                    placeholder='current password'
                    value={curPassword}
                    onChangeText={text => setCurPassword(text)}
                />
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>New Password:</Text>
                <TextInput
                    style={styles.input}
                    placeholder='new password'
                    value={newPassword}
                    onChangeText={text => setNewPassword(text)}
                />
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Confirm New Password:</Text>
                <Text>{passMessage}</Text>
                <TextInput
                    style={styles.input}
                    placeholder='confirm new password'
                    value={confirmNewPass}
                    onChangeText={text => setConfirmNewPass(text)}
                />
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Email:</Text>
                <TextInput
                    style={styles.input}
                    placeholder='email'
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
            </View>
            <Pressable title='UPDATE' onPress={update} style={styles.button}>
                <Text style={styles.buttonText}>update</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    button:
    {
        height: 65,
        padding: 10,
        backgroundColor: '#89964C',
        borderRadius: 25,
        marginVertical: 3,
        alignItems: 'center'
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
        backgroundColor: '#c2a583',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'flex-start',
        fontWeight: 'bold'
    },
    input:
    {
        flex: 4,
        height: 65,
        backgroundColor: '#fff',
        textAlign: 'left',
        padding: 10,
        borderWidth: 2,
        borderRadius: 25,
        borderColor: 'darkgray',
        fontSize: 18
    },
    label:
    {
        flex: 2,
        height: 65,
        backgroundColor: '#89964C',
        textAlign: 'center',
        padding: 10,
        borderRadius: 25,
        fontSize: 18
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
        marginVertical: 3
    },
    title:
    {
        fontFamily: 'Abibas',
        fontSize: 24,
        marginBottom: 18
    }
})

export default AccountManagement;