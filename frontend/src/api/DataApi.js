import { useGet } from './HttpClient';

const useClinics = () => {
    const url = '/api/data/clinics';
    const defaultResData = {
        list: []
    };

    const [res, httpSend] = useGet(defaultResData);
    const getClinic = () => httpSend({ url: url });

    return [res, getClinic];
}

export {
    useClinics
};