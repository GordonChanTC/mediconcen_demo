import React from 'react';
import { StyleSheet, View } from 'react-native';

const TwoColumnBlock = props => {
    return (
        <View style={styles.twoColumnBlock}>
            <View style={styles.twoColumnBlockFirstColumn}>
                {props.contents[0]}
            </View>
            <View style={styles.twoColumnBlockSecondColumn}>
                {props.contents[1]}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    twoColumnBlock: {
        flex: 1,
        flexDirection: 'row',
    },
    twoColumnBlockFirstColumn: {
        width: '25%',
    },
    twoColumnBlockSecondColumn: {
        width: '75%',
    },
});

export default TwoColumnBlock;