import React, { useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Overlay } from 'react-native-popup-dialog';

const WithLoadingMask = Component => props => {
    const [enableMask, setEnableMask] = useState(false);
    const enableLoading = () => setEnableMask(true);
    const disableLoading = () => setEnableMask(false);

    return (
        <React.Fragment>
            {
                enableMask &&
                <View style={styles.loadingMaskContainer}>
                    <ActivityIndicator size='large' />
                </View>
            }

            <Component {...props} enableLoading={enableLoading} disableLoading={disableLoading} />
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    loadingMaskContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        flex: 1,
        justifyContent: 'center'
    }
})

export default WithLoadingMask;