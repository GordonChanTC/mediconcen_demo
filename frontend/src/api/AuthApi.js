import { post, postAuth } from './ApiUtil';

const url = 'http://192.168.1.139:3000';

const PostLogin = async (email, password) => {
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

const PostRegister = async (email, password, clinicId, phoneNum, address) => {
    const newUser = {
        email: email,
        password: password,
        clinicId: clinicId,
        phoneNum: phoneNum,
        address: address
    };

    const { status, data } = await post(
        url + '/api/user/register',
        { 'Content-Type': 'application/json' },
        JSON.stringify(newUser)
    );

    console.log(status);
    console.log(data);
}

export {
    PostLogin,
    PostRegister
}