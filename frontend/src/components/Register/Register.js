import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, TextInput, View, ScrollView, SafeAreaView } from 'react-native';
import { useRegister } from '../../api/Api';
import TwoRowTextInput from '../Common/TwoRowTextInput';
import LoadingMask from '../Common/LoadingMask';
import RectButton from '../Common/RectButton';
import { isEmail, isPhone } from '../Common/Validation';
import RegisterConfirmDialog from './RegisterConfirmDialog';

const RegisterField = Object.freeze({
    email: 0,
    passwd: 1,
    rePasswd: 2,
    phone: 3,
    address: 4
});

const Register = props => {
    const [email, setEmail] = useState('');
    const [passwd, setPasswd] = useState('');
    const [rePasswd, setRePasswd] = useState('');
    const [phone, setPhoneNum] = useState('');
    const [address, setAddress] = useState('');

    const [isValid, setIsValid] = useState(Array(5).fill(true));
    const [errMsg, setErrMsg] = useState(Array(5).fill(''));

    const [registerRes, postRegister] = useRegister();

    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    let confirmTimoutId = useRef(); 

    useEffect(() => {
        return () => {
            clearTimeout(confirmTimoutId.current);
        } 
    }, []);

    useEffect(() => {
        if (registerRes.code === 200) {
            // setIsConfirmDialogOpen(true);
            // confirmTimoutId.current = setTimeout(() => {
            //     props.navigation.goBack();
            //     setIsConfirmDialogOpen(false);
            // }, 1000);
        } else {
            if (registerRes.data.field) {
                setErrorHint(RegisterField[registerRes.data.field], false, registerRes.data.message);
            }
        }
    }, [registerRes.data]);

    const emptyFieldErrorMsg = field => `Enter ${field}`;
    const emptyRePasswdErrorMsg = () => `Confirm your password`;
    const invalidErrorMsg = field => `Invalid ${field}`;
    const notEnoughLengthErrorMsg = (field, minLen) => `Use at least ${minLen} characters for your ${field}`;
    const passwdNotMatchErrorMsg = () => `Two passwords didn't match`

    const onClickSubmitButton = () => {
        postRegister({
            email: email,
            password: passwd,
            phoneNum: phone,
            address: address
        })
    };


    const setErrorHint = (index, valid=true, err='') => {
        let newIsValid = [...isValid];
        newIsValid[index] = valid;
        let newError = [...errMsg];
        newError[index] = err;

        setIsValid(newIsValid);
        setErrMsg(newError);
    }

    const validateEmail = () => {
        let error = '';
        const fieldName = 'email';

        if (email.length == 0) {
            error = emptyFieldErrorMsg(fieldName);
        } else if (!isEmail(email)) {
            error = invalidErrorMsg(fieldName);
        }

        setErrorHint(RegisterField.email, error.length == 0, error);
    };
    
    const validatePasswd = () => {
        let error = '';
        const fieldName = 'password';
        
        if (passwd.length == 0) {
            error = emptyFieldErrorMsg(fieldName);
        } else if (passwd.length < 6) {
            error = notEnoughLengthErrorMsg(fieldName, 6);
        }
        
        setErrorHint(RegisterField.passwd, error.length == 0, error);
    };
    
    const validateRepasswd = () => {
        let error = '';
        
        if (rePasswd.length == 0) {
            error = emptyRePasswdErrorMsg();
        } else if (passwd !== rePasswd) {
            error = passwdNotMatchErrorMsg();
        }
        
        setErrorHint(RegisterField.rePasswd, error.length == 0, error);
    };
    
    const validatePhone = () => {
        let error = '';
        const fieldName = 'phone number';
        
        if (phone.length == 0) {
            error = emptyFieldErrorMsg(fieldName);
        } else if (!isPhone(phone)) {
            error = invalidErrorMsg(fieldName);
        }
        
        setErrorHint(RegisterField.phone, error.length == 0, error);
    };
    
    const validateAddress = () => {
        let error = '';
        const fieldName = 'address';
        
        if (address.length == 0) {
            error = emptyFieldErrorMsg(fieldName);
        }
        
        setErrorHint(RegisterField.address, error.length == 0, error);
    };

    const isAllInputNotEmpty = () => (email.length && passwd.length && rePasswd.length && phone.length && address.length) !== 0;
    const isAllInputValid = () => isValid.reduce((a, b) => a && b);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <View style={styles.inputContainer}>
                    <TwoRowTextInput
                        key="email"
                        title="Email"
                        isValid={isValid[RegisterField.email]}
                        errorMsg={errMsg[RegisterField.email]}
                        textInput={
                            <TextInput 
                                style={styles.textInput}
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize='none'
                                onFocus={() => setErrorHint(RegisterField.email)}
                                onBlur={validateEmail}
                            />
                        }
                    />
                    <TwoRowTextInput 
                        key="password"
                        title="Password"
                        isValid={isValid[RegisterField.passwd]}
                        errorMsg={errMsg[RegisterField.passwd]}
                        textInput={
                            <TextInput 
                                style={styles.textInput}
                                secureTextEntry={true}
                                value={passwd}
                                onChangeText={setPasswd}
                                onFocus={() => setErrorHint(RegisterField.passwd)}
                                onBlur={validatePasswd}
                            />
                        }
                    />
                    <TwoRowTextInput 
                        key="repassword"
                        title="Re-enter Password"
                        isValid={isValid[RegisterField.rePasswd]}
                        errorMsg={errMsg[RegisterField.rePasswd]}
                        textInput={
                            <TextInput 
                                style={styles.textInput}
                                secureTextEntry={true}
                                value={rePasswd}
                                onChangeText={setRePasswd}
                                onFocus={() => setErrorHint(RegisterField.rePasswd)}
                                onBlur={validateRepasswd}
                            />
                        }
                    />
                    <TwoRowTextInput
                        key="phone"
                        title="Phone Number"
                        isValid={isValid[RegisterField.phone]}
                        errorMsg={errMsg[RegisterField.phone]}
                        textInput={
                            <TextInput
                                style={styles.textInput}
                                value={phone}
                                onChangeText={setPhoneNum}
                                onFocus={() => setErrorHint(RegisterField.phone)}
                                onBlur={validatePhone}
                            />
                        }
                    />
                    <TwoRowTextInput
                        key="address"
                        title="Address"
                        isValid={isValid[RegisterField.address]}
                        errorMsg={errMsg[RegisterField.address]}
                        textInput={
                            <TextInput
                                style={styles.textInput}
                                value={address}
                                onChangeText={setAddress}
                                autoCapitalize='none'
                                onFocus={() => setErrorHint(RegisterField.address)}
                                onBlur={validateAddress}
                            />
                        }
                    />
                    <RectButton
                        title="Sumbit"
                        onPress={onClickSubmitButton}
                        disabled={!(isAllInputNotEmpty() && isAllInputValid())}
                    />
                </View>
                
                <LoadingMask visible={registerRes.isFetching} />
                <RegisterConfirmDialog visible={isConfirmDialogOpen} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    scrollViewContainer: {
        width: '80%',
        padding: 10,
        flexDirection: 'column',
        alignSelf: 'center',
    },
    text: {
        fontSize: 36,
    },
    inputContainer: {
        width: '100%',
        paddingTop: 10,
    },
    textInput: {
        width: '100%',
        fontSize: 24,
        textAlign: 'left',
    }
})

export default Register;