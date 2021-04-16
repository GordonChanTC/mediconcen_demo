import React from 'react';
import { StyleSheet, ActivityIndicator, Text } from 'react-native';
import Dialog, { DialogContent } from 'react-native-popup-dialog';

const LoadingMask = props => {
    return (
        <Dialog visible={props.visible} dialogStyle={styles.transparent}>
            <DialogContent>
                <ActivityIndicator size='large' />
            </DialogContent>
        </Dialog>
    )
}

const styles = StyleSheet.create({
    transparent: {
        backgroundColor: 'rgba(0,0,0,0)',
    }
})

export default LoadingMask;