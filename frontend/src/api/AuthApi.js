import { usePost } from './HttpClient';

const useLogin = () => {
    const url = '/api/user/login';
    const defaultResData = {};

    const [res, httpSend] = usePost(defaultResData);
    const postLogin = payload => httpSend({ url: url, payload: payload });

    return [res, postLogin];
}

const useRegister = () => {
    const url = '/api/user/register';
    const defaultResData = {
        message: {},
        verified: false
    };

    const [res, httpSend] = usePost(defaultResData);
    const postRegister = payload => httpSend({ url: url, payload: payload });

    return [res, postRegister];
}

export {
    useLogin,
    useRegister
}