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

const useConsultationDetail = id => {
    const url = '/api/data/consultation/' + id;
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
    const postConsultationDetail = () => httpSend({ url: url });

    return [res, postConsultationDetail];
}

export {
    useConsultations,
    useConsultationDetail 
};