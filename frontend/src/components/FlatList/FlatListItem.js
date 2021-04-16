import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const FlatListItem = props => {
    return (
        <TouchableOpacity style={styles.item} onPress={() => props.onPress(props.id)}>
            <View style={styles.infoContainer}>
                <Text style={styles.text}>
                    {`Date: ${props.dateTime}`}
                </Text>
            </View>
            <View style={styles.arrowContainer}>
                <Text style={styles.text}>
                    {'>'}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        flex: 1,
        textAlignVertical: 'center',
    },
    item: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    infoContainer: {
        width: '95%'
    },
    arrowContainer: {
        flex: 1,
        alignItems: 'center',
    },
})

export default FlatListItem;