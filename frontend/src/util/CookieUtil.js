
const getCookieLongExp = () => {
    return new Date(2147483647 * 1000).toUTCString();
};
const setCookie = (cname, cvalue, exp) => {
    document.cookie = cname + '=' + cvalue + '; expires=' + exp;
};

const getCookie = (cname) => {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
};

const delCookie = (cname) => {
    document.cookie = cname + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC';
};

export {
    setCookie,
    getCookie,
    delCookie,
    getCookieLongExp,
};