import { post } from './ApiUtil';
import { usePost } from './HttpClient';

const url = 'http://192.168.1.139:3000';

const postLogin = async (email, password) => {
    const user = {
        email: email,
        password: password
    };

    console.log(user);
    console.log(url);
    
    const { status, data } = await post(
        url + '/api/user/login', 
        { 'Content-Type': 'application/json' }, 
        JSON.stringify(user)
    );

    console.log(status);
    console.log(data);
}

const useRegister = () => {
    const url = '/api/user/register';
    const defaultResData = {};

    const [res, httpSend] = usePost(defaultResData);
    const postRegister = payload => httpSend({ url: url, payload: payload });

    return [res, postRegister];
}

export {
    postLogin,
    useRegister
}