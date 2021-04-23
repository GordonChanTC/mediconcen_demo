import React from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';

const TwoRowHyperlinkBlock = props => {
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{props.title}</Text>
            </View>
            <View style={styles.textContainer}>
                <TouchableWithoutFeedback onPress={props.onPress}>
                    <Text style={styles.hyperlink}>
                        {props.text}
                    </Text>
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingBottom: 12
    },
    titleContainer: {
        width: '100%',
        textAlign: 'left'
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold'
    },
    textContainer: {
        width: '100%',
        marginTop: 12,
        marginBottom: 12,
        paddingBottom: 2,
        textAlign: 'left'
    },
    hyperlink: {
        fontSize: 24,
        color: '#00b7ff',
        textDecorationLine: 'underline' 
    }
})

export default TwoRowHyperlinkBlock;