import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

const SideMenuColumn = props => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.container}>
                <Text style={styles.text}>
                    {props.title}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#C4C4C4'
    },
    text: {
        fontSize: 24,
    },
})

export default SideMenuColumn;