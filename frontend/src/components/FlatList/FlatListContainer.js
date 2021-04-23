import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import FlatListItem from './FlatListItem';

const FlatListContainer = props => {
    return (
        <React.Fragment>
            {
                props.list.length > 0 ?
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
                        />
                    </View>
                :   <View></View>
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
})

export default FlatListContainer;