import axios from 'axios'

const DEFAULT_API = import.meta.env.VITE_API_URL || 'https://education-server-six.vercel.app';
const AUTH_TOKEN_KEY = 'auth_token';
const AUTH_SESSION_KEY = 'auth_session';

export const axiosInstance = axios.create({
    baseURL: DEFAULT_API,
    withCredentials: true,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
});

// If a token was persisted in localStorage, initialize Authorization header
if (typeof window !== 'undefined') {
    try {
        const storedToken = localStorage.getItem(AUTH_TOKEN_KEY);
        if (storedToken) {
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        }
    } catch {
        // ignore storage errors
    }
}

export function markAuthSession() {
    if (typeof window === 'undefined') return;

    try {
        localStorage.setItem(AUTH_SESSION_KEY, 'true');
    } catch {
        // ignore storage errors
    }
}

export function hasAuthSessionHint() {
    if (typeof window === 'undefined') return false;

    try {
        return Boolean(
            localStorage.getItem(AUTH_SESSION_KEY) ||
            localStorage.getItem(AUTH_TOKEN_KEY)
        );
    } catch {
        return false;
    }
}

export function setAuthToken(token) {
    if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        if (typeof window !== 'undefined') {
            try {
                localStorage.setItem(AUTH_TOKEN_KEY, token);
                markAuthSession();
            } catch {
                // ignore storage errors
            }
        }
    } else {
        delete axiosInstance.defaults.headers.common['Authorization'];
        if (typeof window !== 'undefined') {
            try {
                localStorage.removeItem(AUTH_TOKEN_KEY);
                localStorage.removeItem(AUTH_SESSION_KEY);
            } catch {
                // ignore storage errors
            }
        }
    }
}

axiosInstance.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
);

export function setApiBase(url) {
    axiosInstance.defaults.baseURL = url;
}

export default axiosInstance;
