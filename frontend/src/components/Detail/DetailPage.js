import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import { GetUserData } from '../Common/API';
import TwoColumnBlock from '../Common/TwoColumnBlock';
import UserDialog from '../User/UserDialog';

const DetailPage = props => {
    const [user, setUser] = useState({});
    const [comments, setComments] = useState(null);
    const [userDialogOpen, setUserDialogOpen] = useState(false);
    const [userData, setUserData] = useState(null);
    
    useEffect(() => {
        const id = props.navigation.getParam('id', '');
        const userID = props.navigation.getParam('userId', '');
        getData(id, userID);
    }, []);
    
    const getData = async (id, userID) => {
        await fetch(`https://jsonplaceholder.typicode.com/users/${userID}`)
                .then(response => response.json())
                .then(data => setUser(data))
                .catch(error => console.error(error));
        await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
                .then(response => response.json())
                .then(data => setComments(data))
                .catch(error => console.error(error));
    };

    const openUserDialog = async userID => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userID}`).then(response => response.json());
        setUserData(response);
        setUserDialogOpen(true);
    }

    const closeUserDialog = () => {
        setUserDialogOpen(false);
    }

    const twoColumnBlock = (first, second) => {
        return <TwoColumnBlock contents={[first, second]} />;
    }

    const commentBlock = (item, index) => {
        return (
            <View key={index} style={styles.commentBlock}>
                {twoColumnBlock(
                    <Text style={{...styles.text, ...styles.bold}}>
                        {`Name: `}
                    </Text>,
                    <Text style={styles.text}>
                        {item.name}
                    </Text>
                )}
                {twoColumnBlock(
                    <Text style={{...styles.text, ...styles.bold}}>
                        {`Email: `}
                    </Text>,
                    <Text style={styles.text}>
                        {item.email}
                    </Text>
                )}
                <Text style={styles.text}>
                    {item.body}
                </Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.infoContainer}>
                {/* <View> */}
                    {twoColumnBlock(
                        <Text style={{...styles.text, ...styles.bold}}>
                            {`Title: `}
                        </Text>,
                        <Text style={styles.text}>
                            {props.navigation.getParam('title', '')}
                        </Text>
                    )}
                    {twoColumnBlock(
                        <Text style={{...styles.text, ...styles.bold}}>
                            {`Author: `}
                        </Text>,
                        <View>
                            <TouchableWithoutFeedback onPress={() => openUserDialog(user.id)}>
                                <Text style={{...styles.text, ...styles.hyperlink}}>
                                    {`${user.name}`}
                                </Text>
                            </TouchableWithoutFeedback>
                            <Text style={styles.text}>
                                {` (${user.email})`}
                            </Text>
                        </View>
                    )}
                    <View style={styles.contentBlock}>
                        <Text style={styles.text}>
                            {props.navigation.getParam('body', '')}
                        </Text>
                    </View>
                </View>
                <View style={styles.commentContainer}>
                    <Text style={styles.header}>
                        Comments:
                    </Text>
                    {
                        comments 
                        ?
                            comments.map((item, index) => commentBlock(item, index))
                        :
                            <View style={styles.loadingContainer}>
                                <Text style={styles.text}>
                                    Loading...
                                </Text>
                            </View>
                    }
                </View>
            </ScrollView>

            <UserDialog user={userData} visible={userDialogOpen} onClose={closeUserDialog} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    infoContainer: {
        minHeight: 500,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 50,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    contentBlock: {
        paddingTop: 20,
        paddingBottom: 200,
    },
    commentContainer: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    commentBlock: {
        borderTopWidth: 1,
        borderTopColor: '#C4C4C4',
        borderBottomWidth: 1,
        borderBottomColor: '#C4C4C4', 
        paddingTop: 10,
    },
    loadingContainer: {
        padding: 10,
        flex: 1,
        alignItems: 'center'
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 20,
        marginBottom: 10,
    },
    hyperlink: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
    bold: {
        fontWeight: 'bold',
    },
});

export default DetailPage;