import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import FlatListContainer from './FlatListContainer';
import SearchBar from './SearchBar';
import SlideMenu from 'react-native-side-menu-updated';
import HomeSideMenu from './HomeSideMenu';
import { useConsultations } from '../../api/DataApi';
import { getDayRange, getWeekRange, getMonthRange } from '../../util/Util';

const DateFilter = Object.freeze({
	Day: 0,
	Week: 1,
	Month: 2
});

const Home = props => {
	const [consRes, postCons] = useConsultations();
	const [date, setDate] = useState(new Date());
	const [dateFilter, setDateFilter] =  useState(DateFilter.Day);
	const [consultations, setConsultations] = useState([]);

	useEffect(() => {
		let [start, end] = [date, date];
		switch (dateFilter) {
			case DateFilter.Day:
			default:
				[start, end] = getDayRange(date);
				break;
			case DateFilter.Week:
				[start, end] = getWeekRange(date);
				break;
			case DateFilter.Month:
				[start, end] = getMonthRange(date);
				break;
		};
		console.log(start.getTime(), end.getTime());
		postCons({ start: start.getTime(), end: end.getTime() });
	}, [date]);

	useEffect(() => {
		setConsultations([...consRes.data.list]);
	}, [consRes.data.list]);

	const onClickListItem = (id) => {
		props.navigation.navigate('Detail', { id: id });
	}

	return (
		<View style={styles.container}>
			<FlatListContainer 
				{...props}
				list={consultations} 
				onClick={onClickListItem}
			/>
		</View>
	)
};

const styles = StyleSheet.create({
	container: {
		paddingTop: 10,
		flex: 1,
		backgroundColor: '#fff',
	},
});

export default Home;