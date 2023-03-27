import React, { Component, useState } from 'react';
import { Pressable, StyleSheet, Text, SafeAreaView, TextInput } from 'react-native';
import { useRouter, Link } from "expo-router";


//class RegisterScreen extends Component
const RegisterScreen = (props) =>
{
    //console.log("register");

    //render() {
        //const router = useRouter();
        const [email, setEmail] = useState("");
        const [emailValid, setEmailValid] = useState(true);
        const [first, setFirst] = useState("");
        const [firstValid, setFirstValid] = useState(true);
        const [last, setLast] = useState("");
        const [lastValid, setLastValid] = useState(true);
        const [password, setPassword] = useState("");
        const [passwordValid, setPasswordValid] = useState(true);
        const [repassword, setRepassword] = useState("");
        const [repasswordValid, setRepasswordValid] = useState(true);

        let bp = 'https://paradise-7.herokuapp.com/';

        //TODO
        const handleRegister = async event => {
            if (!validateInfo()) {
                return;
            }

            event.preventDefault();
            let obj = { firstname: first, lastname: last, login: email, email: email, password: password };
            let js = JSON.stringify(obj);
            try {
                const response = await fetch(bp.buildPath('api/register'),
                    { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });
                let res = JSON.parse(await response.text());
                if (res.id <= 0) {
                    console.log('User already exists.');
                    setMessage("User already exists in the database");
                    console.log(res.err);
                }
                else {
                    var user = { firstName: res.firstName, lastName: res.lastName, id: res.id }
                    console.log('Register Successful');
                }
            }
            catch (e) {
                alert(e.toString());
                return;
            }
        };

        const validateInfo = () => {
            validateEmail();
            validateFirst();
            validateLast();
            validatePassword();
            checkPasswordsMatch();
            return emailValid && firstValid && lastValid && passwordValid && repasswordValid;
        }

        const updateEmailText = (input) => {
            setEmail(input);
        }

        const validateEmail = () => { 
            setEmailValid(email.match(/^[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z0-9]+$/)); 
        }

        const validateFirst = () => { setFirstValid(first.match(/^[A-Za-z]+$/)); }

        const validateLast = () => { setLastValid(last.match(/^[A-Za-z]+$/)); }

        const validatePassword = () => {
            regex = /^(?=.*[0-9])(?=.*[!@#$%^&*()\-_=+:/\\|{}\[\]`~,.?;'"])[a-zA-Z0-9!@#$%^&*()\-_=+:/\\|{}\[\]`~,.?;'"]{7,15}$/;
            setPasswordValid(password.match(regex));
        }

        const checkPasswordsMatch = () => { setRepassword(password === repassword); }


        return (
            <SafeAreaView style={styles.home}>
                <Text id='emailCorrection' style={emailValid ? styles.inputCorrectionHidden : styles.inputCorrection}>
                    {`Please enter a valid email address`}
                </Text>
                <TextInput
                    id='email'
                    placeholder='Email'
                    autoComplete='email'
                    autoCorrect={false}
                    inputMode={'email'}
                    style={styles.input}
                    value={email}
                    editable={true}
                    onEndEditing={validateEmail}
                    onChangeText={updateEmailText}
                />

                <Text id='firstNameCorrection' style={firstValid ? styles.inputCorrectionHidden : styles.inputCorrection}>
                    {`Please enter a name`}
                </Text>
                <TextInput
                    id='firstName'
                    placeholder='First Name'
                    autoComplete='given-name'
                    autoCorrect={false}
                    style={styles.input}
                    value={first}
                    onChangeText={text => setFirst(text)}
                />

                <Text id='lastNameCorrection' style={lastValid ? styles.inputCorrectionHidden : styles.inputCorrection}>
                    {`Please enter a name`}
                </Text>
                <TextInput
                    //id='lastName'
                    placeholder='Last Name'
                    autoComplete='family-name'
                    autoCorrect={false}
                    style={styles.input}
                    onChangeText={text => setLast(text)}
                />

                <Text id='passCorrection' style={passwordValid ? styles.inputCorrectionHidden : styles.inputCorrection}>
                    {`Passwords must contain between 8 and 14 characters.\nPassword must contain at least one uppercase, one lowercase, one number, one special character.`}
                </Text>
                <TextInput
                    id='password'
                    placeholder='Password'
                    autoComplete='new-password'
                    autoCorrect={false}
                    secureTextEntry={true}
                    style={styles.input}
                    onChangeText={text => setPassword(text)}
                />
                <Text id='repasswordCorrection' style={repasswordValid ? styles.inputCorrectionHidden : styles.inputCorrection}>
                    {`Passwords must match.`}
                </Text>
                <TextInput
                    id='repassword'
                    placeholder='Retype Password'
                    autoComplete='new-password'
                    autoCorrect={false}
                    secureTextEntry={true}
                    style={styles.input}
                    onTextChange={text => setRepassword(text)}
                />
                <Pressable
                    style={styles.loginButton}
                    onPress={handleRegister}
                >
                    <Text style={styles.buttonText}>REGISTER</Text>
                </Pressable>
            </SafeAreaView>
        );
    }
//}

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