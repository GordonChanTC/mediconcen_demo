import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

const RectButton = props => {
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity 
                key="button" 
                style={[styles.button, props.disabled ? styles.disabledButton : '']} 
                activeOpacity={0.4} 
                onPress={props.onPress}
                disabled={props.disabled}
            >
                <Text style={styles.buttonText}>{props.title}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: 120,
        height: 60,
        padding: 10,
    },
    button: {
        width: '100%',
        backgroundColor: '#037FFC',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    buttonText: {
        fontSize: 20,
        color: 'white'
    },
    disabledButton: {
        backgroundColor: '#C4C4C4'
    }
})

export default RectButton;