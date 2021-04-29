import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import FlatListItem from './FlatListItem';

const FlatListContainer = props => {
    const listEmptyComponent = (
        <View style={styles.noItemTextContainer}>
            <Text style={styles.text}>No record</Text>
        </View>
    )

    return (
        <React.Fragment>
            {
                <View style={styles.container}>
                    <FlatList
                        keyExtractor={data => data.id.toString()}
                        data={props.list}
                        renderItem={itemData => (
                            <FlatListItem
                                id={itemData.item.id}
                                dateTime={new Date(itemData.item.dateTime)}
                                onPress={props.onClick}
                            />
                        )}
                        ListEmptyComponent={listEmptyComponent}
                    />
                </View>
            }
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingTop: 10,
        paddingRight: 10,
        width: '100%',
        flex: 1,
        backgroundColor: '#E8E8E8',
    },
    noItemTextContainer: {
        width: '100%',
        paddingTop: 10,
        alignItems: 'center'
    },
    text: {
        fontSize: 32
    }
})

export default FlatListContainer;