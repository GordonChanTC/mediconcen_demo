import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Dialog, { DialogContent, SlideAnimation } from 'react-native-popup-dialog';
import TwoColumnBlock from '../Common/TwoColumnBlock';

const UserDialog = props => {
    return (
        <View>
            <Dialog
                style={styles.dialog}
                visible={props.visible}
                onTouchOutside={() => props.onClose()}
                dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
            >
                <DialogContent style={styles.dialogContent}>
                    {props.user !== null 
                     ?
                        <React.Fragment>
                            <TwoColumnBlock
                                contents={[
                                    <Text style={{...styles.text, ...styles.bold}}>
                                        {`User: `}
                                    </Text>,
                                    <Text style={styles.text}>
                                        {props.user.name}
                                    </Text>
                                ]}
                            />
                            <TwoColumnBlock
                                contents={[
                                    <Text style={{...styles.text, ...styles.bold}}>
                                        {`Email: `}
                                    </Text>,
                                    <Text style={styles.text}>
                                        {props.user.email}
                                    </Text>
                                ]}
                            />
                            <TwoColumnBlock
                                contents={[
                                    <Text style={{...styles.text, ...styles.bold}}>
                                        {`Work: `}
                                    </Text>,
                                    <Text style={styles.text}>
                                        {props.user.company.name}
                                    </Text>
                                ]}
                            />
                        </React.Fragment>
                     :null
                    }
                </DialogContent>
            </Dialog>
        </View>
    )
}

const styles = StyleSheet.create({
    dialog: {
        height: 300,
    },
    dialogContent: {
        width: '80%',
        height: 200,
        padding: 10,
    },
    text: {
        fontSize: 20,
        marginBottom: 10,
    },
    bold: {
        fontWeight: 'bold',
    },
})

export default UserDialog;