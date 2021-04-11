
const authorizedHeader = token => header => ({ ...header, Authorization: token });

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

/**
 * Custom Fetch API post method
 * * * *
 * @param {string}  URL
 * @param {Object} headers
 * @param {string}  body
 * @param {Object} signal
 * 
 * @return {Object} { status, data }
 */
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
            resolve({ status: res.status , data: data });
        
        } catch (err) {
            reject(err);
        }
    });
}

const postAuth = async (URL = "", headers = {}, body = "", signal) => post(URL, authorizedHeader('token')(headers), body, signal);

export {
    post,
    postAuth
};