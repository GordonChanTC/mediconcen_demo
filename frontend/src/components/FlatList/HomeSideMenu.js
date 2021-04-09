import React, { useContext } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native'; 

const HomeSideMenu = props => {
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>
                    {`Welcome! ${props.username}`}
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Logout" onPress={() => props.onLogout()} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    titleContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#C4C4C4',
    },
    buttonContainer: {
        alignItems: 'flex-start',
    },
    text: {
        fontSize: 24,
    },
    title: {
        fontSize: 24,
    }
});

export default HomeSideMenu;