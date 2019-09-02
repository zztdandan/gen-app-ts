import Cookies from 'js-cookie';
// 超时时间
const inFifteenMinutes: Date = new Date(new Date().getTime() + 120 * 60 * 1000);
export function getToken(TokenKey: string) {
    return Cookies.get(TokenKey);
}

export function setToken(TokenKey: string, token: string) {
    return Cookies.set(TokenKey, token, { expires: inFifteenMinutes });
}

export function removeToken(TokenKey: string) {
    return Cookies.remove(TokenKey);
}
