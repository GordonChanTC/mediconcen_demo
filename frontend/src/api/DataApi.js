import { useGet } from './HttpClient';

const useConsultations = () => {
    const url = '/api/data/consultation';
    const defaultResData = {
        list: []
    }

    const [res, httpSend] = useGet(defaultResData);
    const getConsultation = () => httpSend({ url: url });

    return [res, getConsultation];
}

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
    useClinics,
    useConsultations
};