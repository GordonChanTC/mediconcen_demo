const setSession = (key, data) => {
    if (typeof (Storage) !== 'undefined') {
        sessionStorage.setItem(key, data);
    };
};

const getSession = (key) => {
    if (typeof (Storage) !== 'undefined') {
        return sessionStorage.getItem(key);
    };
    return null;
};

const delSession = (key) => {
    if (typeof (Storage) !== 'undefined') {
        sessionStorage.removeItem(key);
    };
};

export {
    setSession,
    getSession,
    delSession
};