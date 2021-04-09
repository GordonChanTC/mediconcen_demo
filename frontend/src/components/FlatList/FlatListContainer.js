import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import FlatListItem from './FlatListItem';

const FlatListContainer = props => {
    const searchResult = props.list.filter(data => `${data[props.searchType]}`.toLowerCase().indexOf(props.search.toLowerCase()) !== -1);

    const onPress = id => {
        const detail = props.list.filter(data => data.id === id)[0];

        props.navigation.navigate('Detail', { ...detail });
    }

    return (
        <React.Fragment>
            {
                props.list.length > 0 ?
                    <View style={styles.container}>
                        <FlatList
                            keyExtractor={(data, index) => data.id.toString()}
                            data={searchResult}
                            renderItem={itemData => (
                                <FlatListItem
                                    id={itemData.item.id}
                                    title={itemData.item.title}
                                    onPress={onPress}
                                />
                            )}
                        />
                    </View>
                :
                    <Text>
                        fetching data... 
                    </Text>
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