import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import { useLogin } from '../../api/AuthApi';
import RectButton from '../Common/RectButton';
import TwoColumnTextInput from '../Common/TwoColumnTextInput';
import LoginErrorDialog from './LoginErrorDialog';

const Login = props => {
    const [email, setEmail] = useState('');
    const [passwd, setPasswd] = useState('');
    const [loginErrorDialogOpen, setLoginErrorDialogOpen] = useState(false);

    const [loginRes, postLogin] = useLogin();

    useEffect(() => {
        // if (username === adminUsername && password === adminPassword) {
        //     LoginDispatch({ type: 'LOGIN' });
        //     // props.navigation.navigate('Home');
        //     props.navigation.dispatch(StackActions.reset({
        //         index: 0,
        //         actions: [NavigationActions.navigate({ routeName: 'Home' })]
        //     }));
        // } else {
        //     setLoginErrorDialogOpen(true);
        // }
        console.log(loginRes)
        if (loginRes.code == 200) {
            if (loginRes.data.verified) {
                props.navigation.dispatch(StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'Home' })]
                }));
            }
        } else {
            console.log('error')
        }
    }, [loginRes.data]);

    const onClickLoginButton = () => {
        postLogin({
            email: email,
            password: passwd
        })
    }

    const onCloseLoginErrorDialog = () => {
        setLoginErrorDialogOpen(false);
    }

    const onClickRegisterButton = () => {
        props.navigation.navigate('Register');
    }

    const isAllInputNotEmpty = (email.length && passwd.length) !== 0;

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Login
            </Text>
            <View style={styles.loginBlockContainer}>
                <TwoColumnTextInput
                    key="email"
                    title="Email"
                    isValid
                    textInput={
                        <TextInput
                            style={styles.textInput}
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize='none'
                        />
                    }
                />
                <TwoColumnTextInput
                    key="passwd"
                    title="Password"
                    isValid
                    textInput={
                        <TextInput
                            style={styles.textInput}
                            secureTextEntry={true}
                            value={passwd}
                            onChangeText={setPasswd}
                        />
                    }
                />
                <View style={styles.buttonContainer}>
                    <RectButton
                        title="Login"
                        onPress={onClickLoginButton}
                        disabled={!isAllInputNotEmpty}
                    />
                    <RectButton
                        title="Register"
                        onPress={onClickRegisterButton}
                    />
                </View>
            </View>

            <LoginErrorDialog visible={loginErrorDialogOpen} onClose={onCloseLoginErrorDialog} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    loginBlockContainer: {
        width: '80%',
        paddingTop: 10,
    },
    text: {
        fontSize: 36,
    },
    inputContainer: {
        width: '100%',
        marginTop: 12,
        marginBottom: 12,
        paddingBottom: 2,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        alignItems: 'center',
    },
    textInput: {
        width: '100%',
        fontSize: 24,
        textAlign: 'left',
    },
    buttonContainer: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
    }
});

export default Login;