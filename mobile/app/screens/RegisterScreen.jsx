import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, KeyboardAvoidingView, Image, ImageBackground, View } from 'react-native';
import { useRouter, Link } from "expo-router";


//class RegisterScreen extends Component
const RegisterScreen = (props) => {
    //console.log("register");

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [emailValid, setEmailValid] = useState(true);
    const [login, setLogin] = useState("");
    const [loginValid, setLoginValid] = useState(true);
    const [password, setPassword] = useState("");
    const [passwordValid, setPasswordValid] = useState(true);
    const [repassword, setRepassword] = useState("");
    const [repasswordValid, setRepasswordValid] = useState(true);

    const REGISTER_ENDPOINT = 'https://paradise-7.herokuapp.com/api/register';

    const handleRegister = async event => {
        if (!validateInfo()) {
            return;
        }
        console.log("Valid info");
        console.log("Checking for dupes");

        //event.preventDefault();
        let obj = {
            login: login,
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
                var user = { login: res.login, id: res.id }
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
        setEmailValid(false);
        setLoginValid(false);
        setPasswordValid(false);
        setRepasswordValid(false);

        validateEmail();
        validateLogin();
        //validateFirst();
        //validateLast();
        validatePassword();
        checkPasswordsMatch();

        return emailValid && loginValid && passwordValid && repasswordValid;
    }

    const validateEmail = () => {
        setEmailValid(email.match(/^[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z0-9]+$/));
    }

    const validateLogin = () => { setLoginValid(login.match(/^([A-Za-z])[\w\d]+$/)); }

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
        <KeyboardAvoidingView behavior='position' contentContainerStyle={styles.home}>
            <ImageBackground
                source={require('./images/loginreg-wooden-sign.png')}
                style={styles.sign}
            >
                <Text id='emailCorrection' style={emailValid ? styles.hidden : styles.errorText}>
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

                <Text style={loginValid ? styles.hidden : styles.errorText}>
                    {`Please enter a valid display name`}
                </Text>
                <TextInput
                    placeholder='Username'
                    autoComplete='username-new'
                    autoCorrect={false}
                    style={styles.input}
                    value={login}
                    onEndEditing={validateLogin}
                    onChangeText={setLogin}
                />

                <Text style={passwordValid ? styles.hidden : styles.errorText}>
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
                    autoComplete='password-new'
                    autoCorrect={false}
                    secureTextEntry={true}
                    style={styles.input}
                    values={password}
                    onEndEditing={validatePassword}
                    onChangeText={setPassword}
                />
                <Text style={repasswordValid ? styles.hidden : styles.errorText}>
                    {`Passwords must match.`}
                </Text>
                <TextInput
                    placeholder='Retype Password'
                    autoComplete='password-new'
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
            </ImageBackground>
        </KeyboardAvoidingView>
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
            justifyContent: 'flex-start',
            fontWeight: 'bold'
        },
        sign:
        {
            resizeMode: 'cover',
            width: '100%',
            height: '80%',
            alignItems: 'center'
        },
        input:
        {
            width: '80%',
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
        hidden:
        {
            height: 0,
            width: 0
        },
        errorText:
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