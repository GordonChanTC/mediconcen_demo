import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, Button } from  'react-native';
import { Picker } from '@react-native-picker/picker';

const SearchBar = props => {
    const handlePickerOnValueChange = value => {
        props.setSearchType(value)
    };

    const handleInputOnChange = text => {
        props.setSearch(text);
    }

    // const handleButtonOnPress = () => {
    //     props.onSearch(input);
    // }

    return (
        <View style={styles.container}>
            <Picker
                style={styles.picker}
                itemStyle={styles.pickerItem}
                selectedValue={props.searchType}
                onValueChange={handlePickerOnValueChange}
            >
                <Picker.Item label="ID" value="id" />
                <Picker.Item label="Title" value="title" />
            </Picker>
            <TextInput 
                style={styles.input}
                placeholder={`search by ${props.searchType}`}
                value={props.search}
                onChangeText={handleInputOnChange}
            />
            {/* <Button
                title="Search"
                onPress={handleButtonOnPress}
            /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 5,
    },
    input: {
        fontSize: 20,
        padding: 10,
        width: '80%',
    },
    button: {
        color: '#A4C936'
    },
    picker: {
        width: '20%',
        height: 50,
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

export default SearchBar;