import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, SafeAreaView } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import { useLogin } from '../../api/Api';
import RectButton from '../Common/RectButton';
import TwoRowTextInput from '../Common/TwoRowTextInput';
import LoginErrorDialog from './LoginErrorDialog';
import LoadingMask from '../Common/LoadingMask';

const Login = props => {
    const [email, setEmail] = useState('');
    const [passwd, setPasswd] = useState('');
    const [loginErrorDialogOpen, setLoginErrorDialogOpen] = useState(false);

    const [loginRes, postLogin] = useLogin();

    useEffect(() => {
        console.log(loginRes);
        if (loginRes.code == 200) {
            if (loginRes.data.verified) {
                props.navigation.dispatch(StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'Home' })]
                }));
            }
        } else {
            if (loginRes.data.message) {
                setLoginErrorDialogOpen(true);
            }
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
        <SafeAreaView style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>
                    {`Mediconcen Clinic`}
                </Text>
            </View>
            <View style={styles.loginBlockContainer}>
                <TwoRowTextInput
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
                <TwoRowTextInput
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

            <LoadingMask visible={loginRes.isFetching} />
            <LoginErrorDialog visible={loginErrorDialogOpen} onClose={onCloseLoginErrorDialog} />
        </SafeAreaView>
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
    titleContainer: {
        padding: 15
    },
    title: {
        fontSize: 36
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
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Login;