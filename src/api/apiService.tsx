import axios from "axios";
import { store } from '../redux/store'
import { USER_LOGOUT } from '../redux/action'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const NODE_API_BASE_URL = import.meta.env.VITE_NODE_API_BASE_URL;


axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Content-Type'] = 'application/json'

export const getCall = async (path: any, data: any, token = null, headers = {}) => {
    try {
        const res = await axios.get(API_BASE_URL + path, {
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
                ...headers
            },
            params: data
        })

        if (res?.data?.code != 200) {
            if ([401, 403]?.includes(res?.data?.code)) {
                // alert(JSON.stringify(res))
                localStorage.removeItem('user')
                localStorage.removeItem('roles')
                localStorage.removeItem('permissions')
                store.dispatch(USER_LOGOUT())
                logout_cleaner()
            }
            return res?.data
        } else {
            return res?.data;
        }

    } catch (error) {
        console.log("error", error);
        return {};
    }
};

export const putCall = async (path: any, data: any, token = null, headers = {}) => {
    try {
        const res = await axios.put(API_BASE_URL + path, data, {
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
                ...headers
            },
        });
        if (res?.data?.code != 200) {
            if ([401, 403]?.includes(res?.data?.code)) {
                localStorage.removeItem('user');
                localStorage.removeItem('roles');
                localStorage.removeItem('permissions');
                store.dispatch(USER_LOGOUT());
                logout_cleaner();
            }
            return res?.data;
        } else {
            return res?.data;
        }
    } catch (error) {
        console.log("error", error);
        return {};
    }
};


export const postCall = async (path: any, data: any, token:any = null, headers:any = {}) => {
    try {
        // alert(path+' '+token)
        const res = await axios.post(API_BASE_URL + path, data, {
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
                ...headers
            },
        });
        if (res?.data?.code != 200) {
            if ([401, 403]?.includes(res?.data?.code)) {
                // alert(JSON.stringify(res))
                localStorage.removeItem('user')
                localStorage.removeItem('roles')
                localStorage.removeItem('permissions')
                store.dispatch(USER_LOGOUT())
                logout_cleaner()
            }
            return res?.data
        } else {
            return res?.data;
        }

    } catch (error) {
        console.log("error", error);
        return {};
    }
};


export const postCallDynamicDB = async (path: any, data: any, token = null, lan = "en") => {
    try {
        let res = await axios.post(NODE_API_BASE_URL + path, data, {
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
                lang: lan
            },
        });

        return res?.data;
    } catch (error) {
        console.log("error", error);
        return {};
    }
};


const logout_cleaner = () => {

    window.location.href = '/'
    let backdrops = document.querySelectorAll('.modal-backdrop')
    backdrops.forEach(element => {
        element.remove()
    });
}

