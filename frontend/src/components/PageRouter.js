import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import DetailPage from './Detail/DetailPage';
import Home from './FlatList/Home';
import Login from './Login/Login';

const PageRouter = createStackNavigator({
    Login: Login,
    Home: Home,
    Detail: DetailPage
}, { initialRouteName: 'Home' });

export default createAppContainer(PageRouter);