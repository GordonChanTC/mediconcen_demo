import { useGet, usePost } from './HttpClient';

const useConsultations = () => {
    const url = '/api/data/consultation';
    const defaultResData = {
        list: []
    }

    const [res, httpSend] = usePost(defaultResData);
    const postConsultation = payload => httpSend({ url: url, payload: payload });

    return [res, postConsultation];
}

const useConsultationDetail = () => {
    const url = '/api/data/consultation/';
    const defaultResData = {
        consultationId: 0,
        doctorName: '',
        patientName: '',
        dateTime: '',
        consultationFee: '',
        diagnosis: [],
        medication: [],
        followUp: []
    };

    const [res, httpSend] = useGet(defaultResData);
    const getConsultationDetail = id => httpSend({ url: url + id });

    return [res, getConsultationDetail];
}

export {
    useConsultations,
    useConsultationDetail 
};