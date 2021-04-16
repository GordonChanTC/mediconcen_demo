import { useState, useEffect, useContext } from 'react';
import { post, get } from './ApiUtil';
import httpConfig from './HttpConfig';
import { TokenContext } from '../token/Token';

/**
 * Custom hook handle http response error logic
 * * * *
 * @example
 * // isError is a boolean
 * // code is a number
 * // httpErrorParser is mapped to custom hook setState
 * const [isError, code, httpErrorParser] = useHttpError();
 *
 */
const useHttpError = () => {
    // const jwtStore = useContext(TokenContext);
    const [state, setState] = useState({ status: 200, data: {}, message: ''});
    const [isError, setIsError] = useState(false);
    const [code, setCode] = useState(0);

    useEffect(() => {
        (() => {
            // const { status, data, message } = state;
            // if (parseInt(status) !== 200 || message === 'Failed to fetch') { // status error
            //     setIsError(true);
            //     // config.failedToFetchCallback();
            //     return;
            // }

            // if (typeof data.Error !== 'undefined') { // body has Error flag
            //     setIsError(true);
            //     setCode(parseInt(data.Error));
            //     if (600 === parseInt(data.Error)) {
            //         // jwtStore.del();  // delete local jwt
            //     }
            // } else {
            //     setIsError(false);
            //     setCode(0);
            // }

            const { status, data, message } = state;
            setIsError(parseInt(status) !== 200);
            setCode(parseInt(status));
            
        })();
    }, [JSON.stringify(state)]);

    return [isError, code, setState];
};

const formatResData = (data, defaultResData) => {
    if (typeof defaultResData !== 'undefined') {
        for (let key in defaultResData) {
            data[key] = data[key] ?? defaultResData[key];
        }
    }
    return data;
};

/**
 * Custom hook post request with authorization
 * * * *
 * @example
 * // function httpSend is mapped to custom hook setState, set url, page, event, and payload
 * // res is an object consist of {data, isFetching, isError, code}
 *   const [res, httpSend] = usePost(defaultResData);
 *   const getData = (body) => {
 *        httpSend({ page: page, event: event, payload: payload });
 *   };
 *
 * @return {Array} [{data, isFetching, isError, code}, setState]
 */

const usePost = (defaultResData) => {
    const tokenStore = useContext(TokenContext);
    const [isFetching, setIsFetching] = useState(false);
    const [data, setData] = useState(defaultResData ?? {});
    const [isError, code, httpErrorParser] = useHttpError(); // Handle http response error logic
    const [state, setState] = useState({});

    // const jwtStore = useContext(TokenContext); // Acquire JWT context storage

    useEffect(() => {
        let mounted = true;
        const abortController = new AbortController();

        (async () => {
            const { url, payload } = state;
            if (!url) return;
            try {
                httpErrorParser({status: 200, data: {}, message: {}}); // reset http error

                setIsFetching(true);

                const { status, data, headers } = await post(
                    httpConfig.domain + url,
                    {
                        "Content-Type": "application/json",
                        "authorization": tokenStore.get(),
                    },
                    JSON.stringify(payload),
                    abortController.signal
                );
                
                // console.log('# DEBUG httpClient.js res', { status, data });

                httpErrorParser({ status, data });

                if (mounted) {
                    setIsFetching(false);
                    setData(formatResData(data, defaultResData));
                } 
                if (headers.authorization) tokenStore.set(headers.authorization);
                console.log(tokenStore.get())
            } catch (err) {
                console.error(err);
                if (mounted) {
                    setIsFetching(false);
                    httpErrorParser(err);
                }
            }
        })();

        return () => {
            mounted = false;
            abortController.abort();
        }
    }, [state]);

    return [{data, isFetching, isError, code} , setState];
};

const useGet = (defaultResData) => {
    const tokenStore = useContext(TokenContext);
    const [isFetching, setIsFetching] = useState(false);
    const [data, setData] = useState(defaultResData ?? {});
    const [isError, code, httpErrorParser] = useHttpError(); // Handle http response error logic
    const [state, setState] = useState({});

    // const jwtStore = useContext(TokenContext); // Acquire JWT context storage

    useEffect(() => {
        let mounted = true;
        const abortController = new AbortController();

        (async () => {
            const { url } = state;
            if (!url) return;
            try {
                httpErrorParser({status: 200, data: {}, message: {}}); // reset http error

                setIsFetching(true);

                const { status, data } = await get(
                    httpConfig.domain + url,
                    {
                        "authorization": tokenStore.get(),
                    },
                    abortController.signal
                );
                
                // console.log('# DEBUG httpClient.js res', { status, data });

                httpErrorParser({ status, data });

                if (mounted) {
                    setIsFetching(false);
                    setData(formatResData(data, defaultResData));
                } 
                if (data.authorization) tokenStore.set(data.authorization);
            } catch (err) {
                console.error(err);
                if (mounted) {
                    setIsFetching(false);
                    httpErrorParser(err);
                }
            }
        })();

        return () => {
            mounted = false;
            abortController.abort();
        }
    }, [state]);

    return [{data, isFetching, isError, code} , setState];
}

export {
    httpConfig as config,
    usePost,
    useGet
};