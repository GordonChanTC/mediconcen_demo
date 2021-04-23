import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const TwoRowTextBlock = props => {
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{props.title}</Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    {props.text}
                </Text>
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
    text: {
        fontSize: 24
    }
})

export default TwoRowTextBlock;