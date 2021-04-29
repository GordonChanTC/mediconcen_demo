import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import SideMenu from 'react-native-side-menu-updated';
import { NavigationActions, StackActions } from 'react-navigation';
import FlatListContainer from './FlatListContainer';
import { useConsultations } from '../../api/DataApi';
import { getDayRange, getWeekRange, getMonthRange, dateFormat } from '../../util/Util';
import HomeSideMenu from './HomeSideMenu';
import LoadingMask from '../Common/LoadingMask';

const DateFilter = Object.freeze({
	Day: 0,
	Week: 1,
	Month: 2
});

const Home = props => {
	const [consRes, postCons] = useConsultations();
	const [date, setDate] = useState(Date.now());
	const [dateFilter, setDateFilter] =  useState(DateFilter.Day);
	const [consultations, setConsultations] = useState([]);
	const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

	const earliestDate = new Date(2020, 0, 1, 0, 0, 0).getTime();
	const dateFilterOptions = [
		{ label: 'Day', value: DateFilter.Day },
		{ label: 'Week', value: DateFilter.Week },
		{ label: 'Month', value: DateFilter.Month },
	];

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
		postCons({ start: start, end: end });
	}, [date, dateFilter]);

	useEffect(() => {
		setConsultations([...consRes.data.list].sort((a, b) => b.dateTime - a.dateTime));
	}, [consRes.data.list]);

	const onClickListItem = (id) => {
		props.navigation.navigate('Detail', { id: id });
	}
	
	const isEarliestDay = date => {
		switch (dateFilter) {
			case DateFilter.Day:
				return date - earliestDate <= 0;
			case DateFilter.Week:
				return getWeekRange(date)[0] - earliestDate <= 0;
			case DateFilter.Month:
				return getMonthRange(date)[0] - earliestDate <= 0;
			default:
				return true;
		}
	}

	const isLatestDay = date => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		switch (dateFilter) {
			case DateFilter.Day:
				return date - today >= 0;
			case DateFilter.Week:
				return getWeekRange(date)[1] - today >= 0;
			case DateFilter.Month:
				return getMonthRange(date)[1] - today >= 0;
			default:
				return true;
		}
	}


	const displayDateRange = () => {
		switch (dateFilter) {
			case DateFilter.Day:
				return dateFormat(date);
			case DateFilter.Week:
				let [wStart, wEnd] = getWeekRange(date);
				return `${dateFormat(wStart)} - ${dateFormat(wEnd)}`;
			case DateFilter.Month:
				let [mStart, mEnd] = getMonthRange(date);
				return `${dateFormat(mStart)} - ${dateFormat(mEnd)}`;
			default:
				return '';
		}
	}

	const onPressDateBackButton = () => {
		let newDate = new Date(date);
		switch (dateFilter) {
			case DateFilter.Day:
				newDate.setDate(newDate.getDate() - 1);
				break;
			case DateFilter.Week:
				newDate.setDate(newDate.getDate() - 7);
				break;
			case DateFilter.Month:
				newDate.setFullYear(newDate.getFullYear(), newDate.getMonth() - 1, newDate.getDate());
				break;
		}
		setDate(newDate.getTime());
	}
	
	const onPressDateNextButton = () => {
		let newDate = new Date(date);
		switch (dateFilter) {
			case DateFilter.Day:
				newDate.setDate(newDate.getDate() + 1);
				break;
			case DateFilter.Week:
				newDate.setDate(newDate.getDate() + 7);
				break;
			case DateFilter.Month:
				newDate.setFullYear(newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate());
				break;
		}
		setDate(newDate.getTime());
	}
	
	const onLogout = () => {
		props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ 
                routeName: 'Login'
            })]
        }));
	}

	return (
		<SafeAreaView style={styles.container}>
			<SideMenu
				menu={<HomeSideMenu onLogout={onLogout} />}
				isOpen={isSideMenuOpen}
				onChange={setIsSideMenuOpen}
				menuPosition={'left'}
			>
				<View style={styles.dateFilterContainer}>
					<SwitchSelector 
						options={dateFilterOptions} 
						initial={DateFilter.Day} 
						onPress={setDateFilter} 
						buttonColor={'#03d7fc'}
						fontSize={16}
					/>
				</View>
				<View style={styles.dateContainer}>
					<TouchableOpacity disabled={isEarliestDay(date)} onPress={onPressDateBackButton}>
						<View style={[styles.dateButton, isEarliestDay(date) ? styles.transparent : '']}>
							<Text style={styles.dateButtonText}>
								{`<`}
							</Text>
						</View>
					</TouchableOpacity>
					<Text style={styles.dateText}>
						{displayDateRange()}
					</Text>
					<TouchableOpacity disabled={isLatestDay(date)} onPress={onPressDateNextButton}>
						<View style={[styles.dateButton, isLatestDay(date) ? styles.transparent : '']}>
							<Text style={styles.dateButtonText}>
								{`>`}
							</Text>
						</View>
					</TouchableOpacity>
				</View>
				<FlatListContainer 
					{...props}
					list={consultations} 
					onClick={onClickListItem}
				/>
			</SideMenu>

			<LoadingMask visible={consRes.isFetching} />
		</SafeAreaView>
	)
};

const styles = StyleSheet.create({
	container: {
		paddingTop: 10,
		flex: 1,
		backgroundColor: '#fff',
	},
	dateContainer: {
        width: '100%',
        flexDirection: 'row',
		alignItems: 'center',
        justifyContent: 'space-between'
    },
	dateText: {
		fontSize: 24,
		textAlign: 'center'
	},
	dateButton: {
		width: 50,
		height: 50,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	dateButtonText: {
		fontSize: 24
	},
	transparent: {
		opacity: 0
	},
	dateFilterContainer: {
		width: '100%',
		padding: 5,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	}
});

export default Home;