import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import FlatListContainer from './FlatListContainer';
import SearchBar from './SearchBar';
import SlideMenu from 'react-native-side-menu-updated';
import HomeSideMenu from './HomeSideMenu';
import TokenContext from '../../token/Context';

const Home = props => {
    const [list, setList] = useState([]);
	const [searchType, setSearchType] = useState("id");
	const [search, setSearch] = useState("");
	const [loginState, loginDispatch] = useContext(TokenContext);

	useEffect(() => {
		getData();
	}, []);

	useEffect(() => {
		setSearch("");
	}, [searchType]);

	useEffect(() => {
		onSearch(search);
	}, [search]);

	const getData = async () => {
		await fetch('https://jsonplaceholder.typicode.com/posts')
				.then(response => response.json())
				.then(data => setList(data))
				.catch(error => console.error(error));
	}

	const onSetSearchType = type => {
		if (type !== searchType) {
			setSearch("");
		}
		setSearchType(type);
	}

	const onSetSearch = search => {
		setSearch(search);
	}

	const onSearch = search => {
		setSearch(search);
	}

	const onLogout = () => {
        loginDispatch({ type: 'LOGOUT' });
        props.navigation.dispatch(StackActions.reset({
			index: 0,
			actions: [NavigationActions.navigate({ routeName: 'Login' })]
		}));
    };

	return (
		<SlideMenu menu={<HomeSideMenu username={loginState.username} onLogout={onLogout} />}>
			<View style={styles.container}>
				<SearchBar 
					searchType={searchType}
					search={search}
					setSearchType={onSetSearchType}
					setSearch={onSetSearch}
					onSearch={onSearch} 
				/>
				<FlatListContainer 
					{...props}
					list={list} 
					searchType={searchType} 
					search={search} 
					onOpenPostDetail={props.onOpenPostDetail}
				/>
			</View>
		</SlideMenu>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 10,
		flex: 1,
		backgroundColor: '#fff',
	},
});

export default Home;