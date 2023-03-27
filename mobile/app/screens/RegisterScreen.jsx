import React, { Component, useState } from 'react';
import { Pressable, StyleSheet, Text, SafeAreaView, TextInput } from 'react-native';
import { useRouter, Link } from "expo-router";


class RegisterScreen extends Component
//const RegisterScreen = (props) =>
{
    //console.log("register");

    render() {
        const router = useRouter();
        const [email, setEmail] = useState();
        const [emailValid, setEmailValid] = useState(false);
        const [first, setFirst] = useState();
        const [firstValid, setFirstValid] = useState(false);
        const [last, setLast] = useState();
        const [lastValid, setLastValid] = useState(false);
        const [password, setPassword] = useState();
        const [passwordValid, setPasswordValid] = useState(false);
        const [repassword, setRepassword] = useState();
        const [repasswordValid, setRepasswordValid] = useState(false);

        let bp = 'https://paradise-7.herokuapp.com/';

        //TODO
        const handleRegister = async event => {
            event.preventDefault();
            let obj = { login: username, password: password };
            let js = JSON.stringify(obj);
            try {
                console.log(bp + 'api/register');
                console.log(username + ' ' + password + '\n');
                const response = await fetch(bp + 'api/register',
                    {
                        method: 'POST',
                        body: js,
                        headers: { 'Content-Type': 'application/json' }
                    }
                );
                let res = JSON.parse(await response.text());
                if (res.id <= 0) {
                    console.log('User/Password combination incorrect');
                    // TODO: post message to UI
                }
                else {
                    var user = { firstName: res.firstName, lastName: res.lastName, id: res.id }
                    console.log('Login Successful');
                    console.log(user.firstName);
                    router.replace('./Home');
                }
            }
            catch (e) {
                alert(e.toString());
                console.log(e);
                return;
            }
        }

        const validateInfo = () => {

        }

        const validateEmail = () => { return email.match(/^[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z0-9]+$/); }

        const validateName = (name) => { return name.match(/^[A-Za-z]+$/); }

        const validatePassword = (pswrd) => {
            regex = /^(?=.*[0-9])(?=.*[!@#$%^&*()\-_=+:/\\|{}\[\]`~,.?;'"])[a-zA-Z0-9!@#$%^&*()\-_=+:/\\|{}\[\]`~,.?;'"]{7,15}$/;
            return pswrd.match(regex);
        }

        const checkPasswordsMatch = (pswrd1, pswrd2) => { return pswrd1 === pswrd2; }


        return (
            <SafeAreaView style={styles.home}>
                <Text id='emailCorrection' style={styles.inputCorrectionHidden}>
                    {`Please enter a valid email address`}
                </Text>
                <TextInput
                    id='email'
                    placeholder='Email'
                    autoComplete='email'
                    autoCorrect={false}
                    style={styles.input}
                    onChangeText={text => setEmail(text)}
                />

                <Text id='firstNameCorrection' style={styles.inputCorrectionHidden}>
                    {`Please enter a name`}
                </Text>
                <TextInput
                    id='firstName'
                    placeholder='First Name'
                    autoComplete='given-name'
                    autoCorrect={false}
                    style={styles.input}
                    onChangeText={text => setEmail(text)}
                />

                <Text id='lastNameCorrection' style={styles.inputCorrectionHidden}>
                    {`Please enter a name`}
                </Text>
                <TextInput
                    id='lastName'
                    placeholder='Last Name'
                    autoComplete='family-name'
                    autoCorrect={false}
                    style={styles.input}
                    onChangeText={text => setEmail(text)}
                />

                <Text id='passCorrection' style={styles.inputCorrectionHidden}>
                    {`Passwords must contain between 8 and 14 characters.\nPassword must contain at least one uppercase, one lowercase, one number, one special character.`}
                </Text>
                <TextInput
                    id='password'
                    placeholder='Password'
                    autoComplete='new-password'
                    autoCorrect={false}
                    secureTextEntry={true}
                    style={styles.input}
                    onChangeText={text => setEmail(text)}
                />
                <Text id='repasswordCorrection' style={styles.inputCorrectionHidden}>
                    {`Passwords must match.`}
                </Text>
                <TextInput
                    id='repassword'
                    placeholder='Retype Password'
                    autoComplete='new-password'
                    autoCorrect={false}
                    secureTextEntry={true}
                    style={styles.input}
                />
                <Pressable
                    style={styles.loginButton}
                    onPress={() => {

                    }}
                >
                    <Text style={styles.buttonText}>REGISTER</Text>
                </Pressable>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create
    ({
        buttonText:
        {
            color: 'white',
            fontWeight: 'bold',
            alignItems: 'center',
            fontSize: 24
        },
        home:
        {
            flex: 1,
            backgroundColor: '#51684a',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold'
        },
        input:
        {
            width: '60%',
            height: 50,
            backgroundColor: 'white',
            textAlign: 'center',
            padding: 10,
            borderWidth: 2,
            borderRadius: 30,
            borderColor: 'darkgray'
        },
        inputCorrectionHidden:
        {
            height: 0,
            width: 0
        },
        inputCorrection:
        {
            fontSize: 15,
            color: 'white',
            fontWeight: 'bold',
            justifyContent: 'center'
        },
        loginButton:
        {
            width: '60%',
            height: 60,
            backgroundColor: '#f8a313',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 2,
            borderRadius: 35,
            borderColor: '#cc8f38'
        }
    })

export default RegisterScreen;