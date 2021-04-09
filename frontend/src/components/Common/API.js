const url = 'https://jsonplaceholder.typicode.com';

export const GetUserData = async id => {
    return await fetch(`${url}/users/${id}`).then(response => response.json());
}