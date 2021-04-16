import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Dialog, { DialogContent, SlideAnimation } from 'react-native-popup-dialog';

const RegisterConfirmDialog = props => {
    return (
        <Dialog
            visible={props.visible}
            dialogAnimation={new SlideAnimation({slideFrom:'bottom'})}
        >
            <DialogContent style={styles.dialog}>
                <View style={styles.dialogContainer}>
                    <View style={styles.dialogTextContainer}>
                        <Text style={styles.dialogText}>
                            {`Successfully Registered`}
                        </Text>
                    </View>
                </View>
            </DialogContent>
        </Dialog>
    )
}

const styles = StyleSheet.create({
    dialog: {
        padding: 0
    },  
    dialogContainer: {
        width: '100%',
        height: 60
    },
    dialogTextContainer: {
        width: '100%',
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dialogText: {
        fontSize: 28,
        textAlign: 'center'
    }
})

export default RegisterConfirmDialog;