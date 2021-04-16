import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const TwoColumnTextInput = props => {
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{props.title}</Text>
            </View>
            <View style={[styles.textInputContainer, !props.isValid ? styles.textInputError : null]}>
                {props.textInput}
            </View>
            <View>
                <Text style={styles.errorMsgText}>{props.errorMsg}</Text>
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
    textInputContainer: {
        width: '100%',
        marginTop: 12,
        marginBottom: 12,
        paddingBottom: 2,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        alignItems: 'center',
    },
    textInputError: {
        borderBottomColor: 'red'
    },
    errorMsgText: {
        fontSize: 18,
        color: 'red'
    }
})

export default TwoColumnTextInput;