import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, ScrollView } from 'react-native';
import { GetClinics } from '../../api/GetApi';
import { Picker } from '@react-native-picker/picker';
import TwoColumnTextInput from '../Common/TwoColumnTextInput';
import TwoColumnPicker from '../Common/TwoColumnPicker';
import WithLoadingMask from '../Common/LoadingMask';
import RectButton from '../Common/RectButton';
import { PostRegister } from '../../api/AuthApi';

const RegisterPage = props => {
    const [email, setEmail] = useState('');
    const [passwd, setPasswd] = useState('');
    const [rePasswd, setRePasswd] = useState('');
    const [clinicId, setClinicId] = useState(1);
    const [phone, setPhoneNum] = useState('');
    const [address, setAddress] = useState('');
    const [clinics, setClinics] = useState([]);

    const [isEmailValid, setIsEmailValid] = useState(true);
    const [emailError, setEmailError] = useState('');
    const [isPasswdValid, setIsPasswdValid] = useState(true);
    const [passwdError, setPasswdError] = useState('');
    const [isRePasswdValid, setIsRePasswdValid] = useState(true);
    const [rePasswdError, setRePasswdError] = useState('');
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [phoneError, setPhoneError] = useState('');
    const [isAddressValid, setIsAddressValid] = useState(true);
    const [addressError, setAddressError] = useState('');

    useEffect(() => {
        GetClinics().then(data => setClinics(data));
    }, []);

    const onClickSubmitButton = () => {
        if (passwd == rePasswd) {
            props.enableLoading();
            PostRegister(email, passwd, clinicId, phone, address).then((status, data) => {
                props.disableLoading();
            });
        } else {
            console.log('password not match!');
        }
    }

    const resetErrorHint = (setIsValid, setError) => {
        setIsValid(true);
        setError('');
    }

    const validateEmail = () => {
        let error = '';

        if (email.length == 0) {
            error = 'Email must be filled!'
        }

        setIsEmailValid(error.length == 0);
        setEmailError(error);
    };
    const validatePasswd = () => {
        let error = '';

        setIsPasswdValid(error.length == 0);
        setPasswdError(error);
    };
    const validateRepasswd = () => {};
    const validatePhone = () => {};
    const validateAddress = () => {};

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.inputContainer}>
                <TwoColumnTextInput
                    key="email"
                    title="Email"
                    isValid={isEmailValid}
                    errorMsg={emailError}
                    textInput={
                        <TextInput 
                            style={styles.textInput}
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize='none'
                            onFocus={() => resetErrorHint(setIsEmailValid, setEmailError)}
                            onBlur={() => validateEmail()}
                        />
                    }
                />
                <TwoColumnTextInput 
                    key="password"
                    title="Password"
                    isValid={isPasswdValid}
                    errorMsg={passwdError}
                    textInput={
                        <TextInput 
                            style={styles.textInput}
                            secureTextEntry={true}
                            value={passwd}
                            onChangeText={setPasswd}
                        />
                    }
                />
                <TwoColumnTextInput 
                    key="repassword"
                    title="Re-enter Password"
                    textInput={
                        <TextInput 
                            style={styles.textInput}
                            secureTextEntry={true}
                            value={rePasswd}
                            onChangeText={setRePasswd}
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
                    textInput={
                        <TextInput
                            style={styles.textInput}
                            value={phone}
                            onChangeText={setPhoneNum}
                        />
                    }
                />
                <TwoColumnTextInput
                    key="address"
                    title="Address"
                    textInput={
                        <TextInput
                            style={styles.textInput}
                            value={address}
                            onChangeText={setAddress}
                            autoCapitalize='none'
                        />
                    }
                />
                <RectButton
                    title="Sumbit"
                    onPress={onClickSubmitButton}
                    disabled={false}
                />
            </View>
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

const Register = WithLoadingMask(RegisterPage);

export default Register;