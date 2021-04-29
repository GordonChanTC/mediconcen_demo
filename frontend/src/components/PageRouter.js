import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import DetailPage from './Detail/DetailPage';
import Home from './Home/Home';
import Login from './Login/Login';
import Register from './Register/Register';

const PageRouter = createStackNavigator({
    Login: Login,
    Register: Register,
    Home: Home,
    Detail: DetailPage
}, { initialRouteName: 'Login' });

export default createAppContainer(PageRouter);