import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import Dialog, { DialogContent } from 'react-native-popup-dialog';

const LoginErrorDialog = props => {
    return (
        <View>
            <Dialog
                visible={props.visible}
                // onTouchOutside={() => props.onClose()}
            >
                <DialogContent style={styles.dialogContent}>
                    <Text style={styles.errorMessage}>
                        Incorrect username or password!
                    </Text>
                    <Button
                        title="OK"
                        onPress={() => props.onClose()}
                    />
                </DialogContent>
            </Dialog>
        </View>
    )
}

const styles = StyleSheet.create({
    dialogContent: {
        height: 100,
        padding: 10,
    },
    errorMessage: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 20,
    },
})

export default LoginErrorDialog;