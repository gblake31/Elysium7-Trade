import React, { Component, useState } from 'react';
import { Pressable, StyleSheet, Text, SafeAreaView, TextInput, ScrollView } from 'react-native';
import { useRouter, Link } from "expo-router";


//class RegisterScreen extends Component
const RegisterScreen = (props) => {
    //console.log("register");

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [emailValid, setEmailValid] = useState(true);
    const [first, setFirst] = useState("");
    const [firstValid, setFirstValid] = useState(true);
    const [last, setLast] = useState("");
    const [lastValid, setLastValid] = useState(true);
    const [password, setPassword] = useState("");
    const [passwordValid, setPasswordValid] = useState(true);
    const [repassword, setRepassword] = useState("");
    const [repasswordValid, setRepasswordValid] = useState();

    const REGISTER_ENDPOINT = 'https://paradise-7.herokuapp.com/api/register';

    const handleRegister = async event => {
        if (!validateInfo()) {
            return;
        }
        console.log("Valid info");
        console.log("Checking for dupes");

        //event.preventDefault();
        let obj = {
            firstname: first,
            lastname: last,
            login: email,
            email: email,
            password: password
        };
        console.log(obj);

        try {
            const response = await fetch(REGISTER_ENDPOINT, {
                method: 'POST',
                body: JSON.stringify(obj),
                headers: { 'Content-Type': 'application/json' }
            });
            let res = JSON.parse(await response.text());
            if (res.id <= 0) {
                console.log('User already exists.');
                //setMessage("User already exists in the database");
                console.log(res.err);
            }
            else {
                var user = { firstName: res.firstName, lastName: res.lastName, id: res.id }
                console.log('Register Successful');
                router.replace('./LoginScreen');
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

    const validateEmail = () => {
        setEmailValid(email.match(/^[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z0-9]+$/));
    }

    const validateFirst = () => { setFirstValid(first.match(/^[A-Za-z]+$/)); }

    const validateLast = () => { setLastValid(last.match(/^[A-Za-z]+$/)); }

    const validatePassword = () => {
        regex = /^(?=.*[0-9])(?=.*[!@#$%^&*_])[a-zA-Z0-9!@#$%^&*_]{7,15}$/;
        setPasswordValid(password.match(regex));
    }

    const checkPasswordsMatch = () => { 
        setRepasswordValid(password.normalize() === repassword.normalize());
        console.log("Password: " + password + "\nRetyped Password: " + repassword);
        console.log("Passwords Match: " + repasswordValid);
    }


    return (
        <ScrollView contentContainerStyle={styles.home}>
            <Text id='emailCorrection' style={emailValid ? styles.inputCorrectionHidden : styles.inputCorrection}>
                {`Please enter a valid email address`}
            </Text>
            <TextInput
                placeholder='Email'
                autoComplete='email'
                autoCorrect={false}
                inputMode={'email'}
                style={styles.input}
                value={email}
                onEndEditing={validateEmail}
                onChangeText={setEmail}
            />

            <Text style={firstValid ? styles.inputCorrectionHidden : styles.inputCorrection}>
                {`Please enter a name`}
            </Text>
            <TextInput
                placeholder='First Name'
                autoComplete='given-name'
                autoCorrect={false}
                style={styles.input}
                value={first}
                onEndEditing={validateFirst}
                onChangeText={setFirst}
            />

            <Text style={lastValid ? styles.inputCorrectionHidden : styles.inputCorrection}>
                {`Please enter a name`}
            </Text>
            <TextInput
                placeholder='Last Name'
                autoComplete='family-name'
                autoCorrect={false}
                style={styles.input}
                value={last}
                onEndEditing={validateLast}
                onChangeText={setLast}
            />

            <Text style={passwordValid ? styles.inputCorrectionHidden : styles.inputCorrection}>
                {
                    `Passwords must contain between 8 and 14 characters.\n` +
                    `Password must contain at least one uppercase letter.\n` +
                    `Password must contain at least one lowercase letter.\n` +
                    `Password must contain at least one number.\n` +
                    `Password must contain at least one of the following characters: ` +
                    `!, @, #, $, %, ^, &, *, _.`
                }
            </Text>
            <TextInput
                placeholder='Password'
                autoComplete='new-password'
                autoCorrect={false}
                secureTextEntry={true}
                style={styles.input}
                values={password}
                onEndEditing={validatePassword}
                onChangeText={setPassword}
            />
            <Text style={repasswordValid ? styles.inputCorrectionHidden : styles.inputCorrection}>
                {`Passwords must match.`}
            </Text>
            <TextInput
                placeholder='Retype Password'
                autoComplete='new-password'
                autoCorrect={false}
                secureTextEntry={true}
                style={styles.input}
                value={repassword}
                onEndEditing={checkPasswordsMatch}
                onChangeText={setRepassword}
            />
            <Pressable
                style={styles.loginButton}
                onPress={handleRegister}
            >
                <Text style={styles.buttonText}>REGISTER</Text>
            </Pressable>
        </ScrollView>
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