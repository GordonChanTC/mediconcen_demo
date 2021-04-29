import React, { useContext } from 'react';
import { StyleSheet, View, Button, TouchableWithoutFeedback } from 'react-native'; 
import TokenContext from '../../token/Context';
import SideMenuColumn from './SideMenuColumn';

const HomeSideMenu = props => {
    const tokenStore = useContext(TokenContext);

    const onPressLogout = () => {
        tokenStore.del();
        props.onLogout();
    }

    return (
        <View style={styles.container}>
            <SideMenuColumn title="Logout" onPress={onPressLogout} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'column'
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