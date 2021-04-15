import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import LoginErrorDialog from './LoginErrorDialog';

const Login = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginErrorDialogOpen, setLoginErrorDialogOpen] = useState(false);

    const adminUsername = 'admin';
    const adminPassword = '123456';

    const validateLogin = () => {
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
        // postLogin(email, password);
    }

    const onCloseLoginErrorDialog = () => {
        setLoginErrorDialogOpen(false);
    }
 
    const onClickRegisterButton = () => {
        props.navigation.navigate('Register');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Login
            </Text>
            <View style={styles.loginBlockContainer}>
                <View style={styles.textInputContainer}>
                    <TextInput 
                        style={styles.textInput}
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize='none'
                        placeholder="email"
                    />
                </View>
                <View style={styles.textInputContainer}>
                    <TextInput 
                        style={styles.textInput}
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="password"
                    />
                </View>
                <Button
                    style={styles.loginButton}
                    title="Login"
                    onPress={validateLogin}
                />
                <Button
                    style={styles.loginbutton}
                    title="Register"
                    onPress={onClickRegisterButton}
                />
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
        width: '60%',
        paddingTop: 10,
    },
    text: {
        fontSize: 36,
    },
    textInputContainer: {
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
        fontSize: 28,
        textAlign: 'center',
    },
});

export default Login;