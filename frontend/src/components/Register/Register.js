import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { GetClinics } from '../../api/GetApi';
import { Picker } from '@react-native-picker/picker';

const Register = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [clinicId, setClinicId] = useState(0);
    const [phoneNum, setPhoneNum] = useState('');
    const [address, setAddress] = useState('');
    let clinics = {};

    useEffect(() => {
        clinics = GetClinics();
    }, []);

    const handlePickerOnValueChange = () => {}

    return (
        <View style={styles.container}>
            <Text>
                Register
            </Text>
            <View style={styles.inputContainer}>
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
                <View style={styles.textInputContainer}>
                    <TextInput 
                        style={styles.textInput}
                        secureTextEntry={true}
                        value={rePassword}
                        onChangeText={setRePassword}
                        placeholder="re-enter password"
                    />
                </View>
                <View>
                <Picker
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                    selectedValue={props.clinicId}
                    onValueChange={handlePickerOnValueChange}
                >
                    {clinics ? null : clinics.map(item => <Picker.Item label={item.name} value={item.id} />)}
                </Picker>
                </View>
            </View>
        </View>
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
    textInputContainer: {
        width: '100%',
        marginTop: 12,
        marginBottom: 12,
        paddingBottom: 2,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        alignItems: 'center',
    },
})

export default Register;