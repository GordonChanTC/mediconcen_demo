import { post, postAuth } from './ApiUtil';

const url = 'http://192.168.1.14:3000';

export const PostLogin = async (email, password) => {
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