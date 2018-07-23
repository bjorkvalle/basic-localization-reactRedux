import {
    resolveFetch,
    getOpenPostHeaders,
} from '.';

export const sendOpen = (url: string): Promise<any> => {
    return fetch(`${url}`, {
        method: 'POST',
        headers: getOpenPostHeaders()
    })
        .then((response) => resolveFetch(response))
        .then((data) => Promise.resolve(data))
        .catch((err) => Promise.reject(err));
};
export const sendOpenData = (data: any, url: string): Promise<any> => {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: getOpenPostHeaders()
    })
        .then((response) => resolveFetch(response))
        .then((data) => Promise.resolve(data))
        .catch((err) => Promise.reject(err));
};

export const getOpenData = (url: string): Promise<any> => {
    return fetch(url, { headers: getOpenPostHeaders() })
        .then((response) => resolveFetch(response))
        .then((data) => Promise.resolve(data))
        .catch((err) => Promise.reject(err));
};
