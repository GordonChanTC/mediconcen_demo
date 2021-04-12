import { get } from './ApiUtil';

const url = 'http://192.168.1.14:3000';

export const GetClinics = async () => {
    const { status, data } = await get(url + '/api/data/clinics');

    console.log(data);

    return data;
}