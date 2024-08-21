// isLoggedIn
export const isLoggedIn = () => {
    let data = localStorage.getItem("data");
    return data ? true : false;
};

// doLogin
export const doLogin = (data, next) => {
    localStorage.setItem("data", JSON.stringify(data));
    next();
};

// doLogout
export const doLogout = (next) => {
    localStorage.removeItem("data");
    next();
};

// getCurrentUserDetail
export const getCurrentUserDetail = () => {
    if (isLoggedIn()) {
        return JSON.parse(localStorage.getItem("data"))?.user;
    } else {
        return undefined;
    }
};

// getToken
export const getToken = () => {
    if (isLoggedIn()) {
        return JSON.parse(localStorage.getItem("data")).token;
    } else {
        return null;
    }
};
