import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const TwoColumnPicker = props => {
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{props.title}</Text>
            </View>
            <View style={styles.pickerContainer}>
                {props.picker}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 12
    },
    titleContainer: {
        width: '100%',
        textAlign: 'left'
    },
    title: {
        fontSize: 24
    },
    picker: {
        width: '100%',
        height: 100,
        marginTop: 12,
        marginBottom: 12,
        paddingBottom: 2,
        alignItems: 'center',
    },
});

export default TwoColumnPicker;