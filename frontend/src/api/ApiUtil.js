
const resHandler = async (res) => {
    return new Promise(async (resolve, reject) => {
        try {          
            let json = await res.json();
            resolve(json);
        } catch (err) {
            reject(err);
        }
    });
};

const post = async (URL = "", headers = {}, body = "", signal) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch(URL, {
                method: 'POST',
                headers: headers,
                body: body,
                signal: signal,
            });

            const data = await resHandler(res);
            resolve({ status: res.status , data: data, headers: res.headers.map });
        } catch (err) {
            reject(err);
        }
    });
}

const get = async (URL = "", headers = {}, signal) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch(URL, {
                method: 'GET',
                headers: headers,
                signal: signal
            });

            const data = await resHandler(res);
            resolve({ status: res.status , data: data });
        } catch (err) {
            reject(err);
        }
    });
}

export {
    post,
    get
};