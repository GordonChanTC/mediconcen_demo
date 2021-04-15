import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, TextInput, View, ScrollView } from 'react-native';
import { useClinics, useRegister } from '../../api/Api';
import { Picker } from '@react-native-picker/picker';
import TwoColumnTextInput from '../Common/TwoColumnTextInput';
import TwoColumnPicker from '../Common/TwoColumnPicker';
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
    const [clinicId, setClinicId] = useState(1);
    const [phone, setPhoneNum] = useState('');
    const [address, setAddress] = useState('');

    const [clinicsRes, getClinics] = useClinics(); 
    const [clinics, setClinics] = useState([]);

    const [isValid, setIsValid] = useState(Array(5).fill(true));
    const [errMsg, setErrMsg] = useState(Array(5).fill(''));

    const [registerRes, postRegister] = useRegister();

    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    let confirmTimoutId = useRef(); 

    useEffect(() => {
        getClinics();

        return () => {
            clearTimeout(confirmTimoutId.current);
        } 
    }, []);

    useEffect(() => {
        console.log(clinicsRes);
        setClinics(list => [...list, ...clinicsRes.data.list]);
    }, [clinicsRes.data.list]);

    useEffect(() => {
        if (registerRes.code === 200) {
            setIsConfirmDialogOpen(true);
            confirmTimoutId.current = setTimeout(() => {
                console.log('1 second');
            }, 1000);
        } else {
            if (registerRes.data.field) {
                setErrorHint(RegisterField[registerRes.data.field], false, registerRes.data.message);
            }
        }
    }, [registerRes.data]);

    const emptyFieldErrorMsg = field => `Enter ${field}`;
    const emptyRePasswdErrorMsg = () => `Confirm your password`;
    const invalidErrorMsg = field => `Invalid ${field}`;
    const notEnoughLengthErrorMsg = (field, minLen) => `Use ${minLen} or more for your ${field}`;
    const passwdNotMatchErrorMsg = () => `Two passwords didn't match`

    const onClickSubmitButton = () => {
        postRegister({
            email: 'admin@mediconcen.com',
            password: '123123',
            clinicId: 1,
            phoneNum: '98765432',
            address: 'ABC'
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

    // const isAllInputNotEmpty = (email.length && passwd.length && rePasswd.length && phone.length && address.length) !== 0;
    // const isAllInputValid = isValid.reduce((a, b) => a && b);
    const isAllInputNotEmpty = true;
    const isAllInputValid = true;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.inputContainer}>
                <TwoColumnTextInput
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
                <TwoColumnTextInput 
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
                <TwoColumnTextInput 
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
                <TwoColumnPicker
                    title="Clinic"
                    picker={
                        <Picker
                            style={styles.picker}
                            itemStyle={styles.pickerItem}
                            selectedValue={clinicId}
                            onValueChange={setClinicId}
                        >
                            {clinics ? clinics.map((item, index) => <Picker.Item key={index} label={item.name} value={item.id} />) : null}
                        </Picker>
                    }
                />
                <TwoColumnTextInput
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
                <TwoColumnTextInput
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
                    disabled={!(isAllInputNotEmpty && isAllInputValid)}
                />
            </View>
            
            <LoadingMask visible={clinicsRes.isFetching || registerRes.isFetching} />
            <RegisterConfirmDialog visible={isConfirmDialogOpen} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    text: {
        fontSize: 36,
    },
    inputContainer: {
        width: '80%',
        paddingTop: 10,
    },
    textInput: {
        width: '100%',
        fontSize: 24,
        textAlign: 'left',
    },
    picker: {
        width: '100%',
        height: 80,
        color: 'black',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    pickerItem: {
        width: '100%',
        height: '100%',
    },
})

export default Register;