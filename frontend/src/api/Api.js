import { post, postAuth } from './ApiUtil';

export const LoginPost = async (email, password) => {
    const user = {
        email: email,
        password: password
    };

    console.log(user);
    
    const { status, data } = await post('http://192.168.1.139:3000/api/user/login', { 'Content-Type': 'application/json' }, JSON.stringify(user));

    console.log(status);
    console.log(data);
}